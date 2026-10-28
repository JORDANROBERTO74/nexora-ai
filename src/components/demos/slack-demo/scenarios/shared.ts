/** Shared governance timeline events (same product flow for churn and migration demos). */
export const DEMO_GOVERNANCE_EVENTS = [
  'channel.message.received',
  'channel.user.linked',
  'agent.resolved',
  'channel.instructions.loaded',
  'agent.execution.started',
  'sources.queried',
  'agent.decision.recorded',
  'agent.reply.sent'
] as const

export const SLACK_LINK_LABELS = {
  linkLabel: 'View channel thread',
  backToSummaryLabel: 'Back to summary'
} as const
