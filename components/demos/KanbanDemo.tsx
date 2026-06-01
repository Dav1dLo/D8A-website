"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Bot, User, RotateCcw, Check, Loader2, X, GitBranch, FileText } from "lucide-react";

const COLUMNS = ["New", "Coding", "Reviewing", "Merging", "Closed"];

// The work item that animates from New -> Coding and gets opened.
const HERO_ID = 65;

type Card = {
  id: number;
  ref: string;
  title: string;
  tasks: number;
  // For static cards: fixed column. The hero card uses `cardCol` state instead.
  col?: number;
  hero?: boolean;
};

const CARDS: Card[] = [
  { id: 12, ref: "WS-71", title: "Clickstream Event Ingestion", tasks: 2, col: 0 },
  { id: 65, ref: "WS-65", title: "Resource Utilization & Capacity Planning", tasks: 4, hero: true },
  { id: 64, ref: "WS-64", title: "Resource Utilization & Capacity Planning", tasks: 3, col: 1 },
  { id: 7, ref: "WS-58", title: "Product Dimension SCD Type 2", tasks: 5, col: 2 },
  { id: 4, ref: "WS-40", title: "Sales Fact Table — Daily Refresh", tasks: 6, col: 4 },
];

const TASKS = [
  "Build dim_user",
  "Build dim_project",
  "Build dim_task",
  "Build fact_time_entry",
];

type TaskState = "queued" | "coding" | "done";

