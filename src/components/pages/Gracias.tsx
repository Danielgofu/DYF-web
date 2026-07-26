import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Facebook, Share2 } from "lucide-react";
import { PageProps } from "../../types";

export const Gracias: React.FC<PageProps> = ({ setActivePage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center blueprint-grid relative px-6 py-20"
    >
      {/* Decorative Industrial Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-[10px] font-label uppercase tracking-[0.4em] text-outline font-bold">Ref: TX-2026-SYS</div>
        <div className="absolute bottom-10 right-10 text-[10px] font-label uppercase tracking-[0.4em] text-outline font-bold">Lat: 40.4168 / Long: -3.7038</div>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 flex items-center gap-4">
        <img src="/DyfLogo.webp" alt="DYF Logo" className="h-10 w-auto opacity-50" />
        <span className="font-headline font-bold text-xl tracking-tighter text-on-surface uppercase font-black">DYF <span className="text-signal-orange">TELECOMUNICACIONES</span></span>
      </div>

      <main className="relative z-10 w-full max-w-2xl bg-surface-highest/60 backdrop-blur-3xl p-12 md:p-20 shadow-2xl border-l-2 border-signal-orange">
        <div className="flex flex-col items-start gap-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center border border-signal-orange/30 bg-signal-orange/10">
              <CheckCircle2 className="text-signal-orange w-10 h-10" />
            </div>
            <div className="h-[1px] w-24 bg-outline-variant/30"></div>
          </div>

          <div className="space-y-6">
            <h1 className="font-headline font-bold text-4xl md:text-6xl tracking-tight text-on-surface uppercase leading-tight">
              ¡Gracias por tu mensaje!
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant font-light max-w-lg leading-relaxed">
              Hemos recibido tu consulta correctamente. Nuestro equipo técnico revisará la información y se pondrá en contacto contigo a la brevedad posible.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-signal-orange animate-pulse"></div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline font-bold">
              Serás redirigido al inicio automáticamente en unos segundos.
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-6">
            <button 
              onClick={() => setActivePage("Inicio")}
              className="group relative px-8 py-4 bg-signal-orange text-surface font-headline font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-all hover:brightness-110 active:scale-95"
            >
              Volver al inicio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex items-center gap-6">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Síguenos:</span>
              <div className="flex gap-4">
                <a className="text-on-surface-variant hover:text-signal-orange transition-colors" href="#"><Facebook className="w-5 h-5" /></a>
                <a className="text-on-surface-variant hover:text-signal-orange transition-colors" href="#"><Share2 className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <img 
          alt="Industrial hardware" 
          className="w-full h-full object-cover grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-8Yfd4juu0zJIZtN6QxW0o8v-NKLbUgakXQyVd1T7cHLEiEjauaetAjBuJyghJviD_JJIcy7LBlbIG7Pb3WMpHtH4nzjSLHulXB-IcjyjJcJqvtMQIZkGxPIbRh8HRgIl1tMktZWsHyklfBlpbw9NdDTU2sH3tAAe37Ne-YN3jWJO6UaBDIhubldIz51Z95A8FiLv_qW4taOxPUX039YKisIXK5Sh-Tcmk8sTdpJAtpp-l4dH0kjsj8BzuRmj7DY_mft8p6qOz74i"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
};
