---
name: maintenance-pioud
description: Maintenance du site Pioud Energy (Next.js sur Vercel, DNS Hostinger, landing pages Ads /pac). Use when the user runs /maintenance-pioud with "mensuel" (routine du mois), "sauvegarde" (archive complète hors GitHub), "landing <offre>" (nouvelle landing page Ads) or "aides" (mise à jour des montants et fiches CEE), or asks for the monthly maintenance, a backup, a new Ads landing page, or an update of aid amounts.
user-invocable: true
argument-hint: "mensuel | sauvegarde | landing <offre> | aides"
---

# Maintenance Pioud Energy

Contexte : Next.js sur Vercel, repo GitHub (branche `main` = production, chaque push déploie), DNS Hostinger. Landing pages Ads sous `/pac` (parcours Maison et Appartement/copropriété), sans header/footer, en `noindex`, conversions Google Ads via `reportConversion` dans `lib/gtag.ts`.

## Quand l'utiliser

- `/maintenance-pioud mensuel` : routine du mois.
- `/maintenance-pioud sauvegarde` : archive complète hors GitHub.
- `/maintenance-pioud landing <offre>` : nouvelle landing page Ads.
- `/maintenance-pioud aides` : mise à jour des montants et fiches CEE.

Sans argument : demander lequel des quatre modes lancer.

## Routine mensuelle

1. `git status` propre, `git pull`, puis `npm outdated` ; mettre à jour patch/minor, build, tester les formulaires en local, commit "chore: deps".
2. Vérifier que `/`, `/pac` et `/api/contact` répondent en production (fetch 200) ; tester un envoi de formulaire et confirmer la réception email + ligne Sheet.
3. Vérifier les montants d'aides affichés (MaPrimeRénov', prime CEE, seuils de revenus) contre les sources officielles de l'année ; mettre à jour les constantes dans le fichier de config dédié (`lib/pac-constants.ts`) ; garder la mention "montant indicatif, sous conditions".
4. Vérifier les fiches CEE citées (BAR-TH-171, BAR-TH-179, etc.) : non abrogées, version en vigueur.
5. Lancer `/securite-pioud audit` et `/seo-pioud audit` en version rapide.
6. Résumé en 8 lignes max, commit + push.

Note : tant que `/securite-pioud` et `/seo-pioud` ne sont pas définis, l'étape 5 utilise les skills installés : `semgrep` en mode "important only" sur `app/api` et `lib`, `supply-chain-risk-auditor` sur `package-lock.json`, et `/seo audit https://www.pioudenergy.fr`.

## Sauvegarde (hors GitHub)

1. `git bundle create pioud-site-AAAA-MM-JJ.bundle --all` à la racine.
2. Exporter la liste des variables d'env Vercel (noms seulement + rappel de les copier manuellement avec leurs valeurs dans le gestionnaire de mots de passe). Les noms attendus sont dans `.env.example`.
3. Zipper `public/` (images, logos) et le bundle dans `~/Sauvegardes/pioud-site-AAAA-MM-JJ.zip`, hors du repo.
4. Rappeler à l'utilisateur de copier le zip sur un disque externe ou un drive personnel. Créer aussi un tag git `backup-AAAA-MM-JJ` et le pousser.

## Nouvelle landing page Ads

- Dupliquer la structure de `/pac` : layout isolé (`components/layout/site-chrome.tsx`, liste `STANDALONE_PREFIXES`), `noindex`, aucun lien sortant sauf mentions légales/confidentialité, formulaire multi-étapes branché sur `/api/contact` avec un `form` dédié et un libellé de conversion propre dans `lib/gtag.ts`.
- Hero fond vert foncé, promesse chiffrée, formulaire dans le hero, bandeau de logos autorisés (RGE QualiPAC, CEE, Coup de pouce, APRIL), section reste à charge, étapes, FAQ, CTA final, bouton sticky mobile.
- Paramètres UTM/gclid conservés et transmis dans l'email interne (mécanisme existant dans `lib/pac-estimate.ts` et `lib/pac-lead.ts`).
- Interdits : "gratuit", "1 €", logos Anah/MaPrimeRénov'/ADEME, avis inventés, numéro de téléphone (contact par formulaire uniquement).

## Mise à jour des aides

- Montants et seuils : `lib/pac-constants.ts` (`PRIME_ESTIMEE_PAR_TRANCHE`, `RESTE_A_CHARGE_PAR_TRANCHE`, `INCOME_THRESHOLDS_IDF`) ; cartes des pages Particuliers dans `app/particuliers/*`.
- Citer la source officielle et l'année dans le message de commit.
- Ne jamais inventer un montant : en l'absence de source, afficher "selon devis".

## Règles

- Toujours `npm run build` avant commit ; ne jamais pousser un build cassé.
- Changements de design uniquement avec les couleurs et polices existantes du site.
- Réponses courtes, sans afficher le code.
