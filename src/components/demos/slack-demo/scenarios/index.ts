import type { ScenarioBundle, ScenarioData, ScenarioId } from '../types'
import { buildChurnBundle } from './churn'
import { buildConsolidationBundle } from './consolidation'
import { buildExpansionBundle } from './expansion'
import { buildMigrationBundle } from './migration'

export { SCENARIO_OPTIONS } from './labels'

const SCENARIO_BUNDLES: Record<ScenarioId, ScenarioBundle> = {
  churn: buildChurnBundle(),
  migration: buildMigrationBundle(),
  expansion: buildExpansionBundle(),
  consolidation: buildConsolidationBundle()
}

/** Returns full demo data for churn or migration (used by separate landing demos). */
export function getScenarioBundle(id: ScenarioId): ScenarioBundle {
  return SCENARIO_BUNDLES[id]
}

export function getScenarioData(id: ScenarioId): ScenarioData {
  return SCENARIO_BUNDLES[id].data
}
