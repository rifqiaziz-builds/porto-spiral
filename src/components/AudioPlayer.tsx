'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

const sfxMap: Record<string, string> = {
  spiral: '/spiral.ogg',
  list: '/list.ogg',
};

export default function AudioPlayer() {
  const { isAudioPlaying, currentView, menuOpen, hoveredProject } = useAppStore();
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const prevView = useRef<string>('');
  const prevMenuOpen = useRef(false);
  const prevHovered = useRef<unknown>(null);

  function playSfx(src: string) {
    if (!sfxRef.current) {
      sfxRef.current = new Audio();
      sfxRef.current.volume = 0.4;
    }
    sfxRef.current.src = src;
    sfxRef.current.currentTime = 0;
    sfxRef.current.play().catch(() => {});
  }

  useEffect(() => {
    if (!ambientRef.current) {
      ambientRef.current = new Audio('/ambient.ogg');
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.3;
    }

    if (isAudioPlaying) {
      ambientRef.current.play().catch(() => {});
    } else {
      ambientRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (!isAudioPlaying) return;
    if (currentView === 'detail' || currentView === prevView.current) {
      prevView.current = currentView;
      return;
    }

    prevView.current = currentView;

    const src = sfxMap[currentView];
    if (src) playSfx(src);
  }, [currentView, isAudioPlaying]);

  useEffect(() => {
    if (!isAudioPlaying) return;
    if (menuOpen && !prevMenuOpen.current) playSfx('/click.ogg');
    if (!menuOpen && prevMenuOpen.current) playSfx('/close.ogg');
    prevMenuOpen.current = menuOpen;
  }, [menuOpen, isAudioPlaying]);

  useEffect(() => {
    if (!isAudioPlaying) return;
    if (hoveredProject && hoveredProject !== prevHovered.current) playSfx('/hover.ogg');
    prevHovered.current = hoveredProject;
  }, [hoveredProject, isAudioPlaying]);

  return null;
}
