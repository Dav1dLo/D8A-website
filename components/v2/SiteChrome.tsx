"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Infinity";
import { NAV } from "@/lib/v2-content";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/alternative")) return null;

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="D8A home">
          <Wordmark />
        </Link>
        <nav aria-label="Main navigation" className="nav-links">
          {NAV.map((l) => (
            <a key={l.href} href={isHome ? l.href : `/${l.href}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="https://app.d8a.pro" className="nav-login">
            Log in
          </a>
          <a href={isHome ? "#join" : "/#join"} className="btn btn-ink btn-sm">
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/alternative")) return null;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Wordmark className="wordmark--light" />
          <p className="footer-line">The autonomous enterprise.</p>
        </div>
        <ul className="footer-links">
          <li><a href="https://d8a.pro">d8a.pro</a></li>
          <li><a href="mailto:hello@d8a.pro">hello@d8a.pro</a></li>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/cookies">Cookies</Link></li>
        </ul>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} D8A</p>
    </footer>
  );
}
