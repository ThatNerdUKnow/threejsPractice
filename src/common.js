import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
} from "../node_modules/three/build/three.module.js";
import { GUI } from "dat.gui";

const gui = new GUI();

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

const renderer = new WebGLRenderer({ alpha: false, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export { gui, scene, camera, renderer };
