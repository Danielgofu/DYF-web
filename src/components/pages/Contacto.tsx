import React from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  Mail,
  MapPin,
  Instagram,
  Facebook
} from "lucide-react";
import { NeuralNetworkBackground } from "../NeuralNetworkBackground";
import { ContactForm } from "../forms/ContactForm";
import { usePageMeta } from "../../utils/seo";
import { CONTACT, SOCIAL_LINKS } from "../../utils/contact";
import { MapEmbed } from "../MapEmbed";

export const Contacto: React.FC = () => {
  usePageMeta(
    "Contacto Directo y Presupuestos | DYF Telecomunicaciones",
    "Solicite presupuesto o auditoría técnica para su comunidad o empresa en Madrid. Atención telefónica 916 01 84 94 y respuesta en menos de 24h laborables."
  );

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
                alt="Racks de red con paneles de parcheo y cableado estructurado"
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
              <ContactForm />
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
                      <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">{method.label}</p>
                      <p className="font-headline text-lg sm:text-xl font-medium">{method.value}</p>
                    </div>
                  </div>
                </a>
              ))}

              <div className="bg-surface-low p-8 border-l border-signal-orange/20">
                <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-3 font-bold">Horario de Atención</p>
                <p className="font-headline text-lg font-medium text-white">{CONTACT.days}</p>
                <p className="font-label text-xs uppercase tracking-widest text-signal-orange mt-1">{CONTACT.timeRange}</p>
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
                    <p className="font-label text-xs font-bold uppercase text-primary-orange mb-2">{protocol.label}</p>
                    <p className="font-body text-sm font-light text-on-surface-variant">{protocol.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[500px] relative overflow-hidden bg-surface-lowest border-y border-outline-variant/10">
        <MapEmbed src={CONTACT.mapsEmbed} title="Oficinas DYF Telecomunicaciones" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-surface to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none"></div>
      </section>
    </motion.div>
  );
};
