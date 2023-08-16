import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a red box geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a red material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a mesh using the geometry and material
const cube = new THREE.Mesh(geometry, material);
// position, scaling, rotation
// cube.position.y = 3;
// cube.scale.x = 3;
// cube.scale.y = 3;
// cube.scale.z = 3;
// Rotate the cube around the x-axis (45 degrees)
// cube.rotation.x = Math.PI / 4;
cube.position.set(1, 2, 3);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshBasicMaterial({ color: 0xff6700 })
);
cube2.position.set(1, 2, 1);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 1.4, 1.4),
  new THREE.MeshBasicMaterial({ color: 0xff6790 })
);
cube3.position.set(1, 2, 2);

// group multiple objects
const group = new THREE.Group();
group.add(cube);
group.add(cube2);
group.add(cube3);
scene.add(group);

group.position.y = 3;
group.position.x = -3;
group.rotation.x = 9.5;
group.rotation.y = 7;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

camera.position.set(3, 3, 5);

// Set the camera to look at the cube's position
camera.lookAt(cube.position);
scene.add(camera);

// Create a renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
