'use client'

import { motion } from 'framer-motion'
import {
  isOpportunitySectionVisible,
  visibleRankCount
} from '../../opportunityState'
import type { ScenarioOpportunityUi } from './types'
import { DemoOpportunityGroundingCard } from './DemoOpportunityGroundingCard'
import { DemoOpportunityRankRow } from './DemoOpportunityRankRow'

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type DemoOpportunityRankPanelProps = {
  opportunityUi: ScenarioOpportunityUi
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

export function DemoOpportunityRankPanel({
  opportunityUi,
  buildStep,
  reduceMotion
}: DemoOpportunityRankPanelProps) {
  const maxRank = visibleRankCount(buildStep)
  const visibleRows = opportunityUi.rankedAccounts.filter(
    row => row.rank <= maxRank
  )

  return (
    <div
      className="min-w-0 w-full max-w-full space-y-3"
      aria-live="polite"
      aria-label="Expansion opportunities"
    >
      <SectionReveal
        visible={isOpportunitySectionVisible('grounding', buildStep)}
        reduceMotion={reduceMotion}
      >
        <DemoOpportunityGroundingCard
          data={opportunityUi.grounding}
          headline={opportunityUi.headline}
        />
      </SectionReveal>

      <SectionReveal
        visible={isOpportunitySectionVisible('ranks', buildStep)}
        reduceMotion={reduceMotion}
      >
        <ul className="space-y-2" role="list">
          {visibleRows.map((row, index) => (
            <DemoOpportunityRankRow
              key={row.account}
              rank={row.rank}
              account={row.account}
              fitScore={row.fitScore}
              signal={row.signal}
              usageDelta={row.usageDelta}
              highlighted={row.rank === 1}
              reduceMotion={reduceMotion}
              enterDelayMs={reduceMotion ? 0 : index * 80}
            />
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal
        visible={isOpportunitySectionVisible('action', buildStep)}
        reduceMotion={reduceMotion}
      >
        <div className="rounded-md border border-emerald-200/80 bg-emerald-50/40 p-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
            Recommended action
          </p>
          <p className="mt-1 text-sm text-foreground/90">
            {opportunityUi.recommendedAction}
          </p>
        </div>
        <p className="mt-2 break-words text-xs text-muted-foreground">
          {opportunityUi.signalsSummary}
        </p>
      </SectionReveal>
    </div>
  )
}
