const { chromium } = require("playwright");
const path = require("path");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
  });

  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  const closedPath = path.resolve(
    "/opt/cursor/artifacts/screenshots/menu-mobile-closed-375.png"
  );
  await page.screenshot({ path: closedPath, fullPage: true });

  await page.click('button[aria-label="Ouvrir le menu"]');
  await page.waitForTimeout(500);

  const openPath = path.resolve(
    "/opt/cursor/artifacts/screenshots/menu-mobile-open-375.png"
  );
  await page.screenshot({ path: openPath, fullPage: true });

  console.log(closedPath);
  console.log(openPath);
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
