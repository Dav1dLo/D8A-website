"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Map,
  FileCode,
  Columns3,
  Bot,
  Store,
  GitBranch,
  Search,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  MessageSquare,
  Map,
  FileCode,
  Columns3,
  Bot,
  Store,
  GitBranch,
  Search,
  Shield,
};

const COLORS = [
  "#6366f1",
  "#0ea5e9",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#6d28d9",
];

export function AltPowerUps() {
  return (
    <section id="powerups" className="bg-[#f6f3ff] px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
            Power-ups
          </p>
          <h2 className="text-[2.1rem] font-extrabold sm:text-[2.9rem]">
            Everything your crew needs,{" "}
            <span className="alt-gradient-text">in one workspace</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Bot;
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.07, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="alt-card p-6"
              >
                <div
                  className="mb-4 grid h-12 w-12 place-items-center rounded-2xl"
                  style={{ background: `${color}1a`, color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-[1.1rem] font-extrabold">{f.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-[#5b5575]">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
