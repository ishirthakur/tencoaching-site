"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// ── Helpers ───────────────────────────────────────────────────────────────

function hexToRgbTriplet(hex: string): string {
  const h = (hex || "#000").replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(f, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
function hexToRgba(hex: string, a: number) {
  return `rgba(${hexToRgbTriplet(hex)},${a})`;
}
function tintAlpha(fg: string, bg: string, a: number) {
  const f = hexToRgbTriplet(fg).split(",").map(Number);
  const b = hexToRgbTriplet(bg).split(",").map(Number);
  return `rgb(${Math.round(f[0]*a+b[0]*(1-a))},${Math.round(f[1]*a+b[1]*(1-a))},${Math.round(f[2]*a+b[2]*(1-a))})`;
}

// ── Palette (sage, fixed) ─────────────────────────────────────────────────

const CREAM  = "#F5EDD8";
const INK    = "#2A2A28";
const DEEP   = "#5C7A4F";
const MID    = "#8FAE7F";
const LIGHT  = "#A8C49A";
const TAPE   = hexToRgba(MID, 0.5);
const BORDER = hexToRgba(INK, 0.14);
const SUB    = hexToRgba(INK, 0.6);

// ── Font stacks ───────────────────────────────────────────────────────────

const display = 'var(--font-bebas), "Archivo Black", Impact, sans-serif';
const sans    = 'var(--font-space), "Inter", -apple-system, sans-serif';
const mono    = 'var(--font-mono), ui-monospace, Menlo, monospace';

// ── Grain texture ─────────────────────────────────────────────────────────

const grainUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Placeholder component ─────────────────────────────────────────────────

interface PlaceholderProps {
  label?: string;
  style?: React.CSSProperties;
  bg?: string;
  fg?: string;
  text?: string;
  seed?: number;
}

function Placeholder({ label = "", style = {}, bg, fg, text, seed = 0 }: PlaceholderProps) {
  const hash = (label + seed).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const angle = (hash * 37) % 360;
  const l1 = 18 + (hash % 14);
  const l2 = 42 + (hash % 18);
  const l3 = 8  + (hash % 8);
  const base = bg
    ? (typeof bg === "string" ? bg : "")
    : `linear-gradient(${angle}deg, hsl(30,4%,${l3}%) 0%, hsl(35,6%,${l1}%) 45%, hsl(40,5%,${l2}%) 100%)`;
  const textColor = text || "rgba(245,237,216,0.55)";
  const overlay = fg ? `, ${fg}` : "";
  return (
    <div style={{
      ...style,
      background: base,
      backgroundImage: bg ? base : base + overlay,
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 30%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        pointerEvents: "none",
      }} />
      {label && (
        <div style={{
          position: "relative", padding: "10px 12px",
          fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: textColor, textTransform: "uppercase",
        }}>{label}</div>
      )}
    </div>
  );
}

// ── Client photo component ────────────────────────────────────────────────

function ClientPhoto({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      position: "relative", background: INK, width: "100%", height: "100%", minHeight: 480,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <Image src="/tc-logo-white.png" alt="" width={120} height={120}
        style={{ opacity: 0.35, display: "block", flexShrink: 0 }} />
      {!failed && (
        <Image src={src} alt={label} fill
          style={{ objectFit: "cover" }}
          onError={() => setFailed(true)} />
      )}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px",
        fontFamily: mono, fontSize: 10, letterSpacing: 1.5,
        color: hexToRgba(CREAM, 0.6), textTransform: "uppercase", zIndex: 2,
      }}>
        {label}
      </div>
    </div>
  );
}

// ── Logo components ───────────────────────────────────────────────────────

