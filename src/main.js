import * as THREE from 'three';
import SceneManager from './scene-manager.js';

import { createScene1 } from './scenes/scene1.js';
import { createScene2 } from './scenes/scene2.js';
import { createScene3 } from './scenes/scene3.js';


const sceneManager = new SceneManager();

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
  sceneManager.addScene('scene3', createScene3());
  // Load scene 1
  sceneManager.loadScene('scene1');

  // set camera position
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    const currentScene = sceneManager.getCurrentScene();
    // If current scene is not null
    if (currentScene) {
      if (typeof currentScene.animate === 'function') {
        currentScene.animate();
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

// Global function to load scene frome scene manager
window.loadScene = (sceneName) => {
  sceneManager.loadScene(sceneName);
  console.log(sceneName + ' loaded')
  console.log(sceneManager.getCurrentScene())
};

// Initalize
init();