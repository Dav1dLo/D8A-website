"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Lightbulb, Sparkles, Target, UserRound, Pencil, Check, RotateCcw, ArrowRight } from "lucide-react";

type Suggestion = {
  id: number;
  title: string;
  tasks: number;
  // Position on the feasibility (y) vs business impact (x) chart, 0..100.
  impact: number;
  feasibility: number;
  // Which data-strategy pillar this suggestion advances.
  strategy: string;
};

// Suggestions are deliberately scored high on both axes — they are pre-filtered
// to the active strategy + role, so only the strong, in-scope ideas surface.
const SUGGESTIONS: Suggestion[] = [
  { id: 1, title: "Resource Margin Contribution Mapping", tasks: 2, impact: 78, feasibility: 88, strategy: "Margin" },
  { id: 2, title: "Client-Level Profitability Risk", tasks: 3, impact: 90, feasibility: 76, strategy: "Margin" },
  { id: 3, title: "Active Project Budget Burn-Rate", tasks: 3, impact: 84, feasibility: 70, strategy: "Delivery" },
  { id: 4, title: "Unbilled Time Aging & Velocity", tasks: 2, impact: 72, feasibility: 82, strategy: "Cash flow" },
];

const ROLE = "Analytics Lead";

export function DiscoverDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const [scanning, setScanning] = useState(true);
  const [revealed, setRevealed] = useState(0); // how many suggestion cards are shown
  const [finished, setFinished] = useState(false);
  const [key, setKey] = useState(0);

  const runSequence = useCallback(() => {
    setScanning(true);
    setRevealed(0);
    setFinished(false);

    const timers: NodeJS.Timeout[] = [];

    // 1. Scan the data architecture, then stop scanning.
    timers.push(setTimeout(() => setScanning(false), 1300));

    // 2. Reveal suggestion cards (and their chart dots) one by one.
    const start = 1700;
    const step = 700;
    SUGGESTIONS.forEach((_, i) => {
      timers.push(setTimeout(() => setRevealed(i + 1), start + i * step));
    });

    // 3. Allow replay.
    timers.push(
      setTimeout(() => setFinished(true), start + SUGGESTIONS.length * step + 300)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (isInView) {
      return runSequence();
    }
  }, [isInView, key, runSequence]);

  // Chart geometry.
  const W = 150;
  const H = 116;
  const PAD = 14;
  const px = (impact: number) => PAD + (impact / 100) * (W - PAD * 1.5);
  const py = (feas: number) => H - PAD - (feas / 100) * (H - PAD * 1.5);

  return (
    <div ref={ref} className="relative">
      <BrowserMockup>
        <div className="relative overflow-hidden">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-brand-border pb-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-black">
                <Lightbulb className="h-3 w-3 text-white" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-medium text-brand-black">Suggested Use Cases</p>
                <p className="text-[0.5625rem] text-brand-light-muted">
                  AI-generated from your live data architecture
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1 rounded-full border border-brand-border px-2 py-0.5 text-[0.625rem] text-brand-muted">
                <AnimatePresence mode="wait">
                  {scanning ? (
                    <motion.span
                      key="scan"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                      Scanning…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="count"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      {revealed} new
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Strategy + role context — view / edit buttons */}
            <div className="mt-2.5 flex items-center gap-1.5">
              <button className="group flex items-center gap-1 rounded-md border border-brand-border bg-brand-lighter-bg px-1.5 py-1 transition-colors hover:border-brand-light-muted">
                <Target className="h-2.5 w-2.5 text-brand-muted" />
                <span className="text-[0.5625rem] font-medium text-brand-black">
                  Strategy: Margin & Utilization
                </span>
                <Pencil className="h-2 w-2 text-brand-light-muted" />
              </button>
              <button className="group flex items-center gap-1 rounded-md border border-brand-border bg-brand-lighter-bg px-1.5 py-1 transition-colors hover:border-brand-light-muted">
                <UserRound className="h-2.5 w-2.5 text-brand-muted" />
                <span className="text-[0.5625rem] font-medium text-brand-black">
                  Role: {ROLE}
                </span>
                <Pencil className="h-2 w-2 text-brand-light-muted" />
              </button>
              <span className="ml-auto flex items-center gap-0.5 text-[0.5rem] font-medium text-emerald-600">
                <Check className="h-2 w-2" strokeWidth={3} />
                Aligned
              </span>
            </div>

            {/* Body: suggestion list + feasibility/impact chart */}
            <div className="mt-3 flex gap-3">
              {/* Suggestion cards */}
              <div className="flex-1 space-y-1.5">
                {SUGGESTIONS.map((s, i) => {
                  const shown = i < revealed;
                  return (
                    <AnimatePresence key={s.id}>
                      {shown && (
                        <motion.div
                          layout
                          initial={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 8, scale: 0.97 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 320, damping: 26 }}
                          className="rounded-md border border-brand-border bg-white p-1.5 shadow-sm"
                        >
                          <div className="flex items-start gap-1">
                            <p className="flex-1 text-[0.625rem] font-medium leading-tight text-brand-black">
                              {s.title}
                            </p>
                            <span className="rounded bg-brand-black px-1 py-0.5 text-[0.4375rem] font-semibold uppercase tracking-wide text-white">
                              New
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="flex items-center gap-0.5 rounded bg-brand-light-bg px-1 py-0.5 text-[0.5rem] font-medium text-brand-muted">
                              <Target className="h-1.5 w-1.5" />
                              {s.strategy}
                            </span>
                            <span className="flex items-center gap-0.5 rounded bg-brand-light-bg px-1 py-0.5 text-[0.5rem] font-medium text-brand-muted">
                              <UserRound className="h-1.5 w-1.5" />
                              {ROLE}
                            </span>
                            <span className="ml-auto text-[0.5rem] text-brand-light-muted">
                              {s.tasks} tasks
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="flex items-center gap-0.5 rounded-full border border-brand-border px-1.5 py-0.5 text-[0.5rem] font-medium text-brand-black">
                              Implement
                              <ArrowRight className="h-1.5 w-1.5" />
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}

                {/* Scanning skeletons */}
                {scanning && (
                  <div className="space-y-1.5">
                    {[0, 1, 2].map((n) => (
                      <div
                        key={n}
                        className="h-9 animate-pulse rounded-md border border-brand-border bg-brand-lighter-bg"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Feasibility vs business impact chart */}
              <div className="w-[44%] flex-shrink-0">
                <p className="mb-1 text-[0.5rem] font-medium text-brand-muted">
                  Feasibility vs. business impact
                </p>
                <div className="rounded-md border border-brand-border bg-brand-lighter-bg p-1">
                  <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
                    {/* Axes */}
                    <line
                      x1={PAD}
                      y1={PAD / 2}
                      x2={PAD}
                      y2={H - PAD}
                      stroke="var(--border-gray)"
                      strokeWidth={1}
                    />
                    <line
                      x1={PAD}
                      y1={H - PAD}
                      x2={W - PAD / 2}
                      y2={H - PAD}
                      stroke="var(--border-gray)"
                      strokeWidth={1}
                    />
                    {/* Axis labels */}
                    <text
                      x={(W + PAD) / 2}
                      y={H - 2}
                      textAnchor="middle"
                      className="fill-brand-light-muted"
                      style={{ fontSize: 6 }}
                    >
                      Business impact →
                    </text>
                    <text
                      x={5}
                      y={(H - PAD) / 2}
                      textAnchor="middle"
                      transform={`rotate(-90 5 ${(H - PAD) / 2})`}
                      className="fill-brand-light-muted"
                      style={{ fontSize: 6 }}
                    >
                      Feasibility ↑
                    </text>
                    {/* Dots — pop in as each suggestion is revealed */}
                    {SUGGESTIONS.map((s, i) => {
                      const shown = i < revealed;
                      return (
                        <motion.circle
                          key={s.id}
                          cx={px(s.impact)}
                          cy={py(s.feasibility)}
                          r={3}
                          className="fill-brand-black"
                          initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                          animate={
                            shown
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                          }
                          transition={{ type: "spring", stiffness: 500, damping: 18 }}
                          style={{ transformOrigin: `${px(s.impact)}px ${py(s.feasibility)}px` }}
                        />
                      );
                    })}
                  </svg>
                </div>
                <p className="mt-1.5 text-[0.5rem] leading-snug text-brand-light-muted">
                  Ranked by impact &amp; feasibility, filtered to your strategy &amp; role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </BrowserMockup>

      {finished && (
        <button
          onClick={() => setKey((k) => k + 1)}
          className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[0.6875rem] text-brand-muted backdrop-blur-sm transition-colors hover:text-brand-black"
        >
          <RotateCcw className="h-3 w-3" />
          Replay
        </button>
      )}
    </div>
  );
}
