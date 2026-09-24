import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const NeuralNetworkBackground: React.FC<{ opacity?: number }> = ({ opacity = 0.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let particles: Particle[] = [];
    // Densidad según el área real del contenedor (antes, 60 partículas fijas daban
    // en móvil una red 3-9 veces más densa que en escritorio).
    let particleCount = 60;
    let connectionDistance = 150;
    // Tamaño en píxeles CSS; el lienzo interno se multiplica por la densidad de
    // píxeles de la pantalla (máx. 2) para que las líneas no se vean borrosas.
    let w = 0, h = 0;

    // El canvas se dibuja al tamaño de su contenedor real (la sección que lo
    // envuelve), no al de la ventana: antes se usaba window.innerWidth/innerHeight,
    // así que en secciones más cortas que la ventana (p. ej. la cabecera de
    // Contacto o Servicios) el navegador rasterizaba un lienzo mucho más grande
    // de lo que se llega a ver, y además lo mostraba deformado/escalado dentro
    // de una caja CSS más pequeña.
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = width; h = height;
      particleCount = Math.round(Math.min(60, Math.max(20, (width * height) / 12000)));
      connectionDistance = Math.min(150, width / 3);
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(242, 125, 38, ${opacity})`; // signal-orange
      ctx.fillStyle = `rgba(242, 125, 38, ${opacity / 2})`;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < connectionDistance) {
            ctx.lineWidth = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const start = () => {
      if (animationFrameId === null) {
        draw();
      }
    };

    // Pausa el bucle de animación (60 partículas => hasta ~1770 cálculos de
    // distancia por frame) en cuanto el canvas sale del viewport, en vez de
    // seguir ejecutándolo para siempre en segundo plano al hacer scroll.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stop();
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
