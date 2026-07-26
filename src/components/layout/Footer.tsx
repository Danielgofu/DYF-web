import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { PageProps } from "../../types";

export const Footer: React.FC<PageProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-surface-lowest w-full border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-12 py-16 max-w-[1920px] mx-auto">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <div className="text-lg font-black text-white font-headline uppercase mb-4">DYF TELECOMUNICACIONES Y SERVICIOS, S.L.</div>
            <p className="text-gray-500 font-body text-xs tracking-widest uppercase leading-loose max-w-sm">
              Arquitectura de telecomunicaciones crítica para la próxima era industrial.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/dyftelecomunicaciones" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-signal-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
              aria-label="Seguir a DYF Telecomunicaciones en Instagram"
              title="Visitar nuestro Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/DYFTelecomunicaciones/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-signal-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
              aria-label="Seguir a DYF Telecomunicaciones en Facebook"
              title="Visitar nuestro Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="text-[10px] font-label uppercase tracking-widest text-gray-600">
            © 2026 DYF TELECOMUNICACIONES Y SERVICIOS, S.L. PRECISIÓN INDUSTRIAL GARANTIZADA.
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Enlaces</span>
            <nav aria-label="Enlaces rápidos" className="flex flex-col gap-3">
              {["Inicio", "Equipo", "Contacto", "Servicios", "Mantenimiento"].map((page) => (
                <button 
                  key={page}
                  onClick={() => setActivePage(page as any)} 
                  className="text-left text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:text-signal-orange"
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Contacto</span>
            <div className="flex flex-col gap-3">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 leading-relaxed space-y-4">
                <p>
                  Tfno1: 916 01 84 94<br />
                  Tfno2: 918 31 20 61<br />
                  Email: info@dyfservicios.com<br />
                  C. Valdemorillo, 20, 28901 Getafe
                </p>
                <div>
                  <span className="text-signal-orange/60 font-bold block mb-1">Horario de Oficina</span>
                  Lunes a Viernes: 9:00 AM - 14:00 PM
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Legal</span>
            <nav aria-label="Información legal" className="flex flex-col gap-3">
              <button 
                onClick={() => setActivePage("PoliticaPrivacidad")} 
                className="text-left text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:text-signal-orange"
              >
                Protocolo de Privacidad
              </button>
              <button 
                onClick={() => setActivePage("AvisoLegal")} 
                className="text-left text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:text-signal-orange"
              >
                Aviso Legal
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
