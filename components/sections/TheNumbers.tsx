"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

function parseStatValue(val: string) {
  const num = parseInt(val);
  const suffix = val.replace(String(num), "");
  return { num, suffix };
}

export function TheNumbers() {
  return (
    <section className="bg-brand-black py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 md:grid-cols-3 md:gap-0">
        {STATS.map((stat, i) => {
          const { num, suffix } = parseStatValue(stat.value);
          return (
            <div
              key={stat.label}
              className={`text-center ${
                i < STATS.length - 1
                  ? "md:border-r md:border-white/10"
                  : ""
              }`}
            >
              <div className="mb-2 text-[3rem] font-semibold leading-none text-white">
                <AnimatedCounter value={num} suffix={suffix} />
              </div>
              <p className="mb-2 text-[0.875rem] font-medium uppercase tracking-wide text-brand-light-muted">
                {stat.label}
              </p>
              <p className="mx-auto max-w-xs text-[0.875rem] font-light text-brand-muted">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
