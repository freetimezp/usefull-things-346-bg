import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { initParallax } from "./modes/parallax.js";
import { initHologram } from "./modes/hologram.js";
import { initTrendy } from "./modes/trendy.js";

const canvas = document.getElementById("webgl");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true, // 👈 important
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0); // transparent

let currentMode = null;

function clearScene(scene) {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

let updateFn = () => {};

const cardsContainer = document.querySelector(".cards");

const orbitMenu = document.getElementById("orbitMenu");
const orbitItems = document.querySelectorAll(".orbit-item");

function switchMode(mode) {
    clearScene(scene);

    cardsContainer.style.display = "none";
    orbitMenu.classList.remove("active");

    if (mode === "parallax") {
        updateFn = initParallax(scene, camera);
    }

    if (mode === "hologram") {
        cardsContainer.style.display = "flex";
        updateFn = initHologram(scene, camera);
    }

    if (mode === "trendy") {
        updateFn = initTrendy(scene, camera);

        orbitMenu.classList.add("active");
    }
}

switchMode("parallax");

document.querySelectorAll(".switch").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        switchMode(btn.dataset.mode);
    });
});

function animate() {
    requestAnimationFrame(animate);
    updateFn();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

//form
const contactBtn = document.getElementById("contactBtn");
const overlay = document.getElementById("contactOverlay");
const closeBtn = document.getElementById("closeForm");

contactBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
});

/* optional: close on ESC */
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});

//cards
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
});

//trends
orbitItems.forEach((item) => {
    item.addEventListener("click", () => {
        const mode = item.dataset.mode;

        if (mode) {
            document.querySelector(".active").classList.remove("active");
            document.querySelector(`[data-mode="${mode}"]`).classList.add("active");

            switchMode(mode);
        }
    });
});

// contact button
document.getElementById("orbitContact").addEventListener("click", () => {
    overlay.classList.add("active");
});
