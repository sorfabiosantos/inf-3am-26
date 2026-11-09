// =====================================================
// 8.3 — Clonagem de Objetos (Shallow Copy & Deep Copy)
// =====================================================
// Domínio: carrinho de compras ACME
//
// NOTA: structuredClone() requer Chrome 98+ / Firefox 94+
// O código abaixo inclui feature detection para navegadores antigos.
// =====================================================

// Objeto com aninhamento — domínio: carrinho de compras
const cart = {
    id: 503,
    customer: "Maria Silva",
    items: [
        { productId: 1, name: "Mouse", price: 89.90, quantity: 2 },
        { productId: 2, name: "Teclado", price: 259.90, quantity: 1 }
    ],
    getTotal() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
};

// ----- SHALLOW COPY (cópia rasa) -----
console.group("Shallow Copy (cópia rasa)");
const shallowCart = { ...cart };

// Alterando o array aninhado AFETA o original (mesma referência!)
shallowCart.items[0].quantity = 99;
console.log(`cart.items[0].quantity (original): ${cart.items[0].quantity}`); // 99 — o original foi alterado!
shallowCart.items.push({ productId: 3, name: "Fone", price: 150, quantity: 1 });
console.log(`cart.items.length (original): ${cart.items.length}`); // 3 — o original também ganhou o item!
console.groupEnd();

// ----- DEEP COPY (cópia profunda) -----
console.group("Deep Copy (cópia profunda)");

// Feature detection para structuredClone
if (typeof structuredClone === "function") {
    console.log("✔ structuredClone() disponível — usando método moderno");

    // structuredClone não aceita funções; clonamos apenas os dados do carrinho.
    const deepCart = structuredClone({
        id: cart.id,
        customer: cart.customer,
        items: cart.items
    });

    // Atenção: structuredClone NÃO copia funções
    console.log(`Tipo de getTotal após structuredClone: ${typeof deepCart.getTotal}`); // "undefined"

    deepCart.items[0].quantity = 5;
    console.log(`cart.items[0].quantity (original): ${cart.items[0].quantity}`);     // 99 — preservado
    console.log(`deepCart.items[0].quantity (cópia): ${deepCart.items[0].quantity}`); // 5 — independente
} else {
    console.warn("⚠ structuredClone() não disponível — use JSON.parse(JSON.stringify()) como fallback.");
}

console.groupEnd();

// Método 2: JSON.parse(JSON.stringify()) (clássico, com limitações)
console.group("JSON.parse(JSON.stringify())");
const jsonCart = JSON.parse(JSON.stringify(cart));
jsonCart.items[0].quantity = 10;
console.log(`cart.items[0].quantity (original): ${cart.items[0].quantity}`);     // 99 — preservado
console.log(`jsonCart.items[0].quantity (cópia): ${jsonCart.items[0].quantity}`); // 10 — independente
console.groupEnd();

// Limitações do JSON: funções, undefined, Date viram string
console.group("Limitações do JSON");
console.log(`getTotal foi perdido? ${typeof jsonCart.getTotal}`); // "undefined"
console.groupEnd();

// ----- COMPARAÇÃO VISUAL -----
console.group("Comparação final");
console.log("Original items:", cart.items);
console.log("Shallow items:", shallowCart.items);      // mesmo array do original!
console.log("JSON items:", jsonCart.items);             // array independente
console.groupEnd();

// =====================================================
// 🏋️ EXERCÍCIOS — Semana 3
// =====================================================

// 1. Crie `person` com `name`, `age` e `address: {street, city}`.
//    Faça shallow copy ({...spread}) e deep copy (structuredClone).
//    Modifique `address.city` em cada e observe o comportamento.

// 2. Crie `user` com birthdate (new Date()), calculateAge() e uma
//    propriedade `undefined`. Clone com JSON.parse(JSON.stringify())
//    e identifique o que foi perdido.

// 3. Implemente os 3 métodos de clonagem (spread, structuredClone, JSON)
//    em objetos com diferentes características. Monte uma tabela comparativa.

// 4. Crie `cloneWithoutSensitive(object)` que faz deep copy mas REMOVE
//    propriedades como `password`, `ssn`, `creditCard` antes de retornar.

// =====================================================
// RESOLUÇÕES — Semana 3
// =====================================================

{
    console.group("Exercício 1 — Cópia rasa e profunda");
    // A cópia rasa compartilha referências aninhadas; a profunda cria objetos independentes.
    const person = {
        name: "Ana",
        age: 28,
        address: { street: "Rua das Flores", city: "Pelotas" }
    };
    const shallowPerson = { ...person };
    const deepPerson = typeof structuredClone === "function"
        ? structuredClone(person)
        : null;

    shallowPerson.address.city = "Porto Alegre";
    console.log(`Cidade no original após alterar shallow copy: ${person.address.city}`);

    if (deepPerson) {
        deepPerson.address.city = "Rio Grande";
        console.log(`Cidade na deep copy: ${deepPerson.address.city}`);
        console.log(`Cidade no original após alterar deep copy: ${person.address.city}`);
    } else {
        console.warn("structuredClone() indisponível; a cópia profunda não foi executada.");
    }
    console.groupEnd();
}

