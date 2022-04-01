import * as THREE from '/build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'
import Stats from './jsm/libs/stats.module.js';

let scene;
let camera;
let renderer;
let house;
let model_container = document.querySelector('.webgl');
const canvasSize = document.querySelector('.canvas-element');

const stats = new Stats()
document.body.appendChild(stats.domElement);

const init = () => {
    // scene setup
    scene = new THREE.Scene();

    //camera setup
    const fov = 40;
    const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 25);
    camera.lookAt(scene.position);
    scene.add(camera);

    //renderer setup
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: model_container
    });
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    // orbitcontrol setup
    const controls = new OrbitControls(camera, renderer.domElement);

   // ambient light setup
   
    const light = new THREE.AmbientLight()
    scene.add(light)

  

    // loding gltf 3d model
    const loader = new GLTFLoader();
    loader.load('./model/TONA.gltf', (gltf) => {
        house = gltf.scene.children[0];
        house.scale.set(.8, .8, .8)
        house.position.set(0, -1.3, 0)
        //house.rotation.x = Math.PI / -22
        scene.add(gltf.scene);
    });

    animate();
}

// redering scene and camera
const render = () => {
    renderer.render(scene, camera);
}

// animation recursive function
let step = 0
const animate = () => {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

console.log(Math.sin(10));

// making responsive
const windowResize = () => {
    camera.aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    render();
}

window.addEventListener('resize', windowResize, false);
window.onload = init;