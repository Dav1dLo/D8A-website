"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Infinity } from "./Infinity";
import { Waitlist } from "./Waitlist";
import { DataVisual, ExecutionVisual, IntelligenceVisual, OntologyVisual } from "./Visuals";
import {
  BLOCKS,
  FAQ,
  FINAL,
  GOVERNANCE,
  HERO,
  PLATFORMS,
  PROBLEM,
  PROMISE,
  WHY,
} from "@/lib/v2-content";

const VISUALS = [DataVisual, OntologyVisual, IntelligenceVisual, ExecutionVisual];

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function HomeV2() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 899.98px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean };

        // ── Scroll engine: Lenis drives, ScrollTrigger syncs every frame ──
        const lenis = new Lenis({
          duration: desktop ? 1.2 : 0.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          syncTouch: false,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const onAnchor = (e: MouseEvent) => {
          const a = (e.target as HTMLElement).closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
          if (!a) return;
          const hash = a.getAttribute("href")!.replace(/^\//, "");
          if (hash.length < 2 || !document.querySelector(hash)) return;
          e.preventDefault();
          lenis.scrollTo(hash, { offset: -64, duration: 1.6 });
        };
        document.addEventListener("click", onAnchor);

        // ── Beat 1 · Hero: content lifts, watermark grows (scrubbed, no pin) ──
        const heroST = { trigger: q(".hero")[0], start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".hero-content"), { yPercent: -22, opacity: 0, ease: "none", scrollTrigger: heroST });
        gsap.to(q(".hero-mark"), { scale: 1.6, opacity: 0.02, ease: "none", scrollTrigger: heroST });
        gsap.to(q(".orb-a"), { yPercent: -60, ease: "none", scrollTrigger: heroST });
        gsap.to(q(".orb-b"), { yPercent: 40, ease: "none", scrollTrigger: heroST });
        gsap.to(q(".orb-c"), { yPercent: -30, xPercent: 20, ease: "none", scrollTrigger: heroST });

        const unbind: (() => void)[] = [];

        if (desktop) {
          document.documentElement.classList.add("cine");

          // ── Beat 2 · Problem: the request loses context at every hand-off ──
          const roles = q(".role");
          const card = q(".req-card")[0];
          gsap.set(q(".seg .strike"), { scaleX: 0 });
          gsap.set(q(".seg"), { opacity: 1 });
          gsap.set(q(".problem-caption"), { opacity: 0, y: 16 });
          const hops = roles.length - 1;
          const ptl = gsap.timeline({
            scrollTrigger: {
              trigger: q(".problem")[0],
              start: "top top",
              end: "+=200%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          const track = q(".track")[0];
          const fills = q(".role-fill");
          gsap.set(fills.slice(1), { scale: 0 });
          ptl.to(card, {
            x: () => track.offsetWidth - card.offsetWidth,
            ease: "none",
            duration: hops,
          }, 0);
          for (let i = 1; i <= hops; i++) {
            ptl.to(fills[i], { scale: 1, duration: 0.2, ease: "power2.out" }, i - 0.2);
            ptl.to(q(`.seg[data-lost="${i}"] .strike`), { scaleX: 1, duration: 0.25, ease: "power2.out" }, i - 0.25);
            ptl.to(q(`.seg[data-lost="${i}"]`), { opacity: 0.32, duration: 0.25 }, i - 0.1);
          }
          ptl.to(q(".problem-caption"), { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, hops);
          ptl.to({}, { duration: 0.4 });

          // ── Beat 3 · Promise: the statement lights up word by word ──
          const words = q(".promise-word");
          gsap.set(words, { opacity: 0.16 });
          gsap.set(q(".promise-sub"), { opacity: 0, y: 16 });
          gsap.timeline({
            scrollTrigger: {
              trigger: q(".promise")[0],
              start: "top top",
              end: "+=130%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          })
            .to(words, { opacity: 1, stagger: 0.1, duration: 0.3, ease: "none" })
            .to(q(".promise-sub"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
            .to({}, { duration: 0.5 });

          // ── Beat 4 · Four blocks: pinned rail, panels hand over ──
          const panels = q(".panel");
          const items = q(".rail-item");
          const bar = q(".rail-progress-fill")[0];
          gsap.set(panels.slice(1), { opacity: 0, y: 48 });
          const setActive = (i: number) =>
            items.forEach((it, j) => it.setAttribute("aria-current", j === i ? "step" : "false"));
          setActive(0);
          const btl = gsap.timeline({
            scrollTrigger: {
              trigger: q(".blocks")[0],
              start: "top top",
              end: `+=${panels.length * 90}%`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                gsap.set(bar, { scaleY: self.progress });
                setActive(Math.min(panels.length - 1, Math.floor(self.progress * panels.length)));
              },
            },
          });
          for (let i = 1; i < panels.length; i++) {
            btl.to(panels[i - 1], { opacity: 0, y: -48, duration: 0.5, ease: "power2.in" }, i - 0.5)
              .to(panels[i], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, i - 0.15);
          }
          btl.to({}, { duration: 0.6 });

          items.forEach((it, i) => {
            const onClick = () => {
              const st = btl.scrollTrigger!;
              lenis.scrollTo(st.start + ((st.end - st.start) * (i + 0.15)) / panels.length, { duration: 1.4 });
            };
            it.addEventListener("click", onClick);
            unbind.push(() => it.removeEventListener("click", onClick));
          });
        }

        // ── Beat 5 · Why: cards settle in from staggered depths ──
        q(".why-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: desktop ? 50 + i * 50 : 32, opacity: desktop ? 1 : 0 },
            {
              y: 0,
              opacity: 1,
              ease: desktop ? "none" : "power3.out",
              scrollTrigger: desktop
                ? { trigger: q(".why")[0], start: "top bottom", end: "center center", scrub: true }
                : { trigger: card, start: "top 88%" },
            },
          );
        });

        if (!desktop) {
          q("[data-reveal]").forEach((node) =>
            gsap.from(node, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 88%" } }),
          );
        }

        // ── Beat 6 · Close: watermark settles to rest ──
        gsap.fromTo(q(".join-mark"), { scale: 0.7, rotate: -8 }, {
          scale: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: { trigger: q(".join")[0], start: "top bottom", end: "center center", scrub: true },
        });

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);

        return () => {
          document.documentElement.classList.remove("cine");
          unbind.forEach((fn) => fn());
          document.removeEventListener("click", onAnchor);
          window.removeEventListener("load", refresh);
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
      el,
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="v2">
      <div className="fx" aria-hidden="true">
        <div className="fx-grain" />
        <div className="fx-vignette" />
      </div>

      {/* Beat 1 · Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="orbs" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>
        <Infinity className="hero-mark" strokeWidth={3} />
        <div className="hero-content">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">{HERO.headline}</h1>
          <p className="hero-sub">{HERO.sub}</p>
          <Waitlist />
          <ol className="hero-blocks" aria-label="Four building blocks">
            {HERO.blocks.map((b, i) => (
              <li key={b}>
                <span className="badge">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Beat 2 · Problem */}
      <section className="beat problem" aria-labelledby="problem-title">
        <div className="wrap">
          <div className="problem-head" data-reveal>
            <p className="eyebrow">{PROBLEM.eyebrow}</p>
            <h2 id="problem-title" className="h2">{PROBLEM.headline}</h2>
            <p className="lede">{PROBLEM.body}</p>
          </div>
          <div className="track" data-reveal>
            <div className="req-card" aria-label="The request as it travels">
              <p className="req-label">Request</p>
              <p className="req-text">
                {PROBLEM.request.map((s) => (
                  <span key={s.text} className="seg" data-lost={s.lost}>
                    {s.text}
                    {s.lost > 0 && <span className="strike" aria-hidden="true" />}{" "}
                  </span>
                ))}
              </p>
            </div>
            <ol className="roles">
              {PROBLEM.roles.map((r) => (
                <li key={r} className="role">
                  <span className="role-dot" aria-hidden="true">
                    <span className="role-fill" />
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
          <p className="problem-caption">{PROBLEM.caption}</p>
        </div>
      </section>

      {/* Beat 3 · Promise */}
      <section className="beat promise" aria-labelledby="promise-title">
        <div className="wrap">
          <p className="eyebrow" data-reveal>{PROMISE.eyebrow}</p>
          <h2 id="promise-title" className="promise-statement" data-reveal>
            {PROMISE.statement.split(" ").map((w, i) => (
              <span key={i} className="promise-word">{w} </span>
            ))}
          </h2>
          <p className="promise-sub">{PROMISE.sub}</p>
        </div>
      </section>

      {/* Beat 4 · Four building blocks */}
      <section id="blocks" className="beat blocks" aria-labelledby="blocks-title">
        <div className="wrap blocks-grid">
          <div className="rail">
            <p className="eyebrow">How it works</p>
            <h2 id="blocks-title" className="h2">Four building blocks.</h2>
            <ol className="rail-list">
              {BLOCKS.map((b) => (
                <li key={b.n}>
                  <button type="button" className="rail-item">
                    <span className="badge">{b.n}</span>
                    <span>
                      <span className="rail-name">{b.name}</span>
                      <span className="rail-tag">{b.tagline}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <span className="rail-progress" aria-hidden="true">
              <span className="rail-progress-fill" />
            </span>
          </div>
          <div className="stage">
            {BLOCKS.map((b, i) => {
              const Visual = VISUALS[i];
              return (
                <article key={b.n} className="panel" data-reveal aria-labelledby={`block-${b.n}`}>
                  <div className="panel-copy">
                    <p className="panel-kicker">
                      <span className="badge">{b.n}</span> {b.name}
                    </p>
                    <h3 id={`block-${b.n}`} className="h3">{b.tagline}</h3>
                    <p className="body">{b.body}</p>
                    <p className="human">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <span><strong>Where you decide.</strong> {b.human}</span>
                    </p>
                  </div>
                  <div className="panel-visual">
                    <Visual />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="governance">
          <div className="wrap governance-inner">
            <span className="governance-label">{GOVERNANCE.label}</span>
            <strong>{GOVERNANCE.line}</strong>
            <span className="governance-detail">{GOVERNANCE.detail}</span>
          </div>
        </div>
      </section>

      {/* Beat 5 · Why D8A */}
      <section id="why" className="beat why" aria-labelledby="why-title">
        <div className="wrap">
          <p className="eyebrow" data-reveal>{WHY.eyebrow}</p>
          <h2 id="why-title" className="h2" data-reveal>{WHY.headline}</h2>
          <ul className="why-grid">
            {WHY.items.map((it, i) => (
              <li key={it.title} className="why-card card">
                <span className="badge">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h4">{it.title}</h3>
                <p className="body">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="platforms" aria-label="Works with">
        <div className="wrap platforms-inner" data-reveal>
          <p className="eyebrow">Works with</p>
          <ul>
            {PLATFORMS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="beat faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2">Questions a Head of Data asks first.</h2>
          </div>
          <div className="faq-list" data-reveal>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Beat 6 · Join */}
      <section id="join" className="beat join" aria-labelledby="join-title">
        <Infinity className="join-mark" strokeWidth={3} />
        <div className="wrap join-inner" data-reveal>
          <h2 id="join-title" className="h2">{FINAL.headline}</h2>
          <p className="lede">{FINAL.sub}</p>
          <Waitlist />
        </div>
      </section>
    </div>
  );
}
