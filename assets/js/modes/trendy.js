import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export function initTrendy(scene) {
    const geo = new THREE.IcosahedronGeometry(2, 20);
    const mat = new THREE.MeshNormalMaterial({
        wireframe: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let t = 0;

    return () => {
        t += 0.01;
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        mesh.scale.setScalar(1 + Math.sin(t) * 0.2);
    };
}
