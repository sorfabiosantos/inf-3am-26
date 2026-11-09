// =====================================================
// 8.6 — Funções Construtoras e class
// (new, prototype, instanceof, class, extends, super)
// =====================================================
// Domínio: Produtos do sistema ACME
//
// NOVIDADES ES2022+ nesta aula:
// - #private fields (campos verdadeiramente privados)
// - Static initialization blocks (blocos de inicialização estática)
//
// NOTA SOBRE ARROW FUNCTIONS EM CLASSES:
// Arrow functions como campos de classe (class fields) têm `this`
// automaticamente vinculado à instância — por isso são seguras:
//
//   class Example {
//     value = 10;
//     method = () => this.value;   // ✔ `this` é a instância (léxico do constructor)
//   }
//
// Mas em métodos normais (prototype), NÃO use arrow functions:
//
//   Example.prototype.bad = () => this.value; // ❌ `this` não é a instância!
// =====================================================

// ==========================================
// VERSÃO 1: Função construtora (estilo ES5)
// ==========================================

console.group("1. Função construtora (ES5)");

function ProductConstructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.active = true;
}

ProductConstructor.prototype.getInfo = function () {
    return `${this.name} — R$ ${this.price.toFixed(2)}`;
};

ProductConstructor.prototype.deactivate = function () {
    this.active = false;
    return this;
};

ProductConstructor.comparePrices = function (a, b) {
    return a.price - b.price;
};

const p1 = new ProductConstructor(1, "Mouse", 89.90);
const p2 = new ProductConstructor(2, "Teclado", 259.90);

console.log(`p1.getInfo(): ${p1.getInfo()}`);
console.log(`p2.getInfo(): ${p2.getInfo()}`);
console.log(`p1 instanceof ProductConstructor? ${p1 instanceof ProductConstructor}`);
console.log(`Métodos compartilhados? ${p1.getInfo === p2.getInfo}`);
console.groupEnd();

// ==========================================
// VERSÃO 2: class (ES6) — syntactic sugar
// ==========================================

console.group("2. class (ES6) — syntactic sugar");

class ProductClass {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.active = true;
    }

    getInfo() {
        return `${this.name} — R$ ${this.price.toFixed(2)}`;
    }

    deactivate() {
        this.active = false;
        return this;
    }

    static comparePrices(a, b) {
        return a.price - b.price;
    }
}

const p3 = new ProductClass(3, "Monitor", 899.90);
console.log(`p3.getInfo(): ${p3.getInfo()}`);
console.log(`p3 instanceof ProductClass? ${p3 instanceof ProductClass}`);

// PROVA de que class é syntax sugar — por baixo ainda é função + prototype!
console.log(`typeof ProductClass: ${typeof ProductClass}`);                    // "function"
console.log(`typeof ProductConstructor: ${typeof ProductConstructor}`);        // "function"
console.log(`p3.__proto__ === ProductClass.prototype? ${Object.getPrototypeOf(p3) === ProductClass.prototype}`);
console.groupEnd();

// ==========================================
// Herança com funções construtoras
// ==========================================

console.group("3. Herança com funções construtoras");

function DigitalProductConstructor(id, name, price, fileSizeMB) {
    ProductConstructor.call(this, id, name, price);
    this.fileSizeMB = fileSizeMB;
    this.downloadable = true;
}

DigitalProductConstructor.prototype = Object.create(ProductConstructor.prototype);
DigitalProductConstructor.prototype.constructor = DigitalProductConstructor;

DigitalProductConstructor.prototype.getDownloadInfo = function () {
    return `${this.name} (${this.fileSizeMB} MB) — Download imediato`;
};

const digital = new DigitalProductConstructor(10, "Curso de PHP", 99.90, 1200);
console.log(`getInfo(): ${digital.getInfo()}`);
console.log(`getDownloadInfo(): ${digital.getDownloadInfo()}`);
console.log(`instanceof DigitalProductConstructor? ${digital instanceof DigitalProductConstructor}`);
console.log(`instanceof ProductConstructor? ${digital instanceof ProductConstructor}`);
console.groupEnd();

// ==========================================
// Herança com class
// ==========================================

console.group("4. Herança com class");

class DigitalProductClass extends ProductClass {
    constructor(id, name, price, fileSizeMB) {
        super(id, name, price);
        this.fileSizeMB = fileSizeMB;
        this.downloadable = true;
    }

