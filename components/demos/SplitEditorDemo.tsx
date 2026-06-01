"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import {
  RotateCcw,
  FileText,
  GitBranch,
  Play,
  Check,
  Database,
  Layers,
  ChevronsRight,
} from "lucide-react";

const EMERALD = "#10b981";

/* ------------------------------------------------------------------ */
/* Mock data — a relatable dbt-style customer dimension               */
/* ------------------------------------------------------------------ */

type TreeNode = {
  label: string;
  depth: number;
  type: "db" | "layer" | "doc" | "table";
  selected?: boolean;
};

const TREE: TreeNode[] = [
  { label: "analytics", depth: 0, type: "db" },
  { label: "staging", depth: 1, type: "layer" },
  { label: "stg_customers", depth: 2, type: "table" },
  { label: "stg_orders", depth: 2, type: "table" },
  { label: "marts", depth: 1, type: "layer" },
  { label: "core", depth: 2, type: "doc" },
  { label: "dim_customers", depth: 3, type: "table", selected: true },
  { label: "fct_orders", depth: 3, type: "table" },
];

/** Frontmatter + prose for the spec pane. */
const SPEC_META = [
  ["platform", "Data Warehouse"],
  ["layer", "Marts"],
  ["pattern", "Dimension (SCD2)"],
];

/** Base columns shown in the spec table. */
const SPEC_COLUMNS = [
  ["customer_id", "bigint"],
  ["customer_name", "varchar"],
  ["email", "varchar"],
  ["signup_date", "date"],
];

/** Code lines before the inserted column. */
const CODE_HEAD: { text: string; tone: "c" | "code" }[] = [
  { text: "-- Spec: marts/core/dim_customers.md", tone: "c" },
  { text: "-- Pattern: Dimension (SCD2)", tone: "c" },
  { text: "CREATE TABLE marts.dim_customers (", tone: "code" },
  { text: "  customer_key   BIGINT IDENTITY,", tone: "code" },
  { text: "  customer_id    BIGINT NOT NULL,", tone: "code" },
  { text: "  customer_name  VARCHAR(255),", tone: "code" },
  { text: "  email          VARCHAR(320),", tone: "code" },
  { text: "  signup_date    DATE,", tone: "code" },
];

/** Code lines after the inserted column. */
const CODE_TAIL: { text: string; tone: "c" | "code" }[] = [
  { text: "  is_current     BOOLEAN DEFAULT TRUE", tone: "code" },
  { text: ");", tone: "code" },
];

/* ------------------------------------------------------------------ */
/* Tree                                                               */
/* ------------------------------------------------------------------ */

function TreeIcon({ type }: { type: TreeNode["type"] }) {
  const cls = "h-3 w-3 flex-shrink-0";
  if (type === "db") return <Database className={`${cls} text-brand-muted`} />;
  if (type === "layer") return <Layers className={`${cls} text-brand-muted`} />;
  if (type === "doc") return <FileText className={`${cls} text-brand-muted`} />;
  return <ChevronsRight className={`${cls} text-brand-light-muted`} />;
}

