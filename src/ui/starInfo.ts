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
const textSpectral = document.createElement("span");
const textDistance = document.createElement("span");
const button = document.createElement("button");

body.appendChild(textRa);
body.appendChild(textDec);
body.appendChild(textMagnitude);
body.appendChild(textSpectral);
body.appendChild(textDistance);
body.appendChild(button);

body.classList.add("card-body");

textRa.classList.add("card-text");
textDec.classList.add("card-text");
textMagnitude.classList.add("card-text");
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
    textRa.textContent = `RA: ${star["ra"]}°`;
    textDec.textContent = `Dec: ${star["dec"]}°`;
    textMagnitude.textContent = "lalala";
    textbox.style.top = String(y) + "px";
    textbox.style.left = String(x) + "px";
}

