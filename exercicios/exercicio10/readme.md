# 📚 Programação Web II
## Exercício 10 – Classes `Author`, `Book`, `Member`, `Loan` (Herança + Polimorfismo + Associação)

## 🧭 Contextualizando

Um sistema de gerenciamento de biblioteca necessita controlar acervos diversos — livros físicos, e-books e audiobooks — cada um com características próprias. A classe `Book` armazena informações básicas como ISBN, título, ano de publicação e autor (`Author`). No entanto, cada tipo de livro (`PhysicalBook`, `Ebook`, `Audiobook`) possui atributos específicos: livros físicos têm quantidade de exemplares em estoque e localização na estante; e-books possuem tamanho em MB e formato digital (PDF, EPUB); audiobooks informam duração em minutos. Um membro da biblioteca (`Member`) pode emprestar livros através de um objeto `Loan`, que registra a data de empréstimo, data de devolução esperada e data de devolução real. O **polimorfismo** permite que cada tipo de livro calcule taxa de multa por atraso de forma diferente — livros físicos cobram R$ 2,00 por dia, e-books R$ 0,50 por dia, audiobooks R$ 1,00 por dia — enquanto a **associação** garante que empréstimos rastreiem qual livro foi emprestado e por qual membro, mantendo histórico completo e facilitando auditorias.

## 🎯 Objetivo

Combinar **herança**, **polimorfismo** e **associação** em PHP exercitando:

- Definição de classe base (`Book`)
- Definição de classes filhas que especializam comportamentos (`PhysicalBook`, `Ebook`, `Audiobook` → `Book`)
- Polimorfismo através da sobrescrita de métodos
- Relacionamentos por associação (`Loan` contém `Member` e `Book`)
- Encapsulamento com atributos privados e getters/setters
- Uso do método construtor com `parent::__construct()`
- Organização de código com **namespaces**
- Lógica de negócio complexa (cálculo de multas, formatação de datas)

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Library`.
> Crie os arquivos na pasta `source/Models/Library/`.

### Classe `Author` (Autor)

1. Crie a classe `Author` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string)
    - `nationality` (string)
    - `birthYear` (int)

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show()` que retorne as informações formatadas do autor:
   ```
   Autor: Nome
   Nacionalidade: Brasil
   Ano de Nascimento: 1950
   ```

### Classe `Member` (Membro da Biblioteca)

