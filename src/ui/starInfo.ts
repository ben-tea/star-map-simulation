import { stars as starData } from "../data/hygLoader.ts";
import "./starInfo.css";

export const textbox = document.createElement("div");
textbox.classList.add("glitch-card");

//card header HTML
const header = document.createElement("div");
const name = document.createElement("span");
const cardDots = document.createElement("div");


header.appendChild(name);
header.appendChild(cardDots);
for (let i = 0; i < 3; i++) {
  const dot = document.createElement("span");
  cardDots.appendChild(dot);
}

header.classList.add("card-header");
name.classList.add("card-title");
cardDots.classList.add("card-dots");

//card body HTML
const body = document.createElement("div");
const textRa = document.createElement("span");
const textDec = document.createElement("span");
const textMagnitude = document.createElement("span");
const textAbsMag = document.createElement("span");
const textSpectral = document.createElement("span");
const textDistance = document.createElement("span");
const button = document.createElement("button");

body.appendChild(textRa);
body.appendChild(textDec);
body.appendChild(textMagnitude);
body.appendChild(textAbsMag);
body.appendChild(textSpectral);
body.appendChild(textDistance);
body.appendChild(button);

body.classList.add("card-body");

textRa.classList.add("card-text");
textDec.classList.add("card-text");
textMagnitude.classList.add("card-text");
textAbsMag.classList.add("card-text");
textSpectral.classList.add("card-text");
textDistance.classList.add("card-text");



button.classList.add("submit-btn")
button.textContent = "Sigma Mode";

textbox.appendChild(header);
textbox.appendChild(body);

document.body.appendChild(textbox);

export function displayInfo(i: number, x: number, y: number){
    const star = starData[i];
    name.textContent = `Name: ${star["name"]}`;
    textRa.textContent = `RA: ${star["ra"].toFixed(3)}°`;
    textDec.textContent = `Dec: ${star["dec"].toFixed(3)}°`;
    textMagnitude.textContent = `Magnitude: ${star["magnitude"].toFixed(3)}`;
    textAbsMag.textContent = `Abs. Magnitude: ${star["absmag"].toFixed(3)}`;
    textSpectral.textContent = `Spectral Class: ${star["spectral"]}`;
    textDistance.textContent = `Distance: ${(star["dist"] * 3.262).toFixed(3)} ly`;

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

