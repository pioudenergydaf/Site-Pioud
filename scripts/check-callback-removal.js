const { chromium } = require("playwright");

async function hasText(page, text) {
  const bodyText = await page.locator("body").innerText();
  return bodyText.toLowerCase().includes(text.toLowerCase());
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto("http://127.0.0.1:3000/contact", { waitUntil: "networkidle" });
  const contactHasMainForm =
    (await page.locator('input[name="name"]').count()) > 0 &&
    (await page.locator('textarea[name="message"]').count()) > 0;
  const contactHasCallbackCopy =
    (await hasText(page, "Formulaire de rappel")) ||
    (await hasText(page, "Planifier mon rappel")) ||
    (await hasText(page, "Choisissez un créneau horaire"));

  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  const homeHasCallbackCopy =
    (await hasText(page, "Formulaire de rappel")) ||
    (await hasText(page, "Planifier mon rappel")) ||
    (await hasText(page, "Choisissez un créneau horaire"));

  await page.goto("http://127.0.0.1:3000/simulateur", { waitUntil: "networkidle" });
  const simulateurVisible = (await page.locator("h1").count()) > 0;

  console.log(
    JSON.stringify(
      {
        contactHasMainForm,
        contactHasCallbackCopy,
        homeHasCallbackCopy,
        simulateurVisible,
      },
      null,
      2,
    ),
  );

  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
