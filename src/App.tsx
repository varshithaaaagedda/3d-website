import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Lenis from 'lenis';
import { Scene } from './canvas/Scene';
import { HUD } from './ui/HUD';
import { Loader } from './ui/Loader';
import { AudioProvider } from './audio/AudioContext';
import { EXHIBITS, ExhibitData } from './lib/constants';

export function App() {
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitData | null>(null);
  const [domScrollProgress, setDomScrollProgress] = useState(0);

  // Initialize Lenis smooth inertia scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setDomScrollProgress(Math.min(Math.max(window.scrollY / totalHeight, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSelectExhibit = useCallback((id: string) => {
    const found = EXHIBITS.find((e) => e.id === id);
    if (found) {
      setSelectedExhibit(found);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedExhibit(null);
  }, []);

  return (
    <AudioProvider>
      <div className="relative w-full min-h-screen bg-[#050505] text-[#e8e4de] overflow-x-hidden select-none">
        {/* Cinematic Loading Overlay */}
        <Loader />

        {/* 3D WebGL Canvas Layer */}
        <div className="fixed inset-0 w-screen h-screen z-0">
          <Canvas
            shadows
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
              powerPreference: 'high-performance',
            }}
            camera={{ fov: 55, near: 0.1, far: 200, position: [0, 2, 12] }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
            onCreated={({ gl }) => {
              gl.setClearColor('#050505');
            }}
          >
            <Suspense fallback={null}>
              <Scene onSelectExhibit={handleSelectExhibit} />
            </Suspense>
          </Canvas>
        </div>

        {/* 2D Glassmorphism HUD Overlay */}
        <HUD
          scrollProgress={domScrollProgress}
          selectedExhibit={selectedExhibit}
          onCloseModal={handleCloseModal}
        />

        {/* Scrollytelling Virtual Timeline Rails (600vh total height) */}
        <main className="relative z-10 pointer-events-none">
          {/* Section 0: Entrance */}
          <section id="section-0" className="h-screen flex items-end px-8 sm:px-16 pb-20">
            <div className="max-w-lg space-y-3 opacity-90 transition-opacity duration-500">
              <span className="font-body text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase">
                Curated Exhibition
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#e8e4de] font-normal leading-tight">
                LUMEN
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#888888] leading-relaxed">
                Step into a monochromatic sanctuary of light, physics, and procedural geometry.
                Scroll slowly to glide through the corridor.
              </p>
            </div>
          </section>

          {/* Section 1: Glass Sculpture */}
          <section id="section-1" className="h-screen flex items-center px-8 sm:px-16">
            <div className="max-w-sm space-y-2 opacity-80">
              <span className="font-body text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase">
                01 / Transmission
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#e8e4de]">
                Aura of Transmission
              </h3>
              <p className="font-body text-xs text-[#888888] leading-relaxed">
                Optical dispersion and chromatic refraction across a double-loop torus knot.
              </p>
            </div>
          </section>

          {/* Section 2: Shader Canvas */}
          <section id="section-2" className="h-screen flex items-center justify-end px-8 sm:px-16 text-right">
            <div className="max-w-sm space-y-2 opacity-80 ml-auto">
              <span className="font-body text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase">
                02 / Procedural
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#e8e4de]">
                Resonance Membrane
              </h3>
              <p className="font-body text-xs text-[#888888] leading-relaxed">
                Mathematical waves oscillating in GLSL space. Move your cursor to create kinetic ripples.
              </p>
            </div>
          </section>

          {/* Section 3: Project Pedestal */}
          <section id="section-3" className="h-screen flex items-center px-8 sm:px-16">
            <div className="max-w-sm space-y-2 opacity-80">
              <span className="font-body text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase">
                03 / Specular
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#e8e4de]">
                Monolith Core
              </h3>
              <p className="font-body text-xs text-[#888888] leading-relaxed">
                A gyroscopic titanium icosahedron encased in weightless museum glass.
              </p>
            </div>
          </section>

          {/* Section 4: Particle Void */}
          <section id="section-4" className="h-screen flex items-center justify-center text-center px-8">
            <div className="max-w-md space-y-2 opacity-80">
              <span className="font-body text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase">
                04 / Singularity
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#e8e4de]">
                Singularity Cloud
              </h3>
              <p className="font-body text-xs text-[#888888] leading-relaxed">
                500 GPU instanced points governed by magnetic cursor repulsion.
              </p>
            </div>
          </section>

          {/* Section 5: Epilogue / Pad */}
          <section id="section-5" className="h-[60vh] flex flex-col items-center justify-center text-center px-8 pb-16">
            <div className="space-y-3 opacity-60">
              <p className="font-display text-lg text-[#e8e4de]">LUMEN Gallery</p>
              <p className="font-body text-[10px] tracking-[0.3em] text-[#888888] uppercase">
                Engineered with React Three Fiber, GLSL Shaders & Web Audio API
              </p>
            </div>
          </section>
        </main>
      </div>
    </AudioProvider>
  );
}

export default App;
