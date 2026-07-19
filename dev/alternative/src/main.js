import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 1000 );
camera.position.z = 500;
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

const loader = new FBXLoader();
const object3D = await loader.loadAsync( './models/sailboat.fbx' );
scene.add( object3D );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	object3D.rotation.x = time / 2000;
	object3D.rotation.y = time / 1000;

	renderer.render( scene, camera );

}