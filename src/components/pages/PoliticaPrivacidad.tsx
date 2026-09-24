import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Fingerprint, 
  Network, 
  Shield, 
  MapPin, 
  MousePointerClick, 
  ArrowRight 
} from "lucide-react";
import { usePageMeta } from "../../utils/seo";
import { CONTACT } from "../../utils/contact";

export const PoliticaPrivacidad: React.FC = () => {
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
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-20 relative">
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
              <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Última Actualización</div>
              <div className="font-headline text-2xl font-bold text-white">24 SEP 2026</div>
            </div>
          </div>
        </div>

        {/* Content Layout: Asymmetric Bento Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-1 items-stretch bg-outline-variant/10 border border-outline-variant/10">
          {/* 01. Responsable */}
          <section className="md:col-span-8 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8" aria-hidden="true" />
              01. Responsable del tratamiento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Titular", value: "DYF Telecomunicaciones y Servicios, S.L." },
                { label: "CIF", value: "B85223972" },
                { label: "Domicilio", value: "C. Valdemorillo, 20, 28901 Getafe (Madrid)" },
                { label: "Teléfonos", value: `${CONTACT.phonePrimary} / ${CONTACT.phoneSecondary}` }
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-label text-[10px] uppercase text-outline tracking-widest font-bold mb-2">{item.label}</div>
                  <div className="font-body text-white font-medium">{item.value}</div>
                </div>
              ))}
              <div>
                <div className="font-label text-[10px] uppercase text-outline tracking-widest font-bold mb-2">Correo electrónico</div>
                <a className="font-headline text-lg font-bold text-signal-orange hover:underline transition-all" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </div>
          </section>

          <section className="md:col-span-4 bg-surface-container-highest p-8 md:p-12 border border-outline-variant/10 h-full">
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-signal-orange mb-8">Delegado de Protección de Datos</h2>
            <div className="space-y-6">
              <p className="font-body text-white font-medium leading-relaxed">No se ha designado, por no ser obligatorio según el art. 37 del RGPD y el art. 34 de la LOPDGDD.</p>
              <div className="pt-8 border-t border-outline-variant/20 mt-8">
                <ShieldAlert className="w-12 h-12 text-signal-orange/30" aria-hidden="true" />
              </div>
            </div>
          </section>

          {/* 02. Datos / 03. Finalidades */}
          <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 bg-surface-container-low border border-outline-variant/10">
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-outline-variant/10">
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-10">02. Qué datos tratamos y de dónde vienen</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-10">Solo tratamos los datos que usted nos facilita voluntariamente a través de los dos formularios de la web:</p>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-signal-orange/10 flex items-center justify-center shrink-0 border border-signal-orange/20">
                    <Fingerprint className="text-signal-orange w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-headline font-bold text-white uppercase text-sm tracking-widest mb-3">Formulario de contacto</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed font-light">Nombre y apellidos, correo electrónico, teléfono (opcional), motivo de la consulta y mensaje.</p>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-white uppercase text-sm tracking-widest mb-3">Formulario de plan a medida</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed font-light">Nombre de la comunidad o del concepto, tipo de servicio y los datos de contacto que usted escriba.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-signal-orange/10 flex items-center justify-center shrink-0 border border-signal-orange/20">
                    <Network className="text-signal-orange w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-white uppercase text-sm tracking-widest mb-3">Datos técnicos de la visita</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">Al visitar la web, el servidor del proveedor de alojamiento registra de forma técnica su dirección IP, la fecha y hora y la página solicitada. Lo hace por seguridad y para el funcionamiento del servicio.</p>
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed font-light">Esta web no tiene registro de usuarios ni áreas privadas. No usa cookies propias de sesión, de análisis ni de publicidad. No recogemos datos especialmente protegidos: le pedimos que no los incluya en el mensaje.</p>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-10">03. Finalidades y base jurídica</h2>
              <ul className="space-y-6">
                {[
                  { purpose: "Responder a solicitudes de presupuesto, planes de mantenimiento o información sobre nuestros servicios.", basis: "Aplicación de medidas precontractuales a petición del interesado (art. 6.1.b RGPD)." },
                  { purpose: "Responder a otras consultas generales.", basis: "Interés legítimo en atender las comunicaciones que se nos dirigen (art. 6.1.f RGPD)." },
                  { purpose: "Seguridad y funcionamiento técnico de la web (registros del servidor).", basis: "Interés legítimo (art. 6.1.f RGPD)." }
                ].map((item) => (
                  <li key={item.purpose} className="flex items-start gap-4">
                    <span className="text-signal-orange font-black mt-0.5" aria-hidden="true">/</span>
                    <span className="text-on-surface-variant text-sm font-light leading-relaxed">
                      <span className="text-white font-medium">{item.purpose}</span><br />
                      <span className="font-label text-[10px] uppercase text-outline tracking-widest font-bold">Base jurídica: </span>{item.basis}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light mt-10">No elaboramos perfiles ni tomamos decisiones automatizadas. No usaremos sus datos para enviarle comunicaciones comerciales si no lo ha pedido.</p>
            </div>
          </section>

          {/* 04. Destinatarios */}
          <section className="md:col-span-12 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">04. Destinatarios y encargados del tratamiento</h2>
            <p className="text-on-surface-variant mb-10 font-light text-lg">No cedemos sus datos a terceros salvo obligación legal. Para prestar el servicio intervienen los siguientes proveedores:</p>
            <ul className="space-y-6">
              {[
                { name: "FormSubmit (formsubmit.co), en Estados Unidos.", desc: "Es el servicio que recibe el formulario y lo reenvía a nuestro correo. Implica una transferencia internacional de datos (ver punto 5)." },
                { name: "Google Ireland Ltd. / Google LLC, por Google Maps.", desc: "La web incluye un mapa de Google Maps para mostrar nuestra ubicación (solo se carga si usted lo activa). Al cargarse, Google recibe al menos su dirección IP y puede instalar sus propias cookies. Google actúa como responsable independiente según su política de privacidad (policies.google.com/privacy). Google LLC está adherida al Marco de Privacidad de Datos UE-EE.UU." },
                { name: "Nominalia, en España.", desc: "Aloja la web y los registros del servidor, como encargado del tratamiento." },
                { name: "", desc: "El correo de los formularios se recibe en una cuenta de correo de DYF Telecomunicaciones y Servicios, S.L." }
              ].map((item) => (
                <li key={item.desc} className="flex items-start gap-4">
                  <span className="text-signal-orange font-black mt-0.5" aria-hidden="true">/</span>
                  <span className="text-on-surface-variant text-sm font-light leading-relaxed">
                    {item.name && <><span className="text-white font-medium">{item.name}</span> </>}{item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 05. Transferencias internacionales */}
          <section className="md:col-span-12 lg:col-span-5 bg-surface-container-highest p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">05. Transferencias internacionales</h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed font-light text-sm">
              <p>Los datos de los formularios pasan por los servidores de FormSubmit en Estados Unidos. No se ha podido confirmar que FormSubmit esté adherido al Marco de Privacidad de Datos UE-EE. UU. ni que ofrezca cláusulas contractuales tipo. Por ello, esta transferencia se realiza al amparo del artículo 49.1.b del RGPD, al ser necesaria para atender la solicitud realizada voluntariamente por el propio interesado a través del formulario, informándole expresamente de que no existe garantía adecuada confirmada respecto a dicho destinatario.</p>
              <p>En el caso de Google, la transferencia se ampara en el Marco de Privacidad de Datos UE-EE.UU.</p>
            </div>
          </section>

          {/* 06. Plazos de conservación */}
          <section className="md:col-span-12 lg:col-span-7 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">06. Plazos de conservación</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Consultas sin relación comercial", value: "El tiempo necesario para responder y, como máximo, 12 meses desde la última comunicación. Después se suprimen." },
                { label: "Presupuestos y contratos", value: "Mientras dure la relación y, después, durante los plazos legales de prescripción. Son 5 años para acciones personales (art. 1964 del Código Civil) y 6 años para la documentación mercantil y contable (art. 30 del Código de Comercio)." },
                { label: "Registros del servidor", value: "El tiempo que determine la configuración técnica del proveedor de alojamiento." }
              ].map((item) => (
                <div key={item.label} className="bg-surface-lowest p-6 border-l-2 border-signal-orange transition-colors hover:bg-surface-highest/20">
                  <div className="font-label text-[10px] uppercase text-outline mb-2 font-bold tracking-widest">{item.label}</div>
                  <div className="text-sm text-white font-light leading-relaxed">{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 07. Sus derechos */}
          <section className="md:col-span-12 lg:col-span-7 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">07. Sus derechos</h2>
            <p className="text-on-surface-variant mb-10 font-light text-lg">Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad. Si el tratamiento se basa en su consentimiento, también puede retirarlo en cualquier momento, sin que eso afecte a lo tratado antes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Acceso y rectificación", "Supresión y portabilidad", "Limitación del tratamiento", "Oposición"].map((right) => (
                <div key={right} className="bg-surface-lowest p-6 border-l-2 border-signal-orange transition-colors hover:bg-surface-highest/20">
                  <div className="text-xs text-white uppercase font-black tracking-widest">{right}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise of Rights CTA */}
          <section className="md:col-span-12 lg:col-span-5 bg-signal-orange p-10 md:p-12 flex flex-col justify-between border border-outline-variant/10">
            <div>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-surface mb-6">Cómo ejercerlos</h2>
              <p className="text-surface font-medium mb-6 leading-relaxed">Escriba a {CONTACT.email} o por correo postal a la dirección indicada, con el asunto "Protección de datos". Adjunte un medio que permita identificarle.</p>
              <p className="text-surface font-medium mb-10 leading-relaxed">Si considera que no hemos atendido correctamente su solicitud, puede presentar una reclamación ante la Agencia Española de Protección de Datos (<a className="underline font-bold" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>, C/ Jorge Juan, 6, 28001 Madrid).</p>
            </div>
            <a className="bg-surface text-signal-orange px-6 py-5 font-headline font-black uppercase tracking-wider text-sm text-center [overflow-wrap:anywhere] hover:bg-surface-highest transition-all" href={`mailto:${CONTACT.email}?subject=Protecci%C3%B3n%20de%20datos`}>
              Escribir a {CONTACT.email}
            </a>
          </section>

          {/* 08. Cookies y almacenamiento local */}
          <section className="md:col-span-12 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <div className="flex flex-col xl:flex-row gap-16 items-center">
              <div className="lg:w-1/3">
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-signal-orange mb-6">08. Cookies y almacenamiento local</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed font-light">La web no instala cookies propias.</p>
              </div>
              <div className="xl:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                {[
                  { icon: <Shield />, title: "Almacenamiento propio", desc: "Solo usa sessionStorage del navegador de forma técnica para recordar, durante la visita, si usted ya aceptó cargar el mapa de Google, y para evitar recargas en bucle si falla la carga de una página. Se borra al cerrar la pestaña y no identifica al usuario. Es un uso exento de consentimiento (art. 22.2 LSSI)." },
                  { icon: <MapPin />, title: "Cookies de Google Maps", desc: "El mapa solo se carga si usted lo activa pulsando el botón correspondiente. Al hacerlo, Google puede instalar sus propias cookies (terceros)." },
                  { icon: <MousePointerClick />, title: "Análisis y publicidad", desc: "No utilizamos cookies de análisis ni de publicidad.", disabled: true }
                ].map((cookie) => (
                  <div key={cookie.title} className={`p-8 bg-surface-lowest border border-outline-variant/10 ${cookie.disabled ? 'opacity-40 grayscale' : ''}`}>
                    <div className="text-signal-orange mb-6" aria-hidden="true">
                    {React.cloneElement(cookie.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="text-white font-bold text-xs uppercase mb-3 tracking-widest">{cookie.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{cookie.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 09. Seguridad / 10. Cambios */}
          <section className="md:col-span-6 bg-surface-container-low p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">09. Seguridad</h2>
            <p className="text-on-surface-variant font-light text-lg leading-relaxed">Aplicamos medidas técnicas y organizativas adecuadas, entre ellas el cifrado HTTPS de las comunicaciones.</p>
          </section>

          <section className="md:col-span-6 bg-surface-container-highest p-8 md:p-12 border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-signal-orange mb-8">10. Cambios en esta política</h2>
            <p className="text-on-surface-variant font-light text-lg leading-relaxed">Fecha de la última actualización: 24 de septiembre de 2026.</p>
          </section>
        </div>

        {/* Visual Anchor: Blueprint Image */}
        <div className="mt-20 relative h-[500px] w-full overflow-hidden border border-outline-variant/10">
          <img 
            alt=""
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
          <Link
            to="/"
            className="group flex items-center gap-4 bg-signal-orange text-surface font-headline font-bold uppercase tracking-tighter px-10 py-5 transition-all hover:pr-14 relative overflow-hidden active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 font-black uppercase">Volver al inicio</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
