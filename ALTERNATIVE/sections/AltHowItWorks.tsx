"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AgentAvatar } from "../components/AgentAvatar";
import { AGENTS } from "../data/agents";
import { SOLUTION_BLOCKS } from "@/lib/constants";

// Which character hosts each lifecycle step (order matches SOLUTION_BLOCKS).
const STEP_AGENTS = ["quill", "archie", "spec", "ravi", "cody", "scout"];

export function AltHowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden px-6 py-24">
      <div className="alt-blob right-0 top-1/4 h-80 w-80" style={{ background: "#ddd6fe" }} />

      <div className="mx-auto max-w-[1000px]">
        <div className="mx-auto mb-16 max-w-[640px] text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
            The full lifecycle
          </p>
          <h2 className="text-[2.1rem] font-extrabold sm:text-[2.9rem]">
            From a vague ask to
            shipped data —{" "}
            <span className="alt-gradient-text">handled</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {SOLUTION_BLOCKS.map((block, i) => {
            const agent =
              AGENTS.find((a) => a.id === STEP_AGENTS[i]) ?? AGENTS[i % AGENTS.length];
            const flip = i % 2 === 1;
            return (
              <motion.div
                key={block.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`flex flex-col items-center gap-8 md:gap-14 ${
                  flip ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* character bubble */}
                <div className="relative flex-shrink-0">
                  <div
                    className="grid h-[190px] w-[190px] place-items-center rounded-[40px]"
                    style={{ background: agent.tint }}
                  >
                    <AgentAvatar
                      seed={agent.seed}
                      color={agent.color}
                      size={150}
                      index={i}
                    />
                  </div>
                  <span
                    className="absolute -right-2 -top-2 grid h-12 w-12 place-items-center rounded-full text-[1rem] font-black text-white shadow-lg"
                    style={{ background: agent.color }}
                  >
                    {block.step}
                  </span>
                </div>

                {/* copy */}
                <div className="flex-1 text-center md:text-left">
                  <span
                    className="text-[0.8rem] font-bold uppercase tracking-wide"
                    style={{ color: agent.color }}
                  >
                    {agent.name} · {agent.role}
                  </span>
                  <h3 className="mt-1 text-[1.5rem] font-extrabold sm:text-[1.85rem]">
                    {block.heading}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-[#5b5575]">
                    {block.body}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {block.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-left text-[0.88rem] text-[#5b5575]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 flex-shrink-0"
                          style={{ color: agent.color }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
