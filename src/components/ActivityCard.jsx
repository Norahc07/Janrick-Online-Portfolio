import { FileText, Download, Eye } from 'lucide-react';
import Button from './Button';
import { formatFileSize } from '../utils/documentUtils';

export default function ActivityCard({ activity }) {
  const sizeLabel = formatFileSize(activity.fileSize);
  const viewPath = `/accomplished-activities/${encodeURIComponent(activity.id)}`;

  return (
    <article className="activity-card">
      <div className="activity-card__top">
        <span className="activity-card__icon" aria-hidden="true">
          <FileText size={18} />
        </span>
        <span className="activity-card__category">{activity.category}</span>
      </div>

      <h3 className="activity-card__title">{activity.title}</h3>
      {activity.description ? (
        <p className="activity-card__desc muted">{activity.description}</p>
      ) : null}

      <div className="activity-card__meta muted">
        {activity.date ? <span>{activity.date}</span> : null}
        {sizeLabel ? <span>{sizeLabel}</span> : null}
      </div>

      <div className="activity-card__actions">
        <Button variant="primary" to={viewPath} ariaLabel={`View ${activity.title}`}>
          <Eye size={16} aria-hidden="true" />
          View PDF
        </Button>
        <Button
          variant="secondary"
          href={activity.url}
          download={activity.filename}
          ariaLabel={`Download ${activity.title}`}
        >
          <Download size={16} aria-hidden="true" />
          Download
        </Button>
      </div>

      <style>{`
        .activity-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.35rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .activity-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .activity-card__icon {
          width: 2.1rem;
          height: 2.1rem;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: var(--bg-primary);
        }
        .activity-card__category {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }
        .activity-card__title {
          font-size: 1.08rem;
          margin-bottom: 0.5rem;
          line-height: 1.35;
          font-weight: 600;
        }
        .activity-card__desc {
          font-size: 0.92rem;
          margin-bottom: 1rem;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .activity-card__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.8rem;
          margin-top: auto;
          margin-bottom: 1rem;
        }
        .activity-card__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .activity-card__actions .btn {
          flex: 1 1 auto;
          min-width: 7.5rem;
        }
      `}</style>
    </article>
  );
}
