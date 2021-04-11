import { camera, renderer } from "./common.js";

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;

  //console.log(mouseX, mouseY);
});

export { mouseX, mouseY };
