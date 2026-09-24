import React from "react";
import { Link } from "react-router-dom";

/**
 * Información básica de protección de datos (primera capa) bajo los formularios.
 * Es un aviso informativo, no una casilla de consentimiento.
 */
export const PrivacyNotice: React.FC = () => (
  <p className="font-body text-[11px] leading-relaxed text-on-surface-variant">
    Los datos que nos facilite en este formulario serán tratados por DYF Telecomunicaciones y Servicios, S.L. con la
    única finalidad de responder a su solicitud. Puede consultar cómo tratamos sus datos y ejercer sus derechos en
    nuestra{" "}
    <Link
      to="/politica-privacidad"
      className="text-primary-orange underline underline-offset-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
    >
      Política de Privacidad
    </Link>
    .
  </p>
);
