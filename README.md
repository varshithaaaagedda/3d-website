# LUMEN — Digital 3D Interactive Art Gallery

> An immersive, scroll-driven 3D art gallery experience engineered with React Three Fiber, custom GLSL shaders, procedural physics, and Web Audio API.

---

## 🎨 Masterpiece Exhibits

1. **Aura of Transmission** — Dielectric glass refraction & chromatic dispersion using `MeshTransmissionMaterial` on a double-loop torus knot topology.
2. **Resonance Membrane** — Custom GLSL vertex displacement and fragment coloring reacting dynamically to viewer cursor proximity.
3. **Monolith Core** — Precision-machined titanium icosahedron with dual-axis gyroscopic rotation encased in high-transmission museum glass.
4. **Singularity Cloud** — 500 GPU-instanced emissive vector particles governed by harmonic spring physics and cursor magnetic repulsion.

---

## ✨ Engineering & Visual Features

- **Atmospheric Studio Lighting**: 5-point studio spotlight rig with cast shadows, soft penumbra, and HDRI reflections.
- **Reflective Ground**: Blurred real-time floor mirror using `MeshReflectorMaterial` anchored with `ContactShadows`.
- **Atmospheric Dust**: 240+ golden ambient sparkles floating in space.
- **Cinematic Scrollytelling**: Rail camera path with Hermite smoothstep easing and natural mouse parallax inertia.
- **Spatial Audio Synthesizer**: Web Audio API ambient drone and procedural UI hover/click sweep feedback.
- **Glassmorphism HUD**: Floating controls, interactive section counter, vertical scroll navigation rail, and exhibit dossier modals.
- **Post-Processing Pipeline**: Selective emissive bloom, chromatic aberration lens fringe, analog film grain, and dark vignette.

---

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **3D & Shaders**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, custom GLSL
- **Motion & Audio**: Lenis Smooth Scroll, GSAP, Web Audio API

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

---

## 🏆 Hackathon Entry

Built for the **3D Websites Hackathon**.