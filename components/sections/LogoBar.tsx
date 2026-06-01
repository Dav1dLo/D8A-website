import { PLATFORM_LOGO_COMPONENTS } from "@/components/icons/PlatformLogos";

export function LogoBar() {
  return (
    <section className="border-y border-brand-border bg-brand-lighter-bg py-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="mb-6 text-center text-[0.875rem] font-medium text-brand-light-muted">
          Built for teams using
        </p>
        <div className="flex items-center justify-center gap-8 overflow-x-auto scrollbar-hide pb-2 md:gap-12 md:pb-0">
          {PLATFORM_LOGO_COMPONENTS.map((LogoComponent, i) => (
            <div
              key={i}
              className="flex-shrink-0 opacity-60 grayscale transition-opacity hover:opacity-100"
            >
              <LogoComponent className="h-10 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
