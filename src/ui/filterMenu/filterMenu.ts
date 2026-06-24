import html from "./filterMenu.html?raw";
import "./filterMenu.css";

const template = document.createElement("div");
template.innerHTML = html;

export const filterMenu = template.firstElementChild as HTMLElement;
document.body.appendChild(filterMenu);

let collapsed = false;
const collapseButton = filterMenu.querySelector("#collapse-btn") as HTMLElement;
const menuDisplay = filterMenu.querySelector("#filter-menu") as HTMLElement;

collapseButton.addEventListener("click",()=>{
    collapsed = !collapsed;
    if (collapsed){
        collapseButton.innerHTML = '&#9652;';
        collapseButton.classList.add('collapse-btn-collapsed');
        menuDisplay.style.display = 'none';

    }else{
        collapseButton.innerHTML = '&#9662;';
        collapseButton.classList.remove('collapse-btn-collapsed');
        menuDisplay.style.display = 'block';
    }
    

})
