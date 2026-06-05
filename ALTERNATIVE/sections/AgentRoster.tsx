"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AgentAvatar } from "../components/AgentAvatar";
import { AGENTS } from "../data/agents";

export function AgentRoster() {
  return (
    <section id="agents" className="relative px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
            Meet the crew
          </p>
          <h2 className="text-[2.1rem] font-extrabold sm:text-[2.9rem]">
            Eight little experts,
            <br />
            <span className="alt-gradient-text">one happy data team</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[1.05rem] text-[#5b5575]">
            Each agent owns one step of the data lifecycle. Hand them the boring
            parts — they love it. Stay in the loop on every one.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group alt-card flex flex-col items-center p-6 text-center"
            >
              <div
                className="mb-4 grid h-[132px] w-[132px] place-items-center rounded-full"
                style={{ background: agent.tint }}
              >
                <AgentAvatar
                  seed={agent.seed}
                  color={agent.color}
                  size={108}
                  index={i}
                />
              </div>

              <h3 className="text-[1.25rem] font-extrabold">{agent.name}</h3>
              <span
                className="mt-1.5 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-white"
                style={{ background: agent.color }}
              >
                {agent.role}
              </span>
              <p className="mt-3 text-[0.92rem] leading-snug text-[#5b5575]">
                {agent.tagline}
              </p>

              <ul className="mt-4 w-full space-y-1.5 border-t border-[#f1eef9] pt-4 text-left">
                {agent.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-2 text-[0.82rem] text-[#5b5575]"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      style={{ color: agent.color }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
