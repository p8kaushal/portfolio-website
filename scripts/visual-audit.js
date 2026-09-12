import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
	const outputDir = path.join(process.cwd(), 'static', 'screenshots');
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	console.log('Starting Playwright Visual Audit on http://localhost:5180...');
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1920, height: 1080 }
	});

	const page = await context.newPage();
	await page.goto('http://localhost:5180', { waitUntil: 'networkidle' });
	
	// Wait 3.0s for Keynote Intro overlay to finish its 2.5s GSAP curtain dissolve
	console.log('Waiting for Keynote Intro animation to dissolve...');
	await page.waitForTimeout(3000);

	const tabs = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Resume', 'Achievements', 'Contact'];

	for (let i = 0; i < tabs.length; i++) {
		const tabName = tabs[i];
		console.log(`Auditing Tab: ${tabName}`);
		
		// Target nav button accurately by desktop navbar structure
		const tabButton = page.locator(`header nav button:has-text("${tabName}"), nav button:has-text("${tabName}")`).first();
		if (await tabButton.count() > 0) {
			await tabButton.click();
			
			// Capture transition keyframe halfway into GSAP pan (0.4s)
			await page.waitForTimeout(400);
			const fromTab = i === 0 ? 'Home' : tabs[i - 1];
			await page.screenshot({ path: path.join(outputDir, `trans-${fromTab.toLowerCase()}-to-${tabName.toLowerCase()}.png`) });

			// Wait 1.0s for settled stage view and capture full-screen section snapshot
			await page.waitForTimeout(1000);
			await page.screenshot({ path: path.join(outputDir, `section-${tabName.toLowerCase()}.png`) });
			// Also save to tab-[name].png for compatibility
			await page.screenshot({ path: path.join(outputDir, `tab-${tabName.toLowerCase()}.png`) });
		} else {
			console.warn(`Tab button for ${tabName} not found.`);
		}
	}

	await browser.close();
	console.log(`Visual Audit Complete! Screenshots saved to ${outputDir}`);
})();
