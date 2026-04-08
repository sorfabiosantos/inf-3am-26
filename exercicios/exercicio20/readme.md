# 📚 Programação Web II
## Exercício 20 – Classes `Author`, `Book`, `Library`, `Loan` (Associação)

## 🧭 Contextualizando

Uma biblioteca digital precisa gerenciar seu acervo de livros (books), seus autores (authors) e os empréstimos (loans) realizados por usuários. Na realidade, esses elementos são independentes entre si: um autor continua existindo mesmo que todos os seus livros sejam removidos do acervo; um livro continua existindo mesmo que não haja empréstimos ativos; e um empréstimo só existe enquanto relaciona um livro específico a um usuário específico com prazo de devolução. Esses relacionamentos são modelados por **associação** — um objeto referencia outro sem que um faça parte estrutural do outro. A biblioteca (library) conhece e gerencia sua coleção de livros, e cada empréstimo (loan) conhece o livro que foi retirado, sem que um pertença permanentemente ao outro.

## 🎯 Objetivo

Praticar **associação** em PHP modelando um sistema de biblioteca com múltiplos relacionamentos entre objetos:

- Relacionamento de **associação** entre classes (um objeto referencia outro)
- Atributos do tipo objeto (ex: `Book` possui um `Author`)
- Atributos do tipo array de objetos (ex: `Library` possui um array de `Book`)
- Ciclos de vida independentes entre os objetos associados
- Encapsulamento com atributos privados e getters/setters
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Library`.
> Crie os arquivos na pasta `source/Models/Library/`.

### Classe `Author` (Autor)

1. Crie a classe `Author` com os seguintes atributos **privados**:
    - `id` (int) — identificador do autor
    - `name` (string) — nome (name) do autor
    - `nationality` (string) — nacionalidade (nationality) do autor, ex: `"Brasileiro"`, `"Britânico"`
    - `birthDate` (string) — data de nascimento (birth date) no formato `Y-m-d`
    - `biography` (string) — breve biografia (biography) do autor

2. Implemente o método construtor que receba e inicialize os cinco atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show()` que retorne as informações formatadas do autor:
   ```
   Autor (Author): #id - Machado de Assis
   Nacionalidade (Nationality): Brasileiro
   Data de Nascimento (Birth Date): 1839-06-21
   Biografia (Biography): Romancista, contista, dramaturgo e poeta brasileiro...
   ```

---

### Classe `Book` (Livro)

1. Crie a classe `Book` com os seguintes atributos **privados**:
    - `id` (int) — identificador do livro
    - `title` (string) — título (title) do livro
    - `isbn` (string) — código ISBN (ISBN - International Standard Book Number) do livro
    - `publishYear` (int) — ano de publicação (publish year) do livro
    - `genre` (string) — gênero literário (literary genre), ex: `"Romance"`, `"Ficção Científica"`, `"Biografia"`
    - `author` (Author) — **objeto** do autor do livro (**associação**)
    - `available` (bool) — indica se o livro está disponível para empréstimo (available): `true` ou `false`; inicializado como `true`

2. Implemente o método construtor que receba `id`, `title`, `isbn`, `publishYear`, `genre` e `author`. O atributo `available` deve iniciar como `true`.

3. Implemente getters e setters para todos os atributos. O setter de `author` deve aceitar um objeto do tipo `Author`.

4. Implemente um método chamado `show()` que retorne as informações formatadas do livro:
   ```
   Livro (Book): #id - Dom Casmurro
   ISBN: 978-85-359-0277-5
   Gênero (Genre): Romance
   Ano de Publicação (Publish Year): 1899
   Autor (Author): Machado de Assis
   Disponível (Available): Sim
   ```

---

### Classe `Library` (Biblioteca)

1. Crie a classe `Library` com os seguintes atributos **privados**:
    - `id` (int) — identificador da biblioteca
    - `name` (string) — nome (name) da biblioteca
    - `address` (string) — endereço (address) da biblioteca
    - `books` (array) — coleção de livros (book collection): array de objetos `Book`; inicializado como array vazio

2. Implemente o método construtor que receba `id`, `name` e `address`. O atributo `books` deve iniciar como array vazio.

3. Implemente getters e setters para `id`, `name` e `address`. Não implemente setter para `books` diretamente.

4. Implemente um método `addBook(Book $book): void` que adicione um livro ao acervo.

