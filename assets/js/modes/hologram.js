import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export function initHologram(scene) {
    const geo = new THREE.PlaneGeometry(10, 10, 50, 50);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x009666, // 960066, 006696, 960030
        wireframe: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    return () => {
        mesh.rotation.z += 0.002;
    };
}
