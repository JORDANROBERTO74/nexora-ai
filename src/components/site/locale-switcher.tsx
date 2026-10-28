import Link from "next/link";
import type { Locale } from "@/i18n/config";

export function LocaleSwitcher({
  currentLocale,
  label,
  className = "",
}: Readonly<{
  currentLocale: Locale;
  label: string;
  className?: string;
}>) {
  return (
    <div
      className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] ${className}`}
      role="group"
      aria-label={label}
    >
      <Link
        href="/en"
        hrefLang="en"
        className={`rounded px-1.5 py-0.5 transition ${
          currentLocale === "en"
            ? "bg-white/15 text-white"
            : "text-white/60 hover:text-white"
        }`}
        aria-current={currentLocale === "en" ? "page" : undefined}
      >
        EN
      </Link>
      <Link
        href="/es"
        hrefLang="es"
        className={`rounded px-1.5 py-0.5 transition ${
          currentLocale === "es"
            ? "bg-white/15 text-white"
            : "text-white/60 hover:text-white"
        }`}
        aria-current={currentLocale === "es" ? "page" : undefined}
      >
        ES
      </Link>
    </div>
  );
}
