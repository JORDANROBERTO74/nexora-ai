import type { ScenarioId } from '../types'

export const SCENARIO_OPTIONS = [
  { id: 'churn' as const, label: 'Churn risk' },
  { id: 'migration' as const, label: 'Silent migration' },
  { id: 'expansion' as const, label: 'Expansion opportunities' },
  { id: 'consolidation' as const, label: 'Account consolidation' }
] satisfies ReadonlyArray<{ id: ScenarioId; label: string }>
