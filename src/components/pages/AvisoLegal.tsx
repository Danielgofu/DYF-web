import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "../../utils/seo";
import { CONTACT } from "../../utils/contact";

export const AvisoLegal: React.FC = () => {
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
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-20">
        {/* Hero / Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-signal-orange pl-8">
          <div className="max-w-2xl">
            <p className="font-label text-signal-orange text-sm uppercase tracking-[0.3em] mb-4">Protocolo Regulatorio / 001</p>
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">
              Aviso<br />Legal
            </h1>
          </div>
          <div className="font-label text-outline text-xs uppercase tracking-widest text-right">
            Última actualización<br />
            <span className="text-on-surface font-bold">24 de septiembre de 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Side Navigation */}
          <nav aria-label="Secciones del aviso legal" className="md:col-span-3 hidden md:block">
            <div className="sticky top-32 space-y-4 border-l border-outline-variant/30 pl-6">
              {[
                { id: "titularidad", label: "01 Datos identificativos" },
                { id: "objeto", label: "02 Objeto" },
                { id: "terminos", label: "03 Condiciones de uso" },
                { id: "propiedad", label: "04 Propiedad intelectual" },
                { id: "responsabilidad", label: "05 Responsabilidad" },
                { id: "enlaces", label: "06 Enlaces de terceros" },
                { id: "datos", label: "07 Protección de datos" },
                { id: "ley", label: "08 Legislación y jurisdicción" }
              ].map((link) => (
                <a key={link.id} className="block font-label text-[10px] uppercase tracking-widest text-outline hover:text-signal-orange transition-colors" href={`#${link.id}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Main Legal Content */}
          <div className="md:col-span-9 space-y-32">
            {/* 01. Datos identificativos */}
            <section className="scroll-mt-32" id="titularidad">
              <div className="flex items-start gap-6 mb-12">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">01</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Datos identificativos</h2>
              </div>
              <p className="font-label text-[10px] uppercase text-outline tracking-widest font-bold mb-6">Art. 10 de la Ley 34/2002, LSSI-CE</p>
              <div className="bg-surface-highest/20 p-1 bg-gradient-to-br from-signal-orange/20 to-transparent">
                <div className="bg-surface-lowest p-8 md:p-12 space-y-8 border border-outline-variant/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {[
                      { label: "Titular", value: "DYF Telecomunicaciones y Servicios, S.L." },
                      { label: "CIF", value: "B85223972" },
                      { label: "Domicilio social", value: "C. Valdemorillo, 20, 28901 Getafe (Madrid)" },
                      { label: "Datos registrales", value: "Inscrita en el Registro Mercantil de Madrid. (Datos de inscripción en trámite de actualización.)" },
                      { label: "Correo electrónico", value: CONTACT.email },
                      { label: "Teléfonos", value: `${CONTACT.phonePrimary} / ${CONTACT.phoneSecondary}` }
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <p className="font-label text-[10px] uppercase text-outline tracking-widest font-bold">{item.label}</p>
                        <p className="font-body text-lg font-bold text-white">{item.value}</p>
                      </div>
                    ))}
                    <div className="space-y-1 md:col-span-2">
                      <p className="font-label text-[10px] uppercase text-outline tracking-widest font-bold">Habilitación profesional</p>
                      <p className="font-body text-lg font-bold text-white">Empresa inscrita en el Registro de Empresas Instaladoras de Telecomunicación del Ministerio para la Transformación Digital y de la Función Pública (Secretaría de Estado de Telecomunicaciones e Infraestructuras Digitales) con el nº 10265. Miembro de AMIITEL.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Objeto */}
            <section className="scroll-mt-32" id="objeto">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">02</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Objeto</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                Esta web informa sobre los servicios de instalación y mantenimiento de telecomunicaciones de DYF y permite contactar con la empresa. No se contratan servicios ni se hacen pagos a través de ella.
              </p>
            </section>

            {/* 03. Condiciones de uso */}
            <section className="scroll-mt-32" id="terminos">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">03</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Condiciones de Uso</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                El usuario se compromete a usar la web y sus formularios conforme a la ley y a la buena fe. En particular, se compromete a no enviar información falsa, datos de terceros sin su autorización ni contenidos ilícitos.
              </p>
            </section>

            {/* 04. Propiedad intelectual */}
            <section className="scroll-mt-32" id="propiedad">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">04</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Propiedad Intelectual e Industrial</h2>
              </div>
              <div className="bg-surface-low p-8 border-l-2 border-signal-orange/40">
                <p className="font-body text-on-surface-variant text-lg font-light leading-relaxed">Los textos, el diseño, el código, la marca y el logotipo de DYF son titularidad de DYF Telecomunicaciones y Servicios, S.L. o se usan con licencia. Algunas fotografías proceden de bancos de imágenes de dominio público o con licencia CC0 (ver CREDITOS-IMAGENES.txt), que no confieren derechos exclusivos a DYF. Queda prohibida la reproducción de los elementos protegidos sin autorización.</p>
              </div>
            </section>

            {/* 05. Responsabilidad */}
            <section className="scroll-mt-32" id="responsabilidad">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">05</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Responsabilidad</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                DYF procura que la información de la web sea exacta y esté actualizada. Sin embargo, tiene carácter orientativo: los precios y condiciones definitivos serán los del presupuesto que se entregue por escrito. DYF no responde de interrupciones del servicio por causas técnicas ajenas a ella.
              </p>
            </section>

            {/* 06. Enlaces de terceros */}
            <section className="scroll-mt-32" id="enlaces">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">06</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Enlaces y Contenidos de Terceros</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                La web incluye enlaces a Facebook e Instagram y un mapa de Google Maps. DYF no controla esos servicios ni responde de su contenido ni de sus políticas, que se rigen por sus propios términos.
              </p>
            </section>

            {/* 07. Protección de datos */}
            <section className="scroll-mt-32" id="datos">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">07</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Protección de Datos</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                Ver la <Link to="/politica-privacidad" className="text-primary-orange underline underline-offset-4 hover:text-white">Política de Privacidad</Link>.
              </p>
            </section>

            {/* 08. Legislación y jurisdicción */}
            <section className="scroll-mt-32" id="ley">
              <div className="flex items-start gap-6 mb-8">
                <span className="font-headline text-4xl font-black text-signal-orange leading-none">08</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Legislación y Jurisdicción</h2>
              </div>
              <p className="max-w-none font-body text-on-surface-variant leading-relaxed text-lg font-light">
                Se aplica la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Getafe. Si el usuario es consumidor, será competente el juzgado de su domicilio, conforme a la normativa de consumidores.
              </p>
            </section>

            {/* Back Action */}
            <div className="pt-12 flex justify-center md:justify-start">
              <Link
                to="/"
                className="group flex items-center gap-4 bg-signal-orange text-surface font-headline font-bold uppercase tracking-tighter px-10 py-5 transition-all hover:pr-14 relative overflow-hidden active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 uppercase font-black">Volver al inicio</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
