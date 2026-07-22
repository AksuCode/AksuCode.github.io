import * as THREE from "three";

import vertexShader from '../../shaders/sea/vertex.glsl?raw';
import fragmentShader from '../../shaders/sea/fragment.glsl?raw';

const timer = new THREE.Timer();
let currentTime = timer.getElapsed();

export function surfaceHeightAtPos(x, z) {
    /* Run identical simulation to shaders in order to calculate height at pos. */
    /* We are using FFT sea algorithm. Useful: Math.fft and Math.ifft */
}

const geometry = new THREE.PlaneGeometry(
    1000,
    1000,
    256, // width segments
    256  // height segments
);

const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: currentTime },
        /*???*/
    },
    vertexShader, /* The shaders generate the identical fft sea that surfaceHeightAtPos calculates.*/
    fragmentShader,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2;
mesh.position.y = -300;

export function initShaderSea(scene) {
    scene.add(mesh);
}

export function updateShaderFFTSea() {
    timer.update();
    currentTime = timer.getElapsed();

    material.uniforms.time.value = currentTime;
}