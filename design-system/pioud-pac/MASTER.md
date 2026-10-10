# Pioud Energy — Design System (landing /pac)

Source de vérité pour les landing pages Ads (`/pac` et dérivées). Généré avec le skill
`ui-ux-pro-max` (recherches `--design-system`, `--domain style|color|landing|ux|typography`),
puis arbitré sur le brief : secteur rénovation énergétique, particuliers propriétaires
35–65 ans, ton rassurant et premium, couleurs vert foncé / crème et polices du site conservées.

Le profil automatique renvoyé par l'outil (bleu/violet, polices gaming, carrousel de
témoignages) contredisait le brief et n'a pas été retenu ; les correspondances vérifiées
sont celles ci-dessous.

## 1. Direction

- **Pattern de page** : Hero-Centric + Trust / Lead Magnet + Form (hero sombre avec promesse
  chiffrée, formulaire dans le hero, rangée de garanties, preuve par le chiffre, étapes, FAQ,
  CTA final). Pas de carrousel, pas de témoignages inventés.
- **Style** : famille « organic / biophilic » distillée : vert forêt, crème, filets fins,
  coins doux, ombres naturelles ; aucune texture ni forme organique décorative.
- **Ton** : éditorial et calme. Une seule promesse par écran, chiffres en display serif,
  mentions réglementaires toujours visibles mais discrètes.

## 2. Couleurs (tokens Tailwind existants)

| Rôle | Token | Valeur | Usage |
|---|---|---|---|
| Surface sombre | `forest` | #1F3A2E | Hero, CTA final, texte display sur crème |
| Surface claire | `cream` / `cream-soft` | #F4F1EA / variante | Fond de page, sections alternées |
| Surface neutre | `white` | #FFFFFF | Cartes (formulaire), section étapes |
| Texte principal | `ink` | — | Titres et corps sur clair |
| Texte secondaire | `ink-muted` / `ink-soft` | — | Chapeaux, métadonnées (≥ 4,5:1 sur crème) |
| Accent sur sombre | `emerald-400` | #34D399 | Mots clés du hero, coches, chiffres sur forest |
| Accent sur clair | `emerald-700` | #047857 | Mots clés et montants sur crème/blanc (jamais `emerald-400` sur clair : 2,3:1) |
| Action | `emerald-500` → `forest` au survol | #10B981 | Boutons primaires, balayage `.btn-wipe` |
| Filet | `ink/10` ou `white/15` | — | Séparateurs de listes, bordures de cartes |
| Erreur | `red-700` sur `red-50` | — | Messages de formulaire |

Interdits : dégradés décoratifs, halos flous, pastilles « kicker » au-dessus des titres,
logos Anah / MaPrimeRénov' / ADEME, mots « gratuit » et « 1 € » pour la PAC.

## 3. Typographie (polices du site)

| Rôle | Police | Taille / graisse | Notes |
|---|---|---|---|
| Display H1 | DM Serif Display (`font-display`) | 48 → 72 px, light, interligne 1.02, tracking −0.02em | `text-wrap: balance` |
| Sous-titre hero | DM Serif Display | 30 → 44 px | Accent `emerald-400` en italique |
| H2 | DM Serif Display | 36 → 48 px, interligne 1.05 | Toujours aligné à gauche |
| Chiffre clé | DM Serif Display | 96 → 120 px, tracking −0.03em | Un seul par page |
| Chapeau | Inter (`font-sans`) | 18 → 20 px, interligne 1.625, mesure 60 ch | `ink-muted` |
| Corps | Inter | 16 px minimum (17 px sur desktop dans le hero) | Jamais sous 16 px pour un texte à lire |
| Métadonnées | Inter | 13 px, `ink-soft` | Sous-libellés, mentions |
| Légal | Inter | 12 px, `ink-soft` | Footer et mentions réglementaires uniquement |
| Marque | Manrope (`font-brand`) 800 | 12 → 14 px, capitales | Wordmark seulement |

## 4. Espacements et formes

- Rythme vertical différencié par section : 64 → 112 px ; listes à filets `py-6/py-7`.
- Grille éditoriale 12 colonnes : titre sur 4–5 colonnes, contenu sur 6–7 colonnes décalé.
- Rayons : formulaire et champs 8 px, cartes photo 16 px, photo contenue 12 px, boutons pleins.
- Ombres : décalage + flou doux uniquement (`0 1px 2px` + `0 8px 24px -16px`, photos
  `0 24px 48px -12px`), jamais de halo coloré sans décalage.
- Cibles tactiles ≥ 44 px (boutons, options, liens du pied de page compris).

## 5. Interaction et mouvement

- Transitions 200–300 ms, ease-out ; balayage des boutons 300 ms ; zoom des cartes photo
  1,05 en 400 ms.
- Une seule entrée animée par vue (hero, CTA final) ; `prefers-reduced-motion` neutralise
  les translations et les zooms.
- Focus clavier visible partout : anneau `emerald-300` 2 px, décalé.
- Sélection de texte et curseur de saisie aux couleurs de la marque.
- Retour de soumission : état « Envoi en cours… », message d'erreur nommant la cause et un
  code technique, écran de confirmation personnalisé.

## 6. Accessibilité (règles vérifiées dans `ux-guidelines.csv`)

- Chaque champ possède un `label` associé (visuellement masqué si le placeholder suffit).
- Contraste ≥ 4,5:1 pour tout texte, ≥ 3:1 pour les grands titres.
- Corps ≥ 16 px sur mobile ; interligne 1,5–1,75.
- Icônes SVG (Lucide, trait 1,5) ; jamais d'emoji en guise d'icône.
- `cursor: pointer` sur tout élément cliquable.

## 7. Pages

- `/pac` : applique ce master sans surcharge. Les pages dérivées créent un fichier
  `pages/<slug>.md` uniquement pour ce qui diffère (promesse, logos autorisés, étapes).
