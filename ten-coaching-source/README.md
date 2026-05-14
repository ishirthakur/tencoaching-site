# Ten Coaching — React/JSX source

Three files. Open `index.html` directly in a browser — no build step.

## Files
- **`index.html`** — Loads React 18, ReactDOM and Babel-standalone from unpkg, then renders `<VariantC>` inside `#root`. The `onBook` handler is wired to a placeholder `window.alert` — swap for your real booking flow.
- **`variant-c.jsx`** — The whole landing page. Contains:
  - `VariantC` — the main component
  - `Placeholder`, `LogoMark`, `Logo`, `Img` — temporary visual stand-ins for real photography and the Wu Kong logo
  - Data arrays: `TESTIMONIALS`, `GALLERY`, `POSTS`, `FAQS`
  - `PALETTES` — sage (default) + original orange (kept behind the Tweaks toggle)
  - `hexToRgbTriplet`, `hexToRgba`, `tintAlpha` — color helpers
- **`tweaks-panel.jsx`** — Design-time tweak controls. Safe to delete in production; remove its `<script>` tag from `index.html` and the `<TweaksPanel>…</TweaksPanel>` block at the bottom of `variant-c.jsx` if you do.

## Palette
| Token | Hex | Role |
|---|---|---|
| `CREAM` | `#F5EDD8` | Page background, text on dark sections |
| `INK`   | `#2A2A28` | Primary text, dark sections, borders, offset shadows |
| `DEEP`  | `#5C7A4F` | Primary CTAs, italic accent words, section labels, final-CTA bg |
| `MID`   | `#8FAE7F` | Badges, tags, the "60KG → 86KG" stamp, tape strip |
| `LIGHT` | `#A8C49A` | Highlights on dark backgrounds (stat numbers, [02] label, "BUILT AROUND YOU." accent) |

## Type
- **Display**: Bebas Neue (Google Fonts)
- **Sans**: Space Grotesk
- **Mono**: JetBrains Mono

## Porting into a real codebase
The styling is inline `style={{…}}` because this is a Babel-in-browser prototype. When you move it into Next.js / Vite / etc., extract the palette into design tokens (CSS variables or a theme object) and replace inline styles with your preferred styling solution. The 4 "Book a call" buttons should become one shared component. `Placeholder` and `LogoMark` should be deleted entirely — they exist only as stand-ins for real assets.