    getDownloadInfo() {
        return `${this.name} (${this.fileSizeMB} MB) — Download imediato`;
    }
}

const digital2 = new DigitalProductClass(11, "Curso de JS", 199.90, 4500);
console.log(`getInfo(): ${digital2.getInfo()}`);
console.log(`getDownloadInfo(): ${digital2.getDownloadInfo()}`);
console.groupEnd();

// ==========================================
// #PRIVATE FIELDS (ES2022)
// ==========================================

console.group("5. #private fields (ES2022)");

class Account {
    #balance = 0;

    static #minDeposit;
    static {
        this.#minDeposit = 10;
        console.log(`Static init: depósito mínimo = R$ ${this.#minDeposit}`);
    }

    constructor(owner, initialBalance = 0) {
        this.owner = owner;
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount <= 0) {
            console.log("Valor de depósito inválido.");
            return;
        }
        this.#balance += amount;
        this.#logTransaction("Depósito", amount);
        console.log(`Depósito de R$ ${amount.toFixed(2)}. Saldo: R$ ${this.#balance.toFixed(2)}`);
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            console.log("Saldo insuficiente.");
            return;
        }
        this.#balance -= amount;
        this.#logTransaction("Saque", amount);
        console.log(`Saque de R$ ${amount.toFixed(2)}. Saldo: R$ ${this.#balance.toFixed(2)}`);
    }

    get balance() {
        return this.#balance;
    }

    #logTransaction(type, amount) {
        console.log(`[PRIVADO] ${type}: R$ ${amount.toFixed(2)}`);
    }
}

const conta = new Account("Maria", 500);
conta.deposit(200);
conta.withdraw(150);
console.log(`Saldo via getter: ${conta.balance}`);
console.log(`owner (público): ${conta.owner}`);

// conta.#balance = 1000;   // ❌ ERRO! Private field não acessível fora da classe
// conta.#logTransaction(); // ❌ ERRO! Private method não acessível fora da classe
console.groupEnd();

// ==========================================
// Symbol — Propriedade "semi-privada" (pré-ES2022)
// ==========================================

console.group("6. Symbol — semi-privacidade antes do # (contexto histórico)");

// Antes do #private fields (ES2022), usava-se Symbol para criar propriedades
// que não colidem e não aparecem em iterações normais (mas NÃO são verdadeiramente privadas)
const _price = Symbol("price");

class LegacyProduct {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this[_price] = price; // "escondida" — não acessível por acidente
    }

    getPrice() {
        return this[_price];
    }
}

const lp = new LegacyProduct(1, "Teclado", 250);
console.log(`getPrice(): ${lp.getPrice()}`);       // 250 — acesso controlado via getter
console.log(`lp.price: ${lp.price}`);               // undefined — não existe propriedade "price"
console.log(`keys: ${Object.keys(lp)}`);            // ["id", "name"] — Symbol não aparece
console.log(`ownKeys: ${Object.getOwnPropertySymbols(lp).length}`); // 1 — mas ainda é recuperável

// ⚠ Diferente de #private, Symbol NÃO é verdadeiramente privado.
//    Com Object.getOwnPropertySymbols() ainda é possível acessar.
//    #private fields (ES2022) são realmente inacessíveis de fora da classe.
console.groupEnd();

// =====================================================
// 🏋️ EXERCÍCIOS — Semana 6
// =====================================================

// 1. Crie uma função construtora `Book(title, author, year)`.
//    Instancie 3 livros com `new`. Adicione `displayInfo()` no .prototype
//    e demonstre que todos os livros têm acesso.

// 2. Implemente herança entre `Person` (name, age) e `Student` (+ course).
//    Use Person.call(this, ...) no construtor de Student e configure
//    Student.prototype = Object.create(Person.prototype).

// 3. Implemente a mesma hierarquia `Vehicle → Car` de duas formas:
//    - Com funções construtoras + .prototype
//    - Com `class` + `extends` + `super()`
//    Compare sintaxe e funcionalidade.

// 4. (Projeto integrador) Crie uma hierarquia:
//    - `Product` (id, name, price, calculateDiscount(percentage))
//    - `PhysicalProduct` (+ weight, calculateShipping())
//    - `DigitalProduct` (+ fileSizeMB, getDownloadLink())
//    Use `class`. Implemente 2 instâncias de cada tipo.

