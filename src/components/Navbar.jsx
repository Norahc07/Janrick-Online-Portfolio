import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/resume', label: 'Resume' },
  { to: '/teaching-principles', label: 'Teaching Principles' },
  { to: '/purpose', label: 'Purpose' },
  { to: '/accomplished-activities', label: 'Accomplished Activities' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((value) => !value);

  return (
    <>
      <header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${open ? 'navbar--menu-open' : ''}`}
      >
        <div className="navbar__inner container">
          <button
            type="button"
            className="navbar__toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu-page"
            onClick={toggleMenu}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>

          <nav className="navbar__desktop" aria-label="Primary">
            <ul className="navbar__list navbar__list--desktop">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {open ? (
        <div
          className="menu-page"
          id="mobile-menu-page"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="menu-page__inner container">
            <p className="menu-page__label">Menu</p>
            <nav aria-label="Mobile primary">
              <ul className="menu-page__list">
                {links.map((link, index) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `menu-page__link ${isActive ? 'is-active' : ''}`
                      }
                      onClick={closeMenu}
                    >
                      <span className="menu-page__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="menu-page__text">{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}

      <style>{`
        .navbar {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 80;
          height: var(--nav-height);
          background: rgba(245, 245, 245, 0.97);
          border-bottom: 1px solid transparent;
          transition: border-color var(--transition), background var(--transition);
        }
        .navbar--scrolled,
        .navbar--menu-open {
          border-bottom-color: var(--border);
          background: #fff;
        }
        .navbar__inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .navbar__toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          color: var(--text-primary);
          flex-shrink: 0;
        }
        .navbar__desktop {
          display: none;
        }
        .navbar__list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .navbar__link {
          display: block;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          transition: color var(--transition), background var(--transition);
        }
        .navbar__link:hover,
        .navbar__link.is-active {
          color: var(--text-primary);
          background: rgba(32, 33, 36, 0.04);
        }
        .navbar__link.is-active {
          position: relative;
        }
        .navbar__link.is-active::after {
          content: '';
          position: absolute;
          left: 0.75rem;
          right: 0.75rem;
          bottom: 0.2rem;
          height: 1px;
          background: var(--surface-dark);
        }

        .menu-page {
          position: fixed;
          inset: 0;
          z-index: 70;
          background: var(--bg-primary);
          padding-top: var(--nav-height);
          overflow-y: auto;
        }
        .menu-page__inner {
          min-height: calc(100vh - var(--nav-height));
          padding-block: 2rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .menu-page__label {
          margin: 0 0 1.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
          text-align: center;
        }
        .menu-page__list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.35rem;
          max-width: 28rem;
          width: 100%;
          margin-inline: auto;
        }
        .menu-page__link {
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          align-items: baseline;
          gap: 0.75rem;
          padding: 1rem 0.25rem;
          border-bottom: 1px solid var(--border);
          color: var(--text-primary);
        }
        .menu-page__index {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: var(--accent);
        }
        .menu-page__text {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 7vw, 2.2rem);
          font-weight: 500;
          line-height: 1.2;
        }
        .menu-page__link.is-active .menu-page__text {
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }

        @media (min-width: 1024px) {
          .navbar__toggle,
          .menu-page {
            display: none !important;
          }
          .navbar__desktop {
            display: block;
          }
          .navbar__list--desktop {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
          }
        }
      `}</style>
    </>
  );
}
