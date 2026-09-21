import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageProps } from "../../types";
import { usePageMeta } from "../../utils/seo";

export const AvisoLegal: React.FC<PageProps> = () => {
  const navigate = useNavigate();

  usePageMeta(
    "Aviso Legal | DYF Telecomunicaciones",
    "Información legal, titularidad del portal y condiciones de uso de DYF Telecomunicaciones y Servicios, S.L."
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 overflow-x-hidden min-h-screen pb-32"
    >
      <main className="max-w-[1920px] mx-auto px-6 md:px-12 py-20">
        {/* Hero / Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-signal-orange pl-8">
          <div className="max-w-2xl">
            <p className="font-label text-signal-orange text-sm uppercase tracking-[0.3em] mb-4">Protocolo Regulatorio / 001</p>
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">
              Aviso<br />Legal
            </h1>
          </div>
          <div className="font-label text-outline-variant text-xs uppercase tracking-widest text-right">
            Última actualización<br />
            <span className="text-on-surface font-bold">Mayo 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Side Navigation */}
          <aside className="md:col-span-3 hidden md:block">
            <div className="sticky top-32 space-y-4 border-l border-outline-variant/30 pl-6">
              {[
                { id: "titularidad", label: "01 Titularidad" },
                { id: "terminos", label: "02 Términos de Uso" },
                { id: "propiedad", label: "03 Propiedad Intelectual" },
                { id: "responsabilidad", label: "04 Responsabilidad" },
                { id: "enlaces", label: "05 Enlaces Externos" },
                { id: "ley", label: "06 Ley Aplicable" }
              ].map((link) => (
                <a key={link.id} className="block font-label text-[10px] uppercase tracking-widest text-outline-variant hover:text-signal-orange transition-colors" href={`#${link.id}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Legal Content */}
          <div className="md:col-span-9 space-y-32">
            {/* 1. Ownership (Titularidad) */}
            <section className="scroll-mt-32" id="titularidad">
              <div className="flex items-start gap-6 mb-12">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">01</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Titularidad del Portal</h2>
              </div>
              <div className="bg-surface-highest/20 p-1 bg-gradient-to-br from-signal-orange/20 to-transparent">
                <div className="bg-surface-lowest p-8 md:p-12 space-y-8 border border-outline-variant/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {[
                      { label: "Razón Social", value: "DYF Telecomunicaciones y Servicios, S.L." },
                      { label: "Identificación Fiscal (CIF)", value: "B85223972" },
                      { label: "Acreditación Oficial", value: "Empresa Homologada - Registro de Instaladores de Telecomunicación de España (Nº 10265) - Miembro de AMIITEL" },
                      { label: "Sede Central", value: "C. Valdemorillo, 20, 28901 Getafe, Madrid" },
                      { label: "Infraestructura Digital", value: "info@dyfservicios.com" },
                      { label: "Contacto Directo", value: "916 01 84 94 / 918 31 20 61" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <p className="font-label text-[10px] uppercase text-outline-variant tracking-widest font-bold">{item.label}</p>
                        <p className="font-body text-lg font-bold text-white uppercase">{item.value}</p>
                      </div>
                    ))}
                    <div className="space-y-1">
                      <p className="font-label text-[10px] uppercase text-outline-variant tracking-widest font-bold">Estado Operativo</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-signal-orange animate-pulse"></div>
                        <p className="font-body text-xs font-bold text-signal-orange uppercase">Validado / Activo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Terms of Use */}
            <section className="scroll-mt-32" id="terminos">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">02</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Condiciones de Uso</h2>
              </div>
              <div className="max-w-none font-body text-on-surface-variant leading-relaxed space-y-6 text-lg font-light">
                <p>El acceso y uso de este sitio web atribuye la condición de usuario, implicando la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.</p>
                <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público. Dyf Telecomunicaciones se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona o que, a su juicio, no resulten adecuados para su publicación.</p>
              </div>
            </section>

            {/* 3. Intellectual Property */}
            <section className="scroll-mt-32" id="propiedad">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">03</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Propiedad Intelectual</h2>
              </div>
              <div className="bg-surface-low p-8 border-l-2 border-signal-orange/40">
                <p className="font-body text-on-surface-variant mb-6 italic text-lg font-light leading-relaxed">DyF Telecomunicaciones es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma.</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-label text-[11px] uppercase tracking-wider text-white font-bold">
                  {["Código Fuente & Software", "Estructura de Navegación", "Bases de Datos Propias", "Logotipos e Identidad Visual"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-signal-orange"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 4. Responsibility */}
            <section className="scroll-mt-32" id="responsabilidad">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">04</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Responsabilidad</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                DyF Telecomunicaciones no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </p>
            </section>

            {/* 5. External Links */}
            <section className="scroll-mt-32" id="enlaces">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">05</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Enlaces Externos</h2>
              </div>
              <p className="font-body text-on-surface-variant leading-relaxed text-lg font-light">
                En el caso de que en este portal se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, DyF Telecomunicaciones no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso DyF Telecomunicaciones asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.
              </p>
            </section>

            {/* 6. Modifications & Law */}
            <section className="scroll-mt-32" id="ley">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">06</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Modificaciones y Ley Aplicable</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-surface-highest/20 border-t border-outline-variant/30">
                  <h3 className="font-headline font-bold uppercase text-white mb-4 tracking-tighter text-xl">Derecho de Modificación</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">DyF Telecomunicaciones se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal.</p>
                </div>
                <div className="p-8 bg-surface-highest/20 border-t border-outline-variant/30">
                  <h3 className="font-headline font-bold uppercase text-white mb-4 tracking-tighter text-xl">Jurisdicción</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">La relación entre el titular y el usuario se regirá por la normativa española vigente. Cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Madrid.</p>
                </div>
              </div>
            </section>

            {/* Back Action */}
            <div className="pt-12 flex justify-center md:justify-start">
              <button 
                onClick={() => navigate("/")}
                className="group flex items-center gap-4 bg-signal-orange text-surface font-headline font-bold uppercase tracking-tighter px-10 py-5 transition-all hover:pr-14 relative overflow-hidden active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 uppercase font-black">Volver al inicio</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};
