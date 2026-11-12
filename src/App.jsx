import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingState from './components/LoadingState';
import Button from './components/Button';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useScrollTop } from './hooks/useScrollTop';
import { useScrollReveal } from './hooks/useScrollReveal';

const Home = lazy(() => import('./pages/Home'));
const TeachingPhilosophy = lazy(() => import('./pages/TeachingPhilosophy'));
const Activities = lazy(() => import('./pages/Activities'));
const ActivityViewer = lazy(() => import('./pages/ActivityViewer'));
const Resume = lazy(() => import('./pages/Resume'));
const Purpose = lazy(() => import('./pages/Purpose'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const isOnline = useOnlineStatus();
  const { visible, scrollToTop } = useScrollTop();
  useScrollReveal();

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      {!isOnline ? (
        <div className="offline-banner" role="status">
          You are offline. Previously visited pages and cached documents may still be available.
        </div>
      ) : null}

      <main id="main-content" className="main-content">
        <ScrollToTopOnNavigate />
        <ErrorBoundary>
          <Suspense fallback={<div className="container page"><LoadingState /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/teaching-principles" element={<TeachingPhilosophy />} />
              <Route path="/purpose" element={<Purpose />} />
              <Route path="/accomplished-activities" element={<Activities />} />
              <Route path="/accomplished-activities/:activityId" element={<ActivityViewer />} />
              {/* Legacy redirects */}
              <Route path="/philosophy" element={<Navigate to="/teaching-principles" replace />} />
              <Route path="/activities" element={<Navigate to="/accomplished-activities" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />

      <div className={`scroll-top ${visible ? 'is-visible' : ''}`}>
        <Button variant="icon" onClick={scrollToTop} ariaLabel="Scroll to top">
          <ArrowUp size={18} />
        </Button>
      </div>
    </div>
  );
}
