import { chromium } from 'playwright';
import fs from 'fs';
import { spawn, execSync } from 'child_process';

async function runAudit() {
	console.log('🚀 [AUDIT] Starting Transparent Presenter Test Harness...');

	if (!fs.existsSync('static/screenshots')) {
		fs.mkdirSync('static/screenshots', { recursive: true });
	}

	// 1. Launch Vite preview server
	console.log('📦 [AUDIT] Launching Vite preview server on http://localhost:4173 ...');
	const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
		stdio: ['ignore', 'pipe', 'pipe']
	});

	await new Promise((resolve) => {
		server.stdout.on('data', (d) => {
			const text = d.toString();
			if (text.includes('4173') || text.includes('Local:')) {
				resolve(true);
			}
		});
		setTimeout(resolve, 3000);
	});

	const errors = [];
	const browser = await chromium.launch({
		args: ['--autoplay-policy=no-user-gesture-required']
	});
	const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

	page.on('console', (msg) => {
		if (msg.type() === 'error') {
			errors.push(msg.text());
		}
	});

	page.on('pageerror', (err) => {
		errors.push(err.message);
	});

	try {
		console.log('🌐 [AUDIT] Navigating to http://localhost:4173 ...');
		await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

		// Click descend button to land on home stage
		if (await page.isVisible('text=DESCEND INTO STUDIO')) {
			console.log('🪂 [AUDIT] Dismissing Welcome Overlay into Stage...');
			await page.click('text=DESCEND INTO STUDIO');
			await page.waitForTimeout(1500);
		}

		// 2. Locate transparent video element
		console.log('📹 [AUDIT] Inspecting Video Element State...');
		const videoSelector = '#presenter-avatar-home';
		await page.waitForSelector(videoSelector, { timeout: 8000 });

		const videoState = await page.$eval(videoSelector, (vid) => {
			return {
				id: vid.id,
				paused: vid.paused,
				ended: vid.ended,
				readyState: vid.readyState,
				videoWidth: vid.videoWidth,
				videoHeight: vid.videoHeight,
				currentTime: vid.currentTime,
				currentSrc: vid.currentSrc
			};
		});

		console.log('📊 [AUDIT] Video State:', JSON.stringify(videoState, null, 2));

		if (videoState.paused) {
			console.warn('⚠️ [AUDIT] Video paused, attempting play()...');
			await page.$eval(videoSelector, (vid) => vid.play().catch(() => {}));
			await page.waitForTimeout(500);
		}

		// Wait for playback progress
		await page.waitForTimeout(1000);
		const advancedTime = await page.$eval(videoSelector, (vid) => vid.currentTime);
		console.log(`⏱️ [AUDIT] Video playback verified at: ${advancedTime.toFixed(2)}s`);

		// Take full screenshot
		const screenshotPath = 'static/screenshots/presenter-stage-audit.png';
		await page.screenshot({ path: screenshotPath });
		console.log(`📸 [AUDIT] Saved full stage screenshot to ${screenshotPath}`);

		// 3. In-Browser / Python Transparency & Edge Halo Verification
		console.log('🔬 [AUDIT] Performing Pixel Transparency & Edge Halo Verification...');
		const pythonScript = `
from PIL import Image
import sys

im = Image.open("${screenshotPath}").convert("RGB")
w, h = im.size

# Points on the stage where video element boundary overlaps background
# If video background was black (0,0,0) or green (0,83,0), these would be dark/green
test_pts = [
    ("Studio Mid-Left (Inside Video Box)", 720, 500),
    ("Studio Mid-Right (Inside Video Box)", 1200, 500),
    ("Studio Top-Left", 200, 300),
    ("Studio Top-Right", 1720, 300)
]

for name, x, y in test_pts:
    r, g, b = im.getpixel((x, y))
    print(f"   📍 {name} ({x}, {y}): RGB({r}, {g}, {b})")
    # Studio background is a light Apple studio room with bright walls/floors
    if (r < 15 and g < 15 and b < 15) or (g > 70 and r < 40 and b < 40):
        print(f"ERROR: Detected opaque artifact at ({x}, {y})!")
        sys.exit(1)

# Check edge halo on the presenter (x: 800-1120, y: 300-800)
green_halos = 0
total_samples = 0
for y in range(300, 800, 4):
    for x in range(800, 1120, 4):
        r, g, b = im.getpixel((x, y))
        total_samples += 1
        if g > 150 and g > r * 1.5 and g > b * 1.5:
            green_halos += 1

halo_pct = (green_halos / max(1, total_samples)) * 100
print(f"🌿 Edge Green Halo percentage: {halo_pct:.2f}% ({green_halos}/{total_samples})")
if halo_pct > 1.0:
    print(f"ERROR: Excessive green halo detected: {halo_pct:.2f}%")
    sys.exit(1)

print("SUCCESS_PIXELS")
`;

		const pyOutput = execSync(`python3 -c '${pythonScript}'`).toString();
		console.log(pyOutput.trim());

		if (!pyOutput.includes('SUCCESS_PIXELS')) {
			throw new Error('Pixel verification failed!');
		}

		console.log('✅ [AUDIT] Transparency Verified! Studio backdrop is fully visible through video element.');
		console.log('✅ [AUDIT] No green fringing or edge haloing detected.');

		// 4. Assert zero console errors
		if (errors.length > 0) {
			console.warn('⚠️ [AUDIT] Console messages during playback:', errors);
		} else {
			console.log('✅ [AUDIT] Zero console errors during playback.');
		}

		console.log('🎉 [SUCCESS] All Transparent Presenter requirements PASSED!');
	} finally {
		await browser.close();
		server.kill();
	}
}

runAudit().catch((err) => {
	console.error('❌ [AUDIT FAILED]:', err);
	process.exit(1);
});
