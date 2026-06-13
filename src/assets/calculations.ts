import * as THREE from "three";

//converts RA/Dec to Coordinates
export function raDectoPosition(ra: number, dec: number, r: number): THREE.Vector3 {
  return new THREE.Vector3(
    r * Math.cos(dec * Math.PI / 180) * Math.cos(ra * Math.PI / 180),
    r * Math.sin(dec * Math.PI / 180),
    r * Math.cos(dec * Math.PI / 180) * Math.sin(ra * Math.PI / 180)
  );
}