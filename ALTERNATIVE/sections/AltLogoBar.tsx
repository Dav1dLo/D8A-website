import { PLATFORM_LOGOS } from "@/lib/constants";

export function AltLogoBar() {
  const row = [...PLATFORM_LOGOS, ...PLATFORM_LOGOS];
  return (
    <section className="border-y border-[#efecf8] bg-white/60 py-8">
      <p className="mb-6 text-center text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#a39fb5]">
        Works with the platforms your team already runs
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="alt-marquee gap-12 px-6">
          {row.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="whitespace-nowrap text-[1.15rem] font-bold text-[#b3aec6]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
