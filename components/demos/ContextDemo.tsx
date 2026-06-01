"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { FileText, Sparkles, Check, Table2 } from "lucide-react";

type Column = { name: string; type: string; note: string };

type Spec = {
  table: string;
  source: string;
  description: string;
  columns: Column[];
};

// Each table's living specification — AI drafted from the live schema, then
// curated by the team. These fade past one another to show the breadth of
// context the platform captures across the data platform.
const SPECS: Spec[] = [
  {
    table: "staging.shopify_customers",
    source: "Shopify — e-commerce platform",
    description:
      "Master data for every shopper account: contact details, marketing consent, and lifetime order count. Foundational dimension for retention and segmentation.",
    columns: [
      { name: "id", type: "BIGINT", note: "Surrogate primary key" },
      { name: "email", type: "NVARCHAR", note: "Account email address" },
      { name: "accepts_marketing", type: "BIT", note: "Opt-in consent flag" },
      { name: "orders_count", type: "INT", note: "Lifetime orders placed" },
    ],
  },
  {
    table: "staging.shopify_orders",
    source: "Shopify — e-commerce platform",
    description:
      "One row per placed order: totals, currency, and fulfilment status. The backbone of revenue, AOV, and conversion reporting across the funnel.",
    columns: [
      { name: "id", type: "BIGINT", note: "Surrogate primary key" },
      { name: "customer_id", type: "BIGINT", note: "FK → shopify_customers.id" },
      { name: "total_price", type: "DECIMAL", note: "Order gross total" },
      { name: "financial_status", type: "NVARCHAR", note: "paid / pending / refunded" },
    ],
  },
  {
    table: "staging.stripe_charges",
    source: "Stripe — payments & billing",
    description:
      "Atomic payment events captured against orders: amount, fees, and outcome. The grain behind net revenue, settlement, and chargeback analysis.",
    columns: [
      { name: "id", type: "NVARCHAR", note: "Stripe charge identifier" },
      { name: "amount", type: "BIGINT", note: "Charged amount in cents" },
      { name: "fee", type: "BIGINT", note: "Processor fee in cents" },
      { name: "paid", type: "BIT", note: "Whether the charge succeeded" },
    ],
  },
  {
    table: "MART.dim_customer",
    source: "Mart — curated dimensional model",
    description:
      "Conformed customer dimension blending account, order history, and segment. The single trusted lens analysts use for retention and lifetime-value reporting.",
    columns: [
      { name: "customer_key", type: "BIGINT", note: "Warehouse surrogate key" },
      { name: "email", type: "NVARCHAR", note: "Cleansed contact email" },
      { name: "segment", type: "NVARCHAR", note: "New / returning / VIP" },
      { name: "lifetime_value", type: "DECIMAL", note: "Net revenue to date" },
    ],
  },
];

export function ContextDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);

  // Cycle through the table specs while in view, cross-fading one into the next.
  const runSequence = useCallback(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % SPECS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (isInView) {
      return runSequence();
    }
  }, [isInView, runSequence]);

  const spec = SPECS[active];

  return (
    <div ref={ref} className="relative">
      <BrowserMockup>
        <div className="relative overflow-hidden">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-brand-border pb-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-black">
                <FileText className="h-3 w-3 text-white" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-medium text-brand-black">Specifications</p>
                <p className="text-[0.5625rem] text-brand-light-muted">
                  Living context for every table
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="flex items-center gap-1 rounded-full border border-brand-border px-2 py-0.5 text-[0.625rem] text-brand-muted">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI generated
                </span>
                <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.625rem] font-medium text-emerald-700">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  Human curated
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-3">
              {/* Table list — highlights the spec currently in view */}
              <div className="w-[38%] flex-shrink-0 space-y-1">
                {SPECS.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.table}
                      className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors ${
                        isActive
                          ? "bg-brand-lighter-bg"
                          : "bg-transparent"
                      }`}
                    >
                      <Table2
                        className={`h-2.5 w-2.5 flex-shrink-0 ${
                          isActive ? "text-brand-black" : "text-brand-light-muted"
                        }`}
                      />
                      <span
                        className={`truncate text-[0.5625rem] ${
                          isActive
                            ? "font-medium text-brand-black"
                            : "text-brand-light-muted"
                        }`}
                      >
                        {s.table}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Spec content — cross-fades as the active table changes */}
              <div className="min-h-[176px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={spec.table}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -10 }
                    }
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <h4 className="text-[0.75rem] font-semibold text-brand-black">
                      {spec.table}
                    </h4>
                    <p className="mt-0.5 text-[0.5625rem] font-medium text-brand-muted">
                      Source: {spec.source}
                    </p>
                    <p className="mt-1.5 text-[0.5625rem] leading-snug text-brand-light-muted">
                      {spec.description}
                    </p>

                    <div className="mt-2 overflow-hidden rounded-md border border-brand-border">
                      <div className="flex bg-brand-lighter-bg px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-wide text-brand-muted">
                        <span className="w-[34%]">Column</span>
                        <span className="w-[26%]">Type</span>
                        <span className="flex-1">Notes</span>
                      </div>
                      {spec.columns.map((c, i) => (
                        <div
                          key={c.name}
                          className={`flex px-2 py-1 text-[0.5rem] ${
                            i !== spec.columns.length - 1
                              ? "border-b border-brand-border"
                              : ""
                          }`}
                        >
                          <span className="w-[34%] truncate font-medium text-brand-black">
                            {c.name}
                          </span>
                          <span className="w-[26%] truncate text-brand-muted">
                            {c.type}
                          </span>
                          <span className="flex-1 truncate text-brand-light-muted">
                            {c.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </BrowserMockup>
    </div>
  );
}
