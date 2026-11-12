import { Inbox } from 'lucide-react';

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Content will appear once it has been added.',
  icon: Icon = Inbox,
  children,
}) {
  return (
    <div className="empty-state">
      <Icon className="empty-state__icon" aria-hidden="true" />
      <h3 className="serif" style={{ marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p className="muted" style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {description}
      </p>
      {children ? <div style={{ marginTop: '1.25rem' }}>{children}</div> : null}
    </div>
  );
}
