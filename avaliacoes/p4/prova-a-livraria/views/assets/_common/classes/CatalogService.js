import HttpClientBase from "./HttpClientBase.js";

export default class CatalogService extends HttpClientBase {
    listGenres() {
        return this.get("/genres");
    }

    listSuppliers() {
        return this.get("/suppliers");
    }

    listPublishers() {
        return this.get("/publishers");
    }
}
