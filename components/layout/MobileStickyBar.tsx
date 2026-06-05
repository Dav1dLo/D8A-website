"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function MobileStickyBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const heroForm = document.getElementById("hero-form");
      const midCta = document.getElementById("mid-cta");
      const finalCta = document.getElementById("final-cta");

      if (!heroForm) return;

      const heroRect = heroForm.getBoundingClientRect();
      const heroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;

      const midRect = midCta?.getBoundingClientRect();
      const midVisible = midRect
        ? midRect.bottom > 0 && midRect.top < window.innerHeight
        : false;

      const finalRect = finalCta?.getBoundingClientRect();
      const finalVisible = finalRect
        ? finalRect.bottom > 0 && finalRect.top < window.innerHeight
        : false;

      setVisible(!heroVisible && !midVisible && !finalVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    const el = document.getElementById("hero");
    if (el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (pathname?.startsWith("/alternative")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? false : { y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-0 left-0 z-40 w-full border-t border-brand-border bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg sm:hidden"
        >
          <button
            onClick={scrollToHero}
            className="w-full rounded-md bg-brand-black py-3 min-h-[44px] text-center text-[0.9375rem] font-medium text-white transition-all hover:bg-brand-dark"
          >
            Join the Waitlist &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
