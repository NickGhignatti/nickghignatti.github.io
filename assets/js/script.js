'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (filterItems[i].dataset.category.includes(selectedValue)) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }

    }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;

    });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }

    });
}

formBtn.addEventListener("click", function () {
    let subject = formInputs[0].value;
    let body = formInputs[1].value;
    window.open('mailto:nick.ghignatti@gmail.com?subject=' + subject + '&body=' + body);
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {

        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }

    });
}

// Globe
// Setup base della scena

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Renderer che verrà inserito nel div "globe-container"
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Creazione del globo: una sfera wireframe
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true,
});
const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(globe);

// Funzione per convertire coordinate latitudine/longitudine in vettori 3D
function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
}

// Array di skill con relative coordinate
const skills = [
    {name: "HTML", lat: 10, lon: 20},
    {name: "CSS", lat: 15, lon: 40},
    {name: "JavaScript", lat: 30, lon: -60},
    {name: "Three.js", lat: -20, lon: 80},
    // Aggiungi altre skill se necessario
];

const points = [];
const pointMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const pointGeometry = new THREE.SphereGeometry(0.2, 8, 8);

// Creazione dei punti sulla superficie del globo
skills.forEach(skill => {
    const pos = latLonToVector3(skill.lat, skill.lon, 5);
    const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
    pointMesh.position.copy(pos);
    scene.add(pointMesh);
    points.push({name: skill.name, position: pos});
});

// Collegamento tra i punti: in questo esempio, tutti collegati tra loro
const lineMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            points[i].position,
            points[j].position,
        ]);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
    }
}

// Posizionamento della camera
camera.position.z = 15;

// Loop di animazione: ruota il globo
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();

// Gestione del ridimensionamento della finestra
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});