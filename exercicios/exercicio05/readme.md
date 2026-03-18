# 🏥 Programação Web II
## Exercício – Classes `Patient` e `Doctor` (Herança)

## 🧭 Contextualizando

Em um hospital de médio porte, a gestão de informações de médicos e pacientes é fundamental para o funcionamento diário — desde o agendamento de consultas até a emissão de laudos e o acompanhamento clínico. O sistema hospitalar precisa manter um cadastro unificado de **usuários** (com identificador interno, nome, e-mail e senha) e, a partir dele, diferenciar os dois perfis principais: **pacientes**, que possuem data de nascimento e um prontuário com todo o histórico clínico; e **médicos**, que carregam o número de registro no CRM e a especialidade (Cardiologista, Clínico Geral, Pediatra etc.). A classe `User` já existente no sistema serve como base comum, enquanto `Patient` e `Doctor` a estendem para representar cada realidade. Dessa forma, módulos como recepção, pronto-atendimento e faturamento consomem os mesmos dados de forma padronizada, evitando duplicidade e inconsistências no cadastro.

## 🎯 Objetivo

Praticar **herança** em PHP reutilizando a classe `User` como classe mãe:

- Definição de classes filhas que estendem uma classe existente
- Atributos privados e encapsulamento com getters e setters
- Uso do método construtor chamando `parent::__construct()`
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** as classes `Patient` e `Doctor` deste exercício devem ser criadas dentro da namespace `source\Models\Hospital`.
> Crie os arquivos `Patient.php` e `Doctor.php` na pasta `source/Models/Hospital/`.

### Classe `User` (classe mãe)

1. Utilize a classe `User` já criada anteriormente que está em `source/Models/Hospital`.

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show` que retorne as informações formatadas do usuário (`Usuário: #id - Nome: Nome - Email: email`).

### Classe `Patient` (filha de `User`)

1. Crie a classe `Patient` que **estende** `User`, adicionando os seguintes atributos privados:
    - `birthDate` (string) — data de nascimento do paciente
    - `medicalRecord` (string) — prontuário com o histórico clínico

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe.

3. Implemente getters e setters para os atributos próprios (`birthDate` e `medicalRecord`).

4. Implemente um método chamado `show` que retorne as informações formatadas do paciente:
   ```
   Paciente: #id - Nome: Nome
   Email: email
   Data de Nascimento: 01/01/2000
   Prontuário: texto do histórico clínico
   ```

### Classe `Doctor` (filha de `User`)

1. Crie a classe `Doctor` que **estende** `User`, adicionando os seguintes atributos privados:
    - `crm` (string) — número de registro no Conselho Regional de Medicina
    - `specialty` (string) — especialidade médica (ex.: "Cardiologista", "Clínico Geral", "Pediatra")

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe.

3. Implemente getters e setters para os atributos próprios (`crm` e `specialty`).

4. Implemente um método chamado `show` que retorne as informações formatadas do médico:
   ```
   Médico: #id - Nome: Nome
   Email: email
   CRM: 123456
   Especialidade: Cardiologista
   ```

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Hospital\Patient;
   use source\Models\Hospital\Doctor;
   ```

2. Instancie pelo menos **dois** objetos `Patient` com dados diferentes.

3. Instancie pelo menos **dois** objetos `Doctor` com especialidades diferentes (ex.: "Cardiologista" e "Clínico Geral").

4. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.

5. Exiba o resultado chamando `show()` de cada paciente e médico, imprimindo com `echo`.

6. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar mais pacientes e médicos com diferentes especialidades para simular um cadastro hospitalar completo.

