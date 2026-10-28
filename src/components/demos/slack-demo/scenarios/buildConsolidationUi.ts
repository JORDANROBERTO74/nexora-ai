import type { ScenarioConsolidationUi } from '../components/consolidation-ui/types'
import type { ConsolidationSummaryCopy, ScenarioData } from '../types'

type BuildConsolidationUiOptions = {
  conceptKey: string
  namespace: string
  sourceTypeKey: string
  groundingStatus?: string
  groundingStrength?: string
  extraWarnings?: string[]
}

export function buildStubConsolidationUi(): ScenarioConsolidationUi {
  return {
    grounding: {
      account: '—',
      conceptKey: 'customer.account_consolidation',
      groundingStatus: 'grounded',
      groundingStrength: 'strong',
      groupLevel: '—',
      namespace: 'integrations.channels',
      sourceTypeKey: 'thread',
      readWriteMode: 'read',
      rawPayloadStored: false,
      warnings: [],
      blockers: []
    },
    headline: '',
    details: [],
    buyingGroups: [],
    recommendedAction: '',
    signalsSummary: ''
  }
}

export function buildScenarioConsolidationUi(
  data: ScenarioData,
  consolidationSummary: ConsolidationSummaryCopy,
  options: BuildConsolidationUiOptions
): ScenarioConsolidationUi {
  const warnings = [...(options.extraWarnings ?? [])].filter(Boolean)

  return {
    grounding: {
      account: consolidationSummary.parentAccount,
      conceptKey: options.conceptKey,
      groundingStatus: options.groundingStatus ?? 'grounded',
      groundingStrength: options.groundingStrength ?? 'strong',
      groupLevel: consolidationSummary.groupFinal,
      namespace: options.namespace,
      sourceTypeKey: options.sourceTypeKey,
      readWriteMode: 'read',
      rawPayloadStored: false,
      warnings,
      blockers: []
    },
    headline: consolidationSummary.headline,
    details: data.sourceEvidence.map(item => ({
      key: item.label,
      value: item.value
    })),
    buyingGroups: consolidationSummary.buyingGroups.map(row => ({
      rank: row.rank,
      groupName: row.groupName,
      signal: row.signal,
      contractStatus: row.contractStatus
    })),
    recommendedAction: consolidationSummary.recommendedAction,
    signalsSummary: consolidationSummary.signalsSummary
  }
}
