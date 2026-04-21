import { useState, useEffect } from "react";

export default function RendrStudios() {
  const [mode, setMode] = useState("brand");
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize Cal.com embed
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "15min", { origin: "https://app.cal.com" });
    window.Cal.ns["15min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  useEffect(() => {
    setOpenFaq(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [mode]);

  const isBrand = mode === "brand";
  // Brand = cyan (matches logo), Creator = electric green (gender-neutral, creator-culture energy)
  const accent = isBrand ? "#00E5FF" : "#B4FF39";
  const accentGlow = isBrand ? "0, 229, 255" : "180, 255, 57";

  return (
    <div
      className="min-h-screen text-neutral-100 antialiased selection:bg-neutral-100 selection:text-neutral-950"
      style={{
        backgroundColor: "#050507",
        fontFamily: "'Instrument Sans', -apple-system, sans-serif",
        "--accent": accent,
        "--accent-glow": accentGlow,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-serif-display { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; letter-spacing: -0.02em; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        /* Film grain */
        .grain::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* Ambient cyan backlight */
        .backlight {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(circle at 15% 10%, rgba(var(--accent-glow), 0.08), transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(var(--accent-glow), 0.05), transparent 50%);
        }

        .accent-color { color: var(--accent); }
        .accent-bg { background-color: var(--accent); }
        .accent-border { border-color: var(--accent); }

        /* Neon glow for accent text */
        .neon-text {
          color: var(--accent);
          text-shadow:
            0 0 10px rgba(var(--accent-glow), 0.6),
            0 0 20px rgba(var(--accent-glow), 0.4),
            0 0 40px rgba(var(--accent-glow), 0.2);
        }

        .neon-soft {
          text-shadow:
            0 0 8px rgba(var(--accent-glow), 0.4),
            0 0 16px rgba(var(--accent-glow), 0.2);
        }

        .neon-border {
          border: 1px solid var(--accent);
          box-shadow:
            0 0 12px rgba(var(--accent-glow), 0.3),
            inset 0 0 12px rgba(var(--accent-glow), 0.05);
        }

        .neon-btn {
          background: var(--accent);
          color: #050507;
          box-shadow:
            0 0 20px rgba(var(--accent-glow), 0.5),
            0 0 40px rgba(var(--accent-glow), 0.2);
          transition: all 0.3s ease;
        }
        .neon-btn:hover {
          box-shadow:
            0 0 28px rgba(var(--accent-glow), 0.7),
            0 0 56px rgba(var(--accent-glow), 0.35);
          transform: translateY(-1px);
        }

        /* Rendr wordmark for nav - CSS approximation of logo */
        .rendr-mark {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-style: italic;
          letter-spacing: -0.02em;
          color: var(--accent);
          text-shadow:
            0 0 6px rgba(var(--accent-glow), 0.8),
            0 0 12px rgba(var(--accent-glow), 0.5),
            0 0 24px rgba(var(--accent-glow), 0.25);
        }

        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Neon flicker for hero logo */
        .flicker {
          animation: flicker 6s infinite;
        }
        @keyframes flicker {
          0%, 92%, 94%, 96%, 100% { opacity: 1; }
          93%, 95% { opacity: 0.85; }
        }

        .marquee-track {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s, box-shadow 0.4s;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 0 24px rgba(var(--accent-glow), 0.15);
        }

        /* Subtle grid background for certain sections */
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .divider-dots {
          background-image: radial-gradient(circle, rgba(var(--accent-glow), 0.25) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .thumbnail-placeholder {
          background: linear-gradient(135deg, #14141a 0%, #050507 100%);
          position: relative;
          overflow: hidden;
        }
        .thumbnail-placeholder::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 30% 30%, rgba(var(--accent-glow), 0.06), transparent 50%);
        }
      `}</style>

      <div className="backlight" />
      <div className="grain" />

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-[#050507]/80 border-b border-neutral-900" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between gap-2">
          {/* Wordmark */}
          <a href="#" className="flex items-baseline gap-1.5 shrink-0">
            <span className="rendr-mark text-xl md:text-2xl flicker">Rendr</span>
            <span className="font-serif-display italic text-xl md:text-2xl text-neutral-500 hidden sm:inline">
              Studios
            </span>
          </a>

          {/* Mode Toggle */}
          <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 border border-neutral-800 rounded-full bg-neutral-950/60">
            <button
              onClick={() => setMode("brand")}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest rounded-full transition-all ${
                isBrand ? "bg-neutral-100 text-neutral-950" : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              Brands
            </button>
            <button
              onClick={() => setMode("creator")}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest rounded-full transition-all ${
                !isBrand ? "bg-neutral-100 text-neutral-950" : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              Creators
            </button>
          </div>

          <button
            className="hidden md:flex items-center gap-2 neon-btn px-5 py-2.5 rounded-full text-sm font-medium"
            {...(isBrand && {
              "data-cal-link": "ty-mcguire-bfmkql/15min",
              "data-cal-namespace": "15min",
              "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
            })}
          >
            {isBrand ? "Book a call" : "Apply"}
            <span className="text-xs">→</span>
          </button>
        </div>
      </nav>

      <div className="relative z-10">
        {isBrand ? (
          <BrandView openFaq={openFaq} setOpenFaq={setOpenFaq} />
        ) : (
          <CreatorView openFaq={openFaq} setOpenFaq={setOpenFaq} />
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 mt-16 md:mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="rendr-mark text-2xl md:text-3xl">Rendr</span>
              <span className="font-serif-display italic text-2xl md:text-3xl text-neutral-500">
                Studios
              </span>
            </div>
            <p className="text-neutral-500 text-xs sm:text-sm font-mono">
              Organic short-form. Consumer apps. Built by operators.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 md:gap-x-8 gap-y-2 text-sm text-neutral-500">
            <button onClick={() => setMode("brand")} className="hover:text-neutral-100 text-left">For Brands</button>
            <button onClick={() => setMode("creator")} className="hover:text-neutral-100 text-left">For Creators</button>
            <a href="#work" className="hover:text-neutral-100">Work</a>
            <a href="mailto:[founder@rendrstudios.com]" className="hover:text-neutral-100">Contact</a>
            <a href="#" className="hover:text-neutral-100">LinkedIn</a>
            <a href="#" className="hover:text-neutral-100">Instagram</a>
          </div>
          <div className="font-mono text-xs text-neutral-600">© 2026 Rendr Studios</div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   BRAND VIEW
   ============================================================ */
function BrandView({ openFaq, setOpenFaq }) {
  const sampleWork = [
    { label: "Tech / VR", views: "2M", platform: "Shorts", video: "https://www.youtube.com/embed/81LVnOdc600" },
    { label: "AI productivity", views: "890K", platform: "Reels" },
    { label: "Finance app", views: "1.1M", platform: "Shorts" },
    { label: "Language learning", views: "3.2M", platform: "TikTok" },
    { label: "Habit tracker", views: "670K", platform: "Reels" },
    { label: "Meditation app", views: "1.8M", platform: "Shorts" },
    { label: "Study app", views: "540K", platform: "TikTok" },
    { label: "Dating app", views: "2.1M", platform: "Reels" },
    { label: "Journaling app", views: "420K", platform: "Shorts" },
  ];

  const faqs = [
    {
      q: "How is 2,000+ videos a month even possible without quality dropping?",
      a: "Because our creators don't edit their own work. They film; our dedicated edit team cuts. Creators do what they're best at, editors do what they're best at. That's the whole unlock.",
    },
    {
      q: "Are the creator accounts mine, or yours?",
      a: "We build and manage the creator accounts for your app. You get full visibility into performance, content, and audience throughout. The specifics of ownership get covered on the call — we make sure you're never locked out.",
    },
    {
      q: "What kind of apps do you work best with?",
      a: "Consumer and prosumer apps with a mobile component — fitness, AI tools, finance, productivity, language learning, dating, mental health, habit tracking. If your app is B2B enterprise SaaS, we're probably not the right fit.",
    },
    {
      q: "What happens if month one doesn't go well?",
      a: "We're month-to-month, no long contracts. If month one doesn't hit, you don't renew. We earn every dollar of every month.",
    },
  ];

  return (
    <main className="pt-24">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 md:pt-16 pb-16 md:pb-24 relative">
        <div className="fade-up">
          <div className="flex items-center gap-3 mb-8 md:mb-10 justify-center">
            <span className="w-2 h-2 rounded-full accent-bg animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400">
              Now accepting 3 new clients — Q2 2026
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-6xl mx-auto text-center">
            Volume without quality is <em className="neon-text">noise</em>.
            <br />
            Quality without volume is <em className="neon-text">invisible</em>.
          </h1>

          <div className="mt-8 md:mt-14 max-w-4xl mx-auto text-center">
            <p className="text-base md:text-xl text-neutral-400 leading-relaxed">
              We run organic short-form for consumer apps across TikTok, YouTube Shorts, and
              Instagram Reels — 2,000+ videos every month, every one edited to actually perform.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                className="neon-btn px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-3 whitespace-nowrap w-full sm:w-auto justify-center"
                data-cal-link="ty-mcguire-bfmkql/15min"
                data-cal-namespace="15min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >
                Book a Discovery Call
                <span>→</span>
              </button>
              <span className="font-mono text-xs text-neutral-500">
                No deck. No forms. Just a real conversation.
              </span>
            </div>
          </div>
        </div>

        {/* Hero stats band */}
        <div className="mt-14 md:mt-24 border border-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden grid-bg">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-900">
            <div className="p-5 sm:p-6 md:p-10">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                Creators
              </div>
              <div className="font-serif-display text-4xl sm:text-5xl md:text-7xl">15+</div>
              <div className="mt-1 sm:mt-2 text-neutral-400 text-xs sm:text-sm">Matched to your app</div>
            </div>
            <div className="p-5 sm:p-6 md:p-10">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                Platforms
              </div>
              <div className="font-serif-display text-4xl sm:text-5xl md:text-7xl">3</div>
              <div className="mt-1 sm:mt-2 text-neutral-400 text-xs sm:text-sm">TikTok. Shorts. Reels.</div>
            </div>
            <div className="p-5 sm:p-6 md:p-10">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                Videos / Month
              </div>
              <div className="font-serif-display text-4xl sm:text-5xl md:text-7xl neon-text">2,000+</div>
              <div className="mt-1 sm:mt-2 text-neutral-400 text-xs sm:text-sm">Edited. Posted. Tested.</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-neutral-900 py-6 overflow-hidden divider-dots">
        <div className="flex marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["Volume is the method", "Creators film", "Editors cut", "Algorithms reward native", "One viral hit pays the month", "Built for consumer apps"].map(
                (txt, j) => (
                  <div key={j} className="flex items-center px-5 sm:px-10">
                    <span className="font-serif-display text-lg sm:text-2xl italic text-neutral-500">{txt}</span>
                    <span className="accent-color neon-soft ml-5 sm:ml-10">✦</span>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
              01 / The gap
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
              Posting 10 videos a month from your brand account isn't working.
              <br />
              <em className="neon-text">You already know that.</em>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              The apps actually breaking out on TikTok and Reels aren't posting from their brand
              account. They're running 10+ creator accounts at real volume — because platform
              algorithms reward creator-native content, and short-form is a numbers game that needs
              real at-bats to win.
            </p>
            <p className="mt-4 md:mt-6 text-neutral-500 leading-relaxed">
              The problem is most agencies can't deliver that volume. Not without the content
              falling apart.
            </p>
          </div>
        </div>
      </section>

      {/* MECHANISM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-10 md:mb-20">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            02 / The mechanism
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-6xl leading-[1.02] max-w-4xl">
            We run organic the way it <em className="neon-text">actually works</em>.
          </h2>
          <p className="mt-4 md:mt-6 text-neutral-400 text-base md:text-lg max-w-3xl">
            15+ creators. 3 platforms. 2,000+ videos a month. Here's how that's possible without the
            quality falling off a cliff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden">
          {[
            {
              num: "I.",
              title: "Creators, only filming",
              body:
                "Each creator is matched to your app and does what they're best at — being on camera. No editing. No logistics. No distribution. Just performance.",
            },
            {
              num: "II.",
              title: "Editors, cutting platform-native",
              body:
                "Our editors cut short-form all day. Hooks that land in the first 2 seconds, pacing each platform rewards, trends peaking this week. Every video cut for TikTok, Shorts, or Reels specifically — not one edit repurposed three ways.",
            },
            {
              num: "III.",
              title: "2,000+ posts across 3 platforms",
              body:
                "Every creator account posts daily across TikTok, YouTube Shorts, and Instagram Reels. That's the at-bat count the algorithm math actually requires to win.",
            },
          ].map((col, i) => (
            <div key={i} className="bg-[#050507] p-6 sm:p-8 md:p-10 hover-lift">
              <div className="font-serif-display text-3xl md:text-4xl italic mb-5 md:mb-8 neon-text">{col.num}</div>
              <h3 className="font-serif-display text-xl md:text-2xl mb-3 md:mb-4 leading-tight">{col.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{col.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 border-l-2 accent-border pl-4 sm:pl-6 max-w-3xl" style={{ boxShadow: "inset 4px 0 12px -8px rgba(var(--accent-glow), 0.5)" }}>
          <p className="font-serif-display text-xl md:text-2xl italic text-neutral-300 leading-snug">
            Most agencies cap out at 30-50 videos a month because they make creators edit their own
            work. That's the bottleneck we removed.
          </p>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-16">
          <div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
              03 / The work
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-7xl leading-none">
              Real videos. <em className="neon-text">Real view counts.</em>
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-neutral-500">Updated weekly</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {sampleWork.map((item, i) => (
            <div
              key={i}
              className="aspect-[9/16] thumbnail-placeholder rounded-xl sm:rounded-2xl border border-neutral-900 hover-lift relative overflow-hidden group cursor-pointer"
            >
              {item.video && (
                <iframe
                  src={item.video}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ pointerEvents: "auto" }}
                />
              )}
              <div className={`absolute inset-0 p-3 sm:p-5 flex flex-col justify-between ${item.video ? "pointer-events-none" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 border border-neutral-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-neutral-950/70 backdrop-blur">
                    {item.platform}
                  </div>
                  {!item.video && (
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-neutral-100/10 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-neutral-950 transition">
                      <span className="text-[10px] sm:text-xs ml-0.5">▶</span>
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-t from-neutral-950/80 to-transparent -mx-3 sm:-mx-5 -mb-3 sm:-mb-5 px-3 sm:px-5 pb-3 sm:pb-5 pt-8">
                  <div className="font-serif-display text-xl sm:text-3xl neon-text">{item.views}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 mt-1">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MONTH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-10 md:mb-20">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            04 / The month
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-7xl leading-none">
            What a month <em className="neon-text">looks like</em>.
          </h2>
        </div>

        <div className="space-y-px bg-neutral-900 border border-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden">
          {[
            {
              wk: "Week 01",
              title: "Onboarding & casting",
              body:
                "We study your app, your current content, your competitors. Match 15+ creators to your audience and brief them on your product, your voice, your goals.",
            },
            {
              wk: "Week 02",
              title: "Production live",
              body:
                "Creators start filming. Our edit team starts cutting. First 500 videos hit your TikTok, Shorts, and Reels accounts. Content starts going out daily across all 3 platforms.",
            },
            {
              wk: "Week 03",
              title: "Signal",
              body:
                "Early data is in. 3-5 hooks pulling ahead. Specific creators outperforming. We adjust briefs and double down on what's working.",
            },
            {
              wk: "Week 04",
              title: "Scale",
              body:
                "2,000+ videos posted. Clear winners identified. A production engine that just keeps going. Month two starts the day month one ends.",
            },
          ].map((row, i) => (
            <div key={i} className="bg-[#050507] p-5 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-[140px_1fr_2fr] gap-2 sm:gap-4 md:gap-10 items-start hover:bg-neutral-900/30 transition">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 md:pt-2">
                {row.wk}
              </div>
              <div className="font-serif-display text-2xl sm:text-3xl leading-tight">{row.title}</div>
              <div className="text-neutral-400 leading-relaxed text-sm md:text-base">{row.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 p-5 sm:p-8 md:p-10 border border-neutral-900 rounded-2xl md:rounded-3xl">
          <div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-2 md:mb-3">
              Engagements
            </div>
            <div className="font-serif-display text-2xl sm:text-4xl md:text-5xl leading-tight">
              Monthly retainer. <em className="neon-text">No long contracts.</em>
            </div>
            <p className="mt-3 text-neutral-400 max-w-xl text-sm md:text-base">
              We scope on the call based on your app, your goals, and the platforms we're running. We earn the renewal every 30 days.
            </p>
          </div>
          <button
            className="neon-btn px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-3 whitespace-nowrap w-full sm:w-auto justify-center"
            data-cal-link="ty-mcguire-bfmkql/15min"
            data-cal-namespace="15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            Book a Discovery Call
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
              05 / Who runs this
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl leading-[1.02]">
              Built by <em className="neon-text">operators</em>, not account managers.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-4 md:space-y-6 text-neutral-300 leading-relaxed text-base md:text-lg">
            <p>
              Rendr was built because every app founder we talked to had the same problem — CPI
              stuck, organic flatlining, agency shipping 30 videos a month when they needed 300.
            </p>
            <p>
              We're a lean team of two founders and a global edit crew that works around the clock,
              because that's the only way the math on 2,000+ videos a month actually works.
            </p>
            <p className="text-neutral-500">
              You'll talk to founders on every call. You'll get answers the same day. You'll know
              exactly what's shipping and when.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-8 md:mb-16">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            06 / Before you book
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl leading-none">
            Questions founders <em className="neon-text">ask first</em>.
          </h2>
        </div>

        <div className="divide-y divide-neutral-900 border-y border-neutral-900">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full py-5 md:py-7 text-left flex items-start justify-between gap-4 sm:gap-8 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 sm:gap-6">
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-600 pt-1 sm:pt-2 shrink-0">0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif-display text-lg sm:text-2xl md:text-3xl leading-tight group-hover:accent-color transition-colors">
                      {faq.q}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openFaq === i ? "max-h-60 mt-4 md:mt-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className={`font-serif-display text-2xl sm:text-3xl accent-color transition-transform duration-300 neon-soft shrink-0 ${
                  openFaq === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32">
        <div className="border border-neutral-900 rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-20 text-center relative overflow-hidden grid-bg">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(var(--accent-glow), 0.25), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-8xl leading-[0.95]">
              If your app's organic is stuck,
              <br />
              <em className="neon-text">let's talk</em>.
            </h2>
            <p className="mt-5 md:mt-8 text-neutral-400 text-base md:text-lg max-w-xl mx-auto">
              No deck. No pitch. We'll tell you straight if we can help — or if we can't.
            </p>
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                className="neon-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-3 w-full sm:w-auto justify-center"
                data-cal-link="ty-mcguire-bfmkql/15min"
                data-cal-namespace="15min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >
                Book a Discovery Call
                <span>→</span>
              </button>
              <a
                href="mailto:[founder@rendrstudios.com]"
                className="font-mono text-xs sm:text-sm text-neutral-500 hover:text-neutral-100 transition"
              >
                or email [founder@rendrstudios.com]
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   CREATOR VIEW
   ============================================================ */
function CreatorView({ openFaq, setOpenFaq }) {
  const creators = [
    { name: "Sarah K.", niche: "Fitness", followers: "45K", quote: "Most reliable UGC gig I've had. Period." },
    { name: "Jake M.", niche: "Productivity", followers: "12K", quote: "Clear briefs, fast pay, no editing on my end." },
    { name: "Maya L.", niche: "Study / Uni", followers: "88K", quote: "I film 3 days a week and it replaced my part-time job." },
    { name: "Devin R.", niche: "Tech / AI", followers: "24K", quote: "Finally a UGC gig that doesn't feel cringe." },
    { name: "Nia P.", niche: "Lifestyle", followers: "140K", quote: "Consistent work. That's all I ever wanted." },
    { name: "Theo B.", niche: "Finance", followers: "32K", quote: "Told 4 creator friends the week I joined." },
  ];

  const faqs = [
    {
      q: "Do I need a big following to apply?",
      a: "No. We care about content quality, not follower count. Some of our best creators have under 10K followers. If your content is watchable and your vibe matches one of our apps, you're in the running.",
    },
    {
      q: "What do I actually have to film?",
      a: "Short-form videos — typically 15-60 seconds — using or talking about the app you're paired with. We send you hooks and concepts. You film in your own style, from your phone, wherever you are. No scripts to memorize.",
    },
    {
      q: "Do I own my content?",
      a: "You film content that posts on creator accounts we manage for the app. The content is created for the brand and lives on those accounts. You keep the experience, the skills, and any reel clips you want to use for your own portfolio.",
    },
    {
      q: "How many videos a week should I expect to film?",
      a: "Varies by campaign. Minimum is typically 5 videos/week when you're active. Top creators ship 40-60/week. We tell you the target before you commit — no surprises.",
    },
    {
      q: "How do I get paid?",
      a: "Monthly, via direct deposit, PayPal, or Wise. We pay per video delivered — not per video 'approved' by a brand. Ship it, get paid.",
    },
    {
      q: "Where are you based and who runs this?",
      a: "Rendr is remote by default. Two founders running ops, a global crew on production. You'll have a real point of contact from day one — not a Telegram bot.",
    },
  ];

  return (
    <main className="pt-24">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="fade-up">
          <div className="flex items-center gap-3 mb-8 md:mb-10 justify-center">
            <span className="w-2 h-2 rounded-full accent-bg animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400">
              Applications reviewed every Friday
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-6xl mx-auto text-center">
            Get paid to make content
            <br />
            for apps you'd <em className="neon-text">actually use</em>.
          </h1>

          <div className="mt-8 md:mt-14 max-w-4xl mx-auto text-center">
            <p className="text-base md:text-xl text-neutral-400 leading-relaxed">
              We pair creators with fast-growing consumer apps. You film, we handle everything
              else. Consistent work, real pay, no chasing brand deals.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="neon-btn px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-3 whitespace-nowrap w-full sm:w-auto justify-center">
                Apply to create
                <span>→</span>
              </button>
              <span className="font-mono text-xs text-neutral-500">
                2-min application. Reviewed every Friday.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-24 border border-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden grid-bg">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-900">
            <div className="p-5 sm:p-6 md:p-10">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                Paid
              </div>
              <div className="font-serif-display text-3xl sm:text-4xl md:text-6xl">Monthly</div>
              <div className="mt-1 sm:mt-2 text-neutral-400 text-xs sm:text-sm">Not when the brand feels like it.</div>
            </div>
            <div className="p-5 sm:p-6 md:p-10">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                You
              </div>
              <div className="font-serif-display text-3xl sm:text-4xl md:text-6xl">Film</div>
              <div className="mt-1 sm:mt-2 text-neutral-400 text-xs sm:text-sm">That's it. We do the rest.</div>
            </div>
            <div className="p-5 sm:p-6 md:p-10">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                Based
              </div>
              <div className="font-serif-display text-3xl sm:text-4xl md:text-6xl neon-text">Anywhere</div>
              <div className="mt-1 sm:mt-2 text-neutral-400 text-xs sm:text-sm">We work with creators globally.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-900 py-6 overflow-hidden divider-dots">
        <div className="flex marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["No editing", "No scripts", "Consistent work", "Apps that don't suck", "Global creators", "Paid per video"].map(
                (txt, j) => (
                  <div key={j} className="flex items-center px-5 sm:px-10">
                    <span className="font-serif-display text-lg sm:text-2xl italic text-neutral-500">{txt}</span>
                    <span className="accent-color neon-soft ml-5 sm:ml-10">✦</span>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
              01 / The pitch
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
              Stop chasing <em className="neon-text">one-off brand deals</em>.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              Most UGC gigs are feast or famine. A $200 payment here, a flaky brand there, endless
              DMs that go nowhere. We do it differently.
            </p>
            <p className="mt-4 md:mt-6 text-neutral-400 leading-relaxed text-sm md:text-base">
              Ongoing partnerships with real apps. Predictable work. You get paid for every video
              you film — not just the ones a brand "likes."
            </p>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-10 md:mb-20">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            02 / The deal
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-6xl leading-[1.02] max-w-4xl">
            You film. We handle <em className="neon-text">everything else</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden">
          {[
            {
              num: "I.",
              title: "You get briefed",
              body:
                "We match you to apps that fit your niche and style. No random products you'd never touch — you get paired with content you can actually film authentically.",
            },
            {
              num: "II.",
              title: "You film from your phone",
              body:
                "We send hooks and concepts. You film in your style, on your schedule. No lighting rigs, no scripts to memorize, no editing on your end. Just you, your phone, and the product.",
            },
            {
              num: "III.",
              title: "You get paid — every month",
              body:
                "Paid per video delivered, on a regular cadence. No 'brand approval' delays. No chasing invoices. Ship the videos, get paid, repeat.",
            },
          ].map((col, i) => (
            <div key={i} className="bg-[#050507] p-6 sm:p-8 md:p-10 hover-lift">
              <div className="font-serif-display text-3xl md:text-4xl italic mb-5 md:mb-8 neon-text">{col.num}</div>
              <h3 className="font-serif-display text-xl md:text-2xl mb-3 md:mb-4 leading-tight">{col.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{col.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 border-l-2 accent-border pl-4 sm:pl-6 max-w-3xl">
          <p className="font-serif-display text-xl md:text-2xl italic text-neutral-300 leading-snug">
            Our editors turn your raw footage into finished videos that post across TikTok, YouTube
            Shorts, and Reels. You don't edit. You don't distribute. You film.
          </p>
        </div>
      </section>

      {/* PAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-8 md:mb-16">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            03 / The pay
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-7xl leading-none">
            What you can <em className="neon-text">actually make</em>.
          </h2>
          <p className="mt-4 md:mt-6 text-neutral-400 text-base md:text-lg max-w-2xl">
            Pay depends on experience, niche, and volume. Here's the honest range.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              tier: "Starting",
              rate: "$15",
              vol: "10-20 videos/mo",
              monthly: "$750 – $1,500",
              desc: "New to UGC, or smaller following. Prove the craft, tier up fast.",
              highlight: false,
            },
            {
              tier: "Experienced",
              rate: "$25",
              vol: "20-40 videos/mo",
              monthly: "$1,500 – $5,000",
              desc: "Proven consistency. Strong filming. Reliable delivery.",
              highlight: true,
            },
            {
              tier: "Top-tier",
              rate: "$40+",
              vol: "40+ videos/mo",
              monthly: "$5,000 – ∞",
              desc: "High-performing creators earning renewals and performance bonuses.",
              highlight: false,
            },
          ].map((tier, i) => (
            <div
              key={i}
              className={`p-5 sm:p-8 rounded-2xl md:rounded-3xl flex flex-col ${
                tier.highlight ? "neon-border bg-neutral-900/20" : "border border-neutral-900 hover-lift"
              }`}
            >
              {tier.highlight && (
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest accent-color mb-3 sm:mb-4 neon-soft">
                  Most creators
                </div>
              )}
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-1 sm:mb-2">
                {tier.tier}
              </div>
              <div className="font-serif-display text-3xl sm:text-5xl mb-1">
                {tier.rate}
                <span className="text-neutral-500 text-base sm:text-xl">/video</span>
              </div>
              <div className="text-neutral-400 text-xs sm:text-sm mb-4 sm:mb-6">{tier.vol}</div>
              <div className="font-serif-display text-xl sm:text-2xl neon-text mb-4 sm:mb-6">~ {tier.monthly}/mo</div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-auto">{tier.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 sm:mt-10 font-mono text-xs sm:text-sm text-neutral-500 max-w-2xl">
          Paid monthly via direct deposit, PayPal, or Wise. No brand-approval gates. Ship the
          videos, get paid.
        </p>
      </section>

      {/* WHO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
              04 / Who we want
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl leading-[1.02]">
              Not polished influencers.
              <br />
              <em className="neon-text">Real creators.</em>
            </h2>
            <p className="mt-4 md:mt-6 text-neutral-400 leading-relaxed text-sm md:text-base">
              We're looking for people who make content that feels like content — not ads.
              Follower count isn't the filter. Watchability is.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="space-y-3 sm:space-y-5">
              {[
                "Comfortable on camera — selfie-style, conversational, not reading a script",
                "You post on TikTok, YouTube Shorts, or Reels — any or all",
                "Your content has a clear niche or vibe (fitness, productivity, finance, tech, lifestyle, study, wellness, etc.)",
                "Any phone that shoots 1080p — basically any phone from the last 5 years",
                "You can ship 5-10+ videos/week when you're actively on a campaign",
                "Based anywhere — we work with creators globally",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 sm:gap-5 pb-3 sm:pb-5 border-b border-neutral-900">
                  <span className="font-serif-display text-lg sm:text-xl italic shrink-0 neon-text">
                    0{i + 1}
                  </span>
                  <span className="text-neutral-300 leading-relaxed text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ROSTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-8 md:mb-16">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            05 / The roster
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-7xl leading-none">
            Creators <em className="neon-text">on the roster</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {creators.map((c, i) => (
            <div
              key={i}
              className="p-5 sm:p-7 border border-neutral-900 rounded-xl sm:rounded-2xl hover-lift bg-[#050507]"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full accent-bg flex items-center justify-center font-serif-display text-lg sm:text-xl text-neutral-950 shrink-0"
                  style={{ boxShadow: "0 0 16px rgba(var(--accent-glow), 0.5)" }}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-serif-display text-lg sm:text-xl">{c.name}</div>
                  <div className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                    {c.niche} · {c.followers}
                  </div>
                </div>
              </div>
              <p className="font-serif-display text-base sm:text-lg italic text-neutral-300 leading-snug">
                "{c.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 border-t border-neutral-900">
        <div className="mb-8 md:mb-16">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">
            06 / Before you apply
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl leading-none">
            Questions creators <em className="neon-text">ask</em>.
          </h2>
        </div>

        <div className="divide-y divide-neutral-900 border-y border-neutral-900">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full py-5 md:py-7 text-left flex items-start justify-between gap-4 sm:gap-8 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 sm:gap-6">
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-600 pt-1 sm:pt-2 shrink-0">0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif-display text-lg sm:text-2xl md:text-3xl leading-tight group-hover:accent-color transition-colors">
                      {faq.q}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openFaq === i ? "max-h-60 mt-4 md:mt-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className={`font-serif-display text-2xl sm:text-3xl accent-color transition-transform duration-300 neon-soft shrink-0 ${
                  openFaq === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32">
        <div className="border border-neutral-900 rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-20 text-center relative overflow-hidden grid-bg">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(var(--accent-glow), 0.25), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-8xl leading-[0.95]">
              Ready to <em className="neon-text">create</em>?
            </h2>
            <p className="mt-5 md:mt-8 text-neutral-400 text-base md:text-lg max-w-xl mx-auto">
              Fill out the 2-minute application. We review every Friday. If there's a fit, we'll
              reach out within a week with next steps.
            </p>
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="neon-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium flex items-center gap-3 w-full sm:w-auto justify-center">
                Start application
                <span>→</span>
              </button>
              <a
                href="#"
                className="font-mono text-xs sm:text-sm text-neutral-500 hover:text-neutral-100 transition"
              >
                Questions? DM us on [Instagram]
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
