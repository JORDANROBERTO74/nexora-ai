import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";

export function SiteFooter({
  content,
  locale,
}: Readonly<{
  content: Dictionary["footer"];
  locale: Locale;
}>) {
  return (
    <footer className="bg-[#15100e] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <span className="kh-brand-mark grid h-9 w-9 place-items-center rounded-md text-sm font-black text-white">
            N
          </span>
          <span className="font-semibold">{content.brand}</span>
        </Link>

        <nav aria-label={content.brand} className="flex flex-wrap gap-5 text-sm text-white/70">
          {content.links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <small className="text-sm text-white/60">{content.copyright}</small>
      </div>
    </footer>
  );
}
