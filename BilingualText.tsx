/**
 * BilingualText — Coordinated bilingual rotation system
 *
 * Strategy:
 * - A single global language coordinator manages ALL BilingualText instances
 * - Language switches happen sequentially, in DOM order, staggered by reading time
 * - Each instance independently tracks its scroll-visibility
 * - When an instance becomes visible (IntersectionObserver) it registers itself
 * - The coordinator cycles language state globally, applying a stagger delay per DOM index
 * - Reading time is estimated (~200 wpm average) to set a minimum interval per element
 */

import React, { useEffect, useRef, useCallback } from "react";

// ─── Reading time estimator ────────────────────────────────────────────────────
const WORDS_PER_MINUTE = 200;
const MIN_INTERVAL_MS  = 6000;  // minimum 6 s before switch
const MAX_INTERVAL_MS  = 14000; // maximum 14 s for very long texts
const STAGGER_MS       = 320;   // delay between successive element switches

function readingTimeMs(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const ms = Math.round((words / WORDS_PER_MINUTE) * 60_000);
  return Math.min(MAX_INTERVAL_MS, Math.max(MIN_INTERVAL_MS, ms));
}

// ─── Global Language Coordinator ──────────────────────────────────────────────
// Singleton that manages language state for ALL instances on the page

type Subscriber = () => void;
type InstanceEntry = {
  element: HTMLElement;
  enText: string;
  esText: string;
  setSpanish: (v: boolean) => void;
  intervalMs: number;
  isVisible: boolean;
};

class BilingualCoordinator {
  private instances: Map<HTMLElement, InstanceEntry> = new Map();
  private subscribers: Set<Subscriber> = new Set();
  private globalSpanish = false;
  private cycleTimer: ReturnType<typeof setTimeout> | null = null;
  private visibleCount = 0;

  // Subscribe for external store (not used externally but for completeness)
  subscribe(cb: Subscriber) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  register(entry: InstanceEntry) {
    this.instances.set(entry.element, entry);
    if (entry.isVisible) this.visibleCount++;
  }

  unregister(element: HTMLElement) {
    const entry = this.instances.get(element);
    if (entry) {
      if (entry.isVisible) this.visibleCount = Math.max(0, this.visibleCount - 1);
      this.instances.delete(element);
    }
    this.rescheduleCycle();
  }

  setVisibility(element: HTMLElement, visible: boolean) {
    const entry = this.instances.get(element);
    if (!entry || entry.isVisible === visible) return;
    const wasVisible = entry.isVisible;
    entry.isVisible = visible;
    if (visible && !wasVisible) {
      this.visibleCount++;
      // Sync the new element to current language immediately
      entry.setSpanish(this.globalSpanish);
    } else if (!visible && wasVisible) {
      this.visibleCount = Math.max(0, this.visibleCount - 1);
    }
    this.rescheduleCycle();
  }

  private rescheduleCycle() {
    if (this.cycleTimer !== null) return; // already scheduled
    if (this.visibleCount === 0) return;  // nothing visible
    this.scheduleCycle();
  }

  private scheduleCycle() {
    if (this.cycleTimer !== null) {
      clearTimeout(this.cycleTimer);
      this.cycleTimer = null;
    }
    if (this.visibleCount === 0) return;

    // Compute interval: average reading time of visible elements
    let totalMs = 0;
    let count = 0;
    for (const entry of this.instances.values()) {
      if (entry.isVisible) {
        totalMs += entry.intervalMs;
        count++;
      }
    }
    const avgMs = count > 0 ? totalMs / count : MIN_INTERVAL_MS;

    this.cycleTimer = setTimeout(() => {
      this.cycleTimer = null;
      this.flip();
    }, avgMs);
  }

  private flip() {
    this.globalSpanish = !this.globalSpanish;
    const newLang = this.globalSpanish;

    // Sort visible instances by DOM position and stagger them
    const visible: InstanceEntry[] = [];
    for (const entry of this.instances.values()) {
      if (entry.isVisible) visible.push(entry);
    }

    // Sort by DOM order (compareDocumentPosition)
    visible.sort((a, b) => {
      const pos = a.element.compareDocumentPosition(b.element);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    visible.forEach((entry, idx) => {
      setTimeout(() => {
        entry.setSpanish(newLang);
      }, idx * STAGGER_MS);
    });

    // Schedule the next cycle after the last element switches + its reading time
    const totalStagger = visible.length * STAGGER_MS;
    const nextAvgMs = visible.reduce((acc, e) => acc + e.intervalMs, 0) / (visible.length || 1);

    this.cycleTimer = setTimeout(() => {
      this.cycleTimer = null;
      this.flip();
    }, totalStagger + nextAvgMs);
  }

  // Called once when intro animation is done or immediately if already done
  boot() {
    if (this.visibleCount > 0 && this.cycleTimer === null) {
      this.scheduleCycle();
    }
  }
}

const coordinator = new BilingualCoordinator();

// Boot once after intro or on first mount
let booted = false;
function ensureBooted() {
  if (booted) return;
  booted = true;
  if (document.documentElement.dataset.introPending === "true") {
    document.addEventListener("intro:done", () => coordinator.boot(), { once: true });
  } else {
    // Small delay to let all instances register on mount
    requestAnimationFrame(() => coordinator.boot());
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────
type Props = {
  en: string;
  es: string;
  /** Override reading-time based interval in ms */
  intervalMs?: number;
  className?: string;
};

export default function BilingualText({ en, es, intervalMs, className = "" }: Props) {
  const [spanish, setSpanish] = React.useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Memoize setter to avoid unnecessary re-registrations
  const setSpanishStable = useCallback((v: boolean) => {
    setSpanish(v);
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Determine effective interval: use provided value, or calculate from reading time
    const effectiveInterval = intervalMs ?? readingTimeMs(`${en} ${es}`);

    // Register with coordinator
    coordinator.register({
      element: el,
      enText: en,
      esText: es,
      setSpanish: setSpanishStable,
      intervalMs: effectiveInterval,
      isVisible: false,
    });

    // Set up IntersectionObserver for visibility tracking
    const observer = new IntersectionObserver(
      ([entry]) => {
        coordinator.setVisibility(el, entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);

    // Ensure the coordinator has booted
    ensureBooted();

    return () => {
      observer.disconnect();
      coordinator.unregister(el);
    };
  }, [en, es, intervalMs, setSpanishStable]);

  return (
    <span
      ref={elementRef}
      className={`bilingual-motion ${className}`}
      lang={spanish ? "es" : "en"}
      aria-label={spanish ? es : en}
    >
      {/* English layer */}
      <span
        className={`bilingual-motion__layer bilingual-motion__english ${spanish ? "is-hidden" : "is-visible"}`}
        aria-hidden="true"
        lang="en"
      >
        {en}
      </span>
      {/* Spanish layer */}
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
