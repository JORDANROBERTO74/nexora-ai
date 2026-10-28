import type { Dictionary } from "@/i18n/dictionaries/en";

export function SystemsStrip({ content }: Readonly<{ content: Dictionary["systems"] }>) {
  return (
    <section className="border-y border-[#d7dbe3] bg-white py-6" aria-label={content.label}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 text-sm font-semibold sm:px-8">
        {content.items.map((item) => (
          <span key={item} className="flex items-center gap-2 text-[#5f6673]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#e30613]" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
