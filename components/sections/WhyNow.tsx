import { FadeUp } from "@/components/animations/FadeUp";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import { WHY_NOW } from "@/lib/constants";

export function WhyNow() {
  return (
    <SectionWrapper lightBg>
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <SectionEyebrow>Why now</SectionEyebrow>
          <SectionHeading>{WHY_NOW.headline}</SectionHeading>
        </FadeUp>

        <div className="mt-8 space-y-5">
          {WHY_NOW.paragraphs.map((p, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.1}>
              <p className="text-[1.125rem] leading-[1.75] text-brand-medium">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
