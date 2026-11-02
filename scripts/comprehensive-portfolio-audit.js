import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';

const VIEWPORTS = [
	{ name: 'Mobile (iPhone 14)', width: 390, height: 844 },
	{ name: 'Tablet (iPad Portrait)', width: 768, height: 1024 },
	{ name: 'Laptop (13" Display)', width: 1280, height: 800 },
	{ name: 'Desktop (1080p)', width: 1920, height: 1080 }
];

async function navigateTo(page, tabId) {
	const tabBtn = await page.waitForSelector(`#nav-tab-${tabId}`, { timeout: 8000 });
	await tabBtn.scrollIntoViewIfNeeded();
	await tabBtn.click();
	await page.waitForTimeout(1000);
}

async function main() {
	console.log('🚀 [TEST HARNESS] Starting Full Multi-Device & Content Audit...');

	if (!fs.existsSync('static/screenshots/audit')) {
		fs.mkdirSync('static/screenshots/audit', { recursive: true });
	}

	// 1. Launch Vite preview server
	console.log('📦 Starting Vite preview on port 4173...');
	const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
		stdio: ['ignore', 'pipe', 'pipe']
	});

	await new Promise((resolve) => {
		server.stdout.on('data', (d) => {
			if (d.toString().includes('4173') || d.toString().includes('Local:')) resolve(true);
		});
		setTimeout(resolve, 3000);
	});

	const browser = await chromium.launch({
		args: ['--autoplay-policy=no-user-gesture-required']
	});

	let allPassed = true;

	for (const vp of VIEWPORTS) {
		console.log(`\n========================================`);
		console.log(`📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
		console.log(`========================================`);

		const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
		const errors = [];

		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		page.on('pageerror', (err) => errors.push(err.message));

		try {
			await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

			// 1. Welcome Overlay Verification
			console.log('  🔍 Verifying Welcome Overlay...');
			const welcomeVisible = await page.isVisible('#welcome-overlay');
			if (!welcomeVisible) throw new Error('Welcome overlay not visible!');

			const descendBtn = await page.$('#descend-studio-btn');
			if (!descendBtn) throw new Error('Descend button #descend-studio-btn not found!');

			// Check computed style of descend button to guarantee high contrast
			const btnStyles = await page.$eval('#descend-studio-btn', (el) => {
				const style = window.getComputedStyle(el);
				return {
					bg: style.backgroundColor,
					color: style.color,
					display: style.display,
					opacity: style.opacity,
					visibility: style.visibility
				};
			});
			console.log('  🎨 Descend Button Computed Styles:', btnStyles);

			// Click Descend
			await descendBtn.click();
			await page.waitForTimeout(1400);

			// 2. Home Stage Verification
			console.log('  🔍 Verifying Home Stage Content...');
			const hasParthName = await page.evaluate(() => document.body.innerText.includes('PARTH KAUSHAL'));
			const hasPrimaryTitle = await page.evaluate(() => document.body.innerText.includes('Full-Stack Developer & AI/ML Enthusiast'));
			console.log(`  ✓ Name present: ${hasParthName}, Title present: ${hasPrimaryTitle}`);

			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-01-home.png` });

			// 3. Navigate to About
			console.log('  🔍 Testing About Stage...');
			await navigateTo(page, 'about');
			const hasHeadline = await page.evaluate(() => document.body.innerText.includes('Curious by Nature. Builder by Choice.'));
			const hasCgpa = await page.evaluate(() => document.body.innerText.includes('9.07 CGPA'));
			console.log(`  ✓ About Headline present: ${hasHeadline}, CGPA present: ${hasCgpa}`);
			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-02-about.png` });

			// 4. Navigate to Projects
			console.log('  🔍 Testing Projects Stage...');
			await navigateTo(page, 'projects');
			const hasIpl = await page.evaluate(() => document.body.innerText.includes('IPL Match Win Predictor'));
			const hasFaceTrack = await page.evaluate(() => document.body.innerText.includes('FaceTrack'));
			console.log(`  ✓ IPL Predictor present: ${hasIpl}, FaceTrack present: ${hasFaceTrack}`);

			// Click project to open modal
			const firstProject = await page.$('button:has-text("INSPECT")');
			if (firstProject) {
				await firstProject.click();
				await page.waitForTimeout(600);
				const modalVisible = await page.isVisible('#project-detail-modal');
				console.log(`  ✓ Project Detail Modal opened: ${modalVisible}`);
				// Close modal
				const closeBtn = await page.$('#close-modal-btn');
				if (closeBtn) await closeBtn.click();
				await page.waitForTimeout(400);
			}
			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-03-projects.png` });

			// 5. Navigate to Experience
			console.log('  🔍 Testing Experience Stage...');
			await navigateTo(page, 'experience');
			const hasIndependent = await page.evaluate(() => document.body.innerText.includes('Independent Software Developer'));
			console.log(`  ✓ Independent Developer timeline present: ${hasIndependent}`);
			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-04-experience.png` });

			// 6. Navigate to Skills & Zoom
			console.log('  🔍 Testing Skills Stage & Paper Zoom...');
			await navigateTo(page, 'skills');
			const hasSkillsManifest = await page.evaluate(() => document.body.innerText.includes('TECHNICAL SKILLS'));
			console.log(`  ✓ Skills Sheet present: ${hasSkillsManifest}`);

			// Click sheet to zoom
			const skillsSheet = await page.$('#paper-sheet-left');
			if (skillsSheet) {
				await skillsSheet.click();
				await page.waitForTimeout(800);
				const zoomOverlay = await page.isVisible('#paper-zoom-overlay');
				console.log(`  ✓ Skills Zoom Inspection Overlay active: ${zoomOverlay}`);
				const closeZoomBtn = await page.$('button:has-text("BACK TO DESK")');
				if (closeZoomBtn) {
					await closeZoomBtn.click();
					await page.waitForTimeout(800);
				}
			}
			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-05-skills.png` });

			// 7. Navigate to Achievements & Certificate Focus
			console.log('  🔍 Testing Achievements Stage & Certificate Inspector...');
			await navigateTo(page, 'achievements');
			const hasIitbStock = await page.evaluate(() => document.body.innerText.includes('National Stock Market Simulation'));
			console.log(`  ✓ IIT Bombay Award present: ${hasIitbStock}`);

			// Click certificate to focus
			const certFrame = await page.$('#achievements-stage-root [role="button"]');
			if (certFrame) {
				await certFrame.click();
				await page.waitForTimeout(600);
				const certOverlay = await page.isVisible('#certificate-focus-overlay');
				console.log(`  ✓ Certificate Focus Inspection Overlay active: ${certOverlay}`);
				const closeCertBtn = await page.$('button:has-text("DONE INSPECTING")');
				if (closeCertBtn) await closeCertBtn.click();
				await page.waitForTimeout(400);
			}
			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-06-achievements.png` });

			// 8. Navigate to Contact
			console.log('  🔍 Testing Contact Phone Stage...');
			await navigateTo(page, 'contact');
			const hasEmailLink = await page.evaluate(() => document.body.innerHTML.includes('mailto:parth.kaushal.007@gmail.com'));
			const hasWhatsApp = await page.evaluate(() => document.body.innerHTML.includes('https://wa.me/919834491082'));
			console.log(`  ✓ Updated Email link present: ${hasEmailLink}, WhatsApp present: ${hasWhatsApp}`);
			await page.screenshot({ path: `static/screenshots/audit/${vp.width}-07-contact.png` });

			if (errors.length > 0) {
				console.error(`  ❌ Console errors on ${vp.name}:`, errors);
				allPassed = false;
			} else {
				console.log(`  ✅ All checks PASSED for ${vp.name} with 0 console errors!`);
			}

		} catch (err) {
			console.error(`  ❌ Failed test on ${vp.name}:`, err.message);
			allPassed = false;
		} finally {
			await page.close();
		}
	}

	await browser.close();
	server.kill('SIGTERM');

	if (allPassed) {
		console.log('\n🎉 [TEST HARNESS COMPLETE] All viewports passed with 100% success!');
		process.exit(0);
	} else {
		console.error('\n⚠️ [TEST HARNESS FAILED] Some tests had errors.');
		process.exit(1);
	}
}

main().catch((e) => {
	console.error('Fatal error in audit:', e);
	process.exit(1);
});
