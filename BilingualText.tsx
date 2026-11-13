import React, { useEffect, useState } from "react";

type Props = { en: string; es: string; delay?: number; className?: string };

/** English-first editorial copy with an independent, accessible Spanish transition. */
export default function BilingualText({ en, es, delay = 1800, className = "" }: Props) {
  const [spanish, setSpanish] = useState(false);
  const stagger = delay + [...en].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 1900;

  useEffect(() => {
    const timer = window.setTimeout(() => setSpanish(true), stagger);
    return () => window.clearTimeout(timer);
  }, [stagger]);

  return (
    <span className={`bilingual-motion ${className}`} lang={spanish ? "es" : "en"}>
      <span className={`bilingual-motion__layer ${spanish ? "is-hidden" : "is-visible"}`} aria-hidden={spanish}>{en}</span>
      <span className={`bilingual-motion__layer ${spanish ? "is-visible" : "is-hidden"}`} aria-hidden={!spanish}>{es}</span>
    </span>
  );
}
