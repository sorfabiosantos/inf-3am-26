import BooksService from "./_common/classes/BooksService.js";
import CatalogService from "./_common/classes/CatalogService.js";
import ToastPrototype from "./_common/prototypes/ToastPrototype.js";
import { mockBooks } from "./data/mock-books.js";

const apiBaseUrl = new URL("api", window.location.href).toString().replace(/\/+$/, "");
const booksService = new BooksService(apiBaseUrl);
const catalogService = new CatalogService(apiBaseUrl);
const booksList = document.querySelector("#books-list");
const booksStatus = document.querySelector("#books-status");
const catalogStatus = document.querySelector("#catalog-status");
const formStatus = document.querySelector("#form-status");
const bookForm = document.querySelector("#book-form");
const toast = Object.create(ToastPrototype);
toast.init(document.querySelector("#toast"));

let books = [...mockBooks];

document.querySelector("#test-success-toast").addEventListener("click", () => {
    toast.show("Mensagem de sucesso de teste.", "success");
});

document.querySelector("#test-error-toast").addEventListener("click", () => {
    toast.show("Mensagem de erro de teste.", "error");
});

function setStatus(element, message, state = "info") {
    element.textContent = message;
    element.dataset.state = state;
}

function renderBooks(items) {
    booksList.replaceChildren();

    if (items.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Nenhum livro encontrado.";
        booksList.append(emptyMessage);
        return;
    }

    for (const book of items) {
        const card = document.createElement("article");
        card.className = "book-card";

        const title = document.createElement("h3");
        title.textContent = book.title;
        card.append(title);

        const details = [
            `Autor: ${book.author}`,
            `Gênero: ${book.genre_name}`,
            `Editora: ${book.publisher_name}`,
            `Fornecedor: ${book.supplier_name}`,
            `ISBN: ${book.isbn}`,
            `Preço: ${Number(book.price).toFixed(2)}`,
            `Estoque: ${book.stock}`
        ];

        for (const detail of details) {
            const paragraph = document.createElement("p");
            paragraph.textContent = detail;
            card.append(paragraph);
        }

        booksList.append(card);
    }
}

function fillSelect(select, items, selectedLabel) {
    select.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = selectedLabel;
    select.append(placeholder);

    for (const item of items) {
        const option = document.createElement("option");
        option.value = String(item.id);
        option.textContent = item.name;
        select.append(option);
    }
}

async function loadCatalogs() {
    setStatus(catalogStatus, "Carregando gêneros, fornecedores e editoras…");
    try {
        const [genres, suppliers, publishers] = await Promise.all([
            catalogService.listGenres(),
            catalogService.listSuppliers(),
            catalogService.listPublishers()
        ]);
        if (![genres, suppliers, publishers].every(result => Array.isArray(result.data))) {
            throw new Error("A API retornou um formato inesperado para as opções.");
        }

        fillSelect(document.querySelector("#genre-select"), genres.data, "Selecione um gênero");
        fillSelect(document.querySelector("#supplier-select"), suppliers.data, "Selecione um fornecedor");
        fillSelect(document.querySelector("#publisher-select"), publishers.data, "Selecione uma editora");
        setStatus(catalogStatus, "Opções carregadas do banco de dados.", "success");
    } catch (error) {
        const message = `Falha ao carregar as opções: ${error.message}`;
        setStatus(catalogStatus, message, "error");
        toast.show(message, "error");
    }
}

async function loadBooksFromApi() {
    setStatus(booksStatus, "Carregando livros da API…");
    try {
        const result = await booksService.listAll();
        if (!Array.isArray(result.data)) {
            throw new Error("A resposta da API não contém uma lista de livros.");
        }

        books = result.data;
        renderBooks(books);
        setStatus(
            booksStatus,
            books.length === 0 ? "A API não encontrou livros." : `${books.length} livro(s) carregado(s) da API.`,
            "success"
        );
    } catch (error) {
        const message = `Não foi possível carregar os livros: ${error.message}`;
        setStatus(booksStatus, message, "error");
        toast.show(message, "error");
    }
}

document.querySelector("#reload-books").addEventListener("click", loadBooksFromApi);

bookForm.addEventListener("submit", async event => {
    event.preventDefault();
    setStatus(formStatus, "Salvando livro…");

    const formData = new FormData(bookForm);
    for (const field of ["title", "author", "isbn"]) {
        formData.set(field, String(formData.get(field)).trim());
    }

    try {
        await booksService.create(formData);
        bookForm.reset();
        setStatus(formStatus, "Livro cadastrado com sucesso.", "success");
        toast.show("Livro cadastrado com sucesso.", "success");
        await loadBooksFromApi();
    } catch (error) {
        const message = `Não foi possível cadastrar o livro: ${error.message}`;
        setStatus(formStatus, message, "error");
        toast.show(message, "error");
    }
});

renderBooks(books);
loadCatalogs();
