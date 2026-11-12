import {
  MessageSquare,
  Newspaper,
  Presentation,
  Monitor,
  Image,
  Lightbulb,
  Users,
  BookOpen,
  Palette,
  Cpu,
  GraduationCap,
  Sparkles,
  Swords,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { skills, interests } from '../data/skills';

const iconMap = {
  'message-square': MessageSquare,
  newspaper: Newspaper,
  presentation: Presentation,
  monitor: Monitor,
  image: Image,
  lightbulb: Lightbulb,
  users: Users,
  'book-open': BookOpen,
  palette: Palette,
  'chess-knight': Swords,
  cpu: Cpu,
  'graduation-cap': GraduationCap,
  sparkles: Sparkles,
};

function SkillGrid({ items, labelPrefix }) {
  return (
    <div className="grid-3 skill-grid">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || Sparkles;
        return (
          <article key={item.id} className="card skill-card">
            <div className="skill-card__top">
              <span className="skill-card__icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span className="skill-card__index muted">
                {labelPrefix}
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3>{item.title}</h3>
          </article>
        );
      })}
    </div>
  );
}

export default function Skills() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-hero">
          <p className="section-label">05 — Skills & Interests</p>
          <h1 className="serif">My skills and interests</h1>
          <p className="muted">
            Developing competencies and personal interests that support growth as a future English educator.
          </p>
        </div>

        <section>
          <SectionHeader
            label="Skills"
            title="Capabilities in progress"
            description="Foundational skills developed through coursework, collaboration, and creative practice."
          />
          <SkillGrid items={skills} labelPrefix="S" />
        </section>

        <hr className="divider" />

        <section>
          <SectionHeader
            label="Interests"
            title="What fuels curiosity"
            description="Personal interests that enrich learning, creativity, and teaching perspective."
          />
          <SkillGrid items={interests} labelPrefix="I" />
        </section>
      </div>

      <style>{`
        .skill-card {
          display: grid;
          gap: 1rem;
          min-height: 9rem;
        }
        .skill-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .skill-card__icon {
          width: 2.25rem;
          height: 2.25rem;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: var(--bg-primary);
        }
        .skill-card__index {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }
        .skill-card h3 {
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
