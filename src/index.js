import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, renderer, camera, gui } from "./common.js";
import { mouseX, mouseY } from "./utils.js";

var kunai;

// Loading
const loader = new GLTFLoader();
loader.load("../models/garfield/scene.gltf", (model) => {
  model.scene.scale.set(0.03, 0.03, 0.03);
  kunai = model.scene;
  scene.add(kunai);
});

//Camera
camera.position.set(0, 6, 10);
camera.lookAt(0, 0, 0);

// Lights
var lights = [];

const pointLight = new THREE.PointLight(0xffffff, 2.3);
pointLight.position.set(20, 5.1, 20);
lights.push(pointLight);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(-12.3, 0, 7.7);
lights.push(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 4.7);
pointLight3.position.set(0, 20, -4.9);
lights.push(pointLight3);

lights.forEach((light) => {
  scene.add(light);
});

// Objects
const sphereGeometry = new THREE.SphereGeometry(2.5, 32, 32);

// Materials

const material = new THREE.MeshStandardMaterial();
//material.metalness = 0.7;
//material.roughness = 0.2;
material.bumpMap = bumpMap;
material.normalMap = normalTexture;
material.map = diffuseTexture;
material.roughnessMap = roughMap;

// Meshes
const sphere = new THREE.Mesh(sphereGeometry, material);
//scene.add(sphere);

// GUI
lights.forEach((light) => {
  gui.add(light.position, "x", -20, 20, 0.1);
  gui.add(light.position, "y", -20, 20, 0.1);
  gui.add(light.position, "z", -20, 20, 0.1);
  gui.add(light, "intensity", 0, 20, 0.1);
});

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  if (kunai) {
    kunai.rotation.y = 0.5 * elapsedTime;
    //kunai.rotation.x = 0.25 * elapsedTime;
  }

  //sphere.rotation.x += 0.01;

  sphere.rotation.y = 0.5 * elapsedTime;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
