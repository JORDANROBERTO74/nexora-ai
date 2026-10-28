import type {
  ApprovalAction,
  OpportunitySummaryCopy,
  ScenarioBundle,
  ScenarioData,
  SourceSignal
} from '../types'
import { DEMO_GOVERNANCE_EVENTS, SLACK_LINK_LABELS } from './shared'
import {
  buildScenarioApprovalUi,
  workflowStepsToApprovalActions
} from './buildApprovalUi'
import { buildScenarioExecutionUi } from './buildExecutionUi'
import { buildScenarioOpportunityUi } from './buildOpportunityUi'
import {
  buildStubRiskUi,
  getStubConsolidationSummary,
  getStubConsolidationUi,
  getStubRiskSummary
} from './scenarioStubs'

export const EXPANSION_SCENARIO_DATA: ScenarioData = {
  channel: '#sales',
  background:
    'A sales manager asks in #sales which existing customers are ready for an upgrade this week. The team would normally dig through usage, CRM, and billing manually. They mention @revenue to find expansion opportunities live.',
  slackMessages: [
    {
      id: 'msg-1',
      author: 'Jordan Lee',
      content:
        'Which existing customers are ready for an upgrade this week?',
      timestamp: '2:04 PM'
    },
    {
      id: 'msg-2',
      author: 'Morgan Blake',
      content: 'I would have to dig through usage and CRM manually.',
      timestamp: '2:06 PM'
    },
    {
      id: 'msg-3',
      author: 'Alex Rivera',
      content: 'Same — billing and product signals are all over the place.',
      timestamp: '2:08 PM'
    },
    {
      id: 'msg-4',
      author: 'Jordan Lee',
      content: '@revenue find expansion opportunities',
      timestamp: '2:11 PM'
    }
  ],
  sourceEvidence: [
    { label: 'Product usage', value: '+38% API volume (7d)' },
    {
      label: 'Feature interest',
      value: '3 users viewed Advanced Security docs'
    },
    { label: 'Support', value: 'Premium feature requests up' },
    { label: 'CRM', value: 'Stage: Expansion candidate' },
    { label: 'Billing', value: 'Growth plan · Advanced Security not included' }
  ],
  agentResult:
    'Top opportunity: Acme. Usage is up 38%, three users searched for Advanced Security, and their current plan does not include it. Suggested next step: Offer Advanced Security as a natural upgrade based on their current growth.',
  governanceEvents: [...DEMO_GOVERNANCE_EVENTS]
}

const EXPANSION_OPPORTUNITY_SUMMARY: OpportunitySummaryCopy = {
  headline: 'Expansion opportunities · This week',
  topAccount: 'Acme',
  fitLabel: 'Expansion fit',
  fitFinal: 'Strong',
  fitReviewing: 'Ranking…',
  confidence: '94%',
  recommendedAction:
    'Offer Advanced Security as a natural upgrade based on current growth.',
  rankedAccounts: [
    {
      rank: 1,
      account: 'Acme',
      fitScore: 94,
      signal: 'Advanced Security interest · plan gap',
      usageDelta: '+38% usage'
    },
    {
      rank: 2,
      account: 'Northwind',
      fitScore: 78,
      signal: 'Usage growth · upgrade candidate',
      usageDelta: '+12% usage'
    },
    {
      rank: 3,
      account: 'Contoso',
      fitScore: 71,
      signal: 'Doc views + trial usage',
      usageDelta: '+9% usage'
    }
  ],
  signalsSummary: 'Usage up · Feature intent · Plan gap on Advanced Security'
}

const EXPANSION_APPROVAL_ACTIONS: ApprovalAction[] = [
  { id: 'ae', label: 'Account Executive notified' },
  { id: 'talk-track', label: 'Talk track generated' },
  { id: 'draft', label: 'Draft reply prepared' }
]

