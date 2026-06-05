import { FOOTER } from "@/lib/constants";

export function AltFooter() {
  return (
    <footer className="border-t border-[#efecf8] bg-white px-6 py-14">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#1a1530] text-sm font-black text-white">
              D8
            </span>
            <span className="text-[1.05rem] font-extrabold tracking-tight">
              D8A<span className="text-[#7c3aed]">.pro</span>
            </span>
          </div>
          <p className="mt-3 text-[0.9rem] text-[#8b86a0]">{FOOTER.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {[...FOOTER.productLinks, ...FOOTER.legalLinks].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.9rem] font-semibold text-[#5b5575] transition-colors hover:text-[#1a1530]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-10 text-center text-[0.8rem] text-[#a39fb5]">
        © 2026 D8A.pro · An alternative, Sintra-inspired concept layout.
      </p>
    </footer>
  );
}
