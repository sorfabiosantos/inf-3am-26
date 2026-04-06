# 🏦 Programação Web II
## Exercício 13 – Classes `BankAccount`, `SavingsAccount`, `Transaction` (Encapsulamento)

## 🧭 Contextualizando

Um banco digital precisa gerenciar as contas de seus clientes de forma segura e controlada. O acesso direto ao saldo (balance) e ao número secreto (PIN) de uma conta seria um risco crítico de segurança — qualquer código externo poderia alterar valores arbitrariamente. O **encapsulamento** é a solução: atributos sensíveis como saldo e senha são mantidos privados, e somente métodos controlados da própria classe podem alterá-los após validações. A conta poupança (savings account) herda essa proteção e acrescenta lógica de rendimento (yield) sobre o saldo. Cada movimentação financeira é registrada como uma transação (transaction), garantindo rastreabilidade e auditoria completas de todas as operações realizadas na conta.

## 🎯 Objetivo

Praticar **encapsulamento** em PHP modelando um sistema bancário seguro:

- Definição de atributos **privados** inacessíveis externamente
- Implementação de **getters e setters** com regras de validação
- Controle de acesso a operações sensíveis por meio de métodos públicos
- Proteção de dados críticos (saldo, PIN) contra alteração direta
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Banking`.
> Crie os arquivos na pasta `source/Models/Banking/`.

### Classe `Transaction` (Transação)

1. Crie a classe `Transaction` com os seguintes atributos privados:
    - `type` (string) — tipo da transação (transaction type): `"deposito"`, `"saque"` ou `"transferencia"`
    - `amount` (float) — valor (amount) da transação
    - `description` (string) — descrição (description) da operação
    - `createdAt` (string) — data e hora do registro no formato `Y-m-d H:i:s`

2. Implemente o método construtor que receba e inicialize `type`, `amount` e `description`. O atributo `createdAt` deve ser preenchido automaticamente com `date('Y-m-d H:i:s')`.

3. Implemente **somente getters** para todos os atributos (a transação é imutável após criada).

4. Implemente um método chamado `show()` que retorne as informações formatadas da transação:
   ```
   [2025-06-01 10:30:00] Depósito | Valor: R$ 500,00 | Descrição: Depósito inicial
   ```

---

### Classe `BankAccount` (Conta Bancária)

1. Crie a classe `BankAccount` com os seguintes atributos **privados**:
    - `id` (int) — identificador da conta
    - `ownerName` (string) — nome do titular (owner name)
    - `accountNumber` (string) — número da conta (account number)
    - `balance` (float) — saldo (balance): inicializado como `0.0`
    - `pin` (string) — senha de 4 dígitos (PIN): armazenada como hash com `md5()`
    - `transactions` (array) — histórico de transações (transaction history): inicializado como array vazio

2. Implemente o método construtor que receba `id`, `ownerName`, `accountNumber` e `pin`. O saldo deve iniciar em `0.0` e o PIN deve ser armazenado como `md5($pin)`.

3. Implemente getters para `id`, `ownerName`, `accountNumber` e `balance`.

4. **Não implemente setter para `balance`** — o saldo só pode ser alterado pelos métodos `deposit()`, `withdraw()` e `transfer()`.

5. Implemente um método `validatePin(string $pin): bool` que retorne `true` se o PIN informado corresponde ao armazenado (compare com `md5($pin)`) e `false` caso contrário.

6. Implemente um método `changePin(string $currentPin, string $newPin): bool` que:
    - Valide o PIN atual antes de alterar
    - Se o PIN atual for correto, armazene o novo PIN como `md5($newPin)` e retorne `true`
    - Se incorreto, retorne `false`

7. Implemente um método `deposit(float $amount, string $description = 'Depósito'): bool` que:
    - Rejeite valores menores ou iguais a zero
    - Adicione o valor ao saldo
    - Registre uma nova `Transaction` do tipo `"deposito"` no histórico
    - Retorne `true` em caso de sucesso

8. Implemente um método `withdraw(float $amount, string $pin, string $description = 'Saque'): bool` que:
    - Valide o PIN antes de executar
    - Rejeite valores menores ou iguais a zero
    - Rejeite se o saldo for insuficiente (insufficient balance)
    - Subtraia o valor do saldo
    - Registre uma nova `Transaction` do tipo `"saque"` no histórico
    - Retorne `true` em caso de sucesso, `false` caso contrário

9. Implemente um método `getTransactions(): array` que retorne o histórico de transações.

10. Implemente um método chamado `show()` que retorne as informações formatadas da conta:
    ```
    Conta Bancária: #id
    Titular: Nome do Titular
    Número da Conta: 0001-2
    Saldo: R$ 1.500,00
    Transações registradas: 3
    ```

---

### Classe `SavingsAccount` (Conta Poupança — filha de `BankAccount`)

1. Crie a classe `SavingsAccount` que **estende** `BankAccount`, adicionando os seguintes atributos privados:
    - `yieldRate` (float) — taxa de rendimento mensal (monthly yield rate) em percentual, ex: `0.5` para 0,5%
    - `lastYieldDate` (string) — data do último rendimento aplicado (last yield date) no formato `Y-m-d`

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`. Inicialize `lastYieldDate` com a data atual.

3. Implemente getters e setters para `yieldRate` e `lastYieldDate`.

4. Implemente um método `applyYield(): float` que:
    - Calcule o rendimento (yield) como: **saldo atual × taxa de rendimento / 100**
    - Utilize o método `deposit()` herdado para adicionar o rendimento ao saldo
    - Atualize `lastYieldDate` com a data atual
    - Retorne o valor do rendimento aplicado

5. **Sobrescreva (override)** o método `show()` para exibir as informações da poupança incluindo taxa e data do último rendimento:
   ```
   Conta Poupança: #id
   Titular: Nome do Titular
   Número da Conta: 0002-5
   Saldo: R$ 2.010,00
   Taxa de Rendimento: 0,50% ao mês
   Último Rendimento: 2025-06-01
   Transações registradas: 4
   ```

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Banking\BankAccount;
   use source\Models\Banking\SavingsAccount;
   use source\Models\Banking\Transaction;
   ```

2. Instancie pelo menos **dois** objetos `BankAccount` com dados diferentes.

3. Realize operações nas contas: depósitos, saques (com PIN correto e com PIN incorreto para testar a validação).

4. Instancie pelo menos **um** objeto `SavingsAccount` e aplique o rendimento com `applyYield()`.

5. Utilize `getTransactions()` para listar o histórico de transações chamando `show()` de cada `Transaction`.

6. Tente alterar o saldo diretamente (ex: `$conta->balance = 99999`) e observe o erro do PHP, comprovando o encapsulamento.

7. Exiba o resultado chamando `show()` de cada conta, imprimindo com `echo`.

8. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente realizar saques com PIN incorreto, valores negativos e saques maiores que o saldo para observar as validações do encapsulamento em ação.



