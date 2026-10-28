'use client'

import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react'
import { LAST_SCENE_INDEX } from './constants'

type ViewportPlaybackControls = {
  pause: () => void
  resume: () => void
  replay: () => void
  sceneIndex: number
  isPlaying: boolean
}

type UseViewportScenePlaybackOptions = {
  enabled: boolean
  pendingReplayRef: MutableRefObject<boolean>
  shouldReplayRef: MutableRefObject<boolean>
  threshold?: number
}

export function useViewportScenePlayback(
  containerRef: RefObject<HTMLElement | null>,
  controls: ViewportPlaybackControls,
  {
    enabled,
    pendingReplayRef,
    shouldReplayRef,
    threshold = 0.3
  }: UseViewportScenePlaybackOptions
) {
  const controlsRef = useRef(controls)
  controlsRef.current = controls

  useEffect(() => {
    if (!enabled) {
      shouldReplayRef.current = true
      return
    }

    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const {
          pause,
          resume,
          replay,
          sceneIndex,
          isPlaying
        } = controlsRef.current

        if (entry.isIntersecting) {
          shouldReplayRef.current = true

          if (pendingReplayRef.current) {
            pendingReplayRef.current = false
            replay()
            return
          }

          if (!isPlaying) {
            if (sceneIndex >= LAST_SCENE_INDEX) {
              replay()
            } else {
              resume()
            }
          }
          return
        }

        shouldReplayRef.current = false
        if (isPlaying) {
          pause()
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled, containerRef, pendingReplayRef, shouldReplayRef, threshold])
}
