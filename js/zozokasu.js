import * as THREE from 'three';
/*
class scene{
    constructor(){
        this.renderParam={
            clearColor: 0xFF0000,
            width: document.getElementById('mainCanvas').clientWidth,
            height: document.getElementById('mainCanvas').clientHeight
        };
        this.cameraParam={
            fov:45,
            near:0.01,
            far:1000,
            lookAt: new THREE.Vector3(0,0,0),
            x: 0,
            y: 0,
            z: 4
        };
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.isInitialized = false;

    }
    init(){
        this._setScene();
        this._setRender();
        this._setCamera();
        this.isInitialized = true;

    }
    //写経なう
    _setScene(){
        this.scene = new THREE.Scene();
    }
    _setRender() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
        this.renderer.setSize(this.renderParam.width,this.renderParam.height);
        const wrapper = document.querySelector('#mainCanvas');
        wrapper.appendChild(this.renderer.domElement);
    }
    _setCamera() {
        if(!this.isInitialized){
            this.camera=new THREE.PerspectiveCamera(
                50,
                1,
                this.cameraParam.near,
                this.cameraParam.far
            );
            
            this.camera.position.set(
                this.cameraParam.x,
                this.cameraParam.y,
                this.cameraParam.z
            );
            this.camera.lookAt(this.cameraParam.lookAt);



        }

        const windowWidth = document.getElementById('mainCanvas').clientWidth;
        const windowHeight = document.getElementById('mainCanvas').clientHeight;
        this.camera.aspect = windowWidth / windowHeight;
        this.camera.fov = this.cameraParam.fov;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(windowWidth,windowHeight);
    }
    _render(){
        this.renderer.render(this.scene,this.camera);
    }
    onResize(){
        this._setCamera();
    }

    onRaf(){
        this._render();
    }
    Render(){
        requestAnimationFrame(() => {this.Render();});
        this._render();
    }
}

*/
const width = document.querySelector('#maintitle').clientWidth;
const height = document.querySelector('#maintitle').clientHeight;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#mainCanvas'),
    antialias: true
});

const geometry = new THREE.IcosahedronGeometry(100,1);
const material = new THREE.MeshBasicMaterial({color: 0xa6b5d7, wireframe: true});
const cube = new THREE.Mesh(geometry,material);

const camera  = new THREE.PerspectiveCamera(45,1.0);
camera.aspect= width/height;
camera.updateProjectionMatrix();
camera.position.set(0,0,600)

const scene = new THREE.Scene();
scene.add(cube);

var _lastTime = performance.now();
var _timeNow;
var dT;

function init() {


    
    renderer.setClearColor(0xFFFFFF,1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width,height);
    renderer.render(scene,camera);
}

function update(){
    _timeNow = performance.now();
    dT = (_timeNow - _lastTime)/1000;
    _lastTime = _timeNow;

    renderer.render(scene,camera);
    cube.rotation.x += dT * 2;
    cube.rotation.y += dT;
    requestAnimationFrame(update);

}
update();
console.log(THREE);
console.log(dT)
window.addEventListener('DOMContentLoaded',init);
function resize(){
    const width = document.querySelector('#maintitle').clientWidth;
    const height = document.querySelector('#maintitle').clientHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize);