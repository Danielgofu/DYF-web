import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

/**
 * Mapa de Google Maps con carga bajo demanda (click-to-load).
 *
 * El <iframe> NO se renderiza hasta que el usuario pulsa el botón: así no se
 * envía ningún dato a Google (IP, cookies...) sin su consentimiento previo.
 * La decisión se recuerda solo durante la visita (sessionStorage), de modo que
 * en una visita nueva se vuelve a pedir.
 */

const CONSENT_KEY = "maps_consent";

function readConsent(): boolean {
  try {
    return sessionStorage.getItem(CONSENT_KEY) === "1";
  } catch {
    // sessionStorage bloqueado por el navegador: se pide siempre.
    return false;
  }
}

function saveConsent() {
  try {
    sessionStorage.setItem(CONSENT_KEY, "1");
  } catch {
    // Sin sessionStorage el mapa se carga igualmente en esta página.
  }
}

interface MapEmbedProps {
  /** URL de inserción de Google Maps (https://www.google.com/maps/embed?...). */
  src: string;
  /** Título accesible del iframe. */
  title: string;
  /** Clases del contenedor: debe ocupar el hueco donde iba el mapa. */
  className?: string;
}

export const MapEmbed: React.FC<MapEmbedProps> = ({ src, title, className = "absolute inset-0" }) => {
  const [loaded, setLoaded] = useState(readConsent);
  const loadedByClick = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Si el mapa se carga tras pulsar el botón, el botón desaparece: se mueve el
  // foco al mapa para que el usuario de teclado no pierda su posición.
  useEffect(() => {
    if (loaded && loadedByClick.current) iframeRef.current?.focus();
  }, [loaded]);

  const handleLoad = () => {
    saveConsent();
    loadedByClick.current = true;
    setLoaded(true);
  };

  if (loaded) {
    return (
      <div className={className}>
        <iframe
          ref={iframeRef}
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        ></iframe>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`${title}: mapa de Google Maps no cargado`}
      className={`${className} flex items-center justify-center bg-surface-lowest bg-[linear-gradient(rgba(249,99,4,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(249,99,4,0.06)_1px,transparent_1px)] bg-[size:40px_40px]`}
    >
      <div className="relative z-30 max-w-md px-6 py-8 text-center flex flex-col items-center gap-5">
        <MapPin className="w-10 h-10 text-signal-orange" aria-hidden="true" />
        <p className="font-body text-on-surface-variant text-sm leading-relaxed">
          El mapa de ubicación se muestra mediante Google Maps y no se carga hasta que usted lo solicite.
        </p>
        <button
          type="button"
          onClick={handleLoad}
          className="bg-signal-orange text-surface px-8 py-4 font-label font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Cargar mapa de Google Maps
        </button>
        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          Al cargar el mapa, Google podrá acceder a su dirección IP y a otros datos técnicos. Más información en nuestra{" "}
          <Link
            to="/politica-privacidad"
            className="text-primary-orange underline underline-offset-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
          >
            Política de Privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
