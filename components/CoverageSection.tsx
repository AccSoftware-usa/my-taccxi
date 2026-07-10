"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function CoverageSection() {
  return (
    <section className="bg-[#0a1118] px-6 py-24 lg:py-32 overflow-hidden">
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
              Actualmente operamos en las principales zonas estratégicas para garantizar un servicio de primer nivel, seguro y puntual. Aunque este es nuestro alcance principal por ahora, trabajamos incansablemente cada día para expandir nuestras rutas y llevar la experiencia Taccxi a más lugares. ¡Pronto estaremos donde más nos necesites!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[55%] flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[700px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.1)] border border-white/5 bg-taccxi-dark-200">
              <Image
                src="/brand/Cover.png"
                alt="Mapa de cobertura"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
