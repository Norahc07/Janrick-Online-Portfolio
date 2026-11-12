import { student } from '../data/student';

export default function Purpose() {
  const { purpose } = student;

  return (
    <div className="page">
      <div className="content-shell">
        <header className="content-hero" data-reveal>
          <h1 className="serif">Purpose of this portfolio</h1>
          <p>Why this TTL 1 online portfolio was created and what it aims to show.</p>
        </header>

        <div className="content-stack">
          <article className="content-body" data-reveal data-reveal-delay="1">
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
        .purpose-goals {
          max-width: 40rem;
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }
        .purpose-goals h2 {
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          text-align: center;
        }
        .purpose-goals ol {
          display: grid;
          gap: 1rem;
          text-align: left;
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
        @media (max-width: 767px) {
          .purpose-goals ol {
            text-align: center;
          }
          .purpose-goals li {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 0.35rem;
          }
        }
      `}</style>
    </div>
  );
}
