import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  en: string;
  es: string;
  /** Minimum time the English version stays readable before changing. */
  delay?: number;
  className?: string;
};

const SPANISH_HOLD_MS = 120_000;

/**
 * Each phrase owns its own viewport lifecycle:
 * English on entry -> Spanish after a readable pause -> English after two minutes.
 * Leaving the viewport cancels its timers and resets the phrase to English.
 */
export default function BilingualText({ en, es, delay = 8_000, className = "" }: Props) {
  const [spanish, setSpanish] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const readingDelay = useMemo(() => {
    const hash = [...en].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
    // Small deterministic offsets keep phrases from changing in one synchronized burst.
    return delay + (hash % 1_200);
  }, [delay, en]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let isVisible = false;
    let timer: number | undefined;

    const clearCycle = () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }
    };

    const runCycle = () => {
      setSpanish(false);
      timer = window.setTimeout(() => {
        setSpanish(true);
        timer = window.setTimeout(runCycle, SPANISH_HOLD_MS);
      }, readingDelay);
    };

    let observer: IntersectionObserver | undefined;

    const observeWhenVisible = () => {
      if (!element.isConnected || observer) return;

      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            runCycle();
          } else if (!entry.isIntersecting && isVisible) {
            isVisible = false;
            clearCycle();
            setSpanish(false);
          }
        }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
        observer.observe(element);
      } else {
        isVisible = true;
        runCycle();
      }
    };

    // The first section's reading timer must not run behind the loading intro.
    const introIsRunning = Boolean(document.getElementById("ai"))
      && document.documentElement.dataset.introDone !== "true";

    if (introIsRunning) {
      document.addEventListener("intro:done", observeWhenVisible, { once: true });
    } else {
      observeWhenVisible();
    }

    return () => {
      clearCycle();
      document.removeEventListener("intro:done", observeWhenVisible);
      observer?.disconnect();
    };
  }, [readingDelay]);

  return (
    <span
      ref={elementRef}
      className={`bilingual-motion ${className}`}
      lang={spanish ? "es" : "en"}
      aria-label={spanish ? es : en}
    >
      <span className={`bilingual-motion__layer bilingual-motion__english ${spanish ? "is-hidden" : "is-visible"}`} aria-hidden="true" lang="en">{en}</span>
      <span className={`bilingual-motion__layer bilingual-motion__spanish ${spanish ? "is-visible" : "is-hidden"}`} aria-hidden="true" lang="es">
        {Array.from(es).map((character, index) => (
          <span
            className="bilingual-motion__char"
            key={`${index}-${character}`}
            style={{ "--char-index": index } as React.CSSProperties}
          >{character === " " ? "\u00a0" : character}</span>
        ))}
      </span>
    </span>
  );
}
