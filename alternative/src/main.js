import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

import { test } from './fft/fft.js';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 75, width / height, 0.01, 10000 );
camera.position.z = 2000;
camera.position.y = 1000;
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

const loader = new FBXLoader();
const object3D = await loader.loadAsync( './models/sailboat.fbx' );
scene.add( object3D );

const geometry = new THREE.PlaneGeometry( 1500, 1500 );
const material = new THREE.MeshStandardMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometry, material );
// Rotate from XY to XZ
plane.rotation.x = -Math.PI / 2
scene.add( plane );

const axes = new THREE.AxesHelper(100000);
axes.material.depthTest = false;
axes.material.depthWrite = false;
// Render after other objects
axes.renderOrder = 999;
scene.add(axes);


// Ambient Light = Brightness. Lights everything.
const acolor = 0xFFFFFF;
const aintensity = 0.01;
const ambientLight = new THREE.AmbientLight(acolor, aintensity);
scene.add(ambientLight);

/*
// Hemisphere Light. Light that illuminates from up and down. Sky and Ground (sea).
const skyColor = 0xB1E1FF;
const groundColor = 0x0d06ff;
const hintensity = 0.05;
const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, hintensity);
scene.add(hemisphereLight);
*/

// SUN!!!
const scolor = 0xFFFFFF;
const sintensity = 0.7;
const sunLight = new THREE.DirectionalLight(scolor, sintensity);
sunLight.position.set(250, 250, 0);
sunLight.target.position.set(-250, -250, 0);
scene.add(sunLight);
scene.add(sunLight.target);
const shelper = new THREE.DirectionalLightHelper(sunLight);
scene.add(shelper);

// Point light
const color = 0xFFFFFF;
const pintensity = 100000;
const plight = new THREE.PointLight(color, pintensity);
plight.position.set(-500, 100, 500);
scene.add(plight);
const phelper = new THREE.PointLightHelper(plight);
scene.add(phelper);


const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	//object3D.rotation.x = time / 2000;
	object3D.rotation.y = time / 1000;
	//object3D.rotation.z = time / 1000;

	test();

	renderer.render( scene, camera );

}