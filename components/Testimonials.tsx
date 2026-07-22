"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote: "Taccxi transformó por completo mis viajes de negocios. La puntualidad y el confort son inigualables.",
    name: "Carlos V.",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    quote: "La tranquilidad de saber que mi familia viaja segura no tiene precio. Traslados al aeropuerto sin estrés.",
    name: "Sarah M.",
    location: "Fort Lauderdale, FL",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    quote: "Servicio impecable. Conductor puntual, auto inmaculado y trato excepcional de principio a fin.",
    name: "David L.",
    location: "West Palm Beach, FL",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    quote: "Atención al detalle y consistencia premium, sin importar la hora del día.",
    name: "Elena R.",
    location: "Boca Raton, FL",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
];

function ReviewCard({ item }: { item: Testimonial }) {
  return (
    <article className="mx-3 w-[320px] shrink-0 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:w-[360px]">
      <div className="flex gap-0.5" aria-label={`${item.rating} de 5 estrellas`}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-white text-white" aria-hidden />
        ))}
      </div>
      <p className="mt-4 font-body text-sm leading-relaxed text-white/90">&ldquo;{item.quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
        </div>
        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-wider text-white">{item.name}</p>
          <p className="font-body text-xs text-white/60">{item.location}</p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-taccxi-red px-0 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-lg font-bold uppercase tracking-[0.2em] text-white/80"
        >
          Lo que dicen nuestros pasajeros
        </motion.h2>
        <p className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
          4.9/5 valoración promedio
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden" aria-label="Carrusel de testimonios">
        <motion.div
          className="flex w-max py-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((item, i) => (
            <ReviewCard key={`${item.name}-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
