'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import SpiralGroup from './SpiralGroup';

export default function SpiralScene() {
  return (
    <div className="fixed inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 28], fov: 35, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          camera.lookAt(0, 0, 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} color="#4040a0" />
          <directionalLight position={[5, 8, 5]} intensity={0.6} color="#ffeedd" />
          <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#4488ff" />
          <pointLight position={[0, 0, 3]} intensity={0.3} color="#ffffff" />
          <SpiralGroup />
          <AdaptiveDpr pixelated />
        </Suspense>
        <Suspense fallback={null}>
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}
