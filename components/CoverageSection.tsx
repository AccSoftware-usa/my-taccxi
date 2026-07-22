"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CoverageMap = dynamic(
  () => import("@/components/CoverageMap").then((m) => m.CoverageMap),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-taccxi-dark-300" />
    ),
  }
);

export function CoverageSection() {
  return (
    <section className="overflow-hidden bg-[#0a1118] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:justify-between lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[42%]"
          >
            <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-taccxi-red">
              Presencia
            </p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Área de <span className="text-taccxi-gray-200">Cobertura</span>
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-gray-300 sm:text-lg">
              Mapa en vivo de nuestras zonas activas. Pasa el cursor sobre cada punto para ver tiempos promedio de recogida en tu área.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[55%] flex justify-center lg:justify-end"
          >
            <CoverageMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
