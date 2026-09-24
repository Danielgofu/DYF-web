import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from "motion/react";
import {
  Antenna,
  Smartphone,
  Video,
  Network,
  ArrowRight,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  FileCheck,
  Award,
  ShieldCheck,
  Building2
} from "lucide-react";
import { NeuralNetworkBackground } from "../NeuralNetworkBackground";
import { VideoIntercomGraphic } from "../VideoIntercomGraphic";
import { FaqAccordion, FaqItem } from "../FaqAccordion";
import { usePageMeta } from "../../utils/seo";
import { CONTACT, SOCIAL_LINKS } from "../../utils/contact";
import { MapEmbed } from "../MapEmbed";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString("es-ES"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    animate(count, value, { duration: 2, ease: "easeOut" });
  }, [isInView, value, count, reduceMotion]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

// Datos estáticos: viven fuera del componente para no recrearse en cada render.
const FAQ_ITEMS: FaqItem[] = [
  {
    q: "¿Qué tipo de servicios ofrece DYF Telecomunicaciones?",
    a: "Nos especializamos en telecomunicaciones (antenas TDT y satélite), instalación y reparación de porteros y videoporteros automáticos, mantenimiento eléctrico integral para comunidades y sistemas de seguridad, alarmas y CCTV."
  },
  {
    q: "¿Ofrecen cobertura en toda la Comunidad de Madrid?",
    a: "Sí, contamos con unidades móviles que prestan servicio en Madrid capital y en todos los municipios de la Comunidad de Madrid, con sede operativa en Getafe."
  },
  {
    q: "¿Cómo funciona el servicio de mantenimiento para comunidades de propietarios?",
    a: "Ofrecemos contratos personalizados que incluyen revisiones preventivas periódicas, atención prioritaria en averías, precios cerrados en mano de obra y servicio de guardia para urgencias técnicas."
  },
  {
    q: "¿Cuánto se tarda en recibir un presupuesto o una visita técnica?",
    a: "Atendemos las solicitudes en menos de 24 horas laborables. Para averías urgentes en comunidades con contrato activo, la intervención se realiza con carácter prioritario."
  },
  {
    q: "¿Están homologados para emitir boletines oficiales y certificaciones?",
    a: "Sí, somos empresa instaladora de telecomunicaciones homologada y certificada para la emisión de documentación técnica oficial según la normativa vigente."
  }
];

