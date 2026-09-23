import React from "react";

/**
 * Ilustración vectorial propia de un videoportero de pared, dibujada para este
 * proyecto (sin ninguna dependencia de fotografías de terceros ni de productos
 * de ninguna marca), de forma que no exista ningún riesgo de derechos de imagen.
 */
export const VideoIntercomGraphic: React.FC<{ className?: string; decorative?: boolean }> = ({ className, decorative = false }) => (
  <svg
    viewBox="0 0 300 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...(decorative
      ? { "aria-hidden": true }
      : { role: "img", "aria-label": "Ilustración de un videoportero de pared" })}
  >
    {/* Carcasa */}
    <rect x="30" y="20" width="240" height="420" rx="24" stroke="currentColor" strokeWidth="4" opacity="0.5" />
    <rect x="30" y="20" width="240" height="420" rx="24" fill="currentColor" opacity="0.04" />

    {/* Cámara */}
    <circle cx="150" cy="80" r="16" stroke="currentColor" strokeWidth="4" opacity="0.7" />
    <circle cx="150" cy="80" r="6" fill="currentColor" opacity="0.7" />

    {/* Altavoz */}
    {[0, 1, 2, 3, 4].map((row) => (
      <line
        key={row}
        x1="90"
        y1={130 + row * 12}
        x2="210"
        y2={130 + row * 12}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.35"
      />
    ))}

    {/* Pantalla / indicador */}
    <rect x="80" y="210" width="140" height="60" rx="6" stroke="currentColor" strokeWidth="3" opacity="0.5" />
    <line x1="95" y1="230" x2="180" y2="230" stroke="currentColor" strokeWidth="3" opacity="0.35" />
    <line x1="95" y1="245" x2="150" y2="245" stroke="currentColor" strokeWidth="3" opacity="0.35" />

    {/* Botones de llamada */}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <circle cx="70" cy={310 + i * 40} r="10" stroke="currentColor" strokeWidth="3" opacity="0.6" />
        <line x1="95" y1={310 + i * 40} x2="225" y2={310 + i * 40} stroke="currentColor" strokeWidth="3" opacity="0.25" />
      </g>
    ))}
  </svg>
);
