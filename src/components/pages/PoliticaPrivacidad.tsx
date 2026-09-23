import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Fingerprint, 
  Network, 
  Shield, 
  BarChart3, 
  MousePointerClick, 
  ArrowRight 
} from "lucide-react";
import { usePageMeta } from "../../utils/seo";
import { CONTACT } from "../../utils/contact";

export const PoliticaPrivacidad: React.FC = () => {
  const navigate = useNavigate();

  usePageMeta(
    "Política de Privacidad y Protección de Datos | DYF Telecomunicaciones",
    "Información sobre el tratamiento de datos y política de privacidad de DYF Telecomunicaciones de acuerdo con el RGPD y la LOPD-GDD."
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 overflow-x-hidden min-h-screen pb-32"
    >
      <main className="max-w-[1920px] mx-auto px-6 md:px-12 py-20 relative">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-5"></div>

        {/* Header Section */}
        <div className="relative z-10 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-signal-orange pl-8">
            <div>
              <span className="font-label text-signal-orange text-xs uppercase tracking-[0.3em] font-bold">Documentación Legal v4.0.1</span>
              <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mt-4">
                Política de<br />Privacidad
              </h1>
            </div>
            <div className="text-right">
              <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline-variant">Última Actualización</div>
              <div className="font-headline text-2xl font-bold text-white">MAYO 2026</div>
            </div>
          </div>
        </div>

        {/* Content Layout: Asymmetric Bento Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-1 items-start bg-outline-variant/10 border border-outline-variant/10">
          {/* Intro Card */}
          <section className="md:col-span-8 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8" />
              01. Introducción
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed font-light text-lg">
              <p>En <span className="text-white font-bold">Dyf Telecomunicaciones</span>, la integridad de su infraestructura digital es nuestra prioridad. Esta Política de Privacidad describe cómo recolectamos, procesamos y protegemos sus datos bajo los estándares de seguridad más rigurosos de la industria.</p>
              <p>Al acceder a nuestros servicios de infraestructura, usted confía en nuestra capacidad técnica para gestionar información sensible con transparencia absoluta y precisión arquitectónica.</p>
            </div>
          </section>

          {/* Controller Card */}
          <section className="md:col-span-4 bg-surface-container-highest p-8 md:p-12 border border-outline-variant/10 h-full">
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-signal-orange mb-8">Responsable</h2>
            <div className="space-y-6">
              <div>
                <div className="font-label text-[10px] uppercase text-outline-variant tracking-widest font-bold mb-2">Entidad Legal</div>
                <div className="font-body text-white font-medium">DYF Telecomunicaciones y Servicios, S.L. (CIF: B85223972)</div>
              </div>
              <div>
                <div className="font-label text-[10px] uppercase text-outline-variant tracking-widest font-bold mb-2">Contacto DPO</div>
                <a className="font-headline text-lg font-bold text-signal-orange hover:underline transition-all" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
              <div className="pt-8 border-t border-outline-variant/20 mt-8">
                <ShieldAlert className="w-12 h-12 text-signal-orange/30" />
              </div>
            </div>
          </section>

          {/* Data Inventory */}
          <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 bg-surface-container-low border border-outline-variant/10">
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-outline-variant/10">
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-10">02. Inventario de Datos</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-signal-orange/10 flex items-center justify-center shrink-0 border border-signal-orange/20">
                    <Fingerprint className="text-signal-orange w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-white uppercase text-sm tracking-widest mb-3">Datos de Identificación</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">Nombres, credenciales de acceso, registros de empleados autorizados y documentación fiscal para la prestación de servicios técnicos.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-signal-orange/10 flex items-center justify-center shrink-0 border border-signal-orange/20">
                    <Network className="text-signal-orange w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-white uppercase text-sm tracking-widest mb-3">Datos Técnicos</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">Direcciones IP, registros de tráfico de red, logs de mantenimiento de infraestructura y telemetría de nodos de conexión.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-10">03. Finalidad del Tratamiento</h2>
              <ul className="space-y-6">
                {[
                  "Ejecución y mantenimiento de contratos de infraestructura de telecomunicaciones.",
                  "Garantía de seguridad y estabilidad en los nodos de red gestionados.",
                  "Cumplimiento de obligaciones legales y normativas del sector telco.",
                  "Optimización técnica mediante análisis de rendimiento anónimo."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-signal-orange font-black mt-0.5">/</span>
                    <span className="text-on-surface-variant text-sm font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Retention & Rights */}
          <section className="md:col-span-7 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">04. Retención y Derechos</h2>
            <p className="text-on-surface-variant mb-10 font-light text-lg">Conservamos sus datos durante el tiempo estrictamente necesario para cumplir con las finalidades descritas o mientras exista una obligación legal.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Acceso & Rectificación", value: "Control Total" },
                { label: "Supresión & Portabilidad", value: "Derecho al Olvido" },
                { label: "Limitación de Tratamiento", value: "Restricción Técnica" },
                { label: "Oposición", value: "Derecho de Veto" }
              ].map((right, i) => (
                <div key={i} className="bg-surface-lowest p-6 border-l-2 border-signal-orange transition-colors hover:bg-surface-highest/20">
                  <div className="font-label text-[10px] uppercase text-outline-variant mb-2 font-bold tracking-widest">{right.label}</div>
                  <div className="text-xs text-white uppercase font-black tracking-widest">{right.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise of Rights CTA */}
          <section className="md:col-span-5 bg-signal-orange p-10 md:p-12 flex flex-col justify-between border border-outline-variant/10">
            <div>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-surface mb-6">Ejercicio de Derechos</h2>
              <p className="text-surface font-medium mb-10 leading-relaxed">Para ejercer cualquiera de sus derechos ARCO, envíe una comunicación formal adjuntando copia de su documento de identidad.</p>
            </div>
            <a className="bg-surface text-signal-orange px-8 py-5 font-headline font-black uppercase tracking-widest text-center hover:bg-surface-highest transition-all" href={`mailto:${CONTACT.email}`}>
              Solicitar Gestión de Datos
            </a>
          </section>

          {/* Cookie Policy */}
          <section className="md:col-span-12 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/3">
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-signal-orange mb-6">Política de Cookies</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed font-light">Nuestra plataforma utiliza únicamente cookies técnicas esenciales para garantizar la seguridad de la sesión y el correcto funcionamiento del panel de gestión.</p>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                {[
                  { icon: <Shield />, title: "Esenciales", desc: "Autenticación y seguridad de red." },
                  { icon: <BarChart3 />, title: "Rendimiento", desc: "Optimización de carga de nodos." },
                  { icon: <MousePointerClick />, title: "Marketing", desc: "No utilizamos cookies de rastreo.", disabled: true }
                ].map((cookie, i) => (
                  <div key={i} className={`p-8 bg-surface-lowest border border-outline-variant/10 ${cookie.disabled ? 'opacity-40 grayscale' : ''}`}>
                    <div className="text-signal-orange mb-6">
                    {React.cloneElement(cookie.icon as React.ReactElement, { className: "w-8 h-8" })}
                    </div>
                    <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-widest">{cookie.title}</h4>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest leading-relaxed">{cookie.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Visual Anchor: Blueprint Image */}
        <div className="mt-20 relative h-[500px] w-full overflow-hidden border border-outline-variant/10">
          <img 
            alt="Visualización abstracta de una red de datos"
            className="w-full h-full object-cover grayscale contrast-125 brightness-[0.3]"
            src="/images/privacidad-grid.webp"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12">
            <div className="font-headline text-5xl font-black text-white uppercase tracking-tighter opacity-20">BÓVEDA DE DATOS v4.0</div>
          </div>
        </div>

        <div className="mt-12 flex justify-center md:justify-start">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-4 bg-signal-orange text-surface font-headline font-bold uppercase tracking-tighter px-10 py-5 transition-all hover:pr-14 relative overflow-hidden active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 font-black uppercase">Volver al inicio</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </main>
    </motion.div>
  );
};
