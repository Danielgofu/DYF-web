import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "../../utils/contact";

const FOOTER_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Equipo", path: "/equipo" },
  { label: "Contacto", path: "/contacto" },
  { label: "Servicios", path: "/servicios" },
  { label: "Mantenimiento", path: "/mantenimiento" },
];

const LEGAL_LINKS = [
  { label: "Política de Privacidad", path: "/politica-privacidad" },
  { label: "Aviso Legal", path: "/aviso-legal" },
];

const linkClass =
  "self-start inline-flex min-h-11 items-center text-xs uppercase tracking-widest text-outline hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-lowest w-full border-t border-outline-variant/10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 px-6 md:px-12 py-16 max-w-[1920px] mx-auto">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <div className="text-lg font-black text-white font-headline uppercase mb-4">DYF TELECOMUNICACIONES Y SERVICIOS, S.L.</div>
            <p className="text-outline font-body text-xs tracking-widest uppercase leading-loose max-w-sm">
              Arquitectura de telecomunicaciones crítica para la próxima era industrial.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 -m-3 text-outline hover:text-signal-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
              aria-label="Instagram de DYF Telecomunicaciones (se abre en una pestaña nueva)"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 -m-3 text-outline hover:text-signal-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
              aria-label="Facebook de DYF Telecomunicaciones (se abre en una pestaña nueva)"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="text-[10px] font-label uppercase tracking-widest text-outline">
            © {new Date().getFullYear()} DYF TELECOMUNICACIONES Y SERVICIOS, S.L. PRECISIÓN INDUSTRIAL GARANTIZADA.
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Enlaces</span>
            <nav aria-label="Enlaces rápidos" className="flex flex-col gap-0">
              {FOOTER_LINKS.map((link) => (
                <Link key={link.path} to={link.path} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Contacto</span>
            <div className="flex flex-col gap-3">
              <div className="text-[10px] uppercase tracking-widest text-outline leading-relaxed space-y-4">
                <p>
                  Tfno1: <a href={`tel:${CONTACT.phonePrimaryTel}`} className="hover:text-white focus-visible:text-white focus-visible:underline">{CONTACT.phonePrimary}</a><br />
                  Tfno2: <a href={`tel:${CONTACT.phoneSecondaryTel}`} className="hover:text-white focus-visible:text-white focus-visible:underline">{CONTACT.phoneSecondary}</a><br />
                  Email: <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white focus-visible:text-white focus-visible:underline">{CONTACT.email}</a><br />
                  {CONTACT.addressShort}
                </p>
                <div>
                  <span className="text-signal-orange font-bold block mb-1">Horario de Oficina</span>
                  {CONTACT.hours}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Legal</span>
            <nav aria-label="Información legal" className="flex flex-col gap-0">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.path} to={link.path} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
