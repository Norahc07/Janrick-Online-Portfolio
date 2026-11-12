import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import Button from '../components/Button';
import ProfileCard from '../components/ProfileCard';
import SectionHeader from '../components/SectionHeader';
import { student } from '../data/student';
import { activities } from '../data/activities';
import { validateActivity } from '../utils/documentUtils';

export default function Home() {
  const featured = activities
    .map((item) => validateActivity(item))
    .filter((result) => result.valid)
    .map((result) => result.activity)
    .filter((item) => item.featured)
    .slice(0, 3);

  const preview =
    featured.length > 0
      ? featured
      : activities
          .map((item) => validateActivity(item))
          .filter((result) => result.valid)
          .map((result) => result.activity)
          .slice(0, 3);

  return (
    <div className="page home-page">
      <section className="hero container">
        <div className="hero__content" data-reveal="left">
          <p className="section-label">{student.portfolioLabel}</p>
          <h1 className="hero__greeting serif">{student.heroGreeting}</h1>
          <p className="hero__name">{student.fullName}</p>
          <p className="hero__desc muted">{student.heroDescription}</p>

          <ul className="hero__meta" aria-label="Academic identification">
            <li>{student.programShort} – 2B</li>
            <li>{student.school}</li>
            <li>{student.professionalIdentity}</li>
          </ul>

          <div className="hero__actions">
            <Button to="/accomplished-activities" variant="primary">
              Explore My Activities
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/resume" variant="secondary">
              View My Resume
            </Button>
          </div>
        </div>

        <div className="hero__media" data-reveal="right" data-reveal-delay="1">
          <ProfileCard size="hero" showIdentity={false} className="profile-card--hero" />
        </div>
      </section>

      <section id="intro" className="container home-section" data-reveal>
        <SectionHeader
          label="01 — Introduction"
          title="A digital home for learning and growth"
          description={student.purpose.summary}
        />
        <div className="home-goals">
          {student.purpose.goals.map((goal, index) => (
            <article
              key={goal}
              className="home-goal"
              data-reveal
              data-reveal-delay={String((index % 4) + 1)}
            >
              <span className="home-goal__index">0{index + 1}</span>
              <p>{goal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container home-section" data-reveal>
        <SectionHeader
          label="02 — Featured Outputs"
          title="Selected academic work"
          description="A glimpse of registered activities and outputs from this learning journey."
        />

        {preview.length === 0 ? (
          <div className="panel">
            <p className="muted">
              Academic documents will appear here after PDF files are added and registered.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Button to="/accomplished-activities" variant="secondary">
                Open Accomplished Activities
              </Button>
            </div>
          </div>
        ) : (
          <div className="home-featured">
            {preview.map((item, index) => (
              <article
                key={item.id}
                className="home-featured__item"
                data-reveal
                data-reveal-delay={String((index % 4) + 1)}
              >
                <div className="home-featured__top">
                  <FileText size={18} aria-hidden="true" />
                  <span>{item.category}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="muted">{item.description}</p>
                <Link to="/accomplished-activities" className="home-featured__link">
                  View in library <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .home-page {
          padding-top: 0;
        }
        .hero {
          display: grid;
          gap: var(--space-6);
          padding-block: var(--space-7) var(--space-8);
          align-items: center;
        }
        .hero__greeting {
          font-size: clamp(2.5rem, 7vw, 4.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 0.65rem;
          color: var(--text-primary);
        }
        .hero__name {
          font-size: 0.84rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 1.35rem;
        }
        .hero .section-label {
          color: var(--accent);
        }
        .hero__desc {
          font-size: 1.08rem;
          line-height: 1.75;
          max-width: 32rem;
          margin-bottom: 1.6rem;
        }
        .hero__meta {
          display: grid;
          gap: 0.45rem;
          margin-bottom: 1.85rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .hero__meta li {
          padding-left: 0.9rem;
          position: relative;
        }
        .hero__meta li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.72em;
          width: 0.35rem;
          height: 1px;
          background: var(--accent);
        }
        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .hero__media {
          max-width: 28rem;
          width: 100%;
          justify-self: center;
        }
        .home-section {
          padding-bottom: var(--space-8);
        }
        .home-goals {
          display: grid;
          gap: 0.85rem;
        }
        .home-goal {
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          gap: 1rem;
          align-items: start;
          padding: 1.15rem 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .home-goal__index {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--accent);
          font-weight: 600;
          padding-top: 0.2rem;
        }
        .home-goal p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .home-featured {
          display: grid;
          gap: 1rem;
        }
        .home-featured__item {
          display: grid;
          gap: 0.7rem;
          align-content: start;
          padding: 1.35rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          min-height: 100%;
        }
        .home-featured__top {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: var(--accent);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .home-featured__item h3 {
          font-size: 1.15rem;
          line-height: 1.35;
          font-weight: 600;
        }
        .home-featured__link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.35rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
        @media (min-width: 768px) {
          .home-goals {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .home-featured {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 960px) {
          .hero {
            grid-template-columns: 1.15fr 0.85fr;
            column-gap: 3.5rem;
            min-height: calc(100vh - var(--nav-height));
          }
          .hero__media {
            justify-self: end;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