{
    console.group("Exercício 2 — Limitações de JSON na clonagem");
    // JSON serializa Date como texto e descarta funções e propriedades undefined.
    const user = {
        name: "Maria",
        birthdate: new Date("1998-04-15T00:00:00.000Z"),
        nickname: undefined,
        calculateAge() {
            const today = new Date();
            let age = today.getFullYear() - this.birthdate.getFullYear();
            const beforeBirthday = today.getMonth() < this.birthdate.getMonth()
                || (today.getMonth() === this.birthdate.getMonth() && today.getDate() < this.birthdate.getDate());
            if (beforeBirthday) age--;
            return age;
        }
    };

    const jsonUser = JSON.parse(JSON.stringify(user));
    console.log(`Idade original: ${user.calculateAge()}`);
    console.log(`Tipo de birthdate original: ${typeof user.birthdate} (${user.birthdate instanceof Date ? "Date" : "não Date"})`);
    console.log(`Tipo de birthdate clonado: ${typeof jsonUser.birthdate}`);
    console.log(`calculateAge preservado: ${typeof jsonUser.calculateAge}`);
    console.log(`nickname existe no clone: ${Object.hasOwn(jsonUser, "nickname")}`);
    console.groupEnd();
}

{
    console.group("Exercício 3 — Comparação dos métodos de clonagem");
    // Usamos dados compatíveis com structuredClone para comparar as três técnicas.
    const cloneableData = {
        name: "Pedido ACME",
        details: { status: "pago" },
        createdAt: new Date("2026-01-10T12:00:00.000Z"),
        optional: undefined
    };
    const spreadCopy = { ...cloneableData };
    const structuredCopy = typeof structuredClone === "function"
        ? structuredClone(cloneableData)
        : null;
    const jsonCopy = JSON.parse(JSON.stringify(cloneableData));

    console.log(`Spread compartilha objeto aninhado: ${spreadCopy.details === cloneableData.details}`);
    console.log(`JSON mantém Date como Date: ${jsonCopy.createdAt instanceof Date}`);
    console.log(`JSON mantém undefined: ${Object.hasOwn(jsonCopy, "optional")}`);
    if (structuredCopy) {
        console.log(`structuredClone mantém Date como Date: ${structuredCopy.createdAt instanceof Date}`);
        console.log(`structuredClone mantém undefined: ${Object.hasOwn(structuredCopy, "optional")}`);
        console.log(`structuredClone copia objeto aninhado: ${structuredCopy.details !== cloneableData.details}`);
    } else {
        console.warn("structuredClone() indisponível neste navegador.");
    }

    const functionData = { value: 1, getValue() { return this.value; } };
    const spreadFunctionCopy = { ...functionData };
    const jsonFunctionCopy = JSON.parse(JSON.stringify(functionData));
    console.log(`Spread mantém função: ${typeof spreadFunctionCopy.getValue}`);
    console.log(`JSON mantém função: ${typeof jsonFunctionCopy.getValue}`);
    console.table([
        { método: "Spread", profundidade: "Rasa", Date: "Mantém referência", undefined: "Mantém", funções: "Mantém referência" },
        { método: "structuredClone", profundidade: "Profunda", Date: "Copia como Date", undefined: "Mantém", funções: "Não suporta" },
        { método: "JSON", profundidade: "Profunda (JSON)", Date: "Converte em string", undefined: "Remove", funções: "Remove" }
    ]);
    console.groupEnd();
}

{
    console.group("Exercício 4 — Cópia sem dados sensíveis");
    function cloneWithoutSensitive(object) {
        // A cópia é feita antes da remoção para preservar o objeto recebido.
        const clone = typeof structuredClone === "function"
            ? structuredClone(object)
            : JSON.parse(JSON.stringify(object));
        const sensitiveKeys = new Set(["password", "ssn", "creditCard"]);
        const visited = new WeakSet();

        function removeSensitiveProperties(value) {
            if (value === null || typeof value !== "object" || visited.has(value)) return;
            // O conjunto evita recursão infinita em estruturas com referências circulares.
            visited.add(value);

            // A busca recursiva remove os mesmos nomes de propriedade em todos os níveis.
            for (const key of Object.keys(value)) {
                if (sensitiveKeys.has(key)) {
                    delete value[key];
                } else {
                    removeSensitiveProperties(value[key]);
                }
            }
        }

        removeSensitiveProperties(clone);
        return clone;
    }

    const customer = {
        name: "João",
        password: "not-for-output",
        profile: {
            ssn: "000-00-0000",
            preferences: { theme: "dark" }
        },
        payment: [{ creditCard: "0000-0000-0000-0000", lastFour: "0000" }]
    };
    const safeCustomer = cloneWithoutSensitive(customer);

    console.log("Cópia segura:", safeCustomer);
    console.log(`Original preservado: ${Object.hasOwn(customer, "password") && Object.hasOwn(customer.profile, "ssn")}`);
    console.log(`Cópia independente: ${safeCustomer.profile !== customer.profile}`);
    console.groupEnd();
}
