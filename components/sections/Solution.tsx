"use client";

import dynamic from "next/dynamic";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import { SOLUTION_BLOCKS } from "@/lib/constants";

const DemoPlaceholder = () => (
  <div className="min-h-[280px] rounded-xl border border-brand-border bg-brand-lighter-bg animate-pulse" />
);

const ChatDemo = dynamic(() => import("@/components/demos/ChatDemo").then((m) => m.ChatDemo), {
  ssr: false,
  loading: DemoPlaceholder,
});
const BlueprintDemo = dynamic(() => import("@/components/demos/BlueprintDemo").then((m) => m.BlueprintDemo), {
  ssr: false,
  loading: DemoPlaceholder,
});
const KanbanDemo = dynamic(() => import("@/components/demos/KanbanDemo").then((m) => m.KanbanDemo), {
  ssr: false,
  loading: DemoPlaceholder,
});
const SplitEditorDemo = dynamic(() => import("@/components/demos/SplitEditorDemo").then((m) => m.SplitEditorDemo), {
  ssr: false,
  loading: DemoPlaceholder,
});
const DiscoverDemo = dynamic(() => import("@/components/demos/DiscoverDemo").then((m) => m.DiscoverDemo), {
  ssr: false,
  loading: DemoPlaceholder,
});
const ContextDemo = dynamic(() => import("@/components/demos/ContextDemo").then((m) => m.ContextDemo), {
  ssr: false,
  loading: DemoPlaceholder,
});

const demos: Record<string, React.ComponentType> = {
  context: ContextDemo,
  chat: ChatDemo,
  blueprint: BlueprintDemo,
  kanban: KanbanDemo,
  editor: SplitEditorDemo,
  discover: DiscoverDemo,
};

export function Solution() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="mb-16 text-center">
        <SectionEyebrow>How it works</SectionEyebrow>
        <SectionHeading>
          One operating model workspace. Full lifecycle. AI + humans.
        </SectionHeading>
      </div>

      <div className="space-y-32 lg:space-y-40">
        {SOLUTION_BLOCKS.map((block, i) => {
          const isReversed = i % 2 === 1;
          const DemoComponent = demos[block.demoType];

          return (
            <div
              key={block.step}
              className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-16 ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <FadeUp
                className="flex-1"
                delay={0.1}
              >
                <span className="mb-2 block text-[4rem] font-semibold leading-none text-brand-border">
                  {block.step}
                </span>
                <h3 className="mb-4 text-[1.5rem] font-medium tracking-[-0.015em] text-brand-black">
                  {block.heading}
                </h3>
                <p className="mb-6 text-[1.0625rem] leading-relaxed text-brand-medium">
                  {block.body}
                </p>
                <ul className="space-y-2.5">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-brand-medium"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-light-muted" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </FadeUp>

              {/* Demo */}
              <FadeUp
                className="w-full flex-1"
                delay={0.3}
              >
                {DemoComponent && <DemoComponent />}
              </FadeUp>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
