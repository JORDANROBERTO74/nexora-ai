import { Activity, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import ConstellationBackground from "@/components/constellation-background";
import { SiteHeader } from "./site-header";

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
    <section className="kh-hero relative min-h-[94svh] overflow-hidden text-white">
      <ConstellationBackground />
      <SiteHeader content={nav} locale={locale} />

      <div className="relative z-10 mx-auto grid min-h-[78svh] max-w-7xl items-center gap-12 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:pb-28">
        <div className="max-w-3xl text-left">
          <p className="kh-eyebrow mb-6 text-[#8fcfff]">{content.eyebrow}</p>
          <h1 className="text-balance font-semibold tracking-normal text-white">
            <span className="block text-[clamp(4.5rem,10vw,9.6rem)] leading-[0.82]">
              {content.title}
            </span>
            <span className="mt-6 block max-w-3xl text-[clamp(2rem,4.9vw,4.75rem)] leading-[1.02] text-white/92">
              {content.subtitle}
            </span>
          </h1>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href="#control" className="kh-primary-cta">
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#solutions" className="kh-secondary-cta">
              {content.secondaryCta}
            </a>
          </div>
        </div>

        <div className="kh-hero-product">
          <div className="kh-product-peek">
            <div className="kh-product-topbar">
              <div className="kh-product-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="kh-product-address">nexora.app</div>
            </div>

            <div className="kh-hero-app">
              <aside className="kh-hero-sidebar">
                <strong>Nexora</strong>
                {["Dashboard", "Automation", "Command Center", "Executions", "Governance"].map((item) => (
                  <span key={item} className={item === "Command Center" ? "is-active" : ""}>
                    {item}
                  </span>
                ))}
              </aside>

              <div className="kh-hero-main">
                <div className="kh-hero-app-head">
                  <div>
                    <span>Command Center</span>
                    <strong>Churn prevention workflow</strong>
                  </div>
                  <em>ready</em>
                </div>

                <div className="kh-hero-goal">
                  <span>Goal</span>
                  <p>
                    Find pricing complaints, identify churn risk, and notify retention before
                    the customer leaves.
                  </p>
                </div>

                <div className="kh-hero-workspace">
                  <div className="kh-hero-plan-card">
                    <div className="kh-hero-card-head">
                      <Sparkles className="h-4 w-4" />
                      <strong>Current Draft Plan</strong>
                    </div>
                    <div className="kh-hero-steps">
                      {[
                        "Fetch recent tickets",
                        "Classify churn signals",
                        "Match account context",
                        "Notify retention channel",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="kh-hero-step"
                          style={{ animationDelay: `${index * 520}ms` }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="kh-hero-truth-card">
                    <div className="kh-hero-card-head">
                      <ShieldCheck className="h-4 w-4" />
                      <strong>Operational truth</strong>
                    </div>
                    {["Support tickets", "CRM accounts", "Billing history"].map((item, index) => (
                      <span key={item} style={{ animationDelay: `${index * 650}ms` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="kh-hero-deploy-row">
                  <span>Guardrails active</span>
                  <strong>Deploy Automation</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="kh-hero-float kh-hero-float-agent">
            <Activity className="h-4 w-4" />
            <div>
              <strong>Churn Agent</strong>
              <span>Listening for retention risk</span>
            </div>
          </div>
          <div className="kh-hero-float kh-hero-float-proof">
            <span>governance log</span>
            <strong>policy.approval_gate.passed</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
