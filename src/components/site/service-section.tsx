import { BrainCircuit, Cpu, Network, ShieldCheck, Workflow } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const featureIcons = [BrainCircuit, Cpu, Network, ShieldCheck, Workflow];

export function ServiceSection({
  content,
  features,
  children,
}: Readonly<{
  content: Dictionary["service"];
  features: Dictionary["features"];
  children?: React.ReactNode;
}>) {
  return (
    <section
      id="platform"
      className="kh-service-showcase relative overflow-hidden py-24 text-[#111827] lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="kh-service-card mx-auto max-w-4xl px-6 py-10 text-center sm:px-14 sm:py-12">
          <p className="kh-eyebrow text-[#005ea8]">{content.eyebrow}</p>
          <p className="mt-7 text-balance text-lg font-medium leading-8 text-[#2f3642] sm:text-2xl sm:leading-10 lg:text-3xl">
            <strong className="font-extrabold text-[#111827]">{content.leadStrong}</strong>
            {content.leadBefore}
            <span className="text-[#005ea8]">{content.leadEmphasis}</span>
            {content.leadAfter}
          </p>
        </div>

        <div id="features" className="pt-28">
          <h2 className="text-center text-4xl font-extrabold tracking-normal text-[#111827] sm:text-5xl">
            {features.titleLead}
            <span className="text-[#005ea8]">{features.titleEmphasis}</span>
          </h2>

          <div className="mx-auto mt-16 grid max-w-6xl gap-7 md:grid-cols-2 lg:grid-cols-3">
            {features.items.map((item, index) => {
              const Icon = featureIcons[index] ?? BrainCircuit;
              return (
                <article key={item.title} className="kh-feature-card">
                  <span className="kh-feature-icon">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
