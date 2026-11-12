import { useState } from 'react';
import { student } from '../data/student';

export default function ProfileCard({
  className = '',
  showIdentity = true,
  size = 'default',
}) {
  const [failed, setFailed] = useState(false);
  const isHero = size === 'hero';

  return (
    <figure className={`profile-card profile-card--${size} ${className}`.trim()}>
      <div className={isHero ? 'profile-card__frame' : undefined}>
        {isHero ? (
          <>
            <span className="profile-card__glow" aria-hidden="true" />
            <span className="profile-card__orbit profile-card__orbit--outer" aria-hidden="true" />
            <span className="profile-card__orbit profile-card__orbit--inner" aria-hidden="true" />

            <span className="profile-card__satellite profile-card__satellite--a" aria-hidden="true">
              <span className="profile-card__orbit-dot" />
            </span>
            <span className="profile-card__satellite profile-card__satellite--b" aria-hidden="true">
              <span className="profile-card__orbit-dot profile-card__orbit-dot--sm" />
            </span>
            <span className="profile-card__satellite profile-card__satellite--c" aria-hidden="true">
              <span className="profile-card__orbit-dot profile-card__orbit-dot--xs" />
            </span>

            <span className="profile-card__hud" aria-hidden="true">
              <span className="profile-card__bracket profile-card__bracket--tl" />
              <span className="profile-card__bracket profile-card__bracket--tr" />
              <span className="profile-card__bracket profile-card__bracket--bl" />
              <span className="profile-card__bracket profile-card__bracket--br" />
            </span>

            <span className="profile-card__scan" aria-hidden="true" />

            <span className="profile-card__status" aria-hidden="true">
              <span className="profile-card__status-dot" />
              ONLINE
            </span>
          </>
        ) : null}

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
      </div>

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
          background: linear-gradient(160deg, #1a1d28, #12141c);
          color: var(--accent);
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 600;
        }

        .profile-card--hero .profile-card__frame {
          position: relative;
          isolation: isolate;
          padding: 1.4rem;
          animation: profileFloat 7s ease-in-out infinite;
        }

        .profile-card--hero .profile-image {
          position: relative;
          z-index: 3;
          max-height: 34rem;
          border: 1px solid rgba(232, 184, 74, 0.38);
          box-shadow:
            0 22px 50px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(232, 184, 74, 0.1) inset,
            0 0 32px rgba(232, 184, 74, 0.14);
        }

        .profile-card__glow {
          position: absolute;
          inset: -10% -6%;
          z-index: 0;
          border-radius: 32%;
          background:
            radial-gradient(ellipse at 50% 35%, rgba(232, 184, 74, 0.36), transparent 58%),
            radial-gradient(ellipse at 18% 82%, rgba(232, 184, 74, 0.14), transparent 50%),
            radial-gradient(ellipse at 88% 68%, rgba(240, 200, 74, 0.12), transparent 48%);
          filter: blur(22px);
          animation: profileGlow 5s ease-in-out infinite;
          pointer-events: none;
        }

        .profile-card__orbit {
          position: absolute;
          z-index: 1;
          border-radius: 46% / 40%;
          pointer-events: none;
        }

        .profile-card__orbit--outer {
          inset: 0.05rem;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            rgba(232, 184, 74, 0.08) 10%,
            #f0c84a 20%,
            rgba(232, 184, 74, 0.75) 26%,
            transparent 36%,
            transparent 58%,
            rgba(232, 184, 74, 0.4) 68%,
            transparent 78%
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1.5px;
          animation: profileSpin 12s linear infinite;
        }

        .profile-card__orbit--inner {
          inset: 0.55rem;
          background: conic-gradient(
            from 180deg,
            transparent 0%,
            rgba(232, 184, 74, 0.5) 7%,
            #ffe08a 13%,
            transparent 22%,
            transparent 100%
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
          animation: profileSpinReverse 8s linear infinite;
          opacity: 0.9;
        }

        .profile-card__satellite {
          position: absolute;
          inset: 0.05rem;
          z-index: 2;
          border-radius: 46% / 40%;
          pointer-events: none;
        }
        .profile-card__satellite--a {
          animation: profileSpin 10s linear infinite;
        }
        .profile-card__satellite--b {
          inset: 0.55rem;
          animation: profileSpinReverse 7s linear infinite;
        }
        .profile-card__satellite--c {
          inset: -0.2rem;
          animation: profileSpin 16s linear infinite;
        }

        .profile-card__orbit-dot {
          position: absolute;
          top: 0;
          left: 50%;
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 50%;
          background: #f0c84a;
          transform: translate(-50%, -50%);
          box-shadow:
            0 0 10px rgba(240, 200, 74, 0.95),
            0 0 20px rgba(232, 184, 74, 0.5);
        }
        .profile-card__orbit-dot--sm {
          width: 0.34rem;
          height: 0.34rem;
          opacity: 0.85;
        }
        .profile-card__orbit-dot--xs {
          width: 0.26rem;
          height: 0.26rem;
          opacity: 0.7;
          left: 12%;
          top: 18%;
        }

        .profile-card__hud {
          position: absolute;
          inset: 1.2rem;
          z-index: 4;
          pointer-events: none;
        }

        .profile-card__bracket {
          position: absolute;
          width: 1.45rem;
          height: 1.45rem;
          border-color: var(--accent);
          border-style: solid;
          opacity: 0.9;
          filter: drop-shadow(0 0 6px rgba(232, 184, 74, 0.45));
          animation: profileBracketPulse 3.2s ease-in-out infinite;
        }
        .profile-card__bracket--tl {
          top: 0.4rem;
          left: 0.4rem;
          border-width: 2px 0 0 2px;
        }
        .profile-card__bracket--tr {
          top: 0.4rem;
          right: 0.4rem;
          border-width: 2px 2px 0 0;
          animation-delay: 0.4s;
        }
        .profile-card__bracket--bl {
          bottom: 0.4rem;
          left: 0.4rem;
          border-width: 0 0 2px 2px;
          animation-delay: 0.8s;
        }
        .profile-card__bracket--br {
          bottom: 0.4rem;
          right: 0.4rem;
          border-width: 0 2px 2px 0;
          animation-delay: 1.2s;
        }

        .profile-card__scan {
          position: absolute;
          inset: 1.4rem;
          z-index: 4;
          border-radius: var(--radius-md);
          overflow: hidden;
          pointer-events: none;
        }
        .profile-card__scan::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 26%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(240, 200, 74, 0.07) 38%,
            rgba(240, 200, 74, 0.26) 50%,
            rgba(240, 200, 74, 0.07) 62%,
            transparent 100%
          );
          box-shadow: 0 0 18px rgba(232, 184, 74, 0.2);
          animation: profileScan 4.8s ease-in-out infinite;
        }
        .profile-card__scan::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent 0,
            transparent 3px,
            rgba(232, 184, 74, 0.04) 3px,
            rgba(232, 184, 74, 0.04) 4px
          );
          opacity: 0.65;
          mix-blend-mode: soft-light;
        }

        .profile-card__status {
          position: absolute;
          top: 1.85rem;
          left: 1.95rem;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.28rem 0.58rem;
          border: 1px solid rgba(232, 184, 74, 0.4);
          border-radius: 999px;
          background: rgba(11, 13, 18, 0.78);
          backdrop-filter: blur(8px);
          color: var(--accent);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          pointer-events: none;
          box-shadow: 0 0 16px rgba(232, 184, 74, 0.15);
        }
        .profile-card__status-dot {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background: #f0c84a;
          box-shadow: 0 0 8px rgba(240, 200, 74, 0.95);
          animation: profileStatusBlink 1.8s ease-in-out infinite;
        }

        @keyframes profileFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes profileGlow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes profileSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes profileSpinReverse {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes profileScan {
          0% {
            top: -12%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 84%;
            opacity: 0;
          }
        }
        @keyframes profileBracketPulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes profileStatusBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .profile-card--hero .profile-card__frame,
          .profile-card__glow,
          .profile-card__orbit,
          .profile-card__satellite,
          .profile-card__bracket,
          .profile-card__scan::before,
          .profile-card__status-dot {
            animation: none;
          }
          .profile-card__scan::before {
            display: none;
          }
        }
      `}</style>
    </figure>
  );
}
