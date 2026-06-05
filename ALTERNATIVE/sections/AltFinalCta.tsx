"use client";

import { motion } from "framer-motion";
import { AgentAvatar } from "../components/AgentAvatar";
import { AGENTS } from "../data/agents";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { FINAL_CTA, WAITLIST_COUNT } from "@/lib/constants";

export function AltFinalCta() {
  return (
    <section id="join" className="px-4 py-20">
      <div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[40px] bg-[#1a1530] px-6 py-16 text-center text-white sm:px-12">
        {/* glow */}
        <div
          className="alt-blob left-1/4 top-0 h-72 w-72"
          style={{ background: "#7c3aed", opacity: 0.55 }}
        />
        <div
          className="alt-blob right-1/4 bottom-0 h-72 w-72"
          style={{ background: "#ec4899", opacity: 0.45 }}
        />

        {/* the whole crew lined up, waving */}
        <div className="relative z-10 mb-8 flex flex-wrap items-end justify-center gap-1 sm:gap-2">
          {AGENTS.map((a, i) => (
            <AgentAvatar
              key={a.id}
              seed={a.seed}
              color={a.color}
              size={56}
              index={i}
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-[2rem] font-extrabold sm:text-[2.8rem]"
        >
          {FINAL_CTA.headline}
        </motion.h2>
        <p className="relative z-10 mx-auto mt-4 max-w-[560px] text-[1.05rem] text-white/70">
          {FINAL_CTA.subtext}
        </p>

        <div className="relative z-10 mt-8 flex justify-center">
          <WaitlistForm variant="dark" />
        </div>

        <p className="relative z-10 mt-4 text-[0.85rem] text-white/50">
          Join {WAITLIST_COUNT} data leaders already on the waitlist · Free · No
          credit card
        </p>
      </div>
    </section>
  );
}
