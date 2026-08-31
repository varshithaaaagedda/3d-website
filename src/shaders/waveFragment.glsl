uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
  // Color ramps: Deep luxury void black to warm molten gold
  vec3 colorLow  = vec3(0.02, 0.02, 0.035);
  vec3 colorHigh = vec3(0.788, 0.663, 0.431); // #c9a96e
  vec3 colorGlow = vec3(0.96, 0.90, 0.78);   // #f5e6c8
  
  float mixFactor = smoothstep(-0.15, 0.18, vElevation);
  vec3 color = mix(colorLow, colorHigh, mixFactor);
  
  // Highlight peaks with warm emissive glow
  float peakFactor = smoothstep(0.12, 0.22, vElevation);
  color = mix(color, colorGlow, peakFactor * 0.7);
  
  // Subtle mathematical wireframe grid lines
  float gridX = smoothstep(0.47, 0.5, abs(fract(vUv.x * 24.0) - 0.5));
  float gridY = smoothstep(0.47, 0.5, abs(fract(vUv.y * 18.0) - 0.5));
  color += vec3(0.04, 0.035, 0.02) * max(gridX, gridY);
  
  gl_FragColor = vec4(color, 1.0);
}
