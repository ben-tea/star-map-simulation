import "./style.css"
import * as THREE from "three";
import { scene, camera, renderer, controls } from "./assets/scene";
import { starField, material } from "./assets/stars";

scene.add(starField);
let isDragging = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
raycaster.params.Points.threshold = 2;

//doesnt count dragging as clicking
controls.addEventListener("start", () => {
  isDragging = false;
});

controls.addEventListener("change", () => {
  isDragging = true;
});

//checks if clicks star
window.addEventListener("click", (event) => {
  if (isDragging) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersection = raycaster.intersectObject(starField);

  if (intersection.length > 0){
    material.uniforms.selectedIndex.value = intersection[0]?.index;
  }
});



function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}



animate();