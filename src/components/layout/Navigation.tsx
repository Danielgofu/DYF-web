import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { CONTACT, SOCIAL_LINKS } from "../../utils/contact";

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

const menuVariants: Variants = {
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

// La capa del diálogo no anima nada propio: solo propaga "opened"/"closed" al panel
// y al botón de cerrar, y AnimatePresence espera a que terminen antes de desmontarla.
const overlayVariants: Variants = {
  closed: {},
  opened: {}
};

const closeButtonVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.1 } },
  opened: { opacity: 1, transition: { duration: 0.15 } }
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: 50 },
  opened: { opacity: 1, x: 0 }
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Solo al cerrar con Escape o con el botón se devuelve el foco al botón de abrir;
  // al navegar con un enlace del menú, el foco lo gestiona App (va al contenido).
  const restoreFocusRef = useRef(false);

  const closeMenu = () => {
    restoreFocusRef.current = true;
    setIsMenuOpen(false);
  };

  // Al abrir, el foco entra en el diálogo (botón de cerrar). Al cerrarlo con
  // Escape o con el botón, vuelve al botón de abrir, que ya está visible otra vez.
  useEffect(() => {
    if (isMenuOpen) {
      closeRef.current?.focus();
    } else if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      toggleRef.current?.focus();
    }
  }, [isMenuOpen]);

  // Cierra el menú al cambiar de ruta (incluye atrás/adelante del navegador).
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Si la ventana pasa a tamaño escritorio con el menú abierto, se cierra
  // (si no, el overlay se oculta por CSS pero el scroll quedaba bloqueado).
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    // Mientras el menú está abierto, el contenido de la página y el pie quedan
    // inertes: ni el teclado ni los lectores de pantalla llegan a lo que hay detrás.
    const background = [
      document.getElementById("main-content"),
      document.querySelector("#main-content ~ footer"),
    ];
    background.forEach((el) => el?.setAttribute("inert", ""));

    // Foco atrapado dentro del diálogo (que ya incluye el botón de cerrar) y cierre con Escape.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      background.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav aria-label="Navegación principal" className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 md:px-12 py-3 max-w-[1920px] mx-auto">
          <Link
            to="/"
            aria-label="Ir a la página de inicio"
            className="flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
          >
            <img src="/DyfLogo.webp" alt="Logotipo DYF TELECOMUNICACIONES" className="h-8 md:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-10 items-center font-headline tracking-tight">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-block transition-all duration-300 pb-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:-translate-y-0.5 ${
                    isActive
                      ? "text-signal-orange border-b-2 border-signal-orange"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/contacto"
              className="hidden lg:block text-center bg-signal-orange text-surface px-6 py-2 md:px-8 md:py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary-orange transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Contacto Directo
            </Link>

            {/* Mobile Menu Toggle: con el menú abierto queda oculto (invisible) y su
                sitio lo ocupa el botón de cerrar, que está dentro del diálogo. */}
            <button
              ref={toggleRef}
              type="button"
              className={`lg:hidden text-on-surface p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:bg-white/5 rounded-full transition-colors cursor-pointer ${isMenuOpen ? "invisible" : ""}`}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          /* El diálogo envuelve el botón de cerrar y el panel. La capa es transparente
             y no captura clics fuera de ellos; el botón de cerrar ocupa exactamente la
             posición del botón de abrir de la barra (mismo padding y alineación). */
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-[55] lg:hidden pointer-events-none"
          >
            <div className="flex justify-end items-center px-6 md:px-12 py-3">
              <motion.button
                ref={closeRef}
                type="button"
                variants={closeButtonVariants}
                onClick={closeMenu}
                aria-label="Cerrar menú"
                className="pointer-events-auto text-on-surface p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            <motion.div
              variants={menuVariants}
              className="pointer-events-auto fixed inset-0 top-[69px] bg-[#131313] flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain"
            >
              <div className="flex flex-col p-8 gap-8 [@media(max-height:500px)]:p-5 [@media(max-height:500px)]:gap-3 font-headline">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div key={item.path} variants={itemVariants}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`block text-3xl [@media(max-height:500px)]:text-xl font-bold uppercase tracking-tighter text-left focus:outline-none focus-visible:underline focus-visible:underline-offset-8 transition-all duration-300 hover:pl-6 group ${
                          isActive ? "text-signal-orange" : "text-on-surface hover:text-signal-orange focus-visible:text-signal-orange"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-0 h-0.5 bg-signal-orange transition-all duration-300 group-hover:w-8 ${isActive ? 'w-8' : ''}`}></span>
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/contacto"
                    onClick={() => setIsMenuOpen(false)}
                    className="block mt-4 bg-signal-orange text-surface px-8 py-5 font-bold uppercase tracking-widest text-sm w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:bg-white hover:text-signal-orange transition-all active:scale-[0.98]"
                  >
                    Contacto Directo
                  </Link>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex gap-8 items-center pt-8 border-t border-outline-variant/10"
                >
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline font-black">Redes:</span>
                  <div className="flex gap-6">
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-surface hover:text-signal-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                      aria-label="Instagram de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-surface hover:text-signal-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
                      aria-label="Facebook de DYF Telecomunicaciones (se abre en una pestaña nueva)"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-auto p-8 text-outline"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] font-black border-b border-outline-variant/10 pb-4 mb-4 text-signal-orange">
                  Horario de Atención: {CONTACT.hours}
                </p>
                <div className="space-y-2 text-xs font-light leading-relaxed">
                  <p>Teléfonos: <a href={`tel:${CONTACT.phonePrimaryTel}`} className="inline-flex items-center min-h-11 text-white hover:text-signal-orange font-medium">{CONTACT.phonePrimary}</a> / <a href={`tel:${CONTACT.phoneSecondaryTel}`} className="inline-flex items-center min-h-11 text-white hover:text-signal-orange font-medium">{CONTACT.phoneSecondary}</a></p>
                  <p>Email: <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center min-h-11 text-white hover:text-signal-orange font-medium">{CONTACT.email}</a></p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
