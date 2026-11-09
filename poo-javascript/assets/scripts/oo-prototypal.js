// =====================================================
// 8.1 — Orientação a Objetos Prototípica
// =====================================================
// Domínio: produtos do sistema ACME
//
// NOTA: __proto__ é mostrado aqui para fins didáticos,
// mas é considerado obsoleto. Em código real, prefira
// Object.getPrototypeOf() e Object.setPrototypeOf().
//
// Para verificar se uma propriedade é do próprio objeto,
// use Object.hasOwn(obj, prop) (ES2022) no lugar de
// obj.hasOwnProperty(prop) — mais seguro contra shadowing.
// =====================================================

// 1. Todo objeto literal herda de Object.prototype
{
    const product = {
        id: 1,
        name: "Teclado Mecânico",
        price: 299.90
    };

    console.group("1. Todo objeto herda de Object.prototype");
    console.log(`typeof product: ${typeof product}`);
    console.log(`Object.getPrototypeOf(product) === Object.prototype: ${Object.getPrototypeOf(product) === Object.prototype}`);
    console.log(`product.__proto__ === Object.prototype: ${product.__proto__ === Object.prototype}`);
    console.groupEnd();
}

// 2. A cadeia de protótipos
console.group("2. Cadeia de protótipos");
console.log(`Object.getPrototypeOf(Object.prototype): ${Object.getPrototypeOf(Object.prototype)}`); // null — fim da cadeia
console.groupEnd();

// 3. Objetos especializados também seguem a mesma lógica
{
    const ids = [1, 2, 3];

    console.group("3. Objetos especializados");
    console.log(`Object.getPrototypeOf(ids) === Array.prototype: ${Object.getPrototypeOf(ids) === Array.prototype}`);
    console.log(`Object.getPrototypeOf(Array.prototype) === Object.prototype: ${Object.getPrototypeOf(Array.prototype) === Object.prototype}`);
    console.groupEnd();
}

// 4. Até funções são objetos com protótipo
{
    function sum(a, b) { return a + b; }

    console.group("4. Funções são objetos");
    console.log(`Object.getPrototypeOf(sum) === Function.prototype: ${Object.getPrototypeOf(sum) === Function.prototype}`);
    console.groupEnd();
}

// 5. Delegação de propriedades ao protótipo
console.group("5. Delegação de propriedades");

const baseProduct = {
    getFormattedPrice() {
        return `R$ ${this.price.toFixed(2)}`;
    }
};

const mouse = Object.create(baseProduct);
mouse.id = 2;
mouse.name = "Mouse Gamer";
mouse.price = 189.90;

console.log(`mouse.getFormattedPrice(): ${mouse.getFormattedPrice()}`); // "R$ 189.90" — herdado do protótipo

// Verificando propriedades próprias vs. herdadas
console.log(`name é própria? (hasOwnProperty): ${mouse.hasOwnProperty("name")}`);
console.log(`getFormattedPrice é própria? (hasOwnProperty): ${mouse.hasOwnProperty("getFormattedPrice")}`);

// ES2022+: forma moderna e mais segura de verificar propriedade própria
console.log(`name é própria? (Object.hasOwn): ${Object.hasOwn(mouse, "name")}`);
console.log(`getFormattedPrice é própria? (Object.hasOwn): ${Object.hasOwn(mouse, "getFormattedPrice")}`);
console.groupEnd();

// =====================================================
// 🏋️ EXERCÍCIOS — Semana 1
// =====================================================

// 1. Crie um objeto `person` com `name`, `age` e método `introduce()`
//    que retorna "Olá, me chamo [nome] e tenho [idade] anos".
//    Depois crie 3 objetos herdando de `person` via Object.create().       

// 2. Crie uma cadeia: Vehicle → Car → myCar.
//    Cada nível adiciona propriedades/métodos.
//    Use Object.getPrototypeOf() para verificar a cadeia.

// 3. Crie um objeto `student` com protótipo contendo `calculateAverage()`.
//    No filho, adicione `grade` que sombreia `grade` do protótipo.
//    Use Object.hasOwn() para comprovar.

// 4. Crie `library` e dois `book` herdando dele.
//    Adicione `renewCatalog()` ao protótipo DEPOIS de criar os livros.
//    Demonstre que ambos passam a ter o método.

// =====================================================
// RESOLUÇÕES — Semana 1
// =====================================================

{
    console.group("Exercício 1 — Herança de person");
    // Object.create faz cada pessoa delegar ao mesmo objeto de métodos.
    const person = {
        name: "",
        age: 0,
        introduce() {
            return `Olá, me chamo ${this.name} e tenho ${this.age} anos`;
        }
    };

    const people = [
        { name: "Ana", age: 22 },
        { name: "Bruno", age: 30 },
        { name: "Carla", age: 25 }
    ].map((data) => Object.assign(Object.create(person), data));

    people.forEach((individual) => console.log(individual.introduce()));
    console.log(`Método herdado: ${!Object.hasOwn(people[0], "introduce")}`);
    console.groupEnd();
}

{
    console.group("Exercício 2 — Vehicle → Car → myCar");
    // Cada objeto estende o anterior; myCar recebe propriedades e métodos pela cadeia.
    const Vehicle = {
        type: "vehicle",
        start() {
            return `${this.model} ligado.`;
        }
    };

    const Car = Object.create(Vehicle);
    Car.wheels = 4;
    Car.drive = function () {
        return `${this.model} está dirigindo.`;
    };

    const myCar = Object.create(Car);
    myCar.model = "Civic";
    myCar.year = 2024;

    console.log(myCar.start());
    console.log(myCar.drive());
    console.log(`myCar → Car: ${Object.getPrototypeOf(myCar) === Car}`);
    console.log(`Car → Vehicle: ${Object.getPrototypeOf(Car) === Vehicle}`);
    console.log(`Rodas herdadas: ${myCar.wheels}`);
    console.groupEnd();
}

{
    console.group("Exercício 3 — Sombreamento de propriedade");
    // Atribuir grade cria uma propriedade própria que tem precedência sobre a herdada.
    const studentPrototype = {
        grade: 7,
        calculateAverage() {
            return this.grade;
        }
    };

    const student = Object.create(studentPrototype);
    student.grade = 9.5;

    console.log(`Média do student: ${student.calculateAverage()}`);
    console.log(`Nota do protótipo: ${studentPrototype.grade}`);
    console.log(`grade é própria do student: ${Object.hasOwn(student, "grade")}`);
    console.log(`calculateAverage é própria: ${Object.hasOwn(student, "calculateAverage")}`);
    console.groupEnd();
}

{
    console.group("Exercício 4 — Método adicionado em runtime");
    // A cadeia é dinâmica: livros já criados também enxergam novos métodos do protótipo.
    const library = {
        catalog: []
    };
    const book1 = Object.create(library);
    book1.title = "Clean Code";
    const book2 = Object.create(library);
    book2.title = "Refactoring";

    library.renewCatalog = function () {
        // Cada livro cria seu próprio catálogo em vez de compartilhar o array herdado.
        this.catalog = [this.title, "(catálogo renovado)"];
        return this.catalog;
    };

    console.log(`book1: ${book1.renewCatalog().join(" ")}`);
    console.log(`book2: ${book2.renewCatalog().join(" ")}`);
    console.log(`Método é herdado: ${!Object.hasOwn(book1, "renewCatalog")}`);
    console.groupEnd();
}
