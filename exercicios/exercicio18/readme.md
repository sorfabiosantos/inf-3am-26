# 🏥 Programação Web II
## Exercício 18 – Classes `Patient`, `Doctor`, `MedicalRecord` (Encapsulamento)

## 🧭 Contextualizando

Um sistema hospitalar precisa gerenciar com segurança os dados dos pacientes (patients) e seus prontuários médicos (medical records). Informações sensíveis como o CPF do paciente, o número do CRM do médico e os diagnósticos registrados não devem ser acessadas ou alteradas diretamente por código externo — qualquer modificação deve passar por métodos controlados que garantam a integridade dos dados. O **encapsulamento** é a solução: atributos críticos são declarados como privados e expostos apenas por getters e setters com validações. Um prontuário médico, por exemplo, só pode ser criado associando um paciente existente a um médico existente, e seu conteúdo é imutável após o registro, garantindo a rastreabilidade das consultas.

## 🎯 Objetivo

Praticar **encapsulamento** em PHP modelando um sistema hospitalar seguro:

- Definição de atributos **privados** inacessíveis externamente
- Implementação de **getters e setters** com regras de validação
- Controle de acesso a dados sensíveis (CPF, CRM, diagnóstico) por meio de métodos públicos
- Imutabilidade de registros médicos após criação
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Hospital`.
> Crie os arquivos na pasta `source/Models/Hospital/`.

### Classe `Doctor` (Médico)

1. Crie a classe `Doctor` com os seguintes atributos **privados**:
    - `id` (int) — identificador do médico
    - `name` (string) — nome (name) do médico
    - `email` (string) — e-mail (email) de contato
    - `crm` (string) — número do Conselho Regional de Medicina (CRM - Medical License Number), ex: `"CRM/SP 123456"`
    - `specialty` (string) — especialidade médica (medical specialty), ex: `"Cardiologia"`, `"Pediatria"`

2. Implemente o método construtor que receba e inicialize os cinco atributos.

3. Implemente **getters** para todos os atributos.

4. Implemente **setter** apenas para `email` e `specialty` — o `name` e o `crm` não devem poder ser alterados após o cadastro.

5. Implemente um método chamado `show()` que retorne as informações formatadas do médico:
   ```
   Médico (Doctor): #id - Dr(a). Carlos Mendes
   CRM (Medical License): CRM/SP 123456
   Especialidade (Specialty): Cardiologia
   E-mail: carlos@hospital.com
   ```

---

### Classe `Patient` (Paciente)

1. Crie a classe `Patient` com os seguintes atributos **privados**:
    - `id` (int) — identificador do paciente
    - `name` (string) — nome (name) do paciente
    - `cpf` (string) — CPF (Individual Taxpayer Registry) do paciente, armazenado **sem formatação** (somente dígitos)
    - `dateOfBirth` (string) — data de nascimento (date of birth) no formato `Y-m-d`
    - `bloodType` (string) — tipo sanguíneo (blood type), ex: `"A+"`, `"O-"`, `"AB+"`
    - `allergies` (array) — lista de alergias (allergies) conhecidas; inicializado como array vazio

2. Implemente o método construtor que receba `id`, `name`, `cpf`, `dateOfBirth` e `bloodType`. O atributo `allergies` deve iniciar como array vazio.

3. Implemente **getters** para todos os atributos.

4. Implemente um método `getCpfMasked(): string` que retorne o CPF formatado e parcialmente oculto por privacidade: `***.***.123-45`.

5. Implemente um método `addAllergy(string $allergy): void` que adicione uma alergia à lista, **evitando duplicatas**.

6. Implemente um método `hasAllergy(string $allergy): bool` que retorne `true` se a alergia informada já estiver registrada.

7. Implemente um método chamado `show()` que retorne as informações formatadas do paciente:
   ```
   Paciente (Patient): #id - Ana Lima
   CPF: ***.***.890-12
   Data de Nascimento (Date of Birth): 1990-05-14
   Tipo Sanguíneo (Blood Type): A+
   Alergias (Allergies): Penicilina, Dipirona
   ```
   > Se não houver alergias registradas, exiba `"Nenhuma registrada"`.

---

### Classe `MedicalRecord` (Prontuário Médico)

1. Crie a classe `MedicalRecord` com os seguintes atributos **privados**:
    - `id` (int) — identificador do prontuário
    - `patient` (Patient) — **objeto** do paciente atendido
    - `doctor` (Doctor) — **objeto** do médico responsável
    - `diagnosis` (string) — diagnóstico (diagnosis) registrado pelo médico
    - `prescription` (string) — prescrição médica (medical prescription), ex: medicamentos e orientações
    - `createdAt` (string) — data e hora do registro no formato `Y-m-d H:i:s`

2. Implemente o método construtor que receba `id`, `patient`, `doctor`, `diagnosis` e `prescription`. O atributo `createdAt` deve ser preenchido automaticamente com `date('Y-m-d H:i:s')`.

3. Implemente **somente getters** para todos os atributos — o prontuário é **imutável** após criado.

4. Implemente um método chamado `show()` que retorne as informações formatadas do prontuário:
   ```
   Prontuário (Medical Record): #id
   Data do Registro (Created At): 2025-06-01 09:45:00
   Paciente (Patient): Ana Lima
   Médico (Doctor): Dr(a). Carlos Mendes | CRM/SP 123456
   Diagnóstico (Diagnosis): Hipertensão arterial leve
   Prescrição (Prescription): Losartana 50mg 1x ao dia. Retorno em 30 dias.
   ```

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Hospital\Doctor;
   use source\Models\Hospital\Patient;
   use source\Models\Hospital\MedicalRecord;
   ```

2. Instancie pelo menos **dois** objetos `Doctor` com especialidades diferentes.

3. Instancie pelo menos **três** objetos `Patient`. Para pelo menos um deles, adicione alergias com `addAllergy()`.

4. Instancie pelo menos **quatro** objetos `MedicalRecord` associando pacientes e médicos diferentes.

5. Utilize o método `hasAllergy()` para verificar uma alergia e exiba o resultado.

6. Tente alterar o CPF de um paciente diretamente (ex: `$paciente->cpf = "00000000000"`) e observe o erro do PHP, comprovando o encapsulamento.

7. Tente alterar o diagnóstico de um prontuário diretamente e observe que não há setter disponível.

8. Exiba o resultado chamando `show()` de cada objeto, imprimindo com `echo`.

9. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Observe que o prontuário médico não possui setters — após criado, ele se torna um registro imutável. Isso é encapsulamento aplicado à segurança e rastreabilidade de dados médicos.





