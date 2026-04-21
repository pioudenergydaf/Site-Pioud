const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const sampleWords = await page.evaluate(() => {
    const bodyText = document.body.innerText.toLowerCase();
    return {
      hasProfil: bodyText.includes("profil"),
      hasFinancement: bodyText.includes("financement"),
      hasEfficacite: bodyText.includes("efficacité"),
      hasFiable: bodyText.includes("fiable"),
      hasOfficiel: bodyText.includes("officiel"),
      hasDurablement: bodyText.includes("durablement"),
      hasAujourdhui: bodyText.includes("aujourd'hui"),
      hasPioudEnergy: bodyText.includes("pioud energy"),
    };
  });

  const headingFont = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    return {
      h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
      h2Font: h2 ? window.getComputedStyle(h2).fontFamily : null,
      h1Size: h1 ? window.getComputedStyle(h1).fontSize : null,
      h2Size: h2 ? window.getComputedStyle(h2).fontSize : null,
    };
  });

  console.log(JSON.stringify({ sampleWords, headingFont }, null, 2));
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
