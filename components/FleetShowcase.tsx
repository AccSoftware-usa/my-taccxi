"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { useBooking } from "@/contexts/booking-context";
import { VEHICLES, type VehicleId } from "@/lib/fleet";
import { cn } from "@/lib/utils";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg)");

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.02,1.02,1.02)`
    );
  };

  const onLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}

export function FleetShowcase() {
  const { booking, setVehicleId } = useBooking();
  const activeIndex = VEHICLES.findIndex((v) => v.id === booking.vehicleId);
  const vehicle = VEHICLES[activeIndex >= 0 ? activeIndex : 0];

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
            Elige el vehículo que mejor se adapte a tu viaje. Tu selección se sincroniza con la reserva.
          </p>
        </motion.div>

        <div
          className="mt-10 inline-flex flex-wrap justify-center gap-2 rounded-full border border-white/10 bg-taccxi-dark-200 p-1.5"
          role="tablist"
          aria-label="Categorías de vehículo"
        >
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={booking.vehicleId === v.id}
              onClick={() => setVehicleId(v.id as VehicleId)}
              className={cn(
                "rounded-full px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider transition-all",
                booking.vehicleId === v.id
                  ? "bg-taccxi-red text-white shadow-[0_0_24px_rgba(255,0,0,0.35)]"
                  : "text-taccxi-gray-200 hover:text-white"
              )}
            >
              {v.title}
            </button>
          ))}
        </div>

        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-12 text-left"
        >
          <TiltCard className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-taccxi-dark-200 shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                <Image
                  src={vehicle.image}
                  alt={vehicle.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-taccxi-red">
                  {vehicle.category}
                </p>
                <h3 className="mt-2 font-heading text-3xl font-bold text-white">{vehicle.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-gray-400">
                  {vehicle.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                    👥 {vehicle.passengers} Pasajeros
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                    🧳 {vehicle.luggage} Maletas
                  </span>
                  {vehicle.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80"
                    >
                      ⚡ {f}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setVehicleId(vehicle.id)}
                  aria-pressed={booking.vehicleId === vehicle.id}
                  className={cn(
                    "group relative mt-8 overflow-hidden rounded-xl border py-3 font-heading text-sm font-bold uppercase tracking-wider transition-all",
                    booking.vehicleId === vehicle.id
                      ? "border-taccxi-red bg-taccxi-red text-white"
                      : "border-white/20 text-white hover:border-white/50"
                  )}
                >
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                    aria-hidden
                  />
                  {booking.vehicleId === vehicle.id ? "Seleccionado" : "Seleccionar vehículo"}
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
