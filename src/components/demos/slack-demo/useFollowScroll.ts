"use client";

import { useCallback, useEffect, useRef, type DependencyList } from "react";
import {
  FOLLOW_SCROLL_PROGRAMMATIC_MAX_MS,
  FOLLOW_SCROLL_THRESHOLD_PX,
} from "./constants";

export type UseFollowScrollOptions = {
  enabled: boolean;
  reduceMotion?: boolean;
  threshold?: number;
  /** Scroll to bottom when follow mode turns off (before grid focus handoff). */
  flushOnDisable?: boolean;
  /** When enabled and pointer is outside the scroll container, ignore user pin and keep bottom. */
  stickyWhenUnengaged?: boolean;
};

function isNearBottom(element: HTMLElement, threshold: number): boolean {
  return (
    element.scrollHeight - element.scrollTop - element.clientHeight <= threshold
  );
}

function isContainerEngaged(
  container: HTMLElement,
  pointerDownInside: boolean,
): boolean {
  if (pointerDownInside) return true;
  if (container.matches(":hover")) return true;
  const active = document.activeElement;
  if (active && container.contains(active)) return true;
  return false;
}

function resolveScrollTop(
  container: HTMLElement,
  sentinel: HTMLElement | null,
): number {
  const maxTop = Math.max(0, container.scrollHeight - container.clientHeight);
  if (!sentinel) return maxTop;
  const top =
    sentinel.offsetTop + sentinel.offsetHeight - container.clientHeight;
  return Math.max(0, Math.min(top, maxTop));
}

/** Scroll only the panel container — never use scrollIntoView (it scrolls ancestor/page). */
function scrollContainerToSentinel(
  container: HTMLElement,
  sentinel: HTMLElement | null,
  behavior: ScrollBehavior,
): void {
  container.scrollTo({
    top: resolveScrollTop(container, sentinel),
    behavior,
  });
}

