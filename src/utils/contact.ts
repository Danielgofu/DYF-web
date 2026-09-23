const DAYS = "Lunes a Viernes";
const TIME_RANGE = "9:00 - 14:00 h";

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
  hours: `${DAYS}: ${TIME_RANGE}`,
  mapsQuery: "https://www.google.com/maps/search/?api=1&query=DYF+Telecomunicaciones+C.+Valdemorillo+20+28901+Getafe",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/dyftelecomunicaciones",
  facebook: "https://www.facebook.com/DYFTelecomunicaciones/",
} as const;
