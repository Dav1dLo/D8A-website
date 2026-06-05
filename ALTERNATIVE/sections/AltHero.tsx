"use client";

import { motion } from "framer-motion";
import { AgentAvatar } from "../components/AgentAvatar";
import { AGENTS } from "../data/agents";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

// Pick a handful of characters to scatter around the hero headline.
const FLOATERS = [
  { agent: AGENTS[2], pos: "left-[2%] top-[18%]", size: 96 }, // Cody
  { agent: AGENTS[3], pos: "right-[3%] top-[12%]", size: 104 }, // Ravi
  { agent: AGENTS[0], pos: "left-[8%] bottom-[10%]", size: 86 }, // Speca
  { agent: AGENTS[5], pos: "right-[6%] bottom-[8%]", size: 92 }, // Scout
  { agent: AGENTS[4], pos: "right-[16%] top-[42%]", size: 70 }, // Margo
  { agent: AGENTS[6], pos: "left-[15%] top-[46%]", size: 68 }, // Quill
];

export function AltHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-36 pb-24 text-center md:pt-44"
    >
      {/* gradient blobs */}
      <div className="alt-blob -left-32 top-10 h-96 w-96" style={{ background: "#c4b5fd" }} />
      <div className="alt-blob right-0 top-40 h-80 w-80" style={{ background: "#fbcfe8" }} />
      <div className="alt-blob left-1/3 bottom-0 h-72 w-72" style={{ background: "#fde68a" }} />

      {/* floating characters (hidden on small screens to keep it readable) */}
      {FLOATERS.map(({ agent, pos, size }, i) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: "easeOut" }}
          className={`pointer-events-none absolute z-10 hidden lg:block ${pos}`}
        >
          <AgentAvatar seed={agent.seed} color={agent.color} size={size} index={i} />
        </motion.div>
      ))}

      <div className="relative z-20 mx-auto max-w-[860px]">
        <motion.a
          {...fade(0)}
          href="#agents"
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e7e3f3] bg-white/80 px-4 py-1.5 text-[0.85rem] font-semibold text-[#5b5575] backdrop-blur"
        >
          <span className="flex -space-x-2">
            {AGENTS.slice(0, 4).map((a) => (
              <span
                key={a.id}
                className="h-4 w-4 rounded-full border-2 border-white"
                style={{ background: a.color }}
              />
            ))}
          </span>
          Meet your 8 AI data teammates →
        </motion.a>

        <motion.h1
          {...fade(0.1)}
          className="text-[2.6rem] font-extrabold leading-[1.04] sm:text-[3.4rem] md:text-[4.2rem]"
        >
          Hire AI agents to
          <br />
          run your <span className="alt-gradient-text">data team</span>
        </motion.h1>

        <motion.p
          {...fade(0.25)}
          className="mx-auto mt-6 max-w-[600px] text-[1.1rem] leading-relaxed text-[#5b5575]"
        >
          A little crew of happy data experts that spec, build, review and ship —
          following <em>your</em> architecture and patterns. AI generated, human
          curated, working the full lifecycle 24/7.
        </motion.p>

        <motion.div
          {...fade(0.4)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#join" className="alt-btn alt-btn-primary">
            Join the waitlist →
          </a>
          <a href="#how" className="alt-btn alt-btn-ghost">
            See how it works
          </a>
        </motion.div>

        <motion.p {...fade(0.55)} className="mt-5 text-[0.85rem] text-[#8b86a0]">
          No credit card · Work email only · First access at launch
        </motion.p>
      </div>
    </section>
  );
}
