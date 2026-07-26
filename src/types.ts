export type Page = "Inicio" | "Equipo" | "Servicios" | "Contacto" | "Mantenimiento" | "Gracias" | "AvisoLegal" | "PoliticaPrivacidad" | "NotFound";

export interface PageProps {
  setActivePage: (page: Page) => void;
}
