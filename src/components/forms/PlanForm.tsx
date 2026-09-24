import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { CONTACT } from "../../utils/contact";
import { PrivacyNotice } from "./PrivacyNotice";
import { EMAIL_PATTERN, isSubmissionAccepted, isValidPhone } from "../../utils/formsubmit";

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
  // Honeypot antispam: invisible para personas; los bots que rellenan todo lo completan.
  const [honey, setHoney] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [invalidField, setInvalidField] = useState<"plan_concept" | "plan_contact_info" | null>(null);

  const fail = (field: "plan_concept" | "plan_contact_info" | null, message: string) => {
    setInvalidField(field);
    setSubmitError(message);
    if (field) document.getElementById(field)?.focus();
  };

  const handleSubmitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const contact = contactInfo.trim();
    if (!concept.trim()) {
      fail("plan_concept", "Por favor, especifique el nombre de la comunidad o empresa.");
      return;
    }
    if (!contact) {
      fail("plan_contact_info", "Por favor, indique un teléfono o correo electrónico de contacto.");
      return;
    }
    if (!EMAIL_PATTERN.test(contact) && !isValidPhone(contact)) {
      fail("plan_contact_info", "Indique un correo electrónico o un teléfono válido para poder contactarle.");
      return;
    }

    fail(null, "");

    if (honey) {
      // Probable bot: se simula el éxito sin enviar nada.
      navigate("/gracias");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/danielgofu8@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `Solicitud de Plan a Medida: ${concept.trim()} - ${serviceType}`,
          concepto_o_comunidad: concept.trim(),
          tipo_de_servicio: serviceType,
          datos_contacto: contact,
          _honey: honey,
          _template: "table"
        })
      });

      if (await isSubmissionAccepted(response)) {
        navigate("/gracias");
        return;
      }
      fail(null, `Hubo un problema al tramitar su solicitud. Por favor, llame directamente al ${CONTACT.phonePrimary}.`);
    } catch {
      fail(null, "Error de conexión. Por favor, compruebe su conexión o contáctenos telefónicamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearErrorFor = (field: "plan_concept" | "plan_contact_info") => {
    if (invalidField === field) fail(null, "");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmitPlan} noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="plan_honey">No rellene este campo</label>
        <input
          id="plan_honey"
          name="_honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="plan_concept" className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Concepto (Comunidad / Empresa)</label>
        <input
          id="plan_concept"
          className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-base sm:text-sm py-4 px-4 transition-all text-white"
          type="text"
          placeholder="Ej: Edificio Central Getafe"
          maxLength={150}
          value={concept}
          onChange={(e) => {
            setConcept(e.target.value);
            clearErrorFor("plan_concept");
          }}
          required
          aria-invalid={invalidField === "plan_concept"}
          aria-describedby={invalidField === "plan_concept" ? "plan-error" : undefined}
        />
      </div>
      <div>
        <label htmlFor="plan_service_type" className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Tipo de Servicio Requerido</label>
        <select
          id="plan_service_type"
          className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-base sm:text-sm py-4 px-4 appearance-none text-white cursor-pointer"
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
          className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-base sm:text-sm py-4 px-4 transition-all text-white"
          type="text"
          placeholder="Teléfono o email"
          maxLength={254}
          value={contactInfo}
          onChange={(e) => {
            setContactInfo(e.target.value);
            clearErrorFor("plan_contact_info");
          }}
          required
          aria-invalid={invalidField === "plan_contact_info"}
          aria-describedby={invalidField === "plan_contact_info" ? "plan-error" : undefined}
        />
      </div>

      {submitError && (
        <div id="plan-error" role="alert" className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-signal-orange text-surface py-5 font-headline font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {isSubmitting ? "Enviando solicitud..." : "Enviar solicitud técnica"}
      </button>

      <PrivacyNotice />
    </form>
  );
};
