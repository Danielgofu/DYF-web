import React from "react";
import { CONTACT } from "../utils/contact";

/**
 * Tramos del horario, uno por línea y sin partirse por dentro:
 *   9:00 - 14:00 y
 *   16:00 - 19:00 h
 * En columnas estrechas (Footer, menú móvil) el texto en una sola línea se cortaba por
 * cualquier sitio ("16:00 -" / "19:00 h" o una "h" sola). El texto es el mismo de
 * CONTACT.timeRange; el espacio tras "y" se conserva para los lectores de pantalla.
 */
export const HorarioTramos: React.FC = () => (
  <>
    {/* Espacio tras "Lunes a Viernes:" para que el texto no quede pegado ("Viernes:9:00"). */}
    {" "}
    {CONTACT.timeSlots.map((slot, i) => (
      <span key={slot} className="block whitespace-nowrap">
        {slot}
        {i < CONTACT.timeSlots.length - 1 ? " y " : " h"}
      </span>
    ))}
  </>
);
