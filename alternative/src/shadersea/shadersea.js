import * as THREE from "three";

import vertexShader from '../../shaders/sea/vertex.glsl?raw';
import fragmentShader from '../../shaders/sea/fragment.glsl?raw';

const geometry = new THREE.PlaneGeometry(
    1000,
    1000,
    256, // width segments
    256  // height segments
);

const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        amplitude: { value: 50.0 },
        frequency: { value: 2.0 },
        speed: { value: 2.0 }
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2;
mesh.position.y = 700;

export function initShaderSea(scene) {
    scene.add(mesh);
}

// Animation
const timer = new THREE.Timer();

export function updateShaderSea() {
    timer.update();
    const time = timer.getElapsed();
    material.uniforms.time.value = time;
}