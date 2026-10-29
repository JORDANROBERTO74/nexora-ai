import { KeyRound, LockKeyhole, Radar, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const itemIcons = [LockKeyhole, ShieldCheck, KeyRound, Radar];

export function GovernanceSection({
  content,
}: Readonly<{ content: Dictionary["governance"] }>) {
  return (
    <section id="governance" className="border-y border-[#d7dbe3] bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="kh-eyebrow text-[#c2410c]">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal text-[#111827] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f6673]">{content.description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {content.items.map((item, index) => {
            const Icon = itemIcons[index] ?? ShieldCheck;
            return (
              <article key={item.title} className="kh-governance-item">
                <Icon className="h-5 w-5 text-[#c2410c]" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
