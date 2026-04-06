# 💳 Programação Web II
## Exercício 15 – Classes `Payment`, `CreditCardPayment`, `PixPayment`, `BoletoPayment` (Polimorfismo)

## 🧭 Contextualizando

Uma plataforma de e-commerce precisa processar pagamentos por diferentes meios — cartão de crédito (credit card), Pix e boleto bancário (bank slip) — cada um com suas regras específicas de taxa (fee) e prazo de compensação (settlement time). Embora todos os meios de pagamento compartilhem informações básicas como valor, identificador e status, cada um possui um comportamento diferente ao ser processado: cartões de crédito cobram uma taxa percentual e permitem parcelamento (installments); o Pix é compensado instantaneamente e sem taxas; o boleto tem prazo de até 3 dias úteis e cobra uma taxa fixa de emissão. O **polimorfismo** é o mecanismo ideal: os métodos `process()` e `calculateFee()` são declarados na classe base e **sobrescritos** em cada subclasse com a lógica específica do canal, permitindo que o sistema trate qualquer pagamento de forma uniforme.

## 🎯 Objetivo

Praticar **polimorfismo** em PHP modelando um sistema de meios de pagamento:

- Definição de classe base com métodos que serão sobrescritos
- Sobrescrita (override) de métodos nas classes filhas com comportamentos distintos
- Tratamento uniforme de objetos polimórficos (iteração por array de `Payment`)
- Encapsulamento com atributos privados e getters/setters
- Uso do método construtor com `parent::__construct()`
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Payment`.
> Crie os arquivos na pasta `source/Models/Payment/`.

### Classe `Payment` (Pagamento — classe base)

1. Crie a classe `Payment` com os seguintes atributos privados:
    - `id` (int) — identificador do pagamento
    - `amount` (float) — valor (amount) do pagamento em reais
    - `status` (string) — status: `"pendente"`, `"aprovado"` ou `"recusado"`
    - `description` (string) — descrição (description) da cobrança
    - `createdAt` (string) — data e hora de criação no formato `Y-m-d H:i:s`

2. Implemente o método construtor que receba `id`, `amount` e `description`. O `status` deve iniciar como `"pendente"` e `createdAt` preenchido com `date('Y-m-d H:i:s')`.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método `calculateFee(): float` que retorne `0.0` — será **sobrescrito** pelas classes filhas.

5. Implemente um método `process(): string` que defina `status` como `"aprovado"` e retorne:
   ```
   Pagamento #id processado com sucesso.
   ```
   Será **sobrescrito** pelas classes filhas.

6. Implemente um método chamado `show()` que retorne as informações formatadas do pagamento:
   ```
   Pagamento: #id
   Descrição: Compra Online
   Valor: R$ 250,00
   Taxa: R$ 0,00
   Valor Total: R$ 250,00
   Status: pendente
   ```

---

### Classe `CreditCardPayment` (Cartão de Crédito — filha de `Payment`)

1. Crie a classe `CreditCardPayment` que **estende** `Payment`, adicionando os atributos privados:
    - `cardLastDigits` (string) — últimos 4 dígitos do cartão (card last digits)
    - `installments` (int) — número de parcelas (installments), mínimo 1
    - `feeRate` (float) — taxa percentual (fee rate) cobrada, ex: `2.5` para 2,5%

2. Implemente o método construtor com todos os atributos, chamando `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Sobrescreva (override)** `calculateFee()` para retornar: **valor × feeRate / 100**.

5. **Sobrescreva (override)** `process()` que defina `status` como `"aprovado"` e retorne:
   ```
   ✅ Cartão **** 4321 aprovado | 3x de R$ 86,83
   ```

6. **Sobrescreva (override)** `show()` para exibir as informações do pagamento por cartão, incluindo parcelas e taxa percentual.

---

### Classe `PixPayment` (Pix — filha de `Payment`)

1. Crie a classe `PixPayment` que **estende** `Payment`, adicionando os atributos privados:
    - `pixKey` (string) — chave Pix (Pix key) do recebedor
    - `pixKeyType` (string) — tipo da chave Pix: `"cpf"`, `"cnpj"`, `"email"`, `"telefone"` ou `"aleatoria"`

2. Implemente o método construtor com todos os atributos, chamando `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Sobrescreva (override)** `calculateFee()` para retornar `0.0` — Pix não cobra taxa.

5. **Sobrescreva (override)** `process()` que defina `status` como `"aprovado"` e retorne:
   ```
   ⚡ Pix aprovado instantaneamente! Chave: email@exemplo.com
   ```

6. **Sobrescreva (override)** `show()` para exibir as informações do Pix, incluindo chave, tipo e compensação instantânea.

---

### Classe `BoletoPayment` (Boleto — filha de `Payment`)

1. Crie a classe `BoletoPayment` que **estende** `Payment`, adicionando os atributos privados:
    - `barCode` (string) — código de barras (bar code) do boleto
    - `dueDate` (string) — data de vencimento (due date) no formato `Y-m-d`
    - `issuanceFee` (float) — taxa fixa de emissão (issuance fee), ex: `3.50`

2. Implemente o método construtor com todos os atributos, chamando `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Sobrescreva (override)** `calculateFee()` para retornar o valor fixo de `issuanceFee`.

5. **Sobrescreva (override)** `process()` que defina `status` como `"pendente"` (boleto ainda precisa ser pago) e retorne:
   ```
   🧾 Boleto gerado! Vencimento: 2025-06-08 | Valor Total: R$ 253,50
   ```

6. **Sobrescreva (override)** `show()` para exibir as informações do boleto, incluindo código de barras, vencimento e prazo de compensação de até 3 dias úteis.

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Payment\CreditCardPayment;
   use source\Models\Payment\PixPayment;
   use source\Models\Payment\BoletoPayment;
   ```

2. Instancie pelo menos **dois** objetos `CreditCardPayment` com diferentes parcelas e taxas.

3. Instancie pelo menos **dois** objetos `PixPayment` com diferentes tipos de chave.

4. Instancie pelo menos **um** objeto `BoletoPayment`.

5. Demonstre o **polimorfismo** armazenando todos os objetos em um único array e iterando sobre ele:
   ```php
   $payments = [$creditCard1, $creditCard2, $pix1, $pix2, $boleto];
   foreach ($payments as $payment) {
       echo $payment->process() . "\n";
       echo $payment->show() . "\n";
   }
   ```

6. Calcule e exiba a taxa de cada pagamento com `calculateFee()`, mostrando que cada tipo calcula de forma diferente.

7. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Observe que ao iterar o array com objetos de tipos diferentes, o mesmo método `process()` produz comportamentos completamente distintos — isso é o polimorfismo em ação.

