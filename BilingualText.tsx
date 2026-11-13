import React, { useEffect, useMemo, useState } from "react";

type Props = {
  en: string;
  es: string;
  delay?: number;
  className?: string;
};

/**
 * Starts in English, then changes this phrase to its editorial Spanish version.
 * The delay is deterministic per phrase, so the page does not switch all at once.
 */
export default function BilingualText({ en, es, delay = 1400, className = "" }: Props) {
  const [spanish, setSpanish] = useState(false);
  const switchDelay = useMemo(() => {
    const hash = [...en].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
    return delay + (hash % 6200);
  }, [delay, en]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSpanish(true), switchDelay);
    return () => window.clearTimeout(timer);
  }, [switchDelay]);

  return (
    <span
      className={`bilingual-motion ${className}`}
      lang={spanish ? "es" : "en"}
      aria-label={spanish ? es : en}
    >
      <span className={`bilingual-motion__layer ${spanish ? "is-hidden" : "is-visible"}`} aria-hidden="true" lang="en">{en}</span>
      <span className={`bilingual-motion__layer ${spanish ? "is-visible" : "is-hidden"}`} aria-hidden="true" lang="es">{es}</span>
    </span>
  );
}
