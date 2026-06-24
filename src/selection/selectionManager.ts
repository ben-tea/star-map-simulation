import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


//returns star index from mouse position
export function getSelectedStarIndex(event: MouseEvent, camera: THREE.Camera, starField: THREE.Points): number | undefined {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersections = raycaster.intersectObject(starField);

    //if no values in intersection, that means there are no intersections
    if (intersections.length === 0) {return undefined;}
    
    let closest = intersections[0];
    for (let i = 1; i < intersections.length; i++){
        if (intersections[i].distanceToRay! < closest.distanceToRay!)
            {closest = intersections[i];}
    }
    return closest.index;
}

import {textbox} from '../ui/starInfo/starInfo';
import {filterMenu} from '../ui/filterMenu/filterMenu';

export function checkOverlap(eventTarget: Node){
          if (textbox.contains(eventTarget)) return true; 
          if (filterMenu.contains(eventTarget)) return true;
}