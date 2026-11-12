export default function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
}) {
  return (
    <header className={`section-header section-header--${align}`}>
      {label ? <p className="section-label">{label}</p> : null}
      {title ? <Tag className="section-header__title serif">{title}</Tag> : null}
      {description ? <p className="section-header__desc muted">{description}</p> : null}

      <style>{`
        .section-header {
          margin-bottom: var(--space-6);
          max-width: 40rem;
        }
        .section-header--center {
          text-align: center;
          margin-inline: auto;
        }
        .section-header--center .section-label {
          justify-content: center;
        }
        .section-header--center .section-header__desc {
          margin-inline: auto;
        }
        .section-header__title {
          font-size: clamp(1.7rem, 3vw, 2.35rem);
          letter-spacing: -0.02em;
          margin-bottom: var(--space-3);
        }
        .section-header__desc {
          max-width: 36rem;
          font-size: 1.05rem;
          line-height: 1.7;
        }
      `}</style>
    </header>
  );
}
