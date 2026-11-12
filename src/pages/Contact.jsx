import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Button from '../components/Button';
import { student } from '../data/student';

export default function Contact() {
  const { contact } = student;
  const hasSocials = Array.isArray(contact.socials) && contact.socials.length > 0;

  return (
    <div className="page">
      <div className="container">
        <div className="page-hero">
          <p className="section-label">09 — Contact</p>
          <h1 className="serif">Get in touch</h1>
          <p className="muted">
            Reach out through the publicly approved contact details below.
          </p>
        </div>

        <div className="contact-grid">
          {contact.email ? (
            <article className="card contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <Mail size={18} />
              </span>
              <div>
                <h2>Email</h2>
                <p className="muted">{contact.email}</p>
                <Button
                  variant="secondary"
                  href={`mailto:${contact.email}`}
                  className="contact-card__action"
                >
                  Send an email
                </Button>
              </div>
            </article>
          ) : null}

          {contact.showPhone && contact.phone ? (
            <article className="card contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <Phone size={18} />
              </span>
              <div>
                <h2>Phone</h2>
                <p className="muted">{contact.phone}</p>
                <Button
                  variant="secondary"
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="contact-card__action"
                >
                  Call
                </Button>
              </div>
            </article>
          ) : null}

          {contact.showAddress && contact.address ? (
            <article className="card contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <MapPin size={18} />
              </span>
              <div>
                <h2>Location</h2>
                <p className="muted">{contact.address}</p>
              </div>
            </article>
          ) : null}

          {hasSocials
            ? contact.socials.map((social) => (
                <article key={social.url} className="card contact-card">
                  <span className="contact-card__icon" aria-hidden="true">
                    <ExternalLink size={18} />
                  </span>
                  <div>
                    <h2>{social.label}</h2>
                    <Button
                      variant="secondary"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-card__action"
                    >
                      Open link
                    </Button>
                  </div>
                </article>
              ))
            : null}
        </div>

        {!contact.showPhone && !contact.showAddress ? (
          <p className="contact-privacy muted">
            Phone number and residential address are intentionally hidden for privacy.
            They can be enabled in <code>src/data/student.js</code> when approved for public display.
          </p>
        ) : null}
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          gap: 1rem;
        }
        .contact-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
          align-items: start;
        }
        .contact-card__icon {
          width: 2.5rem;
          height: 2.5rem;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: var(--bg-primary);
        }
        .contact-card h2 {
          font-size: 1.05rem;
          margin-bottom: 0.35rem;
        }
        .contact-card__action {
          margin-top: 0.85rem;
        }
        .contact-privacy {
          margin-top: 1.5rem;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
