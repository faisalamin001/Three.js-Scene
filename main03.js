import * as THREE from 'three';
import gsap from 'gsap';
const scene = new THREE.Scene();

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ color: 0xff6799 })
);

cube.position.set(1, 2, 9);

scene.add(cube);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

// camera.position.set(5, 5, 10);

// Set the camera to look at the cube's position
camera.lookAt(cube.position);
scene.add(camera);

// Create a renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Animation

gsap.to(cube.position, { duration: 2, delay: 1, x: 2 });

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   cube.rotation.y = elapsedTime * 0.5;
  //   cube.position.y = Math.sin(elapsedTime);
  //   cube.position.x = Math.cos(elapsedTime);
  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
};
tick();
