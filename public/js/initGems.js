import { THREE } from "./threeWrapper.js";
var scene, camera, renderer, cube;

/** This is the script for gems 
 * init()
 * endInit() 
 */
init();
animate();

function init() {
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

  // Create a cube and add to the scene
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: "#FF5733" });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function endInit() {
    
}

// Handle window resize
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
