#!/usr/bin/env node
/**
 * Scans public/documents/activities/ for PDF files and updates src/data/activities.js
 * Preserves manually edited titles, descriptions, categories, featured flags, and dates.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const activitiesDir = path.join(root, 'public', 'documents', 'activities');
const outputFile = path.join(root, 'src', 'data', 'activities.js');

const PDF_EXT = '.pdf';

function sanitizeFilename(name) {
  if (typeof name !== 'string') return null;
  const cleaned = name.replace(/\\/g, '/').split('/').pop().trim();
  if (!cleaned || cleaned.includes('..') || cleaned.startsWith('.')) return null;
  if (!cleaned.toLowerCase().endsWith(PDF_EXT)) return null;
  if (!/^[a-zA-Z0-9._()&\-\s[\]]+\.pdf$/i.test(cleaned)) return null;
  return cleaned;
}

function titleFromFilename(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/\.pdf\b/gi, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugify(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function parseExistingManifest(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/export const activities\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) return [];

  try {
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${match[1]});`)();
  } catch (error) {
    console.warn('Could not parse existing activities.js; regenerating from scratch.');
    console.warn(error.message);
    return [];
  }
}

function ensureDirectory() {
  if (!fs.existsSync(activitiesDir)) {
    fs.mkdirSync(activitiesDir, { recursive: true });
    console.log(`Created missing directory: ${activitiesDir}`);
  }
}

function main() {
  ensureDirectory();

  const entries = fs.readdirSync(activitiesDir, { withFileTypes: true });
  const seen = new Map();
  const pdfFiles = [];
  const ignored = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const name = entry.name;

    if (!name.toLowerCase().endsWith(PDF_EXT)) {
      ignored.push(name);
      continue;
    }

    const safe = sanitizeFilename(name);
    if (!safe) {
      console.error(`Rejected unsafe filename: ${name}`);
      continue;
    }

    const key = safe.toLowerCase();
    if (seen.has(key)) {
      console.error(`Duplicate filename detected: ${safe}`);
      continue;
    }
    seen.set(key, true);

    const fullPath = path.join(activitiesDir, safe);
    const stats = fs.statSync(fullPath);
    pdfFiles.push({
      filename: safe,
      fileSize: stats.size,
      mtime: stats.mtime.toISOString(),
    });
  }

  const existing = parseExistingManifest(outputFile);
  const existingByFilename = new Map(
    existing.map((item) => [String(item.filename || '').toLowerCase(), item]),
  );

  const next = pdfFiles
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map((file, index) => {
      const prev = existingByFilename.get(file.filename.toLowerCase());
      const id = prev?.id || `activity-${String(index + 1).padStart(3, '0')}-${slugify(file.filename)}`;

      return {
        id,
        title: prev?.title || titleFromFilename(file.filename),
        description:
          prev?.description ||
          'Academic activity document. Update this description in src/data/activities.js.',
        category: prev?.category || 'Academic Activities',
        filename: file.filename,
        date: prev?.date ?? null,
        featured: prev?.featured ?? false,
        fileSize: file.fileSize,
      };
    });

  const content = `/**
 * Activity document manifest.
 * Generated/updated by: npm run generate:activities
 *
 * Manual edits to title, description, category, date, and featured are preserved
 * on subsequent scans (matched by filename).
 *
 * Place PDF files in: public/documents/activities/
 */

export const activities = ${JSON.stringify(next, null, 2)};

export const activityCategories = [
  'Academic Activities',
  'Written Outputs',
  'Learning Materials',
  'Teaching Demonstrations',
  'Projects and Presentations',
  'Other Accomplishments',
];
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, content, 'utf8');

  console.log(`Found ${pdfFiles.length} PDF file(s).`);
  if (ignored.length) {
    console.log(`Ignored ${ignored.length} non-PDF file(s): ${ignored.join(', ')}`);
  }
  console.log(`Updated ${path.relative(root, outputFile)}`);
}

try {
  main();
} catch (error) {
  console.error('generate-activities failed:', error.message);
  process.exit(1);
}
