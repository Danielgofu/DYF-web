import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PowerOff, RefreshCcw } from "lucide-react";

interface OfflineViewProps {
  onRetry: () => Promise<void>;
}

/**
 * Aviso a pantalla completa que se superpone a la web cuando se pierde la
 * conexión. La web sigue montada debajo (inert), así que no se pierde nada de
 * lo que el usuario haya escrito; "Reintentar" comprueba la conexión sin
 * recargar la página.
 */
export const OfflineView: React.FC<OfflineViewProps> = ({ onRetry }) => {
  const [isChecking, setIsChecking] = useState(false);
  const retryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    retryRef.current?.focus();
  }, []);

  const handleRetry = async () => {
    setIsChecking(true);
    await onRetry();
    setIsChecking(false);
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="offline-title"
      aria-describedby="offline-desc"
      className="fixed inset-0 z-[200] bg-surface text-on-surface font-body flex flex-col overflow-y-auto"
    >
      {/* Top Navigation Shell */}
      <header className="bg-surface-lowest border-b border-outline-variant/10 flex items-center px-8 h-20 w-full shrink-0">
        <div className="flex items-center gap-3">
          <img src="/DyfLogo.webp" alt="DYF TELECOMUNICACIONES" className="h-10 md:h-12 w-auto" />
          <span className="text-xl font-bold tracking-tighter text-signal-orange font-headline uppercase hidden sm:block">
            DYF TELECOMUNICACIONES
          </span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <div className="flex-grow infrastructure-grid relative flex items-center justify-center p-6">
        {/* Background Decorative Element */}
        <div className="absolute top-20 left-20 opacity-10 pointer-events-none hidden lg:block" aria-hidden="true">
          <div className="font-label text-[120px] font-black leading-none select-none text-outline-light">
            OFF_LINE
          </div>
          <div className="h-1 w-64 bg-signal-orange mt-4"></div>
        </div>

        {/* Central Focus Module */}
        <div className="relative w-full max-w-xl">
          {/* Ghost Border Decoration */}
          <div className="absolute -inset-4 border border-outline-variant/10 pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-low p-8 sm:p-12 industrial-glow relative border-l-4 border-signal-orange backdrop-blur-xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 relative" aria-hidden="true">
                <div className="absolute -inset-8 bg-signal-orange/10 blur-3xl rounded-full animate-pulse"></div>
                <PowerOff className="w-20 h-20 text-signal-orange" strokeWidth={1} />
              </div>

              <div className="mb-2 font-label text-[10px] uppercase tracking-[0.3em] text-outline font-bold">
                Dyf Telecomunicaciones // Infrastructure Node
              </div>

              <h1 id="offline-title" className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-on-surface mb-6 uppercase">
                Sin conexión
              </h1>

              <p id="offline-desc" className="font-body font-light text-on-surface-variant text-base md:text-lg max-w-sm mb-10 leading-relaxed">
                Por favor, revisa tu conexión y vuelve a intentarlo. Lo que hayas escrito en los formularios se conserva: podrás enviarlo en cuanto vuelva la conexión.
              </p>

              <div className="w-full flex items-center justify-between pt-8 border-t border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 animate-pulse" aria-hidden="true"></div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-red-300 font-bold">STATUS: DISCONNECTED</span>
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline font-medium">
                  Última actualización: Mayo 2026
                </span>
              </div>

              <div className="mt-10 w-full">
                <button
                  ref={retryRef}
                  type="button"
                  onClick={handleRetry}
                  disabled={isChecking}
                  className="group w-full bg-signal-orange text-surface font-bold py-5 px-8 uppercase tracking-widest text-xs hover:brightness-110 transition-all flex items-center justify-center gap-3 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60 cursor-pointer"
                >
                  {isChecking ? "COMPROBANDO..." : "REINTENTAR ENLACE"}
                  <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Decorative Coordinate Tags */}
          <div className="absolute -bottom-8 -right-4 font-label text-[9px] text-outline-variant/40 space-y-1 text-right" aria-hidden="true">
            <div>LAT: 40.4168° N</div>
            <div>LON: 3.7038° W</div>
            <div>REF: INFRA_ERR_0404</div>
          </div>
        </div>
      </div>

      {/* Footer Shell */}
      <footer className="bg-surface-lowest w-full px-8 py-6 flex justify-between items-center border-t border-outline-variant/10 shrink-0" aria-hidden="true">
        <div className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-black">
          SIGNAL_ARCHITECT_V1
        </div>
        <div className="hidden md:flex gap-8">
          {["SYSTEM_STATUS", "SUPPORT_NODE", "RECOVERY_PROTOCOL"].map((link) => (
            <span key={link} className="font-label text-[10px] uppercase tracking-widest text-outline">
              {link}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};
