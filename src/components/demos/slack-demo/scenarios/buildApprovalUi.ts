import type { ScenarioApprovalUi } from '../components/approval-ui/types'
import type { ApprovalAction } from '../types'

export function workflowStepsToApprovalActions(
  workflowSteps: ScenarioApprovalUi['workflowSteps']
): ApprovalAction[] {
  return workflowSteps.map(step => ({
    id: step.id,
    label: step.action
  }))
}

function parseConfidencePercent(confidence: string): number {
  const match = confidence.match(/(\d+(?:\.\d+)?)/)
  if (!match) return 0.82
  const value = Number.parseFloat(match[1])
  return value > 1 ? value / 100 : value
}

export function buildScenarioApprovalUi(
  summarySource: { account: string; confidence: string; riskFinal?: string },
  actions: ApprovalAction[],
  options?: { context?: string; decisionSummary?: string }
): ScenarioApprovalUi {
  const summary =
    options?.decisionSummary ??
    (summarySource.riskFinal
      ? `${summarySource.account} · ${summarySource.riskFinal} risk · ${summarySource.confidence} confidence`
      : `${summarySource.account} · ${summarySource.confidence} confidence`)

  return {
    decision: {
      context: options?.context ?? 'Escalation required',
      summary,
      confidence: parseConfidencePercent(summarySource.confidence)
    },
    workflowSteps: actions.map((action, index) => ({
      id: action.id,
      stepNumber: index + 1,
      action: action.label,
      status: 'pending' as const
    }))
  }
}
