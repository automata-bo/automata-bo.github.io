import React, { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type ShapeKind = "circle" | "triangle" | "square" | "soft-diamond" | "organic";

const COUNT = 96;
const CENTER = 200;
const SHAPES: ShapeKind[] = ["circle", "triangle", "square", "soft-diamond", "organic"];

function polygonRadius(angle: number, vertices: Point[]) {
  let best = Infinity;
  for (let i = 0; i < vertices.length; i++) {
    const a = vertices[i];
    const b = vertices[(i + 1) % vertices.length];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const denominator = Math.cos(angle) * dy - Math.sin(angle) * dx;
    if (Math.abs(denominator) < 1e-7) continue;
    const t = (Math.sin(angle) * a.x - Math.cos(angle) * a.y) / denominator;
    const r = (a.x * dy - a.y * dx) / denominator;
    if (t >= 0 && t <= 1 && r > 0) best = Math.min(best, r);
  }
  return Number.isFinite(best) ? best : 130;
}

function makeShape(kind: ShapeKind, seed: number): Point[] {
  const verticesByKind: Record<Exclude<ShapeKind, "circle" | "organic">, Point[]> = {
    triangle: [{ x: 0, y: -145 }, { x: 126, y: 82 }, { x: -126, y: 82 }],
    square: [{ x: -112, y: -112 }, { x: 112, y: -112 }, { x: 112, y: 112 }, { x: -112, y: 112 }],
    "soft-diamond": [{ x: 0, y: -150 }, { x: 112, y: 0 }, { x: 0, y: 150 }, { x: -112, y: 0 }]
  };
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * Math.PI * 2 - Math.PI / 2;
    let radius = 132;
    if (kind === "triangle" || kind === "square" || kind === "soft-diamond") {
      radius = polygonRadius(angle, verticesByKind[kind]);
      if (kind === "soft-diamond") radius *= 1 + 0.035 * Math.cos(angle * 4);
    } else if (kind === "organic") {
      radius = 128 + 17 * Math.sin(angle * 3 + seed) + 10 * Math.sin(angle * 5 - seed * 0.7) + 5 * Math.cos(angle * 7 + seed * 1.3);
    } else {
      radius = 132 + 5 * Math.sin(angle * 2 + seed);
    }
    return { x: CENTER + Math.cos(angle) * radius, y: CENTER + Math.sin(angle) * radius };
  });
}

const initialShape = makeShape("circle", 0);
const toPoints = (points: Point[]) => points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

export default function MorphGeometry() {
  const [points, setPoints] = useState<Point[]>(initialShape);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;

    let frame = 0;
    let timer = 0;
    let alive = true;
    let previous: ShapeKind[] = ["circle"];
    let current = initialShape;

    const chooseNext = (): ShapeKind => {
      const choices = SHAPES.filter((shape) => !previous.includes(shape));
      const next = choices[Math.floor(Math.random() * choices.length)];
      previous = [...previous.slice(-1), next];
      return next;
    };

    const schedule = () => {
      if (!alive) return;
      const nextKind = chooseNext();
      const target = makeShape(nextKind, Math.random() * Math.PI * 2);
      const start = current.map((point) => ({ ...point }));
      const duration = 2800 + Math.random() * 2400;
      const pause = 900 + Math.random() * 2600;
      const began = performance.now();

      const animate = (now: number) => {
        if (!alive) return;
        const raw = Math.min(1, (now - began) / duration);
        const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        const next = start.map((point, index) => ({
          x: point.x + (target[index].x - point.x) * eased,
          y: point.y + (target[index].y - point.y) * eased
        }));
        current = next;
        setPoints(next);
        if (raw < 1) frame = requestAnimationFrame(animate);
        else timer = window.setTimeout(schedule, pause);
      };
      frame = requestAnimationFrame(animate);
    };

    timer = window.setTimeout(schedule, 1400 + Math.random() * 1600);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return <div className="morph-geometry" aria-hidden="true">
    <svg viewBox="0 0 400 400" focusable="false">
      <defs>
        <linearGradient id="morph-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="28%" stopColor="#2563ff" />
          <stop offset="55%" stopColor="#c026d3" />
          <stop offset="78%" stopColor="#ff5a00" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="morph-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polygon className="morph-geometry-halo" points={toPoints(points)} />
      <polygon className="morph-geometry-line" points={toPoints(points)} />
    </svg>
  </div>;
}
