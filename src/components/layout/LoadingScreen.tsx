import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INICIALIZANDO SISTEMAS...");

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      setStatus("SISTEMA LISTO");
      return;
    }

    // Progreso simulado rápido para dar feedback visual mientras carga realmente
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Se queda al 90% hasta que App diga que terminó
        const diff = Math.random() * 20;
        return Math.min(prev + diff, 90);
      });
    }, 150);

    const statusUpdates = [
      { p: 10, s: "AUTENTICANDO PROTOCOLOS..." },
      { p: 30, s: "ESTABLECIENDO CONEXIÓN SEGURA..." },
      { p: 50, s: "VERIFICANDO INFRAESTRUCTURA..." },
      { p: 75, s: "SINCRONIZANDO NODOS DE RED..." },
      { p: 90, s: "OPTIMIZANDO INTERFAZ..." },
    ];

    const statusInterval = setInterval(() => {
      const currentStatus = statusUpdates.find(u => progress < u.p);
      if (currentStatus) setStatus(currentStatus.s);
      else setStatus("SISTEMA LISTO");
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [isLoading, progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="loading-screen"
          role="status"
          aria-live="polite"
          aria-label={`Cargando, ${Math.round(progress)}%`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Background Technical Elements */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-signal-orange/30 shadow-[0_0_15px_rgba(255,102,0,0.5)] animate-pulse"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-signal-orange/30 shadow-[0_0_15px_rgba(255,102,0,0.5)] animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,102,0,0.05)_0%,transparent_70%)]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-md w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5
              }}
              className="mb-12 relative"
            >
              {/* Logo Glow */}
              <div className="absolute inset-0 bg-signal-orange/20 blur-3xl rounded-full scale-150"></div>
              
              <img 
                src="/DyfLogo.webp" 
                alt="Logo DYF" 
                className="h-24 md:h-32 w-auto object-contain relative z-10"
              />
            </motion.div>

            {/* Technical Loading Bar */}
            <div className="w-full h-1 bg-outline-variant/20 rounded-full mb-4 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-signal-orange shadow-[0_0_10px_#ff6600]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>

            <div className="flex justify-between w-full mb-8 font-mono text-[10px] tracking-widest uppercase">
              <motion.span 
                key={status}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-on-surface-variant font-bold"
              >
                {status}
              </motion.span>
              <span className="text-signal-orange font-bold">{Math.round(progress)}%</span>
            </div>

            {/* Matrix-like decorative elements */}
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [2, 10, 2],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                  className="w-1 bg-signal-orange/50"
                />
              ))}
            </div>
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-signal-orange/30"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-signal-orange/30"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-signal-orange/30"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-signal-orange/30"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