function buildExpansionSourceSignals(data: ScenarioData): SourceSignal[] {
  return [
    {
      id: 'product-usage',
      label: 'Product usage',
      evidenceLine: '+38% API volume',
      detail: data.sourceEvidence[0].value,
      icon: 'trendingUp'
    },
    {
      id: 'feature-interest',
      label: 'Feature interest',
      evidenceLine: 'Advanced Security doc views',
      detail: data.sourceEvidence[1].value,
      icon: 'bookOpen'
    },
    {
      id: 'support',
      label: 'Support',
      evidenceLine: 'premium feature requests',
      detail: data.sourceEvidence[2].value,
      icon: 'ticket'
    },
    {
      id: 'crm',
      label: 'CRM',
      evidenceLine: 'expansion candidate stage',
      detail: data.sourceEvidence[3].value,
      icon: 'calendar'
    },
    {
      id: 'billing',
      label: 'Billing',
      evidenceLine: 'plan gap · Advanced Security',
      detail: data.sourceEvidence[4].value,
      icon: 'creditCard'
    }
  ]
}

export function buildExpansionBundle(): ScenarioBundle {
  const data = EXPANSION_SCENARIO_DATA
  const opportunitySummary = { ...EXPANSION_OPPORTUNITY_SUMMARY }
  const channelInstructions = {
    channel: data.channel,
    summary: 'Revenue agent context: #sales expansion ranking playbook'
  }
  const opportunityUi = buildScenarioOpportunityUi(data, opportunitySummary, {
    conceptKey: 'customer.expansion_opportunity',
    namespace: 'integrations.channels',
    sourceTypeKey: 'thread',
    groundingStatus: 'grounded',
    groundingStrength: 'strong',
    extraWarnings: ['Billing change requires policy check before send']
  })
  const approvalUi = buildScenarioApprovalUi(
    {
      account: opportunitySummary.topAccount,
      confidence: opportunitySummary.confidence
    },
    EXPANSION_APPROVAL_ACTIONS,
    {
      context: 'Governed · sales action',
      decisionSummary: `${opportunitySummary.topAccount} · Top expansion · ${opportunitySummary.confidence} fit`
    }
  )

  return {
    id: 'expansion',
    panelKind: 'opportunity',
    mentionToken: '@revenue',
    agentLabel: 'Revenue Agent',
    data,
    channelInstructions,
    executionUi: buildScenarioExecutionUi(data, {
      refId: 'exec_channel_acme_expansion',
      actor: 'Revenue Agent',
      headlineAction: 'Find expansion opportunities',
      headlineTarget: 'Acme · top expansion fit',
      feedTarget: 'running channels_sales::rankExpansionOpportunities',
      targetSecondary: '@revenue · governed #sales thread',
      stepLogPaths: [
        {
          method: 'GET',
          path: '/integrations/product/usage',
          summary: 'Query product usage'
        },
        {
          method: 'GET',
          path: '/integrations/docs/views',
          summary: 'Query feature interest signals'
        },
        {
          method: 'GET',
          path: '/integrations/support/tickets',
          summary: 'Query support requests'
        },
        {
          method: 'GET',
          path: '/integrations/crm/opportunities',
          summary: 'Query CRM stage'
        },
        {
          method: 'GET',
          path: '/integrations/billing/plans',
          summary: 'Query billing plan'
        }
      ]
    }),
    sourceSignals: buildExpansionSourceSignals(data),
    riskSummary: getStubRiskSummary(),
    riskUi: buildStubRiskUi(data),
    opportunitySummary,
    opportunityUi,
    consolidationSummary: getStubConsolidationSummary(),
    consolidationUi: getStubConsolidationUi(),
    approvalActions: workflowStepsToApprovalActions(approvalUi.workflowSteps),
    approvalUi,
    slackSourcePreview: {
      channel: data.channel,
      summary: 'Agent reply posted · expansion opportunities ranked',
      ...SLACK_LINK_LABELS
    },
    slackComposerPlaceholder: `Message ${data.channel}`,
    preMentionMessageCount: 3
  }
}
