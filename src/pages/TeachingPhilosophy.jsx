import { student } from '../data/student';

export default function TeachingPhilosophy() {
  const { teachingPhilosophy: philosophy } = student;

  return (
    <div className="page">
      <div className="content-shell">
        <header className="content-hero" data-reveal>
          <p className="section-label">02 — Teaching Principles</p>
          <h1 className="serif">Teaching Principles</h1>
          <p>A statement of the values and approaches that guide this future educator.</p>
        </header>

        <div className="content-stack">
          <blockquote className="principle" data-reveal data-reveal-delay="1">
            <p className="serif">“{philosophy.principle}”</p>
          </blockquote>

          <article className="content-body" data-reveal data-reveal-delay="2">
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
        .principle {
          margin: 0;
          padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.25rem, 3vw, 2.5rem);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-align: center;
        }
        .principle p {
          margin: 0 auto;
          max-width: 36rem;
          font-size: clamp(1.45rem, 3.4vw, 2.05rem);
          line-height: 1.45;
          font-weight: 500;
          color: var(--text-primary);
        }
        .content-body .closing {
          font-family: var(--font-serif);
          font-size: 1.22rem;
          line-height: 1.55;
          color: var(--text-primary);
          margin-top: 0.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .values {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
          max-width: 40rem;
          margin: 0 auto;
        }
        .values span {
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          padding: 0.55rem 0.95rem;
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
