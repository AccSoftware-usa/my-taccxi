"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FleetShowcase } from "@/components/FleetShowcase";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const headline = "Road to Dreams";

export function Hero() {
  return (
    <section id="hero" className="overflow-hidden">
      <div className="relative px-6 pb-12 pt-28 text-center lg:pb-16 lg:pt-36 flex flex-col justify-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand/bannerHome.gif"
            alt="Taccxi Banner Animado"
            fill
            className="object-cover object-center"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-sm uppercase tracking-[0.3em] text-taccxi-white/80"
          >
            Transporte tecnológico de personas
          </motion.p>

          <h1
            className="mt-8 font-signature text-5xl leading-[1.05] text-taccxi-white sm:text-7xl lg:text-8xl"
            aria-label={headline}
          >
            {headline.split("").map((char, index) => {
              const isDreams = index >= headline.indexOf("Dreams");
              return (
                <motion.span
                  key={`${char}-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "inline-block",
                    isDreams && char !== " " && "text-taccxi-red"
                  )}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-taccxi-white/90 sm:text-lg"
          >
            Recogida segura, puntual y con la energía que merece cada viaje.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-12"
          >
            <MagneticButton scrollTo="#reserva">Reserva un viaje</MagneticButton>
          </motion.div>
        </div>
      </div>

      <FleetShowcase />
    </section>
  );
}
