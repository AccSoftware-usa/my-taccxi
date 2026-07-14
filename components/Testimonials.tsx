"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Taccxi transformó por completo mis viajes de negocios. La puntualidad y el nivel de confort son inigualables. ¡Se han convertido en mi única opción para moverme con estilo!",
    name: "Carlos V.",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "La tranquilidad de saber que mi familia viaja segura no tiene precio. Desde que probamos sus servicios, nuestros traslados al aeropuerto son un verdadero placer, sin estrés.",
    name: "Sarah M.",
    location: "Fort Lauderdale, FL",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Un servicio impecable de principio a fin. El conductor llegó 10 minutos antes, el auto estaba inmaculado y el trato fue excepcional. Simplemente la mejor experiencia.",
    name: "David L.",
    location: "West Palm Beach, FL",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Lo que más valoro es la atención a los detalles y la consistencia. No importa si es de madrugada o en hora pico, siempre entregan un estándar premium espectacular.",
    name: "Elena R.",
    location: "Boca Raton, FL",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-taccxi-red px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-lg font-bold uppercase tracking-[0.2em] text-white/80">
          Lo que dicen nuestros pasajeros
        </h2>

        <div className="mt-12 min-h-[220px] md:min-h-[180px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
                "{testimonials[activeIndex].quote}"
              </p>
              <div className="mt-8 flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-white/90">
                <span>{testimonials[activeIndex].name}</span>
                <span className="h-1 w-1 rounded-full bg-white/50" />
                <span className="text-white/70">{testimonials[activeIndex].location}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex justify-center gap-4">
          {testimonials.map((testimonial, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-full border-2 transition-all duration-300",
                activeIndex === idx
                  ? "border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
              )}
              aria-label={`Ver testimonio de ${testimonial.name}`}
            >
              <Image
                src={testimonial.image}
                alt={`Avatar de ${testimonial.name}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
