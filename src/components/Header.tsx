'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';

function LogoSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 256, 256);

    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(90, 100, 14, 0, Math.PI * 2);
    ctx.arc(166, 100, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 140, 50, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        map={texture}
        roughness={0.05}
        metalness={0.4}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={1}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[100, 400]}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function Logo3D() {
  return (
    <div className="w-10 h-10 relative">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        gl={{ alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <directionalLight position={[-2, -1, -2]} intensity={0.5} />
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
        <LogoSphere />
      </Canvas>
    </div>
  );
}

export default function Header() {
  const { currentView, setView } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6">
      <button
        data-cursor="logo"
        className="hover:scale-110 transition-transform"
      >
        <Logo3D />
      </button>

      {currentView !== 'detail' && (
        <div className="flex items-center gap-8">
          <button
            onClick={() => setView('spiral')}
            data-cursor="view"
            className={`text-sm font-mono tracking-widest uppercase transition-colors ${
              currentView === 'spiral'
                ? 'text-white'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            spiral
          </button>
          <span className="text-white/20 text-sm">/</span>
          <button
            onClick={() => setView('list')}
            data-cursor="view"
            className={`text-sm font-mono tracking-widest uppercase transition-colors ${
              currentView === 'list'
                ? 'text-white'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            list
          </button>
        </div>
      )}

      {currentView !== 'detail' && <MenuButton />}
    </header>
  );
}

function MenuButton() {
  const { setMenuOpen } = useAppStore();
  return (
    <button
      onClick={() => setMenuOpen(true)}
      data-cursor="menu"
      className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-sm font-mono tracking-widest uppercase text-white/60 hover:text-white"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
      menu
    </button>
  );
}
