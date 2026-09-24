import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Facebook, Share2, Check } from "lucide-react";
import { usePageMeta } from "../../utils/seo";
import { SOCIAL_LINKS } from "../../utils/contact";

const REDIRECT_MS = 12000;

export const Gracias: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [autoRedirect, setAutoRedirect] = useState(true);

  usePageMeta(
    "Mensaje Recibido | DYF Telecomunicaciones",
    "Gracias por contactar con DYF Telecomunicaciones. Hemos recibido su consulta y nuestro equipo técnico le responderá a la mayor brevedad.",
    { noindex: true }
  );

  useEffect(() => {
    if (!autoRedirect) return;
    const timer = setTimeout(() => {
      navigate("/");
    }, REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [navigate, autoRedirect]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "DYF Telecomunicaciones y Servicios",
          text: "Instalación y mantenimiento de antenas, porteros y telecomunicaciones en Madrid.",
          url: window.location.origin
        });
      } catch {
        // Ignored if user dismissed share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-40 pb-20"
    >
      {/* Decorative Industrial Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute top-24 left-10 text-[10px] font-label uppercase tracking-[0.4em] text-outline font-bold">Ref: TX-2026-SYS</div>
        <div className="absolute bottom-10 right-10 text-[10px] font-label uppercase tracking-[0.4em] text-outline font-bold">Lat: 40.3061 / Long: -3.7341</div>
      </div>

      <Link to="/" aria-label="DYF Telecomunicaciones: ir al inicio" className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 flex items-center gap-4 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange">
        <img src="/DyfLogo.webp" alt="" className="h-10 w-auto opacity-70" />
        <span className="hidden sm:inline font-headline font-bold text-xl tracking-tighter text-on-surface uppercase font-black">DYF <span className="text-signal-orange">TELECOMUNICACIONES</span></span>
      </Link>

      <div className="relative z-10 w-full max-w-2xl bg-surface-highest/60 backdrop-blur-3xl p-8 sm:p-12 md:p-20 shadow-2xl border-l-2 border-signal-orange">
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
              Hemos recibido tu consulta correctamente. Nuestro equipo técnico revisará la información y se pondrá en contacto contigo en un plazo máximo de 24 horas laborables.
            </p>
          </div>

          {autoRedirect && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-2 h-2 bg-signal-orange animate-pulse" aria-hidden="true"></div>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
                Serás redirigido al inicio automáticamente en unos segundos.
              </p>
              <button
                type="button"
                onClick={() => setAutoRedirect(false)}
                className="inline-block py-3 font-label text-xs uppercase tracking-[0.2em] text-primary-orange font-bold underline underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange cursor-pointer"
              >
                Quedarme en esta página
              </button>
            </div>
          )}

          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-6">
            <Link
              to="/"
              className="group relative px-8 py-4 bg-signal-orange text-surface font-headline font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-all hover:brightness-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Volver al inicio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <div className="flex items-center gap-6">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Síguenos:</span>
              <div className="flex items-center gap-4">
                <a
                  className="text-on-surface-variant hover:text-signal-orange transition-colors p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-on-surface-variant hover:text-signal-orange transition-colors p-2.5 cursor-pointer relative focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                  aria-label={copied ? "Enlace copiado" : "Compartir web"}
                  title="Compartir"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
                  {copied && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] bg-black text-white px-2 py-0.5 rounded whitespace-nowrap" aria-hidden="true">
                      Copiado
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <img
          alt=""
          className="w-full h-full object-cover grayscale"
          src="/images/gracias-fibra.webp"
        />
      </div>
    </motion.div>
  );
};
