'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function AudioPlayer() {
  const { isAudioPlaying } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://cdn.pixabay.com/download/audio/2022/11/22/audio_4b1e35027b.mp3'
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (isAudioPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  return null;
}
