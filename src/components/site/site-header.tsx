"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader({
  content,
  locale,
}: Readonly<{
  content: Dictionary["nav"];
  locale: Locale;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
      <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={content.homeLabel}>
        <span className="kh-brand-mark grid h-9 w-9 place-items-center rounded-md text-sm font-black text-white">
          N
        </span>
        <span className="text-[15px] font-semibold tracking-normal text-white">
          {content.brand}
        </span>
      </Link>

      <nav
        aria-label={content.localeLabel}
        className="hidden items-center gap-7 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-white/80 backdrop-blur-xl md:flex"
      >
        {content.links.map((link) => (
          <a key={link.href} href={link.href} className="transition hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-5 md:flex">
        <LocaleSwitcher currentLocale={locale} label={content.localeLabel} />
        <Link href="#pilot" className="kh-nav-button">
          {content.cta}
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? content.closeMenu : content.openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
      >
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${
              isOpen ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${
              isOpen ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div
          id="mobile-nav"
          className="w-full rounded-xl border border-white/15 bg-[#07182e]/95 p-5 backdrop-blur-xl md:hidden"
        >
          <nav aria-label={content.localeLabel} className="flex flex-col gap-4">
            {content.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-white/90 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <Link
              href="#pilot"
              onClick={() => setIsOpen(false)}
              className="kh-nav-button"
            >
              {content.cta}
            </Link>
            <LocaleSwitcher currentLocale={locale} label={content.localeLabel} />
          </div>
        </div>
      )}
    </header>
  );
}
