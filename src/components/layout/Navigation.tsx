import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", path: "/" },
  { label: "Equipo", path: "/equipo" },
  { label: "Servicios", path: "/servicios" },
  { label: "Contacto", path: "/contacto" },
  { label: "Mantenimiento", path: "/mantenimiento" },
];

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    opened: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <>
      <nav aria-label="Navegación principal" className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 md:px-12 py-3 max-w-[1920px] mx-auto">
          <button 
            onClick={() => handleNavigate("/")} 
            aria-label="Ir a la página de inicio"
            className="flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange cursor-pointer"
          >
            <img src="/DyfLogo.webp" alt="Logotipo DYF TELECOMUNICACIONES" className="h-8 md:h-10 w-auto object-contain" />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-10 items-center font-headline tracking-tight">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-all duration-300 pb-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:-translate-y-0.5 cursor-pointer ${
                    isActive 
                      ? "text-signal-orange border-b-2 border-signal-orange" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavigate("/contacto")}
              className="hidden lg:block bg-signal-orange text-surface px-6 py-2 md:px-8 md:py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary-orange transition-all active:scale-95 cursor-pointer"
            >
              Atención Inmediata
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-on-surface p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-[56px] md:top-[64px] bg-[#131313] z-[45] lg:hidden flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain"
            aria-hidden={!isMenuOpen}
          >
            <div className="flex flex-col p-8 gap-8 font-headline">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    variants={itemVariants}
                    onClick={() => handleNavigate(item.path)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-3xl font-bold uppercase tracking-tighter text-left focus:outline-none focus-visible:text-signal-orange transition-all duration-300 hover:pl-6 group cursor-pointer ${
                      isActive ? "text-signal-orange" : "text-on-surface hover:text-signal-orange"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-0 h-0.5 bg-signal-orange transition-all duration-300 group-hover:w-8 ${isActive ? 'w-8' : ''}`}></span>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
              <motion.button 
                variants={itemVariants}
                onClick={() => handleNavigate("/contacto")}
                className="mt-4 bg-signal-orange text-surface px-8 py-5 font-bold uppercase tracking-widest text-sm w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:bg-white hover:text-signal-orange transition-all active:scale-[0.98] cursor-pointer"
              >
                Atención Inmediata
              </motion.button>

              <motion.div 
                variants={itemVariants}
                className="flex gap-8 items-center pt-8 border-t border-outline-variant/10"
              >
                <span className="font-label text-[10px] uppercase tracking-widest text-outline-variant font-black">Redes:</span>
                <div className="flex gap-6">
                  <a 
                    href="https://www.instagram.com/dyftelecomunicaciones" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-on-surface hover:text-signal-orange transition-colors"
                    title="Visitar nuestro Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.facebook.com/DYFTelecomunicaciones/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-on-surface hover:text-signal-orange transition-colors"
                    title="Visitar nuestro Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-auto p-8 text-outline-variant"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] font-black border-b border-outline-variant/10 pb-4 mb-4 text-signal-orange">
                Horario de Atención: Lunes a Viernes: 9:00 AM - 14:00 PM
              </p>
              <div className="space-y-2 text-xs font-light leading-relaxed">
                <p>Teléfonos: <a href="tel:+34916018494" className="text-white hover:text-signal-orange font-medium">916 01 84 94</a> / <a href="tel:+34918312061" className="text-white hover:text-signal-orange font-medium">918 31 20 61</a></p>
                <p>Email: <a href="mailto:info@dyfservicios.com" className="text-white hover:text-signal-orange font-medium">info@dyfservicios.com</a></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

