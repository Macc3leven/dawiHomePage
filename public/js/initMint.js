import { THREE } from "./threeWrapper.js";

// Define variables
let scene, camera, renderer;
let particleSystem;
const particleCount = 50;
const imagePaths = [
  "./images/icon.png",
  "./images/icon.png",
  "./images/icon.png",
  "./images/icon.png",
  "./images/icon.png",
];

// Initialize Three.js scene
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

    createParticleSystem(imagePaths);
    
    // Add directional light to the scene
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 5); // Set position of light
    scene.add(directionalLight); // Add light to scene

  animate();
}

// Create particle system with images
function createParticleSystem(paths) {
  const loader = new THREE.TextureLoader();
  const particles = [];
  var material;

  paths.forEach((path) => {
    const texture = loader.load(path);
    material = new THREE.PointsMaterial({
      size: 0.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < particleCount / paths.length; i++) {
      const particle = new THREE.Vector3(
        Math.random() * 4,
        Math.random() * 4,
        Math.random() * 4
      );
      particles.push(particle);
    }
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(particles);
  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

// Move particle system around slowly
function moveParticleSystem() {
    particleSystem.geometry.attributes.position.needsUpdate = true;

    const positions = particleSystem.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        // Move particles from right to left
        if (positions[i] < -3) {
          positions[i] = 4; // Reset position if it goes off the left side
          // console.log(positions[i])
        } else {
            positions[i] -= 0.002; // Move particles to the left
        }

        // Move particles randomly on the y-axis
        positions[i + 1] += (Math.random() - 0.5) * 0.01;
        
        // Move particles randomly on the z-axis within the desired range
        positions[i + 2] += (Math.random() - 0.5) * 0.01;
        
        // Clamp z-axis within the desired range
      positions[i + 2] = Math.max(3.5, Math.min(4.9, positions[i + 2])); 
      // console.log("X", positions[i])
    }
}


// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move particle system
  moveParticleSystem();

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize scene
init();
