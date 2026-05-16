"use client";

import { useState, useEffect, useRef } from "react";
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

function ClientPhoto({ src, label, minHeight = 480 }: { src: string; label: string; minHeight?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      position: "relative", background: INK, width: "100%", height: "100%", minHeight,
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

// ── Gallery photo component ───────────────────────────────────────────────

function GalleryPhoto({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      position: "relative", width: 200, height: 220, background: INK,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <Image src="/tc-logo-white.png" alt="" width={64} height={64} style={{ opacity: 0.3, flexShrink: 0 }} />
      {!failed && (
        <Image src={src} alt={label} fill style={{ objectFit: "cover" }} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

// ── Hero polaroid photo component ────────────────────────────────────────

function HeroPhoto({ src, width, height }: { src: string; width: number | string; height: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      position: "relative", width, height, background: INK,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <Image src="/tc-logo-white.png" alt="" width={64} height={64} style={{ opacity: 0.3, flexShrink: 0 }} />
      {!failed && (
        <Image src={src} alt="" fill style={{ objectFit: "cover" }} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

// ── About section portrait photo ─────────────────────────────────────────

function AboutPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: INK, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Image src="/tc-logo-white.png" alt="" width={80} height={80}
        style={{ opacity: 0.3, flexShrink: 0 }} />
      {!failed && (
        <Image src={src} alt="About" fill style={{ objectFit: "cover" }} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

// ── Journal card portrait photo ───────────────────────────────────────────

function JournalPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "3/4",
      background: INK, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Image src="/tc-logo-white.png" alt="" width={80} height={80}
        style={{ opacity: 0.3, flexShrink: 0 }} />
      {!failed && (
        <Image src={src} alt="" fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          onError={() => setFailed(true)} />
      )}
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
  { img: "/photos/tenhang-travel-01.jpg",     caption: "ON THE ROAD",          top: 0,   left: 20,  rotate: -3 },
  { img: "/photos/tenhang-travel-02.jpg",     caption: "OFF GRID",             top: 30,  left: 260, rotate: 4  },
  { img: "/photos/tenhang-travel-03.jpg",     caption: "SOMEWHERE NEW",        top: 10,  left: 510, rotate: -2 },
  { img: "/photos/tenhang-food-01.jpg",       caption: "THE FOODIE",           top: 60,  left: 770, rotate: 5  },
  { img: "/photos/tenhang-food-02.jpg",       caption: "NIGHT OUT",            top: 290, left: 80,  rotate: 3  },
  { img: "/photos/tenhang-basketball-01.jpg", caption: "PICKUP · WESTERN SYD", top: 310, left: 340, rotate: -4 },
  { img: "/photos/tenhang-basketball-02.jpg", caption: "ON THE COURT",         top: 290, left: 610, rotate: 2  },
  { img: "/photos/tenhang-gym-01.jpg",        caption: "THE FLOOR",            top: 320, left: 850, rotate: -3 },
];

const POSTS = [
  {
    cat: "ORIGIN",
    title: "THE SKINNY PHASE — WHERE IT ALL STARTED",
    preview: "50kg, no plan, no clue. Every arc has a beginning — this is mine.",
    photo: "/photos/tenhang-skinny.jpg",
    body: [
      "Every arc has a beginning. Mine started at 15, 50kg, and absolutely clueless.",
      "If you saw me back then you wouldn't have guessed I'd end up coaching people on their physique. I was the skinny kid — and I mean properly skinny. The kind where people don't hesitate to remind you. \"You need to eat more\" was something I heard constantly and after a while it started getting to me. I'd look around and think — would I ever actually look like I lift?",
      "The funny thing is I wasn't even thinking about any of that at the time. I was just living. Basketball every day after school, going home and smashing a bowl of cereal, some bread, maybe rice if mum cooked — and calling it a meal. I had no idea what protein was, no idea what I needed to eat to build muscle. I was just a kid who loved sport and happened to be really, really skinny.",
      "The gym came into the picture because of my brother. We always did everything together so when he suggested we sign up it was a no brainer. But I won't pretend I walked in there with some big vision or goal. I was just there to have fun and figure out what all the machines did. Walking in and seeing everyone around me lifting heavy while I could barely manage the bar was intimidating — it was the one place in my fitness life where I genuinely felt like I didn't belong.",
      "But here's the thing about me — I've always been competitive. Always strived to be better at everything I put my hands on. So yeah I was intimidated, but that feeling didn't last long. Pretty quickly that intimidation flipped into something else entirely. I looked around at the guys lifting heavy, the ones who looked big and strong, and instead of shrinking I thought — I want to get to that level. Actually, I want to surpass it.",
      "That competitive fire was always there whether it was on the basketball court or in the classroom. The gym just became another arena to prove something — mostly to myself.",
      "I was still more focused on basketball than anything else at this point. Still short, still skinny, still eating cereal for dinner. But somewhere in the back of my mind a thought had planted itself — one day I want to look lean and aesthetic. I just had no idea when that day would come.",
      "That's where the arc begins.",
    ],
  },
  {
    cat: "STUCK",
    title: "STUCK BEING MID",
    preview: "Gained the weight, stopped progressing in lifts. Stuck being mid and didn't even know why.",
    photo: "/photos/tenhang-stuck.jpg",
    body: [
      "There's a phase nobody talks about in fitness. You're not a beginner anymore. You're not where you want to be either. You're just... stuck. That was me from 17 to 21 and honestly it bled into every part of my life.",
      "By this point I'd naturally climbed from 60kg up to around 72-73kg. I wasn't fat — nobody was pulling me aside to say anything — but I knew. I could feel it. Sluggish on the court, soft in the mirror, going through the motions in the gym. I looked normal to everyone else but to me I knew I was capable of so much more and that gap between where I was and where I wanted to be started eating at me.",
      "The gym was consistent enough but I was still just winging it. No tracking, no real structure, just showing up and lifting without any real direction. I was getting stronger sure, but the progress had flatlined. Same weight on the bar week after week. Same body in the mirror month after month. Boring doesn't even cover it.",
      "Then life got hard. Outside pressures started building up and for a period I felt like I was falling behind in every area except one — the gym. So I leaned into it completely.",
      "I started going to the gym five times a week. Not because I had a plan — because I needed somewhere to put everything I was feeling. The weights became my outlet, my therapy, my proof to myself that I wasn't as stuck as I felt. I was building muscle, getting stronger, showing up every single day. But I still wasn't tracking my nutrition and the progress in the mirror still wasn't matching the effort I was putting in.",
      "And that's where the frustration really set in. I was doing everything I thought I was supposed to do. Showing up consistently, training hard, not skipping sessions. But the body I wanted? Still nowhere to be seen. I'd look in the mirror after months of grinding and feel nothing had changed. How are you supposed to stay motivated when the work doesn't seem to be working? I started questioning everything — my training, my genetics, whether this was even possible for someone like me.",
      "I was consistent. I was working harder than ever. And I was still stuck.",
      "Something had to change.",
    ],
  },
  {
    cat: "PEAK",
    title: "PEAK UNLOCKED — WHEN IT ALL CLICKED",
    preview: "The moment it all clicked. From mid to peak — and exactly how I got there.",
    photo: "/photos/tenhang-peak.jpg",
    body: [
      "Something had to change. So I changed the one thing I hadn't tried yet.",
      "No grand plan. No coach. Just hit a wall and decided to finally get serious about the one thing I'd been ignoring the whole time — my nutrition. I was already active, already consistent in the gym, already playing ball twice a week and hitting 10k steps most days. My body was ready. It was just waiting for the right fuel.",
      "The results came faster than I expected. Six to eight weeks in I was finally seeing my abs come through for the first time. But honestly the physical changes weren't even the most surprising part. Everything else started working better too. My sleep improved dramatically. My workouts felt sharper. My mood lifted. I was eating mostly whole foods and my body was just functioning the way it was always supposed to — and I hadn't felt that way in years.",
      "72kg down to 62kg. Abs. Striations. A version of myself in the mirror I'd been chasing since I was that skinny 15 year old walking into the gym for the first time not knowing where to start.",
      "It sounds simple when I write it out like that. Get serious about nutrition, eat whole foods, stay consistent. But the mental shift that came with it was anything but simple. For the first time in my life I felt sharp. Confident. Like I was finally operating at the level I always knew I was capable of. The gym sessions hit different. The ball games hit different. Everything hit different when your body is actually fuelled the way it should be.",
      "Then I went overseas for a month, enjoyed every meal, lived my best life — and came back and did it again. Cut again, abs back, leaner than ever. That was the moment I knew it wasn't luck. It was a system. And it worked every single time.",
      "That's what I want for every person I coach. Not just the abs — the feeling. The clarity. The confidence that comes from proving to yourself that you can do something you didn't think was possible.",
      "The arc is never finished. But I've got the system, the results, and the drive to help you write yours.",
    ],
  },
];

const FAQS = [
  { q: "How long until I see results?",
    a: "Give it 12 weeks minimum — that's where the real changes start showing. 16 weeks is where results get seriously impressive. Everyone's starting point is different so timelines vary, but if you show up consistently and follow the program the results will come. That's not a maybe — that's a guarantee." },
  { q: "What if my schedule changes week to week?",
    a: "That's exactly what the program is built for. Life isn't predictable and neither is a good coaching program. We plan ahead, adapt when things come up, and always have strategies in place to keep you on track no matter what the week throws at you. An unpredictable week is never an excuse to lose progress." },
  { q: "Can I still travel, socialise, and enjoy life during coaching?",
    a: "Of course. The whole philosophy behind Ten Coaching is that getting lean doesn't mean missing out on life. Social events, holidays, weekends out with mates — all of it is part of the plan. We work around your life, not against it. Enjoy the moments that matter and we'll always get back on track together." },
  { q: "How quickly will I get my program after signing up?",
    a: "Fast. After your consultation call your personalised program is usually ready within 2-3 days. No waiting weeks to get started — we hit the ground running." },
  { q: "What is included in weekly coaching?",
    a: "Every week you get a 1:1 check-in call scheduled around you, direct messaging access for questions and support anytime, and program adjustments based on your progress. Everything is tracked and managed through Everfit so your workouts, nutrition and progress are always in one place." },
  { q: "What happens after I reach my goal?",
    a: "Once you hit your goal the work doesn't stop there — that's actually where the most important part begins. The whole point of how I coach nutrition is to build habits and knowledge that stick with you for life. You'll understand your body, know how to eat flexibly, and be able to sustain your results long after the program ends. I will show you how to sustain it — because the goal was never just to get you lean once. It's to keep you there." },
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
  const [activePost, setActivePost] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activePost === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActivePost(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePost]);

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
          <Image src="/tc-watermark-wukong.png" alt="" width={1400} height={1400} priority style={{ display: "block" }} />
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
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            >
              <div style={{
                transform: "rotate(-4deg)", background: CREAM, padding: 14,
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <HeroPhoto src="/photos/tenhang-hero-01.jpg" width={220} height={260} />
                <div style={{ fontFamily: mono, fontSize: 11, textAlign: "center", marginTop: 10, color: INK, letterSpacing: 1 }}>YOUR COACH · PEAK</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              style={{ position: "absolute", top: 80, right: 0, zIndex: 3 }}
            >
              <div style={{
                transform: "rotate(5deg)", background: CREAM, padding: 12,
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <HeroPhoto src="/photos/tenhang-hero-02.jpg" width={200} height={260} />
                <div style={{ fontFamily: mono, fontSize: 11, textAlign: "center", marginTop: 8, color: INK, letterSpacing: 1 }}>PHILIPPINES · LIVING PROOF</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ position: "absolute", bottom: 0, left: 60, zIndex: 2 }}
            >
              <div style={{
                transform: "rotate(-2deg)", background: CREAM, padding: 12,
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), 3px 3px 0 ${INK}`, border: `1px solid ${BORDER}`,
              }}>
                <HeroPhoto src="/photos/tenhang-hero-03.jpg" width={240} height={200} />
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

          <motion.div variants={stagger} className="results-grid">

            {/* JEROME */}
            <motion.div variants={fadeUp} className="results-card">
              <ClientPhoto src="/photos/tenhang-client-jerome.jpg" label="BEFORE → AFTER · JEROME" minHeight={340} />
              <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18, background: CREAM, color: INK }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: INK, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>72KG → 63KG</span>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: DEEP, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>24 WEEKS</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.75, color: INK, fontStyle: "italic", flex: 1 }}>
                  &ldquo;I was in a rough place, so stressed with work, just let myself go, barely any exercise, eating whatever I wanted. Too many bad habits for a long period made me so unhappy, I knew something had to change. Being coached was great. I got given a workout routine catered to my overall end goal, nutritional advice, and we had a 1 to 1 call every week we would discuss how the weeks gone — what I&apos;d done well, what I need to improve on. Having a coach gives me someone who can hold me accountable on the days I don&apos;t feel like doing shit. The results have been crazy. From how I looked when I started to how I look now, is insane. I feel bigger, less stressed and more confident. It&apos;s not just how I look but it&apos;s also how much I&apos;ve learnt about health and fitness. Knowledge that will stay with me forever.&rdquo;
                </div>
                <div>
                  <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1 }}>JEROME</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: SUB, letterSpacing: 1 }}>72kg → 63kg · 24 weeks</div>
                </div>
              </div>
            </motion.div>

            {/* BEN — placeholder */}
            <motion.div variants={fadeUp} className="results-card">
              <ClientPhoto src="/photos/client-ben.jpg" label="CLIENT · BEN" minHeight={340} />
              <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18, background: CREAM, color: INK }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: INK, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>COMING SOON</span>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: DEEP, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>WEEKS TBD</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.75, color: INK, fontStyle: "italic", flex: 1 }}>
                  &ldquo;Transformation in progress.&rdquo;
                </div>
                <div>
                  <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1 }}>BEN</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: SUB, letterSpacing: 1 }}>IN PROGRESS</div>
                </div>
              </div>
            </motion.div>

            {/* PHILIP — placeholder */}
            <motion.div variants={fadeUp} className="results-card">
              <ClientPhoto src="/photos/client-philip.jpg" label="CLIENT · PHILIP" minHeight={340} />
              <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18, background: CREAM, color: INK }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: INK, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>COMING SOON</span>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: DEEP, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>WEEKS TBD</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.75, color: INK, fontStyle: "italic", flex: 1 }}>
                  &ldquo;Transformation in progress.&rdquo;
                </div>
                <div>
                  <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1 }}>PHILIP</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: SUB, letterSpacing: 1 }}>IN PROGRESS</div>
                </div>
              </div>
            </motion.div>

            {/* RAYDEL — placeholder */}
            <motion.div variants={fadeUp} className="results-card">
              <ClientPhoto src="/photos/client-raydel.jpg" label="CLIENT · RAYDEL" minHeight={340} />
              <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18, background: CREAM, color: INK }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: INK, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>COMING SOON</span>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, fontWeight: 700, background: DEEP, color: CREAM, padding: "5px 12px", borderRadius: 5, textTransform: "uppercase" }}>WEEKS TBD</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.75, color: INK, fontStyle: "italic", flex: 1 }}>
                  &ldquo;Transformation in progress.&rdquo;
                </div>
                <div>
                  <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1 }}>RAYDEL</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: SUB, letterSpacing: 1 }}>IN PROGRESS</div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "100px 40px", borderTop: `1.5px solid ${INK}`, borderBottom: `1.5px solid ${INK}` }}>
        <div style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "stretch" }}>
            {/* Image col */}
            <motion.div variants={fadeIn} style={{ position: "relative", height: "100%" }}>
              <div style={{
                position: "absolute", top: -14, left: 30, width: 80, height: 24,
                background: TAPE, transform: "rotate(-3deg)", zIndex: 1,
              }} />
              <AboutPhoto src="/photos/tenhang-japan-travel.jpg" />
            </motion.div>

            {/* Text col */}
            <div>
              <motion.div variants={fadeUp} style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>
                [04] — ABOUT THE COACH
              </motion.div>
              <motion.h2 variants={fadeUp} style={{ fontFamily: display, fontSize: 80, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
                MEET YOUR <span style={{ color: DEEP, fontStyle: "italic" }}>COACH.</span>
              </motion.h2>
              <motion.div variants={fadeUp} style={{ marginTop: 28, fontSize: 17, color: SUB, lineHeight: 1.7, maxWidth: 560, display: "flex", flexDirection: "column", gap: "1.2em" }}>
                <p>I&apos;m Tenhang — a 22 year old from Western Sydney who&apos;s obsessed with fitness, living life, and helping people become the best version of themselves.</p>
                <p>As a kid I tried every sport I could get my hands on — footy, AFL — to finding my real home on the basketball court. Basketball has been a massive part of my life since high school and still is today, and eventually that love for sport led me to falling in love with the gym. Fitness was never something I forced, it was just always there, evolving with me. When I started taking it seriously something clicked. Not just physically but mentally. I realised you don&apos;t have to choose between looking your best and living your life — the late nights, the trips overseas, the weekends with people you love. You can have both.</p>
                <p>Today I coach people who want that same thing. I travel whenever I have the opportunity, I&apos;m a foodie at heart who loves eating a lot, and I&apos;m always down for a good time — fitness never stopped me from any of that, if anything it made me enjoy it even more. Every client I work with I treat like a mate. I&apos;m invested in where you end up because watching someone hit their goal is genuinely one of the best feelings I know. This started as a passion. Now it&apos;s my purpose.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        </div>
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
              THE LIFE THAT DRIVES THE <span style={{ color: DEEP, fontStyle: "italic" }}>WORK.</span>
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
                <GalleryPhoto src={p.img} label={p.caption} />
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
          <motion.div variants={fadeUp} style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, marginBottom: 16, color: DEEP }}>[06] — MY TRAINING ARC</div>
            <h2 style={{ fontFamily: display, fontSize: 96, letterSpacing: 2, lineHeight: 0.9, margin: 0 }}>
              MY TRAINING <span style={{ color: DEEP, fontStyle: "italic" }}>ARC.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {POSTS.map((p, i) => (
              <motion.article key={i} variants={fadeUp}
                onClick={() => setActivePost(i)}
                style={{
                  background: CREAM, border: `1.5px solid ${INK}`, borderRadius: 2,
                  boxShadow: `4px 4px 0 ${INK}`, cursor: "pointer",
                  display: "flex", flexDirection: "column",
                }}>
                <JournalPhoto src={p.photo} />
                <div style={{ padding: "22px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, background: INK, color: CREAM, padding: "3px 8px", letterSpacing: 1 }}>{p.cat}</span>
                  </div>
                  <div style={{ fontFamily: display, fontSize: 26, letterSpacing: 0.5, lineHeight: 1.05, marginBottom: 12 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: SUB, lineHeight: 1.55, flex: 1 }}>{p.preview}</div>
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
        <motion.h2 variants={fadeUp} style={{ fontFamily: display, fontSize: 160, letterSpacing: 2, lineHeight: 0.88, margin: 0 }}>
          YOUR ARC<br /><span style={{ color: INK, fontStyle: "italic" }}>STARTS NOW.</span>
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 19, maxWidth: 560, margin: "32px auto 40px", lineHeight: 1.5 }}>
          Book a free discovery call and let&apos;s talk about where you are, where you want to be, and how to get there. No pressure, no pitch — just an honest conversation about your goals and whether this is the right move for you.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <a href="#book" style={{
            background: INK, color: CREAM, border: `1.5px solid ${INK}`, padding: "20px 36px",
            borderRadius: 2, fontSize: 15, fontWeight: 700, fontFamily: mono, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: `5px 5px 0 ${CREAM}`, textDecoration: "none", display: "inline-block",
          }}>Book a Discovery Call ↗</a>
          <a href="https://instagram.com/tensfit_" target="_blank" rel="noopener noreferrer" style={{
            background: "transparent", color: CREAM, border: `1.5px solid ${CREAM}`, padding: "20px 36px",
            borderRadius: 2, fontSize: 15, fontWeight: 700, fontFamily: mono, letterSpacing: 1.5, textTransform: "uppercase",
            textDecoration: "none", display: "inline-block",
          }}>DM on Instagram ↗</a>
        </motion.div>
      </motion.section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ padding: 40, background: INK, color: CREAM }}>
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid rgba(245,237,216,0.15)" }}>
          <Logo src="/tc-logo-white.png" size={72} invert withWordmark wordmarkSize={36} />
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
              <a href="mailto:ten@tencoaching.com.au" style={{ color: CREAM, textDecoration: "none" }}>ten@tencoaching.com.au</a>
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

      {/* ── POST MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePost !== null && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setActivePost(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: hexToRgba(INK, 0.88),
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              key="modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: INK, color: CREAM, borderRadius: 2,
                maxWidth: 720, width: "100%", maxHeight: "85vh",
                overflow: "hidden", display: "flex", flexDirection: "column",
                position: "relative", border: `1px solid rgba(245,237,216,0.12)`,
              }}
            >
              <button
                ref={closeRef}
                onClick={() => setActivePost(null)}
                aria-label="Close post"
                className="modal-close"
                style={{
                  position: "absolute", top: 16, right: 16, zIndex: 3,
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "none", border: "1px solid rgba(245,237,216,0.15)",
                  borderRadius: 2, cursor: "pointer",
                  fontFamily: display, fontSize: 26, lineHeight: 1,
                }}
              >×</button>

              <div className="modal-scroll" style={{ overflowY: "auto", padding: "48px 48px 64px", flex: 1 }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: DEEP, marginBottom: 16, textTransform: "uppercase" }}>
                  {POSTS[activePost].cat}
                </div>
                <h2 id="modal-title" style={{
                  fontFamily: display, fontSize: 52, letterSpacing: 1, lineHeight: 0.95,
                  margin: "0 0 32px", color: CREAM,
                }}>
                  {POSTS[activePost].title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2em", fontSize: 16, lineHeight: 1.75, color: hexToRgba(CREAM, 0.82) }}>
                  {POSTS[activePost].body.map((para, pi) => (
                    <p key={pi} style={{ margin: 0 }}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Bottom fade affordance */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 70, pointerEvents: "none", zIndex: 2,
                background: `linear-gradient(to bottom, transparent, ${INK})`,
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
