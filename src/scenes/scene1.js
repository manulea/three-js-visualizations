import * as THREE from 'three';

export function createScene1() {
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = "cube"
  scene.add(cube);
  console.log('Cube created and added to scene1:', cube); // Debugging

  scene.animate =  () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  return scene;
}