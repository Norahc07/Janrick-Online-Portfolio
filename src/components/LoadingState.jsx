import { LoaderCircle } from 'lucide-react';

export default function LoadingState({ message = 'Loading…' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <LoaderCircle className="loading-state__icon spin" aria-hidden="true" />
      <p className="muted">{message}</p>
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .spin { animation: none; }
        }
      `}</style>
    </div>
  );
}
