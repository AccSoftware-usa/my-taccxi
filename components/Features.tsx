"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Clock, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "SEGURIDAD",
    description:
      "Conductores verificados y un servicio diseñado para que viajes con total tranquilidad.",
    icon: ShieldCheck,
    accent: "from-taccxi-red via-taccxi-accent-2 to-taccxi-red/20",
  },
  {
    title: "COMPROMISO",
    description: "Llegamos a tiempo y cumplimos lo acordado en cada recogida.",
    icon: Clock,
    accent: "from-taccxi-red/90 via-taccxi-gray-100/40 to-transparent",
  },
  {
    title: "BUENA ENERGÍA",
    description: "Un trato humano y cercano en cada trayecto.",
    icon: HeartHandshake,
    accent: "from-taccxi-red via-taccxi-red/60 to-taccxi-gray-100/20",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const pillarsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const barVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.25 },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.35 },
  },
};

const descVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.45 },
  },
};

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const Icon = pillar.icon as LucideIcon;
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 24 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 6);
    rotateX.set(-y * 6);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      variants={pillarVariants}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className="group relative flex items-stretch gap-5 lg:gap-6"
    >
      {/* Animated vertical bar */}
      <div className="relative w-2 shrink-0 overflow-hidden rounded-full bg-white/5">
        <motion.div
          variants={barVariants}
          style={{ originY: 0 }}
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-b",
            pillar.accent
          )}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-taccxi-red/40 blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.6, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.18 }}
        />
      </div>

      <div className="relative flex flex-col py-2 pb-4">
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-2xl bg-taccxi-red/0 transition-colors duration-500 group-hover:bg-taccxi-red/[0.04]"
          aria-hidden
        />

        <motion.div variants={iconVariants} className="relative mb-4 w-fit">
          <motion.div
            className="absolute -inset-2 rounded-xl bg-taccxi-red/0 transition-colors duration-300 group-hover:bg-taccxi-red/10"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.6,
            }}
            aria-hidden
          />
          <Icon
            className="relative h-7 w-7 text-gray-300 transition-colors duration-300 group-hover:text-taccxi-red"
            strokeWidth={1.5}
            aria-hidden
          />
        </motion.div>

        <motion.h3
          variants={titleVariants}
          className="font-heading text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-taccxi-red sm:text-3xl lg:text-4xl"
        >
          {pillar.title.split(" ").map((word, wi) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: 0.4 + index * 0.15 + wi * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {wi < pillar.title.split(" ").length - 1 ? "\u00a0" : ""}
            </motion.span>
          ))}
        </motion.h3>

        <motion.p
          variants={descVariants}
          className="mt-4 max-w-sm font-body text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-base"
        >
          {pillar.description}
        </motion.p>

        {/* Bottom reveal line */}
        <motion.div
          className="mt-5 h-px bg-gradient-to-r from-taccxi-red/80 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 + index * 0.12, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section
      id="pilares"
      className="relative overflow-hidden bg-[#0a1118] px-6 py-24 lg:py-32 text-white"
    >
      {/* Animated SVG background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg
          className="absolute h-full w-full opacity-40"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#717171" />
            </linearGradient>
          </defs>
          <path
            d="M 1200 -100 C 1200 400 800 600 0 700"
            stroke="#1c2633"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 1440 200 C 1000 300 600 800 -100 800"
            stroke="#1c2633"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <motion.path
            d="M 0 100 C 400 400 500 800 1500 500"
            stroke="url(#gradient-line)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:justify-between lg:gap-20">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="w-full lg:w-1/2"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-body text-xs font-bold uppercase tracking-[0.28em] text-taccxi-red"
            >
              Lo que nos define
            </motion.p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Nuestros{" "}
              <motion.span
                className="text-taccxi-red"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                Pilares
              </motion.span>{" "}
              <br />
              de Confianza
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 font-body text-base leading-relaxed text-gray-300 sm:text-lg"
            >
              Nuestra misión es redefinir el transporte tecnológico de personas,
              brindando un servicio de primer nivel donde cada usuario experimente
              un viaje seguro, puntual y lleno de buena energía.
            </motion.p>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex w-full justify-center lg:w-1/2 lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-3 rounded-full border border-taccxi-red/20"
                animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border-4 border-[#1c2633] bg-taccxi-dark-200 shadow-[0_0_60px_rgba(255,0,0,0.12)]">
                <Image
                  src="/brand/mision.png"
                  alt="Misión Taccxi"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={pillarsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "-60px" }}
          className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16"
        >
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
