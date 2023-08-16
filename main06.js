import * as THREE from 'three';
const scene = new THREE.Scene();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// Text
const loader = new FontLoader();

loader.load('fonts/Bebas Neue_Regular.json', function (font) {
  const material = new THREE.MeshNormalMaterial();
  const material2 = new THREE.MeshPhongMaterial({
    color: 0x00aaff,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const geometry = new TextGeometry('Hello World', {
    font: font,
    size: 5,
    height: 2,
    curveSegments: 12,
  });
  geometry.center();

  const text = new THREE.Mesh(geometry, material);
  // Position the text to face the screen center

  text.position.x = -geometry.boundingBox.max.x / 2;
  text.position.y = -geometry.boundingBox.max.y / 2;
  text.lookAt(camera.position);
  scene.add(text);

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
  // stars
  const starGeometry = new THREE.SphereGeometry(0.5, 10, 10); // Adjust segments for smoother star appearance

  for (let i = 0; i < 1000; i++) {
    const donut = new THREE.Mesh(starGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 70;
    donut.position.y = (Math.random() - 0.5) * 70;
    donut.position.z = (Math.random() - 0.5) * 70;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
scene.add(camera);
camera.position.set(15, 0, 0); // Adjust the camera position to the right

const canvas = document.querySelector('.webgl');
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 1);
controls.enableDamping = true;
controls.autoRotate = true;
controls.update();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
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
