export type DemoExecutionStatus =
  | 'success'
  | 'warning'
  | 'error'
  | 'running'
  | 'info'

export type DemoExecutionHeaderData = {
  refId: string
  actor: string
  /** Raw feed action for title formatting */
  action: string
  /** Meta row (Zap icon), e.g. Slack channel */
  target: string
  /** Demo story headline (h3), e.g. Find expansion opportunities */
  headlineAction?: string
  headlineTarget?: string
  /** Preformatted list-item title (product executions UI) */
  titleActionLabel: string
  titleTargetLabel: string
  targetSecondary?: string
  durationLabel: string
  source: string
  status: DemoExecutionStatus
}

export type DemoStepLogStatus = 'success' | 'error' | 'running'

export type DemoStepLogDetail = {
  id: string
  label: string
  value: string
}

export type DemoStepLog = {
  id: string
  stepNumber: number
  status: DemoStepLogStatus
  statusLabel: string
  methodLabel: string
  pathLabel: string
  durationLabel: string
  summary: string
  detailSections?: DemoStepLogDetail[]
}

export type ScenarioExecutionUi = {
  header: DemoExecutionHeaderData
  stepLogs: DemoStepLog[]
}
