import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import EmptyState from '../components/EmptyState';
import { activities } from '../data/activities';
import { filterAndSortActivities, validateActivity } from '../utils/documentUtils';

export default function Activities() {
  const [query, setQuery] = useState('');

  const validated = useMemo(
    () =>
      activities
        .map((item) => validateActivity(item))
        .filter((result) => result.valid)
        .map((result) => result.activity),
    [],
  );

  const filtered = useMemo(
    () =>
      filterAndSortActivities(validated, {
        query,
        category: 'All',
        sort: 'alpha',
      }),
    [validated, query],
  );

  return (
    <div className="page">
      <div className="container">
        <div className="page-hero" data-reveal>
          <p className="section-label">04 — Accomplished Activities</p>
          <h1 className="serif">Accomplished Activities</h1>
          <p>
            A clean library of registered PDF activities and academic documents.
          </p>
        </div>

        <div className="library-toolbar" data-reveal data-reveal-delay="1">
          <label className="search-field">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search documents</span>
            <input
              type="search"
              placeholder="Search activities"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="library-count muted" aria-live="polite">
            {filtered.length} document{filtered.length === 1 ? '' : 's'}
          </p>
        </div>

        {validated.length === 0 ? (
          <EmptyState
            title="No documents registered yet"
            description="Copy your PDF files into public/documents/activities/, then run npm run generate:activities to register them in the portfolio."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No matching documents"
            description="Try a different search term."
          />
        ) : (
          <div className="library-grid">
            {filtered.map((activity, index) => (
              <div
                key={activity.id}
                data-reveal
                data-reveal-delay={String((index % 4) + 1)}
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .library-toolbar {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .search-field {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          background: var(--bg-secondary);
        }
        .search-field svg {
          color: var(--accent);
          flex-shrink: 0;
        }
        .search-field input {
          width: 100%;
          border: 0;
          background: transparent;
          outline: none;
        }
        .library-count {
          font-size: 0.9rem;
        }
        .library-grid {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .library-toolbar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .search-field {
            flex: 1;
            max-width: 28rem;
          }
          .library-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1100px) {
          .library-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
