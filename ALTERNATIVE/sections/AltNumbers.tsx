"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

const COLORS = ["#7c3aed", "#ec4899", "#f59e0b"];

export function AltNumbers() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-[1000px] gap-5 md:grid-cols-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            className="alt-card p-8 text-center"
          >
            <div
              className="text-[3rem] font-black leading-none"
              style={{ color: COLORS[i % COLORS.length] }}
            >
              {s.value}
            </div>
            <div className="mt-2 text-[1rem] font-extrabold">{s.label}</div>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-[#5b5575]">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
