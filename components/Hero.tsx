"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FleetShowcase } from "@/components/FleetShowcase";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const headline = "Road to Dreams";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section id="hero" ref={ref} className="overflow-hidden">
      <div className="relative px-6 pb-12 pt-28 text-center lg:pb-16 lg:pt-36 flex flex-col justify-center min-h-[90vh]">
        <motion.div 
          className="absolute inset-0 z-0 origin-center" 
          style={{ y: backgroundY }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand/bannerHome.gif"
            alt="Taccxi Banner Animado"
            fill
            className="object-cover object-center scale-[1.15]"
            priority
            unoptimized={true}
          />
          <motion.div 
            className="absolute inset-0 bg-black"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-body text-sm uppercase tracking-[0.3em] text-taccxi-white/80"
          >
            Transporte tecnológico de personas
          </motion.p>

          <h1
            className="mt-8 font-signature text-5xl leading-[1.05] text-taccxi-white sm:text-7xl lg:text-8xl"
            aria-label={headline}
          >
            {headline.split(" ").map((word, index) => {
              const isDreams = word.toLowerCase() === "dreams";
              return (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.2,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "inline-block mr-3 lg:mr-5 last:mr-0",
                    isDreams && "text-taccxi-red"
                  )}
                >
                  {word}
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
