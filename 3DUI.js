const container = document.getElementById("container");

const DEFAULT_CAMERA_FOV = 90;
const DEFAULT_SPIN_SPEED = 0.001;
let spin = true;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const textureLoader = new THREE.TextureLoader();

const viewport = document.createElement("div");

// Add download button to the viewport
// const downloadBtn = document.createElement("button");
// downloadBtn.className = "download-btn";
// downloadBtn.textContent = "Download";
// viewport.appendChild(downloadBtn);

const downloadJPG = async (url, filename) => {
  const data = await fetch(url)
  const blob = await data.blob()
  const objectUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.setAttribute('href', objectUrl)
  link.setAttribute('download', filename)
  link.style.display = 'none'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}

	// Add download button to the viewport
const downloadBtn = document.createElement("button");
downloadBtn.className = "download-btn";
// downloadBtn.style="z-index: 10;cursor:pointer;"
downloadBtn.textContent = "Download";
container.appendChild(downloadBtn);
viewport.appendChild(downloadBtn);

// Add spin speed slider to the viewport
const spinSpeedSlider = document.createElement("input");
spinSpeedSlider.className = "spin-speed-slider";
spinSpeedSlider.type = "range";
spinSpeedSlider.min = "0.0005";
spinSpeedSlider.max = "0.005";
spinSpeedSlider.step = "0.0005";
spinSpeedSlider.value = DEFAULT_SPIN_SPEED;
viewport.appendChild(spinSpeedSlider);

// Add FOV slider to the viewport
const fovSlider = document.createElement("input");
fovSlider.className = "fov-slider";
fovSlider.type = "range";
fovSlider.min = "1";
fovSlider.max = "179";
fovSlider.step = "1";
fovSlider.value = DEFAULT_CAMERA_FOV;
viewport.appendChild(fovSlider);

// Add delete button to the viewport
const deleteBtn = document.createElement("button");
deleteBtn.className = "delete-btn";
deleteBtn.textContent = "Delete";
viewport.appendChild(deleteBtn);

// Add spin button to the viewport
const spinBtn = document.createElement("button");
spinBtn.className = "spin-btn";
spinBtn.textContent = "Spin";
viewport.appendChild(spinBtn);

// Delete button event listener
deleteBtn.addEventListener("click", () => {
  //   container.removeChild(viewport);
  renderer.dispose();
});

// spin button event listener
spinBtn.addEventListener("click", () => {
  spin = !spin;
  spinBtn.style.backgroundColor = spin ? "green" : "blue";
});

function createConfig(path, title) {
  return { texturePath: path, spinSpeed: 0.001, title: title };
}

function closeViewport() {
//   container.removeChild(viewport);
  renderer.dispose();
}
let camera = new THREE.PerspectiveCamera(
  DEFAULT_CAMERA_FOV,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let scene = new THREE.Scene();

function createViewport2(config) {
  scene = new THREE.Scene();

  camera.position.set(0, 0, 0);
  // camera.position.z = 2;
  // container.appendChild(renderer.domElement);
  config.spinSpeed = 0.001;

  textureLoader.load(config.texturePath, (texture) => {
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const animate = () => {
      requestAnimationFrame(animate);
      if (spin) {
        sphere.rotation.y += config.spinSpeed;
      }
      renderer.render(scene, camera);
    };
    animate();
  });

  viewport.className = "viewport";
  container.appendChild(viewport);

  let fudge = 55; //TODO: Remove fudge
  renderer.setSize(window.innerWidth - fudge, (window.innerWidth - fudge) / 2);

  viewport.appendChild(renderer.domElement);

  downloadBtn.onclick = function(){downloadJPG(config.texturePath, `${config.title}.jpg`)}


  spinSpeedSlider.value = config.spinSpeed || 0;
  fovSlider.value = camera.fov;

  // FOV slider event listener
  fovSlider.addEventListener("input", (event) => {
    const newFov = parseFloat(event.target.value);
    camera.fov = newFov;
    camera.updateProjectionMatrix();
  });

  // Spin speed slider event listener
  spinSpeedSlider.addEventListener("input", (event) => {
    const newSpinSpeed = parseFloat(event.target.value);
    config.spinSpeed = newSpinSpeed;
  });


  setTimeout(() => {
    //TODO: Remove this hacky fudge
    const canvasSize = renderer.domElement.parentElement.getBoundingClientRect();
    renderer.setSize(canvasSize.width, canvasSize.width / 2);
    camera.aspect = 2;
    camera.updateProjectionMatrix();
  }, 1000);

  return { renderer, camera, scene };
}

window.addEventListener("resize", () => {
  // const width = window.innerWidth / 2;
  // const height = window.innerHeight / 2;
  // for (const viewport of viewports) {
  const canvasSize = renderer.domElement.parentElement.getBoundingClientRect();
  renderer.setSize(canvasSize.width, canvasSize.width / 2);
  camera.aspect = 2;
  camera.updateProjectionMatrix();
  // }
});

// Helper function to toggle wireframe mode
function toggleWireframe() {
  //   for (const viewport of viewports) {
  const sphere = scene.children.find((obj) => obj.type === "Mesh");
  sphere.material.wireframe = !sphere.material.wireframe;
  //   }
}

// Event listener for key press events
window.addEventListener("keydown", (event) => {
  try {
    if (event.key.toLowerCase() === "w") {
      toggleWireframe();
    }
  } catch (e) {
    console.log(e);
  }
  // } else if (event.key.toLocaleLowerCase() == " ") {
  //   spin = !spin;
  // }
});
