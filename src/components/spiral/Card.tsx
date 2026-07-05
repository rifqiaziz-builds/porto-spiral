'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '@/store/useAppStore';
import type { ProjectData } from '@/data/projects';
import * as THREE from 'three';
import { SPIRAL_CONFIG } from './SpiralGroup';

interface CurvedCardProps {
  project: ProjectData;
  index: number;
}


const fallbackCache = new Map<number, THREE.CanvasTexture>();
const imageCache = new Map<string, THREE.Texture>();

// Memori efisien: Kita buat satu Vector3 global untuk semua kartu agar tidak membebani RAM
const worldPos = new THREE.Vector3();

const W = 256;
const H = 170;
const RADIUS = 8;

function roundClip(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(RADIUS, 0);
  ctx.lineTo(W - RADIUS, 0);
  ctx.quadraticCurveTo(W, 0, W, RADIUS);
  ctx.lineTo(W, H - RADIUS);
  ctx.quadraticCurveTo(W, H, W - RADIUS, H);
  ctx.lineTo(RADIUS, H);
  ctx.quadraticCurveTo(0, H, 0, H - RADIUS);
  ctx.lineTo(0, RADIUS);
  ctx.quadraticCurveTo(0, 0, RADIUS, 0);
  ctx.closePath();
  ctx.clip();
}

function getFallbackTexture(index: number) {
  if (fallbackCache.has(index)) return fallbackCache.get(index)!;

  const palettes = [
    ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'],
    ['#845ec2', '#d65db1', '#ff6f91', '#ff9671'],
    ['#0081cf', '#00b8a9', '#f6416c', '#ffde7d'],
    ['#0c0c1d', '#1a1a3e', '#2d2d6b', '#4a4a9e'],
    ['#ff5e7d', '#ffb347', '#4ecdc4', '#45b7d1'],
    ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5'],
    ['#2c3e50', '#e74c3c', '#ecf0f1', '#3498db'],
    ['#fdcb6e', '#e17055', '#00cec9', '#6c5ce7'],
  ];

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const colors = palettes[index % palettes.length];

  roundClip(ctx);

  const gradient = ctx.createLinearGradient(0, 0, W, H);
  colors.forEach((c, i) => gradient.addColorStop(i / (colors.length - 1), c));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('●', W / 2, H / 2);

  const tex = new THREE.CanvasTexture(canvas);
  fallbackCache.set(index, tex);
  return tex;
}

function makeCardTexture(img: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  roundClip(ctx);
  ctx.drawImage(img, 0, 0, W, H);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function loadImage(url: string): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    if (imageCache.has(url)) return resolve(imageCache.get(url)!);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const tex = makeCardTexture(img);
      imageCache.set(url, tex);
      resolve(tex);
    };
    img.src = url;
  });
}

export default function CurvedCard({ project, index }: CurvedCardProps) {
  // Ref baru untuk efek kemiringan (Dynamic Skew)
  const innerGroupRef = useRef<THREE.Group>(null);

  const meshRef = useRef<THREE.Mesh>(null);
  const overlayRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [thumbnail, setThumbnail] = useState<THREE.Texture | null>(null);
  const { setActiveProject, setView, setHoveredProject } = useAppStore();

  useEffect(() => {
    loadImage(project.thumbnailUrl).then(setThumbnail);
  }, [project.thumbnailUrl]);

  const fallback = getFallbackTexture(index);

  const height = SPIRAL_CONFIG.cardWidth / SPIRAL_CONFIG.aspectRatio;
  const cardWidthAngle = SPIRAL_CONFIG.cardWidth / SPIRAL_CONFIG.radius;

  useFrame(() => {
    // 1. DYNAMIC SKEW EFFECT
    if (innerGroupRef.current) {
      innerGroupRef.current.getWorldPosition(worldPos);

      const skewFactorZ = -0.025; // Roll tilt (ke samping)
      const skewFactorX = 0.015;  // Pitch tilt (atas/bawah)

      let rotZ = worldPos.y * skewFactorZ;
      let rotX = worldPos.y * skewFactorX;

      // KOREKSI UNTUK BAGIAN BAWAH (Mencegah arah terbalik)
      if (worldPos.y < 0) {
        // Memaksa nilai rotasi Z searah dengan bagian atas
        rotZ = Math.abs(worldPos.y) * skewFactorZ;

        // Memaksa nilai rotasi X searah dengan bagian atas
        // (Jika X terasa aneh setelah ini, ubah kembali rotX di bawah ini menjadi 'rotX = worldPos.y * skewFactorX;')
        rotX = Math.abs(worldPos.y) * skewFactorX;
      }

      innerGroupRef.current.rotation.z = rotZ;
      innerGroupRef.current.rotation.x = rotX;
    }

    // 2. HOVER ANIMATION (Mengecil)
    if (meshRef.current) {
      const target = hovered ? 0.94 : 1;
      meshRef.current.scale.x += (target - meshRef.current.scale.x) * 0.08;
      meshRef.current.scale.y += (target - meshRef.current.scale.y) * 0.08;
      meshRef.current.scale.z += (target - meshRef.current.scale.z) * 0.08;
    }

    // 3. OVERLAY OPACITY ANIMATION
    if (overlayRef.current) {
      const mat = overlayRef.current.material as THREE.MeshBasicMaterial;
      const target = hovered ? 0.55 : 0;
      mat.opacity += (target - mat.opacity) * 0.08;
    }
  });
  const handleClick = () => {
    setActiveProject(project);
    setView('detail');
  };

  const currentMap = thumbnail || fallback;

  return (
    // innerGroupRef membungkus kartu untuk mengatur kemiringan,
    // sementara animasi hover tetap aman di dalam meshRef
    <group ref={innerGroupRef}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          setHovered(true);
          setHoveredProject(project);
        }}
        onPointerLeave={() => {
          setHovered(false);
          setHoveredProject(null);
        }}
        onClick={handleClick}
      >
        <cylinderGeometry
          args={[
            SPIRAL_CONFIG.radius,
            SPIRAL_CONFIG.radius,
            height,
            24, 1, true,
            -cardWidthAngle / 2,
            cardWidthAngle,
          ]}
        />
        <meshPhysicalMaterial
          map={currentMap}
          transparent={true}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          emissive={new THREE.Color('#ffffff')}
          emissiveIntensity={hovered ? 0.15 : 0.03}
          emissiveMap={currentMap}
          toneMapped={false}
        />
        <mesh ref={overlayRef}>
          <cylinderGeometry
            args={[
              SPIRAL_CONFIG.radius + 0.01,
              SPIRAL_CONFIG.radius + 0.01,
              height + 0.01,
              24, 1, true,
              -cardWidthAngle / 2,
              cardWidthAngle,
            ]}
          />
          <meshBasicMaterial
            color="black"
            transparent={true}
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>
    </group>
  );
}