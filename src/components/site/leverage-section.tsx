import { Activity, Cpu, Layers } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const highlightIcons = [Layers, Cpu, Activity];

const appMetrics: ReadonlyArray<[string, string]> = [
  ["Total tickets", "26,797"],
  ["Automated tickets", "21,354"],
  ["Automated rate", "79.7%"],
  ["Success rate", "99.8%"],
];

const appRows: ReadonlyArray<[string, string, string]> = [
  ["Churn risk ticket alert", "Churn Agent", "Active"],
  ["At-risk customer follow-up", "Churn Agent", "Paused"],
  ["Weekly churn signal report", "Churn Agent", "Active"],
];

const logRows: ReadonlyArray<[string, string, string]> = [
  ["STEP 1", "GET /api/v2/search", "200 · completed in 412 ms"],
  ["STEP 2", "Extract and format ticket data", "Agent step completed"],
];

export function LeverageSection({
  content,
}: Readonly<{ content: Dictionary["leverage"] }>) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="text-center">
        <p className="kh-eyebrow text-[#c2410c]">{content.eyebrow}</p>
        <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal text-[#111827] sm:text-6xl">
          {content.title}
        </h2>
      </div>

      <div className="kh-operational-showcase mt-14">
        <div className="kh-mock">
          <div className="kh-mock-bar">
            <div className="kh-mock-id">
              <span>Automations</span>
              <strong>Operational workflows</strong>
            </div>
            <span className="kh-mock-chip is-ok">Live</span>
          </div>

          <div className="kh-mock-metrics">
            {appMetrics.map(([label, value]) => (
              <div key={label} className="kh-mock-metric">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="kh-mock-grid is-2">
            <div className="kh-mock-col">
              <p className="kh-mock-label">Automations</p>
              <div className="kh-mock-table">
                <div className="kh-mock-table-head">
                  <span>Name</span>
                  <span>Agent</span>
                  <span>Status</span>
                </div>
                {appRows.map(([name, agent, status]) => (
                  <div key={name} className="kh-mock-table-row">
                    <strong>{name}</strong>
                    <span>{agent}</span>
                    <span className={`kh-mock-chip${status === "Active" ? " is-ok" : ""}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="kh-mock-col">
              <p className="kh-mock-label">Execution log</p>
              <div className="kh-mock-table">
                {logRows.map(([step, path, result]) => (
                  <div key={step} className="kh-mock-log-row">
                    <span>{step}</span>
                    <code>{path}</code>
                    <em>{result}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="kh-mock-foot">
            <span>policy.automation.runtime_gate · v2.1</span>
            <span className="kh-mock-log">automation.run.completed</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {content.highlights.map((item, index) => {
          const Icon = highlightIcons[index] ?? Layers;
          return (
            <article key={item.title} className="kh-operational-highlight">
              <span>
                <Icon className="h-5 w-5" />
              </span>
              <p>
                <strong>{item.title}</strong> {item.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