5. Implemente um método `removeBook(int $bookId): bool` que remova um livro do acervo pelo `id` e retorne `true` se encontrado e removido, `false` caso contrário.

6. Implemente um método `findByTitle(string $title): ?Book` que busque e retorne o primeiro livro cujo título contenha a string informada (case-insensitive), ou `null` se não encontrado.
   > **Dica:** use `stripos($book->getTitle(), $title) !== false`.

7. Implemente um método `getAvailableBooks(): array` que retorne apenas os livros com `available = true`.

8. Implemente um método chamado `show()` que retorne as informações formatadas da biblioteca:
   ```
   Biblioteca (Library): #id - Biblioteca Municipal Central
   Endereço (Address): Rua das Flores, 100 - Centro
   Total de Livros (Total Books): 5
   Livros Disponíveis (Available Books): 3
   ```

---

### Classe `Loan` (Empréstimo)

1. Crie a classe `Loan` com os seguintes atributos **privados**:
    - `id` (int) — identificador do empréstimo
    - `book` (Book) — **objeto** do livro emprestado (**associação**)
    - `borrowerName` (string) — nome do usuário que retirou o livro (borrower name)
    - `loanDate` (string) — data do empréstimo (loan date) no formato `Y-m-d`
    - `dueDate` (string) — data de devolução prevista (due date) no formato `Y-m-d`
    - `returnDate` (string|null) — data de devolução efetiva (return date): `null` se ainda não devolvido
    - `status` (string) — situação (status): `"ativo"`, `"devolvido"` ou `"atrasado"`

2. Implemente o método construtor que receba `id`, `book`, `borrowerName`, `loanDate` e `dueDate`. O `returnDate` deve iniciar como `null` e o `status` como `"ativo"`. No construtor, defina `$book->setAvailable(false)` para marcar o livro como indisponível.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método `returnBook(string $returnDate): bool` que:
    - Receba a data de devolução efetiva
    - Defina `returnDate` com o valor recebido
    - Compare com `dueDate`: se `returnDate > dueDate`, defina `status` como `"atrasado"`; caso contrário, como `"devolvido"`
    - Defina `$this->book->setAvailable(true)` para liberar o livro novamente
    - Retorne `true`

5. Implemente um método chamado `show()` que retorne as informações formatadas do empréstimo:
   ```
   Empréstimo (Loan): #id
   Livro (Book): Dom Casmurro
   Usuário (Borrower): João Silva
   Data do Empréstimo (Loan Date): 2025-06-01
   Devolução Prevista (Due Date): 2025-06-15
   Devolução Efetiva (Return Date): 2025-06-10
   Situação (Status): devolvido
   ```
   > Se `returnDate` for `null`, exiba `"Em aberto"` no campo Devolução Efetiva.

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Library\Author;
   use source\Models\Library\Book;
   use source\Models\Library\Library;
   use source\Models\Library\Loan;
   ```

2. Instancie pelo menos **dois** objetos `Author`.

3. Instancie pelo menos **quatro** objetos `Book`, cada um associado a um autor.

4. Instancie um objeto `Library` e adicione todos os livros com `addBook()`.

5. Instancie pelo menos **três** objetos `Loan` associando livros diferentes a usuários. Inclua:
    - Um empréstimo já devolvido no prazo (devolução antes do `dueDate`)
    - Um empréstimo devolvido com atraso (devolução após o `dueDate`)
    - Um empréstimo ainda em aberto (`returnDate` = `null`)

6. Chame `returnBook()` nos empréstimos concluídos e exiba o status resultante.

7. Demonstre a **associação** utilizando `getAvailableBooks()` na biblioteca antes e depois de realizar os empréstimos, mostrando como o estado dos livros muda.

8. Utilize `findByTitle()` para buscar um livro pelo título e exiba o resultado.

9. Demonstre que livros e autores continuam existindo independentemente dos empréstimos, exibindo os dados de um autor mesmo após o livro associado a ele ter sido removido da biblioteca com `removeBook()`.

10. Exiba o resultado chamando `show()` de todos os objetos, imprimindo com `echo`.

11. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Observe que quando um empréstimo é criado, o livro é automaticamente marcado como indisponível; quando devolvido, volta a ficar disponível. Isso demonstra a **associação** em ação: o empréstimo e o livro têm ciclos de vida independentes, mas um influencia o estado do outro.





