import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
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


    // Create a KTX2Loader and set the transcoder path
    const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('https://cdn.jsdelivr.net/npm/three/examples/jsm/libs/basis/') // Use a CDN or local path
    .detectSupport(renderer);

    // Load the Earth textures
    let earthTexture, normalMap;

    // Load daymap
    ktx2Loader.load('textures/earth/2k_earth_daymap.ktx2', (texture) => {
      earthTexture = texture;
      console.log('Earth texture loaded:', earthTexture);
      updateMaterial();
    }, undefined, (error) => {
      console.error('An error occurred while loading the Earth texture:', error);
    });


    // Load normal map
    ktx2Loader.load('textures/earth/2k_earth_normal_map.ktx2', (texture) => {
      normalMap = texture;
      console.log('Normal map loaded:', normalMap);
      updateMaterial();
    }, undefined, (error) => {
      console.error('An error occurred while loading the normal map:', error);
    });


    function updateMaterial() {
      if (earthTexture) {
        // Create a sphere geometry and material
        const geometry = new THREE.SphereGeometry(2, 32, 32);

        // Adjust UV mapping to flip the texture vertically
        const uvAttribute = geometry.attributes.uv;
        for (let i = 0; i < uvAttribute.count; i++) {
          uvAttribute.setY(i, 1 - uvAttribute.getY(i));
        }

        const material = new THREE.MeshStandardMaterial({
          map: earthTexture,
          normalMap: normalMap,
          metalness: 0.5, // Adjusted for better illumination
          roughness: 0.5, // Adjusted for better illumination
        });
  
        // Create the sphere mesh and add it to the scene
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      }
    }


    //Load the hdr environment map
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('textures/skybox/space_2k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      console.log('HDR environment map loaded and applied to the sphere');
    }, undefined, (error) => {
    console.error('An error occurred while loading the HDR environment map:', error);
    });

  // Add ambient light for softer shadows
  const ambientLight = new THREE.AmbientLight(0x404040, 10);
  scene.add(ambientLight);

  let lastFrameTime = 0;
  const targetFPS = 60;
  function animate(now) {
      const delta = now - lastFrameTime;
      if (delta < 1000 / targetFPS) {
          requestAnimationFrame(animate);
          return;
      }
      lastFrameTime = now;
      sphere.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
  }


  return { scene, camera, animate: scene.animate };
}