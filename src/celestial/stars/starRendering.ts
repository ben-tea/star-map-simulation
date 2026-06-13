import * as THREE from "three";
import { stars as starData } from "../../data/hygLoader.ts";
import { material} from "./starShaders"
import { raDectoPosition } from "../../assets/calculations";

export function selectStar(index: number){
  material.uniforms.selectedIndex.value = index;
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
const starIndex: number[] = [];

//takes all star data and adds to geometry
for (let i = 0; i < starData.length; i++) {
  const star = starData[i]
  const pos = raDectoPosition(star.ra, star.dec, skyRadius);

  positions.push(pos.x, pos.y, pos.z);
  brightnessLevels.push(magToBrightness(star.magnitude));
  starIndex.push(i);
}

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(positions), 3)
);

geometry.setAttribute(
  "brightness",
  new THREE.BufferAttribute(new Float32Array(brightnessLevels), 1)
);

geometry.setAttribute(
  "starIndex",
  new THREE.BufferAttribute(new Float32Array(starIndex), 1)
)

export const starField = new THREE.Points(geometry, material);