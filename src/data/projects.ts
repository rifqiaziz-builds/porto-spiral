export interface ProjectData {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  images: string[];
  videoUrl?: string;
}

export const projects: ProjectData[] = [
  {
    id: 1,
    title: 'Project Helix',
    description: 'A 3D interactive experience built with WebGL and spatial audio.',
    thumbnailUrl: 'https://picsum.photos/seed/helix/600/400',
    images: [
      'https://picsum.photos/seed/helix1/1200/800',
      'https://picsum.photos/seed/helix2/1200/800',
    ],
  },
  {
    id: 2,
    title: 'Neural Bloom',
    description: 'Generative art installation using real-time neural network feedback loops.',
    thumbnailUrl: 'https://picsum.photos/seed/bloom/600/400',
    images: [
      'https://picsum.photos/seed/bloom1/1200/800',
      'https://picsum.photos/seed/bloom2/1200/800',
    ],
  },
  {
    id: 3,
    title: 'Prism Suite',
    description: 'Design system and component library for data-rich dashboards.',
    thumbnailUrl: 'https://picsum.photos/seed/prism/600/400',
    images: [
      'https://picsum.photos/seed/prism1/1200/800',
      'https://picsum.photos/seed/prism2/1200/800',
    ],
  },
  {
    id: 4,
    title: 'Void Walker',
    description: 'Cinematic short film blending live-action with real-time VFX.',
    thumbnailUrl: 'https://picsum.photos/seed/void/600/400',
    images: [
      'https://picsum.photos/seed/void1/1200/800',
      'https://picsum.photos/seed/void2/1200/800',
    ],
  },
  {
    id: 5,
    title: 'Echo Drift',
    description: 'Ambient sound visualization tool with reactive particle systems.',
    thumbnailUrl: 'https://picsum.photos/seed/echo/600/400',
    images: [
      'https://picsum.photos/seed/echo1/1200/800',
      'https://picsum.photos/seed/echo2/1200/800',
    ],
  },
  {
    id: 6,
    title: 'Crystal Grid',
    description: 'Isometric puzzle game with voxel-based terrain generation.',
    thumbnailUrl: 'https://picsum.photos/seed/crystal/600/400',
    images: [
      'https://picsum.photos/seed/crystal1/1200/800',
      'https://picsum.photos/seed/crystal2/1200/800',
    ],
  },
  {
    id: 7,
    title: 'Flux Portal',
    description: 'Augmented reality web app for exploring parametric architecture.',
    thumbnailUrl: 'https://picsum.photos/seed/flux/600/400',
    images: [
      'https://picsum.photos/seed/flux1/1200/800',
      'https://picsum.photos/seed/flux2/1200/800',
    ],
  },
  {
    id: 8,
    title: 'Pulse Wave',
    description: 'Music visualization platform with WebAudio-driven shaders.',
    thumbnailUrl: 'https://picsum.photos/seed/pulse/600/400',
    images: [
      'https://picsum.photos/seed/pulse1/1200/800',
      'https://picsum.photos/seed/pulse2/1200/800',
    ],
  },
];