export function useFollowScroll(
  deps: DependencyList,
  {
    enabled,
    reduceMotion: _reduceMotion = false,
    threshold = FOLLOW_SCROLL_THRESHOLD_PX,
    flushOnDisable = true,
    stickyWhenUnengaged = true,
  }: UseFollowScrollOptions,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const userPinnedRef = useRef(false);
  const isProgrammaticFollowRef = useRef(false);
  const pointerDownInsideRef = useRef(false);
  const prevEnabledRef = useRef(enabled);
  const enabledRef = useRef(enabled);
  const stickyWhenUnengagedRef = useRef(stickyWhenUnengaged);
  const programmaticReleaseTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  enabledRef.current = enabled;
  stickyWhenUnengagedRef.current = stickyWhenUnengaged;

  const clearProgrammaticReleaseTimer = useCallback(() => {
    if (programmaticReleaseTimerRef.current !== null) {
      clearTimeout(programmaticReleaseTimerRef.current);
      programmaticReleaseTimerRef.current = null;
    }
  }, []);

  const releaseProgrammaticFollow = useCallback(() => {
    isProgrammaticFollowRef.current = false;
    clearProgrammaticReleaseTimer();
    const container = containerRef.current;
    if (!container) return;

    const engaged =
      !stickyWhenUnengagedRef.current ||
      isContainerEngaged(container, pointerDownInsideRef.current);

    if (engaged) {
      userPinnedRef.current = !isNearBottom(container, threshold);
    } else {
      userPinnedRef.current = false;
    }
  }, [clearProgrammaticReleaseTimer, threshold]);

  const beginProgrammaticFollow = useCallback(() => {
    isProgrammaticFollowRef.current = true;
    clearProgrammaticReleaseTimer();
    programmaticReleaseTimerRef.current = setTimeout(
      releaseProgrammaticFollow,
      FOLLOW_SCROLL_PROGRAMMATIC_MAX_MS,
    );
  }, [clearProgrammaticReleaseTimer, releaseProgrammaticFollow]);

  const performScroll = useCallback(
    (options: { force?: boolean; respectEnabled?: boolean }) => {
      const { force = false, respectEnabled = true } = options;
      if (respectEnabled && !enabledRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      const ignorePin =
        stickyWhenUnengagedRef.current &&
        enabledRef.current &&
        !isContainerEngaged(container, pointerDownInsideRef.current);

      if (!force && !ignorePin && userPinnedRef.current) return;

      beginProgrammaticFollow();
      scrollContainerToSentinel(container, bottomRef.current, "auto");

      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el && isNearBottom(el, threshold)) {
          releaseProgrammaticFollow();
        }
      });
    },
    [beginProgrammaticFollow, releaseProgrammaticFollow, threshold],
  );

  const scrollToBottom = useCallback(() => {
    performScroll({ force: false, respectEnabled: true });
  }, [performScroll]);

  const flushToBottom = useCallback(() => {
    const run = () => performScroll({ force: true, respectEnabled: false });
    run();
    requestAnimationFrame(run);
  }, [performScroll]);

  const onScroll = useCallback(() => {
    if (isProgrammaticFollowRef.current) return;
    const element = containerRef.current;
    if (!element) return;

    if (
      stickyWhenUnengagedRef.current &&
      !isContainerEngaged(element, pointerDownInsideRef.current)
    ) {
      userPinnedRef.current = false;
      return;
    }

    userPinnedRef.current = !isNearBottom(element, threshold);
  }, [threshold]);

  const resetFollow = useCallback(() => {
    userPinnedRef.current = false;
    pointerDownInsideRef.current = false;
    releaseProgrammaticFollow();
  }, [releaseProgrammaticFollow]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      const el = containerRef.current;
      if (
        !el ||
        !isProgrammaticFollowRef.current ||
        !isNearBottom(el, threshold)
      ) {
        return;
      }
      releaseProgrammaticFollow();
    };

    container.addEventListener("scrollend", onScrollEnd);
    return () => {
      container.removeEventListener("scrollend", onScrollEnd);
      clearProgrammaticReleaseTimer();
    };
  }, [threshold, releaseProgrammaticFollow, clearProgrammaticReleaseTimer]);

  useEffect(() => {
    if (!enabled) return;
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls trigger list
  }, [enabled, scrollToBottom, ...deps]);

  useEffect(() => {
    if (flushOnDisable && prevEnabledRef.current && !enabled) {
      flushToBottom();
    }
    prevEnabledRef.current = enabled;
  }, [enabled, flushOnDisable, flushToBottom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled || !stickyWhenUnengaged) return;

    const onDocumentPointerDown = (event: PointerEvent) => {
      if (!enabledRef.current || !stickyWhenUnengagedRef.current) return;
      const el = containerRef.current;
      if (!el) return;

      const target = event.target;
      if (target instanceof Node && el.contains(target)) {
        pointerDownInsideRef.current = true;
        return;
      }

      pointerDownInsideRef.current = false;
      userPinnedRef.current = false;
      performScroll({ force: true, respectEnabled: true });
    };

    const onContainerPointerDown = () => {
      pointerDownInsideRef.current = true;
    };

    const onContainerPointerLeave = () => {
      pointerDownInsideRef.current = false;
      userPinnedRef.current = false;
      scrollToBottom();
    };

    document.addEventListener("pointerdown", onDocumentPointerDown, true);
    container.addEventListener("pointerdown", onContainerPointerDown);
    container.addEventListener("pointerleave", onContainerPointerLeave);

    return () => {
      document.removeEventListener("pointerdown", onDocumentPointerDown, true);
      container.removeEventListener("pointerdown", onContainerPointerDown);
      container.removeEventListener("pointerleave", onContainerPointerLeave);
    };
  }, [enabled, stickyWhenUnengaged, performScroll, scrollToBottom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const targets = new Set<Element>();
    const firstChild = container.firstElementChild;
    if (firstChild) targets.add(firstChild);
    const sentinelParent = bottomRef.current?.parentElement;
    if (sentinelParent && sentinelParent !== container) {
      targets.add(sentinelParent);
    }

    const observer = new ResizeObserver(() => {
      if (enabledRef.current) {
        scrollToBottom();
      }
    });

    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [enabled, scrollToBottom]);

  return { containerRef, bottomRef, onScroll, resetFollow };
}
