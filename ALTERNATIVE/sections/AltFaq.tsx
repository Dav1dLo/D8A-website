"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export function AltFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#f6f3ff] px-6 py-24">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
            Good to know
          </p>
          <h2 className="text-[2.1rem] font-extrabold sm:text-[2.7rem]">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className="alt-card overflow-hidden !rounded-3xl"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1.02rem] font-bold">{item.question}</span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-[#7c3aed] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 text-[0.95rem] leading-relaxed text-[#5b5575]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
