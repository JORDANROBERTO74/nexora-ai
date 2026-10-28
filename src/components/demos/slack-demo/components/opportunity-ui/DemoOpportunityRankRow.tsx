'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DemoStatusBadge } from '../shared/DemoStatusBadge'

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type DemoOpportunityRankRowProps = {
  rank: number
  account: string
  fitScore: number
  signal: string
  usageDelta?: string
  highlighted?: boolean
  reduceMotion?: boolean
  enterDelayMs?: number
}

export function DemoOpportunityRankRow({
  rank,
  account,
  fitScore,
  signal,
  usageDelta,
  highlighted = false,
  reduceMotion: reduceMotionProp,
  enterDelayMs = 0
}: DemoOpportunityRankRowProps) {
  const prefersReducedMotion = useReducedMotion()
  const reduceMotion = reduceMotionProp ?? !!prefersReducedMotion
  const fitStatus = fitScore >= 85 ? 'success' : fitScore >= 70 ? 'info' : 'warning'

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.48,
        ease: ENTRY_EASE,
        delay: reduceMotion ? 0 : enterDelayMs / 1000
      }}
      className={cn(
        'flex items-start justify-between gap-3 rounded-md border p-2.5',
        highlighted
          ? 'border-emerald-300/80 bg-emerald-50/50 ring-1 ring-emerald-400/20'
          : 'border-border bg-background'
      )}
    >
      <motion.div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground">
            #{rank}
          </span>
          <span className="truncate text-sm font-semibold text-foreground">
            {account}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{signal}</p>
        {usageDelta ? (
          <p className="mt-0.5 text-[11px] font-medium text-emerald-700">
            {usageDelta}
          </p>
        ) : null}
      </motion.div>
      <DemoStatusBadge status={fitStatus} label={`${fitScore}% fit`} />
    </motion.li>
  )
}
