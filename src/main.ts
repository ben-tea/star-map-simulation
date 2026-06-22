import "./style.css"
import {scene, camera, renderer, controls} from "./assets/scene";
import {starField, selectStar, hoveredStar, fovSizeChange} from "./celestial/stars/starRendering";
import {displayInfo, textbox} from "./ui/starInfo";
import {getSelectedStarIndex} from "./selection/selectionManager";

scene.add(starField);
let isDragging = false;
let selectIndex: number | undefined = undefined;

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

//highlights star that cursor hovers
window.addEventListener("mousemove", (event)=>{
  selectIndex = getSelectedStarIndex(event, camera, starField);
  if (selectIndex === undefined) {
      hoveredStar(-1); 
      return;
    }
  hoveredStar(selectIndex);
})

//checks if clicks star
window.addEventListener("click", (event) => {
    if (isDragging) return;
    if(event.target instanceof Node){ if (textbox.contains(event.target)) return; }
    
    if (selectIndex === undefined) return;
    
    selectStar(selectIndex);
    showStarInfo(selectIndex,event.clientX,event.clientY);
});

//controls zooming
window.addEventListener("wheel", (event)=> {
  if (event.deltaY > 0) {camera.fov += 2;} 
  else if (event.deltaY < 0) {camera.fov -=2;}

  if (camera.fov > 80){
    camera.fov = 80;
    return;
  }else if (camera.fov < 10){
    camera.fov = 10;
    return;
  }
  camera.updateProjectionMatrix();
  fovSizeChange(camera.fov);
})



function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}



animate();