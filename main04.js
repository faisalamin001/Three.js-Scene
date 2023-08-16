import * as THREE from 'three';
const scene = new THREE.Scene();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'lil-gui';

const gui = new dat.GUI();

const material = new THREE.MeshStandardMaterial({
  color: 0xff6799,
  roughness: 0.5,
  metalness: 0.7,
});
const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), material);

cube.position.set(1, 2, 12);

scene.add(cube);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.lookAt(cube.position);
scene.add(camera);

const canvas = document.querySelector('.webgl');
const controls = new OrbitControls(camera, canvas);
controls.update();
controls.target.z = 20;
controls.enableDamping = true;
controls.autoRotate = true;
camera.lookAt(cube.position);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);

const tick = () => {
  controls.target.set(cube.position.x, cube.position.y, cube.position.z); // Set the target to cube's origin
  camera.lookAt(cube.position);
  controls.update();
  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
};
tick();

window.addEventListener('resize', () => {
  const newAspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = newAspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Debug
gui.add(cube.position, 'x', -9, 9, 1);
gui.add(cube.position, 'y', -9, 9, 1);
gui.add(cube.position, 'z', -9, 9, 1);
gui.add(cube, 'visible');
const params = {
  color: '0xff6799',
};

gui.addColor(params, 'color').onChange(() => {
  material.color.set(params.color);
});
