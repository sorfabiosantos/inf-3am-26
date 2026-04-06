# 🏫 Programação Web II
## Exercício 16 – Classes `Student`, `Teacher`, `Course`, `Enrollment` (Associação)

## 🧭 Contextualizando

Um sistema de gestão escolar precisa registrar e relacionar alunos (students), professores (teachers), disciplinas (courses) e matrículas (enrollments). Na vida real, esses elementos não existem de forma isolada: uma matrícula só faz sentido quando relaciona um aluno específico a uma disciplina específica; uma disciplina só existe com um professor responsável. Esses relacionamentos são modelados por **associação** — um objeto "conhece" e "usa" outro objeto — sem que um seja parte integrante do outro. Quando um professor é substituído em uma disciplina, o professor antigo continua existindo no sistema; quando um aluno cancela uma matrícula, tanto o aluno quanto a disciplina permanecem cadastrados. A **associação** garante que cada objeto gerencie seu próprio ciclo de vida, enquanto os relacionamentos entre eles são representados por atributos que guardam referências a outros objetos.

## 🎯 Objetivo

Praticar **associação** em PHP modelando um sistema escolar com múltiplos relacionamentos entre objetos:

- Relacionamento de **associação** entre classes (um objeto referencia outro)
- Diferença entre associação e herança (não é um "é um", mas sim "tem um" / "usa um")
- Atributos do tipo objeto (ex: `Course` possui um `Teacher`)
- Atributos do tipo array de objetos (ex: `Course` possui um array de `Student`)
- Encapsulamento com atributos privados e getters/setters
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\School`.
> Crie os arquivos na pasta `source/Models/School/`.

### Classe `Teacher` (Professor)

1. Crie a classe `Teacher` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string) — nome (name) do professor
    - `email` (string) — e-mail (email) do professor
    - `specialization` (string) — área de especialização (specialization), ex: "Matemática", "Programação"

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show()` que retorne as informações formatadas do professor:
   ```
   Professor (Teacher): #id - Nome: Carlos Silva
   E-mail: carlos@escola.com
   Especialização (Specialization): Programação
   ```

---

### Classe `Student` (Aluno)

1. Crie a classe `Student` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string) — nome (name) do aluno
    - `email` (string) — e-mail (email) do aluno
    - `registrationNumber` (string) — número de matrícula (registration number), ex: `"2025001"`

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show()` que retorne as informações formatadas do aluno:
   ```
   Aluno (Student): #id - Nome: Ana Souza
   E-mail: ana@escola.com
   Matrícula (Registration): 2025001
   ```

---

### Classe `Course` (Disciplina)

1. Crie a classe `Course` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string) — nome da disciplina (course name), ex: "Programação Web II"
    - `code` (string) — código da disciplina (course code), ex: `"INF-3AT-26"`
    - `workload` (int) — carga horária (workload) em horas
    - `teacher` (Teacher) — **objeto** do professor responsável pela disciplina (**associação**)

2. Implemente o método construtor que receba e inicialize os cinco atributos.

3. Implemente getters e setters para todos os atributos. O setter de `teacher` deve aceitar um objeto do tipo `Teacher`.

4. Implemente um método chamado `show()` que retorne as informações formatadas da disciplina:
   ```
   Disciplina (Course): #id - Programação Web II
   Código (Code): INF-3AT-26
   Carga Horária (Workload): 80 horas
   Professor (Teacher): Carlos Silva
   ```

---

### Classe `Enrollment` (Matrícula)

1. Crie a classe `Enrollment` com os seguintes atributos privados:
    - `id` (int)
    - `student` (Student) — **objeto** do aluno matriculado (**associação**)
    - `course` (Course) — **objeto** da disciplina na qual o aluno está matriculado (**associação**)
    - `enrollmentDate` (string) — data de matrícula (enrollment date) no formato `Y-m-d`
    - `grade` (float|null) — nota final (final grade) do aluno na disciplina; `null` se ainda não lançada
    - `status` (string) — situação (status): `"ativa"`, `"concluida"` ou `"cancelada"`

2. Implemente o método construtor que receba `id`, `student`, `course` e `enrollmentDate`. O `grade` deve iniciar como `null` e o `status` como `"ativa"`.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método `approve(): bool` que:
    - Verifique se a nota (grade) já foi lançada
    - Se a nota for maior ou igual a 6.0, defina `status` como `"concluida"` e retorne `true`
    - Se a nota for menor que 6.0, mantenha o status como `"ativa"` e retorne `false`
    - Se a nota for `null`, retorne `false`

5. Implemente um método chamado `show()` que retorne as informações formatadas da matrícula:
   ```
   Matrícula (Enrollment): #id
   Aluno (Student): Ana Souza
   Disciplina (Course): Programação Web II
   Professor (Teacher): Carlos Silva
   Data de Matrícula (Enrollment Date): 2025-02-01
   Nota (Grade): 8,5
   Situação (Status): concluida
   ```

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\School\Teacher;
   use source\Models\School\Student;
   use source\Models\School\Course;
   use source\Models\School\Enrollment;
   ```

2. Instancie pelo menos **dois** objetos `Teacher`.

3. Instancie pelo menos **três** objetos `Student`.

4. Instancie pelo menos **duas** disciplinas `Course`, cada uma associada a um professor diferente.

5. Instancie pelo menos **quatro** objetos `Enrollment` associando alunos e disciplinas. Inclua:
    - Uma matrícula com nota aprovada (≥ 6.0)
    - Uma matrícula com nota reprovada (< 6.0)
    - Uma matrícula sem nota lançada ainda (`null`)

6. Chame o método `approve()` de cada matrícula e exiba o resultado.

7. Demonstre a **associação** trocando o professor de uma disciplina com o setter `setCourse->setTeacher()` e exibindo o resultado antes e depois da troca.

8. Exiba o resultado chamando `show()` de todos os objetos, imprimindo com `echo`.

9. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Observe que professores, alunos e disciplinas continuam existindo independentemente das matrículas — isso é a característica fundamental da associação: os objetos têm ciclos de vida independentes.

