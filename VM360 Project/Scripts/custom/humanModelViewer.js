import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls, human;

function createDetailedHuman() {
    const group = new THREE.Group();

    // (Head, torso, arms, legs, face, and other parts creation as shown in the inline script above.)

    return group;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-model-container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    human = createDetailedHuman();
    scene.add(human);

    camera.position.set(0, 1, 2);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function applyClothing(textureUrl, type) {
    new THREE.TextureLoader().load(textureUrl, (texture) => {
        const targetMesh = human.getObjectByName(type === 'Upper' ? 'torso' : 'lowerBody');
        targetMesh.material.map = texture;
        targetMesh.material.needsUpdate = true;
    });
}

document.getElementById('clothingSelect').addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const imageUrl = selectedOption.value;
    const type = selectedOption.getAttribute('data-type');
    if (imageUrl) {
        applyClothing(imageUrl, type);
    }
});

init();
