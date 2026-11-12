import { student } from '../data/student';

export default function Purpose() {
  const { purpose } = student;

  return (
    <div className="page">
      <div className="container">
        <div className="page-hero" data-reveal>
          <p className="section-label">03 — Purpose</p>
          <h1 className="serif">Purpose of this portfolio</h1>
          <p>
            Why this TTL 1 online portfolio was created and what it aims to show.
          </p>
        </div>

        <div className="purpose-layout">
          <article className="prose" data-reveal data-reveal-delay="1">
            {purpose.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'lead' : undefined}>
                {paragraph}
              </p>
            ))}
          </article>

          <section className="purpose-goals panel" data-reveal data-reveal-delay="2">
            <h2 className="serif">Portfolio goals</h2>
            <ol>
              {purpose.goals.map((goal, index) => (
                <li key={goal}>
                  <span className="purpose-goals__index">0{index + 1}</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <style>{`
        .purpose-layout {
          display: grid;
          gap: var(--space-7);
        }
        .purpose-goals h2 {
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }
        .purpose-goals ol {
          display: grid;
          gap: 1rem;
        }
        .purpose-goals li {
          display: grid;
          grid-template-columns: 2.25rem 1fr;
          gap: 0.85rem;
          align-items: start;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .purpose-goals__index {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--accent);
          font-weight: 600;
          padding-top: 0.2rem;
        }
        @media (min-width: 960px) {
          .purpose-layout {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 3rem;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
}
