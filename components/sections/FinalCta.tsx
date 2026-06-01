import { FadeUp } from "@/components/animations/FadeUp";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { FINAL_CTA, WAITLIST_COUNT } from "@/lib/constants";

export function FinalCta() {
  return (
    <SectionWrapper id="final-cta" className="py-20 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <FadeUp>
          <h2 className="mb-4 text-[1.5rem] font-semibold tracking-[-0.02em] text-brand-black md:text-[2.25rem]">
            {FINAL_CTA.headline}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mb-8 text-[1.0625rem] leading-relaxed text-brand-medium">
            {FINAL_CTA.subtext}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="mt-4 text-[0.875rem] text-brand-muted">
            Join {WAITLIST_COUNT} data leaders already on the waitlist
          </p>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
