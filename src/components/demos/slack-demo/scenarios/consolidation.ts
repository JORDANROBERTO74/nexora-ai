import type {
  ApprovalAction,
  ConsolidationSummaryCopy,
  ScenarioBundle,
  ScenarioData,
  SourceSignal
} from '../types'
import { DEMO_GOVERNANCE_EVENTS, SLACK_LINK_LABELS } from './shared'
import {
  buildScenarioApprovalUi,
  workflowStepsToApprovalActions
} from './buildApprovalUi'
import { buildScenarioConsolidationUi } from './buildConsolidationUi'
import { buildScenarioExecutionUi } from './buildExecutionUi'
import {
  buildStubRiskUi,
  getStubOpportunitySummary,
  getStubOpportunityUi,
  getStubRiskSummary
} from './scenarioStubs'

export const CONSOLIDATION_SCENARIO_DATA: ScenarioData = {
  channel: '#revops',
  background:
    'In #revops, Finance notes billing records for Acme that are not attached to the main enterprise contract. Sales suspects separate teams are buying independently. The RevOps lead mentions @revenue to check account consolidation live.',
  slackMessages: [
    {
      id: 'msg-1',
      author: 'Taylor Kim',
      content:
        'We have three new Acme billing records that are not on the enterprise master agreement.',
      timestamp: '11:02 AM'
    },
    {
      id: 'msg-2',
      author: 'Riley Chen',
      content: 'Sounds like different teams might be buying on their own.',
      timestamp: '11:05 AM'
    },
    {
      id: 'msg-3',
      author: 'Sam Ortiz',
      content: 'Cross-checking billing, CRM, and usage manually would take hours.',
      timestamp: '11:08 AM'
    },
    {
      id: 'msg-4',
      author: 'Jordan Lee',
      content: '@revenue check account consolidation for Acme',
      timestamp: '11:12 AM'
    }
  ],
  sourceEvidence: [
    {
      label: 'Billing',
      value: '3 records outside master enterprise agreement'
    },
    { label: 'CRM', value: '3 child accounts · shared parent Acme' },
    {
      label: 'Product usage',
      value: 'Active workloads in unmanaged project environments'
    },
    {
      label: 'Account ownership',
      value: 'Shared domains · aligned billing patterns'
    },
    {
      label: 'Business map',
      value: 'Parent ↔ buying group relationships mapped'
    }
  ],
  agentResult:
    'Acme has three active buying groups outside the master agreement. Combined usage supports an enterprise-wide agreement discussion. Suggested next step: Schedule an enterprise agreement review with the Account Executive.',
  governanceEvents: [...DEMO_GOVERNANCE_EVENTS]
}

const CONSOLIDATION_SUMMARY: ConsolidationSummaryCopy = {
  headline: 'Account consolidation · Acme',
  parentAccount: 'Acme',
  groupLabel: 'Buying groups',
  groupFinal: '3 mapped',
  groupReviewing: 'Mapping…',
  confidence: '88%',
  recommendedAction:
    'Schedule an enterprise-wide agreement discussion based on combined usage across buying groups.',
  buyingGroups: [
    {
      rank: 1,
      groupName: 'Platform Engineering',
      signal: 'Outside master agreement · active usage',
      contractStatus: 'Outside agreement'
    },
    {
      rank: 2,
      groupName: 'Data Science',
      signal: 'Separate billing · shared domain',
      contractStatus: 'Outside agreement'
    },
    {
      rank: 3,
      groupName: 'Security Ops',
      signal: 'New project · similar billing pattern',
      contractStatus: 'Mapped'
    }
  ],
  signalsSummary:
    'Billing split · Shared parent · Combined usage supports enterprise deal'
}

const CONSOLIDATION_APPROVAL_ACTIONS: ApprovalAction[] = [
  { id: 'ae', label: 'Account Executive notified' },
  { id: 'talk-track', label: 'Enterprise talk track generated' },
  { id: 'draft', label: 'Draft reply prepared' }
]

