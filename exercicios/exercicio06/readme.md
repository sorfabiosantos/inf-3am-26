# 🎓 Programação Web II
## Exercício 06 – Classes `Instructor` e `Course` (Herança + Composição)

## 🧭 Contextualizando

Uma plataforma de cursos on-line precisa organizar seu catálogo de forma que cada curso esteja sempre vinculado ao instrutor responsável. No back-end do sistema, o cadastro de instrutores compartilha os dados básicos de qualquer usuário — identificador, nome, e-mail e senha — mas acrescenta informações profissionais como a formação acadêmica e a biografia exibida na página do curso. A classe `Instructor` herda de `User` para reaproveitar esse cadastro comum, enquanto a classe `Course` encapsula o identificador, o título, a carga horária e o objeto `Instructor` que ministra as aulas. Quando a equipe de conteúdo cadastra um novo curso, o sistema garante que os dados do instrutor sejam consistentes em todas as páginas — vitrine, área do aluno e relatórios administrativos — porque ambos os objetos seguem um contrato único de getters, setters e formatação.

## 🎯 Objetivo

Combinar **herança** e **composição** em PHP exercitando:

- Definição de classes filhas que estendem uma classe existente (`Instructor` → `User`)
- Relacionamento entre objetos por composição (`Course` possui um `Instructor`)
- Atributos privados e encapsulamento com getters e setters
- Uso do método construtor com `parent::__construct()`
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Course`.
> Crie os arquivos `User.php`, `Instructor.php` e `Course.php` na pasta `source/Models/Course/`.

### Classe `User` (classe mãe)

1. Crie a classe `User` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string)
    - `email` (string)
    - `password` (string)

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show` que retorne as informações formatadas do usuário (`Usuário: #id - Nome: Nome - Email: email`).

### Classe `Instructor` (filha de `User`)

1. Crie a classe `Instructor` que **estende** `User`, adicionando os seguintes atributos privados:
    - `degree` (string) — formação acadêmica (ex.: "Mestre em Ciência da Computação")
    - `bio` (string) — breve biografia exibida na página do curso

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe.

3. Implemente getters e setters para os atributos próprios (`degree` e `bio`).

4. Implemente um método chamado `show` que retorne as informações formatadas do instrutor:
   ```
   Instrutor: #id - Nome: Nome
   Email: email
   Formação: Mestre em Ciência da Computação
   Bio: texto da biografia
   ```

### Classe `Course` (composição com `Instructor`)

1. Crie a classe `Course` com os seguintes atributos privados:
    - `id` (int)
    - `title` (string) — título do curso (ex.: "PHP Orientado a Objetos")
    - `hours` (int) — carga horária em horas
    - `instructor` (Instructor) — objeto da classe `Instructor` responsável pelo curso

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show` que retorne as informações formatadas do curso:
   ```
   Curso: #id - Título: PHP Orientado a Objetos
   Carga Horária: 40h
   Instrutor: Nome do Instrutor
   ```

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Course\Instructor;
   use source\Models\Course\Course;
   ```

2. Instancie pelo menos **dois** objetos `Instructor` com formações diferentes.

3. Instancie pelo menos **dois** objetos `Course`, cada um vinculado a um instrutor diferente.

4. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.

5. Exiba o resultado chamando `show()` de cada curso e instrutor, imprimindo com `echo`.

6. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar mais instrutores e cursos para simular um catálogo completo da plataforma.

