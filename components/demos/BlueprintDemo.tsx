"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import {
  RotateCcw,
  Database,
  Layers,
  Plus,
  Save,
  ChevronRight,
} from "lucide-react";

const EMERALD = "#10b981";
const ROSE = "#f43f5e";
const TEAL = "#0d9488";

/** A small status dot used on layers and nodes. */
function Dot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 500, damping: 20 }}
    />
  );
}

/** A single technology/object node inside a layer. */
function Node({
  label,
  dot,
  selected = false,
  delay,
  reduce,
}: {
  label: string;
  dot: string;
  selected?: boolean;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="relative flex items-center gap-1.5 rounded-md border bg-white px-2 py-1.5"
      style={{
        borderColor: selected ? TEAL : "var(--border-gray)",
        boxShadow: selected ? `0 0 0 1px ${TEAL}` : "none",
      }}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <span
        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: dot }}
      />
      <span className="text-[0.6875rem] font-medium text-brand-dark whitespace-nowrap">
        {label}
      </span>
      <ChevronRight className="h-3 w-3 text-brand-light-muted" />

      {/* Selection handles (low-fi resize grips, like the real canvas) */}
      {selected &&
        !reduce &&
        [
          "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
          "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
          "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
        ].map((pos) => (
          <motion.span
            key={pos}
            className={`absolute h-1.5 w-1.5 rounded-[1px] border bg-white ${pos}`}
            style={{ borderColor: TEAL }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.25 }}
          />
        ))}
    </motion.div>
  );
}

