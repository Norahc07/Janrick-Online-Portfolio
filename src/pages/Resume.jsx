import { useState } from 'react';
import { Download, Mail, Phone, MapPin, Printer } from 'lucide-react';
import Button from '../components/Button';
import { student } from '../data/student';
import { education } from '../data/education';
import { skills, interests } from '../data/skills';
import { downloadResumePdf, printResumePdf } from '../utils/downloadResumePdf';

export default function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    const element = document.getElementById('resume-document');
    if (!element || isPrinting) return;

    setIsPrinting(true);
    try {
      await printResumePdf(element);
    } catch (error) {
      console.error('Resume print failed:', error);
      window.alert('Unable to print the resume. Please try again.');
    } finally {
      setIsPrinting(false);
    }
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-document');
    if (!element || isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadResumePdf(element);
    } catch (error) {
      console.error('Resume PDF download failed:', error);
      window.alert('Unable to download the resume PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const contactItems = [
    student.contact.email
      ? {
          key: 'email',
          icon: Mail,
          content: (
            <a href={`mailto:${student.contact.email}`}>{student.contact.email}</a>
          ),
        }
      : null,
    student.contact.showPhone && student.contact.phone
      ? {
          key: 'phone',
          icon: Phone,
          content: <span>{student.contact.phone}</span>,
        }
      : null,
    student.contact.showAddress && student.contact.address
      ? {
          key: 'address',
          icon: MapPin,
          content: <span>{student.contact.address}</span>,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="page resume-page">
      <div className="content-shell">
        <header className="content-hero" data-reveal>
          <p className="section-label">01 — Resume</p>
          <h1 className="serif">My resume</h1>
          <p>A concise academic resume based on verified student information.</p>
          <div className="content-hero__actions no-print" data-reveal data-reveal-delay="1">
            <Button
              variant="primary"
              onClick={handlePrint}
              disabled={isPrinting}
              ariaLabel={isPrinting ? 'Preparing resume for print' : 'Print resume'}
            >
              <Printer size={16} aria-hidden="true" />
              {isPrinting ? 'Preparing…' : 'Print Resume'}
            </Button>
            <Button
              variant="secondary"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              ariaLabel={isDownloading ? 'Downloading resume PDF' : 'Download resume PDF'}
            >
              <Download size={16} aria-hidden="true" />
              {isDownloading ? 'Downloading…' : 'Download Resume PDF'}
            </Button>
          </div>
        </header>

        <article className="resume panel" id="resume-document" data-reveal data-reveal-delay="2">
          <header className="resume__header">
            <div className="resume__top">
              <span className="resume__monogram" aria-hidden="true">
                {student.monogram}
              </span>
              <div className="resume__identity">
                <h2 className="serif resume__name">{student.fullName}</h2>
                <p className="resume__role">{student.program}</p>
                <p className="resume__meta muted">
                  {student.yearSectionCompact}
                  <span className="resume__dot" aria-hidden="true">
                    ·
                  </span>
                  {student.school}
                </p>
              </div>
            </div>

            {contactItems.length > 0 ? (
              <ul className="resume__contact" aria-label="Contact information">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.key}>
                      <Icon size={15} aria-hidden="true" />
                      {item.content}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </header>

          <section className="resume__section">
            <h3>About Me</h3>
            <div className="resume__about">
              {student.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="resume__section">
            <h3>Educational Background</h3>
            <ul className="resume__edu">
              {education.map((item) => (
                <li key={item.id} className="resume__edu-item">
                  <div className="resume__edu-top">
                    <strong>{item.level}</strong>
                    <span className="resume__period">{item.period}</span>
                  </div>
                  <p className="resume__school">{item.institution}</p>
                  {item.detail ? <p className="muted">{item.detail}</p> : null}
                  {item.status ? <p className="muted">{item.status}</p> : null}
                </li>
              ))}
            </ul>
          </section>

          <div className="resume__split">
            <section className="resume__section">
              <h3>Skills</h3>
              <ul className="resume__list">
                {skills.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </section>

            <section className="resume__section">
              <h3>Interests</h3>
              <ul className="resume__list">
                {interests.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>

      </div>

      <style>{`
        .resume {
          box-shadow: none;
        }
        .resume__header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.75rem;
        }
        .resume__top {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          min-width: 0;
        }
        .resume__monogram {
          flex: 0 0 auto;
          width: 3.25rem;
          height: 3.25rem;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-serif);
          font-size: 0.95rem;
          font-weight: 600;
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        .resume__identity {
          min-width: 0;
          flex: 1;
        }
        .resume__name {
          font-size: clamp(1.9rem, 3.4vw, 2.6rem);
          margin: 0 0 0.45rem;
          line-height: 1.15;
        }
        .resume__role {
          margin: 0 0 0.35rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.45;
        }
        .resume__meta {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .resume__dot {
          margin: 0 0.4rem;
        }
        .resume__contact {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem 1.25rem;
          margin: 0;
          padding: 0.85rem 1rem;
          list-style: none;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .resume__contact li {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          min-width: 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.4;
        }
        .resume__contact svg {
          flex: 0 0 auto;
          color: var(--accent);
        }
        .resume__contact a,
        .resume__contact span {
          color: inherit;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .resume__contact a:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }
        .resume__section {
          margin-bottom: 1.85rem;
        }
        .resume__section:last-child {
          margin-bottom: 0;
        }
        .resume__section h3 {
          margin: 0 0 1rem;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          padding-bottom: 0.55rem;
          border-bottom: 1px solid var(--border);
        }
        .resume__about {
          display: grid;
          gap: 0.9rem;
        }
        .resume__about p,
        .resume__edu p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .resume__edu {
          display: grid;
          gap: 1rem;
        }
        .resume__edu-item {
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }
        .resume__edu-item:first-child {
          padding-top: 0;
        }
        .resume__edu-item:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .resume__edu-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.35rem 1rem;
          margin-bottom: 0.35rem;
        }
        .resume__period {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .resume__school {
          color: var(--text-primary) !important;
          font-weight: 500;
          margin-bottom: 0.2rem !important;
        }
        .resume__split {
          display: grid;
          gap: 1.75rem;
        }
        .resume__list {
          display: grid;
          gap: 0.6rem;
        }
        .resume__list li {
          position: relative;
          padding-left: 1rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .resume__list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
          background: var(--accent);
        }
        @media (min-width: 768px) {
          .resume__split {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media print {
          .navbar,
          .site-footer,
          .scroll-top,
          .offline-banner,
          .no-print,
          .content-hero {
            display: none !important;
          }
          .main-content {
            padding-top: 0 !important;
          }
          .page {
            padding: 0 !important;
            animation: none !important;
          }
          .resume {
            border: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .resume__contact {
            background: transparent !important;
          }
          body {
            background: #fff !important;
          }
        }
      `}</style>
    </div>
  );
}
