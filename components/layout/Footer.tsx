"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons/Logo";
import { LinkedinIcon, XIcon } from "@/components/icons/SocialIcons";
import { FOOTER } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/alternative")) return null;

  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1 — Brand */}
          <div>
            <Logo variant="light" className="mb-3 h-7 w-auto" />
            <p className="mb-6 text-sm text-brand-muted">{FOOTER.tagline}</p>
            <div className="flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md text-brand-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-md text-brand-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Product</h3>
            <ul className="space-y-3">
              {FOOTER.productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Legal</h3>
            <ul className="space-y-3">
              {FOOTER.legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-brand-muted">
            &copy; 2026 D8A.pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
