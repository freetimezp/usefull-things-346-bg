import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

const base =
    (import.meta.env && import.meta.env.BASE_URL) !== undefined ? import.meta.env.BASE_URL : "/usefull-things-346-bg/";

export function initParallax(scene, camera) {
    const group = new THREE.Group();
    scene.add(group);

    // 🔥 BACKGROUND IMAGE
    const textureLoader = new THREE.TextureLoader();

    let PATH_URL_IMAGE_BG = base + "assets/images/banner.jpg";
    const bgTexture = textureLoader.load(PATH_URL_IMAGE_BG);

    const bgGeo = new THREE.PlaneGeometry(20, 10);
    const bgMat = new THREE.MeshBasicMaterial({
        map: bgTexture,
        transparent: true,
        opacity: 0.6,
    });

    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.z = -5; // far behind particles
    scene.add(bgMesh);

    // particles
    for (let i = 0; i < 50; i++) {
        const geo = new THREE.SphereGeometry(0.1, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(geo, mat);

        mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);

        group.add(mesh);
    }

    let mouse = { x: 0, y: 0 };

    window.onmousemove = (e) => {
        mouse.x = e.clientX / window.innerWidth - 0.5;
        mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    return () => {
        group.rotation.y += 0.001;

        // subtle parallax on bg
        bgMesh.position.x = mouse.x * 0.5;
        bgMesh.position.y = -mouse.y * 0.5;
        bgMesh.position.z = -7;

        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;

        camera.lookAt(scene.position);
    };
}
