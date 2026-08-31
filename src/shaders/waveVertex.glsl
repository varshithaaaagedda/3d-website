uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Proximity to mouse in UV coordinates
  float distToMouse = distance(uv, uMouse);
  float mouseWave = sin(distToMouse * 16.0 - uTime * 4.0) * 0.12 * smoothstep(0.45, 0.0, distToMouse);
  
  // Harmonic waves
  float wave1 = sin(pos.x * 2.8 + uTime * 1.0) * 0.09;
  float wave2 = cos(pos.y * 2.2 + uTime * 0.8) * 0.07;
  float wave3 = sin((pos.x + pos.y) * 1.8 + uTime * 1.4) * 0.05;
  
  pos.z += wave1 + wave2 + wave3 + mouseWave;
  vElevation = pos.z;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
