import type { ScenarioData } from '../types'
import type { ScenarioExecutionUi } from '../components/execution-ui/types'
import { buildDemoExecutionTitleParts } from '../utils/executionTitleFormat'

function buildStepLogs(
  data: ScenarioData,
  paths: { method: string; path: string; summary: string }[]
) {
  return data.sourceEvidence.map((item, index) => {
    const path = paths[index] ?? {
      method: 'GET',
      path: `/sources/${item.label.toLowerCase().replace(/\s+/g, '-')}`,
      summary: `Query ${item.label}`
    }
    return {
      id: `step-${index + 1}`,
      stepNumber: index + 1,
      status: 'success' as const,
      statusLabel: 'Success',
      methodLabel: path.method,
      pathLabel: path.path,
      durationLabel: `${180 + index * 90}ms`,
      summary: path.summary,
      detailSections: [{ id: 'result', label: 'Result', value: item.value }]
    }
  })
}

export function buildScenarioExecutionUi(
  data: ScenarioData,
  options: {
    refId: string
    actor?: string
    /** Raw feed action, e.g. `running` (matches header status while in progress) */
    feedAction?: string
    /** Raw feed target, e.g. `running channels_sales::rankExpansionOpportunities` */
    feedTarget: string
    headlineAction?: string
    headlineTarget?: string
    targetSecondary?: string
    stepLogPaths: { method: string; path: string; summary: string }[]
  }
): ScenarioExecutionUi {
  const feedAction = options.feedAction ?? 'running'
  const { actionLabel, targetLabel } = buildDemoExecutionTitleParts(
    feedAction,
    options.feedTarget
  )

  return {
    header: {
      refId: options.refId,
      actor: options.actor ?? 'Retention Agent',
      action: feedAction,
      target: data.channel,
      headlineAction: options.headlineAction,
      headlineTarget: options.headlineTarget,
      titleActionLabel: actionLabel,
      titleTargetLabel: targetLabel,
      targetSecondary: options.targetSecondary,
      durationLabel: '2.4s',
      source: 'agent',
      status: 'running'
    },
    stepLogs: buildStepLogs(data, options.stepLogPaths)
  }
}
