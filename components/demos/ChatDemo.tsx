"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { RotateCcw, Send } from "lucide-react";

/**
 * Low-fidelity recreation of the "Launch Data Request" conversational flow:
 * a business user describes a vague need, the AI runs a structured interview
 * (pick-one questions), and the request lands as a precise spec with a
 * conceptual star-schema model + a created work item.
 */

type Step =
  | { kind: "ai-text"; text: string }
  | { kind: "user"; text: string }
  | {
      kind: "ai-question";
      lead: string;
      question: string;
      options: string[];
      chosen: number;
    }
  | { kind: "ai-model" }
  | { kind: "success" };

const STEPS: Step[] = [
  { kind: "ai-text", text: "Hi David, what kind of insights would you like to create?" },
  { kind: "user", text: "Sales" },
  {
    kind: "ai-question",
    lead: "To get the right insights from your sales data, I'd like to understand the scope of your analysis.",
    question: "What is the primary goal of your sales analysis?",
    options: [
      "Revenue trends and store performance",
      "Product mix and category margins",
      "Customer segmentation and retention",
      "Other",
    ],
    chosen: 0,
  },
  { kind: "user", text: "Revenue trends and store performance" },
  {
    kind: "ai-question",
    lead: "To model revenue and store performance, we'll relate each order line to the date, product, store, and customer dimensions.",
    question: "What is the grain of the analysis you need?",
    options: [
      "One row per store per day",
      "One row per product per store per day",
      "One row per order line (most granular)",
      "Other",
    ],
    chosen: 2,
  },
  { kind: "user", text: "One row per order line (most granular)" },
  { kind: "ai-model" },
  { kind: "success" },
];

// Conceptual star-schema model: fact_sales_order surrounded by dimensions.
const FACT = { id: "fact", label: "fact_sales_order", x: 200, y: 110 };
const DIMS = [
  { id: "date", label: "dim_date", x: 200, y: 26 },
  { id: "store", label: "dim_store", x: 348, y: 110 },
  { id: "product", label: "dim_product", x: 200, y: 194 },
  { id: "customer", label: "dim_customer", x: 52, y: 110 },
];

function StarModel({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 400 220" className="w-full" fill="none">
      {/* edges */}
      {DIMS.map((d, i) => (
        <motion.line
          key={d.id}
          x1={FACT.x}
          y1={FACT.y}
          x2={d.x}
          y2={d.y}
          stroke="#d1d5db"
          strokeWidth="1.5"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
        />
      ))}

      {/* dimension nodes */}
      {DIMS.map((d, i) => (
        <motion.g
          key={d.id}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }}
        >
          <circle cx={d.x} cy={d.y} r="7" fill="#10b981" />
          <text
            x={d.x}
            y={d.y + 22}
            textAnchor="middle"
            fill="#6b7280"
            fontSize="11"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {d.label}
          </text>
        </motion.g>
      ))}

      {/* fact node */}
      <motion.g
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <circle cx={FACT.x} cy={FACT.y} r="9" fill="#3b82f6" />
        <text
          x={FACT.x}
          y={FACT.y - 16}
          textAnchor="middle"
          fill="#111827"
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {FACT.label}
        </text>
      </motion.g>
    </svg>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] rounded-lg bg-brand-lighter-bg px-3 py-2 text-[0.8125rem] leading-relaxed text-brand-black">
        {children}
      </div>
    </div>
  );
}

