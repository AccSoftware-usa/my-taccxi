"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Clock, HeartHandshake } from "lucide-react";

const pillars = [
  {
    title: "SEGURIDAD",
    description: "Conductores verificados y un servicio diseñado para que viajes con total tranquilidad.",
    icon: ShieldCheck,
  },
  {
    title: "COMPROMISO",
    description: "Llegamos a tiempo y cumplimos lo acordado en cada recogida.",
    icon: Clock,
  },
  {
    title: "BUENA ENERGÍA",
    description: "Un trato humano y cercano en cada trayecto.",
    icon: HeartHandshake,
  },
];

export function Features() {
  return (
    <section id="pilares" className="relative overflow-hidden bg-[#0a1118] px-6 py-24 lg:py-32 text-white">
      {/* Faded lines background (Brand Colors: Red and Gray) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute h-full w-full opacity-40"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#717171" />
            </linearGradient>
          </defs>
          
          <path
            d="M 1200 -100 C 1200 400 800 600 0 700"
            stroke="#1c2633"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 1440 200 C 1000 300 600 800 -100 800"
            stroke="#1c2633"
            strokeWidth="32"
            strokeLinecap="round"
          />
          
          <path
            d="M 0 100 C 400 400 500 800 1500 500"
            stroke="url(#gradient-line)"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        {/* Top Section: Title, Mission & Image Container */}
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:justify-between lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Nuestros <span className="text-taccxi-red">Pilares</span> <br />
              de Confianza
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-gray-300 sm:text-lg">
              Nuestra misión es redefinir el transporte tecnológico de personas, brindando un servicio de primer nivel donde cada usuario experimente un viaje seguro, puntual y lleno de buena energía. Conectamos destinos con excelencia y cercanía.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex w-full justify-center lg:w-1/2 lg:justify-end"
          >
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border-4 border-[#1c2633] bg-taccxi-dark-200">
              {/* Imagen ilustrativa dentro del círculo */}
              <Image
                src="/brand/mision.png"
                alt="Misión Taccxi"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: 3 Pillars with vertical bars */}
        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex items-stretch gap-5 lg:gap-6"
              >
                {/* Vertical Gradient Bar */}
                <div className="w-2 rounded-full bg-gradient-to-b from-taccxi-red to-taccxi-gray-100/30" />
                
                <div className="flex flex-col py-2">
                  <Icon className="mb-4 h-6 w-6 text-gray-300" strokeWidth={1.5} />
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-gray-400 sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
