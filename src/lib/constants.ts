export interface CameraWaypoint {
  position: [number, number, number];
  target: [number, number, number];
  label: string;
}

export interface ExhibitData {
  id: string;
  title: string;
  subtitle: string;
  medium: string;
  year: string;
  description: string;
  details: string[];
  position: [number, number, number];
}

export const COLORS = {
  void: '#050505',
  surface: '#0a0a0a',
  smoke: '#1a1a1a',
  ash: '#888888',
  ashDark: '#2a2a2a',
  bone: '#e8e4de',
  accent: '#c9a96e',
  accentLight: '#dfc596',
  glow: '#f5e6c8',
} as const;

export const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  { position: [0, 2.0, 7.5], target: [0, 1.5, 0], label: 'Entrance' },
  { position: [-0.6, 1.9, 3.2], target: [-2.8, 1.8, 0], label: 'Glass Sculpture' },
  { position: [0.8, 1.7, -2.2], target: [2.9, 1.5, -5.0], label: 'Shader Canvas' },
  { position: [0.2, 1.6, -7.2], target: [-1.9, 1.3, -10.0], label: 'Project Pedestal' },
  { position: [0, 2.0, -11.5], target: [0, 2.0, -16.0], label: 'Particle Void' },
];

export const EXHIBITS: ExhibitData[] = [
  {
    id: 'glass-sculpture',
    title: 'Aura of Transmission',
    subtitle: 'Exhibit 01 — Optical Refraction',
    medium: 'Dielectric Glass & Gold Dispersion',
    year: '2026',
    description:
      'A continuous non-orientable topological form forged from refractive crystalline glass. Features chromatic dispersion, internal anisotropic scattering, and dynamic light bending under high-intensity focused spotlights.',
    details: [
      'Physical transmission index: 1.50 IOR',
      'Continuous double-loop torus knot topology',
      'Real-time chromatic aberration dispersion',
    ],
    position: [-3, 1.8, 0],
  },
  {
    id: 'shader-canvas',
    title: 'Resonance Membrane',
    subtitle: 'Exhibit 02 — Custom GLSL Wavefield',
    medium: 'Procedural Vertex Displacement & Harmonic Field',
    year: '2026',
    description:
      'An interactive mathematical membrane vibrating to dynamic multi-harmonic trigonometric waveforms. Reacts dynamically in real time to viewer cursor proximity with subtle kinetic ripples and metallic contour gradients.',
    details: [
      'Multi-octave procedural GLSL wave interference',
      'Real-time cursor proximity perturbation field',
      'Dynamic tonal gradient interpolation',
    ],
    position: [3, 1.5, -5],
  },
  {
    id: 'project-pedestal',
    title: 'Monolith Core',
    subtitle: 'Exhibit 03 — Preserved Polyhedron',
    medium: 'Polished Titanium Alloy in Monolithic Enclosure',
    year: '2026',
    description:
      'A precision-machined icosahedron suspended in weightlessness within an anti-reflective glass enclosure. Its dual-axis orbital rotation casts specular golden highlights across the gallery floor.',
    details: [
      'High-specular PBR microfacet reflection model',
      'Dual-axis gyroscopic rotational inertia',
      'Ultra-clear museum display case encasement',
    ],
    position: [-2, 1.2, -10],
  },
  {
    id: 'particle-void',
    title: 'Singularity Cloud',
    subtitle: 'Exhibit 04 — Interactive Particle Void',
    medium: '500 Instanced Emissive Vector Points',
    year: '2026',
    description:
      'A swirling cosmic cloud of 500 luminous instanced vector particles governed by spring physics and magnetic cursor repulsion. The particles perpetually breathe, disperse upon interaction, and coalesce back into harmony.',
    details: [
      '500 GPU instanced point matrix transforms',
      'Non-linear magnetic cursor inverse-square repulsion',
      'Harmonic restoring spring oscillation dynamics',
    ],
    position: [0, 2, -16],
  },
];
