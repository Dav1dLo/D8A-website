"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/icons/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setPastHero(y > window.innerHeight * 0.7);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.replace("#", ""))
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      const top = el.offsetTop - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (pathname?.startsWith("/alternative")) return null;

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "border-b border-brand-border bg-white/80 backdrop-blur-md"
            : "bg-white"
        )}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute left-0 top-0 h-[2px] bg-brand-black transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center"
            aria-label="D8A.pro home"
          >
            <Logo className="h-7 w-auto" />
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "text-[0.875rem] font-normal tracking-[-0.006em] transition-colors",
                  activeSection === link.href.replace("#", "")
                    ? "text-brand-black"
                    : "text-brand-medium hover:text-brand-black"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://app.d8a.pro"
              className="rounded-md border border-brand-border px-4 py-2 text-[0.875rem] font-medium text-brand-black transition-all hover:scale-[1.02] hover:bg-brand-lighter-bg"
            >
              Log in
            </a>
            <AnimatePresence>
              {pastHero && (
                <motion.button
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => scrollTo("#hero")}
                  className="rounded-md bg-brand-black px-4 py-2 text-[0.875rem] font-medium text-white transition-all hover:scale-[1.02] hover:bg-brand-dark"
                >
                  Join the Waitlist
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile login + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <a
              href="https://app.d8a.pro"
              className="rounded-md border border-brand-border px-3 py-2 text-[0.875rem] font-medium text-brand-black transition-colors hover:bg-brand-lighter-bg"
            >
              Log in
            </a>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-brand-black" />
              ) : (
                <Menu className="h-5 w-5 text-brand-black" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-brand-border px-6">
                <Logo className="h-6 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-md"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-brand-black" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="rounded-md px-4 py-3 text-left text-[0.9375rem] font-medium text-brand-medium transition-colors hover:bg-brand-lighter-bg hover:text-brand-black"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t border-brand-border pt-4">
                  <a
                    href="https://app.d8a.pro"
                    className="w-full rounded-md border border-brand-border px-4 py-3 text-center text-[0.9375rem] font-medium text-brand-black transition-colors hover:bg-brand-lighter-bg"
                  >
                    Log in
                  </a>
                  <button
                    onClick={() => scrollTo("#hero")}
                    className="w-full rounded-md bg-brand-black px-4 py-3 text-center text-[0.9375rem] font-medium text-white"
                  >
                    Join the Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
