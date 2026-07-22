"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useBooking } from "@/contexts/booking-context";
import { getVehicleById } from "@/lib/fleet";

export function VehiclePreview() {
  const { booking } = useBooking();
  const vehicle = getVehicleById(booking.vehicleId);

  const formattedDate = booking.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="relative w-full self-end lg:sticky lg:top-32"
      aria-label="Resumen de tu reserva"
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-taccxi-dark-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-white/80">
            Tu reserva
          </span>
          <span className="rounded-full bg-taccxi-red/20 px-2.5 py-0.5 font-body text-[0.65rem] font-semibold text-taccxi-red">
            Sincronizado
          </span>
        </div>

        <div className="relative aspect-[16/10] bg-taccxi-dark-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={vehicle.image}
                alt={vehicle.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 90vw, 400px"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-xs font-bold uppercase tracking-widest text-taccxi-red">{vehicle.category}</p>
            <p className="font-heading text-lg font-bold text-white">{vehicle.title}</p>
          </div>
        </div>

        <div className="space-y-2 p-4 font-body text-sm">
          {(booking.pickup || booking.destination) && (
            <>
              {booking.pickup && (
                <p className="truncate text-white/90">
                  <span className="text-white/40">Desde </span>
                  {booking.pickup}
                </p>
              )}
              {booking.destination && (
                <p className="truncate text-white/90">
                  <span className="text-white/40">Hasta </span>
                  {booking.destination}
                </p>
              )}
            </>
          )}
          {(formattedDate || booking.time) && (
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/70">
              {formattedDate && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-taccxi-red" aria-hidden />
                  {formattedDate}
                </span>
              )}
              {booking.time && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-taccxi-red" aria-hidden />
                  {booking.time}
                </span>
              )}
            </div>
          )}
          <p className="mt-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50">
            Tarifa sujeta a confirmación por WhatsApp.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
