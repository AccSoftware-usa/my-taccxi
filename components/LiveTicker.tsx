"use client";

import { motion } from "framer-motion";

const metrics = [
  "+10,000 viajes completados este mes",
  "4.9/5 valoración promedio",
  "Recogida en menos de 8 min",
  "Cobertura activa 24/7",
];

export function LiveTicker() {
  const items = [...metrics, ...metrics];

  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-taccxi-dark-100 py-3"
      aria-label="Métricas del servicio en tiempo real"
    >
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap font-heading text-xs font-bold uppercase tracking-[0.18em] text-white/70"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-taccxi-red" aria-hidden />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
