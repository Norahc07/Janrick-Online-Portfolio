import { Link } from 'react-router-dom';
import { student } from '../data/student';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__tagline muted">{student.footerTagline}</p>
          <p className="site-footer__copy">
            © {year} {student.fullName} | TTL 1 Online Portfolio
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/teaching-principles">Teaching Principles</Link>
          <Link to="/purpose">Purpose</Link>
          <Link to="/accomplished-activities">Accomplished Activities</Link>
        </nav>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
          padding: var(--space-6) 0;
          margin-top: auto;
        }
        .site-footer__inner {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .site-footer__tagline {
          font-size: 0.95rem;
          margin-bottom: 0.35rem;
        }
        .site-footer__copy {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .site-footer__nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem 1.15rem;
        }
        .site-footer__nav a {
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: color var(--transition);
        }
        .site-footer__nav a:hover {
          color: var(--text-primary);
        }
        @media (min-width: 768px) {
          .site-footer__inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>
    </footer>
  );
}
