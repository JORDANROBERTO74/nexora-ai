import type { ScenarioOpportunityUi } from '../components/opportunity-ui/types'
import type { OpportunitySummaryCopy, ScenarioData } from '../types'

type BuildOpportunityUiOptions = {
  conceptKey: string
  namespace: string
  sourceTypeKey: string
  groundingStatus?: string
  groundingStrength?: string
  extraWarnings?: string[]
}

export function buildStubOpportunityUi(): ScenarioOpportunityUi {
  return {
    grounding: {
      account: '—',
      conceptKey: 'customer.expansion_opportunity',
      groundingStatus: 'grounded',
      groundingStrength: 'strong',
      fitLevel: '—',
      namespace: 'integrations.channels',
      sourceTypeKey: 'thread',
      readWriteMode: 'read',
      rawPayloadStored: false,
      warnings: [],
      blockers: []
    },
    headline: '',
    rankedAccounts: [],
    recommendedAction: '',
    signalsSummary: ''
  }
}

export function buildScenarioOpportunityUi(
  data: ScenarioData,
  opportunitySummary: OpportunitySummaryCopy,
  options: BuildOpportunityUiOptions
): ScenarioOpportunityUi {
  const warnings = [...(options.extraWarnings ?? [])].filter(Boolean)

  return {
    grounding: {
      account: opportunitySummary.topAccount,
      conceptKey: options.conceptKey,
      groundingStatus: options.groundingStatus ?? 'grounded',
      groundingStrength: options.groundingStrength ?? 'strong',
      fitLevel: opportunitySummary.fitFinal,
      namespace: options.namespace,
      sourceTypeKey: options.sourceTypeKey,
      readWriteMode: 'read',
      rawPayloadStored: false,
      warnings,
      blockers: []
    },
    headline: opportunitySummary.headline,
    rankedAccounts: opportunitySummary.rankedAccounts.map(row => ({
      rank: row.rank,
      account: row.account,
      fitScore: row.fitScore,
      signal: row.signal,
      usageDelta: row.usageDelta
    })),
    recommendedAction: opportunitySummary.recommendedAction,
    signalsSummary: opportunitySummary.signalsSummary
  }
}