function Tree({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="w-[124px] flex-shrink-0 border-r border-brand-border bg-brand-lighter-bg py-2">
      {/* Branch chip, like the real picker */}
      <div className="mx-2 mb-2 flex items-center gap-1 rounded-md border border-brand-border bg-white px-1.5 py-1 text-[0.5625rem] text-brand-muted">
        <GitBranch className="h-2.5 w-2.5" />
        <span className="truncate">main</span>
      </div>

      <div className="space-y-0.5">
        {TREE.map((node, i) => (
          <motion.div
            key={node.label}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className={`flex items-center gap-1 py-0.5 pr-1 text-[0.625rem] ${
              node.selected
                ? "border-l-2 border-brand-black bg-white font-medium text-brand-black"
                : "border-l-2 border-transparent text-brand-medium"
            }`}
            style={{ paddingLeft: 6 + node.depth * 9 }}
          >
            <TreeIcon type={node.type} />
            <span className="truncate">{node.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pane headers                                                       */
/* ------------------------------------------------------------------ */

function PaneHeader({
  label,
  inSync,
  trailing,
}: {
  label: string;
  inSync?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 border-b border-brand-border pb-1.5">
      <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-brand-muted">
        {label}
      </span>
      {inSync && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-0.5 rounded-sm bg-green-100 px-1 py-0.5 text-[0.5rem] font-medium text-green-700"
        >
          <Check className="h-2 w-2" /> In sync
        </motion.span>
      )}
      <div className="ml-auto">{trailing}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main demo                                                          */
/* ------------------------------------------------------------------ */

export function SplitEditorDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const reduce = useReducedMotion();
  const [key, setKey] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  // When the inserted code line should appear (right after CODE_HEAD types in).
  const codeStart = 0.9;
  const tailStart = codeStart + CODE_HEAD.length * 0.16;

  useEffect(() => {
    if (!isInView) return;
    setShowEdit(false);
    setAnimDone(false);

    if (reduce) {
      setShowEdit(true);
      setAnimDone(true);
      return;
    }

    const t1 = setTimeout(() => setShowEdit(true), 3000);
    const t2 = setTimeout(() => setAnimDone(true), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView, key, reduce]);

  const codeLine = (
    line: { text: string; tone: "c" | "code" },
    delay: number,
    cursor = false
  ) => (
    <motion.div
      key={line.text}
      initial={reduce ? false : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay }}
      className={`flex items-center whitespace-pre ${
        line.tone === "c" ? "text-brand-light-muted" : "text-brand-dark"
      }`}
    >
      <span>{line.text}</span>
      {cursor && !reduce && (
        <motion.span
          className="ml-px inline-block h-3 w-[1.5px] bg-brand-black"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </motion.div>
  );

  return (
    <div ref={ref} className="relative">
      <BrowserMockup>
        <div key={key}>
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-brand-border px-4 py-2.5">
            <FileText className="h-3.5 w-3.5 text-brand-dark" />
            <span className="text-xs font-semibold text-brand-dark">
              Specifications
            </span>
            <span className="ml-auto rounded-md bg-brand-black px-2 py-1 text-[0.625rem] font-medium text-white">
              dim_customers.md
            </span>
          </div>

          {/* Three panes: tree · spec · code */}
          <div className="flex min-h-[300px] text-[0.625rem]">
            <Tree reduce={reduce} />

            {/* Spec pane */}
            <div className="min-w-0 flex-1 border-r border-brand-border p-3 font-mono">
              <PaneHeader label="Specification" inSync={showEdit} />

              {/* Frontmatter */}
              <div className="mb-2 space-y-0.5">
                {SPEC_META.map((row, i) => (
                  <motion.div
                    key={row[0]}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="truncate"
                  >
                    <span className="text-brand-light-muted">{row[0]}: </span>
                    <span className="text-brand-medium">{row[1]}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mb-2 font-sans text-[0.75rem] font-semibold text-brand-black"
              >
                Customer Dimension
              </motion.div>

              {/* Columns table */}
              <div className="overflow-hidden rounded-md border border-brand-border">
                <div className="flex bg-brand-lighter-bg px-2 py-1 text-[0.5625rem] font-medium text-brand-muted">
                  <span className="flex-1">column</span>
                  <span className="w-14">type</span>
                </div>
                {SPEC_COLUMNS.map((col, i) => (
                  <motion.div
                    key={col[0]}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex border-t border-brand-border px-2 py-1 text-brand-dark"
                  >
                    <span className="flex-1 truncate">{col[0]}</span>
                    <span className="w-14 text-brand-muted">{col[1]}</span>
                  </motion.div>
                ))}
                {/* The edit: a new column is added to the spec */}
                {showEdit && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex border-t border-green-200 bg-green-50 px-2 py-1"
                  >
                    <span className="flex-1 truncate font-medium text-green-700">
                      loyalty_tier
                    </span>
                    <span className="w-14 text-green-700">varchar</span>
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
                className="mt-2 truncate text-brand-light-muted"
              >
                Reads from: staging.stg_customers
              </motion.div>
            </div>

            {/* Code pane */}
            <div className="min-w-0 flex-1 overflow-hidden p-3 font-mono">
              <PaneHeader
                label="Code"
                inSync={showEdit}
                trailing={
                  <span className="flex items-center gap-0.5 rounded border border-brand-border px-1 py-0.5 text-[0.5rem] text-brand-muted">
                    <Play className="h-2 w-2" /> Run
                  </span>
                }
              />
              <div className="space-y-0.5 leading-relaxed">
                {CODE_HEAD.map((line, i) =>
                  codeLine(line, codeStart + i * 0.16)
                )}

                {/* AI propagates the spec edit into the DDL */}
                {showEdit && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-pre rounded bg-green-50 px-1 font-medium text-green-700"
                  >
                    {"  loyalty_tier   VARCHAR(50),"}
                  </motion.div>
                )}

                {CODE_TAIL.map((line, i) =>
                  codeLine(
                    line,
                    tailStart + i * 0.16,
                    i === CODE_TAIL.length - 1
                  )
                )}
              </div>
            </div>
          </div>
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
