import type { Metadata } from "next";
import { Alegreya_Sans, Didact_Gothic } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

const photographSignature = localFont({
  src: "../public/brand/Photograph Signature.ttf",
  variable: "--font-signature",
});

const didactGothic = Didact_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Taccxi — Road to Dreams",
  description:
    "Transporte tecnológico de personas. Reserva tu recogida con Taccxi: seguridad, compromiso y buena energía.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${alegreyaSans.variable} ${didactGothic.variable} ${photographSignature.variable} h-full`}>
      <body className="min-h-full font-body antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