/** Solid connector with a chevron and a packet of data flowing across it. */
function SolidFlow({ delay, reduce }: { delay: number; reduce: boolean | null }) {
  return (
    <div className="relative flex flex-1 items-center" style={{ minWidth: 28 }}>
      <motion.div
        className="h-0.5 flex-1 origin-left rounded-full"
        style={{ backgroundColor: TEAL }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: 0.4 }}
      />
      <ChevronRight
        className="-ml-1 h-3.5 w-3.5"
        style={{ color: TEAL }}
      />
      {!reduce && (
        <motion.span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: "#111827" }}
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            delay: delay + 0.4,
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 2.4,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

/** Dashed connector (marching ants) with a flowing packet — Dimension → Fact. */
function DashedFlow({ delay, reduce }: { delay: number; reduce: boolean | null }) {
  return (
    <div className="relative flex items-center" style={{ width: 28 }}>
      <motion.div
        className="h-px flex-1"
        style={{
          backgroundImage: `repeating-linear-gradient(to right, ${TEAL} 0 4px, transparent 4px 8px)`,
          backgroundSize: "8px 100%",
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, backgroundPositionX: ["0px", "8px"] }
        }
        transition={{
          opacity: { delay, duration: 0.3 },
          backgroundPositionX: {
            delay,
            duration: 0.5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
      {!reduce && (
        <motion.span
          className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: TEAL }}
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            delay: delay + 0.3,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2.6,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

/** A layer container (Staging / Mart) with an optional pink accent rail. */
function Layer({
  title,
  accent = false,
  children,
  delay,
  reduce,
}: {
  title: string;
  accent?: boolean;
  children: React.ReactNode;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-lighter-bg p-2"
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {accent && (
        <span
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{ backgroundColor: ROSE }}
        />
      )}
      <div className="mb-2 flex items-center gap-1.5 pl-1">
        <Layers className="h-3 w-3 text-brand-muted" />
        <Dot color={EMERALD} delay={delay + 0.1} />
        <span className="text-[0.6875rem] font-semibold text-brand-dark">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-1.5">{children}</div>
    </motion.div>
  );
}

/** Lines of the generated code template, revealed one by one. */
const CODE_LINES: { text: string; tone: "h" | "key" | "val" | "code" }[] = [
  { text: "Code Generation Template — Mart Fact Merge", tone: "h" },
  { text: "Technology: azuresql · Layer: Mart", tone: "key" },
  { text: "Incremental UPDATE-then-INSERT upsert for idempotency", tone: "val" },
  { text: "MERGE INTO mart.fact_sales AS tgt", tone: "code" },
  { text: "USING staging.sales AS src ON tgt.id = src.id", tone: "code" },
];

function CodePanel({
  start,
  reduce,
}: {
  start: number;
  reduce: boolean | null;
}) {
  return (
    <div className="border-t border-brand-border bg-white px-4 py-3">
      {/* Tab row */}
      <div className="mb-2 flex items-center gap-3 text-[0.625rem]">
        <span className="font-semibold text-brand-dark">Fact</span>
        <span className="text-brand-light-muted">·</span>
        <span className="text-brand-muted">Properties</span>
        <span className="text-brand-muted">Agentic Spec</span>
        <motion.span
          className="rounded border px-1.5 py-0.5 font-medium"
          style={{ borderColor: TEAL, color: TEAL }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: start - 0.1 }}
        >
          Agentic Coding Instructions
        </motion.span>
      </div>

      {/* Code lines */}
      <div className="space-y-1 font-mono">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={line.text}
            className="flex items-center gap-1"
            initial={reduce ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: start + i * 0.22, duration: 0.3 }}
          >
            <span
              className={
                line.tone === "h"
                  ? "text-[0.6875rem] font-semibold text-brand-black"
                  : line.tone === "key"
                  ? "text-[0.625rem] text-brand-muted"
                  : line.tone === "code"
                  ? "text-[0.625rem]"
                  : "text-[0.625rem] text-brand-medium"
              }
              style={line.tone === "code" ? { color: TEAL } : undefined}
            >
              {line.text}
            </span>
            {i === CODE_LINES.length - 1 && !reduce && (
              <motion.span
                className="inline-block h-3 w-[1.5px] bg-brand-black"
                animate={{ opacity: [1, 0] }}
                transition={{
                  delay: start + i * 0.22,
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BlueprintDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const reduce = useReducedMotion();
  const [key, setKey] = useState(0);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimDone(false);
      const timer = setTimeout(() => setAnimDone(true), 3400);
      return () => clearTimeout(timer);
    }
  }, [isInView, key]);

  return (
    <div ref={ref} className="relative">
      <BrowserMockup>
        {/* Re-mount on replay so the whole timeline restarts */}
        <div key={key}>
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-brand-border px-4 py-2.5">
            <Database className="h-3.5 w-3.5 text-brand-dark" />
            <span className="text-xs font-semibold text-brand-dark">
              Architecture Blueprint
            </span>
            <span className="ml-auto flex items-center gap-1 rounded-md bg-brand-black px-2 py-1 text-[0.625rem] font-medium text-white">
              <Plus className="h-2.5 w-2.5" />
              Add technology
            </span>
            <span className="flex items-center gap-1 rounded-md border border-brand-border px-2 py-1 text-[0.625rem] text-brand-light-muted">
              <Save className="h-2.5 w-2.5" />
              Save
            </span>
          </div>

          {/* Canvas */}
          {isInView && (
            <div className="bg-brand-lighter-bg px-4 py-6">
              <motion.div
                className="inline-block rounded-xl border border-brand-border bg-white p-3"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <Database className="h-3 w-3 text-brand-muted" />
                  <Dot color={EMERALD} delay={0.15} />
                  <span className="text-[0.6875rem] font-semibold text-brand-dark">
                    Data Platform
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Layer title="Staging" accent delay={0.2} reduce={reduce}>
                    <Node
                      label="Staging"
                      dot={ROSE}
                      delay={0.45}
                      reduce={reduce}
                    />
                  </Layer>

                  <SolidFlow delay={0.6} reduce={reduce} />

                  <Layer title="Mart" delay={0.75} reduce={reduce}>
                    <Node
                      label="Dimension"
                      dot="#94a3b8"
                      delay={0.95}
                      reduce={reduce}
                    />
                    <DashedFlow delay={1.15} reduce={reduce} />
                    <Node
                      label="Fact"
                      dot="#94a3b8"
                      selected
                      delay={1.25}
                      reduce={reduce}
                    />
                  </Layer>

                  <ChevronRight
                    className="h-3.5 w-3.5"
                    style={{ color: TEAL }}
                  />
                </div>
              </motion.div>
            </div>
          )}

          {/* Generated-code panel — the payoff: architecture drives the code */}
          {isInView && <CodePanel start={1.9} reduce={reduce} />}
        </div>
      </BrowserMockup>

      {animDone && (
        <button
          onClick={() => setKey((k) => k + 1)}
          className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[0.6875rem] text-brand-muted backdrop-blur-sm transition-colors hover:text-brand-black"
        >
          <RotateCcw className="h-3 w-3" />
          Replay
        </button>
      )}
    </div>
  );
}
