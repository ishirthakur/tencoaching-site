// VARIANT C — "Sydney Street" (sage palette pass)
// Cream + sage palette derived from the Ten Coaching logo.
// Structure, typography, layout and copy preserved verbatim from variant-c source.
//
// Palette roles (per brief):
//   SAGE_LIGHT (#A8C49A) — highlights on dark backgrounds (stats numbers, italic words on dark)
//   SAGE      (#8FAE7F) — general accents, small badge backgrounds, tape
//   SAGE_DEEP (#5C7A4F) — primary CTAs, italic accent words on light bg, section labels [0X]

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sage",
  "cream": "#F5EDD8",
  "ink": "#2A2A28",
  "sageLight": "#A8C49A",
  "sage": "#8FAE7F",
  "sageDeep": "#5C7A4F",
  "grain": true
}/*EDITMODE-END*/;

// ─── Placeholder component (unsplash-feel grey gradient with subtle texture) ──
function Placeholder({ label = '', style = {}, bg, fg, text, seed = 0 }) {
  // Pseudo-random gradient angle/stops from seed + label for variety
  const hash = (label + seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const angle = (hash * 37) % 360;
  const l1 = 18 + (hash % 14);   // 18–32%
  const l2 = 42 + (hash % 18);   // 42–60%
  const l3 = 8 + (hash % 8);     // 8–16%
  const base = bg || `linear-gradient(${angle}deg, hsl(30,4%,${l3}%) 0%, hsl(35,6%,${l1}%) 45%, hsl(40,5%,${l2}%) 100%)`;
  const overlay = fg ? `, ${fg}` : '';
  const textColor = text || 'rgba(245,237,216,0.55)';
  return (
    <div style={{
      ...style,
      background: typeof bg === 'string' ? bg : base,
      backgroundImage: typeof bg === 'string' ? bg : base + overlay,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
    }}>
      {/* film grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay', pointerEvents: 'none',
      }} />
      {/* soft vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 30%, transparent 40%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none',
      }} />
      {label && (
        <div style={{
          position: 'relative', padding: '10px 12px',
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
          fontSize: 10, letterSpacing: 1.5, color: textColor, textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Marcus L.', age: 24, loc: 'Surry Hills', weeks: 16, before: '68KG', after: '76KG',
    img: '__ph__client-marcus',
    quote: "I'd been spinning my wheels on free plans for two years. Sixteen weeks in, my training has structure, I'm eating around a real social life, and I look like someone who actually trains." },
  { name: 'Priya K.', age: 27, loc: 'Bondi', weeks: 20, before: '64KG', after: '58KG',
    img: '__ph__client-priya',
    quote: "I came in expecting another 'lose weight fast' pitch. Instead I got a program built around my hospital shifts. The check-ins kept me honest without making it feel like a second job." },
  { name: 'James W.', age: 22, loc: 'Newtown', weeks: 12, before: '72KG', after: '78KG',
    img: '__ph__client-james',
    quote: "Form-check messages on Sunday nights changed everything. My bench finally moves. I look forward to Mondays now, which is something I never thought I'd say." },
  { name: 'Sienna R.', age: 26, loc: 'Paddington', weeks: 24, before: '70KG', after: '62KG',
    img: '__ph__client-sienna',
    quote: "Six months. No crash diet, no 5am cardio. Just a plan that fit my week and someone who actually paid attention. The before/afters undersell how different I feel." },
];

const GALLERY = [
  { img: '__ph__gallery-1', caption: 'squat day · sydney', top: 0,   left: 20,  rotate: -3 },
  { img: '__ph__gallery-2', caption: 'pull session',       top: 30,  left: 260, rotate: 4  },
  { img: '__ph__gallery-3', caption: 'check-in photos',    top: 10,  left: 510, rotate: -2 },
  { img: '__ph__gallery-4', caption: 'on the floor',       top: 60,  left: 770, rotate: 5  },
  { img: '__ph__gallery-5', caption: 'meal · week 8',      top: 290, left: 80,  rotate: 3  },
  { img: '__ph__gallery-6', caption: 'progress · 12 wk',   top: 310, left: 340, rotate: -4 },
  { img: '__ph__gallery-7', caption: 'recovery day',       top: 290, left: 610, rotate: 2  },
  { img: '__ph__gallery-8', caption: 'before the lift',    top: 320, left: 850, rotate: -3 },
];

const POSTS = [
  { title: 'Why I stopped writing PDFs',   excerpt: 'A static training plan is a snapshot of who you were the day you wrote it. Here\'s what I do instead.', cat: 'Method',  date: 'Apr 12', readTime: '6 min' },
  { title: 'Eating around a Sydney week',  excerpt: 'How to keep nutrition adherent when your week includes work dinners, Friday drinks and a weekend at the beach.',    cat: 'Nutrition', date: 'Mar 28', readTime: '8 min' },
  { title: 'The case for slower fat loss', excerpt: 'Most people don\'t need an aggressive cut. They need a sustainable one. The maths, and what it looks like in practice.', cat: 'Fat Loss',  date: 'Mar 09', readTime: '5 min' },
];

const FAQS = [
  { q: 'How long is the coaching commitment?', a: 'Coaching runs on a rolling weekly basis. There\'s no minimum lock-in beyond the first 4 weeks (which I ask for so we have enough signal to actually adjust the plan). Most clients stay 4–12 months.' },
  { q: 'Do you train people in person?',       a: 'No — coaching is fully online. You train at your own gym on your own schedule. I provide programming, video form-checks, weekly review and direct messaging access.' },
  { q: 'What does it cost?',                   a: 'Coaching is $145/week, billed weekly. Pricing is the same whether you\'re a beginner or a competitive lifter; what changes is what the program looks like.' },
  { q: 'Is this only for men?',                a: 'No. The roster is roughly half-and-half. Programming, nutrition and check-ins are tailored individually — there is no template based on gender.' },
  { q: 'I travel a lot. Will that be a problem?', a: 'It\'s not. Travel weeks are common across the roster. Programs are written to flex around hotel gyms, time zones and weeks where training simply isn\'t the priority.' },
  { q: 'How fast will I see results?',         a: 'Visible changes typically arrive in 8–12 weeks, with meaningful body composition shifts at 4–6 months. Anyone promising faster is selling you a haircut, not a transformation.' },
];

// ─── Palettes ────────────────────────────────────────────────────────────────
const PALETTES = {
  sage: {
    CREAM: '#F5EDD8', INK: '#2A2A28',
    DEEP: '#5C7A4F', MID: '#8FAE7F', LIGHT: '#A8C49A',
    TAPE: 'rgba(143,174,127,0.5)',
    PH_FG: 'rgba(168,196,154,0.15)', PH_TX: 'rgba(168,196,154,0.7)',
  },
  original: {
    CREAM: '#F4EFE3', INK: '#1A1612',
    DEEP: '#C23B10', MID: '#FF5A1F', LIGHT: '#FF5A1F',
    TAPE: 'rgba(255,90,31,0.5)',
    PH_FG: 'rgba(255,90,31,0.15)', PH_TX: 'rgba(255,90,31,0.7)',
  },
};

function VariantC({ onBook }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openFaq, setOpenFaq] = React.useState(-1);

  // Build live palette: when in "sage" mode use the (possibly tweaked) sage tokens,
  // when in "original" use the legacy orange palette.
  const P = t.palette === 'original' ? PALETTES.original : {
    CREAM: t.cream, INK: t.ink,
    DEEP: t.sageDeep, MID: t.sage, LIGHT: t.sageLight,
    TAPE: hexToRgba(t.sage, 0.5),
    PH_FG: hexToRgba(t.sageLight, 0.15),
    PH_TX: hexToRgba(t.sage, 0.7),
  };
  const { CREAM, INK, DEEP, MID, LIGHT, TAPE, PH_FG, PH_TX } = P;
  const SUB = `rgba(${hexToRgbTriplet(INK)},0.6)`;
  const BORDER = `rgba(${hexToRgbTriplet(INK)},0.14)`;

  const sans    = '"Space Grotesk", "Inter", -apple-system, sans-serif';
  const mono    = '"JetBrains Mono", ui-monospace, Menlo, monospace';
  const display = '"Bebas Neue", "Archivo Black", Impact, sans-serif';

  const grainUrl = t.grain
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`
    : 'none';

  // Placeholder logo mark — a simple sage circular emblem with a "TC" monogram
  const LogoMark = ({ size = 56, invert = false }) => {
    const ringColor = invert ? CREAM : INK;
    const accent = invert ? LIGHT : DEEP;
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block', flexShrink: 0 }}>
        <circle cx="32" cy="32" r="30" fill="none" stroke={ringColor} strokeWidth="1.5" />
        <circle cx="32" cy="32" r="22" fill={accent} />
        <path d="M 16 44 Q 24 36 32 40 T 48 38" fill="none" stroke={invert ? INK : CREAM} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <text x="32" y="30" textAnchor="middle" fontFamily={display} fontSize="16" letterSpacing="1" fill={invert ? INK : CREAM}>TC</text>
      </svg>
    );
  };

  const Logo = ({ size = 56, invert = false, withWordmark = false, wordmarkSize = 26 }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <LogoMark size={size} invert={invert} />
      {withWordmark && (
        <div style={{ fontFamily: display, fontSize: wordmarkSize, letterSpacing: 2.5, color: invert ? CREAM : INK, whiteSpace: 'nowrap' }}>
          TEN COACHING
        </div>
      )}
    </div>
  );

  // Image source resolver: __ph__xyz strings render as Placeholder; real urls stay as <img>
  const Img = ({ src, alt, style, label, seed }) => {
    if (typeof src === 'string' && src.startsWith('__ph__')) {
      return <Placeholder label={label || src.replace('__ph__','').replace(/-/g,' ')} style={style} seed={seed} />;
    }
    return <img src={src} alt={alt} style={style} />;
  };

  return (
    <div style={{
      background: CREAM, color: INK, fontFamily: sans, fontSize: 16, lineHeight: 1.55,
      backgroundImage: grainUrl, backgroundBlendMode: 'multiply',
    }}>
      {/* NAV */}
      <nav style={{
        padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1.5px solid ${INK}`,
      }}>
        <Logo size={56} withWordmark wordmarkSize={28} />
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Program', 'Results', 'About', 'FAQ'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: INK, textDecoration: 'none', fontSize: 13, fontWeight: 500, fontFamily: mono, textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</a>
          ))}
          <button onClick={onBook} style={{
            background: INK, color: CREAM, border: 'none', padding: '11px 20px', borderRadius: 2,
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: mono, letterSpacing: 1, textTransform: 'uppercase',
          }}>Book a call ↗</button>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{ background: INK, color: CREAM, padding: '8px 0', overflow: 'hidden', borderBottom: `1.5px solid ${INK}` }}>
        <div style={{
          whiteSpace: 'nowrap', fontFamily: mono, fontSize: 12, letterSpacing: 2,
          animation: 'tens-scroll 60s linear infinite',
        }}>
          {Array(6).fill(0).map((_, i) => (
            <span key={i} style={{ marginRight: 60 }}>
              ● SYDNEY PHYSIQUE COACHING ● EST. 2024 ● 1:1 ONLY ● TRAIN · EAT · LIVE ● NEXT INTAKE MAY 2026 ● 4 SPOTS AVAILABLE ●
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '60px 40px 40px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 32, color: DEEP }}>
              [01] — SYDNEY · EST. 2024
            </div>
            <h1 style={{
              fontFamily: display, fontSize: 156, lineHeight: 0.88, letterSpacing: 0,
              margin: 0, color: INK,
            }}>
              BUILD THE <span style={{ color: DEEP, fontStyle: 'italic' }}>BODY.</span><br/>
              KEEP THE LIFE.
            </h1>
            <p style={{ fontSize: 21, maxWidth: 540, marginTop: 32, color: `rgba(${hexToRgbTriplet(INK)},0.78)`, lineHeight: 1.45 }}>
              Personalised 1:1 physique coaching for ambitious 18–28-year-olds in Sydney. Structured programming that works around your career, training and life — not in opposition to it.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
              <button onClick={onBook} style={{
                background: DEEP, color: CREAM, border: `1.5px solid ${INK}`, padding: '16px 26px',
                borderRadius: 2, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: mono, letterSpacing: 1, textTransform: 'uppercase',
                boxShadow: `4px 4px 0 ${INK}`,
              }}>Book a discovery call ↗</button>
              <a href="#program" style={{
                background: CREAM, color: INK, border: `1.5px solid ${INK}`, padding: '16px 24px',
                borderRadius: 2, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: mono, letterSpacing: 1, textTransform: 'uppercase',
                textDecoration: 'none',
              }}>Explore the program ↓</a>
            </div>
          </div>

          {/* Polaroid stack */}
          <div style={{ position: 'relative', height: 520 }}>
            <div style={{
              position: 'absolute', top: 0, left: 20, transform: 'rotate(-4deg)',
              background: CREAM, padding: 14, boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`,
              border: `1px solid ${BORDER}`,
            }}>
              <Placeholder label="coach portrait" style={{ width: 220, height: 260 }} seed={1} />
              <div style={{ fontFamily: mono, fontSize: 11, textAlign: 'center', marginTop: 10, color: INK, letterSpacing: 1 }}>YOUR COACH · OSAKA</div>
            </div>
            <div style={{
              position: 'absolute', top: 80, right: 0, transform: 'rotate(5deg)',
              background: CREAM, padding: 12, boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`,
              border: `1px solid ${BORDER}`,
            }}>
              <Placeholder label="training" style={{ width: 200, height: 260 }} seed={2} />
              <div style={{ fontFamily: mono, fontSize: 11, textAlign: 'center', marginTop: 8, color: INK, letterSpacing: 1 }}>ON THE FLOOR · SYDNEY</div>
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 80, transform: 'rotate(-2deg)',
              background: CREAM, padding: 12, boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`,
              border: `1px solid ${BORDER}`,
            }}>
              <Placeholder label="on the court" style={{ width: 240, height: 200 }} seed={3} />
              <div style={{ fontFamily: mono, fontSize: 11, textAlign: 'center', marginTop: 8, color: INK, letterSpacing: 1 }}>WEEK 12 · CLIENT PROGRESS</div>
            </div>
          </div>
        </div>

        {/* Ribbon stats */}
        <div style={{
          marginTop: 60, background: INK, color: CREAM,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          border: `1.5px solid ${INK}`, borderRadius: 2,
        }}>
          {[
            { n: '47', l: 'CLIENTS COACHED' },
            { n: '12W', l: 'AVG. FIRST RESULT' },
            { n: '1:1', l: 'TAILORED ONLY' },
            { n: '24/7', l: 'DIRECT SUPPORT' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '28px 24px', borderLeft: i > 0 ? `1px solid rgba(245,237,216,0.15)` : 'none',
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ fontFamily: display, fontSize: 64, lineHeight: 1, color: LIGHT, letterSpacing: 1 }}>{s.n}</div>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1.5, opacity: 0.7 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" style={{ padding: '100px 40px', borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}`, background: INK, color: CREAM }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, gap: 40 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: LIGHT }}>
              [02] — THE PROGRAM
            </div>
            <h2 style={{ fontFamily: display, fontSize: 104, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              1:1 COACHING<br/>
              <span style={{ color: LIGHT }}>BUILT AROUND YOU.</span>
            </h2>
          </div>
          <div style={{
            padding: '14px 24px', border: `1.5px solid ${CREAM}`,
            fontFamily: mono, fontSize: 12, letterSpacing: 1.5, transform: 'rotate(2deg)', flexShrink: 0,
          }}>
            WEEKLY PAYMENTS
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { t: 'In-depth Onboarding', d: 'A thorough 60-minute call to map your body, training history, lifestyle and specific goals before any programming begins.', tag: 'Week 0' },
            { t: 'Tailored Training', d: 'Programs built and adjusted block by block to match your progress, recovery and schedule — not a static PDF.', tag: 'Ongoing' },
            { t: 'Nutrition Planning', d: 'A flexible nutrition framework designed around your lifestyle, social commitments and performance requirements.', tag: 'Ongoing' },
            { t: 'Weekly Check-ins', d: 'A structured Sunday review of photos, measurements and progress — with an updated plan in your inbox each Monday morning.', tag: 'Weekly' },
            { t: 'Direct Messaging', d: 'Direct access between sessions for guidance, form checks and accountability when you need it most.', tag: 'Always' },
            { t: 'Realistic Timeframes', d: 'Honest, transparent timelines based on your starting point and goals — no inflated promises or quick-fix marketing.', tag: 'From Day 1' },
          ].map((c, i) => (
            <div key={i} style={{
              background: CREAM, color: INK, padding: '28px 26px 32px', borderRadius: 2,
              border: `1.5px solid ${CREAM}`, position: 'relative', minHeight: 220,
            }}>
              <div style={{
                position: 'absolute', top: -11, right: 20, background: MID, color: CREAM,
                padding: '3px 10px', fontFamily: mono, fontSize: 10, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase',
              }}>{c.tag}</div>
              <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1, marginBottom: 12 }}>{c.t}</div>
              <div style={{ fontSize: 14, color: SUB, lineHeight: 1.55 }}>{c.d}</div>
              <div style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: mono, fontSize: 12, color: DEEP }}>
                0{i + 1}/06
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" style={{ padding: '100px 40px' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
            [03] — CLIENT RESULTS
          </div>
          <h2 style={{ fontFamily: display, fontSize: 104, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
            REAL PEOPLE.<br/>REAL <span style={{ color: DEEP, fontStyle: 'italic' }}>RESULTS.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {TESTIMONIALS.map((tt, i) => (
            <div key={i} style={{
              background: CREAM, border: `1.5px solid ${INK}`, borderRadius: 2,
              padding: 0, display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 0, overflow: 'hidden',
              boxShadow: `5px 5px 0 ${INK}`,
            }}>
              <Placeholder label={tt.name} style={{ width: '100%', height: 340 }} seed={10 + i} />
              <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    <span style={{ fontFamily: mono, fontSize: 11, background: INK, color: CREAM, padding: '3px 8px', letterSpacing: 1 }}>
                      {tt.before} → {tt.after}
                    </span>
                    <span style={{ fontFamily: mono, fontSize: 11, background: MID, color: CREAM, padding: '3px 8px', letterSpacing: 1 }}>
                      {tt.weeks} WEEKS
                    </span>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: `rgba(${hexToRgbTriplet(INK)},0.85)`, marginBottom: 20 }}>
                    "{tt.quote}"
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: display, fontSize: 22, letterSpacing: 1 }}>{tt.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: SUB, letterSpacing: 1 }}>{tt.age} · {tt.loc.toUpperCase()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '100px 40px', borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Placeholder label="coach travel" style={{ width: '100%', height: 620 }} seed={99} />
            <div style={{
              position: 'absolute', bottom: -16, right: -16, background: MID, color: CREAM,
              padding: '14px 20px', borderRadius: 2, transform: 'rotate(-3deg)',
              fontFamily: display, fontSize: 22, letterSpacing: 1, border: `1.5px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
            }}>
              60KG → 86KG
            </div>
            <div style={{
              position: 'absolute', top: -14, left: 40, width: 80, height: 24,
              background: TAPE, transform: 'rotate(-3deg)',
            }} />
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
              [04] — ABOUT THE COACH
            </div>
            <h2 style={{ fontFamily: display, fontSize: 80, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              MY OWN<br/><span style={{ color: DEEP }}>TRANSFORMATION</span><br/>IS WHERE IT STARTED.
            </h2>
            <div style={{ marginTop: 28, fontSize: 17, color: `rgba(${hexToRgbTriplet(INK)},0.78)`, lineHeight: 1.7, maxWidth: 560 }}>
              <p>I began my own journey well underweight, trying every free program I could find online with very little to show for it. What eventually worked was treating my body as a system — structured training, properly planned nutrition, and a program tailored to my individual lifestyle.</p>
              <p>Today I coach clients navigating the same challenges I once did. Driven, busy people who want a meaningful physical transformation without compromising the career, relationships and experiences that matter to them.</p>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }} data-tens-cert>
              {['CERT III FITNESS · IN PROGRESS', 'CERT IV FITNESS · IN PROGRESS', 'CERT III NUTRITION · IN PROGRESS'].map((c) => (
                <span key={c} style={{
                  padding: '6px 12px', background: INK, color: CREAM,
                  fontFamily: mono, fontSize: 10, letterSpacing: 1,
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: '100px 40px', background: tintAlpha(INK, CREAM, 0.04) }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
            [05] — GALLERY
          </div>
          <h2 style={{ fontFamily: display, fontSize: 96, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
            FROM THE <span style={{ color: DEEP, fontStyle: 'italic' }}>FLOOR.</span>
          </h2>
        </div>
        <div style={{ position: 'relative', height: 580, maxWidth: 1100, margin: '0 auto' }}>
          {GALLERY.map((p, i) => (
            <div key={i} style={{
              position: 'absolute', top: p.top, left: p.left, transform: `rotate(${p.rotate}deg)`,
              background: CREAM, padding: 12, boxShadow: `0 8px 24px rgba(0,0,0,0.18), 3px 3px 0 ${INK}`,
              border: `1px solid ${BORDER}`,
            }}>
              <Placeholder label={p.caption} style={{ width: 200, height: 220 }} seed={50 + i} />
              <div style={{ fontFamily: mono, fontSize: 11, textAlign: 'center', marginTop: 8, color: INK, letterSpacing: 1 }}>{p.caption.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section id="journal" style={{ padding: '100px 40px', borderTop: `1.5px solid ${INK}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, gap: 40 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
              [06] — JOURNAL
            </div>
            <h2 style={{ fontFamily: display, fontSize: 96, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              FIELD <span style={{ color: DEEP, fontStyle: 'italic' }}>NOTES.</span>
            </h2>
          </div>
          <a href="#" style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: INK, textDecoration: 'underline', textUnderlineOffset: 4 }}>READ ALL ↗</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {POSTS.map((p, i) => (
            <article key={i} style={{
              background: CREAM, border: `1.5px solid ${INK}`, borderRadius: 2,
              padding: 0, boxShadow: `4px 4px 0 ${INK}`, cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
            }}>
              <Placeholder label={p.title} style={{ width: '100%', height: 200 }}
                bg={INK} fg={PH_FG} text={PH_TX} seed={70 + i} />
              <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, background: INK, color: CREAM, padding: '3px 8px', letterSpacing: 1 }}>{p.cat.toUpperCase()}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: SUB, letterSpacing: 1, alignSelf: 'center' }}>{p.date} · {p.readTime}</span>
                </div>
                <div style={{ fontFamily: display, fontSize: 26, letterSpacing: 0.5, lineHeight: 1.05, marginBottom: 12 }}>{p.title.toUpperCase()}</div>
                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.55, flex: 1 }}>{p.excerpt}</div>
                <div style={{ marginTop: 18, fontFamily: mono, fontSize: 11, color: DEEP, letterSpacing: 1.5 }}>READ POST →</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '100px 40px', borderTop: `1.5px solid ${INK}` }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
            [07] — FREQUENTLY ASKED
          </div>
          <h2 style={{ fontFamily: display, fontSize: 88, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
            QUESTIONS, <span style={{ color: DEEP }}>ANSWERED.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {FAQS.map((f, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
              border: `1.5px solid ${INK}`, padding: '20px 22px', cursor: 'pointer',
              background: openFaq === i ? INK : CREAM, color: openFaq === i ? CREAM : INK,
              transition: 'background .15s, color .15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                <div style={{ fontFamily: display, fontSize: 20, letterSpacing: 0.5 }}>{f.q.toUpperCase()}</div>
                <div style={{ fontFamily: display, fontSize: 22, color: openFaq === i ? LIGHT : DEEP }}>{openFaq === i ? '−' : '+'}</div>
              </div>
              {openFaq === i && (
                <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, opacity: 0.88 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        padding: '120px 40px', background: DEEP, color: CREAM, textAlign: 'center',
        borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}`, position: 'relative',
      }}>
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>
          [08] — 4 SPOTS · MAY 2026 INTAKE
        </div>
        <h2 style={{ fontFamily: display, fontSize: 160, letterSpacing: 2, lineHeight: 0.88, margin: 0 }}>
          LET'S <span style={{ fontStyle: 'italic' }}>BUILD</span><br/>YOUR BEST SHAPE.
        </h2>
        <p style={{ fontSize: 19, maxWidth: 560, margin: '32px auto 40px', lineHeight: 1.5 }}>
          Book a 30-minute discovery call. We'll discuss your goals, assess whether coaching is the right fit, and outline what your next 12 weeks could realistically look like.
        </p>
        <button onClick={onBook} style={{
          background: INK, color: CREAM, border: `1.5px solid ${INK}`, padding: '20px 36px',
          borderRadius: 2, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: mono, letterSpacing: 1.5, textTransform: 'uppercase',
          boxShadow: `5px 5px 0 ${CREAM}`,
        }}>Book your call ↗</button>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', background: INK, color: CREAM, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 40, alignItems: 'flex-start' }}>
        <div>
          <Logo size={64} invert withWordmark wordmarkSize={26} />
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1, opacity: 0.6, marginTop: 14 }}>SYDNEY · AUSTRALIA · EST. 2024</div>
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, opacity: 0.5, marginBottom: 10, textTransform: 'uppercase' }}>Social</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
            <a href="#" style={{ color: CREAM, textDecoration: 'none' }}>@tencoaching · Instagram ↗</a>
            <a href="#" style={{ color: CREAM, textDecoration: 'none' }}>@tencoaching · TikTok ↗</a>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, opacity: 0.5, marginBottom: 10, textTransform: 'uppercase' }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
            <a href="#" style={{ color: CREAM, textDecoration: 'none' }}>hello@tencoaching.com.au</a>
            <a onClick={onBook} style={{ color: LIGHT, cursor: 'pointer' }}>Book a call →</a>
          </div>
        </div>
      </footer>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Mode" value={t.palette}
                    options={['sage', 'original']}
                    onChange={(v) => setTweak('palette', v)} />
        <TweakColor label="Cream (bg)" value={t.cream}
                    options={['#F5EDD8', '#F4EFE3', '#EDE6D6', '#FAF5E6', '#EFE8D2']}
                    onChange={(v) => setTweak('cream', v)} />
        <TweakColor label="Ink (text)" value={t.ink}
                    options={['#2A2A28', '#1A1612', '#1F1D1A', '#0F0F0E']}
                    onChange={(v) => setTweak('ink', v)} />
        <TweakSection label="Sage tones" />
        <TweakColor label="Light (highlights on dark)" value={t.sageLight}
                    options={['#A8C49A', '#B8D2AA', '#9BBB8C', '#C2D8B4']}
                    onChange={(v) => setTweak('sageLight', v)} />
        <TweakColor label="Mid (badges)" value={t.sage}
                    options={['#8FAE7F', '#7FA86B', '#9CB98A', '#7A9C6A']}
                    onChange={(v) => setTweak('sage', v)} />
        <TweakColor label="Deep (CTAs, headlines)" value={t.sageDeep}
                    options={['#5C7A4F', '#4A6840', '#6B8A5C', '#3F5A36']}
                    onChange={(v) => setTweak('sageDeep', v)} />
        <TweakSection label="Texture" />
        <TweakToggle label="Film grain" value={t.grain}
                     onChange={(v) => setTweak('grain', v)} />
      </TweaksPanel>

      <style>{`
        @keyframes tens-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function hexToRgbTriplet(hex) {
  const h = (hex || '#000').replace('#','');
  const f = h.length === 3 ? h.split('').map(c => c+c).join('') : h;
  const n = parseInt(f, 16);
  return `${(n>>16)&255},${(n>>8)&255},${n&255}`;
}
function hexToRgba(hex, a) { return `rgba(${hexToRgbTriplet(hex)},${a})`; }
function tintAlpha(fg, bg, a) {
  // simple alpha-blend of fg over bg as rgb
  const f = hexToRgbTriplet(fg).split(',').map(Number);
  const b = hexToRgbTriplet(bg).split(',').map(Number);
  const r = Math.round(f[0]*a + b[0]*(1-a));
  const g = Math.round(f[1]*a + b[1]*(1-a));
  const bl = Math.round(f[2]*a + b[2]*(1-a));
  return `rgb(${r},${g},${bl})`;
}

window.VariantC = VariantC;
window.Placeholder = Placeholder;
