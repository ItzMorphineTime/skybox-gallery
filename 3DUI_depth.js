import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm';

let camera, scene, renderer, sphere, clock;
let controls, loader;

init();
animate();



function init() {
  const gui = new GUI({autoPlace: false });
  var obj = {
    insideView: false,
    changeScene: false,
    displaceScale: -4,
    segments: 256,
    wireframe: false
  }
  gui.add( obj,'insideView' ).onChange( value => {
    if(value){
      camera.position.set(0,0,0);
      controls.target.set( 1, 0, 0 );
    }else{
      camera.position.set(6,6,0);
      controls.target.set( 0, 0, 0 );
    }
    controls.update();
  } );
  
  const container = document.getElementById( 'container-3D' );
  const containerGUI = document.getElementById( 'container-3D-GUI' );

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x101010 );

  const light = new THREE.AmbientLight( 0xffffff, 1 );
  scene.add( light );

  camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set(6,6,0); // Set position like this
  scene.add( camera );
  
  controls = new OrbitControls( camera, container );
  controls.target.set( 0, 0, 0 );
  controls.update();				

  // Create the panoramic sphere geometery
  var panoSphereGeo = new THREE.SphereGeometry( 6, 256, 256 );
  //wireframe(panoSphereGeo);
  
  // Create the panoramic sphere material
  var panoSphereMat = new THREE.MeshStandardMaterial( {
    side: THREE.BackSide,
    wireframe: false,
    displacementScale: - 4.0
  } );

  // Create the panoramic sphere mesh
  sphere = new THREE.Mesh( panoSphereGeo, panoSphereMat );

  // Load and assign the texture and depth map
  const manager = new THREE.LoadingManager();
  loader = new THREE.TextureLoader( manager );

  gui.add(obj, 'displaceScale',-6,6,0.25).onChange( value => {
      panoSphereMat.displacementScale = value;
  } );

  gui.add(obj, 'segments',8,512,8).onChange( value => {
      scene.remove(sphere);
      
      panoSphereGeo = new THREE.SphereGeometry(6,value, value/2);
      sphere = new THREE.Mesh( panoSphereGeo, panoSphereMat );
      scene.add( sphere );
  } );
  
  gui.add( obj,'wireframe' ).onChange( value => {
    if(value){
      panoSphereMat.wireframe = true;
    }else{
      panoSphereMat.wireframe = false;
    }

  } );

  // Add the button to scroll to the top of the page
  // Add the button to scroll to the top of the page
  gui.add({ scrollToTop: () => {
  $('.modal').animate({ scrollTop: 0 }, 'fast');
  console.log('test');
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }}, 'scrollToTop').name("Scroll to top");
  // $('html, body').animate({ scrollTop: 0 }, 'fast');

  // Add the button to toggle the collapsible div with id "image-details"
  gui.add({ toggleImageDetails: () => {
    const imageDetails = document.getElementById("image-details");
    imageDetails.classList.toggle("collapse");
  }}, 'toggleImageDetails').name("Toggle Prompt Details");

  // Add the button to toggle the modal close
  gui.add({ toggleModal: () => {
    $('#close-modal').click();
  }}, 'toggleModal').name("Close");

  containerGUI.appendChild( gui.domElement);
  
  // On load complete add the panoramic sphere to the scene
  manager.onLoad = function () {
    scene.add( sphere );
  };

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );

  let fudge = 80; //TODO: Remove fudge
  renderer.setSize(window.innerWidth - fudge, (window.innerWidth - fudge) / 2);
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize );
  // render();
  // onWindowResize();
  // Can't seem to get the right dimensions on first load because Modal window isn't active yet so there's nop bounds, easily fixed by resizing window... but not really a fix

}

export function loadTex(texPath, depthPath){

  loader.load( texPath, function ( texture ) {

    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    sphere.material.map = texture;

  } );

  loader.load( depthPath, function ( depth ) {

    depth.minFilter = THREE.NearestFilter;
    depth.generateMipmaps = false;
    sphere.material.displacementMap = depth;

  } );			

}


function onWindowResize() {
  const canvasSize = renderer.domElement.parentElement.getBoundingClientRect();

  camera.aspect = 2;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasSize.width, canvasSize.width / 2);

  // renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  renderer.setAnimationLoop( render );

}

function render() {

  const time = clock.getElapsedTime();
  sphere.rotation.y += 0.001;
  sphere.position.x = Math.sin( time ) * 0.2;
  sphere.position.z = Math.cos( time ) * 0.2;

  renderer.render( scene, camera );

}
 export default loadTex;
// export { loadTex };