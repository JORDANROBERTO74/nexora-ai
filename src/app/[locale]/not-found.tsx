import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default function NotFound() {
  const dict = getDictionary(defaultLocale).notFound;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb] px-6 text-center">
      <span className="kh-brand-mark grid h-11 w-11 place-items-center rounded-md text-base font-black text-white">
        N
      </span>
      <h1 className="mt-8 text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[0.95] tracking-tight text-[#111827]">
        {dict.title}
      </h1>
      <p className="mt-6 max-w-md text-lg leading-8 text-[#5f6673]">{dict.body}</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-10 inline-flex items-center gap-2 rounded-md bg-[#005ea8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004a85]"
      >
        {dict.cta}
      </Link>
    </main>
  );
}
