import { create } from 'zustand';
import type { ProjectData } from '@/data/projects';

export type ViewState = 'spiral' | 'list' | 'detail';

interface AppState {
  currentView: ViewState;
  previousView: ViewState;
  lastNonDetailView: ViewState;
  setView: (view: ViewState) => void;
  activeProject: ProjectData | null;
  setActiveProject: (project: ProjectData | null) => void;
  hoveredProject: ProjectData | null;
  setHoveredProject: (project: ProjectData | null) => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  hasEntered: boolean;
  setHasEntered: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'spiral',
  previousView: 'spiral',
  lastNonDetailView: 'spiral',
  setView: (view) =>
    set((state) => ({
      previousView: state.currentView,
      currentView: view,
      lastNonDetailView: view !== 'detail' ? view : state.lastNonDetailView,
    })),
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  hoveredProject: null,
  setHoveredProject: (project) => set({ hoveredProject: project }),
  isAudioPlaying: false,
  toggleAudio: () => set((state) => ({ isAudioPlaying: !state.isAudioPlaying })),
  hasEntered: false,
  setHasEntered: (v) => set({ hasEntered: v }),
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
}));
