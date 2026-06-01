"use client";

import { RefreshCw, ClipboardList, Clock } from "lucide-react";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { PROBLEM_CARDS } from "@/lib/constants";

const icons = { RefreshCw, ClipboardList, Clock };

export function Problem() {
  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <SectionEyebrow>The problem</SectionEyebrow>
        <SectionHeading>
          Data teams are drowning, instead of shipping
        </SectionHeading>
      </div>

      <StaggerChildren
        staggerDelay={0.1}
        className="grid gap-6 md:grid-cols-3"
      >
        {PROBLEM_CARDS.map((card) => {
          const Icon = icons[card.icon as keyof typeof icons];
          return (
            <StaggerItem key={card.title}>
              <div className="group rounded-lg border border-brand-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-lighter-bg">
                  <Icon className="h-5 w-5 text-brand-muted" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[1rem] font-medium text-brand-black">
                  {card.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-brand-muted">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </SectionWrapper>
  );
}
