import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { BookingForm } from "@/components/BookingForm";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { CoverageSection } from "@/components/CoverageSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <main className="bg-taccxi-white text-taccxi-dark-100">
        <Hero />
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
    </>
  );
}
