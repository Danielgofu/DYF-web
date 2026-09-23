import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { NeuralNetworkBackground } from "../NeuralNetworkBackground";
import { usePageMeta } from "../../utils/seo";

export const NotFoundView: React.FC = () => {
  const navigate = useNavigate();

  usePageMeta(
    "Página no encontrada - 404 | DYF Telecomunicaciones",
    "La página que está buscando no existe o ha sido trasladada. DYF Telecomunicaciones y Servicios."
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-surface overflow-hidden p-6">
      <NeuralNetworkBackground opacity={0.15} />
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 inline-flex items-center justify-center p-6 bg-signal-orange/10 border border-signal-orange/20 rounded-full"
        >
          <AlertTriangle className="w-16 h-16 text-signal-orange" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-headline text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-white"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 w-24 bg-signal-orange mx-auto mb-8"
        ></motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-headline text-2xl md:text-4xl font-bold uppercase tracking-tight mb-6 text-on-surface"
        >
          Infraestructura no Encontrada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body text-on-surface-variant text-lg mb-12 max-w-lg mx-auto leading-relaxed"
        >
          La ruta que intenta alcanzar ha sido desconectada o no existe en nuestra base de datos técnica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-3 bg-signal-orange text-surface px-8 py-4 font-label font-bold uppercase tracking-widest text-sm hover:bg-primary-orange transition-all active:scale-[0.98] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 border border-outline-variant/30 text-on-surface px-8 py-4 font-label font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>
        </motion.div>
      </div>

      {/* Technical coordinate markings */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-outline-variant uppercase tracking-widest">
        Pos: 40.3061° N / 3.7340° W
      </div>
      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-outline-variant uppercase tracking-widest">
        Status: Error_Packet_Loss
      </div>
    </div>
  );
};
