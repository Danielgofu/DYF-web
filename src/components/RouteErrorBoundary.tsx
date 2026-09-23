import React from "react";
import { Link } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import { CONTACT } from "../utils/contact";

interface Props {
  children: React.ReactNode;
  resetKey: string;
}

interface State {
  error: Error | null;
}

const RELOAD_KEY = "dyf-chunk-reload-at";

function isChunkLoadError(error: Error) {
  return /dynamically imported module|Importing a module script failed|Expected a JavaScript module script|ChunkLoadError|Loading chunk/i.test(
    error.message
  );
}

/**
 * Tras publicar una versión nueva, los chunks con hash antiguo dejan de existir y
 * una ruta lazy puede fallar al cargarse. En ese caso recargamos una vez (el
 * index.html nuevo apunta a los chunks correctos). Si vuelve a fallar en menos de
 * 30 s no se recarga de nuevo, para no entrar en bucle: se muestra un aviso.
 */
export class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (!isChunkLoadError(error) || !navigator.onLine) return;
    try {
      const lastReload = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
      if (Date.now() - lastReload > 30_000) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        window.location.reload();
      }
    } catch {
      // sessionStorage no disponible (modo privado estricto): se muestra el aviso.
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-xl w-full bg-surface-low border-l-4 border-signal-orange p-10 md:p-14">
          <h1 className="font-headline text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6">
            No se ha podido cargar esta sección
          </h1>
          <p className="font-body text-on-surface-variant leading-relaxed mb-10">
            Puede deberse a una actualización reciente de la web o a un problema de conexión.
            Recargue la página para intentarlo de nuevo. Si lo necesita, puede llamarnos al{" "}
            <a href={`tel:${CONTACT.phonePrimaryTel}`} className="text-primary-orange underline">
              {CONTACT.phonePrimary}
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-3 bg-signal-orange text-surface px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
              Recargar
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-outline-variant text-on-surface px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
