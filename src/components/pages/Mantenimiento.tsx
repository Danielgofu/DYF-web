import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Building2, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Antenna, 
  Video, 
  Zap, 
  Siren, 
  Plus,
  AlertCircle
} from "lucide-react";
import { usePageMeta } from "../../utils/seo";
import { CONTACT } from "../../utils/contact";

export const Mantenimiento: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta(
    "Servicios de Mantenimiento | DYF Telecomunicaciones",
    "Mantenimiento preventivo y correctivo para comunidades de propietarios e instalaciones críticas en Madrid. Respuesta garantizada en 24h laborables."
  );

  const [concept, setConcept] = useState("");
  const [serviceType, setServiceType] = useState("Mantenimiento Integral");
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 overflow-x-hidden min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[800px] flex items-center overflow-hidden bg-surface-lowest blueprint-grid">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
          <div className="md:col-span-7 z-10 py-20">
            <div className="mb-6 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-signal-orange"></span>
              <span className="font-label uppercase text-[10px] tracking-[0.4em] text-signal-orange font-bold">Unidad de Respuesta Prioritaria</span>
            </div>
            <h1 className="font-headline text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Servicios de <br /><span className="text-signal-orange uppercase">Mantenimiento</span>
            </h1>
            <p className="max-w-xl text-lg font-light text-on-surface-variant mb-12 border-l-2 border-outline-variant/30 pl-8">
              Ingeniería de precisión para antenas, porteros automáticos e infraestructura eléctrica. 
              Garantizamos una <span className="text-white font-bold">Respuesta de Emergencia 24h</span> para sistemas urbanos de misión crítica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate("/contacto")}
                className="bg-gradient-to-r from-primary-orange to-signal-orange text-surface px-10 py-5 font-headline font-black uppercase text-sm tracking-widest active:scale-95 transition-transform cursor-pointer"
              >
                Solicitar Asistencia
              </button>
            </div>
          </div>
          <div className="md:col-span-5 relative hidden md:block">
            <div className="absolute inset-0 bg-surface-highest opacity-5"></div>
            <img 
              className="w-full h-full object-cover grayscale brightness-50 contrast-125 border-l border-signal-orange/20"
              alt="Cuadro eléctrico industrial con cableado"
              src="/images/mantenimiento-cuadro.webp"
            />
            <div className="absolute bottom-10 right-10 bg-signal-orange text-surface p-6 font-headline font-black text-4xl uppercase leading-none shadow-2xl">
              24/7<br /><span className="text-sm font-bold tracking-widest">Disponible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="bg-surface py-32 border-y border-outline-variant/10 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <img 
              className="w-full aspect-[4/5] object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-75"
              alt="Fachada de un edificio de viviendas"
              src="/images/mantenimiento-fachada.webp"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 border-[20px] border-surface/50 pointer-events-none"></div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex items-center gap-2 text-signal-orange">
              <Building2 className="w-5 h-5" />
              <span className="font-label text-[10px] uppercase tracking-widest font-bold">Partner Oficial</span>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
              Expertise en <br />Comunidades de Vecinos
            </h2>
            <p className="text-on-surface-variant font-light leading-relaxed mb-10 text-lg max-w-xl">
              Especializados en la gestión técnica de fincas. Entendemos la complejidad de las infraestructuras compartidas. Ofrecemos una auditoría técnica completa y planes de acción preventivos para evitar interrupciones de servicio.
            </p>
            <div className="space-y-6">
              {[
                { icon: <BarChart3 />, title: "Estudios Personalizados", desc: "Optimización de recursos y costes" },
                { icon: <CheckCircle2 />, title: "Certificación Técnica", desc: "Cumplimiento de normativas vigentes" }
              ].map((item, i) => (
                <div key={i} className="bg-surface-low p-8 flex gap-6 items-center hover:bg-surface-highest transition-colors group border-l-2 border-transparent hover:border-signal-orange cursor-pointer">
                  <div className="text-signal-orange">{React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8" })}</div>
                  <div>
                    <h4 className="font-headline font-bold uppercase text-sm tracking-widest">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-1 font-light uppercase tracking-wider">{item.desc}</p>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-signal-orange" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-surface-lowest py-32 blueprint-grid px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4">¿Qué ofrecemos?</h2>
              <p className="text-on-surface-variant font-light uppercase text-[10px] sm:text-xs tracking-[0.3em]">Portfolio de Soluciones Técnicas e Infraestructura</p>
            </div>
            <div className="font-label text-signal-orange text-sm font-bold border-b-2 border-signal-orange pb-2 uppercase tracking-widest">
              TODOS LOS SERVICIOS CUBIERTOS 24/7
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-outline-variant/10 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/10">
            {[
              { icon: <Antenna />, title: "Antenas", desc: "Sistemas individuales y colectivos (TDT/SAT). Optimización de señal y cableado estructurado.", features: ["Sintonización Digital", "Filtros 5G/6G"] },
              { icon: <Video />, title: "Porteros", desc: "Video porteros inteligentes y sistemas de control de acceso. Reparación de placas y telefonillos.", features: ["Control Móvil", "Visión Nocturna"] },
              { icon: <Zap />, title: "Electricidad", desc: "Mantenimiento preventivo de cuadros eléctricos, iluminación LED y eficiencia energética.", features: ["Boletines", "Cuadros IGA"] },
              { icon: <Siren />, title: "Urgencias", desc: "Respuesta inmediata para averías críticas para particulares, empresas y comunidades. Técnicos de guardia los 365 días del año.", features: ["Respuesta < 4h", "Protocolo Crítico"], isEmergency: true }
            ].map((card, i) => (
              <div key={i} className={`p-10 group transition-all duration-500 ${card.isEmergency ? 'bg-signal-orange' : 'bg-surface-low hover:bg-surface-highest'}`}>
                <div className={`mb-8 block transition-transform group-hover:scale-110 ${card.isEmergency ? 'text-surface' : 'text-signal-orange'}`}>
                  {React.cloneElement(card.icon as React.ReactElement, { className: "w-12 h-12" })}
                </div>
                <h3 className={`font-headline text-2xl font-bold uppercase mb-4 ${card.isEmergency ? 'text-surface' : 'text-white'}`}>{card.title}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${card.isEmergency ? 'text-surface' : 'text-on-surface-variant'}`}>{card.desc}</p>
                <ul className={`space-y-3 text-[10px] font-label uppercase tracking-widest ${card.isEmergency ? 'text-surface font-bold' : 'text-on-surface-variant'}`}>
                  {card.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <span className={`w-1 h-1 ${card.isEmergency ? 'bg-surface' : 'bg-signal-orange'}`}></span> {f}
                    </li>
                  ))}
                </ul>
                {card.isEmergency && (
                  <button className="bg-surface text-signal-orange w-full py-4 font-headline font-black uppercase text-xs tracking-widest mt-10 hover:shadow-xl transition-all">
                    Llamar ahora: {CONTACT.phonePrimary} / {CONTACT.phoneSecondary}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Personalization */}
      <section className="relative py-32 overflow-hidden px-6 md:px-12">
        <div className="absolute inset-x-0 top-0 h-full z-0 opacity-20 grayscale-100">
          <img 
            className="w-full h-full object-cover contrast-150"
            alt="Técnico revisando planos técnicos en pantalla"
            loading="lazy"
            decoding="async"
            src="/images/mantenimiento-tecnico.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface opacity-90"></div>
        </div>
        <div className="max-w-[1920px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
              Personaliza tu <br /><span className="text-signal-orange">Contrato Técnico</span>
            </h2>
            <p className="text-on-surface-variant text-lg font-light max-w-xl mb-12">
              No creemos en soluciones genéricas. Cada infraestructura tiene una carga operativa distinta. Diseñamos planes de mantenimiento que escalan según la necesidad real de su edificio.
            </p>
            <div className="space-y-8">
              {[
                { num: "01", title: "Evaluación Inicial", text: "Auditoría completa del estado de sus instalaciones actuales sin compromiso." },
                { num: "02", title: "Módulos Flexibles", text: "Elija solo los servicios que necesita: antenas, iluminación, o porteros." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="bg-signal-orange/10 text-signal-orange p-3 font-headline font-black text-xs leading-none">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="uppercase font-bold text-sm tracking-widest mb-2 text-white">{step.title}</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-highest/80 backdrop-blur-xl p-10 md:p-16 border-t-4 border-signal-orange">
            <h4 className="font-headline font-black uppercase text-2xl mb-8">Solicitar Plan a Medida</h4>
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
          </div>
        </div>
      </section>

      {/* Quick Answers Section */}
      <section className="py-32 bg-surface-lowest px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="font-headline text-5xl font-black uppercase tracking-tighter mb-6">Respuestas <br />Rápidas</h2>
            <p className="text-on-surface-variant font-light text-sm uppercase tracking-[0.3em]">Centro de información para consultas técnicas</p>
            <div className="h-1 w-20 bg-signal-orange mt-8"></div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {[
              { q: "¿Puedo personalizar los servicios contratados?", a: "Sí, puedes elegir los servicios que realmente necesita tu comunidad y adaptarlos a tus necesidades." },
              { q: "¿Cómo solicito presupuesto?", a: `Puedes solicitar presupuesto a través del formulario de contacto o llamando al ${CONTACT.phonePrimary}.` },
              { q: "¿En cuánto tiempo atendéis un aviso?", a: "Atendemos avisos en 24 horas laborables, los 365 días del año, para que tu comunidad nunca se quede sin servicio." }
            ].map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="group">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full bg-surface-low p-8 flex justify-between items-center cursor-pointer hover:bg-surface-highest transition-all border-l-2 border-transparent hover:border-signal-orange text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                    aria-expanded={isOpen}
                  >
                    <span className="font-headline font-bold uppercase text-sm tracking-widest">{item.q}</span>
                    <Plus className={`text-signal-orange transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-8 bg-surface-highest/50 border-t border-outline-variant/10 text-sm text-on-surface-variant leading-relaxed font-light">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
