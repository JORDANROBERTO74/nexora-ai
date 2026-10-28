export type DemoOpportunityGroundingData = {
  account: string
  conceptKey: string
  groundingStatus: string
  groundingStrength: string
  fitLevel: string
  namespace: string
  sourceTypeKey: string
  readWriteMode: string
  rawPayloadStored: boolean
  warnings: string[]
  blockers: string[]
}

export type ScenarioOpportunityUi = {
  grounding: DemoOpportunityGroundingData
  headline: string
  rankedAccounts: {
    rank: number
    account: string
    fitScore: number
    signal: string
    usageDelta?: string
  }[]
  recommendedAction: string
  signalsSummary: string
}
