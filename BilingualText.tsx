import React, { useSyncExternalStore } from "react";

type Props = {
  en: string;
  es: string;
  /** Kept for API compatibility. All bilingual text shares one 4.5s clock. */
  intervalMs?: number;
  className?: string;
};

const DEFAULT_CYCLE_MS = 4500;

// One shared language clock prevents adjacent BilingualText fragments from
// entering different languages because of independent visibility observers.
let spanish = false;
let timer: number | undefined;
let introListenerAttached = false;
const listeners = new Set<() => void>();

function notifyLanguageChange() {
  spanish = !spanish;
  listeners.forEach(listener => listener());
}

function startLanguageClock() {
  if (timer !== undefined || listeners.size === 0) return;
  timer = window.setInterval(notifyLanguageChange, DEFAULT_CYCLE_MS);
}

function handleIntroDone() {
  document.removeEventListener("intro:done", handleIntroDone);
  introListenerAttached = false;
  startLanguageClock();
}

function ensureLanguageClock() {
  if (document.documentElement.dataset.introPending === "true") {
    if (!introListenerAttached) {
      introListenerAttached = true;
      document.addEventListener("intro:done", handleIntroDone);
    }
    return;
  }

  startLanguageClock();
}

function subscribeToLanguage(listener: () => void) {
  listeners.add(listener);
  ensureLanguageClock();

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
      if (introListenerAttached) {
        document.removeEventListener("intro:done", handleIntroDone);
        introListenerAttached = false;
      }
    }
  };
}

function getLanguageSnapshot() {
  return spanish;
}

export default function BilingualText({ en, es, className = "" }: Props) {
  const isSpanish = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getLanguageSnapshot
  );

  return (
    <span
      className={`bilingual-motion ${className}`}
      lang={isSpanish ? "es" : "en"}
      aria-label={isSpanish ? es : en}
    >
      <span
        className={`bilingual-motion__layer bilingual-motion__english ${isSpanish ? "is-hidden" : "is-visible"}`}
        aria-hidden="true"
        lang="en"
      >
        {en}
      </span>
      <span
        className={`bilingual-motion__layer bilingual-motion__spanish ${isSpanish ? "is-visible" : "is-hidden"}`}
        aria-hidden="true"
        lang="es"
      >
        {es}
      </span>
    </span>
  );
}
