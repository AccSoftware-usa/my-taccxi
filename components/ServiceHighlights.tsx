"use client";

import { Award, ShieldCheck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const highlights: Highlight[] = [
  {
    title: "Más de 10 años de experiencia",
    description:
      "Trayectoria comprobada en transporte de personas, con un servicio que evoluciona sin perder confianza ni calidez.",
    icon: Award,
  },
  {
    title: "Una experiencia pensada para ti",
    description:
      "Tu viaje, a tu manera: seguro, puntual y con el trato humano que define a Taccxi.",
    icon: ShieldCheck,
  },
  {
    title: "Disponible las 24 horas, todos los días",
    description:
      "De día o de noche, te recogemos donde estés y te llevamos a tu destino.",
    icon: Clock,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ServiceHighlights() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Separator / Subtitle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <div className="mb-6 h-1 w-16 rounded-full bg-taccxi-red" />
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-taccxi-dark-100 sm:text-4xl">
          Nuestros Compromisos
        </h2>
        <p className="mt-4 font-body text-base text-taccxi-gray-100">
          Trabajamos bajo estándares que garantizan el mejor servicio en cada kilómetro.
        </p>
      </motion.div>

      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-8 md:grid-cols-3"
      >
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <motion.li 
              key={item.title}
              variants={itemVariants}
              className="group flex flex-col items-center text-center rounded-3xl bg-taccxi-white p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-taccxi-red/10 text-taccxi-red transition-colors duration-300 group-hover:bg-taccxi-red group-hover:text-taccxi-white">
                <Icon
                  size={36}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0"
                />
              </div>
              <h3 className="font-heading text-xl font-bold leading-snug text-taccxi-dark-100 sm:text-[1.35rem]">
                {item.title}
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-taccxi-gray-100">
                {item.description}
              </p>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
