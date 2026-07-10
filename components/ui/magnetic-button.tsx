"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  scrollTo?: string;
};

export function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
  disabled,
  scrollTo,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const handleClick = () => {
    if (scrollTo && lenis) lenis.scrollTo(scrollTo, { offset: -80 });
    onClick?.();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn("border-0 bg-transparent p-0", disabled && "cursor-not-allowed opacity-60")}
    >
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-taccxi-red px-10 py-4 font-heading text-sm font-bold uppercase tracking-[0.18em] text-taccxi-white transition-shadow hover:shadow-[0_0_48px_rgba(255,0,0,0.35)]",
          className
        )}
      >
        {children}
      </motion.div>
    </button>
  );
}
