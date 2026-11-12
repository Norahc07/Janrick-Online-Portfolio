import { student } from '../data/student';

export default function TeachingPhilosophy() {
  const { teachingPhilosophy: philosophy } = student;

  return (
    <div className="page">
      <div className="container">
        <div className="page-hero" data-reveal>
          <p className="section-label">02 — Teaching Principles</p>
          <h1 className="serif">Teaching Principles</h1>
          <p>
            A statement of the values and approaches that guide this future educator.
          </p>
        </div>

        <div className="philosophy-layout">
          <blockquote className="principle panel" data-reveal data-reveal-delay="1">
            <p className="serif">“{philosophy.principle}”</p>
          </blockquote>

          <article className="prose philosophy-prose" data-reveal data-reveal-delay="2">
            {philosophy.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'lead' : undefined}>
                {paragraph}
              </p>
            ))}
            <p className="closing">{philosophy.closing}</p>
          </article>

          <div className="values" data-reveal data-reveal-delay="3">
            {['Patience', 'Kindness', 'Flexibility', 'Understanding', 'Inclusion'].map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .philosophy-layout {
          display: grid;
          gap: var(--space-7);
        }
        .principle {
          max-width: 48rem;
          text-align: left;
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }
        .principle p {
          margin: 0;
          font-size: clamp(1.45rem, 3.2vw, 2rem);
          line-height: 1.4;
          font-weight: 500;
          color: var(--text-primary);
        }
        .philosophy-prose .closing {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--text-primary);
          border-left: 2px solid var(--border);
          padding-left: 1rem;
          margin-top: 0.35rem;
        }
        .values {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }
        .values span {
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          padding: 0.5rem 0.85rem;
          border-radius: 999px;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
