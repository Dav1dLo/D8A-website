import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

export function SectionWrapper({
  id,
  children,
  className = "",
  dark = false,
  lightBg = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  lightBg?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        dark && "bg-brand-black text-white",
        lightBg && "bg-brand-lighter-bg",
        !dark && !lightBg && "bg-white",
        className
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[0.875rem] font-medium uppercase tracking-[0.05em] text-brand-light-muted">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className={cn(
        "text-[1.5rem] font-semibold tracking-[-0.02em] md:text-[2.25rem]",
        light ? "text-white" : "text-brand-black"
      )}
    >
      {children}
    </h2>
  );
}
