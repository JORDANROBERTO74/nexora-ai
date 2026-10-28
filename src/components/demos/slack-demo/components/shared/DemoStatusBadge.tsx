import { Activity, AlertCircle, CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DemoStatusBadgeStatus =
  | 'success'
  | 'warning'
  | 'error'
  | 'running'
  | 'info'

const styles: Record<DemoStatusBadgeStatus, string> = {
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  running: 'bg-primary/10 text-primary border-primary/20',
  info: 'bg-primary/10 text-primary border-primary/20'
}

const icons = {
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
  running: Loader2,
  info: Activity
} as const

type DemoStatusBadgeProps = {
  status: DemoStatusBadgeStatus
  label: string
  className?: string
}

export function DemoStatusBadge({ status, label, className }: DemoStatusBadgeProps) {
  const Icon = icons[status]
  const isSpinning = status === 'running'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium',
        styles[status],
        className
      )}
    >
      <Icon size={11} className={cn(isSpinning && 'animate-spin')} aria-hidden />
      {label}
    </span>
  )
}
