import { THREE, GLTFLoader } from "./threeWrapper.js";
var scene, camera, renderer, gemPrefab;


async function init() {
  // Set up the scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a renderer with antialiasing and attach it to the canvas
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("gem-canvas"),
    alpha: true
  });
  renderer.setClearColor("#98fb98", 0); // background color
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create a gemPrefab and add to the scene
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: "#FF5733" });
  gemPrefab = new THREE.Mesh(geometry, material);
  scene.add(gemPrefab);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the gemPrefab
  gemPrefab.rotation.x += 0.01;
  gemPrefab.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

async function start() {
  await init();
  animate();
}

function switchGem() {
  
}


export {start, switchGem}