const { chromium } = require("playwright");
const path = require("path");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });

  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.click('button[aria-label="Ouvrir le menu"]');
  await page.waitForTimeout(400);

  const outputPath = path.resolve(
    "/opt/cursor/artifacts/screenshots/menu-mobile-open.png"
  );
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(outputPath);
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
