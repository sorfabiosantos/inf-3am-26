# 🏢 Programação Web II
## Exercício 08 – Namespace `Company` (Herança + Polimorfismo)

## 🧭 Contextualizando

Uma empresa precisa gerenciar seus funcionários com um sistema robusto que represente diferentes tipos de colaboradores. O cadastro básico de todos os funcionários inclui os mesmos dados de qualquer usuário — identificador, nome, e-mail, senha e foto — mas incorpora informações trabalhistas específicas como horas trabalhadas e valor da hora. Cada funcionário recebe um salário calculado pela multiplicação da quantidade de horas trabalhadas no mês pelo valor da hora. No entanto, vendedores apresentam uma realidade diferente: além do salário base, recebem uma comissão de 10% sobre o valor total de suas vendas. Gerentes, por sua vez, recebem um bônus fixo além do salário. Neste cenário, a **herança** permite que as classes específicas (`Seller` e `Manager`) reutilizem a base comum, enquanto o **polimorfismo** garante que o método `calculateSalary()` seja implementado de forma única para cada tipo de funcionário, mantendo a coesão do sistema e facilitando operações em massa sobre colaboradores de diferentes categorias.

## 🎯 Objetivo

Aplicar **herança** e **polimorfismo** em PHP para representar diferentes tipos de funcionários, exercitando:

- Definição de classe base que estende outra (`Employee` → `User`)
- Definição de classes filhas que implementam comportamentos específicos (`Seller` e `Manager` → `Employee`)
- Polimorfismo através da sobrescrita (override) de métodos
- Encapsulamento com atributos privados e getters/setters
- Uso do método construtor com `parent::__construct()`
- Organização de código com **namespaces**
- Cálculos específicos de domínio (folha de pagamento)

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Company`.
> Crie os arquivos na pasta `source/Models/Company/`.

### Classe `Employee` (filha de `User`)

1. Crie a classe `Employee` que **estende** `User`, adicionando os seguintes atributos privados:
    - `hoursWorked` (float) — quantidade de horas trabalhadas no mês
    - `hourValue` (float) — valor da hora trabalhada em reais

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe.

3. Implemente getters e setters para os atributos próprios (`hoursWorked` e `hourValue`).

4. Implemente um método chamado `calculateSalary()` que retorne o salário calculado como: **horas trabalhadas × valor da hora**.

5. Implemente um método chamado `show()` que retorne as informações formatadas do funcionário:
   ```
   Funcionário: #id - Nome: Nome
   Email: email
   Horas Trabalhadas: 160.00
   Valor da Hora: R$ 50.00
   Salário: R$ 8.000,00
   ```

### Classe `Seller` (filha de `Employee`)

1. Crie a classe `Seller` que **estende** `Employee`, adicionando o seguinte atributo privado:
    - `totalSales` (float) — valor total de vendas realizadas no mês

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe.

3. Implemente getters e setters para o atributo próprio (`totalSales`).

4. Implemente um método chamado `calculateCommission()` que retorne **10% do valor total de vendas**.

5. **Sobrescreva (override)** o método `calculateSalary()` herdado para retornar: **salário base + comissão**.

6. **Sobrescreva (override)** o método `show()` para exibir as informações do vendedor incluindo vendas e comissão:
   ```
   Vendedor: #id - Nome: Nome
   Email: email
   Horas Trabalhadas: 160.00
   Valor da Hora: R$ 50.00
   Salário Base: R$ 8.000,00
   Total de Vendas: R$ 5.000,00
   Comissão (10%): R$ 500,00
   Salário Total: R$ 8.500,00
   ```

### Classe `Manager` (filha de `Employee`) — **BÔNUS**

1. Crie a classe `Manager` que **estende** `Employee`, adicionando o seguinte atributo privado:
    - `bonus` (float) — bônus fixo adicional ao salário

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe.

3. Implemente getters e setters para o atributo próprio (`bonus`).

4. **Sobrescreva (override)** o método `calculateSalary()` herdado para retornar: **salário base + bônus fixo**.

5. **Sobrescreva (override)** o método `show()` para exibir as informações do gerente incluindo bônus:
   ```
   Gerente: #id - Nome: Nome
   Email: email
   Horas Trabalhadas: 160.00
   Valor da Hora: R$ 50.00
   Salário Base: R$ 8.000,00
   Bônus Fixo: R$ 2.000,00
   Salário Total: R$ 10.000,00
   ```

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Company\Employee;
   use source\Models\Company\Seller;
   use source\Models\Company\Manager;
   ```

2. Instancie pelo menos **dois** objetos `Employee` com dados diferentes.

3. Instancie pelo menos **dois** objetos `Seller` com dados diferentes.

4. Instancie pelo menos **um** objeto `Manager` com dados diferentes.

5. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.

6. Chame o método `calculateSalary()` de cada objeto e exiba os resultados.

7. Exiba o resultado chamando `show()` de cada objeto, imprimindo com `echo` e adicionando quebras de linha entre eles.

8. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar mais funcionários de cada tipo para simular uma folha de pagamento completa da empresa.


