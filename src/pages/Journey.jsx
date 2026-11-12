import {
  GraduationCap,
  School,
  BookOpen,
  Landmark,
} from 'lucide-react';
import { education } from '../data/education';

const icons = {
  tertiary: GraduationCap,
  'senior-high': School,
  'junior-high': BookOpen,
  elementary: Landmark,
};

export default function Journey() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-hero">
          <p className="section-label">03 — Educational Journey</p>
          <h1 className="serif">My educational journey</h1>
          <p className="muted">
            A chronological look at the schools and stages that shaped this learning path.
          </p>
        </div>

        <ol className="timeline">
          {education.map((item, index) => {
            const Icon = icons[item.id] || GraduationCap;
            return (
              <li key={item.id} className={`timeline__item ${item.current ? 'is-current' : ''}`}>
                <div className="timeline__marker" aria-hidden="true">
                  <span className="timeline__icon">
                    <Icon size={18} />
                  </span>
                  {index < education.length - 1 ? <span className="timeline__line" /> : null}
                </div>
                <article className="card timeline__card">
                  <div className="timeline__top">
                    <p className="timeline__level">{item.level}</p>
                    <p className="timeline__period muted">{item.period}</p>
                  </div>
                  <h2 className="timeline__school">{item.institution}</h2>
                  {item.detail ? <p className="muted">{item.detail}</p> : null}
                  {item.status ? (
                    <p className="timeline__status">{item.status}{item.current ? ' · Ongoing' : ''}</p>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        .timeline {
          display: grid;
          gap: 0;
        }
        .timeline__item {
          display: grid;
          grid-template-columns: 2.75rem 1fr;
          gap: 1rem;
        }
        .timeline__marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .timeline__icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          display: grid;
          place-items: center;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .timeline__item.is-current .timeline__icon {
          background: var(--surface-dark);
          border-color: var(--surface-dark);
          color: #fff;
        }
        .timeline__line {
          width: 1px;
          flex: 1;
          background: var(--border);
          margin: 0.35rem 0;
          min-height: 1.5rem;
        }
        .timeline__card {
          margin-bottom: 1.25rem;
        }
        .timeline__top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
        }
        .timeline__level {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }
        .timeline__period {
          font-size: 0.85rem;
        }
        .timeline__school {
          font-size: 1.2rem;
          margin-bottom: 0.4rem;
        }
        .timeline__status {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
