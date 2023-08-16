import * as THREE from 'three';
const scene = new THREE.Scene();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Load the texture image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./img.jpeg');
// Apply texture filtering
// texture.minFilter = THREE.LinearFilter;
// texture.anisotropy = 16;
texture.wrapS = THREE.RepeatWrapping; // Set texture wrapping mode for S (horizontal) direction
texture.wrapT = THREE.RepeatWrapping; // Set texture wrapping mode for T (vertical) direction

// Convert the texture to grayscale for use as a bump map
const grayscaleTexture = texture.clone();
grayscaleTexture.minFilter = THREE.LinearFilter;
grayscaleTexture.magFilter = THREE.LinearFilter;

const material = new THREE.MeshStandardMaterial({
  map: texture,
  aoMap: texture, // Apply the same texture as ambient occlusion map for more realism
  aoMapIntensity: 1, // Adjust the intensity of ambient occlusion
  displacementMap: texture, // Apply the texture as displacement map for added realism
  displacementScale: 0.1, // Adjust the displacement scale to control the depth of details
  bumpMap: grayscaleTexture, // Use grayscale texture as a bump map
  bumpScale: 0.1, // Adjust the bump scale to control the roughness
  roughness: 0.4,
  metalness: 0.1,
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
