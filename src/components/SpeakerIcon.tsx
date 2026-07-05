'use client';

import { useAppStore } from '@/store/useAppStore';

export default function SpeakerIcon() {
  const { isAudioPlaying, toggleAudio } = useAppStore();

  return (
    <button
      onClick={toggleAudio}
      data-cursor="audio"
      className="fixed bottom-8 right-8 z-40 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
    >
      {isAudioPlaying ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 010 14.14" />
          <path d="M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
