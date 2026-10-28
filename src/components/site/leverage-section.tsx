import { Activity, Cpu, Layers } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const highlightIcons = [Layers, Cpu, Activity];

const appMetrics: ReadonlyArray<[string, string]> = [
  ["Total Tickets", "26,797"],
  ["Automated Tickets", "21,354"],
  ["Percentage Automated", "79.7%"],
  ["Success Rate", "99.8%"],
];

const appRows: ReadonlyArray<[string, string, string]> = [
  ["Churn Risk Ticket Alert", "Churn Agent", "Active"],
  ["At-Risk Customer Follow-up", "Churn Agent", "Paused"],
  ["Weekly Churn Signal Report", "Churn Agent", "Active"],
];

const catalog = ["support-api", "warehouse-api", "billing-api", "crm-api"];

export function LeverageSection({
  content,
}: Readonly<{ content: Dictionary["leverage"] }>) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="text-center">
        <p className="kh-eyebrow text-[#005ea8]">{content.eyebrow}</p>
        <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal text-[#111827] sm:text-6xl">
          {content.title}
        </h2>
      </div>

      <div className="kh-operational-showcase mt-14">
        <div className="kh-operational-browser">
          <div className="kh-operational-topbar">
            <span />
            <span />
            <span />
            <div>nexora.app</div>
          </div>
          <div className="kh-operational-screen">
            <aside className="kh-operational-sidebar">
              <strong>Nexora</strong>
              <span className="is-active">Dashboard</span>
              <span>Automation</span>
              <span>Executions</span>
              <span>Data Catalog</span>
              <span>Governance</span>
            </aside>
            <div className="kh-operational-main">
              <div className="kh-app-head">
                <div>
                  <strong>Operational Automation Workflows</strong>
                  <span>Deployed scheduled, event-driven, and API-driven automations.</span>
                </div>
                <button type="button">New Automation</button>
              </div>

              <div className="kh-app-metrics">
                {appMetrics.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="kh-app-workspace">
                <div className="kh-app-table">
                  <div className="kh-app-table-head">
                    <strong>Automations</strong>
                    <span>Agent</span>
                    <span>Status</span>
                  </div>
                  {appRows.map(([name, agent, status], index) => (
                    <div
                      key={name}
                      className="kh-app-table-row"
                      style={{ animationDelay: `${index * 600}ms` }}
                    >
                      <strong>{name}</strong>
                      <span>{agent}</span>
                      <em>{status}</em>
                    </div>
                  ))}
                </div>

                <div className="kh-app-side-panel">
                  <strong>Execution Logs</strong>
                  <div className="kh-execution-card">
                    <span>STEP 1</span>
                    <b>GET /api/v2/search</b>
                    <small>Completed successfully with HTTP 200.</small>
                  </div>
                  <div className="kh-execution-card">
                    <span>STEP 2</span>
                    <b>Extract and Format Ticket Data</b>
                    <small>Agent completed successfully.</small>
                  </div>
                </div>
              </div>

              <div className="kh-catalog-strip">
                {catalog.map((source, index) => (
                  <span key={source} style={{ animationDelay: `${index * 450}ms` }}>
                    {source}
                  </span>
                ))}
              </div>
            </div>
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
