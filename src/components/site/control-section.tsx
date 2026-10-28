import { Activity, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const commandSteps: ReadonlyArray<[string, string, string]> = [
  ["STEP 1", "human_input", "Provide start_time"],
  ["STEP 2", "api_call", "Fetch Recent Tickets"],
  ["STEP 3", "agent_task", "Filter for Pricing Complaints"],
  ["STEP 4", "condition", "Check for Matches"],
  ["STEP 5", "channel_message", "Notify channel"],
];

const governanceRows: ReadonlyArray<[string, string, string]> = [
  ["May 18, 12:20 PM", "info", "agent.execution.completed"],
  ["May 18, 12:00 PM", "info", "policy.approval_gate.passed"],
  ["May 18, 10:00 AM", "info", "automation.deployed"],
];

export function ControlSection({
  content,
}: Readonly<{ content: Dictionary["control"] }>) {
  return (
    <section id="control" className="bg-[#07182e] py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <p className="kh-eyebrow text-[#8fcfff]">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">{content.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.panels.map((panel) => (
              <div key={panel.title} className="kh-control-pill">
                <strong>{panel.title}</strong>
                <span>{panel.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="kh-command-preview" aria-label="Animated Command Center preview">
          <div className="kh-command-topbar">
            <div className="kh-command-title">
              <Activity className="h-4 w-4" />
              <strong>Command Center</strong>
              <span>ready</span>
            </div>
            <div className="kh-command-actions">
              <span>Sessions</span>
              <b>New</b>
            </div>
          </div>

          <div className="kh-command-body">
            <div className="kh-command-chat">
              <div className="kh-goal-card">
                <strong>Goal Definition</strong>
                <span>
                  Describe what you want to achieve. The agents will formulate the workflow.
                </span>
              </div>
              <div className="kh-user-bubble">
                We need to avoid churn. Send a channel message when pricing complaints appear in
                support tickets.
              </div>
              <div className="kh-assistant-card">
                <strong>Support Ticket Pricing Alert Workflow</strong>
                <p>
                  Likely intent: proactively mitigate churn by identifying pricing concerns in
                  support tickets.
                </p>
                <div className="kh-provider-list">
                  <span>Churn Agent</span>
                  <span>Support desk</span>
                  <span>Channels</span>
                </div>
                <em>Reply with missing details, or say start when you want the runnable plan.</em>
              </div>
              <div className="kh-command-input">Refine the plan or type execute to run it...</div>
            </div>

            <div className="kh-plan-panel">
              <div className="kh-plan-head">
                <div>
                  <strong>Current Draft Plan</strong>
                  <span>Channel: retention-alerts</span>
                </div>
                <small>0/5</small>
              </div>
              <div className="kh-step-list">
                {commandSteps.map(([step, kind, title], index) => (
                  <div
                    key={title}
                    className="kh-command-step"
                    style={{ animationDelay: `${index * 760}ms` }}
                  >
                    <i />
                    <div>
                      <span>
                        {step} <b>{kind}</b>
                      </span>
                      <strong>{title}</strong>
                    </div>
                  </div>
                ))}
              </div>
              <div className="kh-command-modal">
                <div>
                  <Sparkles className="h-4 w-4" />
                  <strong>Deploy Operational Automation</strong>
                </div>
                <span>Manual Automation: run on demand</span>
              </div>
              <div className="kh-deploy-bar">
                <span>Test Run</span>
                <strong>Deploy Automation</strong>
              </div>
            </div>
          </div>

          <div className="kh-governance-log-strip">
            <div>
              <strong>Governance Logs</strong>
              <span>674 visible records</span>
            </div>
            {governanceRows.map(([time, severity, event], index) => (
              <div
                key={event}
                className="kh-command-row"
                style={{ animationDelay: `${index * 520}ms` }}
              >
                <span>{time}</span>
                <b>{severity}</b>
                <strong>{event}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
