import type { DemoDecisionDetailField } from '../risk-ui/types'

export type DemoConsolidationGroundingData = {
  account: string
  conceptKey: string
  groundingStatus: string
  groundingStrength: string
  groupLevel: string
  namespace: string
  sourceTypeKey: string
  readWriteMode: string
  rawPayloadStored: boolean
  warnings: string[]
  blockers: string[]
}

export type ScenarioConsolidationUi = {
  grounding: DemoConsolidationGroundingData
  headline: string
  details: DemoDecisionDetailField[]
  buyingGroups: {
    rank: number
    groupName: string
    signal: string
    contractStatus?: string
  }[]
  recommendedAction: string
  signalsSummary: string
}
