import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";

/**
 * El estado del formulario (formData/errors/isSubmitting) vive aquí, aislado
 * del resto de Contacto.tsx: así cada pulsación de tecla solo vuelve a
 * renderizar este formulario, no la página completa (hero, sidebar, mapa...).
 */
export const ContactForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    reason: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo electrónico no es válido.";
    }

    if (!formData.phone.trim()) {
      // Opcional, pero si quieres forzarlo:
      // newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[0-1]{0,1}[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = "Formato no válido.";
    }

    if (!formData.reason) {
      newErrors.reason = "Seleccione un motivo.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Mensaje demasiado corto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        const response = await fetch("https://formsubmit.co/ajax/danielgofu8@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: `Nueva consulta Web de: ${formData.full_name} - ${formData.reason}`,
            nombre: formData.full_name,
            email: formData.email,
            telefono: formData.phone || "No indicado",
            motivo: formData.reason,
            mensaje: formData.message,
            _replyto: formData.email,
            _template: "table" // Utiliza una plantilla de tabla para que el correo se vea limpio
          })
        });

        if (response.ok) {
          navigate("/gracias");
          setFormData({
            full_name: "",
            email: "",
            phone: "",
            reason: "",
            message: ""
          });
        } else {
          setErrors({ message: "Hubo un problema con el servidor de correo. Por favor, intente más tarde." });
        }
      } catch (error) {
        setErrors({ message: "No se pudo conectar. Compruebe su conexión a internet." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpiar error al escribir
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="relative group">
          <input
            className="w-full bg-transparent border-none px-0 py-3 font-body text-on-surface placeholder-transparent peer focus:ring-0"
            id="full_name"
            placeholder="Nombre Completo"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            aria-invalid={!!errors.full_name}
            aria-describedby={errors.full_name ? "full_name-error" : undefined}
          />
          <label className="absolute left-0 top-0 text-sm font-label uppercase tracking-widest text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-signal-orange" htmlFor="full_name">Nombre Completo</label>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant/30 group-focus-within:h-[2px] group-focus-within:bg-signal-orange transition-all"></div>
          {errors.full_name && (
            <p id="full_name-error" role="alert" className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-label uppercase tracking-widest flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.full_name}
            </p>
          )}
        </div>
        <div className="relative group">
          <input
            className="w-full bg-transparent border-none px-0 py-3 font-body text-on-surface placeholder-transparent peer focus:ring-0"
            id="email"
            placeholder="Correo Electrónico"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <label className="absolute left-0 top-0 text-sm font-label uppercase tracking-widest text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-signal-orange" htmlFor="email">Correo Electrónico</label>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant/30 group-focus-within:h-[2px] group-focus-within:bg-signal-orange transition-all"></div>
          {errors.email && (
            <p id="email-error" role="alert" className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-label uppercase tracking-widest flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>
        <div className="relative group">
          <input
            className="w-full bg-transparent border-none px-0 py-3 font-body text-on-surface placeholder-transparent peer focus:ring-0"
            id="phone"
            placeholder="Número de Teléfono"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <label className="absolute left-0 top-0 text-sm font-label uppercase tracking-widest text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-signal-orange" htmlFor="phone">Teléfono (Opcional)</label>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant/30 group-focus-within:h-[2px] group-focus-within:bg-signal-orange transition-all"></div>
          {errors.phone && (
            <p id="phone-error" role="alert" className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-label uppercase tracking-widest flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
        <div className="relative group">
          <label className="absolute left-0 -top-4 text-xs font-label uppercase tracking-widest text-signal-orange" htmlFor="reason">Motivo de Consulta</label>
          <select
            className="w-full bg-transparent border-none px-0 py-3 font-body text-on-surface appearance-none focus:ring-0 cursor-pointer"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            aria-invalid={!!errors.reason}
            aria-describedby={errors.reason ? "reason-error" : undefined}
          >
            <option className="bg-surface text-on-surface-variant" value="">Motivo de Consulta</option>
            <option className="bg-surface text-on-surface" value="comunidad">Mantenimiento Comunidad</option>
            <option className="bg-surface text-on-surface" value="antenas">Antenas y TV (TDT/SAT)</option>
            <option className="bg-surface text-on-surface" value="porteros">Porteros y Videoporteros</option>
            <option className="bg-surface text-on-surface" value="seguridad">Alarmas, CCTV y Seguridad</option>
            <option className="bg-surface text-on-surface" value="redes">Redes e Informática</option>
            <option className="bg-surface text-on-surface" value="electricidad">Electricidad e Iluminación LED</option>
            <option className="bg-surface text-on-surface" value="presupuesto">Solicitud de Presupuesto</option>
            <option className="bg-surface text-on-surface" value="otros">Otros Asuntos</option>
          </select>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant/30 group-focus-within:h-[2px] group-focus-within:bg-signal-orange transition-all"></div>
          <div className="absolute right-0 top-3 pointer-events-none text-signal-orange">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
          {errors.reason && (
            <p id="reason-error" role="alert" className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-label uppercase tracking-widest flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.reason}
            </p>
          )}
        </div>
      </div>

      <div className="relative group pt-4">
        <textarea
          className="w-full bg-transparent border-none px-0 py-3 font-body text-on-surface placeholder-transparent peer resize-none focus:ring-0 min-h-[120px]"
          id="message"
          placeholder="Su Mensaje"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        ></textarea>
        <label className="absolute left-0 top-4 text-sm font-label uppercase tracking-widest text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-7 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-signal-orange" htmlFor="message">Detalles de su Consulta</label>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant/30 group-focus-within:h-[2px] group-focus-within:bg-signal-orange transition-all"></div>
        {errors.message && (
          <p id="message-error" role="alert" className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-label uppercase tracking-widest flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
        <div className="flex justify-between items-center mt-3">
          <span className="text-[9px] font-label uppercase tracking-widest text-outline-variant/60">PROTOCOLO SEGURO SSL</span>
          <span className={`text-[9px] font-label uppercase tracking-widest transition-colors ${formData.message.length > 450 ? 'text-signal-orange' : 'text-on-surface-variant'}`}>
            {formData.message.length} / 500
          </span>
        </div>
      </div>

      <button
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-primary-orange to-signal-orange text-surface font-headline font-bold uppercase tracking-widest py-6 text-lg hover:brightness-110 hover:shadow-[0_20px_40px_rgba(242,125,38,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        <ArrowRight className="group-hover:translate-x-3 transition-transform" />
      </button>
    </form>
  );
};