function LogoMark({ size = 56, invert = false }: { size?: number; invert?: boolean }) {
  const ringColor = invert ? CREAM : INK;
  const accent    = invert ? LIGHT : DEEP;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: "block", flexShrink: 0 }}>
      <circle cx="32" cy="32" r="30" fill="none" stroke={ringColor} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="22" fill={accent} />
      <path d="M 16 44 Q 24 36 32 40 T 48 38" fill="none" stroke={invert ? INK : CREAM} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <text x="32" y="30" textAnchor="middle" fontFamily={display} fontSize="16" letterSpacing="1" fill={invert ? INK : CREAM}>TC</text>
    </svg>
  );
}

function Logo({
  size = 56, invert = false, withWordmark = false, wordmarkSize = 26, src, priority = false,
}: {
  size?: number; invert?: boolean; withWordmark?: boolean; wordmarkSize?: number; src?: string; priority?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      {src
        ? <Image src={src} alt="TENSCOACHING logo" height={size} width={size} priority={priority} style={{ display: "block", flexShrink: 0 }} />
        : <LogoMark size={size} invert={invert} />
      }
      {withWordmark && (
        <div style={{ fontFamily: display, fontSize: wordmarkSize, letterSpacing: 2.5, color: invert ? CREAM : INK, whiteSpace: "nowrap" }}>
          TEN COACHING
        </div>
      )}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────


const GALLERY = [
  { img: "__ph__gallery-1", caption: "squat day · sydney", top: 0,   left: 20,  rotate: -3 },
  { img: "__ph__gallery-2", caption: "pull session",       top: 30,  left: 260, rotate: 4  },
  { img: "__ph__gallery-3", caption: "check-in photos",    top: 10,  left: 510, rotate: -2 },
  { img: "__ph__gallery-4", caption: "on the floor",       top: 60,  left: 770, rotate: 5  },
  { img: "__ph__gallery-5", caption: "meal · week 8",      top: 290, left: 80,  rotate: 3  },
  { img: "__ph__gallery-6", caption: "progress · 12 wk",   top: 310, left: 340, rotate: -4 },
  { img: "__ph__gallery-7", caption: "recovery day",       top: 290, left: 610, rotate: 2  },
  { img: "__ph__gallery-8", caption: "before the lift",    top: 320, left: 850, rotate: -3 },
];

const POSTS = [
  { title: "Why I stopped writing PDFs",   excerpt: "A static training plan is a snapshot of who you were the day you wrote it. Here's what I do instead.",                                                                          cat: "Method",   date: "Apr 12", readTime: "6 min" },
  { title: "Eating around a Sydney week",  excerpt: "How to keep nutrition adherent when your week includes work dinners, Friday drinks and a weekend at the beach.",                                                                    cat: "Nutrition", date: "Mar 28", readTime: "8 min" },
  { title: "The case for slower fat loss", excerpt: "Most people don't need an aggressive cut. They need a sustainable one. The maths, and what it looks like in practice.", cat: "Fat Loss",  date: "Mar 09", readTime: "5 min" },
];

const FAQS = [
  { q: "How long is the coaching commitment?", a: "Coaching runs on a rolling weekly basis. There's no minimum lock-in beyond the first 4 weeks (which I ask for so we have enough signal to actually adjust the plan). Most clients stay 4–12 months." },
  { q: "Do you train people in person?",       a: "No — coaching is fully online. You train at your own gym on your own schedule. I provide programming, video form-checks, weekly review and direct messaging access." },
  { q: "What does it cost?",                   a: "Coaching is $145/week, billed weekly. Pricing is the same whether you're a beginner or a competitive lifter; what changes is what the program looks like." },
  { q: "Is this only for men?",                a: "No. The roster is roughly half-and-half. Programming, nutrition and check-ins are tailored individually — there is no template based on gender." },
  { q: "I travel a lot. Will that be a problem?", a: "It's not. Travel weeks are common across the roster. Programs are written to flex around hotel gyms, time zones and weeks where training simply isn't the priority." },
  { q: "How fast will I see results?",         a: "Visible changes typically arrive in 8–12 weeks, with meaningful body composition shifts at 4–6 months. Anyone promising faster is selling you a haircut, not a transformation." },
];

const PROGRAM_FEATURES = [
  { t: "In-Depth Onboarding",              tag: "WEEK 0",
    d: "Before a single workout is written, we get on a call. Your goals, your lifestyle, your training history — everything gets mapped out so your program is built around your life from day one." },
  { t: "Your Aesthetic Physique Blueprint", tag: "ONGOING",
    d: "A personalised program built around your fitness level, schedule and lifestyle — designed to be completed in 45 mins to an hour, so you're not stuck in the gym all day. Delivered through Everfit so your workouts, progress and adjustments are always in one place. It evolves as you do." },
  { t: "Nutrition Coaching",               tag: "ONGOING",
    d: "No rigid meal plans. You'll get your personal calorie targets and macros, plus the knowledge to hit them flexibly — so you can still go out with mates, enjoy the foods you love, and wake up the next day on track. Getting lean doesn't mean missing out on life." },
  { t: "Weekly 1:1 Check-In Calls",        tag: "WEEKLY",
    d: "A real call, every week, scheduled around you. I review your progress, we make adjustments, and keep the momentum going. This is where the transformation actually happens." },
  { t: "Direct Messaging",                 tag: "ALWAYS",
    d: "Got a question between calls? Stuck on a meal? Need a push? Reach out and get a real response fast — I'm always in your corner, not just on call days." },
  { t: "Real Accountability. No Excuses.", tag: "FROM DAY 1",
    d: "Progress takes honesty. If you're slipping I'll tell you straight — because I actually care about where you end up. We're in this together and I won't let you settle for less than your best." },
];

const STATS = [
  { n: "9–13KG", l: "AVG. FAT LOST PER CUT" },
  { n: "12 WKS", l: "TO VISIBLE RESULTS" },
  { n: "1:1",    l: "TAILORED ONLY" },
  { n: "24/7",   l: "DIRECT ACCESS" },
];

// ── Framer Motion variants ────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ── Page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(-1);
  const onBook = () => window.alert("Discovery call booking → Calendly placeholder");

  return (
    <div style={{
      background: CREAM, color: INK, fontFamily: sans, fontSize: 16, lineHeight: 1.55,
      backgroundImage: grainUrl, backgroundBlendMode: "multiply",
    }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        padding: "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1.5px solid ${INK}`,
      }}>
        <Logo src="/tc-logo-green.png" size={72} priority withWordmark wordmarkSize={36} />
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Program", "Results", "About", "FAQ"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: INK, textDecoration: "none", fontSize: 13, fontWeight: 500,
              fontFamily: mono, textTransform: "uppercase", letterSpacing: 0.5,
            }}>{l}</a>
          ))}
          <a href="#book" style={{
            background: INK, color: CREAM, border: "none", padding: "11px 20px", borderRadius: 2,
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: mono, letterSpacing: 1, textTransform: "uppercase",
            textDecoration: "none", display: "inline-block",
          }}>Book a call ↗</a>
        </div>
      </nav>


