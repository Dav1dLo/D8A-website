"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export function FadeUp({
  children,
  delay = 0,
  duration = 0.4,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
