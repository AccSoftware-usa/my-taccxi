"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useBooking } from "@/contexts/booking-context";
import { VEHICLES } from "@/lib/fleet";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
};

function FormField({ id, label, value, onChange, placeholder, type = "text" }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-heading text-xs font-bold uppercase tracking-[0.15em] text-taccxi-gray-100"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-taccxi-gray-200/50 bg-taccxi-surface/30 px-4 py-3.5 font-body text-base text-taccxi-dark-100 placeholder:text-taccxi-gray-200 outline-none transition-all duration-300 focus:border-taccxi-gray-100 focus:bg-taccxi-white focus:ring-4 focus:ring-taccxi-gray-200/30"
      />
    </div>
  );
}

type FormStatus = "idle" | "loading" | "success";

export function BookingForm() {
  const {
    booking,
    setPickup,
    setDestination,
    setDate,
    setTime,
    setVehicleId,
    vehicleTitle,
  } = useBooking();
  const [status, setStatus] = useState<FormStatus>("idle");

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
      window.setTimeout(() => setStatus("idle"), 3500);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-2xl"
    >
      <div className="rounded-3xl border border-black/5 bg-taccxi-white p-8 shadow-sm lg:p-12">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-taccxi-red">
          Reserva
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase tracking-tight text-taccxi-dark-100 sm:text-4xl">
          Pide tu Taccxi
        </h2>
        <p className="mt-4 font-body text-taccxi-gray-100">
          Completa o ajusta los datos de tu viaje. Los campos se sincronizan con el formulario del inicio. Te confirmamos la tarifa por WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.15em] text-taccxi-gray-100">
              Tipo de vehículo
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleId(v.id)}
                  aria-pressed={booking.vehicleId === v.id}
                  className={cn(
                    "rounded-xl border px-3 py-3 font-body text-sm font-semibold transition-all",
                    booking.vehicleId === v.id
                      ? "border-taccxi-red bg-taccxi-red/5 text-taccxi-dark-100"
                      : "border-taccxi-gray-200/50 text-taccxi-gray-100 hover:border-taccxi-gray-100"
                  )}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>

          <FormField
            id="pickup"
            label="Punto de recogida"
            value={booking.pickup}
            onChange={setPickup}
            placeholder="¿Dónde te recogemos?"
          />
          <FormField
            id="destination"
            label="Dirección de destino"
            value={booking.destination}
            onChange={setDestination}
            placeholder="¿A dónde vas?"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField id="date" label="Fecha" type="date" value={booking.date} onChange={setDate} />
            <FormField id="time" label="Hora" type="time" value={booking.time} onChange={setTime} />
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-taccxi-red/20 bg-taccxi-red/5 py-5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-taccxi-red"
              >
                <span aria-hidden="true">✓</span>
                Reserva enviada por WhatsApp
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                type="submit"
                disabled={status === "loading"}
                whileTap={{ scale: 0.99 }}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-taccxi-red py-5 font-heading text-sm font-bold uppercase tracking-[0.15em] text-taccxi-white transition-colors hover:bg-taccxi-accent-2 disabled:cursor-not-allowed disabled:opacity-80"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  aria-hidden
                />
                {status === "loading" ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-taccxi-white/30 border-t-taccxi-white" />
                    Enviando reserva...
                  </>
                ) : (
                  "Reservar por WhatsApp"
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}