function QuestionCard({
  step,
  active,
}: {
  step: Extract<Step, { kind: "ai-question" }>;
  active: boolean;
}) {
  return (
    <Bubble>
      <p className="mb-3">{step.lead}</p>
      <div className="rounded-md border border-brand-border bg-white p-3">
        <p className="mb-1 text-[0.8125rem] font-semibold text-brand-black">
          {step.question}
        </p>
        <p className="mb-2 text-[0.625rem] font-medium uppercase tracking-wide text-brand-light-muted">
          Pick one
        </p>
        <div className="space-y-1.5">
          {step.options.map((opt, i) => {
            const selected = active && i === step.chosen;
            return (
              <motion.div
                key={opt}
                animate={
                  selected
                    ? { borderColor: "#111827", backgroundColor: "#f9fafb" }
                    : { borderColor: "#e5e7eb", backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 rounded-md border px-2.5 py-1.5"
              >
                <span
                  className={`h-3 w-3 flex-shrink-0 rounded-full border ${
                    selected
                      ? "border-brand-black bg-brand-black"
                      : "border-brand-light-muted"
                  }`}
                />
                <span className="text-[0.75rem] text-brand-dark">{opt}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-end">
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-light-muted px-2.5 py-1 text-[0.6875rem] font-medium text-white">
            <Send className="h-2.5 w-2.5" />
            Submit answer
          </span>
        </div>
      </div>
    </Bubble>
  );
}

function ModelCard({ active }: { active: boolean }) {
  return (
    <Bubble>
      <p className="mb-3">
        Based on your input I&apos;ve constructed the following data model. You
        can edit it directly and confirm when ready.
      </p>
      <div className="space-y-3 rounded-md border border-brand-border bg-white p-3">
        <div>
          <p className="mb-1 text-[0.625rem] font-medium uppercase tracking-wide text-brand-light-muted">
            Business title
          </p>
          <div className="rounded border border-brand-border px-2 py-1 text-[0.75rem] text-brand-black">
            Sales Order Performance Analysis
          </div>
        </div>
        <div>
          <p className="mb-1 text-[0.625rem] font-medium uppercase tracking-wide text-brand-light-muted">
            Business description
          </p>
          <div className="rounded border border-brand-border px-2 py-1 text-[0.6875rem] leading-relaxed text-brand-medium">
            Links each order line to date, product, store, and customer to
            analyse revenue trends, store performance, and product mix.
          </div>
        </div>
        <div>
          <p className="mb-1 text-[0.625rem] font-medium uppercase tracking-wide text-brand-light-muted">
            Conceptual model
          </p>
          <div className="rounded border border-brand-border bg-brand-lighter-bg px-2 py-2">
            <StarModel active={active} />
            <div className="mt-1 flex items-center gap-3 px-1 text-[0.5625rem] text-brand-light-muted">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#3b82f6]" /> star schema fact
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" /> star schema dimension
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="rounded-md bg-brand-black px-3 py-1.5 text-[0.6875rem] font-medium text-white">
            Create work item
          </span>
        </div>
      </div>
    </Bubble>
  );
}

export function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [key, setKey] = useState(0);

  const runSequence = useCallback(() => {
    setVisibleCount(0);
    const timers: NodeJS.Timeout[] = [];
    let t = 600;
    STEPS.forEach((step, i) => {
      // give richer steps more time to read before the next appears
      const dwell =
        step.kind === "ai-model"
          ? 2600
          : step.kind === "ai-question"
          ? 1900
          : 1200;
      timers.push(setTimeout(() => setVisibleCount(i + 1), t));
      t += dwell;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (isInView) {
      return runSequence();
    }
  }, [isInView, key, runSequence]);

  // keep the latest message in view as the conversation grows
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount]);

  const done = visibleCount === STEPS.length;

  return (
    <div ref={ref} className="relative">
      <BrowserMockup>
        <div className="flex flex-col">
          <div className="border-b border-brand-border px-4 py-2.5">
            <span className="text-xs font-medium text-brand-muted">
              Launch Data Request
            </span>
          </div>

          <div
            ref={scrollRef}
            className="h-[420px] space-y-3 overflow-y-auto p-4"
          >
            {STEPS.slice(0, visibleCount).map((step, i) => {
              const isLast = i === visibleCount - 1;
              return (
                <motion.div
                  key={`${key}-${i}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.kind === "ai-text" && <Bubble>{step.text}</Bubble>}

                  {step.kind === "user" && (
                    <div className="flex justify-end">
                      <div className="max-w-[88%] rounded-lg bg-brand-black px-3 py-2 text-[0.8125rem] text-white">
                        {step.text}
                      </div>
                    </div>
                  )}

                  {step.kind === "ai-question" && (
                    <QuestionCard step={step} active={isLast || done} />
                  )}

                  {step.kind === "ai-model" && (
                    <ModelCard active={isLast || done} />
                  )}

                  {step.kind === "success" && (
                    <Bubble>
                      <span className="text-[0.8125rem] text-green-600">
                        &#10003; Successfully created{" "}
                        <span className="font-medium underline">
                          WS-65 — Sales Order Performance Analysis
                        </span>
                      </span>
                    </Bubble>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* input bar */}
          <div className="flex items-center gap-2 border-t border-brand-border px-3 py-2.5">
            <div className="flex-1 rounded-md border border-brand-border px-3 py-1.5 text-[0.75rem] text-brand-light-muted">
              Describe your data request...
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-black text-white">
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </BrowserMockup>

      <AnimatePresence>
        {done && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setKey((k) => k + 1)}
            className="absolute bottom-16 right-3 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[0.6875rem] text-brand-muted backdrop-blur-sm transition-colors hover:text-brand-black"
          >
            <RotateCcw className="h-3 w-3" />
            Replay
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
