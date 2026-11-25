export default class HttpClientBase {
    constructor(baseUrl) {
        this.baseUrl = baseUrl.replace(/\/+$/, "");
        this.defaultHeaders = {
            "Content-Type": "application/json"
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            ...this.defaultHeaders,
            ...options.headers
        };
        if (typeof FormData !== "undefined" && options.body instanceof FormData) {
            delete headers["Content-Type"];
        }

        const response = await fetch(url, {
            ...options,
            headers
        });

        const contentType = response.headers.get("content-type") ?? "";
        const body = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (!response.ok) {
            const message = typeof body === "object" && body !== null
                ? body.message
                : body;
            throw new Error(message || `HTTP ${response.status}`);
        }

        return body;
    }

    get(endpoint) {
        return this.request(endpoint, { method: "GET" });
    }

    post(endpoint, data) {
        return this.request(endpoint, {
            method: "POST",
            body: typeof FormData !== "undefined" && data instanceof FormData
                ? data
                : JSON.stringify(data)
        });
    }
}
