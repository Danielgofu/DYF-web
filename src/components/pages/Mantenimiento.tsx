import React from "react";
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
  Plus 
} from "lucide-react";
import { PageProps } from "../../types";

export const Mantenimiento: React.FC<PageProps> = ({ setActivePage }) => {
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
                onClick={() => setActivePage("Contacto")}
                className="bg-gradient-to-r from-primary-orange to-signal-orange text-surface px-10 py-5 font-headline font-black uppercase text-sm tracking-widest active:scale-95 transition-transform"
              >
                Solicitar Asistencia
              </button>
            </div>
          </div>
          <div className="md:col-span-5 relative hidden md:block">
            <div className="absolute inset-0 bg-surface-highest opacity-5"></div>
            <img 
              className="w-full h-full object-cover grayscale brightness-50 contrast-125 border-l border-signal-orange/20" 
              alt="Industrial panel" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGLZ_94NBbWWvq8WY8WhsClS8w8kbpESF-UQkoM7wjO_vWKfIaWefaOZmilTny-CmkQho2Aa5ZdGfD_Ljx8zn4h3Jg6bqv7z_h1DCYcVVgjYeyPtXrwZZ3NJahb-vdM5fZnfVpvi59fvyHP6SG8oLNAhDD-OKTuMum_e4414wlUnNgaWLP8st4wyNACTm4ptHjV5CPcUT0uVWS9X9n3jUnRFBUxqc6MyurU4fZ5uKNdoDitysAsXIO52IJ7TToHPU8crn3DspOBlHl"
              referrerPolicy="no-referrer"
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
              alt="Modern building facade" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzS2x156bdLZK4HucWboMLO6h7D7yN-0MlTpWcKkjPfIdA7-536Y6YmsOlvyqRm4hjIWxwWUGn3LKX1szNHnS0GjHWtERVjRUG11CELtB8YOhMfA01E5JXFB5iTYnJQJEn3G0Px_PSyOmIp0w4yVDEfIxlzD3Jb87lAI8SxUPKQn4vSh0tO7vdJqJ-EvS25s7POOlpP-KizHcTgBN6Y8OPu2NIKqbIsfqpfbyfAg0QB4ixlrwB0X8IrryOZz9Z-kzN3LDBiTRaIPvs"
              referrerPolicy="no-referrer"
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
              { icon: <Siren />, title: "Urgencias", desc: "Respuesta inmediata para averías críticas. Técnicos de guardia los 365 días del año.", features: ["Respuesta < 4h", "Protocolo Crítico"], isEmergency: true }
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
                    Llamar ahora: 916 01 84 94 / 918 31 20 61
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
            alt="Technical blueprints" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU96wSZ7fhx-Jt3uHuJgqxrcIvRnYnN9jZd2IZNpIMB7oUTJoFQo4O4QfSmVEf1yFxSP4JbeYkSGOJcqeILsAM7iwKMXnsFqeMoa09Qa7TuYlsioYtXGpsBgjzF3BLp2l6cS6w_Ot35R6VvZjuKS4HBbXZf6j-k6LvPv5MGsItlUBbCg64FzJ-2CwaAGdkoIgIKK1n3yCMZxrTu5MEI8f0uigKcf0LzSaEZnv10rZhasiM_g6dC4p8cAv9O_6JCv_ReGGU1CgzJ6Pd"
            referrerPolicy="no-referrer"
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
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setActivePage("Gracias"); }}>
              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Concepto (Comunidad / Empresa)</label>
                <input className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-sm py-4 px-4 transition-all" type="text" placeholder="Ej: Edificio Central Getafe" />
              </div>
              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3 font-bold">Tipo de Servicio Requerido</label>
                <select className="w-full bg-surface-low border-0 border-l-4 border-transparent focus:border-signal-orange focus:ring-0 text-sm py-4 px-4 appearance-none" defaultValue="">
                  <option value="" disabled>Seleccione una opción</option>
                  <option>Mantenimiento Integral</option>
                  <option>Antenas y Datos</option>
                  <option>Electricidad y LED</option>
                </select>
              </div>
              <button className="w-full bg-signal-orange text-surface py-5 font-headline font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all mt-6">
                Enviar solicitud técnica
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
              { q: "¿Cómo solicito presupuesto?", a: "Puedes solicitar presupuesto a través del formulario de contacto o llamando al 916 01 84 94." },
              { q: "¿En cuánto tiempo atendéis un aviso?", a: "Atendemos avisos en 48h laborables aproximadamente, los 365 días del año, para que tu comunidad nunca se quede sin servicio." }
            ].map((item, i) => {
              const [isOpen, setIsOpen] = React.useState(false);
              return (
                <div key={i} className="group">
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-surface-low p-8 flex justify-between items-center cursor-pointer hover:bg-surface-highest transition-all border-l-2 border-transparent hover:border-signal-orange text-left"
                  >
                    <span className="font-headline font-bold uppercase text-sm tracking-widest">{item.q}</span>
                    <Plus className={`text-signal-orange transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-8 bg-surface-highest/50 border-t border-outline-variant/10 text-sm text-on-surface-variant leading-relaxed">
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
