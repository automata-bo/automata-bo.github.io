import React, { useEffect, useRef, useState } from "react";

type Props = {
  en: string;
  es: string;
  /** Maximum time in ms before switching (default 4500ms <= 5s) */
  intervalMs?: number;
  className?: string;
};

const DEFAULT_CYCLE_MS = 4500;

export default function BilingualText({ en, es, intervalMs = DEFAULT_CYCLE_MS, className = "" }: Props) {
  const [spanish, setSpanish] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let timer: number | undefined;
    let isVisible = false;

    const clearCycle = () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }
    };

    const scheduleNext = () => {
      timer = window.setTimeout(() => {
        setSpanish(prev => !prev);
        scheduleNext();
      }, intervalMs);
    };

    let observer: IntersectionObserver | undefined;

    const startObserving = () => {
      if (!element.isConnected || observer) return;

      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            scheduleNext();
          } else if (!entry.isIntersecting && isVisible) {
            isVisible = false;
            clearCycle();
          }
        }, { threshold: 0.1 });
        observer.observe(element);
      } else {
        isVisible = true;
        scheduleNext();
      }
    };

    const introIsRunning = document.documentElement.dataset.introPending === "true";
    if (introIsRunning) {
      document.addEventListener("intro:done", startObserving, { once: true });
    } else {
      startObserving();
    }

    return () => {
      clearCycle();
      document.removeEventListener("intro:done", startObserving);
      observer?.disconnect();
    };
  }, [intervalMs]);

  return (
    <span
      ref={elementRef}
      className={`bilingual-motion ${className}`}
      lang={spanish ? "es" : "en"}
      aria-label={spanish ? es : en}
    >
      <span
        className={`bilingual-motion__layer bilingual-motion__english ${spanish ? "is-hidden" : "is-visible"}`}
        aria-hidden="true"
        lang="en"
      >
        {en}
      </span>
      <span
        className={`bilingual-motion__layer bilingual-motion__spanish ${spanish ? "is-visible" : "is-hidden"}`}
        aria-hidden="true"
        lang="es"
      >
        {es}
      </span>
    </span>
  );
}
