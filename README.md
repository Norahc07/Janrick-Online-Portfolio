# Janrick V. Panesa — TTL 1 Online Portfolio

A production-ready academic e-portfolio for **Janrick V. Panesa**, Bachelor of Secondary Education – Major in English (2B), Pambayang Kolehiyo ng Mauban.

Built with React, Vite, React Router, Lucide icons, `react-pdf`, and `vite-plugin-pwa`.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (default: `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/     Shared UI (Navbar, PDFViewer, ErrorBoundary, …)
  pages/          Route pages
  data/           Editable student content & document manifest
  hooks/          Online status, scroll helpers
  styles/         Design tokens and global CSS
  utils/          Document path validation helpers
public/
  assets/         Profile photograph (profile.jpg)
  documents/activities/   PDF activity files
  icons/          PWA icons
scripts/
  generate-activities.js  PDF folder scanner
  generate-icons.mjs      Simple PWA icon generator
```

## Updating portfolio content

Edit these files—components read from them automatically:

| File | Purpose |
|------|---------|
| `src/data/student.js` | Name, about, philosophy, contact, privacy flags |
| `src/data/education.js` | Educational timeline |
| `src/data/skills.js` | Skills and interests |
| `src/data/activities.js` | PDF document manifest |
| `src/data/reflections.js` | Learning reflections |

### Privacy controls

In `src/data/student.js`:

- `contact.showPhone` — default `false`
- `contact.showAddress` — default `false`

Enable only when those details are approved for public display.

### Academic year

Set `academicYear` in `student.js` when confirmed (for example `"2025–2026"`). Leave `null` to hide it.

## PDF activity library

1. Copy PDF files into `public/documents/activities/`.
2. Register them:

```bash
npm run generate:activities
```

The scanner will:

- Detect PDF files only
- Create/update entries in `src/data/activities.js`
- Preserve manually edited titles, descriptions, categories, dates, and featured flags
- Report duplicate or unsupported filenames

3. Optionally refine each entry:

```js
{
  id: "activity-001",
  title: "Learning Activity 3.1",
  description: "Short description of the activity.",
  category: "Academic Activities",
  filename: "Learning Activity_3.1.pdf (midterm).pdf",
  date: "2025-10",
  featured: true
}
```

### Categories

- Academic Activities
- Written Outputs
- Learning Materials
- Teaching Demonstrations
- Projects and Presentations
- Other Accomplishments

### Profile photograph

Place the official photo at:

```text
public/assets/profile.jpg
```

## PWA / offline

The app is installable via `vite-plugin-pwa`.

- Application name: **Janrick V. Panesa | E-Portfolio**
- Short name: **Janrick Portfolio**
- Shell assets are cached for offline use
- Previously opened PDFs may be available offline after caching
- An offline banner appears when the network is unavailable

## Deployment (Vercel)

1. Push the repository to GitHub (or import the folder in Vercel).
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

`vercel.json` already configures:

- SPA fallback routing
- Security headers (`CSP`, `X-Content-Type-Options`, `Referrer-Policy`, frame policy)
- Cache guidance for assets and documents

## Security notes

This is a static frontend. It reduces risk by:

- Keeping all content local (no backend secrets)
- Validating PDF filenames and restricting document URLs to `/documents/activities/`
- Avoiding `dangerouslySetInnerHTML`
- Shipping deployment security headers

It cannot guarantee absolute protection against every client-side attack.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate:activities` | Scan PDFs and update manifest |

## License / ownership

Portfolio content belongs to Janrick V. Panesa for academic use (TTL 1 Online Portfolio).
