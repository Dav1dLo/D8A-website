"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/animations/FadeUp";
import { FAQ_ITEMS } from "@/lib/constants";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionHeading>Questions? Answers.</SectionHeading>
        </div>

        <div className="divide-y divide-brand-border">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={item.question} delay={i * 0.03}>
              <div>
                <button
                  id={`faq-question-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[0.9375rem] font-medium text-brand-black">
                    {item.question}
                  </span>
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
                    {openIndex === i ? (
                      <Minus className="h-4 w-4 text-brand-muted" />
                    ) : (
                      <Plus className="h-4 w-4 text-brand-muted" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={
                        shouldReduceMotion
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        shouldReduceMotion
                          ? { height: "auto", opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.2, ease: "easeOut" as const }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[0.9375rem] leading-relaxed text-brand-medium">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
