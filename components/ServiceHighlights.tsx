"use client";

import { Award, ShieldCheck, Clock, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { SparkCard } from "@/components/ui/spark-card";
import { cn } from "@/lib/utils";

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
};

const highlights: Highlight[] = [
  {
    title: "Más de 10 años de experiencia",
    description:
      "Trayectoria comprobada en transporte de personas. Evolucionamos sin perder confianza ni calidez en cada trayecto.",
    icon: Award,
    stat: "10+",
    statLabel: "Años de servicio",
  },
  {
    title: "Una experiencia pensada para ti",
    description:
      "Tu viaje, a tu manera: seguro, puntual y con el trato humano que define a Taccxi.",
    icon: ShieldCheck,
    stat: "100%",
    statLabel: "Conductores verificados",
  },
  {
    title: "Disponible 24/7, todos los días",
    description:
      "De día o de noche, te recogemos donde estés. Operación continua cuando más nos necesitas.",
    icon: Clock,
    stat: "24/7",
    statLabel: "Siempre activos",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function TiltWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(-y * 10);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}

function CommitmentCard({
  item,
  index,
  tall,
}: {
  item: Highlight;
  index: number;
  tall?: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <TiltWrapper className="h-full">
        <SparkCard
          className={cn(
            "h-full border-white/10 bg-gradient-to-br from-[#0a1118] to-taccxi-dark-200 p-0 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(255,0,0,0.15)]",
            tall && "min-h-[340px] lg:min-h-full"
          )}
        >
          <div className="relative flex h-full flex-col overflow-hidden p-7 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <div className="relative">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-taccxi-red backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-taccxi-red/50 group-hover:bg-taccxi-red/15 group-hover:text-white">
                  <Icon size={28} strokeWidth={1.5} aria-hidden />
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading text-3xl font-extrabold leading-none text-white">
                  {item.stat}
                </p>
                <p className="mt-1 font-body text-[0.65rem] uppercase tracking-[0.18em] text-white/45">
                  {item.statLabel}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-taccxi-red/30 bg-taccxi-red/10 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wider text-taccxi-red">
                <Sparkles className="h-3 w-3" aria-hidden />
                Compromiso {index + 1}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/60 sm:text-base">
                {item.description}
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-taccxi-red to-transparent transition-all duration-500 group-hover:w-full"
              aria-hidden
            />
          </div>
        </SparkCard>
      </TiltWrapper>
    </motion.div>
  );
}

export function ServiceHighlights() {
  const [featured, ...rest] = highlights;

  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className="pointer-events-none absolute -inset-x-6 -top-12 bottom-0 rounded-[2.5rem] bg-gradient-to-b from-[#0a1118] via-[#0d1520] to-[#0a1118]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-taccxi-red/50 to-transparent"
        aria-hidden
      />

      <div className="relative px-2 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-taccxi-red to-taccxi-accent-2"
          />
          <p className="font-body text-xs font-bold uppercase tracking-[0.28em] text-taccxi-red">
            Por qué confiar en nosotros
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Nuestros Compromisos
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base text-white/55 sm:text-lg">
            Estándares que respaldan cada kilómetro. No son promesas vacías: son la base de cómo operamos.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 lg:grid-cols-12 lg:gap-7"
        >
          <div className="lg:col-span-7">
            <CommitmentCard item={featured} index={0} tall />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((item, i) => (
              <CommitmentCard key={item.title} item={item} index={i + 1} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8"
        >
          {["Puntualidad garantizada", "Flota premium", "Soporte humano directo"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-white/40"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-taccxi-red" aria-hidden />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
