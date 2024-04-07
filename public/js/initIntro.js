import { THREE } from "./threeWrapper.js";

// Scene setup
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a); // Black background
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("star-canvas"),
  alpha: true
});

renderer.setClearColor("#98fb98", 0); // background color
  renderer.setSize(window.innerWidth, window.innerHeight);

// Particles
let particleGeometry = new THREE.BufferGeometry();
let particleCount = 50;
let posArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  // Position particles randomly
  posArray[i] = (Math.random() - 0.5) * 5;
}
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
let particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02,
});
let particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleMesh);

// Camera position
camera.position.z = 4;

// Animation loop
let animationFrameId; // to stop the animation loop

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  particleGeometry.attributes.position.needsUpdate = true; // Update particles
  // Add some movement to each particle to simulate snow falling
  let positions = particleGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] -= 0.005; // Move particles down
    if (positions[i + 1] < -2.5) {
      positions[i + 1] = 2.5;
    }
  }
  renderer.render(scene, camera);
}
animate();

// Function to clear the scene
function clearScene() {
  // Stop the animation loop
  cancelAnimationFrame(animationFrameId);

  // Remove all objects from the scene
  while (scene.children.length > 0) {
    let object = scene.children[0];

    // If the object is a mesh with geometry and material
    if (object.isMesh) {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else {
          // An array of materials
          for (const material of object.material) cleanMaterial(material);
        }
      }
    }

    scene.remove(object);
  }

  // Dispose of the renderer and any other resources
  renderer.dispose();

  // Optionally, remove the renderer's canvas from the document
  if (renderer.domElement.parentElement) {
    renderer.domElement.parentElement.removeChild(renderer.domElement);
  }
}

// Helper function to clean materials
function cleanMaterial(material) {
  material.dispose();

  // Dispose textures if any
  if (material.map) material.map.dispose();
  if (material.lightMap) material.lightMap.dispose();
  if (material.bumpMap) material.bumpMap.dispose();
  if (material.normalMap) material.normalMap.dispose();
  if (material.specularMap) material.specularMap.dispose();
  if (material.envMap) material.envMap.dispose();
  // Add any other textures you might have used
}

// Call this function when you need to clear the scene and release resources
//   setTimeout(clearScene, 5000);
