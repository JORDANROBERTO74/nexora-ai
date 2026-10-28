import { buildScenarioRiskUi } from './buildRiskUi'
import { buildStubConsolidationUi } from './buildConsolidationUi'
import { buildStubOpportunityUi } from './buildOpportunityUi'
import type {
  ConsolidationSummaryCopy,
  OpportunitySummaryCopy,
  RiskSummaryCopy,
  ScenarioData
} from '../types'

const STUB_RISK_SUMMARY: RiskSummaryCopy = {
  account: '—',
  riskFinal: '—',
  riskReviewing: '—',
  confidence: '0%',
  signalsSummary: ''
}

const STUB_OPPORTUNITY_SUMMARY: OpportunitySummaryCopy = {
  headline: '',
  topAccount: '—',
  fitLabel: 'Expansion fit',
  fitFinal: '—',
  fitReviewing: '—',
  confidence: '0%',
  recommendedAction: '',
  rankedAccounts: [],
  signalsSummary: ''
}

const STUB_CONSOLIDATION_SUMMARY: ConsolidationSummaryCopy = {
  headline: '',
  parentAccount: '—',
  groupLabel: 'Buying groups',
  groupFinal: '—',
  groupReviewing: '—',
  confidence: '0%',
  recommendedAction: '',
  buyingGroups: [],
  signalsSummary: ''
}

export function buildStubRiskUi(data: ScenarioData) {
  return buildScenarioRiskUi(data, STUB_RISK_SUMMARY, {
    conceptKey: 'customer.stub',
    namespace: 'integrations.channels',
    sourceTypeKey: 'thread',
    extraWarnings: [],
    extraBlockers: []
  })
}

export function getStubRiskSummary(): RiskSummaryCopy {
  return { ...STUB_RISK_SUMMARY }
}

export function getStubOpportunitySummary(): OpportunitySummaryCopy {
  return { ...STUB_OPPORTUNITY_SUMMARY }
}

export function getStubOpportunityUi() {
  return buildStubOpportunityUi()
}

export function getStubConsolidationSummary(): ConsolidationSummaryCopy {
  return { ...STUB_CONSOLIDATION_SUMMARY }
}

export function getStubConsolidationUi() {
  return buildStubConsolidationUi()
}
