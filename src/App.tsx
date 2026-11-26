import { useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEOManager from './components/SEOManager';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ease } from './components/ui/motion';
import Home from './screens/Home';
import ProjectPage from './screens/Project';

/** New pages start at the top; links like /#work scroll to their section (after the page fades in, if it changed). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const pageChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!hash) {
      if (pageChanged) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), pageChanged ? 520 : 0);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="bg-gradient-brand fixed inset-x-0 top-0 z-[60] h-[2px] origin-left" style={{ scaleX }} />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.45, ease }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
        <ScrollManager />
        <ScrollProgress />
        <SEOManager />
        <Navbar />
        <main className="min-w-0 flex-1">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
