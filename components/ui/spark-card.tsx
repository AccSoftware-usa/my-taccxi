"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Spark = {
  id: number;
  originX: number;
  originY: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
  shape: "dot" | "star" | "ring";
  delay: number;
};

const SPARK_COLORS = ["#ff0000", "#ffffff", "#ff4444", "#ff8888", "#ababab", "#ffd700"];

function createBurst(originX: number, originY: number, count = 18): Spark[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i + (Math.random() - 0.5) * 28;
    return {
      id: Date.now() + i + Math.random() * 1000,
      originX,
      originY,
      angle,
      distance: 40 + Math.random() * 70,
      color: SPARK_COLORS[i % SPARK_COLORS.length],
      size: 2 + Math.random() * 4,
      shape: (["dot", "star", "ring"] as const)[i % 3],
      delay: Math.random() * 0.08,
    };
  });
};

function SparkParticle({ spark }: { spark: Spark }) {
  const rad = (spark.angle * Math.PI) / 180;
  const tx = Math.cos(rad) * spark.distance;
  const ty = Math.sin(rad) * spark.distance + 18;

  return (
    <motion.span
      className="pointer-events-none absolute z-20"
      style={{
        left: spark.originX,
        top: spark.originY,
        width: spark.size,
        height: spark.size,
        color: spark.color,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        x: tx,
        y: ty,
        opacity: 0,
        scale: spark.shape === "ring" ? 2.2 : 0,
        rotate: spark.shape === "star" ? 180 : 0,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.55 + Math.random() * 0.25,
        delay: spark.delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      aria-hidden
    >
      {spark.shape === "star" ? (
        <svg viewBox="0 0 10 10" className="h-full w-full fill-current drop-shadow-[0_0_4px_currentColor]">
          <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.8 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
        </svg>
      ) : spark.shape === "ring" ? (
        <span
          className="block h-full w-full rounded-full border border-current bg-transparent"
          style={{ boxShadow: `0 0 6px ${spark.color}` }}
        />
      ) : (
        <span
          className="block h-full w-full rounded-full bg-current"
          style={{ boxShadow: `0 0 6px ${spark.color}` }}
        />
      )}
    </motion.span>
  );
}

type SparkCardProps = {
  children: ReactNode;
  className?: string;
};

export function SparkCard({ children, className }: SparkCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const burstId = useId();
  const lastBurst = useRef(0);

  const spawnBurst = useCallback((clientX: number, clientY: number, count = 18) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const originX = clientX - rect.left;
    const originY = clientY - rect.top;
    const batch = createBurst(originX, originY, count);
    setSparks((prev) => [...prev, ...batch]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !batch.some((b) => b.id === s.id)));
    }, 900);
  }, []);

  const onEnter = (e: MouseEvent<HTMLDivElement>) => {
    spawnBurst(e.clientX, e.clientY, 22);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastBurst.current < 420) return;
    lastBurst.current = now;
    spawnBurst(e.clientX, e.clientY, 6);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-black/8 bg-taccxi-white shadow-sm",
        className
      )}
    >
      <AnimatePresence>
        {sparks.map((spark) => (
          <SparkParticle key={`${burstId}-${spark.id}`} spark={spark} />
        ))}
      </AnimatePresence>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
