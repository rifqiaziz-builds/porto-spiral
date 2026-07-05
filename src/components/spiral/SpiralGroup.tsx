'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';
import CurvedCard from './Card';
import { projects } from '@/data/projects';
import type { ProjectData } from '@/data/projects';

// ==========================================
// 🛠️ CONFIGURATION (SETTINGABLE PARAMETERS)
// ==========================================
export const SPIRAL_CONFIG = {
  radius: 8,
  cardWidth: 6,
  aspectRatio: 16 / 9,
  cardsPerLoop: 8,
  yStep: 1.7,
  loopMultiplier: 4,
  // Kita hilangkan autoSpinSpeed karena sekarang rotasi DIKUNCI oleh posisi Scroll
  autoScrollSpeed: 0.2, // Kecepatan turun/scroll otomatis
  dragSensitivity: 0.05, // Sensitivitas saat user menggeser layar
};

function CenterDot() {
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (dotRef.current) {
      dotRef.current.rotation.x += 0.005;
      dotRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={dotRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.15, 1]} />
      <meshPhysicalMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
}

export default function SpiralGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const enterProgress = useRef(0);

  const loopingProjects = useMemo(() => {
    const duplicated: ProjectData[] = [];
    for (let i = 0; i < SPIRAL_CONFIG.loopMultiplier; i++) {
      duplicated.push(...projects);
    }
    return duplicated;
  }, []);

  const totalCards = loopingProjects.length;
  const angleStep = (Math.PI * 2) / SPIRAL_CONFIG.cardsPerLoop;
  const centerIndex = Math.floor(totalCards / 2);

  const hitboxHeight = totalCards * SPIRAL_CONFIG.yStep + 20;
  const loopHeight = projects.length * SPIRAL_CONFIG.yStep;

  // 1. GESTURE DRAG: Semua arah geseran layar akan diubah menjadi scroll vertikal (seperti memutar baut)
  const bindDrag = useDrag(
    ({ delta: [dx, dy], down }) => {
      isDragging.current = down;
      if (groupRef.current) {
        // Menggeser kanan-kiri (dx) ATAU atas-bawah (dy) sama-sama memutar & menscroll spiral
        const dragMovement = (dy - dx) * SPIRAL_CONFIG.dragSensitivity;
        groupRef.current.position.y -= dragMovement;
      }
    }
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // --- ANIMASI MASUK AWAL ---
    if (enterProgress.current < 1) {
      enterProgress.current = Math.min(1, enterProgress.current + delta * 1.2);
      const ease = 1 - Math.pow(1 - enterProgress.current, 3);
      groupRef.current.position.y = 10 - ease * 10;
    }
    // --- AUTO SCROLL (Hanya jalan kalau tidak di-drag) ---
    else if (!isDragging.current) {
      groupRef.current.position.y -= SPIRAL_CONFIG.autoScrollSpeed * delta;
    }

    // --- INFINITE LOOPING BOUNDARY ---
    if (groupRef.current.position.y < -loopHeight) {
      groupRef.current.position.y += loopHeight;
    } else if (groupRef.current.position.y > loopHeight) {
      groupRef.current.position.y -= loopHeight;
    }

    // ==============================================================
    // 🧠 RUMUS MAUT (THE MAGIC SCREW FORMULA)
    // Mengunci rotasi Y sepenuhnya berdasarkan posisi Y saat ini.
    // Ini menjamin kartu yang di tengah (Y=0) selalu menghadap wajah user!
    // ==============================================================
    const currentY = groupRef.current.position.y;
    groupRef.current.rotation.y = - (centerIndex + (currentY / SPIRAL_CONFIG.yStep)) * angleStep;

  });

  return (
    <group ref={groupRef} position={[0, 10, 0]} {...bindDrag()}>
      <CenterDot />

      <mesh>
        <cylinderGeometry
          args={[SPIRAL_CONFIG.radius + 0.5, SPIRAL_CONFIG.radius + 0.5, hitboxHeight, 16]}
        />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {loopingProjects.map((proj, i) => {
        const theta = i * angleStep;
        const yPosition = (centerIndex - i) * SPIRAL_CONFIG.yStep;

        return (
          <group key={`helix-${i}`} position={[0, yPosition, 0]} rotation={[0, theta, 0]}>
            <CurvedCard project={proj} index={i} />
          </group>
        );
      })}
    </group>
  );
}