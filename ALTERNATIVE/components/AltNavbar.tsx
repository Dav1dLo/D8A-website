"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Meet the agents", href: "#agents" },
  { label: "How it works", href: "#how" },
  { label: "Power-ups", href: "#powerups" },
  { label: "For teams", href: "#teams" },
  { label: "FAQ", href: "#faq" },
];

export function AltNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-[1120px] items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border border-[#efecf8] bg-white/85 shadow-[0_10px_40px_-18px_rgba(54,40,110,0.4)] backdrop-blur-md"
            : "border border-transparent bg-white/40 backdrop-blur"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-1">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#1a1530] text-sm font-black text-white">
            D8
          </span>
          <span className="text-[1.05rem] font-extrabold tracking-tight">
            D8A<span className="text-[#7c3aed]">.pro</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.9rem] font-semibold text-[#5b5575] transition-colors hover:text-[#1a1530]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#join" className="alt-btn alt-btn-primary !px-5 !py-2.5 !text-[0.9rem]">
          Hire your agents →
        </a>
      </nav>
    </motion.header>
  );
}
