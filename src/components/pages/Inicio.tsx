import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { 
  Antenna, 
  Smartphone, 
  Video, 
  Network, 
  ArrowRight, 
  MapPin, 
  Mail,
  BarChart3,
  Shield,
  MousePointerClick,
  Instagram,
  Facebook,
  Plus
} from "lucide-react";
import { PageProps } from "../../types";
import { NeuralNetworkBackground } from "../NeuralNetworkBackground";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString("es-ES"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export const Inicio: React.FC<PageProps> = ({ setActivePage }) => {
  return (
    <>
      <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden pt-20">
        <NeuralNetworkBackground opacity={0.3} />
        <div className="absolute inset-0 z-0">
          <img 
            alt="Telecom Infrastructure" 
            className="w-full h-full object-cover grayscale brightness-[0.2] contrast-125" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMlzM9c4iDprBOngXMTJ_CL_BGDxyHaXNu0nSWkQjzRnnVc1jXusoAwnVuyUdDyssSIogZ4hEwthl1HwkSOJlqVO52_3c7QJLyMQ4EKOK4tyBJWi6gCpHS_W8vKJ5cqcdtfITZrDq6Mnqqwbr0pYfmoJ8WvwEsVgvGbjHv7aLfdI3rAQTK9D5ccU3UPw_skoE8qHiF623HzcFvZsiFuj_-vzM9VowgsuGI9CsiVYsNYtj6Fs9nMoV1x0-FTX0rAFHThVkcJL5QQjqj"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-[2px] w-12 bg-signal-orange"></span>
            <span className="font-label uppercase tracking-[0.3em] text-[10px] md:text-xs text-signal-orange font-bold">
              Precisión Industrial Garantizada
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-headline text-[clamp(1.5rem,6.5vw,9rem)] font-bold leading-[0.9] tracking-tighter mb-8 break-words overflow-visible"
          >
            DYF<br />
            <span className="text-outline-light block sm:inline">TELECOMUNICACIONES</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-body text-lg md:text-xl font-light text-on-surface-variant max-w-xl mb-12 leading-relaxed"
          >
            Sistemas de infraestructura crítica y conectividad de alta fidelidad. 
            Desde 2008 liderando soluciones de telecomunicaciones homologadas en Getafe y toda la Comunidad de Madrid.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <button 
              onClick={() => setActivePage("Contacto")}
              aria-label="Contactar para iniciar un proyecto"
              className="bg-signal-orange text-surface px-10 py-5 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary-orange hover:shadow-[0_0_30px_rgba(242,125,38,0.2)] transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Iniciar Proyecto <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-6 items-center border-l sm:border-l-0 sm:pl-0 pl-6 border-outline-variant/30">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline-variant font-bold hidden sm:block">Seguir en:</span>
              <a 
                href="https://www.instagram.com/dyftelecomunicaciones" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visitar nuestro Instagram"
                className="text-on-surface-variant hover:text-signal-orange transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/DYFTelecomunicaciones/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visitar nuestro Facebook"
                className="text-on-surface-variant hover:text-signal-orange transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 hidden lg:block">
            <div className="flex flex-col gap-2 items-end">
              <span className="font-label text-[10px] text-outline-variant uppercase tracking-widest">Estado Actual</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-headline font-bold text-white uppercase">Soporte Técnico 24H</span>
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[400px]">
          {/* Antennas */}
          <div 
            onClick={() => setActivePage("Servicios")}
            onKeyDown={(e) => e.key === 'Enter' && setActivePage("Servicios")}
            tabIndex={0}
            role="button"
            aria-label="Ver servicios de antenas"
            className="md:col-span-4 bg-surface-low p-8 md:p-10 flex flex-col justify-between group cursor-pointer hover:bg-surface-high transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:shadow-2xl hover:-translate-y-1 min-h-[300px] md:min-h-0"
          >
            <Antenna className="text-signal-orange w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
            <div>
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">Antenas & TV</h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                Instalación técnica de sistemas TDT y Satélite. Optimizamos su señal para máxima resolución HD y 4K sin interferencias.
              </p>
            </div>
          </div>

          {/* Intercoms */}
          <div 
            onClick={() => setActivePage("Servicios")}
            onKeyDown={(e) => e.key === 'Enter' && setActivePage("Servicios")}
            tabIndex={0}
            role="button"
            aria-label="Ver servicios de porteros automáticos"
            className="md:col-span-8 relative group overflow-hidden bg-surface-low cursor-pointer hover:bg-surface-high transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:shadow-2xl hover:-translate-y-1 min-h-[350px] md:min-h-0"
          >
            <img 
              alt="Intercoms" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 group-hover:opacity-20 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ4nh4pe-aeZO21Ayl32FvR5r4ojEVOfZRmicbdzReusWxsm8byousb52Yo3b0XLvGjrEmqxE2Xas1AzsOXmYhnLaWojW6pQGyyG5ABseA3jvfuvSXHRORfpr6XOAVcJf28xeBN_lS130TOmlG02aR0y_TKyCo2zGD9cQ-YElVcBVF205hvyXLrzOP_AtXJ48R0IYgHKSfZxqg34NOw5SxzSPH5GGFvsrfpQajgTq28ospKTedvQVyC9X20VfcBLFbI2Ck8IpUOrec"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
              <Smartphone className="text-signal-orange w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
              <div className="max-w-md">
                <h3 className="font-headline text-2xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">Porteros Digitales</h3>
                <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6">
                  Sistemas de control con visión nocturna y alta definición. Integración estética y funcional en portales con marcas líderes.
                </p>
                <span className="font-label text-[10px] uppercase tracking-widest border-b border-signal-orange pb-1 text-signal-orange transition-all group-hover:tracking-[0.2em]">
                  Especificaciones Técnicas Disponibles
                </span>
              </div>
            </div>
          </div>

          {/* CCTV */}
          <div 
            onClick={() => setActivePage("Servicios")}
            onKeyDown={(e) => e.key === 'Enter' && setActivePage("Servicios")}
            tabIndex={0}
            role="button"
            aria-label="Ver servicios de CCTV y seguridad"
            className="md:col-span-7 bg-surface-low p-8 md:p-10 flex flex-col justify-between group cursor-pointer hover:bg-surface-high transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:shadow-2xl hover:-translate-y-1 min-h-[300px] md:min-h-0"
          >
            <div className="flex justify-between items-start">
              <Video className="text-signal-orange w-12 h-12 transition-transform duration-500 group-hover:scale-110" />
              <span className="font-label text-[10px] bg-signal-orange text-surface px-3 py-1 font-extrabold uppercase tracking-widest transition-all group-hover:bg-white group-hover:text-signal-orange">
                MONITOREO 24/7
              </span>
            </div>
            <div>
              <h3 className="font-headline text-3xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">CCTV & Seguridad</h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed max-w-lg">
                Redes de vigilancia de última generación integradas con analítica de IA para detección de anomalías y defensa perimetral.
              </p>
            </div>
          </div>

          {/* Networks */}
          <div 
            onClick={() => setActivePage("Servicios")}
            onKeyDown={(e) => e.key === 'Enter' && setActivePage("Servicios")}
            tabIndex={0}
            role="button"
            aria-label="Ver servicios de instalaciones de red"
            className="md:col-span-5 bg-signal-orange p-8 md:p-10 flex flex-col justify-between text-surface group cursor-pointer border border-transparent active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[300px] md:min-h-0"
          >
            <Network className="w-12 h-12" />
            <div>
              <h3 className="font-headline text-2xl font-bold uppercase mb-4">Redes e Iluminación</h3>
              <p className="text-surface/80 text-sm font-light leading-relaxed">
                Cableado estructurado, optimización Wi-Fi y transición a iluminación LED para un consumo energético eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-surface-lowest py-40 border-y border-outline-variant/10 relative overflow-hidden">
        <NeuralNetworkBackground opacity={0.2} />
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
                <span className={`font-label text-xs md:text-sm uppercase tracking-[0.2em] text-outline-variant font-bold group-hover:text-on-surface transition-colors ${
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x80/1c1b1b/f96304?text=${partner.name}`;
                        (e.target as HTMLImageElement).className = "h-8 md:h-10 w-auto object-contain";
                      }}
                      referrerPolicy="no-referrer"
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
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-signal-orange font-black mb-6 block text-left">Asistencia Técnica</span>
            <h2 className="font-headline text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight break-words text-left">CONOCIMIENTO<br />INDUSTRIAL</h2>
            <p className="text-on-surface-variant font-light text-[10px] uppercase tracking-[0.3em] text-left">Protocolos y soluciones documentadas</p>
            <div className="h-1 w-20 bg-signal-orange mt-8 self-start"></div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {[
              { q: "¿Ofrecéis mantenimiento a comunidades de vecinos?", a: "Sí, es una de nuestras especialidades. Diseñamos planes integrales que cubren desde antenas y videoporteros hasta el sistema eléctrico común, con atención prioritaria de urgencias." },
              { q: "¿Cuál es el tiempo de respuesta ante averías?", a: "Para clientes con contrato de mantenimiento, garantizamos una respuesta técnica rápida. Las reparaciones críticas de infraestructura suelen abordarse en las primeras 24-48 horas." },
              { q: "¿Trabajáis con marcas oficiales?", a: "Absolutamente. Solo instalamos componentes de fabricantes líderes como Fermax, Golmar, Televes y Comelit, asegurando la máxima fiabilidad y disponibilidad de repuestos a largo plazo." },
              { q: "¿Cómo solicito un presupuesto detallado?", a: "Puedes contactarnos vía formulario web, teléfono o correo electrónico. Realizamos una auditoría técnica inicial para asegurar que el presupuesto se ajusta a la realidad de tu instalación." }
            ].map((item, i) => {
              const [isFaqOpen, setIsFaqOpen] = useState(false);
              return (
                <div key={i} className="group">
                  <button 
                    onClick={() => setIsFaqOpen(!isFaqOpen)}
                    className="w-full bg-surface-low p-8 flex justify-between items-center cursor-pointer hover:bg-surface-highest transition-all border-l-2 border-transparent hover:border-signal-orange text-left"
                  >
                    <span className="font-headline font-bold uppercase text-sm tracking-widest leading-relaxed pr-8">{item.q}</span>
                    <Plus className={`text-signal-orange shrink-0 transition-transform duration-300 ${isFaqOpen ? 'rotate-45' : ''}`} />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${isFaqOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
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
              href="https://www.google.com/maps/search/?api=1&query=DYF+Telecomunicaciones+C.+Valdemorillo+20+28901+Getafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-6 items-start group/loc block"
            >
              <MapPin className="text-signal-orange mt-1 shrink-0 group-hover/loc:scale-110 transition-transform" />
              <div>
                <p className="text-white font-bold uppercase tracking-widest text-sm group-hover/loc:text-signal-orange transition-colors">Zona Logística Industrial</p>
                <p className="text-on-surface-variant text-sm mt-1">C. Valdemorillo, 20, 28901 Getafe</p>
              </div>
            </a>
            <div className="flex gap-6 items-start">
              <Mail className="text-signal-orange mt-1 shrink-0" />
              <div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">Contacto Directo</p>
                <button 
                  onClick={() => setActivePage("Contacto")}
                  className="text-on-surface-variant text-sm mt-1 hover:text-signal-orange transition-colors text-left"
                >
                  info@dyfservicios.com
                </button>
              </div>
            </div>
            
            <div className="flex gap-6 pt-4 items-center">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline-variant font-bold">Seguir en Redes:</span>
              <a 
                href="https://www.instagram.com/dyftelecomunicaciones" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visitar nuestro Instagram"
                className="text-on-surface-variant hover:text-signal-orange transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/DYFTelecomunicaciones/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visitar nuestro Facebook"
                className="text-on-surface-variant hover:text-signal-orange transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="relative group p-8">
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
            <div className="absolute inset-0 opacity-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.1746381066987!2d-3.7340568999999992!3d40.306140600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4221d0f89b595d%3A0x38115b4a292ef153!2sDYF%20Telecomunicaciones%20y%20Servicios%20S.L.!5e1!3m2!1ses!2ses!4v1776515835259!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación DYF Telecomunicaciones"
              ></iframe>
            </div>
            
            {/* Scan Line Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-signal-orange/5 to-transparent h-[10%] w-full animate-scan z-20 opacity-30"></div>
          </div>
        </div>
      </section>
    </>
  );
};
