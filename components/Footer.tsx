import Image from "next/image";
import { buildWhatsAppContactUrl } from "@/lib/whatsapp";

const legalLinks = [
  { label: "Términos de servicio", href: "#" },
  { label: "Política de privacidad", href: "#" },
  { label: "Aviso legal", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-taccxi-dark-300 bg-taccxi-dark-200 px-6 py-16 text-taccxi-white lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Image
            src="/brand/logos/LOGO-TACCXI-gris-blanco.png"
            alt="Taccxi"
            width={130}
            height={32}
            className="h-7 w-auto opacity-95"
          />
          <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-gray-400">
            © {new Date().getFullYear()} Taccxi. Todos los derechos reservados.
          </p>
          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs text-gray-400 transition-colors hover:text-taccxi-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="lg:text-right">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-taccxi-white">
            Comunícate con nosotros
          </p>
          <p className="mt-3 font-body text-sm text-gray-400">
            Soporte y atención directa para tu reserva.
          </p>
          <a
            href={buildWhatsAppContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex items-center font-body text-sm text-taccxi-red transition-opacity hover:opacity-80"
          >
            Contactar por WhatsApp
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
