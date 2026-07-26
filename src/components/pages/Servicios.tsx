import React from "react";
import { motion } from "motion/react";
import { 
  Radio, 
  Zap, 
  ClipboardList, 
  FileCheck, 
  Eye, 
  Smartphone, 
  ArrowDown, 
  ShieldCheck, 
  Network, 
  Wifi, 
  Database, 
  Cpu, 
  BarChart3,
  ArrowRight 
} from "lucide-react";

import { PageProps } from "../../types";
import { NeuralNetworkBackground } from "../NeuralNetworkBackground";

export const Servicios: React.FC<PageProps> = ({ setActivePage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 overflow-x-hidden min-h-screen"
    >
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-32 relative z-10 pt-10">
        <NeuralNetworkBackground opacity={0.25} />
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 mb-6 text-signal-orange">
              <span className="w-12 h-[1px] bg-signal-orange"></span>
              <span className="font-label text-xs uppercase tracking-[0.3em] font-bold">Mantenimiento de Infraestructuras</span>
            </div>
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.9] text-on-surface mb-8 tracking-tighter uppercase">
              LA <span className="text-signal-orange italic">POTENCIA</span> DE LA CONECTIVIDAD.
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-xl font-light leading-relaxed mb-10">
              Desplegamos soluciones de infraestructura homologadas y certificadas. Desde 2008 liderando la evolución tecnológica en la Comunidad de Madrid, fusionando experiencia con protocolos de seguridad de última generación.
            </p>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="aspect-video bg-surface-highest overflow-hidden border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover grayscale brightness-50" 
                alt="Torres de ingeniería" 
                src="https://picsum.photos/seed/telecom-towers/1200/800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-6 right-6 p-6 bg-surface-low border border-outline-variant/20 max-w-xs">
                <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange block mb-2">Estado del Sistema</span>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  Infraestructura Crítica: Operativa al 100%. Latencia Reducida: Protocolos de Seguridad Activa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Antennas Section */}
      <section className="px-6 md:px-12 py-32 bg-surface-lowest border-y border-outline-variant/10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square bg-surface-highest overflow-hidden">
              <img 
                className="w-full h-full object-cover grayscale contrast-125" 
                alt="Antena Parabólica" 
                src="https://picsum.photos/seed/satellite/800/800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-0 right-0 p-6 bg-signal-orange translate-x-1/4 -translate-y-1/4 hidden md:block">
              <Radio className="w-10 h-10 text-surface" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold block mb-4">Pilar 01</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Sistemas de Recepción & Antenas
            </h2>
            <p className="font-body text-lg text-on-surface-variant font-light leading-relaxed mb-12">
              Expertos en la instalación, mantenimiento y reparación de sistemas de recepción de señal terrestre (TDT) y satelital (Parabólicas). Garantizamos una recepción cristalina en HD y 4K para comunidades y particulares.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-surface-highest p-8 border-l-2 border-signal-orange/30">
                <h4 className="font-headline font-bold text-white mb-2">HD & 4K Ready</h4>
                <p className="text-xs text-on-surface-variant font-body">Optimización de señal para máxima resolución sin interferencias.</p>
              </div>
              <div className="bg-surface-highest p-8 border-l-2 border-outline-variant/30">
                <h4 className="font-headline font-bold text-white mb-2">Técnicos Certificados</h4>
                <p className="text-xs text-on-surface-variant font-body">Personal cualificado con equipamiento de medición profesional.</p>
              </div>
            </div>
            <ul className="space-y-4 font-body text-sm text-on-surface-variant">
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-signal-orange"></div>
                Orientación técnica de parabólicas a satélites europeos e internacionales.
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-signal-orange"></div>
                Resolución de problemas de pixelación y pérdida de frecuencia.
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-signal-orange"></div>
                Sintonización de canales HD y 4K en cabeceras comunitarias.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Communities Maintenance */}
      <section className="px-6 md:px-12 py-32 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold block mb-4">Gestión de Activos</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight">
              Mantenimiento Integral<br />de Comunidades
            </h2>
          </div>
          <p className="font-body text-xs text-outline-variant italic max-w-xs text-right">
            "La prevención es el único protocolo aceptable para sistemas críticos."
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Atención de Urgencias", icon: <Zap />, desc: "Servicio prioritario para comunidades bajo contrato, asegurando que el edificio nunca quede incomunicado.", label: "DISPONIBILIDAD TOTAL", status: "24/7", progress: 95 },
            { title: "Contratos Preventivos", icon: <ClipboardList />, desc: "Revisiones periódicas para evitar averías costosas y garantizar el funcionamiento al 100% de todos los servicios.", label: "EFICIENCIA OPERATIVA", status: "ÓPTIMO", progress: 88 },
            { title: "Ahorro Energético", icon: <BarChart3 />, desc: "Asesoramiento para reducir la factura eléctrica comunitaria mediante temporizadores y sistemas LED eficientes.", label: "REDUCCIÓN COSTES", status: "HASTA 60%", progress: 60 }
          ].map((card, i) => (
            <div key={i} className="bg-surface-highest p-10 border-t border-outline-variant/10 group hover:border-signal-orange transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-signal-orange mb-8 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                {React.cloneElement(card.icon as React.ReactElement, { className: "w-8 h-8" })}
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 transition-colors group-hover:text-signal-orange">{card.title}</h3>
              <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed mb-10 min-h-[4.5rem]">
                {card.desc}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-label uppercase tracking-widest">
                  <span className="text-outline-variant">{card.label}</span>
                  <span className="text-signal-orange font-bold">{card.status}</span>
                </div>
                <div className="h-0.5 w-full bg-surface-low overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${card.progress}%` }}
                    className="h-full bg-signal-orange"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Electricity Section */}
      <section className="px-6 md:px-12 py-32 max-w-[1920px] mx-auto border-t border-outline-variant/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold block mb-4">Pilar 02</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Electricidad e Iluminación LED
            </h2>
            <p className="font-body text-lg text-on-surface-variant font-light leading-relaxed mb-10">
              Servicios de electricidad general y eficiencia energética. Desde la reparación de cuadros eléctricos hasta la transición integral a sistemas LED para comunidades de propietarios.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                "Resolución de Averías",
                "Boletines Técnicos",
                "Sensores de Presencia",
                "Optimización de Consumo"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-signal-orange"></div>
                  <span className="font-label text-[10px] uppercase tracking-widest font-bold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-highest aspect-video overflow-hidden border border-outline-variant/10 relative group">
            <img 
              src="https://picsum.photos/seed/electrical/1200/800" 
              alt="Electricidad Industrial" 
              className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <Zap className="w-16 h-16 text-signal-orange opacity-20 group-hover:opacity-100 transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Access Control */}
      <section className="px-6 md:px-12 py-32 bg-surface-lowest border-y border-outline-variant/10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold block mb-4">Pilar 03</span>
            <h2 className="font-headline text-4xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Porteros & Videoporteros
            </h2>
            <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed mb-10">
              Especialistas en control de accesos. Instalamos desde sistemas convencionales hasta videoporteros digitales HD con visión nocturna, trabajando con marcas líderes para asegurar repuestos originales.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Eye className="w-5 h-5 text-signal-orange shrink-0" />
                <div>
                  <h5 className="font-headline text-xs font-bold uppercase text-white mb-1">Visión Nocturna</h5>
                  <p className="text-[10px] text-on-surface-variant font-body">Sensores infrarrojos para identificación clara en oscuridad total.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Smartphone className="w-5 h-5 text-signal-orange shrink-0" />
                <div>
                  <h5 className="font-headline text-xs font-bold uppercase text-white mb-1">Control Mobile</h5>
                  <p className="text-[10px] text-on-surface-variant font-body">Reciba llamadas y abra la puerta directamente desde su dispositivo.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative group">
            <div className="aspect-[4/5] bg-surface-highest overflow-hidden border border-outline-variant/10 relative">
              <img 
                className="w-full h-full object-cover grayscale brightness-75" 
                alt="Intercom device" 
                src="https://picsum.photos/seed/intercom/600/800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-surface to-transparent">
                <span className="font-label text-[10px] uppercase tracking-widest text-outline-variant block">Socio de Alianza</span>
                <p className="font-headline text-sm font-bold text-white uppercase mt-1">GOLMAR SYSTEMS</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="p-10 border border-outline-variant/10 bg-surface-low">
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 tracking-tighter">Sistemas de Bus 2 Hilos</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">Instalaciones rápidas sin necesidad de cableado estructural complejo. Ideal para renovaciones en fincas antiguas.</p>
            </div>
            
            <button 
              onClick={() => setActivePage("Contacto")}
              className="bg-signal-orange p-10 flex flex-col justify-between group text-left transition-all active:scale-[0.98] hover:brightness-110"
            >
              <span className="font-label text-[10px] uppercase tracking-widest text-surface font-bold">Especificación Técnica</span>
              <div className="flex justify-between items-end mt-12">
                <h4 className="font-headline text-4xl font-bold text-surface">HD Audio</h4>
                <ArrowRight className="text-surface w-8 h-8 group-hover:translate-x-3 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Security & Critical Networks */}
      <section className="px-6 md:px-12 py-32 max-w-[1920px] mx-auto text-center">
        <span className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold block mb-4">Pilar 04</span>
        <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-10">Seguridad & Redes Críticas</h2>
        <p className="font-body text-lg text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-20 text-center">
          Desplegamos cableado estructurado certificado y sistemas de videovigilancia CCTV con acceso remoto. Infraestructuras diseñadas para una conectividad sin interrupciones y seguridad perimetral avanzada.
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck />, label: "CCTV IP", desc: "Cámaras de alta resolución con analítica de vídeo y detección de intrusión." },
            { icon: <Network />, label: "Redes Estructuradas", desc: "Cableado Cat6 y Cat7 certificado para flujos de datos masivos." },
            { icon: <Wifi />, label: "Optimización WiFi", desc: "Mapas de calor y despliegue de APs para cobertura total sin zonas muertas." },
            { icon: <Database />, label: "Sistemas Backup", desc: "Sistemas de alimentación ininterrumpida y almacenamiento redundante." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-6 group cursor-default">
              <div className="text-signal-orange mb-2 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-10 h-10" })}
              </div>
              <h4 className="font-headline text-lg font-bold uppercase tracking-tight text-white transition-colors group-hover:text-signal-orange">{item.label}</h4>
              <p className="text-[10px] text-on-surface-variant font-body uppercase tracking-widest leading-relaxed px-4 transition-opacity group-hover:opacity-100 opacity-60">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-32 aspect-[21/9] bg-surface-highest overflow-hidden relative">
          <img 
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen" 
            alt="Networking cables" 
            src="https://picsum.photos/seed/cables/1800/600"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface opacity-80"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-32 max-w-[1920px] mx-auto bg-surface-low/50 relative overflow-hidden border-t border-outline-variant/10">
        <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
          <Cpu className="w-[600px] h-[600px] text-white" />
        </div>
        
        <div className="max-w-4xl">
          <h2 className="font-headline text-[clamp(2rem,10vw,4.5rem)] md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.9] text-white break-words">
            ¿Preparado para asegurar su <span className="text-signal-orange italic">infraestructura?</span>
          </h2>
          <p className="font-body text-xl text-on-surface-variant font-light mb-12 max-w-2xl leading-relaxed text-white/90">
            Nuestros especialistas técnicos están listos para realizar una auditoría de sus sistemas actuales y proponer soluciones de alta eficiencia.
          </p>
            <div className="flex flex-wrap gap-8 items-center">
              <button 
                onClick={() => setActivePage("Contacto")}
                className="bg-signal-orange text-surface font-label font-bold px-12 py-6 text-sm uppercase tracking-widest hover:brightness-110 hover:shadow-[0_20px_40px_rgba(242,125,38,0.3)] transition-all active:scale-[0.98]"
              >
                Solicitar Presupuesto
              </button>
            </div>
        </div>
      </section>

      {/* Service Footer Stats */}
      <div className="px-6 md:px-12 py-12 max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-outline-variant/10">
        {[
          { label: "Garantía", text: "Empresa Homologada" },
          { label: "Soporte", text: "Atención Urgencias" },
          { label: "Experiencia", text: "Desde 2008" },
          { label: "Cobertura", text: "Comunidad de Madrid" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline-variant font-bold">{stat.label}</span>
            <span className="font-headline text-sm font-bold text-white uppercase">{stat.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
