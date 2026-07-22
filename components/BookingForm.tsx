"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
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
        className="mb-2 block font-heading text-xs font-bold uppercase tracking-[0.15em] text-white/60"
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
        className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3.5 font-body text-base text-white placeholder:text-white/35 outline-none backdrop-blur-sm transition-all duration-300 focus:border-taccxi-red/60 focus:bg-black/40 focus:ring-2 focus:ring-taccxi-red/20 [color-scheme:dark]"
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

  const hasDraft = Boolean(booking.pickup || booking.destination);

  return (
    <section
      id="reserva"
      className="relative overflow-hidden bg-[#0a1118] px-6 py-24 lg:py-32"
      aria-labelledby="final-reserva-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-taccxi-red/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl"
      >
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-heading text-[0.65rem] font-bold uppercase tracking-[0.2em] text-taccxi-red">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Tu viaje te espera
          </span>

          <h2
            id="final-reserva-heading"
            className="mt-5 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Haz realidad tu <span className="text-taccxi-red">próximo viaje</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base leading-relaxed text-white/55 sm:text-lg">
            Estás a un paso de viajar con comodidad, puntualidad y el trato humano que define a Taccxi. Confirma tu reserva y te atendemos por WhatsApp al instante.
          </p>

          {hasDraft && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-xs text-white/70"
            >
              <Clock className="h-3.5 w-3.5 text-taccxi-red" aria-hidden />
              Tus datos ya están aquí — revisa y confirma
            </motion.p>
          )}
        </div>

        <div className="rounded-3xl border border-taccxi-red/25 bg-black/40 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(255,0,0,0.08)] backdrop-blur-md lg:p-12">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-taccxi-red">
            Completa tu reserva
          </p>
          <p className="mt-2 font-body text-sm text-white/50">
            Revisa, ajusta si necesitas y envía. La tarifa se confirma contigo por WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.15em] text-white/60">
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
                        ? "border-taccxi-red bg-taccxi-red/20 text-white shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                        : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
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
              <FormField
                id="date"
                label="Fecha"
                type="date"
                value={booking.date}
                onChange={setDate}
              />
              <FormField
                id="time"
                label="Hora"
                type="time"
                value={booking.time}
                onChange={setTime}
              />
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-taccxi-red/30 bg-taccxi-red/15 py-5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white"
                  role="status"
                >
                  <span aria-hidden="true">✓</span>
                  ¡Listo! Te esperamos en WhatsApp
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,0,0,0.35)",
                      "0 0 0 10px rgba(255,0,0,0)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" },
                  }}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-taccxi-red py-5 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-taccxi-accent-2 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                    aria-hidden
                  />
                  {status === "loading" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-taccxi-white/30 border-t-taccxi-white" />
                      Enviando reserva...
                    </>
                  ) : (
                    "Confirmar reserva por WhatsApp"
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </div>

        <p className="mt-6 text-center font-body text-xs text-white/35">
          Disponibilidad sujeta a confirmación · Respuesta rápida por WhatsApp
        </p>
      </motion.div>
    </section>
  );
}
