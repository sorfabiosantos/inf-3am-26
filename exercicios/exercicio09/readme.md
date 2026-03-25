# 🚗 Programação Web II
## Exercício 09 – Classes `Vehicle`, `Car`, `Motorcycle`, `Owner` (Herança + Polimorfismo + Associação)

## 🧭 Contextualizando

Uma concessionária de veículos precisa gerenciar seu inventário e os proprietários de forma integrada. O sistema armazena informações gerais de **veículos** — como código de chassi, marca, modelo e ano — que servem como base comum para diferentes tipos de veículos. Cada tipo — **carro** (`Car`) ou **motocicleta** (`Motorcycle`) — apresenta características específicas: carros possuem quantidade de portas e tipo de combustível, enquanto motocicletas informam cilindradas. Além disso, cada veículo está associado a um **proprietário** (`Owner`) que contém identificador, nome, CPF e telefone. O sistema utiliza **polimorfismo** para calcular impostos diferentes para cada tipo de veículo — carros pagam 15% do valor base, motocicletas apenas 5% — e **associação** para garantir que toda mudança de proprietário seja rastreável e consistente em relatórios de propriedade, certidões e documentação fiscal.

## 🎯 Objetivo

Combinar **herança**, **polimorfismo** e **associação** em PHP exercitando:

- Definição de classe base abstrata ou genérica (`Vehicle`)
- Definição de classes filhas que especializam comportamentos (`Car` e `Motorcycle` → `Vehicle`)
- Polimorfismo através da sobrescrita de métodos
- Relacionamento por associação (`Vehicle` possui um `Owner`)
- Encapsulamento com atributos privados e getters/setters
- Uso do método construtor com `parent::__construct()`
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Vehicles`.
> Crie os arquivos na pasta `source/Models/Vehicles/`.

### Classe `Owner` (Proprietário)

1. Crie a classe `Owner` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string)
    - `cpf` (string)
    - `phone` (string)

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show()` que retorne as informações formatadas do proprietário:
   ```
   Proprietário: #id - Nome: Nome
   CPF: 123.456.789-00
   Telefone: (11) 98765-4321
   ```

### Classe `Vehicle` (Veículo - classe base)

1. Crie a classe `Vehicle` com os seguintes atributos privados:
    - `chassisCode` (string) — código de chassi único
    - `brand` (string) — marca do veículo
    - `model` (string) — modelo do veículo
    - `year` (int) — ano de fabricação
    - `basePrice` (float) — valor base do veículo em reais
    - `owner` (Owner) — objeto do proprietário do veículo

2. Implemente o método construtor que receba e inicialize todos os atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `calculateTax()` que retorne o valor do imposto sobre o veículo. Este é um método que será **sobrescrito** pelas classes filhas (defina como `public` ou use como base).

5. Implemente um método chamado `show()` que retorne as informações formatadas do veículo:
   ```
   Veículo: Marca - Modelo (Ano)
   Código de Chassi: ABC123456
   Valor Base: R$ 50.000,00
   Proprietário: Nome do Proprietário
   ```

### Classe `Car` (Carro - filha de `Vehicle`)

1. Crie a classe `Car` que **estende** `Vehicle`, adicionando os seguintes atributos privados:
    - `doors` (int) — quantidade de portas (2, 4, 5)
    - `fuelType` (string) — tipo de combustível (Gasolina, Diesel, Álcool, Híbrido)

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Sobrescreva (override)** o método `calculateTax()` para retornar **15% do valor base do veículo**.

5. **Sobrescreva (override)** o método `show()` para exibir as informações do carro incluindo portas e combustível:
   ```
   Carro: Marca - Modelo (Ano)
   Código de Chassi: ABC123456
   Valor Base: R$ 50.000,00
   Portas: 4
   Combustível: Gasolina
   Imposto (15%): R$ 7.500,00
   Proprietário: Nome do Proprietário
   ```

### Classe `Motorcycle` (Motocicleta - filha de `Vehicle`)

1. Crie a classe `Motorcycle` que **estende** `Vehicle`, adicionando o seguinte atributo privado:
    - `displacement` (int) — cilindradas do motor (cc) — exemplo: 125cc, 250cc, 500cc

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para o atributo próprio.

4. **Sobrescreva (override)** o método `calculateTax()` para retornar **5% do valor base do veículo**.

5. **Sobrescreva (override)** o método `show()` para exibir as informações da motocicleta incluindo cilindradas:
   ```
   Motocicleta: Marca - Modelo (Ano)
   Código de Chassi: XYZ789012
   Valor Base: R$ 15.000,00
   Cilindradas: 500cc
   Imposto (5%): R$ 750,00
   Proprietário: Nome do Proprietário
   ```

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Vehicles\Owner;
   use source\Models\Vehicles\Car;
   use source\Models\Vehicles\Motorcycle;
   ```

2. Instancie pelo menos **dois** objetos `Owner` com dados diferentes.

3. Instancie pelo menos **dois** objetos `Car` com proprietários diferentes, incluindo diferentes tipos de combustível.

4. Instancie pelo menos **um** objeto `Motorcycle` com cilindradas e proprietário.

5. Utilize getters e setters para consultar e atualizar atributos dos veículos e proprietários após a criação dos objetos.

6. Exiba o resultado chamando `show()` de cada veículo e proprietário, imprimindo com `echo`.

7. Demonstre o polimorfismo calculando e exibindo o imposto de cada veículo, mostrando que carros e motocicletas pagam percentuais diferentes.

8. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar mais veículos com diferentes proprietários, combustíveis e cilindradas para simular um inventário de concessionária completo.

