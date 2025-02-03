import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export function createScene4(renderer) {

    // Create the scene
    const scene = new THREE.Scene();
        
    // Create a camera specific to this scene
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

      // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.05; // Damping factor
    controls.screenSpacePanning = false; // Disable panning

    // Create a point light and parent it to the scene
    const pointLight = new THREE.PointLight(0xff0000, 1, 10);
    pointLight.position.set(0, 0, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Load the textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('textures/earth/8k_earth_nightmap.jpg');
    const normalMap = textureLoader.load('textures/earth/8k_earth_normal_map.tif');

    // Create a sphere geometry and material
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalMap,
      });

    // Create the sphere mesh and add it to the scene
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Load the hdr environment map
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('textures/space.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    // material.envMap = texture;
    // material.needsUpdate = true;
    console.log('HDR environment map loaded and applied to the sphere');
    }, undefined, (error) => {
    console.error('An error occurred while loading the HDR environment map:', error);
    });

  // Add ambient light for softer shadows
  const ambientLight = new THREE.AmbientLight(0x404040, 6);
  scene.add(ambientLight);

    // Animation function
    scene.animate = () => {
        sphere.rotation.y += 0.01;
        controls.update(); // Update controls
      };


  return { scene, camera, animate: scene.animate };
}