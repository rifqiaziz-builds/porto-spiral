'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useMobileDetect } from '@/hooks/useMobileDetect';
import LandingGate from '@/components/LandingGate';
import AudioPlayer from '@/components/AudioPlayer';
import SpiralScene from '@/components/spiral/SpiralScene';
import ListView from '@/components/list/ListView';
import ProjectDetail from '@/components/detail/ProjectDetail';

export default function Home() {
  const { hasEntered, currentView, setView, activeProject, setActiveProject, previousView } = useAppStore();
  const isMobile = useMobileDetect();

  const handleCloseDetail = () => {
    setActiveProject(null);
    setView(previousView);
  };

  useEffect(() => {
    if (isMobile && currentView === 'spiral') {
      setView('list');
    }
  }, [isMobile, currentView, setView]);

  if (!hasEntered) {
    return (
      <AnimatePresence mode="wait">
        <LandingGate />
      </AnimatePresence>
    );
  }

  return (
    <>
      <AudioPlayer />
      {currentView === 'spiral' && !isMobile && <SpiralScene />}
      <AnimatePresence mode="wait">
        {currentView === 'list' && <ListView key="list" />}
      </AnimatePresence>
      <ProjectDetail />

      {currentView === 'detail' && activeProject && (
        <div className="fixed inset-0 z-50">
          <button
            onClick={handleCloseDetail}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/60 rounded-full text-white transition-all border border-white/60"
            data-cursor="close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={handleCloseDetail}
            className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/30 hover:bg-white/60 rounded-full text-sm text-white font-mono tracking-widest uppercase transition-all border border-white/60"
            data-cursor="back"
          >
            back to home
          </button>
        </div>
      )}
    </>
  );
}
