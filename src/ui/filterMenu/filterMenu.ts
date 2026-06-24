import html from "./filterMenu.html?raw";
import "./filterMenu.css";

export const menu = document.createElement("div");
menu.innerHTML = html;
document.body.appendChild(menu);
