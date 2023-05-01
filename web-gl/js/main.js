import * as THREE from 'three';
 
/**
* シーン・カメラ・レンダラーを用意する
*/
// シーンを用意
const scene = new THREE.Scene();
 
// カメラを用意
const camera = new THREE.PerspectiveCamera(
   50,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
);
camera.position.z = 5; // カメラをz軸方向に5ずらす(後ろにずらす)


// レンダラーを用意
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーをwindowのサイズと合わせる
document.body.appendChild(renderer.domElement); // レンダラー(canvas)をbody内に挿入

const boxGeometry  = new  THREE.BoxGeometry(1,1,1);
const icoGeometry = new THREE.IcosahedronGeometry(1,0);

const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0x3da8e6,
});

const  boxMesh = new THREE.Mesh(boxGeometry, lambertMaterial);
scene.add(boxMesh);

const icoMesh = new THREE.Mesh(icoGeometry,lambertMaterial);
scene.add(icoMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(-1,2,4)
scene.add(directionalLight);
// シーンとカメラをレンダラーに読み込ませる(最後に実行するようになっていること)
renderer.render(scene, camera);

function animate(){
    renderer.render(scene, camera);

    boxMesh.rotation.x += 0.01;
    boxMesh.rotation.y += 0.01;

    requestAnimationFrame(animate);
}

animate();