// 5. (Extra) Converta a hierarquia acima para usar #private fields:
//    torne `id` e `price` privados. Adicione getters públicos.

// 6. (Extra) Compare Symbol vs. #private: crie uma classe com ambos e
//    tente acessar cada um de fora. Qual é realmente privado?

// =====================================================
// RESOLUÇÕES — Semana 6
// =====================================================

{
    console.group("Exercício 1 — Função construtora Book");
    // O método fica no prototype e é compartilhado pelas três instâncias.
    function Book(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    Book.prototype.displayInfo = function () {
        return `${this.title}, de ${this.author} (${this.year})`;
    };

    const books = [
        new Book("Dom Casmurro", "Machado de Assis", 1899),
        new Book("O Cortiço", "Aluísio Azevedo", 1890),
        new Book("Capitães da Areia", "Jorge Amado", 1937)
    ];
    books.forEach((book) => console.log(book.displayInfo()));
    console.log(`Método compartilhado: ${books[0].displayInfo === books[1].displayInfo}`);
    console.groupEnd();
}

{
    console.group("Exercício 2 — Person → Student com call()");
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.introduce = function () {
        return `Sou ${this.name}, tenho ${this.age} anos`;
    };

    function Student(name, age, course) {
        // call reutiliza o construtor base, inicializando this como o novo Student.
        Person.call(this, name, age);
        this.course = course;
    }
    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.describeCourse = function () {
        return `${this.introduce()} e estudo ${this.course}.`;
    };

    const student = new Student("Lia", 20, "Análise e Desenvolvimento de Sistemas");
    console.log(student.describeCourse());
    console.log(`instanceof Student: ${student instanceof Student}`);
    console.log(`instanceof Person: ${student instanceof Person}`);
    console.groupEnd();
}

{
    console.group("Exercício 3 — Vehicle → Car: construtor e class");
    // A configuração manual do prototype equivale à ligação feita por extends.
    function VehicleConstructor(type) {
        this.type = type;
    }
    VehicleConstructor.prototype.start = function () {
        return `${this.type} ligado.`;
    };

    function CarConstructor(type, doors) {
        VehicleConstructor.call(this, type);
        this.doors = doors;
    }
    CarConstructor.prototype = Object.create(VehicleConstructor.prototype);
    CarConstructor.prototype.constructor = CarConstructor;
    CarConstructor.prototype.honk = function () {
        return "Biii!";
    };

    class VehicleClass {
        constructor(type) {
            this.type = type;
        }
        start() {
            return `${this.type} ligado.`;
        }
    }
    class CarClass extends VehicleClass {
        constructor(type, doors) {
            super(type);
            this.doors = doors;
        }
        honk() {
            return "Biii!";
        }
    }

    const carByConstructor = new CarConstructor("Carro", 4);
    const carByClass = new CarClass("Carro", 4);
    console.log(`Construtor: ${carByConstructor.start()} ${carByConstructor.honk()} Portas: ${carByConstructor.doors}`);
    console.log(`class: ${carByClass.start()} ${carByClass.honk()} Portas: ${carByClass.doors}`);
    console.log(`Ambos herdam de Vehicle: ${carByConstructor instanceof VehicleConstructor && carByClass instanceof VehicleClass}`);
    console.log("A sintaxe class reduz o código de herança; ambos usam protótipos.");
    console.groupEnd();
}

{
    console.group("Exercício 4 — Hierarquia de produtos");
    // getInfo é sobrescrito nas subclasses: o mesmo método apresenta dados específicos.
    class Product {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
        calculateDiscount(percentage) {
            return this.price * (1 - percentage / 100);
        }
        getInfo() {
            return `${this.name} — R$ ${this.price.toFixed(2)}`;
        }
    }

    class PhysicalProduct extends Product {
        constructor(id, name, price, weight) {
            super(id, name, price);
            this.weight = weight;
        }
        calculateShipping() {
            return this.weight * 5;
        }
        getInfo() {
            return `${super.getInfo()} | ${this.weight} kg | Frete: R$ ${this.calculateShipping().toFixed(2)}`;
        }
    }

    class DigitalProduct extends Product {
        constructor(id, name, price, fileSizeMB) {
            super(id, name, price);
            this.fileSizeMB = fileSizeMB;
        }
        getDownloadLink() {
            return `https://acme.com/download/${this.id}`;
        }
        getInfo() {
            return `${super.getInfo()} | ${this.fileSizeMB} MB | ${this.getDownloadLink()}`;
        }
    }

    const products = [
        new PhysicalProduct(1, "Cadeira Gamer", 1299.9, 12),
        new PhysicalProduct(2, 'Monitor 27"', 1899.9, 5),
        new DigitalProduct(3, "Curso de JavaScript", 199.9, 4500),
        new DigitalProduct(4, "E-book POO", 49.9, 15)
    ];
    products.forEach((product) => console.log(product.getInfo()));
    console.log(`Desconto de 15%: R$ ${products[0].calculateDiscount(15).toFixed(2)}`);
    console.groupEnd();
}

{
    console.group("Exercício 5 (Extra) — Hierarquia com campos privados");
    // Campos #private são acessíveis na classe base; subclasses usam os getters públicos.
    class PrivateProduct {
        #id;
        #price;

        constructor(id, name, price) {
            this.#id = id;
            this.name = name;
            this.#price = price;
        }
        get id() {
            return this.#id;
        }
        get price() {
            return this.#price;
        }
        set price(value) {
            if (!Number.isFinite(value) || value < 0) {
                throw new RangeError("O preço deve ser um número não negativo.");
            }
            this.#price = value;
        }
        calculateDiscount(percentage) {
            return this.#price * (1 - percentage / 100);
        }
        getInfo() {
            return `${this.name} — R$ ${this.#price.toFixed(2)}`;
        }
    }

    class PrivatePhysicalProduct extends PrivateProduct {
        constructor(id, name, price, weight) {
            super(id, name, price);
            this.weight = weight;
        }
        calculateShipping() {
            return this.weight * 5;
        }
    }
    class PrivateDigitalProduct extends PrivateProduct {
        constructor(id, name, price, fileSizeMB) {
            super(id, name, price);
            this.fileSizeMB = fileSizeMB;
        }
        getDownloadLink() {
            return `https://acme.com/download/${this.id}`;
        }
    }

    const privateProducts = [
        new PrivatePhysicalProduct(1, "Mouse", 89.9, 0.2),
        new PrivatePhysicalProduct(2, "Teclado", 259.9, 0.8),
        new PrivateDigitalProduct(3, "Curso de PHP", 99.9, 1200),
        new PrivateDigitalProduct(4, "E-book JavaScript", 39.9, 20)
    ];
    privateProducts.forEach((product) => {
        console.log(`${product.getInfo()} | getter id=${product.id}, price=${product.price}`);
    });
    console.log(`id aparece como propriedade comum: ${Object.hasOwn(privateProducts[0], "id")}`);
    console.log(`Desconto: R$ ${privateProducts[0].calculateDiscount(10).toFixed(2)}`);
    console.groupEnd();
}

{
    console.group("Exercício 6 (Extra) — Symbol e #private");
    // Symbol evita colisões de nomes, mas pode ser descoberto via getOwnPropertySymbols.
    const legacySecret = Symbol("legacySecret");
    class PrivacyExample {
        #privateSecret;

        constructor(secret) {
            this.#privateSecret = secret;
            this[legacySecret] = secret;
        }
        readPrivateSecret() {
            return this.#privateSecret;
        }
    }

    const privacyExample = new PrivacyExample("valor confidencial");
    const discoveredSymbol = Object.getOwnPropertySymbols(privacyExample)[0];
    console.log(`Valor via método da classe: ${privacyExample.readPrivateSecret()}`);
    console.log(`Symbol recuperável externamente: ${privacyExample[discoveredSymbol]}`);
    console.log(`Símbolos enumeráveis via Object.keys: ${Object.keys(privacyExample).length}`);
    console.log(`Símbolos recuperáveis via getOwnPropertySymbols: ${Object.getOwnPropertySymbols(privacyExample).length}`);
    console.log(`Campo #private aparece como propriedade própria: ${Object.hasOwn(privacyExample, "#privateSecret")}`);
    console.log("O campo #private não pode ser referenciado fora da classe; Symbol pode ser descoberto e lido.");
    console.groupEnd();
}
