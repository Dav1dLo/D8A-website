import { FadeUp } from "@/components/animations/FadeUp";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { MID_CTA } from "@/lib/constants";

export function MidPageCta() {
  return (
    <section id="mid-cta" className="bg-brand-black py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeUp>
          <h2 className="mb-4 text-[1.5rem] font-semibold tracking-[-0.02em] text-white md:text-[2.25rem]">
            {MID_CTA.headline}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mb-8 text-[1.0625rem] leading-relaxed text-brand-muted">
            {MID_CTA.subtext}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex justify-center">
            <WaitlistForm variant="dark" />
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="mt-4 text-[0.8125rem] text-brand-muted">
            {MID_CTA.disclaimer}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