export const Inicio: React.FC = () => {
  usePageMeta(
    "DYF Telecomunicaciones | Infraestructuras Críticas y Telecomunicaciones en Madrid",
    "Líderes en instalación y mantenimiento de antenas colectivas, videoporteros, seguridad CCTV, redes y electricidad en Getafe y toda la Comunidad de Madrid."
  );

  return (
    <>
      <section className="relative min-h-svh flex items-center px-6 md:px-12 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="w-full h-full object-cover grayscale brightness-[0.2] contrast-125"
            src="/images/hero-antena-tejado.webp"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent"></div>
        </div>
        {/* Después de la imagen en el DOM: con el mismo z-0, antes quedaba tapado por ella. */}
        <NeuralNetworkBackground opacity={0.3} />

        <div className="relative z-10 w-full max-w-[1920px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-[2px] w-12 bg-signal-orange"></span>
            <span className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-signal-orange font-bold">
              Sistemas de Telecomunicación Homologados
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-headline font-bold leading-[0.85] tracking-tighter mb-8"
          >
            <span className="block text-[clamp(4rem,15vw,12rem)]">DYF</span>
            <span className="text-outline-light block text-[clamp(1.75rem,7.5vw,9rem)] whitespace-nowrap">TELECOMUNICACIONES</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-body text-lg md:text-xl font-light text-on-surface-variant max-w-2xl mb-12 leading-relaxed"
          >
            Líderes en instalación, mantenimiento y optimización de redes críticas. Desde 2008 garantizando la continuidad operativa en la Comunidad de Madrid con estándares de ingeniería de máxima exigencia.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contacto"
                aria-label="Solicitar auditoría técnica"
                className="bg-signal-orange text-surface px-10 py-5 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary-orange hover:shadow-[0_0_30px_rgba(242,125,38,0.2)] transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Solicitar Auditoría <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/servicios"
                aria-label="Conocer servicios de telecomunicaciones"
                className="border border-outline-variant/30 text-white px-8 py-5 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:border-signal-orange hover:text-signal-orange transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
              >
                Conocer Servicios
              </Link>
            </div>
            <div className="flex gap-6 items-center border-l sm:border-l-0 sm:pl-0 pl-6 border-outline-variant/30">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline font-bold hidden sm:block">Seguir en:</span>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                className="inline-block text-on-surface-variant hover:text-signal-orange transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                className="inline-block text-on-surface-variant hover:text-signal-orange transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 hidden lg:block">
            <div className="flex flex-col gap-2 items-end">
              <span className="font-label text-[10px] text-outline uppercase tracking-widest">Estado Actual</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-headline font-bold text-white uppercase">Respuesta NOC 24/7</span>
              </div>
            </div>
        </div>
      </section>

      {/* Bento Grid Services Section */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">Infraestructura Core</h2>
          <div className="h-1 w-24 bg-signal-orange"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[minmax(400px,auto)]">
          {/* Antennas */}
          <Link
            to="/servicios"
            aria-label="Antenas Colectivas & Parabólicas: ver servicios"
            className="md:col-span-4 bg-surface-low p-8 md:p-10 flex flex-col justify-between group hover:bg-surface-high transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:shadow-2xl hover:-translate-y-1 min-h-[300px] md:min-h-0"
          >
            <Antenna className="text-signal-orange w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
            <div>
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">Antenas Colectivas & Parabólicas</h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                Optimización de recepción TDT y satélite para comunidades de propietarios y complejos residenciales. Máxima calidad de señal sin interferencias.
              </p>
            </div>
          </Link>

          {/* Intercoms */}
          <Link
            to="/servicios"
            aria-label="Porteros y Videoporteros Digitales: ver servicios"
            className="md:col-span-8 relative group overflow-hidden bg-surface-low hover:bg-surface-high transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:shadow-2xl hover:-translate-y-1 min-h-[350px] md:min-h-0"
          >
            <VideoIntercomGraphic decorative className="absolute -right-8 -bottom-10 h-[420px] w-auto text-white opacity-[0.07] group-hover:scale-110 group-hover:opacity-[0.14] transition-all duration-700 pointer-events-none" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
              <Smartphone className="text-signal-orange w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
              <div className="max-w-md">
                <h3 className="font-headline text-2xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">Porteros y Videoporteros Digitales</h3>
                <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6">
                  Instalación y modernización a sistemas IP y 2 hilos con visión nocturna y apertura remota para fincas.
                </p>
                <span className="font-label text-[10px] uppercase tracking-widest border-b border-signal-orange pb-1 text-signal-orange transition-all group-hover:tracking-[0.2em]">
                  VER CATÁLOGO TÉCNICO
                </span>
              </div>
            </div>
          </Link>

          {/* CCTV */}
          <Link
            to="/servicios"
            aria-label="Seguridad CCTV, Alarmas & Redes de Datos: ver servicios"
            className="md:col-span-7 bg-surface-low p-8 md:p-10 flex flex-col justify-between group hover:bg-surface-high transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:shadow-2xl hover:-translate-y-1 min-h-[300px] md:min-h-0"
          >
            <div className="flex justify-between items-start">
              <Video className="text-signal-orange w-12 h-12 transition-transform duration-500 group-hover:scale-110" />
              <span className="font-label text-[10px] bg-signal-orange text-surface px-3 py-1 font-extrabold uppercase tracking-widest transition-all group-hover:bg-white group-hover:text-signal-orange">
                MONITORIZACIÓN REMOTA VÍA APP
              </span>
            </div>
            <div>
              <h3 className="font-headline text-3xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">Seguridad CCTV, Alarmas & Redes de Datos</h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed max-w-lg">
                Sistemas de alarma y videovigilancia CCTV de alta definición con grabación continua y cableado estructurado Cat6/Cat7.
              </p>
            </div>
          </Link>

          {/* Electricidad */}
          <Link
            to="/servicios"
            aria-label="Electricidad Comunitaria & LED: ver servicios"
            className="md:col-span-5 bg-signal-orange p-8 md:p-10 flex flex-col justify-between text-surface group border border-transparent active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[300px] md:min-h-0"
          >
            <Network className="w-12 h-12" />
            <div>
              <h3 className="font-headline text-2xl font-bold uppercase mb-4">Electricidad Comunitaria & LED</h3>
              <p className="text-surface/80 text-sm font-light leading-relaxed">
                Iluminación de bajo consumo, detectores de presencia y mantenimiento integral de cuadros eléctricos.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Por Qué Elegir DYF Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-outline-variant/10">
        <div className="mb-16">
          <span className="font-label text-xs uppercase tracking-widest text-signal-orange font-bold block mb-3">
            DIFERENCIAL TÉCNICO
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 text-white">
            Rigor, Rapidez y Garantía en Cada Intervención
          </h2>
          <div className="h-1 w-24 bg-signal-orange mb-6"></div>
          <p className="font-body text-base md:text-lg text-on-surface-variant font-light max-w-3xl leading-relaxed">
            Combinamos equipamiento de medición de última generación con personal técnico altamente cualificado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Presupuestos Transparentes",
              desc: "Estudios técnicos detallados sin costes ocultos ni sorpresas de última hora.",
              icon: <FileCheck className="w-8 h-8 text-signal-orange" />
            },
            {
              num: "02",
              title: "Técnicos Homologados",
              desc: "Inscritos en el Registro Oficial de Instaladores de Telecomunicaciones con el Nº 10265 y miembros de la Asociación Madrileña de Instaladores e Integradores de Telecomunicación (AMIITEL).",
              icon: <Award className="w-8 h-8 text-signal-orange" />
            },
            {
              num: "03",
              title: "Repuestos Originales",
              desc: "Trabajamos únicamente con fabricantes líderes del sector para máxima durabilidad.",
              icon: <ShieldCheck className="w-8 h-8 text-signal-orange" />
            },
            {
              num: "04",
              title: "Atención Prioritaria a Comunidades",
              desc: "Contratos de mantenimiento preventivo adaptados a las necesidades reales de cada finca.",
              icon: <Building2 className="w-8 h-8 text-signal-orange" />
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-surface-low p-8 border border-outline-variant/10 hover:border-signal-orange/40 hover:bg-surface-high transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-signal-orange/10 border border-signal-orange/20">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs text-outline font-bold">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-headline text-lg font-bold uppercase mb-3 text-white group-hover:text-signal-orange transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-on-surface-variant font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-surface-lowest py-40 border-y border-outline-variant/10 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-signal-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 mb-24 md:mb-32">
            {[
              { value: 15, label: "Años de Trayectoria", suffix: "+" },
              { value: 250, label: "Antenas Instaladas", suffix: "+" },
              { value: 15000, label: "Metros de Cableado", suffix: "+" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col gap-4 group ${
                  i === 2 
                  ? "border-l border-outline-variant/20 pl-8 sm:border-l-0 sm:pl-0 sm:col-span-2 lg:col-span-1 lg:border-l lg:pl-8 sm:items-center lg:items-start" 
                  : "border-l border-outline-variant/20 pl-8"
                }`}
              >
                <div className="font-headline text-5xl md:text-7xl font-bold text-white tracking-tighter flex items-baseline group-hover:text-signal-orange transition-colors">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className={`h-1 w-8 bg-signal-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                  i === 2 ? "sm:origin-center lg:origin-left" : "origin-left"
                }`}></div>
                <span className={`font-label text-xs md:text-sm uppercase tracking-[0.2em] text-outline font-bold group-hover:text-on-surface transition-colors ${
                  i === 2 ? "sm:text-center lg:text-left" : ""
                }`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Trusted Partners / Logos */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-label text-[10px] uppercase tracking-[0.4em] text-signal-orange font-black">Infraestructura Crítica</span>
                <span className="text-white font-headline font-bold text-2xl uppercase mt-1">Socios Tecnológicos de Confianza</span>
              </div>
              <div className="flex-grow h-[1px] bg-outline-variant/20 hidden md:block"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Fermax", src: "/logos/fermax.png" },
                { name: "Televes", src: "/logos/televes.svg" },
                { name: "Alcad", src: "/logos/alcad.jpg" },
                { name: "Legrand", src: "/logos/legrand.png" },
                { name: "Tegui", src: "/logos/tegui.webp" },
                { name: "Golmar", src: "/logos/golmar.png" }
              ].map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative group h-28 bg-surface-low border border-outline-variant/10 flex items-center justify-center p-4 hover:border-signal-orange/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Technical Background Detail - Asymmetrical */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-signal-orange/0 group-hover:border-signal-orange/40 transition-colors"></div>
                  <div className="absolute bottom-4 left-0 w-1 h-8 bg-signal-orange/0 group-hover:bg-signal-orange/20 transition-colors"></div>
                  
                  <div className="relative z-10 text-center flex flex-col items-center gap-2">
                    <img 
                      alt={`Logo ${partner.name}`}
                      className="h-10 md:h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
                      src={partner.src}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="h-[2px] w-4 bg-signal-orange group-hover:w-12 transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-surface-lowest px-6 md:px-12 border-y border-outline-variant/10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-x-12 xl:gap-x-24">
          <div className="lg:col-span-4">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-signal-orange font-black mb-6 block text-left">RESOLUCIÓN DE DUDAS</span>
            <h2 className="font-headline text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight break-words text-left">PREGUNTAS<br />FRECUENTES</h2>
            <p className="text-on-surface-variant font-light text-[10px] uppercase tracking-[0.3em] text-left">Respuestas claras a las consultas más habituales sobre nuestros servicios e intervenciones.</p>
            <div className="h-1 w-20 bg-signal-orange mt-8 self-start"></div>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Headquarters Section */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <span className="font-label text-xs uppercase tracking-[0.4em] text-signal-orange font-black mb-6 block">Nuestra Ubicación</span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-tight break-words">
            ENCUÉNTRANOS EN EL<br />
            CORAZÓN DE GETAFE
          </h2>
          <div className="space-y-8 font-body">
            <a
              href={CONTACT.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-6 items-start group/loc block"
            >
              <MapPin className="text-signal-orange mt-1 shrink-0 group-hover/loc:scale-110 transition-transform" />
              <div>
                <p className="text-white font-bold uppercase tracking-widest text-sm group-hover/loc:text-signal-orange transition-colors">Zona Logística Industrial</p>
                <p className="text-on-surface-variant text-sm mt-1">{CONTACT.addressShort}</p>
              </div>
            </a>
            <div className="flex gap-6 items-start">
              <Mail className="text-signal-orange mt-1 shrink-0" />
              <div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">Contacto Directo</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-block text-on-surface-variant text-sm mt-1 hover:text-signal-orange transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>

            <div className="flex gap-6 pt-4 items-center">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline font-bold">Seguir en Redes:</span>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                className="p-3 -m-3 text-on-surface-variant hover:text-signal-orange transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                className="p-3 -m-3 text-on-surface-variant hover:text-signal-orange transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="relative group p-4 sm:p-8">
          {/* Advanced Asymmetrical Technical Frame */}
          <div className="absolute top-0 left-0 w-32 h-2 bg-signal-orange z-10 transition-all group-hover:w-48"></div>
          <div className="absolute top-0 left-0 w-2 h-40 border-l-2 border-signal-orange z-10"></div>
          <div className="absolute top-10 left-4 w-4 h-[1px] bg-signal-orange/30 z-10"></div>
          <div className="absolute top-14 left-4 w-6 h-[1px] bg-signal-orange/20 z-10"></div>
          
          <div className="absolute top-0 right-0 w-24 h-12 border-t-2 border-r-2 border-signal-orange/40 z-10 group-hover:border-signal-orange transition-colors"></div>
          <div className="absolute top-4 right-4 w-12 h-[1px] bg-signal-orange/20 z-10"></div>
          
          <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-outline-variant/10 z-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-signal-orange/40 z-10"></div>
          
          <div className="absolute bottom-0 right-0 w-48 h-20 border-b-2 border-r-2 border-signal-orange z-10"></div>
          <div className="absolute -bottom-2 right-24 px-3 bg-surface text-[8px] font-mono text-signal-orange uppercase tracking-[0.3em] z-20">Ubicación</div>

          <div className="h-[400px] md:h-[600px] bg-surface-lowest relative overflow-hidden border border-outline-variant/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <MapEmbed src={CONTACT.mapsEmbed} title="Ubicación DYF Telecomunicaciones" />
            
            {/* Scan Line Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-signal-orange/5 to-transparent h-[10%] w-full animate-scan z-20 opacity-30"></div>
          </div>
        </div>
      </section>
    </>
  );
};
