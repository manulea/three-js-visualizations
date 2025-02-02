import * as THREE from 'three';

class SceneManager {
  constructor() {
    this.scenes = {};
    this.currentScene = null;
  }

  addScene(name, scene) {
    this.scenes[name] = scene;
  }

  loadScene(name) {
    if (this.scenes[name]) {
      this.currentScene = this.scenes[name];
    } else {
      console.error(`Scene ${name} not found`);
    }
  }

  getCurrentScene() {
    return this.currentScene;
  }
}

export default SceneManager;