"use client";

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
        <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-taccxi-white sm:text-4xl">
          Tipos de transporte
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-taccxi-gray-200">
          Elige el vehículo que mejor se adapte a tu viaje. Cada categoría con el estándar de servicio Taccxi.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 text-left">
          {fleet.map((vehicle) => (
            <article
              key={vehicle.title}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-taccxi-dark-200">
                <Image
                  src={vehicle.image}
                  alt={vehicle.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="mt-6 flex flex-col px-1">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-taccxi-red">
                  {vehicle.category}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-taccxi-white">
                  {vehicle.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-taccxi-gray-200">
                  {vehicle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
