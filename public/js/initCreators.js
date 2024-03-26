import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/loaders/GLTFLoader.js";
var scene, camera, renderer, cube, container;

// init();
// animate();

function init() {
  // Set up the scene
  scene = new THREE.Scene();
  container = document.getElementById("footer-canvas");

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
    canvas: container,
    alpha: true,
  });

  updateSize();

  // Call this function where you need to start loading the model
  // loadModel();

  // Create a cube and add to the scene
  //   var geometry = new THREE.BoxGeometry(1, 1, 1);
  //   var material = new THREE.MeshBasicMaterial({ color: "#FF5733" });
  //   cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);
}

function loadModel() {
  var loader = new GLTFLoader();

  // Replace 'path_to_your_model.glb' with the path to your model file
  loader.load(
    "./prefabs/chair.glb",
    function (gltf) {
      scene.add(gltf.scene);
      // Perform any additional actions with the model
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function updateSize() {
  // Get new size
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function endInit() {}

// Handle window resize
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  updateSize();
  camera.updateProjectionMatrix();
});
