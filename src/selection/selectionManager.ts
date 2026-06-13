import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//how far from vector before clicks register
raycaster.params.Points.threshold = 2;

//returns star index from mouse position
export function getSelectedStarIndex(
    event: MouseEvent,
    camera: THREE.Camera,
    starField: THREE.Points
): number | undefined {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersections = raycaster.intersectObject(starField);

    if (intersections.length === 0) {return undefined;}

    return intersections[0].index;
}