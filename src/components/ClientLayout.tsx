'use client';

import { useAppStore } from '@/store/useAppStore';
import AudioPlayer from '@/components/AudioPlayer';
import GridBackground from '@/components/GridBackground';
import Header from '@/components/Header';
import RotatingText from '@/components/RotatingText';
import MenuOverlay from '@/components/MenuOverlay';
import CustomCursor from '@/components/CustomCursor';
import SpeakerIcon from '@/components/SpeakerIcon';
import SpiralHoverUI from '@/components/SpiralHoverUI';

export default function ClientLayout() {
  const { hasEntered, currentView } = useAppStore();

  if (!hasEntered) return <CustomCursor />;

  return (
    <>
      <AudioPlayer />
      <GridBackground />
      <Header />
      {currentView !== 'detail' && <RotatingText />}
      {currentView !== 'detail' && <SpeakerIcon />}
      <SpiralHoverUI />
      <MenuOverlay />
      <CustomCursor />
    </>
  );
}
