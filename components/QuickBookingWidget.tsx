"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { FormEvent, useState } from "react";
import { useBooking } from "@/contexts/booking-context";
import { VEHICLES } from "@/lib/fleet";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type ReserveStatus = "idle" | "loading" | "success";

export function QuickBookingWidget() {
  const {
    booking,
    setPickup,
    setDestination,
    setDate,
    setTime,
    setVehicleId,
    vehicleTitle,
  } = useBooking();
  const [status, setStatus] = useState<ReserveStatus>("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      const url = buildWhatsAppBookingUrl({
        carType: vehicleTitle,
        pickup: booking.pickup,
        destination: booking.destination,
        date: booking.date,
        time: booking.time,
      });
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => setStatus("idle"), 3200);
    }, 800);
  };

  const fieldClass =
    "w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 font-body text-sm text-taccxi-white placeholder:text-white/40 outline-none backdrop-blur-sm transition-all focus:border-taccxi-red/70 focus:bg-black/40 focus:ring-2 focus:ring-taccxi-red/20";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
      className="rounded-2xl border border-white/15 bg-black/40 p-5 shadow-2xl backdrop-blur-md sm:p-6"
      aria-label="Formulario de reserva rápida"
    >
      <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-white">
        Reserva instantánea
      </p>
      <p className="mt-1 font-body text-xs text-white/50">
        La tarifa final se confirma por WhatsApp según tu ruta.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="hero-pickup" className="mb-1 flex items-center gap-1.5 font-heading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70">
            <MapPin className="h-3.5 w-3.5 text-taccxi-red" aria-hidden />
            Origen
          </label>
          <input
            id="hero-pickup"
            type="text"
            required
            value={booking.pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="¿Dónde te recogemos?"
            className={fieldClass}
            autoComplete="street-address"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hero-destination" className="mb-1 flex items-center gap-1.5 font-heading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70">
            <Navigation className="h-3.5 w-3.5 text-taccxi-red" aria-hidden />
            Destino
          </label>
          <input
            id="hero-destination"
            type="text"
            required
            value={booking.destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="¿A dónde vas?"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="hero-date" className="mb-1 flex items-center gap-1.5 font-heading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70">
            <Calendar className="h-3.5 w-3.5 text-taccxi-red" aria-hidden />
            Fecha
          </label>
          <input
            id="hero-date"
            type="date"
            required
            value={booking.date}
            onChange={(e) => setDate(e.target.value)}
            className={cn(fieldClass, "[color-scheme:dark]")}
          />
        </div>
        <div>
          <label htmlFor="hero-time" className="mb-1 flex items-center gap-1.5 font-heading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70">
            <Clock className="h-3.5 w-3.5 text-taccxi-red" aria-hidden />
            Hora
          </label>
          <input
            id="hero-time"
            type="time"
            required
            value={booking.time}
            onChange={(e) => setTime(e.target.value)}
            className={cn(fieldClass, "[color-scheme:dark]")}
          />
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 font-heading text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70">
          Vehículo
        </legend>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Tipo de vehículo">
          {VEHICLES.map((v) => {
            const active = booking.vehicleId === v.id;
            return (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setVehicleId(v.id)}
                className={cn(
                  "rounded-lg border px-2 py-2 font-body text-[0.68rem] font-semibold transition-all",
                  active
                    ? "border-taccxi-red bg-taccxi-red/20 text-white"
                    : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
                )}
              >
                {v.shortLabel}
              </button>
            );
          })}
        </div>
      </fieldset>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-taccxi-red/40 bg-taccxi-red/15 py-3.5 text-center font-heading text-xs font-bold uppercase tracking-wider text-white"
            role="status"
          >
            ✓ Reserva enviada por WhatsApp
          </motion.div>
        ) : (
          <motion.button
            key="go"
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative mt-4 w-full overflow-hidden rounded-xl border border-white/20 bg-taccxi-red/90 py-4 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:bg-taccxi-red disabled:opacity-70"
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
            {status === "loading" ? "Enviando reserva..." : "Reservar por WhatsApp"}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
