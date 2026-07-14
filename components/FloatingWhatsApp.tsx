"use client";

import { motion, useScroll } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buildWhatsAppContactUrl } from "@/lib/whatsapp";
import { useLenis } from "lenis/react";

export function FloatingWhatsApp() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#reserva", { offset: -80 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {/* WhatsApp Flotante */}
      <a
        href={buildWhatsAppContactUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-0 rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5D] hover:pr-5 h-14 w-14 hover:w-auto"
        aria-label="Contactar por WhatsApp"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <MessageCircle size={28} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-heading text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
          Reservar Ahora
        </span>
      </a>
    </motion.div>
  );
}
