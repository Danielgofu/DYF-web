import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { CONTACT } from "../../utils/contact";

/**
 * El estado del formulario vive aquí, aislado del resto de Mantenimiento.tsx:
 * así cada pulsación de tecla solo vuelve a renderizar este formulario, no la
 * página de mantenimiento completa (hero, portfolio de servicios, etc.).
 */
export const PlanForm: React.FC = () => {
  const navigate = useNavigate();
  const [concept, setConcept] = useState("");
  const [serviceType, setServiceType] = useState("Mantenimiento Integral");
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) {
      setSubmitError("Por favor, especifique el nombre de la comunidad o empresa.");
      return;
    }
    if (!contactInfo.trim()) {
      setSubmitError("Por favor, indique un teléfono o correo electrónico de contacto.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/danielgofu8@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `Solicitud de Plan a Medida: ${concept} - ${serviceType}`,
          concepto_o_comunidad: concept,
          tipo_de_servicio: serviceType,
          datos_contacto: contactInfo,
          _template: "table"
        })
      });

      if (response.ok) {
        navigate("/gracias");
      } else {
        setSubmitError(`Hubo un problema al tramitar su solicitud. Por favor, llame directamente al ${CONTACT.phonePrimary}.`);
      }
    } catch {
      setSubmitError("Error de conexión. Por favor, compruebe su conexión o contáctenos telefónicamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmitPlan}>
      <div>
        <label htmlFor="plan_concept" className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Concepto (Comunidad / Empresa)</label>
        <input
          id="plan_concept"
          className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-sm py-4 px-4 transition-all text-white"
          type="text"
          placeholder="Ej: Edificio Central Getafe"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="plan_service_type" className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Tipo de Servicio Requerido</label>
        <select
          id="plan_service_type"
          className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-sm py-4 px-4 appearance-none text-white cursor-pointer"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="Mantenimiento Integral">Mantenimiento Integral</option>
          <option value="Antenas y Datos">Antenas y Datos</option>
          <option value="Porteros y Videoporteros">Porteros y Videoporteros</option>
          <option value="Electricidad y LED">Electricidad y LED</option>
          <option value="Seguridad CCTV">Seguridad CCTV</option>
        </select>
      </div>
      <div>
        <label htmlFor="plan_contact_info" className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Teléfono o Email de Contacto</label>
        <input
          id="plan_contact_info"
          className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-sm py-4 px-4 transition-all text-white"
          type="text"
          placeholder="Ej: 600 000 000 o admin@finca.com"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>

      {submitError && (
        <div role="alert" className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-signal-orange text-surface py-5 font-headline font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? "Enviando solicitud..." : "Enviar solicitud técnica"}
      </button>
    </form>
  );
};
