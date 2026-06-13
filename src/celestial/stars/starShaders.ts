import * as THREE from "three";

export const material = new THREE.ShaderMaterial({
  uniforms: {
    selectedIndex: {value : -1}
  },
  vertexShader: `
    attribute float starIndex;
    uniform float selectedIndex;
    attribute float brightness;
    varying float vBrightness;

    void main() {
      vBrightness = brightness;

      float b = max(vBrightness, 0.15);
      float size = 5.0 + b * 5.0;

      if (abs(starIndex - selectedIndex) < 0.1){ size = size * 2.0; }

      gl_PointSize = size;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

      
    }
  `,
  fragmentShader: `
    varying float vBrightness;

    void main() {
      vec2 uv = gl_PointCoord - vec2(0.5);
      float dist = length(uv);
      float falloff = 1.0 - 2.0 * dist;

      if (dist > 0.5) discard;

      gl_FragColor = vec4(
        vBrightness * falloff + 0.2,
        vBrightness * falloff + 0.2,
        vBrightness * falloff + 0.2,
        1.0
      );
    }
  `
});
