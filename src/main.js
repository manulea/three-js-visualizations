import * as THREE from 'three';
import SceneManager from './scene-manager.js';


const sceneManager = new SceneManager();

function createScene1() {
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = "cube"
  scene.add(cube);
  console.log('Cube created and added to scene1:', cube); // Debugging
  return scene;
}

function createScene2() {
  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  return scene;
}

function findObjectByName(scene, name) {
  return scene.children.find(child => child.name === name);
}

function init() {

  // Create camera, renderer, append to document
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create scenes and add to scene manager
  sceneManager.addScene('scene1', createScene1());
  sceneManager.addScene('scene2', createScene2());
  // Load scene 1
  sceneManager.loadScene('scene1');

  // set camera position
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    const currentScene = sceneManager.getCurrentScene();
    // If current scene is not null
    if (currentScene) {
      // Animations for scene 1
      if (currentScene === sceneManager.scenes['scene1']) {
        // Find the cube
        let cube = findObjectByName(currentScene, 'cube')
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // console.log('Cube rotation:', cube.rotation); // Debugging
      }
      renderer.render(currentScene, camera);
    }
  }

  // Run animation
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

window.loadScene = (sceneName) => {
  sceneManager.loadScene(sceneName);
  console.log(sceneName + ' loaded')
  console.log(sceneManager.getCurrentScene())

};

// Initalize
init();