function buildConsolidationSourceSignals(data: ScenarioData): SourceSignal[] {
  return [
    {
      id: 'billing',
      label: 'Billing',
      evidenceLine: 'outside master agreement',
      detail: data.sourceEvidence[0].value,
      icon: 'creditCard'
    },
    {
      id: 'crm',
      label: 'CRM',
      evidenceLine: 'child accounts mapped',
      detail: data.sourceEvidence[1].value,
      icon: 'calendar'
    },
    {
      id: 'usage',
      label: 'Product usage',
      evidenceLine: 'unmanaged projects',
      detail: data.sourceEvidence[2].value,
      icon: 'infrastructure'
    },
    {
      id: 'ownership',
      label: 'Account ownership',
      evidenceLine: 'shared domains',
      detail: data.sourceEvidence[3].value,
      icon: 'history'
    },
    {
      id: 'business-map',
      label: 'Business map',
      evidenceLine: 'parent ↔ buying groups',
      detail: data.sourceEvidence[4].value,
      icon: 'bookOpen'
    }
  ]
}

export function buildConsolidationBundle(): ScenarioBundle {
  const data = CONSOLIDATION_SCENARIO_DATA
  const consolidationSummary = { ...CONSOLIDATION_SUMMARY }
  const channelInstructions = {
    channel: data.channel,
    summary: 'Revenue agent context: #revops account consolidation playbook'
  }
  const consolidationUi = buildScenarioConsolidationUi(data, consolidationSummary, {
    conceptKey: 'customer.account_consolidation',
    namespace: 'integrations.channels',
    sourceTypeKey: 'thread',
    groundingStatus: 'grounded',
    groundingStrength: 'strong',
    extraWarnings: ['Enterprise pricing change requires policy check before send']
  })
  const approvalUi = buildScenarioApprovalUi(
    {
      account: consolidationSummary.parentAccount,
      confidence: consolidationSummary.confidence
    },
    CONSOLIDATION_APPROVAL_ACTIONS,
    {
      context: 'Governed · enterprise action',
      decisionSummary: `${consolidationSummary.parentAccount} · 3 buying groups · enterprise agreement path`
    }
  )

  return {
    id: 'consolidation',
    panelKind: 'consolidation',
    mentionToken: '@revenue',
    agentLabel: 'Revenue Agent',
    data,
    channelInstructions,
    executionUi: buildScenarioExecutionUi(data, {
      refId: 'exec_channel_acme_consolidation',
      actor: 'Revenue Agent',
      headlineAction: 'Check account consolidation',
      headlineTarget: 'Acme · enterprise agreement path',
      feedTarget: 'running revops::mapAccountConsolidation',
      targetSecondary: '@revenue · governed #revops thread',
      stepLogPaths: [
        {
          method: 'GET',
          path: '/integrations/billing/contracts',
          summary: 'Query billing contracts'
        },
        {
          method: 'GET',
          path: '/integrations/crm/accounts',
          summary: 'Query CRM accounts'
        },
        {
          method: 'GET',
          path: '/integrations/product/usage',
          summary: 'Query product usage'
        },
        {
          method: 'GET',
          path: '/integrations/crm/ownership',
          summary: 'Query account ownership'
        },
        {
          method: 'GET',
          path: '/integrations/business_map/relationships',
          summary: 'Query business map relationships'
        }
      ]
    }),
    sourceSignals: buildConsolidationSourceSignals(data),
    riskSummary: getStubRiskSummary(),
    riskUi: buildStubRiskUi(data),
    opportunitySummary: getStubOpportunitySummary(),
    opportunityUi: getStubOpportunityUi(),
    consolidationSummary,
    consolidationUi,
    approvalActions: workflowStepsToApprovalActions(approvalUi.workflowSteps),
    approvalUi,
    slackSourcePreview: {
      channel: data.channel,
      summary: 'Agent reply posted · buying groups mapped',
      ...SLACK_LINK_LABELS
    },
    slackComposerPlaceholder: `Message ${data.channel}`,
    preMentionMessageCount: 3
  }
}
