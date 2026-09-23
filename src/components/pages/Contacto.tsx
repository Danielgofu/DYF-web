import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Smartphone, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Network,
  Instagram,
  Facebook,
  AlertCircle
} from "lucide-react";
import { NeuralNetworkBackground } from "../NeuralNetworkBackground";
import { usePageMeta } from "../../utils/seo";
import { CONTACT, SOCIAL_LINKS } from "../../utils/contact";

export const Contacto: React.FC = () => {
  const navigate = useNavigate();
  usePageMeta(
    "Contacto Directo y Presupuestos | DYF Telecomunicaciones",
    "Solicite presupuesto o auditoría técnica para su comunidad o empresa en Madrid. Atención telefónica 916 01 84 94 y respuesta en menos de 24h laborables."
  );

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 overflow-x-hidden min-h-screen"
    >
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-24 relative z-10 pt-10">
        <NeuralNetworkBackground opacity={0.25} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-1/2 text-left">
            <div className="inline-flex items-center gap-2 mb-6 text-signal-orange">
              <span className="w-12 h-[1px] bg-signal-orange"></span>
              <span className="font-label text-xs uppercase tracking-[0.3em] font-bold">Contacto de Precisión</span>
            </div>
            <h1 className="font-headline text-[clamp(2.5rem,8vw,5.5rem)] lg:text-8xl font-bold leading-[0.9] text-on-surface mb-8 tracking-tighter">
              CONECTE CON LA <br className="hidden sm:block" />
              <span className="text-signal-orange italic uppercase">Excelencia</span> TÉCNICA
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-md font-light leading-relaxed">
              Nuestro equipo de ingeniería está listo para diseñar su próximo proyecto de infraestructura de red. La fiabilidad de alta tecnología comienza aquí.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square bg-surface-highest overflow-hidden relative border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover mix-blend-multiply grayscale brightness-50"
                alt="Sala de servidores con rack de red y cableado"
                src="/images/contacto-sala-servidores.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <div className="p-4 bg-signal-orange text-surface">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div className="text-white font-headline text-xl font-bold uppercase tracking-tight">CERTIFICADO<br />ISO 9001</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 md:px-12 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-low p-1 shadow-[40px_40px_80px_rgba(224,122,0,0.03)] border-l border-signal-orange/20">
            <div className="bg-surface-highest p-10 md:p-16 h-full flex flex-col justify-center">
              <h2 className="font-headline text-3xl font-bold uppercase mb-12 tracking-tight flex items-center gap-4">
                <span className="w-2 h-8 bg-signal-orange"></span>
                Protocolo de Consulta
              </h2>
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-on-surface flex items-center gap-4">
                Conectividad Directa
              </h3>
              {[
                { icon: <Smartphone />, label: "Teléfono", value: `${CONTACT.phonePrimary} / ${CONTACT.phoneSecondary}`, link: `tel:${CONTACT.phonePrimaryTel}` },
                { icon: <Mail />, label: "Correo Digital", value: CONTACT.email, link: `mailto:${CONTACT.email}` },
                { icon: <MapPin />, label: "Oficina Física", value: CONTACT.addressShort.toUpperCase(), link: CONTACT.mapsQuery }
              ].map((method, i) => (
                <a 
                  key={i} 
                  href={method.link}
                  target={method.link.startsWith('http') ? "_blank" : undefined}
                  rel={method.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="group block cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6 p-6 sm:p-8 bg-surface-low border-l-0 group-hover:border-l-[6px] border-signal-orange transition-all duration-300">
                    <div className="text-signal-orange text-2xl sm:text-3xl">{method.icon}</div>
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-widest text-outline-variant mb-1">{method.label}</p>
                      <p className="font-headline text-lg sm:text-xl font-medium">{method.value}</p>
                    </div>
                  </div>
                </a>
              ))}

              <div className="bg-surface-low p-8 border-l border-signal-orange/20">
                <p className="font-label text-[10px] uppercase tracking-widest text-outline-variant mb-3 font-bold">Horario de Atención</p>
                <p className="font-headline text-lg font-medium text-white">Lunes a Viernes</p>
                <p className="font-label text-xs uppercase tracking-widest text-signal-orange mt-1">9:00 - 14:00 h</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguir a DYF Telecomunicaciones en Instagram"
                  className="bg-surface-low p-6 flex items-center justify-center gap-3 border border-outline-variant/10 hover:border-signal-orange text-on-surface-variant hover:text-signal-orange hover:-translate-y-1 hover:shadow-xl transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                >
                  <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-label text-xs uppercase tracking-widest font-bold">Instagram</span>
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguir a DYF Telecomunicaciones en Facebook"
                  className="bg-surface-low p-6 flex items-center justify-center gap-3 border border-outline-variant/10 hover:border-signal-orange text-on-surface-variant hover:text-signal-orange hover:-translate-y-1 hover:shadow-xl transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                >
                  <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-label text-xs uppercase tracking-widest font-bold">Facebook</span>
                </a>
              </div>
            </div>

            <div className="bg-surface-highest p-10 border-t-4 border-signal-orange">
              <h3 className="font-headline text-xl font-bold uppercase mb-8">Protocolos de Servicio</h3>
              <div className="space-y-6">
                {[
                  { label: "Tiempo de Respuesta", text: "Todas las consultas son procesadas por un supervisor técnico en menos de 24 horas hábiles." },
                  { label: "Soporte Técnico", text: "El soporte de emergencia está disponible 24/7 para comunidades, empresas y particulares a través de la línea de guardia técnica." },
                  { label: "Consultoría", text: "Las revisiones iniciales de arquitectura de proyectos se proporcionan de forma gratuita para empresas industriales." }
                ].map((protocol, i) => (
                  <div key={i} className="border-b last:border-0 border-outline-variant/20 pb-4 last:pb-0">
                    <p className="font-label text-xs font-bold uppercase text-signal-orange mb-2">{protocol.label}</p>
                    <p className="font-body text-sm font-light text-on-surface-variant">{protocol.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[500px] relative overflow-hidden bg-surface-lowest border-y border-outline-variant/10">
        <div className="absolute inset-0 opacity-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.1746381066987!2d-3.7340568999999992!3d40.306140600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4221d0f89b595d%3A0x38115b4a292ef153!2sDYF%20Telecomunicaciones%20y%20Servicios%20S.L.!5e1!3m2!1ses!2ses!4v1776515835259!5m2!1ses!2ses" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Oficinas DYF Telecomunicaciones"
          ></iframe>
        </div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-surface to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none"></div>
      </section>
    </motion.div>
  );
};
