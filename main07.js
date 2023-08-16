import * as THREE from 'three';
const scene = new THREE.Scene();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const flatMaterial = new THREE.MeshStandardMaterial();
const faltGeometry = new THREE.BoxGeometry(15, 0.5, 15);
const flat = new THREE.Mesh(faltGeometry, flatMaterial);
flat.position.set(1, 0.5, 12); // Adjust the Z position to bring it closer
flat.receiveShadow = true;
scene.add(flat);

// Load the texture image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./img.jpeg');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
const grayscaleTexture = texture.clone();
grayscaleTexture.minFilter = THREE.LinearFilter;
grayscaleTexture.magFilter = THREE.LinearFilter;

const material = new THREE.MeshStandardMaterial({
  map: texture,
  aoMap: texture,
  aoMapIntensity: 1,
  displacementMap: texture,
  displacementScale: 0.1,
  bumpMap: grayscaleTexture,
  bumpScale: 0.1,
  roughness: 0.4,
  metalness: 0.1,
});
const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), material);
cube.position.set(1, 2, 12);
cube.castShadow = true;
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
controls.autoRotate = false;
camera.lookAt(cube.position);

// LIGHTS
const light = new THREE.DirectionalLight('#0618bf', 5);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight('#bf0606', 100, 100, 2);
pointLight.position.set(1, 3, 10);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.camera.near = 0.2;
pointLight.shadow.camera.far = 10;
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const tick = () => {
  controls.target.set(cube.position.x, cube.position.y, cube.position.z);
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
