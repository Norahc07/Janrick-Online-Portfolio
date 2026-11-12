import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import LoadingState from './LoadingState';

// Served from /public for reliable same-origin worker loading in Vite/PWA builds.
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

export default function PDFDocumentContent({
  url,
  page,
  width,
  scale,
  onLoadSuccess,
  onLoadError,
}) {
  return (
    <Document
      file={url}
      loading={<LoadingState message="Loading document…" />}
      onLoadSuccess={onLoadSuccess}
      onLoadError={onLoadError}
      error={
        <div className="error-state">
          <p className="muted">Failed to load this PDF.</p>
        </div>
      }
    >
      <Page
        pageNumber={page}
        width={width ? width * scale : undefined}
        loading={<LoadingState message="Rendering page…" />}
        renderTextLayer
        renderAnnotationLayer
      />
    </Document>
  );
}
