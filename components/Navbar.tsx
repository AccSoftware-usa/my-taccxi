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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
          ? "border-b border-black/5 bg-taccxi-white/95 shadow-sm backdrop-blur-md"
          : "bg-taccxi-white/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[4.5rem] lg:px-10">
        <Link href="#hero" aria-label="Taccxi inicio">
          <Image
            src="/brand/logos/LOGO-TACCXI-blanco-con%20negro.png"
            alt="Taccxi"
            width={140}
            height={36}
            className="h-7 w-auto lg:h-8"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={scrollToBooking}
          className="rounded-full bg-taccxi-red px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-taccxi-white transition-colors hover:bg-taccxi-accent-2 lg:px-6 lg:py-3 lg:text-sm"
        >
          Pide tu Taccxi
        </button>
      </div>
    </header>
  );
}
