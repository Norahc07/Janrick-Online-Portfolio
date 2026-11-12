const ACTIVITIES_BASE = '/documents/activities/';
const ALLOWED_EXTENSION = '.pdf';

/**
 * Sanitize a filename: strip path segments and reject traversal.
 */
export function sanitizeFilename(filename) {
  if (typeof filename !== 'string') return null;

  const cleaned = filename
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    .trim();

  if (!cleaned) return null;
  if (cleaned.includes('..')) return null;
  if (cleaned.startsWith('.')) return null;
  if (!cleaned.toLowerCase().endsWith(ALLOWED_EXTENSION)) return null;
  if (!/^[a-zA-Z0-9._()&\-\s[\]]+\.pdf$/i.test(cleaned)) return null;

  return cleaned;
}

/**
 * Build a safe local PDF URL from a registered filename only.
 */
export function getDocumentUrl(filename) {
  const safe = sanitizeFilename(filename);
  if (!safe) return null;
  // Encode each path segment safely while preserving a usable local asset URL.
  return `${ACTIVITIES_BASE}${encodeURIComponent(safe)}`;
}

/**
 * Validate activity metadata used by the library and viewer.
 */
export function validateActivity(activity) {
  if (!activity || typeof activity !== 'object') {
    return { valid: false, error: 'Invalid activity entry.' };
  }

  if (!activity.id || typeof activity.id !== 'string') {
    return { valid: false, error: 'Missing activity id.' };
  }

  if (!activity.title || typeof activity.title !== 'string') {
    return { valid: false, error: 'Missing activity title.' };
  }

  const safeName = sanitizeFilename(activity.filename);
  if (!safeName) {
    return { valid: false, error: 'Invalid or unsafe PDF filename.' };
  }

  const url = getDocumentUrl(safeName);
  if (!url || !url.startsWith(ACTIVITIES_BASE)) {
    return { valid: false, error: 'Document path is not allowed.' };
  }

  return {
    valid: true,
    activity: {
      ...activity,
      filename: safeName,
      url,
      category: activity.category || 'Other Accomplishments',
      description: activity.description || '',
      date: activity.date || null,
      featured: Boolean(activity.featured),
      fileSize: activity.fileSize || null,
    },
  };
}

export function formatFileSize(bytes) {
  if (bytes == null || Number.isNaN(Number(bytes))) return null;
  const value = Number(bytes);
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export function titleFromFilename(filename) {
  const safe = sanitizeFilename(filename);
  if (!safe) return 'Untitled Document';

  return safe
    .replace(/\.pdf$/i, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function filterAndSortActivities(activities, { query, category, sort }) {
  let result = activities.filter((item) => {
    const q = (query || '').trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q);

    const matchesCategory =
      !category || category === 'All' || item.category === category;

    return matchesQuery && matchesCategory;
  });

  result = [...result].sort((a, b) => {
    if (sort === 'oldest') {
      return String(a.date || '').localeCompare(String(b.date || '')) ||
        a.title.localeCompare(b.title);
    }
    if (sort === 'alpha') {
      return a.title.localeCompare(b.title);
    }
    // newest (default)
    return String(b.date || '').localeCompare(String(a.date || '')) ||
      a.title.localeCompare(b.title);
  });

  return result;
}

export const ACTIVITY_CATEGORIES = [
  'All',
  'Academic Activities',
  'Written Outputs',
  'Learning Materials',
  'Teaching Demonstrations',
  'Projects and Presentations',
  'Other Accomplishments',
];
