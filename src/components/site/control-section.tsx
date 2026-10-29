import { ArrowRight, Check } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const requestFacts: ReadonlyArray<[string, string]> = [
  ["Channel", "#retention-alerts"],
  ["Trigger", "Support ticket created"],
  ["Run mode", "Event-driven"],
  ["Owner", "RevOps"],
];

const planSteps: ReadonlyArray<[string, string, string]> = [
  ["human_input", "Confirm trigger window", "done"],
  ["api_call", "Fetch recent tickets", "done"],
  ["agent_task", "Filter pricing complaints", "done"],
  ["condition", "Check for matches", "running"],
  ["channel_message", "Notify #retention-alerts", "queued"],
];

export function ControlSection({
  content,
}: Readonly<{ content: Dictionary["control"] }>) {
  return (
    <section id="control" className="bg-[#15100e] py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <p className="kh-eyebrow text-[#fdba74]">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">{content.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.panels.map((panel) => (
              <div key={panel.title} className="rounded-lg border border-white/10 p-4">
                <strong className="block text-sm font-semibold text-white">{panel.title}</strong>
                <span className="mt-2 block text-sm leading-6 text-white/60">{panel.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="kh-mock">
          <div className="kh-mock-bar">
            <div className="kh-mock-id">
              <span>Command center</span>
              <strong>Retention alerts automation</strong>
            </div>
            <span className="kh-mock-chip is-accent">Draft</span>
          </div>

          <div className="kh-mock-grid">
            <div className="kh-mock-col">
              <p className="kh-mock-label">Request</p>
              <dl className="kh-mock-facts">
                {requestFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="kh-mock-col">
              <p className="kh-mock-label">Plan</p>
              <div className="kh-mock-rows">
                {planSteps.map(([kind, label, state]) => (
                  <div key={label} className={`kh-mock-row is-${state}`}>
                    <span className="kh-mock-icon" aria-hidden>
                      {state === "done" && <Check className="h-3 w-3" strokeWidth={3} />}
                      {state === "running" && <span className="kh-mock-dot" />}
                      {state === "queued" && <span className="kh-mock-hollow" />}
                    </span>
                    <div className="kh-mock-row-body">
                      <div className="kh-mock-row-head">
                        <strong>{label}</strong>
                      </div>
                      <span className="kh-mock-row-note">{kind}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="kh-mock-col">
              <p className="kh-mock-label">Gate</p>
              <strong className="kh-mock-title">Review required</strong>
              <p className="kh-mock-copy">
                Deploy is gated by two guardrails: spend authority and channel permissions.
              </p>
              <dl className="kh-mock-facts">
                <div>
                  <dt>Guardrails</dt>
                  <dd>2 active</dd>
                </div>
                <div>
                  <dt>Approver</dt>
                  <dd>RevOps lead</dd>
                </div>
                <div>
                  <dt>SLA</dt>
                  <dd>Same day</dd>
                </div>
              </dl>
              <span className="kh-mock-cta is-ready">
                Deploy automation
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </div>

          <div className="kh-mock-foot">
            <span>policy.automation.deploy_gate · v1.8</span>
            <span className="kh-mock-log">automation.deploy.pending_review</span>
          </div>
        </div>
      </div>
    </section>
  );
}
