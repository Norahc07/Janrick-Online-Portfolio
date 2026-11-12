import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reveals [data-reveal] elements as they enter the viewport.
 * Retries briefly so lazy-loaded route content is included.
 */
export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    let observer = null;
    const timers = [];

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setup = () => {
      if (cancelled) return;

      const elements = Array.from(document.querySelectorAll('[data-reveal]:not(.is-revealed)'));
      if (!elements.length) return;

      if (prefersReduced || !('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.12,
            rootMargin: '0px 0px -6% 0px',
          },
        );
      }

      elements.forEach((el) => observer.observe(el));
    };

    // Cover lazy route mounting.
    [0, 80, 200, 450].forEach((delay) => {
      timers.push(window.setTimeout(setup, delay));
    });

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      if (observer) observer.disconnect();
    };
  }, [pathname]);
}
