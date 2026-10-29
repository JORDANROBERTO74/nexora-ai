"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";

const checks = [
  {
    label: "Budget availability",
    source: "Finance API",
    detail: "$412k left in R&D · Q3",
    result: "pass",
  },
  {
    label: "Vendor risk",
    source: "Vendor registry",
    detail: "SOC 2 current · no open findings",
    result: "pass",
  },
  {
    label: "Spend policy",
    source: "Policy engine",
    detail: "$48k is above the $25k auto-approval limit",
    result: "warn",
  },
  {
    label: "Contract terms",
    source: "Contract store",
    detail: "Renews Jun 30 · 12% uplift within cap",
    result: "pass",
  },
] as const;

const FACTS = [
  ["Vendor", "Vantage Analytics"],
  ["Cost center", "R&D · 4120"],
  ["Requested by", "Dana Wei"],
  ["Contract", "Renews Jun 30"],
] as const;

export function SpendApprovalDemo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(8);
      return;
    }
    const id = setInterval(() => setTick((value) => (value + 1) % 9), 1100);
    return () => clearInterval(id);
  }, []);

  const step = Math.min(tick, 5);
  const resolved = step >= 5;

  const stateOf = (index: number) => {
    if (step >= index + 2) return checks[index].result;
    if (step === index + 1) return "running";
    return "pending";
  };

  return (
    <div className="kh-mock">
      <div className="kh-mock-bar">
        <div className="kh-mock-id">
          <span>Purchase request</span>
          <strong>#PR-2481 · Analytics platform renewal</strong>
        </div>
        <div className="kh-mock-num">$48,000</div>
      </div>

      <div className="kh-mock-grid">
        <div className="kh-mock-col">
          <p className="kh-mock-label">Request</p>
          <dl className="kh-mock-facts">
            {FACTS.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="kh-mock-col">
          <p className="kh-mock-label">Agent checks</p>
          <ul className="kh-mock-rows">
            {checks.map((check, index) => {
              const state = stateOf(index);
              return (
                <li key={check.label} className={`kh-mock-row is-${state}`}>
                  <span className="kh-mock-icon" aria-hidden>
                    {state === "pass" && <Check className="h-3 w-3" strokeWidth={3} />}
                    {state === "warn" && <AlertTriangle className="h-3 w-3" strokeWidth={2.5} />}
                    {state === "running" && <span className="kh-mock-dot" />}
                    {state === "pending" && <span className="kh-mock-hollow" />}
                  </span>
                  <div className="kh-mock-row-body">
                    <div className="kh-mock-row-head">
                      <strong>{check.label}</strong>
                      <em>{check.source}</em>
                    </div>
                    <span className="kh-mock-row-note">{check.detail}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="kh-mock-col">
          <p className="kh-mock-label">Decision</p>
          <strong className="kh-mock-title">
            {resolved ? "Approval required" : "Evaluating request"}
          </strong>
          <p className="kh-mock-copy">
            {resolved
              ? "$48k exceeds the $25k auto-approval limit. Routed to the CFO with the evidence attached."
              : "Checking budget, vendor risk, spend policy and contract terms against live systems."}
          </p>
          <dl className="kh-mock-facts">
            <div>
              <dt>Approver</dt>
              <dd>M. Okafor · CFO</dd>
            </div>
            <div>
              <dt>SLA</dt>
              <dd>4 hours</dd>
            </div>
          </dl>
          <span className={`kh-mock-cta${resolved ? " is-ready" : ""}`}>
            {resolved ? "Request approval" : "Waiting for checks"}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </div>

      <div className="kh-mock-foot">
        <span>policy.procurement.spend_gate · v3.2</span>
        <span className="kh-mock-log">
          {resolved ? "procurement.approval.requested" : "procurement.agent.running"}
        </span>
      </div>
    </div>
  );
}
