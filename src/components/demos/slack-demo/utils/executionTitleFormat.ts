/**
 * Minimal port of automation execution title formatting
 * (fractal_grid_nextjs/app/automation/executions/utils/formatters.ts).
 */

const KNOWN_EXECUTION_STATUSES = new Set([
  'success',
  'error',
  'running',
  'warning',
  'info',
  'failed',
  'pending',
  'completed',
  'cancelled'
])

function humanizeCamelCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function toTitleCaseWords(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function humanizeDomainOperation(target: string) {
  const match = target.match(/^([a-z0-9-]+)::([A-Za-z0-9_]+)$/i)
  if (!match) return null
  const rawDomain = toTitleCaseWords(humanizeCamelCase(match[1]))
  const domain = rawDomain
    .replace(/\bApi\b/g, 'API')
    .replace(/\bHttp\b/g, 'HTTP')
  const operation = toTitleCaseWords(humanizeCamelCase(match[2]))
  return `${domain} · ${operation}`
}

function extractLeadingStatus(target: string) {
  const match = target.match(/^([a-z]+)\s+(.+)$/i)
  if (!match) {
    return { leadingStatus: undefined as string | undefined, remainder: target }
  }
  const candidate = match[1].toLowerCase()
  if (!KNOWN_EXECUTION_STATUSES.has(candidate)) {
    return { leadingStatus: undefined as string | undefined, remainder: target }
  }
  return { leadingStatus: candidate, remainder: match[2].trim() }
}

function summarizeExecutionTarget(rawTarget: string) {
  const normalized = (rawTarget || '').trim()
  const { leadingStatus, remainder } = extractLeadingStatus(normalized)
  const normalizedForSummary = remainder || normalized

  const endpointSummary = humanizeDomainOperation(normalizedForSummary)
  if (endpointSummary) {
    return {
      normalizedPrimary: endpointSummary,
      leadingStatus
    }
  }

  return {
    normalizedPrimary: toTitleCaseWords(humanizeCamelCase(normalizedForSummary)),
    leadingStatus
  }
}

export function buildDemoExecutionTitleParts(action: string, rawTarget: string) {
  const targetSummary = summarizeExecutionTarget(rawTarget)
  const normalizedAction = (action || '').trim()
  const actionLower = normalizedAction.toLowerCase()
  const statusForTitle =
    targetSummary.leadingStatus &&
    targetSummary.leadingStatus === actionLower
      ? targetSummary.leadingStatus
      : normalizedAction

  const actionLabel = toTitleCaseWords(
    humanizeCamelCase(statusForTitle || 'Execution')
  )
  const targetLabel = targetSummary.normalizedPrimary

  return { actionLabel, targetLabel }
}
