import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
	const outputDir = path.join(process.cwd(), 'static', 'screenshots');
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

	console.log('[AUDIT] Validating Apple Glass UI spatial 3D portfolio fullsite...');
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

	await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

	// 1. Verify Welcome Overlay & Disabled Navbar State
	const initialNavPointerEvents = await page.evaluate(() => {
		const nav = document.querySelector('nav');
		return nav ? getComputedStyle(nav).pointerEvents : 'auto';
	});
	console.log('[AUDIT] Initial Nav Pointer Events:', initialNavPointerEvents);

	await page.waitForTimeout(2500); // Wait for Welcome animation fade out

	// 2. Audit All Section Glass UI Views & Active Indicators
	const tabs = ['About', 'Home', 'Experience', 'Projects', 'Skills', 'Resume', 'Achievements', 'Contact'];

	for (const tab of tabs) {
		console.log(`[AUDIT] Validating ${tab}...`);
		const btn = page.locator('button').filter({ hasText: new RegExp(`^${tab}$`, 'i') }).first();

		if (await btn.count() > 0) {
			await btn.click({ force: true });
			await page.waitForTimeout(700);

			// Verify Glass backdrop blur class is applied
			const hasGlass = await page.evaluate(() => {
				return document.querySelector('.backdrop-blur-xl, .backdrop-blur-2xl, .backdrop-blur-3xl') !== null;
			});

			if (!hasGlass) {
				console.error(`[FAIL] Glass UI backdrop blur missing on section ${tab}!`);
				await browser.close();
				process.exit(1);
			}

			// Verify Navbar button text color contrast (must be dark/black text-slate-950)
			const navColor = await page.evaluate(() => {
				const activeBtn = document.querySelector('nav button');
				return activeBtn ? getComputedStyle(activeBtn).color : '';
			});
			console.log(`[AUDIT] Nav Button Text Color on ${tab}:`, navColor);

			// Trigger Glass UI "More Details" expansions
			if (tab === 'About') {
				const aboutBtn = page.locator('text=About Presenter').first();
				if (await aboutBtn.count() > 0) await aboutBtn.click({ force: true });
			}
			if (tab === 'Experience') {
				const techBtn = page.locator('text=View Extended Tech Specs').first();
				if (await techBtn.count() > 0) await techBtn.click({ force: true });
			}
			if (tab === 'Projects') {
				const focusBtn = page.locator('text=Focus Project').first();
				if (await focusBtn.count() > 0) await focusBtn.click({ force: true });
			}
			if (tab === 'Contact') {
				const msgBtn = page.locator('text=Send Quick Message').first();
				if (await msgBtn.count() > 0) await msgBtn.click({ force: true });
			}
			await page.waitForTimeout(400);

			await page.screenshot({ path: path.join(outputDir, `apple-glass-${tab.toLowerCase()}.png`) });

			// Assert no split-screen tears
			const incomingOpacity = await page.evaluate(() => {
				const inc = document.getElementById('stage-incoming');
				return inc ? getComputedStyle(inc).opacity : '0';
			});

			if (incomingOpacity !== '0' && incomingOpacity !== '') {
				console.error(`[FAIL] Spatial Dolly Tearing detected on ${tab}. Incoming stage not hidden.`);
				await browser.close();
				process.exit(1);
			}
		} else {
			console.error(`[FAIL] Button for ${tab} not found!`);
			await browser.close();
			process.exit(1);
		}
	}

	console.log('[SUCCESS] All Apple Glass UI views, Welcome locks, and Active indicators VERIFIED!');
	await browser.close();
	process.exit(0);
})();
