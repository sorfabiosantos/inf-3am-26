// =====================================================
// 8.4 — Mutabilidade de Objetos
// (freeze, seal, preventExtensions)
// =====================================================
// Domínio: configurações do sistema ACME
// =====================================================

// IMPORTANTE: const vs. mutabilidade
// const impede REATRIBUIR a variável, mas NÃO impede alterar as propriedades do objeto
console.group("const vs. mutabilidade");
const config = {
    appName: "ACME 3AM",
    version: "1.0.0",
    maxUploadSize: 5,
    features: ["dark-mode", "notifications"]
};

config.version = "1.1.0";         // Permitido — altera propriedade
config.newField = "test";         // Permitido — adiciona propriedade
delete config.maxUploadSize;      // Permitido — remove propriedade
// config = {};                    // ERRO! — reatribuição bloqueada pelo const

console.log("config após modificações:", config);
console.groupEnd();

// ----- Object.freeze() -----
console.group("Object.freeze()");
const FROZEN_CONFIG = Object.freeze({
    apiUrl: "http://localhost:8080",
    timeout: 30000,
    retries: 3
});

// FROZEN_CONFIG.timeout = 5000;  // ERRO (strict mode) ou silencioso (não-strict)
// FROZEN_CONFIG.newKey = "val";  // ERRO — não pode adicionar
// delete FROZEN_CONFIG.retries;  // ERRO — não pode remover

console.log(`Está congelado? ${Object.isFrozen(FROZEN_CONFIG)}`); // true
console.log(`timeout: ${FROZEN_CONFIG.timeout}`);                 // 30000 — valor original preservado
console.groupEnd();

// ----- Object.seal() -----
console.group("Object.seal()");
const sealedProduct = Object.seal({
    id: 1,
    name: "Cadeira Gamer",
    price: 1299.90
});

sealedProduct.price = 999.90;     // Permitido — altera valor existente
// sealedProduct.stock = 50;      // ERRO — não pode adicionar
// delete sealedProduct.name;     // ERRO — não pode remover

console.log(`Está selado? ${Object.isSealed(sealedProduct)}`);        // true
console.log(`Aceita extensões? ${Object.isExtensible(sealedProduct)}`);// false
console.log(`price: ${sealedProduct.price}`);                          // 999.90
console.groupEnd();

// ----- Object.preventExtensions() -----
console.group("Object.preventExtensions()");
const restricted = Object.preventExtensions({
    id: 1,
    label: "Categoria"
});

restricted.label = "Nova Categoria"; // Permitido — altera existente
delete restricted.id;                 // Permitido — remove existente
// restricted.nova = "teste";         // ERRO — não pode adicionar

console.log(`Aceita extensões? ${Object.isExtensible(restricted)}`);  // false
console.log("restricted:", restricted); // { label: "Nova Categoria" }
console.groupEnd();

// ----- QUADRO RESUMO -----
console.group("Quadro Resumo");
console.table({
    "Normal":             { Adicionar: "✓", Remover: "✓", Modificar: "✓" },
    "preventExtensions":  { Adicionar: "✗", Remover: "✓", Modificar: "✓" },
    "seal":               { Adicionar: "✗", Remover: "✗", Modificar: "✓" },
    "freeze":             { Adicionar: "✗", Remover: "✗", Modificar: "✗" }
});
console.groupEnd();

// =====================================================
// 🏋️ EXERCÍCIOS — Semana 4
// =====================================================

// 1. Crie `const user = {name: "Ana"}`. Modifique propriedades,
//    adicione novas, delete existentes. Explique por que `const`
//    não impede mutação do objeto.

// 2. Crie um objeto `config` e aplique freeze, seal, preventExtensions.
//    Monte uma tabela comparando o que cada um permite/bloqueia.

// 3. Implemente `deepFreeze(object)` que congela o objeto e TODOS os
//    seus objetos aninhados recursivamente. Teste com 3 níveis.

// 4. Crie objetos representando perfis de usuário:
//    `admin` (pode tudo), `editor` (seal — modifica, não adiciona),
//    `reader` (freeze — somente leitura).

// =====================================================
// RESOLUÇÕES — Semana 4
// =====================================================