export function KanbanDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const [cardCol, setCardCol] = useState(0); // hero card column
  const [panelOpen, setPanelOpen] = useState(false);
  const [taskStates, setTaskStates] = useState<TaskState[]>(["queued", "queued", "queued", "queued"]);
  const [finished, setFinished] = useState(false);
  const [key, setKey] = useState(0);

  const setTask = useCallback((i: number, s: TaskState) => {
    setTaskStates((prev) => {
      const next = [...prev];
      next[i] = s;
      return next;
    });
  }, []);

  const runSequence = useCallback(() => {
    setCardCol(0);
    setPanelOpen(false);
    setTaskStates(["queued", "queued", "queued", "queued"]);
    setFinished(false);

    const timers: NodeJS.Timeout[] = [];

    // 1. Move the work item from New -> Coding
    timers.push(setTimeout(() => setCardCol(1), 900));
    // 2. Open the work-item detail drawer
    timers.push(setTimeout(() => setPanelOpen(true), 1900));

    // 3. Agent works tasks one by one, top -> bottom
    const start = 2700;
    const step = 850;
    TASKS.forEach((_, i) => {
      timers.push(setTimeout(() => setTask(i, "coding"), start + i * step));
      timers.push(setTimeout(() => setTask(i, "done"), start + i * step + step - 150));
    });

    // 4. Close the drawer, advance the card to Reviewing, allow replay
    const done = start + TASKS.length * step + 400;
    timers.push(setTimeout(() => setPanelOpen(false), done));
    timers.push(setTimeout(() => setCardCol(2), done + 500));
    timers.push(setTimeout(() => setFinished(true), done + 700));

    return () => timers.forEach(clearTimeout);
  }, [setTask]);

  useEffect(() => {
    if (isInView) {
      return runSequence();
    }
  }, [isInView, key, runSequence]);

  const doneCount = taskStates.filter((s) => s === "done").length;
  const heroColumn = cardCol;

  return (
    <div ref={ref} className="relative">
      <BrowserMockup>
        <div className="relative overflow-hidden">
          <div className="p-4">
            {/* Toolbar */}
            <div className="mb-3 flex items-center justify-between border-b border-brand-border pb-2">
              <span className="text-xs font-medium text-brand-muted">Kanban Board</span>
              <div className="flex items-center gap-1 rounded-full border border-brand-border px-2 py-0.5 text-[0.625rem] text-brand-muted">
                <Bot className="h-2.5 w-2.5" />
                <span>Agent</span>
              </div>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-5 gap-1.5">
              {COLUMNS.map((col, ci) => {
                const cards = CARDS.filter((c) =>
                  c.hero ? heroColumn === ci : c.col === ci
                );
                return (
                  <div key={col} className="min-h-[200px]">
                    <div className="mb-2 flex items-center gap-1">
                      <p className="text-[0.5625rem] font-medium uppercase tracking-wide text-brand-light-muted">
                        {col}
                      </p>
                      <span className="rounded bg-brand-light-bg px-1 text-[0.5rem] font-medium text-brand-muted">
                        {cards.length}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {cards.map((card) => {
                        const tasksDone = card.hero ? doneCount : 0;
                        const inCoding = card.hero && heroColumn === 1;
                        return (
                          <AnimatePresence key={card.id} mode="wait">
                            <motion.div
                              layout
                              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              className="rounded-md border border-brand-border bg-white p-1.5 shadow-sm"
                            >
                              <p className="text-[0.625rem] font-medium leading-tight text-brand-black">
                                {card.title}
                              </p>
                              <div className="mt-1 flex items-center gap-1">
                                <span className="text-[0.5rem] text-brand-light-muted">
                                  {card.ref}
                                </span>
                                <span className="text-[0.5rem] text-brand-light-muted">·</span>
                                <span className="text-[0.5rem] text-brand-light-muted">
                                  {tasksDone}/{card.tasks} tasks
                                </span>
                                {inCoding && (
                                  <Loader2 className="ml-auto h-2 w-2 animate-spin text-brand-muted" />
                                )}
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work-item detail drawer */}
          <AnimatePresence>
            {panelOpen && (
              <>
                <motion.div
                  className="absolute inset-0 z-10 bg-brand-black/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="absolute inset-y-0 right-0 z-20 flex w-[78%] flex-col bg-white shadow-2xl"
                  initial={shouldReduceMotion ? { x: 0 } : { x: "100%" }}
                  animate={{ x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                  <div className="flex-1 overflow-hidden p-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <p className="pr-2 text-[0.8125rem] font-semibold leading-tight text-brand-black">
                        Resource Utilization &amp; Capacity Planning
                      </p>
                      <X className="h-3.5 w-3.5 flex-shrink-0 text-brand-light-muted" />
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[0.5625rem] font-medium text-brand-muted">WS-65</span>
                      <span className="rounded bg-brand-light-bg px-1 py-0.5 text-[0.5rem] font-medium text-brand-muted">
                        coding
                      </span>
                      <span className="flex items-center gap-0.5 text-[0.5rem] text-brand-light-muted">
                        <GitBranch className="h-2 w-2" />
                        65-resource-utilization
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-2.5 text-[0.5625rem] font-semibold uppercase tracking-wide text-brand-light-muted">
                      Description
                    </p>
                    <p className="mt-1 text-[0.625rem] leading-snug text-brand-medium">
                      Create Mart tables for resource utilization and capacity planning, sourcing
                      from existing Harvest staging objects.
                    </p>

                    {/* Tasks */}
                    <p className="mt-3 text-[0.5625rem] font-semibold uppercase tracking-wide text-brand-light-muted">
                      Tasks ({TASKS.length})
                    </p>
                    <div className="mt-1.5 space-y-1.5">
                      {TASKS.map((task, i) => {
                        const state = taskStates[i];
                        return (
                          <div
                            key={task}
                            className="flex items-center gap-1.5 rounded-md border border-brand-border bg-white px-1.5 py-1"
                          >
                            {/* Status icon */}
                            {state === "done" ? (
                              <motion.span
                                initial={shouldReduceMotion ? false : { scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500"
                              >
                                <Check className="h-2 w-2 text-white" strokeWidth={3} />
                              </motion.span>
                            ) : state === "coding" ? (
                              <Loader2 className="h-3 w-3 animate-spin text-brand-muted" />
                            ) : (
                              <span className="h-3 w-3 rounded-full border border-brand-border" />
                            )}

                            <span
                              className={`flex-1 text-[0.625rem] font-medium ${
                                state === "queued" ? "text-brand-light-muted" : "text-brand-black"
                              }`}
                            >
                              {task}
                            </span>

                            {/* State badge */}
                            {state === "done" && (
                              <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1 py-0.5 text-[0.5rem] font-medium text-emerald-600">
                                <Check className="h-1.5 w-1.5" strokeWidth={3} />
                                Done
                              </span>
                            )}
                            {state === "coding" && (
                              <span className="rounded-full bg-brand-light-bg px-1 py-0.5 text-[0.5rem] font-medium text-brand-muted">
                                Coding…
                              </span>
                            )}
                            <span className="flex items-center gap-0.5 text-[0.5rem] text-brand-light-muted">
                              <FileText className="h-2 w-2" />
                              spec
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Activity */}
                    <p className="mt-3 text-[0.5625rem] font-semibold uppercase tracking-wide text-brand-light-muted">
                      Activity
                    </p>
                    <div className="mt-1.5 flex items-start gap-1.5">
                      <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-brand-light-bg">
                        <Bot className="h-2 w-2 text-brand-muted" />
                      </span>
                      <p className="text-[0.5625rem] leading-snug text-brand-medium">
                        <span className="font-medium text-brand-black">Agent</span>{" "}
                        {doneCount < TASKS.length ? (
                          <>
                            AI code generation run (<span className="font-mono">auto</span>):{" "}
                            {doneCount} of {TASKS.length} tasks generated…
                          </>
                        ) : (
                          <>
                            AI code generation run (<span className="font-mono">auto</span>):{" "}
                            {TASKS.length} generated, 0 failed, 0 blocked, 0 skipped.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
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
