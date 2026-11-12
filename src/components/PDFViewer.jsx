import { lazy, Suspense, useEffect, useState } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import Button from './Button';
import LoadingState from './LoadingState';
import { getDocumentUrl, sanitizeFilename } from '../utils/documentUtils';

const PdfContent = lazy(() => import('./PDFDocumentContent'));

export default function PDFViewer({ activity, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(null);

  const safeName = sanitizeFilename(activity?.filename);
  const url = safeName ? getDocumentUrl(safeName) : null;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    const updateWidth = () => {
      const max = Math.min(window.innerWidth - 48, 860);
      setWidth(max);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    setPage(1);
    setScale(1);
    setNumPages(null);
    setError(null);
  }, [activity?.id]);

  if (!url) {
    return (
      <div className="pdf-viewer" role="dialog" aria-modal="true" aria-label="PDF viewer">
        <div className="pdf-viewer__panel error-state">
          <AlertTriangle className="error-state__icon" aria-hidden="true" />
          <h2 className="serif">Invalid document</h2>
          <p className="muted">This file reference is not allowed.</p>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer" role="dialog" aria-modal="true" aria-label={`Viewing ${activity.title}`}>
      <div className="pdf-viewer__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pdf-viewer__panel">
        <header className="pdf-viewer__header">
          <div className="pdf-viewer__title-wrap">
            <h2 className="pdf-viewer__title">{activity.title}</h2>
            <p className="muted">{activity.category}</p>
          </div>
          <div className="pdf-viewer__controls">
            <Button
              variant="icon"
              onClick={() => setScale((s) => Math.max(0.6, Number((s - 0.1).toFixed(2))))}
              ariaLabel="Zoom out"
            >
              <ZoomOut size={18} />
            </Button>
            <Button
              variant="icon"
              onClick={() => setScale((s) => Math.min(2, Number((s + 0.1).toFixed(2))))}
              ariaLabel="Zoom in"
            >
              <ZoomIn size={18} />
            </Button>
            <Button
              variant="secondary"
              href={url}
              download={safeName}
              ariaLabel={`Download ${activity.title}`}
            >
              <Download size={16} />
              Download
            </Button>
            <Button variant="icon" onClick={onClose} ariaLabel="Close viewer">
              <X size={18} />
            </Button>
          </div>
        </header>

        <div className="pdf-viewer__body">
          {error ? (
            <div className="error-state">
              <AlertTriangle className="error-state__icon" aria-hidden="true" />
              <h3 className="serif">Unable to display PDF</h3>
              <p className="muted">
                The document may be missing or corrupted. You can still try downloading it.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="primary" href={url} download={safeName}>
                  Download PDF
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingState message="Preparing PDF viewer…" />}>
              <PdfContent
                url={url}
                page={page}
                width={width}
                scale={scale}
                onLoadSuccess={({ numPages: total }) => {
                  setNumPages(total);
                  setError(null);
                }}
                onLoadError={(err) => {
                  const message = String(err?.message || err || '');
                  // React StrictMode remounts can abort in-flight PDF loads.
                  if (/abort/i.test(message)) return;
                  console.error('PDF load error:', err);
                  setError(true);
                }}
              />
            </Suspense>
          )}
        </div>

        {numPages && !error ? (
          <footer className="pdf-viewer__footer">
            <Button
              variant="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              ariaLabel="Previous page"
              disabled={page <= 1}
            >
              <ChevronLeft size={18} />
            </Button>
            <span className="muted">
              Page {page} of {numPages}
            </span>
            <Button
              variant="icon"
              onClick={() => setPage((p) => Math.min(numPages, p + 1))}
              ariaLabel="Next page"
              disabled={page >= numPages}
            >
              <ChevronRight size={18} />
            </Button>
          </footer>
        ) : null}
      </div>

      <style>{`
        .pdf-viewer {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: grid;
          place-items: center;
          padding: 1rem;
        }
        .pdf-viewer__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(32, 33, 36, 0.55);
        }
        .pdf-viewer__panel {
          position: relative;
          z-index: 1;
          width: min(100%, 960px);
          max-height: min(92vh, 980px);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .pdf-viewer__header,
        .pdf-viewer__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border);
          background: var(--bg-primary);
        }
        .pdf-viewer__footer {
          border-bottom: 0;
          border-top: 1px solid var(--border);
          justify-content: center;
        }
        .pdf-viewer__title {
          font-size: 1rem;
          margin-bottom: 0.15rem;
        }
        .pdf-viewer__controls {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          justify-content: flex-end;
        }
        .pdf-viewer__body {
          overflow: auto;
          padding: 1rem;
          background: #ececed;
          min-height: 16rem;
        }
        .pdf-viewer__body .react-pdf__Page {
          margin: 0 auto;
          box-shadow: var(--shadow-sm);
        }
        .pdf-viewer__body .react-pdf__Page__canvas {
          max-width: 100%;
          height: auto !important;
        }
        @media (max-width: 640px) {
          .pdf-viewer {
            padding: 0;
          }
          .pdf-viewer__panel {
            width: 100%;
            max-height: 100vh;
            border-radius: 0;
            height: 100%;
          }
          .pdf-viewer__header {
            flex-direction: column;
            align-items: stretch;
          }
          .pdf-viewer__title-wrap {
            min-width: 0;
          }
        }
      `}</style>
    </div>
  );
}
