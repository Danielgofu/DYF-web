import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  History, 
  Cpu, 
  CheckCircle2, 
  Leaf, 
  Quote, 
  ArrowRight,
  UserCircle
} from "lucide-react";
import { PageProps } from "../../types";
import { usePageMeta } from "../../utils/seo";

export const Equipo: React.FC<PageProps> = () => {
  const navigate = useNavigate();

  usePageMeta(
    "Equipo y Valores | DYF Telecomunicaciones",
    "Conozca el equipo técnico y los valores de precisión que definen a DYF Telecomunicaciones. Excelencia operativa y compromiso en cada proyecto."
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 overflow-x-hidden min-h-screen"
    >
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-32 relative z-10 pt-10">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 mb-6 text-signal-orange">
              <span className="w-12 h-[1px] bg-signal-orange"></span>
              <span className="font-label text-xs uppercase tracking-[0.3em] font-bold">Capital Humano</span>
            </div>
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.9] text-on-surface mb-8 tracking-tighter uppercase">
              LA <span className="text-signal-orange italic">POTENCIA</span> DETRÁS DE LA RED.
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-xl font-light leading-relaxed">
              No somos solo técnicos; somos arquitectos de la conectividad. Un equipo multidisciplinar dedicado a la excelencia operativa y al mantenimiento de infraestructuras críticas.
            </p>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-surface-highest overflow-hidden border border-outline-variant/10 relative group">
              <img 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700" 
                alt="Miembro del equipo de ingeniería" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnE95sJgNqKsh38RPlW0t06K456K7N4I8_V9L6y-0XN5I2E-S8N4I8_V9L6y-0XN5I2E-S8N4I8_V9L6y-0XN5I2E-S8N4I8_V9L6y-0XN5I2E-S8N4I8_V9L6y-0XN5I2E-S8N4I8_V9L6y-0XN5I2"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8">
                <p className="font-headline text-4xl font-bold uppercase tracking-tighter text-white">Desde 2008</p>
                <p className="font-label text-[10px] uppercase tracking-widest text-signal-orange font-bold">Liderazgo Técnico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="bg-surface-lowest border-y border-outline-variant/10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant/10">
          {/* Experience */}
          <div className="p-10 md:p-16 border-outline-variant/20 group hover:bg-surface-low transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-12 transition-transform duration-500 group-hover:scale-110">
              <History className="w-12 h-12 text-signal-orange" />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 uppercase tracking-tighter transition-colors group-hover:text-signal-orange">Experiencia</h3>
            <p className="font-body text-on-surface-variant font-light leading-relaxed">
              Más de 10 años liderando el sector nos permiten anticipar desafíos y entregar resultados sin errores desde el primer día.
            </p>
          </div>
          {/* Innovation */}
          <div className="p-10 md:p-16 border-outline-variant/20 group hover:bg-surface-low transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-12 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              <Cpu className="w-12 h-12 text-signal-orange" />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 uppercase tracking-tighter transition-colors group-hover:text-signal-orange">Innovación</h3>
            <p className="font-body text-on-surface-variant font-light leading-relaxed">
              Desafiamos los límites tecnológicos para implementar soluciones que definen el estándar de la industria mañana.
            </p>
          </div>
          {/* Commitment */}
          <div className="p-10 md:p-16 border-outline-variant/20 group hover:bg-surface-low transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-12 transition-transform duration-500 group-hover:scale-110">
              <CheckCircle2 className="w-12 h-12 text-signal-orange" />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 uppercase tracking-tighter transition-colors group-hover:text-signal-orange">Compromiso</h3>
            <p className="font-body text-on-surface-variant font-light leading-relaxed">
              Fiabilidad inquebrantable en cada infraestructura. Construimos redes que sostienen el progreso de sociedades enteras.
            </p>
          </div>
          {/* Sustainability */}
          <div className="p-10 md:p-16 transition-all duration-300 group hover:bg-surface-low hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-12 transition-transform duration-500 group-hover:scale-110 text-green-500/80 group-hover:text-green-500">
              <Leaf className="w-12 h-12" />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 uppercase tracking-tighter transition-colors group-hover:text-signal-orange">Sostenibilidad</h3>
            <p className="font-body text-on-surface-variant font-light leading-relaxed">
              Arquitectura eficiente. Minimizamos el impacto ambiental mientras maximizamos la potencia de la conectividad global.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-surface-lowest relative overflow-hidden px-6 md:px-12">
        <div className="absolute top-0 right-0 p-12 opacity-5 font-headline font-black text-[15rem] leading-none select-none pointer-events-none">DYF</div>
        <div className="max-w-[1920px] mx-auto relative z-10">
          <div className="mb-20">
            <h2 className="font-headline text-5xl font-bold tracking-tighter mb-4">VOCES DEL EQUIPO</h2>
            <div className="h-1 w-24 bg-signal-orange"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                quote: "En Dyf no solo instalamos fibra; diseñamos los sistemas circulatorios de la era digital. Cada proyecto es un desafío de ingeniería que abordamos con precisión absoluta.",
                name: "Alba García",
                role: "Ingeniera de Telecomunicaciones",
                img: "https://picsum.photos/seed/alba/200/200"
              },
              {
                quote: "La cultura aquí se basa en la excelencia. Ser parte de la infraestructura crítica del país requiere una responsabilidad que solo un equipo de élite puede gestionar.",
                name: "Carlos Ruiz",
                role: "Director de Operaciones",
                img: "https://picsum.photos/seed/carlos/200/200"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-surface-low p-12 relative border border-outline-variant/10 group">
                <Quote className="absolute top-8 right-12 w-12 h-12 text-outline-variant/20 group-hover:text-signal-orange/20 transition-colors" />
                <div className="flex flex-col h-full justify-between">
                  <p className="font-body text-2xl font-light italic mb-12 text-on-surface leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-surface-highest border border-outline-variant/20 flex items-center justify-center text-signal-orange group-hover:text-white transition-colors">
                      <UserCircle className="w-10 h-10 opacity-80" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-xl uppercase tracking-tight">{testimonial.name}</h4>
                      <p className="font-label text-xs uppercase tracking-widest text-signal-orange font-bold">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment CTA */}
      <section className="py-40 bg-surface px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="bg-surface-highest p-1 border border-outline-variant/10">
            <div className="bg-surface p-16 md:p-24 border border-outline-variant/10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-signal-orange/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto relative z-10 uppercase">
                ¿TE GUSTARÍA FORMAR PARTE DE NUESTRO EQUIPO?
              </h2>
              <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 font-light relative z-10">
                Buscamos mentes inquietas y manos precisas. Conviértete en nuestro compañero de viaje en la construcción de la infraestructura del mañana.
              </p>
              <button 
                onClick={() => navigate("/contacto")}
                className="bg-signal-orange text-surface px-12 py-5 font-headline font-black text-xl uppercase tracking-tighter hover:bg-on-primary-container transition-all group inline-flex items-center gap-4 relative z-10 cursor-pointer"
              >
                Únete al equipo
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
