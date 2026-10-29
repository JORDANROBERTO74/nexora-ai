import { Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function PilotSection({ content }: Readonly<{ content: Dictionary["pilot"] }>) {
  return (
    <section id="pilot" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="kh-eyebrow text-[#c2410c]">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal text-[#111827] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f6673]">{content.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#control" className="kh-dark-cta">
              {content.primaryCta}
              <Sparkles className="h-4 w-4" />
            </a>
            <a href="#governance" className="kh-light-cta">
              {content.secondaryCta}
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.metrics.map((metric) => (
            <div key={metric.label} className="kh-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
