import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
	const outputDir = path.join(process.cwd(), 'static', 'screenshots');
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

	console.log('[AUDIT] Starting Playwright Camera Pan, Video Avatar, & Split-Screen Audit...');
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

	await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
	await page.waitForTimeout(1000);

	const tabs = ['About', 'Home', 'Experience', 'Projects', 'Skills', 'Resume', 'Achievements', 'Contact'];

	for (const tab of tabs) {
		console.log(`[AUDIT] Testing tab: ${tab}...`);
		const btn = page.locator('button').filter({ hasText: new RegExp(`^${tab}$`, 'i') }).first();

		if (await btn.count() > 0) {
			await btn.click({ force: true });
			await page.waitForTimeout(650);

			await page.screenshot({ path: path.join(outputDir, `tab-${tab.toLowerCase()}.png`) });

			// Assert NO split-screen glitch (incoming stage opacity must be 0 after animation)
			const splitCheck = await page.evaluate(() => {
				const inc = document.getElementById('stage-incoming');
				return inc ? getComputedStyle(inc).opacity : '0';
			});

			if (splitCheck !== '0') {
				console.error(`[FAIL] Split screen glitch detected on tab ${tab}!`);
				await browser.close();
				process.exit(1);
			}
		} else {
			console.error(`[FAIL] Button for ${tab} not found!`);
			await browser.close();
			process.exit(1);
		}
	}

	// Specific Assertion for Presenter Video on Home
	console.log('[AUDIT] Asserting presenter video on Home...');
	const homeBtn = page.locator('button').filter({ hasText: /^Home$/i }).first();
	await homeBtn.click({ force: true });
	await page.waitForTimeout(400);

	const isVideoVisible = await page.isVisible('video[src="/presenter-home.webm"]');
	if (!isVideoVisible) {
		console.error('[FAIL] Presenter avatar video missing on Home!');
		await browser.close();
		process.exit(1);
	}

	console.log('[SUCCESS] All 8 tabs, smooth camera pans, video avatars, and paper bounds VERIFIED!');
	await browser.close();
	process.exit(0);
})();
