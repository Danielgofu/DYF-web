/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Inicio } from "./components/pages/Inicio";
import { Equipo } from "./components/pages/Equipo";
import { Servicios } from "./components/pages/Servicios";
import { Contacto } from "./components/pages/Contacto";
import { Mantenimiento } from "./components/pages/Mantenimiento";
import { Gracias } from "./components/pages/Gracias";
import { AvisoLegal } from "./components/pages/AvisoLegal";
import { PoliticaPrivacidad } from "./components/pages/PoliticaPrivacidad";
import { NotFoundView } from "./components/pages/NotFoundView";
import { OfflineView } from "./components/pages/OfflineView";
import { LoadingScreen } from "./components/layout/LoadingScreen";
import { Page } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("Inicio");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(document.readyState !== 'complete');

  useEffect(() => {
    const handleLoad = () => {
      // Pequeño retardo para asegurar que la animación de salida se vea fluida 
      // pero solo si realmente hubo tiempo de carga
      setTimeout(() => setIsLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (activePage === "Gracias") {
      const timer = setTimeout(() => {
        setActivePage("Inicio");
      }, 5000);
      return () => clearTimeout(timer);
    }
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [activePage]);

  if (!isOnline) {
    return <OfflineView />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "Inicio":
        return <Inicio setActivePage={setActivePage} />;
      case "Equipo":
        return <Equipo setActivePage={setActivePage} />;
      case "Servicios":
        return <Servicios setActivePage={setActivePage} />;
      case "Contacto":
        return <Contacto setActivePage={setActivePage} />;
      case "Mantenimiento":
        return <Mantenimiento setActivePage={setActivePage} />;
      case "Gracias":
        return <Gracias setActivePage={setActivePage} />;
      case "AvisoLegal":
        return <AvisoLegal setActivePage={setActivePage} />;
      case "PoliticaPrivacidad":
        return <PoliticaPrivacidad setActivePage={setActivePage} />;
      case "NotFound":
        return <NotFoundView setActivePage={setActivePage} />;
      default:
        return <NotFoundView setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="infrastructure-grid min-h-screen selection:bg-signal-orange selection:text-white bg-surface text-on-surface font-body overflow-x-hidden">
      <LoadingScreen isLoading={isLoading} />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-signal-orange focus:text-surface focus:px-6 focus:py-3 focus:font-bold focus:shadow-2xl transition-all"
      >
        Saltar al contenido principal
      </a>
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
