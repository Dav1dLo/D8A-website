"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, Mail, Rocket, ChevronDown } from "lucide-react";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { HERO, WAITLIST_COUNT } from "@/lib/constants";
import { HeroVideo } from "@/components/demos/HeroVideo";

const icons = { Lock, Mail, Rocket };

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const anim = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-[88dvh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-8"
    >
      {/* Dot grid background */}
      <div className="dot-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" style={{ height: "40%" }} />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-16 lg:text-left">
          {/* Left: Content */}
          <div className="flex-1">
            {/* Eyebrow badge */}
            <motion.div {...anim(0)} className="mb-6 inline-block">
              <span className="relative inline-flex items-center rounded-full border border-brand-border bg-white/80 px-4 py-1.5 text-[0.8125rem] font-medium text-brand-medium backdrop-blur-sm">
                <span className="animate-shimmer absolute inset-0 rounded-full" />
                <span className="relative">{HERO.eyebrow}</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...anim(0.2)}
              className="mb-5 w-fit mx-auto text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-brand-black md:text-[3.5rem] lg:mx-0"
            >
              <span className="block text-justify [text-align-last:justify]">
                The Data Operation
              </span>
              <span className="block text-justify [text-align-last:justify]">
                Model Workspace.
              </span>
              <span className="block text-justify text-brand-muted text-[1.625rem] [text-align-last:justify] md:text-[2.5rem]">
                Full lifecycle. AI + Humans.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...anim(0.5)}
              className="mb-8 max-w-2xl text-[1.0625rem] leading-relaxed tracking-[-0.006em] text-brand-medium lg:max-w-xl"
            >
              {HERO.subheadline}
            </motion.p>

            {/* CTA Form */}
            <motion.div {...anim(0.6)} id="hero-form">
              <WaitlistForm />
            </motion.div>

            {/* Social proof */}
            <motion.p
              {...anim(0.7)}
              className="mt-4 text-[0.875rem] text-brand-muted"
            >
              {WAITLIST_COUNT >= 10
                ? `Join ${WAITLIST_COUNT} data leaders already on the waitlist`
                : "Be among the first data leaders to get early access"}
            </motion.p>

            {/* Trust badges */}
            <motion.div
              {...anim(0.7)}
              className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[0.75rem] text-brand-light-muted lg:justify-start"
            >
              {HERO.trustBadges.map((badge) => {
                const Icon = icons[badge.icon as keyof typeof icons];
                return (
                  <span key={badge.label} className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {badge.label}
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Product Demo */}
          <motion.div
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 0.8, ease: "easeOut" as const },
                })}
            className="mt-12 w-full max-w-xl flex-shrink-0 lg:mt-0 lg:max-w-lg xl:max-w-xl"
          >
            <HeroVideo />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...anim(1.2)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <ChevronDown className="animate-bounce-slow h-6 w-6 text-brand-light-muted" />
      </motion.div>
    </section>
  );
}
