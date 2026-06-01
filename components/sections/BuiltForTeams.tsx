"use client";

import { Crown, Code, Users } from "lucide-react";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { PERSONAS } from "@/lib/constants";

const icons = { Crown, Code, Users };
const borderAccents = [
  "border-t-brand-light-muted",
  "border-t-brand-muted",
  "border-t-brand-black",
];

export function BuiltForTeams() {
  return (
    <SectionWrapper id="for-teams" lightBg>
      <div className="mb-12 text-center">
        <SectionEyebrow>For your whole team</SectionEyebrow>
        <SectionHeading>Everyone has a seat at the table</SectionHeading>
      </div>

      <StaggerChildren
        staggerDelay={0.1}
        className="grid gap-6 md:grid-cols-3"
      >
        {PERSONAS.map((persona, i) => {
          const Icon = icons[persona.icon as keyof typeof icons];
          return (
            <StaggerItem key={persona.title}>
              <div
                className={`rounded-lg border border-brand-border border-t-2 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md ${borderAccents[i]}`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-lighter-bg">
                  <Icon
                    className="h-5 w-5 text-brand-muted"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-light-muted">
                  {persona.subtitle}
                </p>
                <h3 className="mb-4 text-[1.125rem] font-medium text-brand-black">
                  {persona.heading}
                </h3>
                <ul className="space-y-2.5">
                  {persona.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-brand-medium"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-light-muted" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </SectionWrapper>
  );
}
