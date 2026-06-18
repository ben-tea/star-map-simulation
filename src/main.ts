import "./style.css"
import {scene, camera, renderer, controls} from "./assets/scene";
import {starField, selectStar} from "./celestial/stars/starRendering";
import {displayInfo, textbox} from "./ui/starInfo";
import {getSelectedStarIndex} from "./selection/selectionManager";

scene.add(starField);
let isDragging = false;

//helper function to display star info
function showStarInfo(index: number,x: number,y: number) {
    textbox.style.display = "block";
    displayInfo(index, x, y);
}

//manages when dragging
controls.addEventListener("start", () => {
  isDragging = false;
  textbox.style.display = "none";
  selectStar(-1);
});

controls.addEventListener("change", () => {
  isDragging = true;
});

//checks if clicks star
window.addEventListener("click", (event) => {
    if (isDragging) return;
    if(event.target instanceof Node){
          if (textbox.contains(event.target)) return;
        }
    
    const selectedIndex = getSelectedStarIndex(event, camera, starField);

    if (selectedIndex === undefined) return;
    
    
    selectStar(selectedIndex);
    showStarInfo(selectedIndex,event.clientX,event.clientY);
});



function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}



animate();