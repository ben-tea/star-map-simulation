import * as THREE from "three";
import { stars as starData } from "../../data/hygLoader.ts";
import { material} from "./starShaders"
import { raDectoPosition } from "../../assets/calculations";

//uniform variable functions
export function selectStarUniform(index: number){
  material.uniforms.selectedIndex.value = index;
}
export function hoveredStarUniform(index: number){
  material.uniforms.hoveredIndex.value = index;
}
export function fovSizeUniform(fov: number){
  material.uniforms.fovMultiplier.value = 1 + 0.3 * ((75/fov) - 1)
}
export function timeUniform(time: number){
  material.uniforms.time.value = time;
}

function magToBrightness(mag: number) {
  const minMag = -1;
  const maxMag = 5;

  const m = Math.min(Math.max(mag, minMag), maxMag);
  const brightness = Math.pow(2.5, -m);

  const brightMax = Math.pow(2.5, -minMag);
  const brightMin = Math.pow(2.5, -maxMag);

  let t = (brightness - brightMin) / (brightMax - brightMin);
  t = Math.pow(t, 0.18);

  return Math.min(Math.max(t, 0.02), 1.0);
}

function spectralToColor(char: string, spectralClass: number[]){ 
  if (char == 'O')spectralClass.push(0.27, 0.60, 1);
  else if(char == 'B') spectralClass.push(0.61, 0.89, 1);
  else if(char == 'A') spectralClass.push(0.80, 0.95, 1);
  else if(char == 'F') spectralClass.push(1, 1, 1);
  else if(char == 'G') spectralClass.push(0.98, 1, 0.68);
  else if(char == 'K') spectralClass.push(1, 0.81, 0.21);
  else spectralClass.push(1, 0.29, 0.22);
  }


const geometry = new THREE.BufferGeometry();
const skyRadius = 100;

const positions: number[] = [];
const brightnessLevels: number[] = [];
const starIndex: number[] = [];
const spectralClass: number[] = [];

//takes all star data and adds to geometry
for (let i = 0; i < starData.length; i++) {
  const star = starData[i]
  const pos = raDectoPosition(star.ra, star.dec, skyRadius);

  positions.push(pos.x, pos.y, pos.z);
  brightnessLevels.push(magToBrightness(star.magnitude));
  starIndex.push(i);
  spectralToColor(star.spectral[0], spectralClass);
  
}


//shader attributes
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

geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(spectralClass), 3)
)

export const starField = new THREE.Points(geometry, material);