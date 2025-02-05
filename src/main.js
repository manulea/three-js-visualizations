import * as THREE from 'three';
import SceneManager from './scene-manager.js';

import { createScene1 } from './scenes/scene1.js';
import { createScene2 } from './scenes/scene2.js';
import { createScene3 } from './scenes/scene3.js';
import { createScene4 } from './scenes/scene4.js';
import { createScene5 } from './scenes/scene5.js';
import { createScene6 } from './scenes/scene6.js';
import { createScene7 } from './scenes/scene7.js';

const sceneManager = new SceneManager();

function findObjectByName(scene, name) {
  return scene.children.find(child => child.name === name);
}

function init() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  sceneManager.addScene('scene1', createScene1());
  sceneManager.addScene('scene2', createScene2());
  sceneManager.addScene('scene3', createScene3());
  sceneManager.addScene('scene4', createScene4(renderer));
  sceneManager.addScene('scene5', createScene5());
  sceneManager.addScene('scene6', createScene6());
  sceneManager.addScene('scene7', createScene7());

  sceneManager.loadScene('scene1');

  function animate() {
    requestAnimationFrame(animate);
    const currentScene = sceneManager.getCurrentScene();
    if (currentScene) {
      const currentCamera = currentScene.camera;
      if (currentCamera) {
        if (typeof currentScene.animate === 'function') {
          currentScene.animate();
        }
        renderer.render(currentScene.scene, currentCamera);
      }
    }
  }

  animate();

  window.addEventListener('resize', () => {
    const currentScene = sceneManager.getCurrentScene();
    if (currentScene) {
      const currentCamera = currentScene.camera;
      if (currentCamera) {
        currentCamera.aspect = window.innerWidth / window.innerHeight;
        currentCamera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  });
}

window.loadScene = (sceneName) => {
  console.log('Loading scene:', sceneName);  // Debug log
  sceneManager.loadScene(sceneName);
  console.log(sceneName + ' loaded');  // Debug log
  console.log(sceneManager.getCurrentScene());  // Debug log
};

// Initialize
init();