{/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 40px 40px", position: "relative", overflow: "hidden" }}>
        {/* Watermark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1400, height: 1400,
          opacity: 0.18, pointerEvents: "none", zIndex: 0,
        }}>
          <Image src="/tc-logo-green.png" alt="" width={1400} height={1400} priority style={{ display: "block" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "flex-start", position: "relative", zIndex: 1 }}>

          {/* Left — copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
              style={{ fontFamily: display, fontSize: 156, lineHeight: 0.88, letterSpacing: 0, margin: 0, color: INK }}
            >
              SOAR<br />
              <span style={{ color: DEEP, fontStyle: "italic" }}>BEYOND LIMITS.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" as const }}
              style={{ fontSize: 21, maxWidth: 540, marginTop: 32, color: SUB, lineHeight: 1.45 }}
            >
              Real 1:1 physique coaching for busy 18–28 year olds. Built around your life — so you can become aesthetic, get lean, get strong, and still show up for everything that matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.42 }}
              style={{ display: "flex", gap: 12, marginTop: 36 }}
            >
              <button onClick={onBook} style={{
                background: DEEP, color: CREAM, border: `1.5px solid ${INK}`, padding: "16px 26px",
                borderRadius: 2, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: mono, letterSpacing: 1, textTransform: "uppercase",
                boxShadow: `4px 4px 0 ${INK}`,
              }}>Book a discovery call ↗</button>
              <a href="#program" style={{
                background: CREAM, color: INK, border: `1.5px solid ${INK}`, padding: "16px 24px",
                borderRadius: 2, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: mono, letterSpacing: 1, textTransform: "uppercase",
                textDecoration: "none",
              }}>Explore the program ↓</a>
            </motion.div>
          </div>

          {/* Right — polaroid stack */}
          <div style={{ position: "relative", height: 520, width: 480, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <div style={{
                transform: "rotate(-4deg)", background: CREAM, padding: 14,
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <Placeholder label="coach portrait" style={{ width: 220, height: 260 }} seed={1} />
                <div style={{ fontFamily: mono, fontSize: 11, textAlign: "center", marginTop: 10, color: INK, letterSpacing: 1 }}>YOUR COACH · PEAK</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              style={{ position: "absolute", top: 80, right: 0 }}
            >
              <div style={{
                transform: "rotate(5deg)", background: CREAM, padding: 12,
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <Placeholder label="training" style={{ width: 200, height: 260 }} seed={2} />
                <div style={{ fontFamily: mono, fontSize: 11, textAlign: "center", marginTop: 8, color: INK, letterSpacing: 1 }}>PHILIPPINES · LIVING PROOF</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ position: "absolute", bottom: 0, left: 60 }}
            >
              <div style={{
                transform: "rotate(-2deg)", background: CREAM, padding: 12,
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <Placeholder label="on the court" style={{ width: 240, height: 200 }} seed={3} />
                <div style={{ fontFamily: mono, fontSize: 11, textAlign: "center", marginTop: 8, color: INK, letterSpacing: 1 }}>THE FOUNDATION · WESTERN SYD</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.65 }}
          style={{
            marginTop: 60, background: INK, color: CREAM,
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: `1.5px solid ${INK}`, borderRadius: 2,
            position: "relative", zIndex: 1,
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: "28px 24px", borderLeft: i > 0 ? "1px solid rgba(245,237,216,0.15)" : "none",
              display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12,
            }}>
              <div style={{ fontFamily: display, fontSize: 64, lineHeight: 1, color: LIGHT, letterSpacing: 1 }}>{s.n}</div>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1.5, opacity: 0.7 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── PROGRAM ─────────────────────────────────────────────────────── */}
      <section id="program" style={{ padding: "100px 40px", borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}`, background: INK, color: CREAM }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, gap: 40 }}>
            <div>
              <motion.div variants={fadeUp} style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: LIGHT }}>
                [02] — THE PROGRAM
              </motion.div>
              <motion.h2 variants={fadeUp} style={{ fontFamily: display, fontSize: 104, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
                THE BLUEPRINT TO<br />
                <span style={{ color: LIGHT }}>YOUR PEAK.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeIn}
              style={{ padding: "14px 24px", border: `1.5px solid ${CREAM}`, fontFamily: mono, fontSize: 12, letterSpacing: 1.5, transform: "rotate(2deg)", flexShrink: 0 }}
            >
              WEEKLY PAYMENTS
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            className="program-grid"
          >
            {PROGRAM_FEATURES.map((c, i) => (
              <motion.div key={i} variants={fadeUp} style={{
                background: CREAM, color: INK, padding: "28px 26px 24px", borderRadius: 2,
                border: `1.5px solid ${CREAM}`, position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -11, right: 20, background: MID, color: CREAM,
                  padding: "3px 10px", fontFamily: mono, fontSize: 10, letterSpacing: 1, fontWeight: 700, textTransform: "uppercase",
                }}>{c.tag}</div>
                <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1, marginBottom: 12 }}>{c.t}</div>
                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.55 }}>{c.d}</div>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ fontFamily: mono, fontSize: 12, color: DEEP }}>0{i + 1}/06</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── RESULTS ─────────────────────────────────────────────────────── */}
      <section id="results" style={{ padding: "100px 40px" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>[03] — CLIENT RESULTS</div>
            <h2 style={{ fontFamily: display, fontSize: 104, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              BUILT FROM <span style={{ color: DEEP, fontStyle: "italic" }}>ZERO.</span><br />
              THE RESULTS DON&apos;T LIE.
            </h2>
          </motion.div>

          <div className="results-wrapper">
            <motion.div variants={fadeUp} className="results-card" style={{
              border: `1.5px solid ${INK}`, borderRadius: 2,
              overflow: "hidden", boxShadow: `5px 5px 0 ${INK}`,
            }}>
              {/* Left — photo */}
              <ClientPhoto src="/photos/jerome-before-after.jpg" label="BEFORE → AFTER · JEROME" />

              {/* Right — content */}
              <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", gap: 28, background: CREAM, color: INK }}>
                <div style={{ display: "flex", gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: display, fontSize: 40, letterSpacing: 1, lineHeight: 1 }}>72KG → 63KG</div>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: SUB, textTransform: "uppercase", marginTop: 4 }}>Body Weight</div>
                  </div>
                  <div style={{ borderLeft: `1.5px solid ${BORDER}`, paddingLeft: 32 }}>
                    <div style={{ fontFamily: display, fontSize: 40, letterSpacing: 1, lineHeight: 1 }}>24</div>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: SUB, textTransform: "uppercase", marginTop: 4 }}>Weeks</div>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${BORDER}` }} />

                <div style={{ fontSize: 16, lineHeight: 1.8, color: INK, fontStyle: "italic", flex: 1 }}>
                  &ldquo;I was in a rough place, so stressed with work, just let myself go, barely any exercise, eating whatever I wanted. Too many bad habits for a long period made me so unhappy, I knew something had to change. Being coached was great. I got given a workout routine catered to my overall end goal, nutritional advice, and we had a 1 to 1 call every week we would discuss how the weeks gone — what I&apos;d done well, what I need to improve on. Having a coach gives me someone who can hold me accountable on the days I don&apos;t feel like doing shit. The results have been crazy. From how I looked when I started to how I look now, is insane. I feel bigger, less stressed and more confident. It&apos;s not just how I look but it&apos;s also how much I&apos;ve learnt about health and fitness. Knowledge that will stay with me forever.&rdquo;
                </div>

                <div>
                  <div style={{ fontFamily: display, fontSize: 32, letterSpacing: 1 }}>JEROME</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: SUB, letterSpacing: 1 }}>72kg → 63kg · 24 weeks</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "100px 40px", borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}` }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}
        >
          {/* Image col */}
          <motion.div variants={fadeIn} style={{ position: "relative" }}>
            <Placeholder label="coach travel" style={{ width: "100%", height: 620 }} seed={99} />
            <div style={{
              position: "absolute", bottom: -16, right: -16, background: MID, color: CREAM,
              padding: "14px 20px", borderRadius: 2, transform: "rotate(-3deg)",
              fontFamily: display, fontSize: 22, letterSpacing: 1, border: `1.5px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
            }}>
              60KG → 86KG
            </div>
            <div style={{
              position: "absolute", top: -14, left: 40, width: 80, height: 24,
              background: TAPE, transform: "rotate(-3deg)",
            }} />
          </motion.div>

          {/* Text col */}
          <div>
            <motion.div variants={fadeUp} style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
              [04] — ABOUT THE COACH
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontFamily: display, fontSize: 80, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              MY OWN<br /><span style={{ color: DEEP }}>TRANSFORMATION</span><br />IS WHERE IT STARTED.
            </motion.h2>
            <motion.div variants={fadeUp} style={{ marginTop: 28, fontSize: 17, color: SUB, lineHeight: 1.7, maxWidth: 560 }}>
              <p>I began my own journey well underweight, trying every free program I could find online with very little to show for it. What eventually worked was treating my body as a system — structured training, properly planned nutrition, and a program tailored to my individual lifestyle.</p>
              <p>Today I coach clients navigating the same challenges I once did. Driven, busy people who want a meaningful physical transformation without compromising the career, relationships and experiences that matter to them.</p>
            </motion.div>
            <motion.div variants={fadeUp} style={{ marginTop: 28, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["CERT III FITNESS · IN PROGRESS", "CERT IV FITNESS · IN PROGRESS", "CERT III NUTRITION · IN PROGRESS"].map((c) => (
                <span key={c} style={{
                  padding: "6px 12px", background: INK, color: CREAM,
                  fontFamily: mono, fontSize: 10, letterSpacing: 1,
                }}>{c}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ padding: "100px 40px", background: tintAlpha(INK, CREAM, 0.04) }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>[05] — GALLERY</div>
            <h2 style={{ fontFamily: display, fontSize: 96, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              FROM THE <span style={{ color: DEEP, fontStyle: "italic" }}>FLOOR.</span>
            </h2>
          </motion.div>
        </motion.div>

        <div style={{ position: "relative", height: 620, maxWidth: 1100, margin: "0 auto", overflow: "hidden" }}>
          {GALLERY.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" as const }}
              style={{ position: "absolute", top: p.top, left: p.left }}
            >
              <div style={{
                transform: `rotate(${p.rotate}deg)`, background: CREAM, padding: 12,
                boxShadow: `0 8px 24px rgba(0,0,0,0.18), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <Placeholder label={p.caption} style={{ width: 200, height: 220 }} seed={50 + i} />
                <div style={{ fontFamily: mono, fontSize: 11, textAlign: "center", marginTop: 8, color: INK, letterSpacing: 1 }}>
                  {p.caption.toUpperCase()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── JOURNAL ─────────────────────────────────────────────────────── */}
      <section id="journal" style={{ padding: "100px 40px", borderTop: `1.5px solid ${INK}` }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, gap: 40 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>[06] — JOURNAL</div>
              <h2 style={{ fontFamily: display, fontSize: 96, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
                FIELD <span style={{ color: DEEP, fontStyle: "italic" }}>NOTES.</span>
              </h2>
            </div>
            <a href="#" style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: INK, textDecoration: "underline", textUnderlineOffset: 4 }}>
              READ ALL ↗
            </a>
          </motion.div>

          <motion.div
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {POSTS.map((p, i) => (
              <motion.article key={i} variants={fadeUp} style={{
                background: CREAM, border: `1.5px solid ${INK}`, borderRadius: 2,
                boxShadow: `4px 4px 0 ${INK}`, cursor: "pointer",
                display: "flex", flexDirection: "column",
              }}>
                <Placeholder label={p.title} style={{ width: "100%", height: 200 }}
                  bg={INK} fg={hexToRgba(LIGHT, 0.15)} text={hexToRgba(MID, 0.7)} seed={70 + i} />
                <div style={{ padding: "22px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, background: INK, color: CREAM, padding: "3px 8px", letterSpacing: 1 }}>{p.cat.toUpperCase()}</span>
                    <span style={{ fontFamily: mono, fontSize: 10, color: SUB, letterSpacing: 1, alignSelf: "center" }}>{p.date} · {p.readTime}</span>
                  </div>
                  <div style={{ fontFamily: display, fontSize: 26, letterSpacing: 0.5, lineHeight: 1.05, marginBottom: 12 }}>{p.title.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: SUB, lineHeight: 1.55, flex: 1 }}>{p.excerpt}</div>
                  <div style={{ marginTop: 18, fontFamily: mono, fontSize: 11, color: DEEP, letterSpacing: 1.5 }}>READ POST →</div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ padding: "100px 40px", borderTop: `1.5px solid ${INK}` }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>[07] — FREQUENTLY ASKED</div>
            <h2 style={{ fontFamily: display, fontSize: 88, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              QUESTIONS, <span style={{ color: DEEP }}>ANSWERED.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerFast}
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
          >
            {FAQS.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                style={{
                  border: `1.5px solid ${INK}`, padding: "20px 22px", cursor: "pointer",
                  background: openFaq === i ? INK : CREAM,
                  color: openFaq === i ? CREAM : INK,
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                  <div style={{ fontFamily: display, fontSize: 20, letterSpacing: 0.5 }}>{f.q.toUpperCase()}</div>
                  <div style={{ fontFamily: display, fontSize: 22, color: openFaq === i ? LIGHT : DEEP, flexShrink: 0 }}>
                    {openFaq === i ? "−" : "+"}
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" as const }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, opacity: 0.88 }}>
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <motion.section
        id="book"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        style={{
          padding: "120px 40px", background: DEEP, color: CREAM, textAlign: "center",
          borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}`, position: "relative",
        }}
      >
        <motion.div variants={fadeUp} style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>
          [08] — 4 SPOTS · MAY 2026 INTAKE
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontFamily: display, fontSize: 160, letterSpacing: 2, lineHeight: 0.88, margin: 0 }}>
          LET&apos;S <span style={{ fontStyle: "italic" }}>BUILD</span><br />YOUR BEST SHAPE.
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 19, maxWidth: 560, margin: "32px auto 40px", lineHeight: 1.5 }}>
          Book a 30-minute discovery call. We&apos;ll discuss your goals, assess whether coaching is the right fit, and outline what your next 12 weeks could realistically look like.
        </motion.p>
        <motion.div variants={fadeUp}>
          <button onClick={onBook} style={{
            background: INK, color: CREAM, border: `1.5px solid ${INK}`, padding: "20px 36px",
            borderRadius: 2, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: mono, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: `5px 5px 0 ${CREAM}`,
          }}>Book your call ↗</button>
        </motion.div>
      </motion.section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ padding: 40, background: INK, color: CREAM }}>
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid rgba(245,237,216,0.15)" }}>
          <Logo src="/tc-logo-white.png" size={160} invert withWordmark wordmarkSize={32} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, opacity: 0.5, marginBottom: 10, textTransform: "uppercase" }}>Social</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
              <a href="https://instagram.com/tensfit_" style={{ color: CREAM, textDecoration: "none" }}>@tensfit_ · Instagram ↗</a>
              <a href="https://tiktok.com/@tensfit_" style={{ color: CREAM, textDecoration: "none" }}>@tensfit_ · TikTok ↗</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, opacity: 0.5, marginBottom: 10, textTransform: "uppercase" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
              <a href="mailto:hello@tencoaching.com.au" style={{ color: CREAM, textDecoration: "none" }}>hello@tencoaching.com.au</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(245,237,216,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: display, fontSize: 36, letterSpacing: 3, color: DEEP }}>
            SOAR BEYOND LIMITS.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#book" style={{
              background: CREAM, color: INK, padding: "12px 20px", border: `1.5px solid ${CREAM}`,
              fontFamily: mono, fontSize: 12, letterSpacing: 1, textTransform: "uppercase",
              textDecoration: "none", fontWeight: 700,
            }}>Book a discovery call ↗</a>
            <a href="https://instagram.com/tensfit_" style={{
              background: "transparent", color: CREAM, padding: "12px 20px", border: `1.5px solid rgba(245,237,216,0.4)`,
              fontFamily: mono, fontSize: 12, letterSpacing: 1, textTransform: "uppercase",
              textDecoration: "none", fontWeight: 700,
            }}>DM on Instagram ↗</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
