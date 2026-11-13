import React, { useEffect, useMemo, useState } from "react";

type Props = {
  en: string;
  es: string;
  delay?: number;
  className?: string;
};

/**
 * Starts in English, then assembles the editorial Spanish version from left to right.
 * Each phrase keeps its own deterministic start time and each character enters in sequence.
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
