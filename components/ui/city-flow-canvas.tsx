"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CityFlowCanvasProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function CityFlowCanvas({ className, variant = "light" }: CityFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const isLight = variant === "light";

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.0003 + Math.random() * 0.0008,
      size: 0.5 + Math.random() * 1.2,
      opacity: 0.08 + Math.random() * 0.18,
    }));

    const lines = Array.from({ length: 8 }, (_, i) => ({
      y: (i + 1) / 9,
      speed: 0.0002 + Math.random() * 0.0004,
    }));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        const y = (line.y + (time * line.speed) % 1) * height;
        const gradient = ctx.createLinearGradient(0, y, width, y);
        gradient.addColorStop(0, "rgba(255,0,0,0)");
        gradient.addColorStop(0.5, isLight ? "rgba(255,0,0,0.04)" : "rgba(255,0,0,0.08)");
        gradient.addColorStop(1, "rgba(255,0,0,0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      });

      particles.forEach((p) => {
        const x = ((p.x + time * p.speed) % 1) * width;
        const y = p.y * height;
        ctx.fillStyle = isLight
          ? `rgba(113,113,113,${p.opacity})`
          : `rgba(255,255,255,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
