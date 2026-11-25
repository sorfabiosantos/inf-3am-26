import HttpClientBase from "./HttpClientBase.js";

export default class BooksService extends HttpClientBase {
    async listAll() {
        throw new Error("Implemente a consulta GET /books.");
    }

    async create(formData) {
        throw new Error("Implemente o envio dos campos do formulário para POST /books.");
    }
}
