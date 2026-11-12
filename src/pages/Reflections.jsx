import { BookMarked } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { student } from '../data/student';
import { reflections, reflectionGuidance } from '../data/reflections';

export default function Reflections() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-hero">
          <p className="section-label">08 — Learning Reflections</p>
          <h1 className="serif">Learning reflections</h1>
          <p className="muted">
            A space to document growth, challenges, and insights from this academic journey.
          </p>
        </div>

        <section className="card reflections-foundation">
          <h2 className="serif">Portfolio purpose</h2>
          <p className="muted">{student.purpose.summary}</p>
          <ol className="reflections-goals">
            {student.purpose.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ol>
          <p className="closing muted">{student.purpose.closing}</p>
        </section>

        <section className="reflections-list">
          <h2 className="serif reflections-list__title">Reflection entries</h2>

          {reflections.length === 0 ? (
            <EmptyState
              icon={BookMarked}
              title={reflectionGuidance.title}
              description={reflectionGuidance.description}
            >
              <ul className="guidance-tips">
                {reflectionGuidance.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </EmptyState>
          ) : (
            <div className="reflections-grid">
              {reflections.map((item) => (
                <article key={item.id} className="card reflection-card">
                  {item.date ? <p className="muted reflection-card__date">{item.date}</p> : null}
                  <h3>{item.title}</h3>
                  {item.summary ? <p className="muted">{item.summary}</p> : null}
                  {item.body ? <p>{item.body}</p> : null}
                  {item.tags?.length ? (
                    <ul className="reflection-tags">
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <style>{`
        .reflections-foundation {
          margin-bottom: var(--space-7);
        }
        .reflections-foundation h2 {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        .reflections-goals {
          list-style: decimal;
          padding-left: 1.25rem;
          margin: 1.25rem 0;
          display: grid;
          gap: 0.55rem;
          color: var(--text-secondary);
        }
        .reflections-foundation .closing {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .reflections-list__title {
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .guidance-tips {
          display: grid;
          gap: 0.45rem;
          text-align: left;
          max-width: 28rem;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 0.92rem;
        }
        .guidance-tips li {
          position: relative;
          padding-left: 1rem;
        }
        .guidance-tips li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 0.35rem;
          height: 0.35rem;
          background: var(--accent);
          border-radius: 50%;
        }
        .reflections-grid {
          display: grid;
          gap: 1rem;
        }
        .reflection-card {
          display: grid;
          gap: 0.75rem;
        }
        .reflection-card__date {
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .reflection-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .reflection-tags li {
          font-size: 0.75rem;
          border: 1px solid var(--border);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        @media (min-width: 768px) {
          .reflections-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
