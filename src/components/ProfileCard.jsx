import { useState } from 'react';
import { student } from '../data/student';

export default function ProfileCard({
  className = '',
  showIdentity = true,
  size = 'default',
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`profile-card profile-card--${size} ${className}`.trim()}>
      {!failed ? (
        <img
          src={student.profileImage}
          alt={student.profileImageAlt}
          className="profile-image"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="profile-image profile-image--placeholder" aria-hidden="true">
          <span className="serif">{student.monogram}</span>
        </div>
      )}

      {showIdentity ? (
        <figcaption className="profile-card__caption">
          <p className="profile-card__name">{student.fullName}</p>
          <p className="muted">
            {student.programShort} · {student.professionalIdentity}
          </p>
        </figcaption>
      ) : null}

      <style>{`
        .profile-card {
          margin: 0;
        }
        .profile-card__caption {
          margin-top: var(--space-4);
        }
        .profile-card__name {
          font-weight: 600;
          margin-bottom: 0.15rem;
        }
        .profile-image--placeholder {
          display: grid;
          place-items: center;
          background: linear-gradient(160deg, #e8e9eb, #d5d6d9);
          color: var(--surface-dark);
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 600;
        }
        .profile-card--hero .profile-image {
          max-height: 34rem;
        }
      `}</style>
    </figure>
  );
}
