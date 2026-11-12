import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="page">
      <div className="container" style={{ textAlign: 'center', paddingBlock: '4rem' }}>
        <p className="section-label" style={{ justifyContent: 'center' }}>
          404
        </p>
        <h1 className="serif" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
          Page not found
        </h1>
        <p className="muted" style={{ marginBottom: '1.75rem' }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button to="/" variant="primary">
            Return home
          </Button>
          <Button to="/accomplished-activities" variant="secondary">
            Accomplished Activities
          </Button>
        </div>
      </div>
    </div>
  );
}
