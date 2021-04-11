import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, renderer, camera, gui } from "./common.js";
import { mouseX, mouseY } from "./utils.js";
import {
  PointLight,
  Clock,
  AudioListener,
  AudioLoader,
  Audio,
} from "../node_modules/three/build/three.module.js";

var reiPlush;

// Loading
const loader = new GLTFLoader();
loader.load("../models/rei/scene.gltf", (model) => {
  model.scene.scale.set(10, 10, 10);
  reiPlush = model.scene;
  scene.add(reiPlush);
});

//Camera
camera.position.set(0, 6, 10);
camera.lookAt(0, 5, 0);

// Lights
var lights = [];

const pointLight = new PointLight(0xffffff, 1);
pointLight.position.set(20, 5.1, 20);
lights.push(pointLight);

const pointLight2 = new PointLight(0xffffff, 0.7);
pointLight2.position.set(-12.3, 0, 7.7);
lights.push(pointLight2);

const pointLight3 = new PointLight(0xffffff, 3);
pointLight3.position.set(0, 20, -4.9);
lights.push(pointLight3);

lights.forEach((light) => {
  scene.add(light);
});

// GUI
lights.forEach((light) => {
  gui.add(light.position, "x", -20, 20, 0.1);
  gui.add(light.position, "y", -20, 20, 0.1);
  gui.add(light.position, "z", -20, 20, 0.1);
  gui.add(light, "intensity", 0, 20, 0.1);
});

// Sound

const listener = new AudioListener();
camera.add(listener);

const sound = new Audio(listener);

const audioLoader = new AudioLoader();
audioLoader.load("../sounds/flyMeToTheMoon.mp3", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
  console.log("Playing sound");
});

const clock = new Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  if (reiPlush) {
    reiPlush.rotation.y = 0.5 * elapsedTime;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  console.log("resize");
});
