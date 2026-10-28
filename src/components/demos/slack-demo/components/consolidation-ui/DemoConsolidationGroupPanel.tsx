'use client'

import { motion } from 'framer-motion'
import {
  isConsolidationSectionVisible,
  visibleGroupCount
} from '../../consolidationState'
import type { ScenarioConsolidationUi } from './types'
import { DemoDecisionDetailsGrid } from '../risk-ui/DemoDecisionDetailsGrid'
import { DemoConsolidationGroundingCard } from './DemoConsolidationGroundingCard'
import { DemoConsolidationGroupRow } from './DemoConsolidationGroupRow'

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type DemoConsolidationGroupPanelProps = {
  consolidationUi: ScenarioConsolidationUi
  buildStep: number
  reduceMotion: boolean
}

function SectionReveal({
  visible,
  reduceMotion,
  children
}: {
  visible: boolean
  reduceMotion: boolean
  children: React.ReactNode
}) {
  if (!visible) return null

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: ENTRY_EASE }}
      className="min-w-0 w-full"
    >
      {children}
    </motion.div>
  )
}

export function DemoConsolidationGroupPanel({
  consolidationUi,
  buildStep,
  reduceMotion
}: DemoConsolidationGroupPanelProps) {
  const maxRank = visibleGroupCount(buildStep)
  const visibleRows = consolidationUi.buyingGroups.filter(
    row => row.rank <= maxRank
  )

  return (
    <div
      className="min-w-0 w-full max-w-full space-y-3"
      aria-live="polite"
      aria-label="Account consolidation"
    >
      <SectionReveal
        visible={isConsolidationSectionVisible('grounding', buildStep)}
        reduceMotion={reduceMotion}
      >
        <DemoConsolidationGroundingCard
          data={consolidationUi.grounding}
          headline={consolidationUi.headline}
        />
      </SectionReveal>

      <SectionReveal
        visible={isConsolidationSectionVisible('groups', buildStep)}
        reduceMotion={reduceMotion}
      >
        {consolidationUi.details.length > 0 ? (
          <DemoDecisionDetailsGrid fields={consolidationUi.details} />
        ) : null}
        <ul className="mt-3 space-y-2" role="list">
          {visibleRows.map((row, index) => (
            <DemoConsolidationGroupRow
              key={row.groupName}
              rank={row.rank}
              groupName={row.groupName}
              signal={row.signal}
              contractStatus={row.contractStatus}
              highlighted={row.rank === 1}
              reduceMotion={reduceMotion}
              enterDelayMs={reduceMotion ? 0 : index * 80}
            />
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal
        visible={isConsolidationSectionVisible('action', buildStep)}
        reduceMotion={reduceMotion}
      >
        <div className="rounded-md border border-indigo-200/80 bg-indigo-50/40 p-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-900">
            Recommended action
          </p>
          <p className="mt-1 text-sm text-foreground/90">
            {consolidationUi.recommendedAction}
          </p>
        </div>
        <p className="mt-2 break-words text-xs text-muted-foreground">
          {consolidationUi.signalsSummary}
        </p>
      </SectionReveal>
    </div>
  )
}
