import * as THREE from 'three';

export function createScene2() {
    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);


    return scene;
  }
  