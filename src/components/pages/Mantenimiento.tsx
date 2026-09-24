import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Building2,
  BarChart3,
  CheckCircle2,
  Antenna,
  Video,
  Zap,
  Siren
} from "lucide-react";
import { usePageMeta } from "../../utils/seo";
import { CONTACT } from "../../utils/contact";
import { FaqAccordion, FaqItem } from "../FaqAccordion";
import { PlanForm } from "../forms/PlanForm";

// Datos estáticos: viven fuera del componente para no recrearse en cada render.
const QUICK_FAQ_ITEMS: FaqItem[] = [
  { q: "¿Puedo personalizar los servicios contratados?", a: "Sí, puedes elegir los servicios que realmente necesita tu comunidad y adaptarlos a tus necesidades." },
  { q: "¿Cómo solicito presupuesto?", a: `Puedes solicitar presupuesto a través del formulario de contacto o llamando al ${CONTACT.phonePrimary}.` },
  { q: "¿En cuánto tiempo atendéis un aviso?", a: "Atendemos avisos en 24 horas laborables, los 365 días del año, para que tu comunidad nunca se quede sin servicio." }
];

export const Mantenimiento: React.FC = () => {
  usePageMeta(
    "Servicios de Mantenimiento | DYF Telecomunicaciones",
    "Mantenimiento preventivo y correctivo para comunidades de propietarios e instalaciones críticas en Madrid. Respuesta garantizada en 24h laborables."
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 overflow-x-hidden min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative md:min-h-[800px] flex items-center overflow-hidden bg-surface-lowest">
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
              <Link
                to="/contacto"
                className="inline-block text-center bg-gradient-to-r from-primary-orange to-signal-orange text-surface px-10 py-5 font-headline font-black uppercase text-sm tracking-widest active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Solicitar Asistencia
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 relative hidden md:block md:max-h-[640px] self-center">
            <div className="absolute inset-0 bg-surface-highest opacity-5"></div>
            <img 
              className="w-full h-full object-cover grayscale brightness-50 contrast-125 border-l border-signal-orange/20"
              alt="Cuadro eléctrico industrial con cableado"
              src="/images/mantenimiento-cuadro.webp"
            />
            <div className="absolute bottom-10 right-10 bg-signal-orange text-surface p-6 font-headline font-black text-4xl uppercase leading-none shadow-2xl">
              24h<br /><span className="text-sm font-bold tracking-widest">Laborables</span>
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
              <span className="font-label text-[10px] uppercase tracking-widest font-bold">Atención Especializada</span>
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
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
                <div key={i} className="bg-surface-low p-8 flex gap-6 items-center hover:bg-surface-highest transition-colors group border-l-2 border-transparent hover:border-signal-orange">
                  <div className="text-signal-orange">{React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}</div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-sm tracking-widest">{item.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 font-light uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-surface-lowest py-32 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4">¿Qué ofrecemos?</h2>
              <p className="text-on-surface-variant font-light uppercase text-[10px] sm:text-xs tracking-[0.3em]">Portfolio de Soluciones Técnicas e Infraestructura</p>
            </div>
            <div className="font-label text-signal-orange text-sm font-bold border-b-2 border-signal-orange pb-2 uppercase tracking-widest">
              TODOS LOS SERVICIOS, RESPUESTA EN 24H LABORABLES
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-outline-variant/10 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/10">
            {[
              { icon: <Antenna />, title: "Antenas", desc: "Sistemas individuales y colectivos (TDT/SAT). Optimización de señal y cableado estructurado.", features: ["Sintonización Digital", "Filtros 5G/6G"] },
              { icon: <Video />, title: "Porteros", desc: "Video porteros inteligentes y sistemas de control de acceso. Reparación de placas y telefonillos.", features: ["Control Móvil", "Visión Nocturna"] },
              { icon: <Zap />, title: "Electricidad", desc: "Mantenimiento preventivo de cuadros eléctricos, iluminación LED y eficiencia energética.", features: ["Boletines", "Cuadros IGA"] },
              { icon: <Siren />, title: "Urgencias", desc: "Atención para averías críticas de particulares, empresas y comunidades, en un plazo de 24 horas laborables.", features: ["24h Laborables", "Atención Prioritaria"], isEmergency: true }
            ].map((card, i) => (
              <div key={i} className={`p-10 group transition-all duration-500 ${card.isEmergency ? 'bg-signal-orange' : 'bg-surface-low hover:bg-surface-highest'}`}>
                <div className={`mb-8 block transition-transform group-hover:scale-110 ${card.isEmergency ? 'text-surface' : 'text-signal-orange'}`}>
                  {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, { className: "w-12 h-12" })}
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
                  <div className="mt-10 flex flex-col gap-2">
                    {[
                      { tel: CONTACT.phonePrimaryTel, label: CONTACT.phonePrimary },
                      { tel: CONTACT.phoneSecondaryTel, label: CONTACT.phoneSecondary }
                    ].map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        className="block text-center bg-surface text-signal-orange w-full py-4 font-headline font-black uppercase text-xs tracking-widest hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        Llamar ahora: {phone.label}
                      </a>
                    ))}
                  </div>
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
            alt=""
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
                    <h3 className="uppercase font-bold text-sm tracking-widest mb-2 text-white">{step.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-highest/80 backdrop-blur-xl p-6 sm:p-10 md:p-16 border-t-4 border-signal-orange">
            <h3 className="font-headline font-black uppercase text-2xl mb-8">Solicitar Plan a Medida</h3>
            <PlanForm />
          </div>
        </div>
      </section>

      {/* Quick Answers Section */}
      <section className="py-32 bg-surface-lowest px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-x-12 xl:gap-x-24">
          <div className="lg:col-span-4">
            <h2 className="font-headline text-5xl font-black uppercase tracking-tighter mb-6">Respuestas <br />Rápidas</h2>
            <p className="text-on-surface-variant font-light text-sm uppercase tracking-[0.3em]">Centro de información para consultas técnicas</p>
            <div className="h-1 w-20 bg-signal-orange mt-8"></div>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={QUICK_FAQ_ITEMS} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};
