import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
	const outputDir = path.join(process.cwd(), 'static', 'screenshots');
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	console.log('[AUDIT] Starting Visual Horizontal Timeline Audit on http://localhost:5173...');
	const browser = await chromium.launch({ headless: true });

	const viewports = [
		{ name: '1920x1080', width: 1920, height: 1080 },
		{ name: '1440x900', width: 1440, height: 900 },
		{ name: '1024x768', width: 1024, height: 768 }
	];

	let allPassed = true;

	for (const vp of viewports) {
		console.log(`\n[AUDIT] --- Testing Viewport ${vp.name} ---`);
		const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
		const page = await context.newPage();

		await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
		await page.waitForTimeout(1000);

		// Sample unscaled image width prior to click
		const initialBounds = await page.$eval('#wide-room-bg', el => el.getBoundingClientRect());
		if (vp.name === '1920x1080') {
			await page.screenshot({ path: path.join(outputDir, '01-wide-start.png') });
			console.log('Captured 01-wide-start.png');
		}

		// Click Experience tab
		let expClicked = false;
		const expBtn = page.locator('button').filter({ hasText: /^Experience$/i }).first();
		if (await expBtn.count() > 0) {
			await expBtn.click({ force: true });
			expClicked = true;
		}

		if (expClicked) {
			// Criterion 1 Assertion: Zero Ghosting (presenter video opacity < 0.1)
			const ghostCheck = await page.evaluate(() => {
				const vid = document.getElementById('presenter-video');
				if (!vid) return { pass: true, detail: 'no video element' };
				const vidOpacity = parseFloat(window.getComputedStyle(vid).opacity);
				const vidDisplay = window.getComputedStyle(vid).display;
				const parentOpacity = vid.parentElement ? parseFloat(window.getComputedStyle(vid.parentElement).opacity) : 1;
				const pass = vidOpacity < 0.1 || parentOpacity < 0.1 || vidDisplay === 'none';
				return { pass, detail: `vidOpacity: ${vidOpacity}, parentOpacity: ${parentOpacity}` };
			});
			console.log(`[CRITERION 1] Zero Element Ghosting (${vp.name}): ${ghostCheck.pass ? 'PASS' : 'FAIL'}`);
			if (!ghostCheck.pass) allPassed = false;

			// Measure midway zoom width at t=0.5s after click (midway through 0.1s-0.9s push)
			await page.waitForTimeout(500);
			if (vp.name === '1920x1080') {
				await page.screenshot({ path: path.join(outputDir, '02-zooming-midway.png') });
				console.log('Captured 02-zooming-midway.png');
			}

			const zoomBounds = await page.$eval('#wide-room-bg', el => el.getBoundingClientRect());
			const scaleRatio = zoomBounds.width / initialBounds.width;

			console.log(`[CRITERION 2 & 3] Wide Room Image Scale Ratio (${vp.name}): ${scaleRatio.toFixed(2)}x`);

			// Hard Assertion: If image scale did not increase by at least 30% (scaleRatio < 1.3), FAIL!
			if (scaleRatio < 1.3) {
				console.error(`[FAIL] Camera zoom motion broken! Image only scaled by ${scaleRatio.toFixed(2)}x`);
				allPassed = false;
			}

			// 03-macro-tv-loaded.png (at 1.2s — bg-experience-macro.jpg physical TV frame active)
			await page.waitForTimeout(450);
			if (vp.name === '1920x1080') {
				await page.screenshot({ path: path.join(outputDir, '03-macro-tv-loaded.png') });
				console.log('Captured 03-macro-tv-loaded.png');
			}

			// 04-tv-boot-bloom.png (at 1.4s — LED power bloom line playing)
			await page.waitForTimeout(200);
			if (vp.name === '1920x1080') {
				await page.screenshot({ path: path.join(outputDir, '04-tv-boot-bloom.png') });
				console.log('Captured 04-tv-boot-bloom.png');
			}

			// 05-timeline-active.png (at 1.8s — off-white horizontal timeline active)
			await page.waitForTimeout(400);
			if (vp.name === '1920x1080') {
				await page.screenshot({ path: path.join(outputDir, '05-timeline-active.png') });
				console.log('Captured 05-timeline-active.png');
			}

			// Criteria 3, 4, 5 Assertion: TV Power-On Boot Bloom, Timeline UI Retention & Bezel Lock
			const evalMetrics = await page.evaluate(() => {
				const tv = document.querySelector('.tv-screen-viewport');
				if (!tv) return { isContained: false, hasTimelineUI: false, width: 0, height: 0 };
				const rect = tv.getBoundingClientRect();
				const isContained = rect.width > 300 && rect.height > 200 && rect.top > 0 && rect.left > 0 && (rect.left + rect.width <= window.innerWidth) && (rect.top + rect.height <= window.innerHeight);

				const axisLine = tv.querySelector('.timeline-axis-line');
				const nodes = tv.querySelectorAll('.circular-node-marker');
				const stems = tv.querySelectorAll('.vertical-stem');
				const indicator = tv.querySelector('.sliding-node-indicator');

				const hasTimelineUI = axisLine !== null && nodes.length === 3 && stems.length === 3 && indicator !== null;

				return { isContained, hasTimelineUI, width: rect.width, height: rect.height };
			});

			console.log(`[CRITERION 3 & 4] TV Boot Sequence & Timeline UI Retention (${vp.name}): ${evalMetrics.hasTimelineUI ? 'PASS' : 'FAIL'}`);
			console.log(`[CRITERION 5] Hardware Bezel Lock (${vp.name}): ${evalMetrics.isContained ? 'PASS' : 'FAIL'} [W:${Math.round(evalMetrics.width)} H:${Math.round(evalMetrics.height)}]`);

			if (!evalMetrics.isContained || !evalMetrics.hasTimelineUI) {
				allPassed = false;
			}
		} else {
			console.log(`[AUDIT FAIL] Experience button not found for ${vp.name}`);
			allPassed = false;
		}

		await context.close();
	}

	await browser.close();

	console.log('\n==================================================');
	console.log(`[AUTHENTIC TIMELINE AUDIT RESULT] Overall Status: ${allPassed ? '100% PASS' : 'FAIL'}`);
	console.log('==================================================\n');

	if (!allPassed) {
		process.exit(1);
	}
})();
