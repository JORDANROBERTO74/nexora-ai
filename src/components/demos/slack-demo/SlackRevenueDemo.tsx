'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ScenarioId } from './types'
import { getScenarioBundle } from './scenarios'
import { useSceneEngine } from './useSceneEngine'
import { useViewportScenePlayback } from './useViewportScenePlayback'
import {
  getDemoGridClass,
  getFocusedZone,
  isCompleteState
} from './completeState'
import { GRID_LAYOUT_EASE, GRID_LAYOUT_TRANSITION_MS } from './constants'
import SlackThreadMock from './components/slack/SlackThreadMock'
import OrchestrationPanel from './components/orchestration/OrchestrationPanel'
import OutcomePanel from './components/outcome/OutcomePanel'

export type SlackDemoPlayback = 'immediate' | 'viewport'

type SlackRevenueDemoProps = {
  scenario?: ScenarioId
  playback?: SlackDemoPlayback
}

export default function SlackRevenueDemo({
  scenario = 'churn',
  playback = 'immediate'
}: SlackRevenueDemoProps) {
  const [runId, setRunId] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const effectiveReduceMotion = !!prefersReducedMotion
  const viewportPlayback = playback === 'viewport' && !effectiveReduceMotion

  const containerRef = useRef<HTMLDivElement>(null)
  const replayRef = useRef<(() => void) | null>(null)
  const shouldReplayRef = useRef(viewportPlayback ? false : true)
  const pendingReplayRef = useRef(false)

  const bundle = useMemo(() => getScenarioBundle(scenario), [scenario])
  const panelKey = `${scenario}-${runId}`

  const handleRunComplete = useCallback(() => {
    setRunId(n => n + 1)
    if (shouldReplayRef.current) {
      replayRef.current?.()
    } else {
      pendingReplayRef.current = true
    }
  }, [])

  const {
    currentState,
    sceneIndex,
    isPlaying,
    pause,
    resume,
    replay
  } = useSceneEngine({
    reduceMotion: effectiveReduceMotion,
    autoStart: !viewportPlayback,
    onRunComplete: handleRunComplete
  })

  replayRef.current = replay

  useViewportScenePlayback(
    containerRef,
    { pause, resume, replay, sceneIndex, isPlaying },
    {
      enabled: viewportPlayback,
      pendingReplayRef,
      shouldReplayRef
    }
  )

  const isComplete = isCompleteState(currentState)
  const slackFocused = getFocusedZone(currentState) === 'slack'
  const gridClass = getDemoGridClass(currentState)

  const gridLayoutTransition = effectiveReduceMotion
    ? { layout: { duration: 0 } }
    : {
        layout: {
          duration: GRID_LAYOUT_TRANSITION_MS / 1000,
          ease: GRID_LAYOUT_EASE
        }
      }

  return (
    <motion.div
      ref={containerRef}
      className="flex min-h-[480px] flex-col gap-4 p-4 sm:p-6"
    >
      <motion.div
        layout
        transition={gridLayoutTransition}
        className={cn(
          'grid flex-1 gap-3 grid-cols-1 items-stretch lg:items-stretch',
          gridClass
        )}
      >
        <motion.div className="order-1 flex min-h-0 min-w-0 flex-col">
          <SlackThreadMock
            key={`slack-${panelKey}`}
            bundle={bundle}
            currentState={currentState}
            runId={runId}
            reduceMotion={effectiveReduceMotion}
            dominant={slackFocused}
          />
        </motion.div>
        <motion.div className="order-2 flex min-h-0 min-w-0 flex-col">
          <OrchestrationPanel
            key={`orch-${panelKey}`}
            bundle={bundle}
            currentState={currentState}
            runId={runId}
            reduceMotion={effectiveReduceMotion}
            className={cn(isComplete && 'lg:opacity-95')}
          />
        </motion.div>
        <motion.div className="order-3 flex min-h-0 min-w-0 flex-col">
          <OutcomePanel
            key={`outcome-${panelKey}`}
            bundle={bundle}
            currentState={currentState}
            runId={runId}
            reduceMotion={effectiveReduceMotion}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
