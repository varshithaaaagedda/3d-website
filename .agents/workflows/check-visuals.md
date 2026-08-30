---
description: Uses chrome-devtools-mcp to inspect your live canvas, take visual snapshots, check frame performance, and ensure no WebGL errors exist.
---

# Visual Verification Workflow

1. Trigger `chrome-devtools-mcp` to open `http://localhost:5173`.

2. Capture a high-resolution screenshot of the rendered 3D scene viewport.

3. Inspect browser console logs to verify there are zero WebGL context errors, missing texture assets, or frame drop warnings.

4. Check that studio lighting, ambient reflections, and smooth motion are working properly on screen.