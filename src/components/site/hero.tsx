import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { SiteHeader } from "./site-header";

const plan = [
  { label: "Pull recent support tickets", state: "done" },
  { label: "Score churn risk per account", state: "done" },
  { label: "Draft retention playbook", state: "running" },
  { label: "Route to the account owner", state: "queued" },
] as const;

export function Hero({
  content,
  nav,
  locale,
}: Readonly<{
  content: Dictionary["hero"];
  nav: Dictionary["nav"];
  locale: Locale;
}>) {
  return (
    <section className="kh-hero relative overflow-hidden text-white">
      <SiteHeader content={nav} locale={locale} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-16 lg:pb-24 lg:pt-12">
        <div className="max-w-[40rem]">
          <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#fdba74]">
            <span aria-hidden className="h-px w-7 bg-[#ea580c]" />
            {content.eyebrow}
          </p>

          <h1 className="mt-6 text-balance text-[clamp(2.25rem,4.1vw,3.35rem)] font-semibold leading-[1.07] tracking-[-0.025em]">
            {content.subtitle}
          </h1>

          <p className="mt-6 max-w-[31rem] text-pretty text-[1.05rem] leading-[1.7] text-white/65">
            {content.lead}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a href="#control" className="kh-primary-cta">
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#solutions" className="kh-secondary-cta">
              {content.secondaryCta}
            </a>
          </div>
        </div>

        <div className="kh-mock w-full lg:justify-self-end">
          <div className="kh-mock-bar">
            <div className="kh-mock-id">
              <span>Command center</span>
              <strong>Churn prevention</strong>
            </div>
            <span className="kh-mock-chip is-accent">Draft</span>
          </div>

          <div className="kh-mock-sections">
            <div className="kh-mock-section">
              <p className="kh-mock-label">Goal</p>
              <p className="kh-mock-copy">
                Catch churn signals early and hand retention a ready-to-run playbook.
              </p>
            </div>

            <div className="kh-mock-section">
              <p className="kh-mock-label">Plan</p>
              <div className="kh-mock-rows">
                {plan.map((step) => (
                  <div key={step.label} className={`kh-mock-row is-${step.state}`}>
                    <span className="kh-mock-icon" aria-hidden>
                      {step.state === "done" && <Check className="h-3 w-3" strokeWidth={3} />}
                      {step.state === "running" && <span className="kh-mock-dot" />}
                      {step.state === "queued" && <span className="kh-mock-hollow" />}
                    </span>
                    <span className="kh-mock-row-label">{step.label}</span>
                    <em className="kh-mock-row-meta">{step.state}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="kh-mock-foot">
            <span>policy.retention.churn_gate · v2.4</span>
            <span className="kh-mock-log">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              3 guardrails active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
