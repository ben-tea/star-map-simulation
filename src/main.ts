import * as THREE from "three";
import { scene, camera, renderer, controls } from "./assets/scene";
import { starField } from "./assets/stars";

scene.add(starField);
let isDragging = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
raycaster.params.Points.threshold = 1.7;

controls.addEventListener("start", () => {
  isDragging = false;
});

controls.addEventListener("change", () => {
  isDragging = true;
});

window.addEventListener("click", (event) => {
  if (isDragging) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObject(starField);

  console.log(hits);
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();