// Año de fundación y horario: viven en empresa.json porque también los usa el build
// (scripts/generar-cabeceras.mjs comprueba que el JSON-LD de index.html coincide con ellos).
import empresa from "./empresa.json";

/** Año de fundación de la empresa. Úselo en lugar de escribir el año a mano. */
export const FOUNDING_YEAR = empresa.foundingYear;

/** Años de trayectoria, calculados con el año actual. */
export const yearsInBusiness = () => new Date().getFullYear() - FOUNDING_YEAR;

const DAYS = empresa.openingHours.daysLabel;
// "09:00" -> "9:00", como se ha mostrado siempre en la web.
const hhmm = (t: string) => t.replace(/^0/, "");
/** Cada tramo por separado ("9:00 - 14:00", "16:00 - 19:00"), para mostrarlos en líneas distintas. */
const TIME_SLOTS = empresa.openingHours.slots.map((s) => `${hhmm(s.opens)} - ${hhmm(s.closes)}`);
const TIME_RANGE = `${TIME_SLOTS.join(" y ")} h`;

export const CONTACT = {
  phonePrimary: "916 01 84 94",
  phonePrimaryTel: "+34916018494",
  phoneSecondary: "918 31 20 61",
  phoneSecondaryTel: "+34918312061",
  email: "info@dyfservicios.com",
  addressShort: "C. Valdemorillo, 20, 28901 Getafe",
  addressFull: "C. Valdemorillo, 20, 28901 Getafe, Madrid",
  days: DAYS,
  timeRange: TIME_RANGE,
  timeSlots: TIME_SLOTS,
  hours: `${DAYS}: ${TIME_RANGE}`,
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.1746381066987!2d-3.7340568999999992!3d40.306140600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4221d0f89b595d%3A0x38115b4a292ef153!2sDYF%20Telecomunicaciones%20y%20Servicios%20S.L.!5e1!3m2!1ses!2ses!4v1776515835259!5m2!1ses!2ses",
  mapsQuery: "https://www.google.com/maps/search/?api=1&query=DYF+Telecomunicaciones+C.+Valdemorillo+20+28901+Getafe",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/dyftelecomunicaciones",
  facebook: "https://www.facebook.com/DYFTelecomunicaciones/",
} as const;
