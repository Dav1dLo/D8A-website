"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AgentAvatar } from "../components/AgentAvatar";
import { AGENTS } from "../data/agents";
import { PERSONAS } from "@/lib/constants";

// Which character greets each audience.
const PERSONA_AGENTS = ["scout", "cody", "spec"];

export function AltForTeams() {
  return (
    <section id="teams" className="px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
            For your whole team
          </p>
          <h2 className="text-[2.1rem] font-extrabold sm:text-[2.9rem]">
            A teammate for{" "}
            <span className="alt-gradient-text">everyone</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PERSONAS.map((p, i) => {
            const agent =
              AGENTS.find((a) => a.id === PERSONA_AGENTS[i]) ?? AGENTS[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="alt-card flex flex-col p-7"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div
                    className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full"
                    style={{ background: agent.tint }}
                  >
                    <AgentAvatar
                      seed={agent.seed}
                      color={agent.color}
                      size={64}
                      index={i}
                    />
                  </div>
                  <div>
                    <h3 className="text-[1.2rem] font-extrabold">{p.title}</h3>
                    <p className="text-[0.85rem] text-[#8b86a0]">{p.subtitle}</p>
                  </div>
                </div>

                <p className="mb-4 text-[1rem] font-bold" style={{ color: agent.color }}>
                  {p.heading}
                </p>
                <ul className="space-y-2.5">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[0.9rem] text-[#5b5575]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color: agent.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
