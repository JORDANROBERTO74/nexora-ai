'use client'

import SlackRevenueDemo from './slack-demo/SlackRevenueDemo'
import type { ScenarioId } from './slack-demo/types'

type SlackAgentDemoProps = {
  scenario: ScenarioId
}

export default function SlackAgentDemo({ scenario }: SlackAgentDemoProps) {
  return (
    <div className="kh-slack-demo w-full">
      <SlackRevenueDemo scenario={scenario} playback="viewport" />
    </div>
  )
}
