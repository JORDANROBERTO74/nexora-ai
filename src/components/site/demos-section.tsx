import type { Dictionary } from "@/i18n/dictionaries/en";
import { SpendApprovalDemo } from "@/components/demos/spend-approval-demo";

export function DemosSection({ content }: Readonly<{ content: Dictionary["demos"] }>) {
  const slot = content.slots[0];

  return (
    <section id="demos" className="kh-demos-section" aria-labelledby="demos-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="kh-demos-section-intro max-w-3xl">
          <p className="kh-eyebrow text-[#fdba74]">{content.eyebrow}</p>
          <h2
            id="demos-heading"
            className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl"
          >
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">{content.description}</p>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-white/50">
            {content.note}
          </p>
        </div>

        <article id="demo-spend-approval" className="kh-demo-slot mt-14">
          <div className="kh-demo-slot-head">
            <h3>{slot.title}</h3>
            <p>{slot.description}</p>
          </div>
          <SpendApprovalDemo />
        </article>
      </div>
    </section>
  );
}
