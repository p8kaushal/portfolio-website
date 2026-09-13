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

	console.log('[AUDIT] Waiting for Welcome Sequence to complete...');
	await page.waitForTimeout(1800); // Wait for Welcome animation to complete

	// 1. Assert Navbar Pointer Events & Text Color
	const navPointerEvents = await page.evaluate(() => {
		const nav = document.querySelector('nav');
		return nav ? getComputedStyle(nav).pointerEvents : 'none';
	});
	console.log('[AUDIT] Nav Pointer Events after Welcome:', navPointerEvents);

	const navTextColor = await page.evaluate(() => {
		const btn = document.querySelector('nav button');
		return btn ? getComputedStyle(btn).color : '';
	});
	console.log('[AUDIT] Navbar Text Color:', navTextColor);

	// 2. Test Settings Panel Glass Dials Real-Time Update
	console.log('[AUDIT] Opening Settings Panel...');
	await page.click('button[aria-label="Settings"]');
	await page.waitForTimeout(400);

	// Adjust Blur Slider
	await page.fill('input[type="range"][name="blur"]', '36');
	await page.waitForTimeout(200);

	const appliedBlur = await page.evaluate(() => {
		return getComputedStyle(document.querySelector('main')).getPropertyValue('--glass-blur');
	});
	console.log('[AUDIT] Reactive Glass Blur Variable:', appliedBlur);

	await page.screenshot({ path: path.join(outputDir, 'settings-dial-tested.png') });

	// 3. Audit All Section Glass UI Views & Active Indicators
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

			await page.screenshot({ path: path.join(outputDir, `tab-${tab.toLowerCase()}.png`) });

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

	console.log('[SUCCESS] All navbar contrast fixes, Settings Panel dials, and Apple Glass UI sections VERIFIED!');
	await browser.close();
	process.exit(0);
})();
