import React, { useState } from "react";
import { Plus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * El estado de "qué pregunta está abierta" vive aquí, no en la página que la
 * contiene: así, al abrir/cerrar una pregunta, React solo vuelve a renderizar
 * este acordeón (unas pocas filas) en lugar de la página completa (hero,
 * contadores animados, tarjetas de servicios, etc.).
 */
export const FaqAccordion: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isFaqOpen = openFaq === i;
        return (
          <div key={i} className="group">
            <button
              onClick={() => toggleFaq(i)}
              className="w-full bg-surface-low p-8 flex justify-between items-center cursor-pointer hover:bg-surface-highest transition-all border-l-2 border-transparent hover:border-signal-orange text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
              aria-expanded={isFaqOpen}
            >
              <span className="font-headline font-bold uppercase text-sm tracking-widest leading-relaxed pr-8">{item.q}</span>
              <Plus className={`text-signal-orange shrink-0 transition-transform duration-300 ${isFaqOpen ? 'rotate-45' : ''}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isFaqOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-8 bg-surface-highest/50 border-t border-outline-variant/10 text-sm text-on-surface-variant leading-relaxed font-light">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
