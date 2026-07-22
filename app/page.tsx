import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveTicker } from "@/components/LiveTicker";
import { Features } from "@/components/Features";
import { BookingForm } from "@/components/BookingForm";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { CoverageSection } from "@/components/CoverageSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BookingProvider } from "@/contexts/booking-context";

export default function HomePage() {
  return (
    <BookingProvider>
      <Navbar />
      <FloatingWhatsApp />
      <main className="bg-taccxi-white text-taccxi-dark-100">
        <Hero />
        <LiveTicker />
        <Features />
        <section id="reserva" className="bg-taccxi-surface px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <BookingForm />
            <div className="mt-28 lg:mt-32">
              <ServiceHighlights />
            </div>
          </div>
        </section>
        <CoverageSection />
        <Testimonials />
        <Footer />
      </main>
    </BookingProvider>
  );
}
