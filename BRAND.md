# Blind Pass Resort Motel: Brand Extraction

Source: https://www.blindpassresort.com, extracted 2026-11-09.
Method: `site.css` and `custom.css` theme tokens, plus computed styles read from the rendered page in a browser.

## Fonts

| Role | Current site | Weights in use | Prototype |
|---|---|---|---|
| Headings | **Oswald** (Google Font), uppercase | Theme default 400. Most headings render 700 (bolded in the editor). | Oswald 400, uppercase |
| Body | **omnes-pro** (Adobe Typekit, not freely loadable) | 500 body, 700 bold | **Nunito** 500 / 700 (closest Google Font: rounded, humanist sans) |
| Buttons | omnes-pro | 700, no uppercase, 1.2em line height | Nunito 700 |
| Navigation | omnes-pro | 500 | Nunito 500 |
| Meta / small labels | Oswald | 400 | Oswald 400 |

Google Fonts URL (verified HTTP 200):
`https://fonts.googleapis.com/css2?family=Oswald:wght@400&family=Nunito:wght@500;700&display=swap`

**Nunito is a stand-in.** omnes-pro is Adobe-only, so Nunito replaces it for body, buttons and navigation.

Line heights on the current site: body 1.6. The heading theme value is 1.75, which suits only single short lines, so the prototype uses a tighter value.

### Found but not used

- **Fraunces** is set in `custom.css` on the Coastal Rewards nav link only. The font never loads on the live site, so visitors see the Georgia fallback. Excluded under the "one headline font only" rule.
- **alternate-gothic-no-3-d** is in the Typekit kit but is not used on the page.

## Colors

| Token | Hex | Source (HSL / RGB) | Where the current site uses it |
|---|---|---|---|
| Coral (accent) | `#F08E80` | `7.5, 78.87%, 72.16%` / `rgb(240,142,128)` | Buttons, H2 and H4 headings on white, footer links |
| Navy (dark accent) | `#0B0D63` | `238.64, 80%, 21.57%` / `rgb(11,13,99)` | Dark section backgrounds |
| Cream (light accent) | `#FDF0E6` | `26.09, 85.19%, 94.71%` / `rgb(253,240,230)` | Site background |
| White | `#FFFFFF` | `0, 0%, 100%` | Section backgrounds, text and headings on navy |
| Black | `#000000` | `0, 0%, 0%` | Body text and nav links on light sections, hero section background |
| Rewards teal | `#00A5A5` | `rgb(0,165,165)` | Coastal Rewards nav link only (`custom.css`) |
| Input background | `#FAFAFA` | `rgb(250,250,250)` | Form fields |

### Primary color

| Token | Hex | Notes |
|---|---|---|
| `--color-primary` | `#F08E80` | Buttons, links, focus rings, icons |
| `--color-primary-hover` | `#E8786A` | Hover and focus |
| `--color-on-primary` | `#2B2B2B` | Text on coral. White fails contrast at every size, so all button labels use this color. |

## Logo

`assets/img/logo.png`: 500 x 99 px, transparent PNG. It has dark gray lettering and a blue, yellow and white palm mark.

- The largest source available is 500 px wide. It stays sharp on retina screens up to about 250 px display width.
- The lettering is dark gray, so the logo needs a light background.

## Contrast Check (WCAG)

| Pair | Ratio | Result |
|---|---|---|
| Navy on cream | 15.0:1 | Pass |
| Black on cream | 18.78:1 | Pass |
| Coral on navy | 7.1:1 | Pass |
| `#2B2B2B` on coral | 5.99:1 | Pass |
| `#2B2B2B` on coral hover | 4.94:1 | Pass |
| White on coral | 2.36:1 | **Fail** |
| White on coral hover | 2.87:1 | **Fail** |
| Coral on white | 2.36:1 | **Fail**, even for large text (3:1 needed) |
| Coral on cream | 2.11:1 | **Fail** |
| Rewards teal on white | 3.03:1 | Large text only |

## Proposed Usage

- **Headings:** navy on white and cream, white or coral on navy. This changes the coral-on-white headings on the current site, which fail contrast. Coral text links on white stay underlined because coral alone fails contrast (2.36:1).
- **Body text:** black on light sections, white on navy.
- **Section backgrounds:** alternate white, cream and navy.
- **Rewards teal:** not used.

CSS variables live in `:root` in `assets/css/style.css`.
