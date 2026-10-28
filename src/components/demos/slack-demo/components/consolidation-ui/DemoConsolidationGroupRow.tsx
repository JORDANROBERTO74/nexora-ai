'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DemoStatusBadge, type DemoStatusBadgeStatus } from '../shared/DemoStatusBadge'

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function resolveContractBadgeStatus(
  contractStatus?: string
): DemoStatusBadgeStatus {
  if (!contractStatus) return 'info'
  if (contractStatus.toLowerCase().includes('outside')) return 'warning'
  if (contractStatus.toLowerCase().includes('mapped')) return 'info'
  return 'info'
}

type DemoConsolidationGroupRowProps = {
  rank: number
  groupName: string
  signal: string
  contractStatus?: string
  highlighted?: boolean
  reduceMotion?: boolean
  enterDelayMs?: number
}

export function DemoConsolidationGroupRow({
  rank,
  groupName,
  signal,
  contractStatus,
  highlighted = false,
  reduceMotion: reduceMotionProp,
  enterDelayMs = 0
}: DemoConsolidationGroupRowProps) {
  const prefersReducedMotion = useReducedMotion()
  const reduceMotion = reduceMotionProp ?? !!prefersReducedMotion
  const badgeStatus = resolveContractBadgeStatus(contractStatus)
  const badgeLabel = contractStatus ?? 'Buying group'

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
          ? 'border-indigo-300/80 bg-indigo-50/50 ring-1 ring-indigo-400/20'
          : 'border-border bg-background'
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground">
            #{rank}
          </span>
          <span className="truncate text-sm font-semibold text-foreground">
            {groupName}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{signal}</p>
      </div>
      <DemoStatusBadge status={badgeStatus} label={badgeLabel} />
    </motion.li>
  )
}