1. Crie a classe `Member` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string)
    - `email` (string)
    - `registrationDate` (string) — data de registro no formato YYYY-MM-DD

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show()` que retorne as informações formatadas do membro:
   ```
   Membro: #id - Nome: Nome
   Email: email@example.com
   Data de Registro: 2023-01-15
   ```

### Classe `Book` (Livro - classe base)

1. Crie a classe `Book` com os seguintes atributos privados:
    - `isbn` (string) — código ISBN único
    - `title` (string) — título do livro
    - `author` (Author) — objeto do autor
    - `publicationYear` (int) — ano de publicação
    - `pages` (int) — número de páginas

2. Implemente o método construtor que receba e inicialize todos os atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `calculateLateFee()` que retorne a taxa de multa por atraso. Este é um método que será **sobrescrito** pelas classes filhas. A assinatura deve aceitar um parâmetro `$days` (número de dias em atraso).

5. Implemente um método chamado `show()` que retorne as informações formatadas do livro:
   ```
   Livro: Título
   ISBN: 123-456-789
   Autor: Nome do Autor
   Ano de Publicação: 2023
   Páginas: 250
   ```

### Classe `PhysicalBook` (Livro Físico - filha de `Book`)

1. Crie a classe `PhysicalBook` que **estende** `Book`, adicionando os seguintes atributos privados:
    - `copiesInStock` (int) — quantidade de exemplares disponíveis
    - `shelfLocation` (string) — localização na estante (ex.: "Seção A - Prateleira 3")

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Sobrescreva (override)** o método `calculateLateFee()` para retornar **R$ 2,00 por dia em atraso**.

5. **Sobrescreva (override)** o método `show()` para exibir as informações do livro físico incluindo estoque e localização:
   ```
   Livro Físico: Título
   ISBN: 123-456-789
   Autor: Nome do Autor
   Ano de Publicação: 2023
   Páginas: 250
   Exemplares em Estoque: 5
   Localização: Seção A - Prateleira 3
   ```

### Classe `Ebook` (Livro Digital - filha de `Book`)

1. Crie a classe `Ebook` que **estende** `Book`, adicionando os seguintes atributos privados:
    - `fileSizeMB` (float) — tamanho do arquivo em megabytes
    - `format` (string) — formato do arquivo (PDF, EPUB, MOBI)

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Sobrescreva (override)** o método `calculateLateFee()` para retornar **R$ 0,50 por dia em atraso**.

5. **Sobrescreva (override)** o método `show()` para exibir as informações do e-book incluindo tamanho e formato:
   ```
   E-book: Título
   ISBN: 123-456-789
   Autor: Nome do Autor
   Ano de Publicação: 2023
   Páginas: 250
   Tamanho: 5.5 MB
   Formato: EPUB
   ```

### Classe `Audiobook` (Audiolivro - filha de `Book`)

1. Crie a classe `Audiobook` que **estende** `Book`, adicionando o seguinte atributo privado:
    - `durationMinutes` (int) — duração em minutos

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para o atributo próprio.

4. **Sobrescreva (override)** o método `calculateLateFee()` para retornar **R$ 1,00 por dia em atraso**.

5. **Sobrescreva (override)** o método `show()` para exibir as informações do audiobook incluindo duração:
   ```
   Audiolivro: Título
   ISBN: 123-456-789
   Autor: Nome do Autor
   Ano de Publicação: 2023
   Páginas: 250
   Duração: 480 minutos (8 horas)
   ```

### Classe `Loan` (Empréstimo)

1. Crie a classe `Loan` com os seguintes atributos privados:
    - `id` (int) — identificador do empréstimo
    - `member` (Member) — objeto do membro que emprestou
    - `book` (Book) — objeto do livro emprestado
    - `loanDate` (string) — data de empréstimo no formato YYYY-MM-DD
    - `dueDate` (string) — data prevista de devolução no formato YYYY-MM-DD
    - `returnDate` (string|null) — data de devolução real (null se ainda não devolvido)

2. Implemente o método construtor que receba e inicialize todos os atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `isOverdue()` que retorne `true` se o livro está em atraso (comparando `returnDate` ou data atual com `dueDate`), `false` caso contrário.

5. Implemente um método chamado `calculateFine()` que:
    - Se o livro não está em atraso, retorna 0
    - Se está em atraso, calcula o número de dias em atraso
    - Utiliza o método `calculateLateFee()` do livro para obter a taxa diária
    - Retorna o valor total da multa (dias em atraso × taxa diária)

6. Implemente um método chamado `show()` que retorne as informações formatadas do empréstimo:
   ```
   Empréstimo #id
   Membro: Nome do Membro
   Livro: Título do Livro
   Data de Empréstimo: 2024-01-10
   Data de Devolução Esperada: 2024-01-24
   Data de Devolução Real: 2024-01-30
   Dias em Atraso: 6
   Multa: R$ 12,00
   ```
   > Se não estiver em atraso, exiba "Sem atraso" em vez de dias e multa.

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Library\Author;
   use source\Models\Library\Member;
   use source\Models\Library\PhysicalBook;
   use source\Models\Library\Ebook;
   use source\Models\Library\Audiobook;
   use source\Models\Library\Loan;
   ```

2. Instancie pelo menos **dois** objetos `Author` com dados diferentes.

3. Instancie pelo menos **três** tipos de livro (`PhysicalBook`, `Ebook`, `Audiobook`), cada um associado a um autor.

4. Instancie pelo menos **dois** objetos `Member`.

5. Instancie pelo menos **três** objetos `Loan`, demonstrando:
   - Um empréstimo sem atraso
   - Um empréstimo com atraso
   - Empréstimos de diferentes tipos de livros

6. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.

7. Demonstre o polimorfismo:
   - Calculando as multas de diferentes tipos de livros
   - Mostrando que cada tipo tem uma taxa diferente

8. Exiba o resultado chamando `show()` de autores, membros, livros e empréstimos, imprimindo com `echo`.

9. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar mais autores, livros e membros para simular um acervo de biblioteca completo com histórico de empréstimos.

