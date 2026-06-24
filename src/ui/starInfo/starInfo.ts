import { stars as starData } from "../../data/hygLoader.ts";
import "./starInfo.css";
import html from "./starInfo.html?raw";

export const textbox = document.createElement("div");
textbox.innerHTML = html;
textbox.style.position = "fixed";
document.body.appendChild(textbox);

export function displayInfo(i: number, x: number, y: number){
    const star = starData[i];
    textbox.querySelector("#star-name")!.textContent = `Name: ${star["name"]}`;
    textbox.querySelector("#star-ra")!.textContent = `RA: ${star["ra"].toFixed(3)}°`;
    textbox.querySelector("#star-dec")!.textContent = `Dec: ${star["dec"].toFixed(3)}°`;
    textbox.querySelector("#star-mag")!.textContent = `Magnitude: ${star["magnitude"].toFixed(3)}`;
    textbox.querySelector("#star-absmag")!.textContent = `Abs. Magnitude: ${star["absmag"].toFixed(3)}`;
    textbox.querySelector("#star-spectral")!.textContent = `Spectral Class: ${star["spectral"]}`;
    textbox.querySelector("#star-distance")!.textContent = `Distance: ${(star["dist"] * 3.262).toFixed(3)} ly`;

    //ensures textbox is in frame
    const rect = textbox.getBoundingClientRect();
    if(y + rect.height > window.innerHeight)
      {textbox.style.top = String(y - rect.height - 30) + "px";}
    else 
      {textbox.style.top = String(y) + "px";}

    if(x + rect.width > window.innerWidth)
      {textbox.style.left = String(x - rect.width - 35) + "px";}
    else
      {textbox.style.left = String(x) + "px";}
    
}

