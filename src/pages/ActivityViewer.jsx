import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { activities } from '../data/activities';
import { getDocumentUrl, sanitizeFilename, validateActivity } from '../utils/documentUtils';

const PdfContent = lazy(() => import('../components/PDFDocumentContent'));

export default function ActivityViewer() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(null);

  const activity = useMemo(() => {
    const match = activities.find((item) => item.id === activityId);
    if (!match) return null;
    const result = validateActivity(match);
    return result.valid ? result.activity : null;
  }, [activityId]);

  const safeName = sanitizeFilename(activity?.filename);
  const url = safeName ? getDocumentUrl(safeName) : null;

  useEffect(() => {
    const updateWidth = () => {
      const max = Math.min(window.innerWidth - 64, 900);
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
  }, [activityId]);

  if (!activity || !url) {
    return (
      <div className="page">
        <div className="container">
          <EmptyState
            title="Document not found"
            description="This activity could not be opened. It may have been removed or is not registered."
          >
            <Button to="/accomplished-activities" variant="primary">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Accomplished Activities
            </Button>
          </EmptyState>
        </div>
      </div>
    );
  }

  return (
    <div className="page viewer-page">
      <div className="container">
        <div className="viewer-toolbar">
          <Button
            variant="secondary"
            onClick={() => navigate('/accomplished-activities')}
            ariaLabel="Back to Accomplished Activities"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </Button>

          <div className="viewer-toolbar__actions">
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
              <Download size={16} aria-hidden="true" />
              Download
            </Button>
          </div>
        </div>

        <header className="viewer-header">
          <p className="section-label">Document Viewer</p>
          <h1 className="serif">{activity.title}</h1>
          <p className="muted">
            {activity.category}
            {activity.description ? ` · ${activity.description}` : ''}
          </p>
        </header>

        <div className="viewer-stage card">
          {error ? (
            <div className="error-state">
              <AlertTriangle className="error-state__icon" aria-hidden="true" />
              <h2 className="serif">Unable to display PDF</h2>
              <p className="muted">
                The document may be missing or corrupted. You can still download it or go back.
              </p>
              <div className="viewer-error-actions">
                <Button variant="primary" href={url} download={safeName}>
                  Download PDF
                </Button>
                <Button variant="secondary" to="/accomplished-activities">
                  Back to list
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
                  if (/abort/i.test(message)) return;
                  console.error('PDF load error:', err);
                  setError(true);
                }}
              />
            </Suspense>
          )}
        </div>

        {numPages && !error ? (
          <div className="viewer-pager">
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
          </div>
        ) : null}

        <p className="viewer-footnote muted">
          <Link to="/accomplished-activities">Return to Accomplished Activities</Link>
        </p>
      </div>

      <style>{`
        .viewer-toolbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .viewer-toolbar__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .viewer-header {
          margin-bottom: 1.25rem;
        }
        .viewer-header h1 {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          margin-bottom: 0.4rem;
        }
        .viewer-stage {
          min-height: 24rem;
          overflow: auto;
          background: #ececed;
          display: grid;
          place-items: start center;
          padding: 1rem;
        }
        .viewer-stage .react-pdf__Page {
          margin: 0 auto;
          box-shadow: var(--shadow-sm);
        }
        .viewer-stage .react-pdf__Page__canvas {
          max-width: 100%;
          height: auto !important;
        }
        .viewer-pager {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          margin-top: 1rem;
        }
        .viewer-error-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .viewer-footnote {
          margin-top: 1.5rem;
          font-size: 0.92rem;
        }
        .viewer-footnote a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
