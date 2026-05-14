# TENSCOACHING — Frontend Design System

## Brand Identity

TENSCOACHING is a fitness and sports coaching brand rooted in martial arts heritage, discipline, and warrior culture. The mascot is a Sun Wukong / monkey warrior character — a figure of mythic strength, agility, and fighting spirit. The aesthetic draws from:

- **Vintage athletic apparel** (1970s–90s sports brands, varsity, collegiate)
- **Hand-drawn / illustrated linework** (woodcut prints, ink illustrations, stamp textures)
- **Martial arts tradition** (East Asian calligraphic influence, dojo culture)
- **Earthy, physical materials** — raw canvas, leather, worn cotton, chalk on a blackboard

This is NOT a SaaS product. It is NOT a wellness app. It is a coaching brand for people who train hard. Every design decision should feel like it was crafted, printed, or stamped — not generated.

---

## AVOID AT ALL COSTS

These patterns belong to generic tech/wellness brands, not TENSCOACHING:

- **No gradient hero text** (no `bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500`)
- **No purple, blue, or teal** as primary brand colors
- **No glassmorphism** (`backdrop-blur`, frosted panels, translucent cards)
- **No rounded-3xl cards** with drop shadows — softness undermines the warrior aesthetic
- **No generic sans-serif-only typography** — headings must have character
- **No "hero section with centered gradient text + glowing CTA button"** — this is the default AI layout and it is forbidden
- **No stock-photo fitness imagery style** (white background, smiling person in athleisure)
- **No micro-animation everything** — motion should be purposeful, not decorative
- **No Tailwind default color palette** (slate-500, violet-600, etc.) used as brand colors

---

## Color Palette

All colors reference the TENSCOACHING brand. Use CSS custom properties.

```css
:root {
  /* Backgrounds */
  --color-cream:        #F5F0E8;   /* primary background — aged paper, raw canvas */
  --color-cream-dark:   #EDE6D6;   /* subtle section differentiation */
  --color-off-white:    #FAF8F3;   /* card surfaces, elevated panels */

  /* Primary Brand — Sage Green */
  --color-sage:         #7A9E7E;   /* primary brand color */
  --color-sage-dark:    #5C7A60;   /* hover states, borders */
  --color-sage-light:   #A8C2AB;   /* tints, backgrounds */
  --color-sage-muted:   #D4E3D5;   /* very light fills, tag backgrounds */

  /* Accent — Burnt Orange / Ochre */
  --color-ochre:        #C8702A;   /* call to action, highlights, warrior energy */
  --color-ochre-dark:   #A35A1E;   /* hover on CTA */
  --color-ochre-light:  #E8A96A;   /* warm tints */

  /* Text */
  --color-charcoal:     #2C2C2C;   /* primary text — not pure black */
  --color-charcoal-mid: #4A4A4A;   /* body copy */
  --color-warm-gray:    #7A7369;   /* secondary text, captions */
  --color-warm-gray-lt: #B0A89E;   /* placeholder, disabled */

  /* Structural */
  --color-ink:          #1A1A18;   /* borders, strong strokes, headings when punchy */
  --color-rule:         #C8C0B0;   /* horizontal rules, dividers */
  --color-stamp-red:    #B83232;   /* error states, warning badges — ink stamp feel */
}
```

### Color Usage Rules

