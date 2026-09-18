"use strict";

// Parte 1: use estes dados para criar workshopPrototype e suas instancias.
const workshopData = [
    { id: 1, title: "Objetos e prototipos", description: "Crie objetos reutilizaveis e compreenda a cadeia de prototipos.", level: "Intermediario", duration: 90, instructorId: 1 },
    { id: 2, title: "Classes modernas", description: "Modele entidades com class, extends e super.", level: "Intermediario", duration: 75, instructorId: 2 },
    { id: 3, title: "JavaScript no navegador", description: "Organize eventos e atualizacoes de uma interface.", level: "Iniciante", duration: 60, instructorId: 1 },
    { id: 4, title: "Arquitetura frontend", description: "Separe dados, dominio e renderizacao em uma aplicacao.", level: "Avancado", duration: 105, instructorId: 3 }
];

const instructorData = [
    { id: 1, name: "Ana Souza", specialty: "JavaScript" },
    { id: 2, name: "Bruno Lima", specialty: "Arquitetura" },
    { id: 3, name: "Carla Mendes", specialty: "Frontend" }
];

const toastPrototype = {
    show(message, type = "success") {
        const element = document.querySelector("[data-toast]");
        if (!element) return;
        element.textContent = message;
        element.className = `toast is-visible is-${type}`;
        window.clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => element.classList.remove("is-visible"), 3500);
    }
};

// Parte 1 - crie workshopPrototype, os workshops e as evidencias solicitadas.

// Parte 2 - implemente Instructor, Workshop e WorkshopCatalog.
// Os metodos devem ser definidos no prototipo das instancias.

const state = { instructors: [], workshops: [], selectedInstructorId: "", term: "" };
const instructorFilter = document.querySelector("#instructor-filter");
const workshopFilter = document.querySelector("#workshop-filter");
const catalogStatus = document.querySelector("#catalog-status");
const workshopList = document.querySelector("#workshop-list");
const workshopDetail = document.querySelector("#workshop-detail");
const toast = Object.create(toastPrototype);

function renderWorkshops() {
    // TODO: use o catalogo, os filtros de state e renderize cards com botoes.
    workshopList.innerHTML = '<p class="empty">Implemente a renderizacao das oficinas.</p>';
    catalogStatus.textContent = "Aguardando implementacao";
}

function renderInstructors() {
    // TODO: transforme instructorData em Instructor e preencha o select.
    instructorFilter.innerHTML = '<option value="">Todos os instrutores</option>';
}

function showWorkshopDetail(workshopId) {
    // TODO: encontre a oficina e mostre sua ementa no painel.
    void workshopId;
    workshopDetail.innerHTML = '<p class="empty">Implemente os detalhes da oficina.</p>';
}

function initialize() {
    // TODO: crie as entidades, o catalogo e a primeira renderizacao.
    catalogStatus.textContent = "Implemente a inicializacao do catalogo.";
}

instructorFilter.addEventListener("change", () => {
    state.selectedInstructorId = instructorFilter.value;
    renderWorkshops();
});

workshopFilter.addEventListener("input", () => {
    state.term = workshopFilter.value;
    renderWorkshops();
});

workshopList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-workshop-id]");
    if (button) showWorkshopDetail(button.dataset.workshopId);
});

initialize();
