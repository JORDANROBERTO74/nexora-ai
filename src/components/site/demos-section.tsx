import type { Dictionary } from "@/i18n/dictionaries/en";
import SlackAgentDemo from "@/components/demos/slack-agent-demo";
import type { ScenarioId } from "@/components/demos/slack-demo/types";

const scenarios: readonly ScenarioId[] = ["churn", "migration", "expansion", "consolidation"];

export function DemosSection({ content }: Readonly<{ content: Dictionary["demos"] }>) {
  return (
    <section id="demos" className="kh-demos-section" aria-labelledby="demos-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="kh-demos-section-intro max-w-3xl">
          <p className="kh-eyebrow text-[#8fcfff]">{content.eyebrow}</p>
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

        <div className="kh-demo-slots mt-14">
          {content.slots.map((slot, index) => {
            const scenario = scenarios[index] ?? "churn";
            return (
              <article key={scenario} id={`demo-${scenario}`} className="kh-demo-slot">
                <div className="kh-demo-slot-head">
                  <h3>{slot.title}</h3>
                  <p>{slot.description}</p>
                </div>
                <div
                  className="kh-demo-viewport kh-demo-viewport--slack"
                  aria-label={`${slot.title} demo preview`}
                >
                  <SlackAgentDemo scenario={scenario} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
