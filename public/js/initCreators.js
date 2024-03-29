import { THREE, GLTFLoader } from "./threeWrapper.js";
var scene, camera, renderer, cube, container, chairModel;
var deltaTheta = 0, theta = 0, radius = 2, target;

init();
animate();

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
  camera.position.z = 1;
  camera.position.y = 1;

  // Create a renderer with antialiasing and attach it to the canvas
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: container,
    alpha: true,
  });

  updateSize();

  // Call this function where you need to start loading the model
  loadModel();



  // Add directional light to the scene
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1); // Set position of light
  scene.add(directionalLight); // Add light to scene
}

function loadModel() {
  var loader = new GLTFLoader();

  // Replace 'path_to_your_model.glb' with the path to your model file
  loader.load(
    "./prefabs/chair02.glb",
    function (gltf) {
      chairModel = gltf.scene;
      scene.add(gltf.scene);
      console.log({ rot: chairModel.rotation.y });

      // camera lock on
      const chairPos = chairModel.position.clone();
      chairPos.y += .5;
      target = chairPos;
      camera.lookAt(chairPos);

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
  rotateAroundChair();

  renderer.render(scene, camera);
}

function rotateAroundChair() {
  if (!chairModel) return;

  // Update the position of the camera for orbiting
  deltaTheta = 0.01; // Example angular speed, adjust as needed
  theta += deltaTheta;

  // Calculate new position based on angle
  var newX = target.x + radius * Math.cos(theta);
  var newZ = target.z + radius * Math.sin(theta);

  // Set the new position of the camera
  camera.position.set(newX, 1, newZ);
  camera.lookAt(target); // Make sure camera is always looking at the target
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
