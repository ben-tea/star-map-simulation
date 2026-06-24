import "./ui/global.css"
import {scene, camera, renderer, controls, timer} from "./assets/scene";
import {starField, selectStarUniform, hoveredStarUniform, fovSizeUniform, timeUniform} from "./celestial/stars/starRendering";
import {displayInfo, textbox} from "./ui/starInfo/starInfo";
import {getSelectedStarIndex} from "./selection/selectionManager";
import "./ui/filterMenu/filterMenu"

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
  selectStarUniform(-1);
});

controls.addEventListener("change", () => {
  isDragging = true;
});

//hover function
window.addEventListener("mousemove", (event)=>{
  selectIndex = getSelectedStarIndex(event, camera, starField);
  if (selectIndex === undefined) {
      hoveredStarUniform(-1); 
      return;
    }
  hoveredStarUniform(selectIndex);
})

//click function
window.addEventListener("click", (event) => {
    if (isDragging) return;
    if(event.target instanceof Node){ if (textbox.contains(event.target)) return; }
    
    if (selectIndex === undefined) return;
    
    selectStarUniform(selectIndex);
    showStarInfo(selectIndex,event.clientX,event.clientY);
});

//controls zooming
window.addEventListener("wheel", (event)=> {
  if (event.deltaY > 0) {camera.fov += 2.5;} 
  else if (event.deltaY < 0) {camera.fov -=2.5;}

  if (camera.fov > 75){
    camera.fov = 75;
    return;
  }else if (camera.fov < 10){
    camera.fov = 10;
    return;
  }
  camera.updateProjectionMatrix();
  fovSizeUniform(camera.fov);
})



function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  timer.update();
  timeUniform(timer.getElapsed());
}



animate();