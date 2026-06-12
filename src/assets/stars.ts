import * as THREE from "three";
import { stars as starData } from "../data/stars";

function raDectoPosition(ra: number, dec: number, r: number): THREE.Vector3 {
  return new THREE.Vector3(
    r * Math.cos(dec * Math.PI / 180) * Math.cos(ra * Math.PI / 180),
    r * Math.sin(dec * Math.PI / 180),
    r * Math.cos(dec * Math.PI / 180) * Math.sin(ra * Math.PI / 180)
  );
}

function magToBrightness(mag: number) {
  const minMag = -1;
  const maxMag = 5;

  const m = Math.min(Math.max(mag, minMag), maxMag);
  const brightness = Math.pow(2.5, -m);

  const brightMax = Math.pow(2.5, -minMag);
  const brightMin = Math.pow(2.5, -maxMag);

  let t = (brightness - brightMin) / (brightMax - brightMin);
  t = Math.pow(t, 0.35);

  return Math.min(Math.max(t, 0.02), 1.0);
}


const geometry = new THREE.BufferGeometry();
const skyRadius = 100;

const positions: number[] = [];
const brightnessLevels: number[] = [];

for (const star of starData) {
  const pos = raDectoPosition(star.ra, star.dec, skyRadius);

  positions.push(pos.x, pos.y, pos.z);
  brightnessLevels.push(magToBrightness(star.magnitude));
}

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(positions), 3)
);

geometry.setAttribute(
  "brightness",
  new THREE.BufferAttribute(new Float32Array(brightnessLevels), 1)
);

const material = new THREE.ShaderMaterial({
  vertexShader: `
    attribute float brightness;
    varying float vBrightness;

    void main() {
      vBrightness = brightness;

      float b = max(vBrightness, 0.15);
      float size = 5.0 + b * 5.0;

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

export const starField = new THREE.Points(geometry, material);