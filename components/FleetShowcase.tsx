"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const fleet = [
  {
    category: "Casual",
    title: "Sedán Urbano",
    description: "La opción ideal para tus trayectos diarios. Comodidad, eficiencia y el mejor precio para moverte por la ciudad con total estilo.",
    image: "/brand/Sedan.jpg",
    alt: "Vehículo tipo sedán urbano",
  },
  {
    category: "Premium",
    title: "Premium SUV",
    description: "Experimenta el máximo nivel de confort. Perfecta para viajes ejecutivos, traslados al aeropuerto o simplemente viajar con mayor amplitud y lujo.",
    image: "/brand/SuvPremium.jpg",
    alt: "Vehículo SUV premium",
  },
  {
    category: "Grupal",
    title: "Van Ejecutiva",
    description: "La solución definitiva para grupos. Espacio de sobra para pasajeros y equipaje, asegurando que todos lleguen juntos con la comodidad que merecen.",
    image: "/brand/Van.jpg",
    alt: "Transporte tipo Van ejecutiva",
  },
];

export function FleetShowcase() {
  return (
    <div className="relative bg-taccxi-dark-100 px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-taccxi-white sm:text-4xl">
            Tipos de transporte
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-taccxi-gray-200">
            Elige el vehículo que mejor se adapte a tu viaje. Cada categoría con el estándar de servicio Taccxi.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 text-left">
          {fleet.map((vehicle, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              key={vehicle.title}
              className="group flex flex-col rounded-2xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-2 hover:bg-taccxi-dark-200 hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-taccxi-dark-300">
                <Image
                  src={vehicle.image}
                  alt={vehicle.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="mt-6 flex flex-col px-2 pb-4 flex-grow">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-taccxi-red">
                  {vehicle.category}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-taccxi-white">
                  {vehicle.title}
                </h3>
                <p className="mt-3 mb-6 font-body text-sm leading-relaxed text-taccxi-gray-200">
                  {vehicle.description}
                </p>
                <div className="mt-auto">
                  <a 
                    href="#reserva" 
                    className="inline-block w-full text-center rounded-lg border border-taccxi-gray-200/20 px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-wider text-taccxi-gray-200 transition-colors duration-300 group-hover:border-taccxi-white/60 group-hover:text-taccxi-white"
                  >
                    Seleccionar
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
