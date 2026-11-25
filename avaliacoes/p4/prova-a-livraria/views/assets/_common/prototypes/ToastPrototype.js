const ToastPrototype = {
    init(element) {
        if (!element || typeof element.setAttribute !== "function") {
            throw new TypeError("O elemento do toast é obrigatório.");
        }

        this.element = element;
        this.timeoutId = null;
        return this;
    },

    show(message, type = "success") {
        if (!this.element) {
            throw new Error("O toast ainda não foi inicializado.");
        }
        if (typeof message !== "string" || message.trim() === "") {
            throw new TypeError("A mensagem do toast não pode ficar vazia.");
        }
        if (!["success", "error"].includes(type)) {
            throw new RangeError("O tipo do toast deve ser success ou error.");
        }

        window.clearTimeout(this.timeoutId);
        this.element.textContent = message;
        this.element.dataset.type = type;
        this.element.setAttribute("role", type === "error" ? "alert" : "status");
        this.element.setAttribute("aria-live", type === "error" ? "assertive" : "polite");
        this.element.hidden = false;
        this.timeoutId = window.setTimeout(() => this.hide(), 5000);
    },

    hide() {
        if (!this.element) {
            throw new Error("O toast ainda não foi inicializado.");
        }

        window.clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.element.hidden = true;
        this.element.textContent = "";
        delete this.element.dataset.type;
    }
};

export default ToastPrototype;