{
    console.group("Exercício 1 — const e mutabilidade");
    // const impede trocar a referência, mas não congela as propriedades do objeto.
    const user = { name: "Ana" };
    user.name = "Ana Souza";
    user.age = 22;
    delete user.name;

    console.log("Objeto após alteração, adição e remoção:", user);
    console.log("const protege a referência da variável; as propriedades do objeto continuam mutáveis.");
    console.groupEnd();
}

{
    console.group("Exercício 2 — Comparação dos bloqueios");
    // Reflect retorna true/false para as operações, sem lançar erro em propriedades bloqueadas.
    const baseConfig = { appName: "ACME", version: "1.0.0" };
    const normalConfig = { ...baseConfig };
    const frozenConfig = Object.freeze({ ...baseConfig });
    const sealedConfig = Object.seal({ ...baseConfig });
    const restrictedConfig = Object.preventExtensions({ ...baseConfig });

    console.table({
        Normal: {
            Adicionar: Reflect.set(normalConfig, "mode", "dev"),
            Remover: Reflect.deleteProperty(normalConfig, "version"),
            Modificar: Reflect.set(normalConfig, "appName", "ACME Store")
        },
        preventExtensions: {
            Adicionar: Reflect.set(restrictedConfig, "mode", "dev"),
            Remover: Reflect.deleteProperty(restrictedConfig, "version"),
            Modificar: Reflect.set(restrictedConfig, "appName", "ACME Store")
        },
        seal: {
            Adicionar: Reflect.set(sealedConfig, "mode", "dev"),
            Remover: Reflect.deleteProperty(sealedConfig, "version"),
            Modificar: Reflect.set(sealedConfig, "appName", "ACME Store")
        },
        freeze: {
            Adicionar: Reflect.set(frozenConfig, "mode", "dev"),
            Remover: Reflect.deleteProperty(frozenConfig, "version"),
            Modificar: Reflect.set(frozenConfig, "appName", "ACME Store")
        }
    });
    console.groupEnd();
}

{
    console.group("Exercício 3 — Congelamento profundo");
    function deepFreeze(object, visited = new WeakSet()) {
        if (object === null || (typeof object !== "object" && typeof object !== "function")) {
            return object;
        }
        if (visited.has(object)) return object;
        // O WeakSet também torna a função segura para objetos com referências circulares.
        visited.add(object);

        // Reflect.ownKeys inclui símbolos; descritores evitam executar getters.
        for (const key of Reflect.ownKeys(object)) {
            const descriptor = Object.getOwnPropertyDescriptor(object, key);
            if (descriptor && Object.hasOwn(descriptor, "value")) {
                deepFreeze(descriptor.value, visited);
            }
        }
        return Object.freeze(object);
    }

    const nestedConfig = {
        app: {
            preferences: {
                theme: "dark"
            }
        }
    };
    deepFreeze(nestedConfig);
    console.log(`Raiz congelada: ${Object.isFrozen(nestedConfig)}`);
    console.log(`Nível 2 congelado: ${Object.isFrozen(nestedConfig.app)}`);
    console.log(`Nível 3 congelado: ${Object.isFrozen(nestedConfig.app.preferences)}`);
    console.log(`Alteração profunda aceita: ${Reflect.set(nestedConfig.app.preferences, "theme", "light")}`);
    console.groupEnd();
}

{
    console.group("Exercício 4 — Perfis de usuário");
    // Cada perfil recebe seu próprio objeto para que as restrições não se misturem.
    const createProfile = (role) => ({ name: "Ana", role });
    const admin = createProfile("admin");
    const editor = Object.seal(createProfile("editor"));
    const reader = Object.freeze(createProfile("reader"));

    console.log(`admin pode adicionar: ${Reflect.set(admin, "active", true)}`);
    console.log(`admin pode remover: ${Reflect.deleteProperty(admin, "role")}`);
    console.log(`editor pode modificar: ${Reflect.set(editor, "name", "Ana Silva")}`);
    console.log(`editor pode adicionar: ${Reflect.set(editor, "active", true)}`);
    console.log(`reader pode modificar: ${Reflect.set(reader, "name", "Ana Silva")}`);
    console.log(`reader pode remover: ${Reflect.deleteProperty(reader, "role")}`);
    console.log({ admin, editor, reader });
    console.groupEnd();
}
