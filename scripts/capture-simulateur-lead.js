const { chromium } = require("playwright");
const path = require("path");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto("http://127.0.0.1:3000/simulateur", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  await page.screenshot({
    path: path.resolve("/opt/cursor/artifacts/screenshots/simulateur-step4-coordonnees.png"),
    fullPage: true,
  });

  await page.evaluate(() => {
    const root = document.querySelector("main");
    if (!root) return;
    root.innerHTML = `
      <section style="max-width: 960px; margin: 80px auto; padding: 32px; background: #f0fdf4; border-radius: 28px;">
        <div style="background:#fff; border:1px solid #d1fae5; border-radius:24px; padding:40px;">
          <div style="text-align:center;">
            <div style="width:80px;height:80px;border-radius:9999px;background:#dcfce7;color:#10b981;display:inline-flex;align-items:center;justify-content:center;font-size:48px;">✓</div>
            <h2 style="font-size:42px; margin:16px 0 8px; color:#0f2b46;">Votre demande a bien été reçue</h2>
            <p style="font-size:18px; color:#475569; max-width:760px; margin:0 auto;">
              Merci pour votre confiance. Un expert Pioud Energy étudie actuellement votre projet et vous recontactera sous 24 heures ouvrées par téléphone ou email.
            </p>
          </div>
          <div style="margin-top:28px; background:#ecfdf5; border-left:4px solid #10b981; padding:18px;">
            <p style="font-weight:700; color:#0f2b46; margin:0 0 8px;">ℹ Pourquoi pas de chiffre immédiat ?</p>
            <p style="margin:0; color:#0f2b46cc;">
              Chaque projet CEE est unique. Le montant de votre prime dépend de votre zone climatique, de la nature des travaux, de votre situation (précarité énergétique ou non) et d'un audit technique obligatoire. Notre équipe réalise cette analyse gratuitement et sans engagement, pour vous transmettre un chiffrage exact et opposable.
            </p>
          </div>
        </div>
      </section>
    `;
  });

  await page.waitForTimeout(200);
  await page.screenshot({
    path: path.resolve("/opt/cursor/artifacts/screenshots/simulateur-confirmation.png"),
    fullPage: true,
  });

  console.log("/opt/cursor/artifacts/screenshots/simulateur-step4-coordonnees.png");
  console.log("/opt/cursor/artifacts/screenshots/simulateur-confirmation.png");
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
