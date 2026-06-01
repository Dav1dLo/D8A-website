"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import {
  Bot,
  User,
  CheckCircle,
  GitMerge,
} from "lucide-react";

const FRAME_DURATION = 3000;
const FRAMES = [
  { id: "chat", label: "Data Request" },
  { id: "kanban", label: "Kanban Board" },
  { id: "code", label: "Code Generation" },
  { id: "review", label: "AI Review" },
  { id: "merge", label: "Merged" },
] as const;

function ChatFrame() {
  return (
    <div className="space-y-2 p-4">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg bg-brand-black px-3 py-2 text-[0.6875rem] text-white">
          I need customer order data refreshed daily...
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-lg bg-brand-lighter-bg px-3 py-2 text-[0.6875rem] text-brand-black">
          <div className="flex items-center gap-1 mb-1">
            <Bot className="h-3 w-3 text-brand-muted" />
            <span className="text-[0.5625rem] text-brand-muted">AI Assistant</span>
          </div>
          Which tables? Expected volume? Full or incremental load?
        </div>
      </div>
    </div>
  );
}

function KanbanFrame() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-1.5">
        {["New", "Coding", "Reviewing", "Closed"].map((col, i) => (
          <div key={col}>
            <p className="mb-1.5 text-[0.5rem] font-medium uppercase tracking-wide text-brand-light-muted">
              {col}
            </p>
            {i === 1 && (
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="rounded border border-brand-border bg-white p-1.5 shadow-sm"
              >
                <p className="text-[0.5625rem] font-medium text-brand-black">
                  Customer Orders
                </p>
                <div className="mt-1 flex items-center gap-0.5">
                  <Bot className="h-2 w-2 text-brand-light-muted" />
                  <span className="text-[0.5rem] text-brand-light-muted">Agent</span>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeFrame() {
  const lines = [
    "MERGE INTO silver.dim_customer_orders",
    "USING (SELECT * FROM bronze.raw_orders",
    "  WHERE ModifiedDate > '{{watermark}}'",
    ") AS source",
    "ON target.order_id = source.order_id",
  ];

  return (
    <div className="p-4">
      <div className="rounded-md bg-brand-black p-3 font-mono text-[0.625rem] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="text-green-300"
          >
            {line}
          </motion.div>
        ))}
        <span className="animate-blink inline-block h-3 w-1 bg-green-300" />
      </div>
    </div>
  );
}

function ReviewFrame() {
  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-brand-muted" />
          <span className="text-[0.6875rem] font-medium text-brand-black">AI Review</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="rounded-full bg-green-100 px-2 py-0.5 text-[0.5625rem] font-medium text-green-700"
          >
            <CheckCircle className="mr-0.5 inline h-2.5 w-2.5" />
            Approved
          </motion.span>
        </div>
        <div className="rounded-md border border-brand-border p-2 text-[0.625rem] text-brand-medium">
          <p>&#10003; Watermark pattern correctly implemented</p>
          <p>&#10003; SCD Type 2 merge logic validated</p>
          <p>&#10003; Matches Blueprint specifications</p>
        </div>
      </div>
    </div>
  );
}

function MergeFrame() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <GitMerge className="h-8 w-8 text-green-500" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-[0.75rem] font-medium text-brand-black"
      >
        Branch merged to main
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[0.625rem] text-brand-muted"
      >
        Customer Orders Incremental Load is live
      </motion.p>
    </div>
  );
}

const FRAME_COMPONENTS = [ChatFrame, KanbanFrame, CodeFrame, ReviewFrame, MergeFrame];

export function HeroDemo() {
  const [activeFrame, setActiveFrame] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const nextFrame = useCallback(() => {
    setActiveFrame((f) => (f + 1) % FRAMES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextFrame, FRAME_DURATION);
    return () => clearInterval(interval);
  }, [nextFrame]);

  const FrameComponent = FRAME_COMPONENTS[activeFrame];

  return (
    <BrowserMockup tilt>
      <div className="min-h-[240px] relative">
        {/* Frame indicator */}
        <div className="flex items-center gap-1 border-b border-brand-border px-4 py-2">
          {FRAMES.map((frame, i) => (
            <button
              key={frame.id}
              onClick={() => setActiveFrame(i)}
              className={`rounded-full px-2 py-0.5 text-[0.5625rem] transition-colors ${
                i === activeFrame
                  ? "bg-brand-black text-white"
                  : "text-brand-light-muted hover:text-brand-muted"
              }`}
            >
              {frame.label}
            </button>
          ))}
        </div>

        {/* Frame content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFrame}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FrameComponent />
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-border">
          <motion.div
            className="h-full bg-brand-black"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: FRAME_DURATION / 1000, ease: "linear" }}
            key={activeFrame}
          />
        </div>
      </div>
    </BrowserMockup>
  );
}
