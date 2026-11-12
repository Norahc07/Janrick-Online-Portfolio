import ProfileCard from '../components/ProfileCard';
import SectionHeader from '../components/SectionHeader';
import { student } from '../data/student';
import { interests } from '../data/skills';

export default function About() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-hero">
          <p className="section-label">02 — About Me</p>
          <h1 className="serif">Getting to know Janrick</h1>
          <p className="muted">
            A personal introduction to the student behind this TTL 1 online portfolio.
          </p>
        </div>

        <div className="about-layout">
          <aside className="about-layout__aside">
            <ProfileCard />
            <div className="card about-id">
              <h2 className="about-id__title">Academic Identification</h2>
              <dl>
                <div>
                  <dt>Program</dt>
                  <dd>{student.program}</dd>
                </div>
                <div>
                  <dt>Year & Section</dt>
                  <dd>{student.yearSection}</dd>
                </div>
                <div>
                  <dt>School</dt>
                  <dd>{student.school}</dd>
                </div>
                <div>
                  <dt>Identity</dt>
                  <dd>{student.professionalIdentity}</dd>
                </div>
                {student.academicYear ? (
                  <div>
                    <dt>Academic Year</dt>
                    <dd>{student.academicYear}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </aside>

          <div className="about-layout__main">
            <SectionHeader label="Introduction" title="Personal introduction" as="h2" />
            <div className="about-prose">
              {student.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="about-block">
              <h3 className="serif">Personal qualities</h3>
              <ul className="chip-list">
                {student.about.qualities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="about-block">
              <h3 className="serif">Interests</h3>
              <ul className="about-list">
                {interests.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </section>

            <section className="about-block">
              <h3 className="serif">Learning goals</h3>
              <ul className="about-list">
                {student.about.learningGoals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        .about-layout {
          display: grid;
          gap: var(--space-6);
        }
        .about-layout__aside {
          display: grid;
          gap: var(--space-4);
          align-content: start;
        }
        .about-id__title {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .about-id dl {
          display: grid;
          gap: 1rem;
        }
        .about-id dt {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }
        .about-id dd {
          margin: 0;
          color: var(--text-secondary);
        }
        .about-prose {
          display: grid;
          gap: 1.1rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-6);
        }
        .about-block {
          margin-bottom: var(--space-6);
        }
        .about-block h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }
        .chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .chip-list li {
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          padding: 0.45rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }
        .about-list {
          display: grid;
          gap: 0.65rem;
        }
        .about-list li {
          position: relative;
          padding-left: 1.1rem;
          color: var(--text-secondary);
        }
        .about-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.7em;
          width: 0.45rem;
          height: 0.45rem;
          border: 1px solid var(--accent);
          border-radius: 50%;
        }
        @media (min-width: 900px) {
          .about-layout {
            grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
            gap: var(--space-7);
          }
        }
      `}</style>
    </div>
  );
}
