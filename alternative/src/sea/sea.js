import * as THREE from "three";

// Plane
const width = 1000;
const height = 1000;
const segments = 100;

const geometry = new THREE.PlaneGeometry(
    width,
    height,
    segments,
    segments
);

// Save original positions
const position = geometry.attributes.position;
const original = position.array.slice();

const material = new THREE.MeshStandardMaterial({
    color: 0x44aaff,
    side: THREE.DoubleSide,
    wireframe: false
});

// Animation
const timer = new THREE.Timer();

export function initSea(scene) {
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 400;
    scene.add(plane);
}

export function updateSea() {

    timer.update();
    const time = timer.getElapsed();

    for (let i = 0; i < position.count; i++) {
        const x = original[i * 3];
        const y = original[i * 3 + 1];

        // Sine wave displacement
        position.array[i * 3 + 2] =
            Math.sin(x * 2 + time * 2) * 50 +
            Math.cos(y * 2 + time * 1.5) * 50;
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
}