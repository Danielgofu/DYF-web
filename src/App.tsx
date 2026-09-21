/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(document.readyState !== 'complete');
  const location = useLocation();

  useEffect(() => {
    const handleLoad = () => {
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
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!isOnline) {
    return <OfflineView />;
  }

  return (
    <div className="infrastructure-grid min-h-screen selection:bg-signal-orange selection:text-white bg-surface text-on-surface font-body overflow-x-hidden">
      <LoadingScreen isLoading={isLoading} />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-signal-orange focus:text-surface focus:px-6 focus:py-3 focus:font-bold focus:shadow-2xl transition-all"
      >
        Saltar al contenido principal
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/mantenimiento" element={<Mantenimiento />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
