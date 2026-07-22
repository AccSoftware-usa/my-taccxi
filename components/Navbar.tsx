"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBooking = () => {
    lenis?.scrollTo("#reserva", { offset: -80 });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-black/5 bg-taccxi-white/90 shadow-sm backdrop-blur-md"
          : "bg-taccxi-white/75 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-10",
          scrolled ? "h-14" : "h-16 lg:h-[4.5rem]"
        )}
      >
        <Link href="#hero" aria-label="Taccxi inicio" className="block h-full py-0.5">
          <Image
            src="/brand/logos/LOGO-TACCXI-blanco-con%20negro.png"
            alt="Taccxi"
            width={200}
            height={60}
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-9" : "h-full"
            )}
            priority
          />
        </Link>

        <button
          type="button"
          onClick={scrollToBooking}
          className="group relative overflow-hidden rounded-full bg-taccxi-red px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-taccxi-white transition-all hover:bg-taccxi-accent-2 lg:px-6 lg:py-3 lg:text-sm"
        >
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
            aria-hidden
          />
          Pide tu Taccxi
        </button>
      </div>
    </header>
  );
}
