"use client";

import {
  MessageSquare,
  Map,
  FileCode,
  Columns3,
  Bot,
  Store,
  GitBranch,
  Search,
  Shield,
} from "lucide-react";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { FEATURES } from "@/lib/constants";

const icons = {
  MessageSquare,
  Map,
  FileCode,
  Columns3,
  Bot,
  Store,
  GitBranch,
  Search,
  Shield,
};

export function FeatureGrid() {
  return (
    <SectionWrapper id="features" lightBg>
      <div className="mb-12 text-center">
        <SectionEyebrow>Features</SectionEyebrow>
        <SectionHeading>
          Everything your data team needs in one workspace
        </SectionHeading>
      </div>

      <StaggerChildren
        staggerDelay={0.05}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => {
          const Icon = icons[feature.icon as keyof typeof icons];
          return (
            <StaggerItem key={feature.title}>
              <div className="group rounded-lg border border-brand-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-muted hover:shadow-md">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-md bg-brand-black">
                  <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1.5 text-[0.9375rem] font-medium text-brand-black">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-muted">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </SectionWrapper>
  );
}
