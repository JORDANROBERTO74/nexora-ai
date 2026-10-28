'use client'

import { TrendingUp } from 'lucide-react'
import type { DemoOpportunityGroundingData } from './types'
import { DemoGroundingBadge } from '../risk-ui/DemoGroundingBadge'
import {
  formatGroundingStatusLabel,
  formatGroundingStrengthLabel,
  resolveGroundingStatusTone,
  resolveGroundingStrengthTone
} from '../risk-ui/groundingTone'

type DemoOpportunityGroundingCardProps = {
  data: DemoOpportunityGroundingData
  headline: string
}

export function DemoOpportunityGroundingCard({
  data,
  headline
}: DemoOpportunityGroundingCardProps) {
  const statusTone = resolveGroundingStatusTone(data.groundingStatus)
  const strengthTone = resolveGroundingStrengthTone(data.groundingStrength)

  return (
    <div className="min-w-0 w-full rounded-md border border-border bg-background p-3">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {headline}
      </p>
      <p className="mb-3 truncate text-lg font-semibold text-foreground">
        {data.account}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
        <span className="text-[11px] font-semibold text-foreground">
          Expansion opportunity
        </span>
        {data.conceptKey ? (
          <DemoGroundingBadge label={data.conceptKey} />
        ) : null}
        {data.groundingStatus ? (
          <DemoGroundingBadge
            label={formatGroundingStatusLabel(data.groundingStatus)}
            tone={statusTone}
          />
        ) : null}
        {data.groundingStrength ? (
          <DemoGroundingBadge
            label={formatGroundingStrengthLabel(data.groundingStrength)}
            tone={strengthTone}
          />
        ) : null}
        <DemoGroundingBadge label={`Fit: ${data.fitLevel}`} tone="good" />
      </div>
      <div className="mt-2 grid min-w-0 gap-2 text-[11px] text-muted-foreground sm:grid-cols-2">
        <div className="min-w-0 truncate">
          <span className="text-muted-foreground/70">Source: </span>
          {data.namespace}.{data.sourceTypeKey}
        </div>
        <div className="min-w-0 truncate">
          <span className="text-muted-foreground/70">Mode: </span>
          {data.readWriteMode}
        </div>
      </div>
    </div>
  )
}
