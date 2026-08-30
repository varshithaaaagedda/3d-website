---
description: Initializes a clean Vite + React + TypeScript app, installs R3F and GSAP dependencies, configures starter boilerplate, and verifies the local dev server.
---

# Initialize 3D React Three Fiber Workspace

1. Execute terminal command to create app shell:
   `npm create vite@latest . -- --template react-ts --force`

2. Install 3D rendering and motion dependencies:
   `npm install @react-three/fiber @react-three/drei three gsap lucide-react`
   `npm install -D @types/three`

3. Replace `src/App.tsx` with a responsive full-screen `<Canvas>` container configured with studio ambient/directional lighting, an OrbitControls component, and a basic floating mesh.

4. Start the development server using `npm run dev` and confirm the local preview URL is active without console errors.