- **Backgrounds**: Always cream or off-white. Never white (#fff) as a page background.
- **Sage green** is the brand primary — use for nav accents, active states, tags, secondary buttons.
- **Ochre** is the action color — CTAs, highlights, price callouts. Use sparingly; it should feel like a stamp of approval.
- **Charcoal** for text, never true black. The slight warmth matches the paper tones.
- Avoid mixing ochre and sage in close proximity unless intentional (they work together as a pair).

---

## Typography

### Font Stack

```css
:root {
  /* Headings — Serif with character */
  --font-heading: Georgia, 'Times New Roman', Times, serif;

  /* Display / Hero — Consider a custom vintage serif or slab if loading web fonts */
  /* Candidates: 'Playfair Display', 'Arvo', 'Alfa Slab One', 'Teko' */
  --font-display: Georgia, var(--font-heading);

  /* Body — Readable, slightly warm sans-serif */
  --font-body: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* Or with Google Fonts: 'DM Sans', 'Inter' with weight 400/500 only */

  /* Mono / Label — Used for stats, codes, classification labels */
  --font-mono: 'Courier New', Courier, monospace;

  /* Condensed / Athletic — For scores, callouts, athletic stats */
  /* Candidates: 'Barlow Condensed', 'Oswald', 'Teko' */
  --font-condensed: 'Arial Narrow', Arial, sans-serif;
}
```

### Type Scale (8px grid base)

```css
/* rem values anchored to 16px root */
--text-xs:   0.75rem;   /* 12px — labels, tags, footnotes */
--text-sm:   0.875rem;  /* 14px — captions, metadata */
--text-base: 1rem;      /* 16px — body copy */
--text-md:   1.125rem;  /* 18px — lead paragraph */
--text-lg:   1.25rem;   /* 20px — card titles, sub-headings */
--text-xl:   1.5rem;    /* 24px — section headings */
--text-2xl:  2rem;      /* 32px — page headings */
--text-3xl:  2.5rem;    /* 40px — hero sub-headings */
--text-4xl:  3.5rem;    /* 56px — hero headings */
--text-5xl:  5rem;      /* 80px — display / impact text */
```

### Typography Rules

- **Headings** (`h1`–`h3`): Always `var(--font-heading)`, `font-weight: 700`, `color: var(--color-ink)` or `var(--color-charcoal)`.
- **Lead text / h4–h6**: Can use condensed sans at heavier weights for athletic punch.
- **Body copy**: `var(--font-body)`, `font-weight: 400`, `line-height: 1.65`, `color: var(--color-charcoal-mid)`.
- **ALL CAPS labels**: Use `letter-spacing: 0.12em` with `font-size: var(--text-xs)` or `--text-sm`. These feel like garment labels or dojo signage.
- **Never** use gradient text fills on headings.
- **Decorative rules**: A single `border-bottom: 2px solid var(--color-ink)` under a heading is better than a decorative gradient underline.

---

## Spacing Grid

All spacing is derived from an **8px base unit**. Use multiples strictly.

```css
--space-1:   4px;    /* 0.5 unit — tight insets, icon gaps */
--space-2:   8px;    /* 1 unit — base */
--space-3:   12px;   /* 1.5 units */
--space-4:   16px;   /* 2 units — standard padding */
--space-5:   24px;   /* 3 units */
--space-6:   32px;   /* 4 units — section internal spacing */
--space-7:   48px;   /* 6 units */
--space-8:   64px;   /* 8 units — section vertical padding */
--space-9:   96px;   /* 12 units */
--space-10:  128px;  /* 16 units — large section gaps */
--space-11:  192px;  /* 24 units — hero vertical padding */
```

### Spacing Rules

- Component internal padding: `--space-4` (16px) minimum, `--space-5` (24px) comfortable.
- Section vertical rhythm: `--space-8` (64px) between major sections, `--space-10` (128px) on hero sections.
- Never use arbitrary pixel values. If you need 20px, use 24px (`--space-5`) instead.
- Grid gaps: 16px or 24px. Never 10px or 15px.

---

## Border & Shape Language

TENSCOACHING uses **structural, angular, or deliberately rough** shapes — not soft, rounded tech shapes.

```css
--radius-none:  0px;     /* default for most elements */
--radius-sm:    2px;     /* subtle softening only — button corners max */
--radius-tag:   3px;     /* tags and labels */
--radius-badge: 4px;     /* badges */
/* DO NOT use 8px, 12px, 16px, or 24px border-radius on cards or sections */

--border-width-thin:   1px;
--border-width-base:   2px;   /* standard UI borders */
--border-width-thick:  3px;   /* accent / structural borders */
--border-width-heavy:  4px;   /* section dividers, highlighted cards */
```

### Border Usage

- Cards: `border: 2px solid var(--color-ink)` — solid, honest, no shadow softening.
- Accent borders: A left border `4px solid var(--color-ochre)` on a card signals importance.
- Section dividers: `border-top: 2px solid var(--color-rule)` with `margin: var(--space-8) 0`.
- Avoid `box-shadow` on cards. If depth is needed, use a hard offset shadow: `box-shadow: 3px 3px 0 var(--color-ink)` (flat, printed feel).

---

## Button System

### Primary Button (CTA — Ochre)

```css
.btn-primary {
  background-color: var(--color-ochre);
  color: var(--color-cream);
  border: 2px solid var(--color-ochre-dark);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-6);       /* 12px 32px */
  font-family: var(--font-condensed);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 100ms ease, transform 80ms ease;
}

.btn-primary:hover {
  background-color: var(--color-ochre-dark);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(1px);
  box-shadow: none;
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}

.btn-primary:disabled {
  background-color: var(--color-warm-gray-lt);
  border-color: var(--color-rule);
  color: var(--color-warm-gray);
  cursor: not-allowed;
  transform: none;
}
```

### Secondary Button (Sage)

```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-sage-dark);
  border: 2px solid var(--color-sage-dark);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-condensed);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 100ms ease, color 100ms ease;
}

.btn-secondary:hover {
  background-color: var(--color-sage-muted);
  color: var(--color-sage-dark);
}

.btn-secondary:active {
  background-color: var(--color-sage-light);
}
```

### Ghost / Text Button

```css
.btn-ghost {
  background-color: transparent;
  color: var(--color-charcoal);
  border: none;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-condensed);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: var(--color-rule);
  text-underline-offset: 3px;
  cursor: pointer;
}

.btn-ghost:hover {
  text-decoration-color: var(--color-charcoal);
  color: var(--color-ink);
}
```

### Button Rules

- All button text is **uppercase with letter-spacing** — apparel label style.
- CTAs say things like "START TRAINING", "JOIN THE PROGRAM", "GET COACHED" — not "Get Started" or "Learn More".
- Avoid icon-only buttons for primary actions. When using icons in buttons, place them after the text.

---

## Card Patterns

### Program / Offer Card

```css
.card-program {
  background-color: var(--color-off-white);
  border: 2px solid var(--color-ink);
  border-radius: var(--radius-none);   /* intentionally square */
  padding: var(--space-6);
  position: relative;
}

/* Accent stripe — ochre left border for featured card */
.card-program--featured {
  border-left: 5px solid var(--color-ochre);
}

/* Hard offset shadow — printed / stamped depth */
.card-program--raised {
  box-shadow: 4px 4px 0 var(--color-ink);
}
```

### Testimonial / Quote Card

```css
.card-testimonial {
  background-color: var(--color-cream-dark);
  border-top: 3px solid var(--color-sage);
  padding: var(--space-6) var(--space-5);
  font-style: italic;
}

.card-testimonial__quote {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  color: var(--color-charcoal);
  line-height: 1.5;
  margin-bottom: var(--space-4);
}

.card-testimonial__author {
  font-family: var(--font-condensed);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-warm-gray);
}
```

### Stat / Achievement Card

```css
.card-stat {
  background-color: var(--color-ink);
  color: var(--color-cream);
  padding: var(--space-5) var(--space-6);
  text-align: center;
}

.card-stat__number {
  font-family: var(--font-condensed);
  font-size: var(--text-5xl);
  font-weight: 900;
  color: var(--color-ochre);
  line-height: 1;
}

.card-stat__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-warm-gray-lt);
  margin-top: var(--space-2);
}
```

### Card Rules

- No `border-radius` beyond 2–4px on cards. Square is honest, rounded is soft.
- No Tailwind `shadow-lg` / `shadow-xl` diffuse shadows. Use hard offset shadows or no shadows.
- Featured/important cards get the ochre accent treatment — a thick left border or ochre top stripe.
- Dark cards (`var(--color-ink)` background) should only be used for stats, callouts, or dramatic emphasis — not as a default variant.

---

## Layout Patterns

### Section Structure

Every section follows this rhythm:

```
[section label — small caps, sage green]
[section heading — serif, large, ink]
[section body or grid]
```

Example:
```html
<section class="section">
  <p class="section__label">Training Programs</p>
  <h2 class="section__heading">Built For Athletes Who Don't Quit</h2>
  <div class="section__content">...</div>
</section>
```

```css
.section {
  padding: var(--space-8) 0;
}

.section__label {
  font-family: var(--font-condensed);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-sage-dark);
  margin-bottom: var(--space-3);
}

.section__heading {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.15;
  margin-bottom: var(--space-6);
  max-width: 20ch;
}
```

### Hero Section

- Background: `var(--color-cream)` — never a gradient, never dark by default.
- The warrior/Sun Wukong illustration sits prominently — do not cover it with overlays.
- Heading: large serif, ink color, left-aligned (not centered), weight 700+.
- Subheading: condensed sans, uppercase, ochre or sage.
- CTA: primary ochre button.
- Optional: a subtle texture overlay (noise, grain, paper texture at 5–8% opacity) over the background.
- Horizontal rule below the hero: `border-bottom: 3px solid var(--color-ink)`.

### Grid Defaults

- Max content width: `1200px`
- Content padding (mobile): `var(--space-5)` (24px) horizontal
- Content padding (desktop): `var(--space-8)` (64px) horizontal
- Standard card grids: `repeat(auto-fit, minmax(280px, 1fr))` with `gap: var(--space-5)`

---

## Texture & Illustration Guidelines

- **Paper texture**: A subtle noise/grain SVG or CSS filter at low opacity over cream backgrounds adds tactility.
- **Illustration style**: Sun Wukong / warrior character should be ink-line illustrated, not rendered. Think woodcut or linocut — not 3D render.
- **Dividers**: Horizontal rules can use a rough/hand-drawn SVG line instead of a CSS border for section breaks.
- **Icons**: Use simple, slightly rough line icons — not Heroicons' default smooth style. Feather Icons or custom SVG at 1.5px stroke.
- **Stamps & badges**: Achievement badges, certifications, and labels should look stamped or embossed — circular with rough edges, not clean Tailwind badge pills.

---

## Motion (Framer Motion)

Motion is available but must be **purposeful and physical**, not decorative.

### Allowed Patterns

```tsx
// Entrance — content slides up as if weight is settling
const enterVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

// Card hover — slight press down (physical feedback)
const cardHover = {
  whileHover: { y: -2, boxShadow: '6px 6px 0 #1A1A18' },
  whileTap: { y: 1, boxShadow: '2px 2px 0 #1A1A18' },
  transition: { duration: 0.1 }
}

// Stagger children — list items, card grids
const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

### Forbidden Motion Patterns

- No `scale(1.05)` hover on cards — it feels like a web app, not apparel.
- No infinite animations (spinning, pulsing, breathing) on non-loading elements.
- No parallax scroll effects unless extremely subtle.
- No spring-bouncy entrances on serious content (testimonials, program details).
- No page transition wipes or slides — standard Next.js navigation is fine.

---

## Tailwind Configuration Notes

When writing Tailwind classes, extend the config to match this system rather than using default palette names:

```js
// tailwind.config.ts — extend, don't replace
theme: {
  extend: {
    colors: {
      cream:    '#F5F0E8',
      'cream-dark': '#EDE6D6',
      sage:     '#7A9E7E',
      'sage-dark': '#5C7A60',
      ochre:    '#C8702A',
      'ochre-dark': '#A35A1E',
      charcoal: '#2C2C2C',
      ink:      '#1A1A18',
    },
    fontFamily: {
      heading: ['Georgia', 'Times New Roman', 'serif'],
      body:    ['Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'],
    },
    borderRadius: {
      DEFAULT: '2px',
      tag:     '3px',
      badge:   '4px',
    },
    boxShadow: {
      stamp:     '3px 3px 0 #1A1A18',
      'stamp-lg': '5px 5px 0 #1A1A18',
      'stamp-ochre': '4px 4px 0 #A35A1E',
    },
  }
}
```

---

## Brand Voice (for UI copy)

- Direct, commanding, no hedging: "Train with TENS" not "Consider training with TENS"
- Warrior archetypes: discipline, mastery, earning it, the grind, lineage
- Short sentences. Impact over explanation.
- Avoid wellness-speak: no "journey", "transform", "empower", "optimize"
- Acceptable: "master", "build", "earn", "fight", "train", "discipline", "forge"
- Program names should feel like dojo designations or martial ranks, not subscription tiers
