"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
};

function UnderlineField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block font-heading text-xs font-bold uppercase tracking-[0.15em] text-taccxi-gray-100"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent pb-3 font-body text-base text-taccxi-dark-100 placeholder:text-taccxi-gray-200 focus:outline-none"
      />
      <div
        className={cn(
          "h-px w-full transition-all duration-300",
          focused ? "bg-taccxi-red" : "bg-taccxi-gray-200"
        )}
      />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
};

function UnderlineSelect({
  id,
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block font-heading text-xs font-bold uppercase tracking-[0.15em] text-taccxi-gray-100"
      >
        {label}
      </label>
      <select
        id={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full appearance-none bg-transparent pb-3 font-body text-base text-taccxi-dark-100 focus:outline-none"
      >
        <option value="" disabled className="text-gray-400">
          Selecciona tu vehículo
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>
      <div
        className={cn(
          "h-px w-full transition-all duration-300",
          focused ? "bg-taccxi-red" : "bg-taccxi-gray-200"
        )}
      />
    </div>
  );
}

type FormStatus = "idle" | "loading" | "success";

export function BookingForm() {
  const [carType, setCarType] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
      const url = buildWhatsAppBookingUrl({ carType, pickup, destination, date, time });
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => setStatus("idle"), 3500);
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-black/5 bg-taccxi-white p-8 shadow-sm lg:p-12">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-taccxi-red">
          Reserva
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase tracking-tight text-taccxi-dark-100 sm:text-4xl">
          Pide tu Taccxi
        </h2>
        <p className="mt-4 font-body text-taccxi-gray-100">
          Completa los datos de tu viaje. Confirmaremos tu reserva de inmediato.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <UnderlineSelect
            id="carType"
            label="Tipo de vehículo"
            value={carType}
            onChange={setCarType}
            options={[
              { value: "Sedán Urbano", label: "Sedán Urbano" },
              { value: "Premium SUV", label: "Premium SUV" },
              { value: "Van Ejecutiva", label: "Van Ejecutiva" },
            ]}
          />
          <UnderlineField
            id="pickup"
            label="Punto de recogida"
            value={pickup}
            onChange={setPickup}
            placeholder="¿Dónde te recogemos?"
          />
          <UnderlineField
            id="destination"
            label="Dirección de destino"
            value={destination}
            onChange={setDestination}
            placeholder="¿A dónde vas?"
          />

          <div className="grid gap-8 sm:grid-cols-2">
            <UnderlineField
              id="date"
              label="Fecha"
              type="date"
              value={date}
              onChange={setDate}
            />
            <UnderlineField
              id="time"
              label="Hora"
              type="time"
              value={time}
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
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-taccxi-red/20 bg-taccxi-red/5 py-5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-taccxi-red"
              >
                <span aria-hidden="true">✓</span>
                Viaje programado con éxito
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                type="submit"
                disabled={status === "loading"}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.99 }}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-taccxi-red py-5 font-heading text-sm font-bold uppercase tracking-[0.15em] text-taccxi-white transition-colors hover:bg-taccxi-accent-2 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-taccxi-white/30 border-t-taccxi-white" />
                    Procesando...
                  </>
                ) : (
                  "Confirmar reserva"
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
