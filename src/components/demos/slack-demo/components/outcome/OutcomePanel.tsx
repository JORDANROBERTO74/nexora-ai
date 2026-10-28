'use client'

import type { ScenarioBundle, SlackRevenueDemoState } from '../../types'
import ConsolidationPanel from '../consolidation/ConsolidationPanel'
import OpportunityPanel from '../opportunity/OpportunityPanel'
import RiskPanel from '../risk/RiskPanel'

type OutcomePanelProps = {
  bundle: ScenarioBundle
  currentState: SlackRevenueDemoState
  runId?: number
  dominant?: boolean
  className?: string
  reduceMotion: boolean
}

export default function OutcomePanel({
  bundle,
  ...props
}: OutcomePanelProps) {
  if (bundle.panelKind === 'consolidation') {
    return <ConsolidationPanel bundle={bundle} {...props} />
  }

  if (bundle.panelKind === 'opportunity') {
    return <OpportunityPanel bundle={bundle} {...props} />
  }

  return <RiskPanel bundle={bundle} {...props} />
}
