import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { LinkedinIcon } from "@/components/icons/SocialIcons";
import { FOUNDER } from "@/lib/constants";

export function FounderNote() {
  return (
    <section className="border-y border-brand-border bg-brand-lighter-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-10 md:text-left">
            {/* Founder photo */}
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-brand-border bg-white md:h-28 md:w-28">
              <Image
                src="/founder.jpeg"
                alt={FOUNDER.name}
                width={112}
                height={112}
                className="h-full w-full scale-110 object-cover"
              />
            </div>

            {/* Quote + attribution */}
            <div className="flex-1">
              <p className="mb-2 text-[0.75rem] font-medium uppercase tracking-[0.05em] text-brand-light-muted">
                From the founder
              </p>
              <blockquote className="space-y-3">
                {FOUNDER.quote.split("\n\n").map((para, i, arr) => (
                  <p
                    key={i}
                    className="text-[1.0625rem] font-light italic leading-relaxed text-brand-black md:text-[1.1875rem]"
                  >
                    {i === 0 && "“"}
                    {para}
                    {i === arr.length - 1 && "”"}
                  </p>
                ))}
              </blockquote>
              <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
                <span className="text-[0.9375rem] font-medium text-brand-black">
                  {FOUNDER.name}
                </span>
                <span className="text-brand-light-muted">&middot;</span>
                <span className="text-[0.875rem] font-light text-brand-muted">
                  {FOUNDER.title}
                </span>
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${FOUNDER.name} on LinkedIn`}
                  className="ml-1 text-brand-light-muted transition-colors hover:text-brand-black"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
