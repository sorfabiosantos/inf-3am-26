# 🚗 Programação Web II
## Exercício 19 – Classes `Vehicle`, `Car`, `Motorcycle`, `Truck` (Herança)

## 🧭 Contextualizando

Uma concessionária digital precisa cadastrar e gerenciar sua frota de veículos (vehicles) em um sistema organizado. Todos os veículos compartilham informações básicas — como marca (brand), modelo (model), ano (year) e quilometragem (mileage) — mas cada categoria possui características únicas: carros (cars) têm número de portas (doors) e capacidade do porta-malas (trunk capacity); motocicletas (motorcycles) informam a cilindrada do motor (engine displacement) e se possuem sidecar (sidecar); caminhões (trucks) têm capacidade de carga (payload) e número de eixos (axles). A **herança** permite que as classes especializadas reutilizem os atributos e comportamentos da classe base `Vehicle`, adicionando apenas o que é específico a cada tipo, evitando repetição de código e tornando o sistema facilmente extensível.

## 🎯 Objetivo

Praticar **herança** em PHP modelando uma hierarquia de veículos para uma concessionária:

- Definição de classe base com atributos e comportamentos comuns
- Criação de classes filhas que **estendem** a classe base
- Uso do método construtor com `parent::__construct()`
- Sobrescrita (override) do método `show()` nas classes filhas
- Encapsulamento com atributos privados e getters/setters
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Vehicle`.
> Crie os arquivos na pasta `source/Models/Vehicle/`.

### Classe `Vehicle` (Veículo — classe base)

1. Crie a classe `Vehicle` com os seguintes atributos **privados**:
    - `id` (int) — identificador do veículo
    - `brand` (string) — marca (brand) do veículo, ex: `"Toyota"`, `"Honda"`
    - `model` (string) — modelo (model) do veículo, ex: `"Corolla"`, `"Civic"`
    - `year` (int) — ano de fabricação (manufacturing year) do veículo
    - `fuelType` (string) — tipo de combustível (fuel type): `"gasolina"`, `"etanol"`, `"diesel"`, `"elétrico"`, `"flex"`
    - `mileage` (float) — quilometragem (mileage) atual em km; inicializado como `0.0`
    - `color` (string) — cor (color) do veículo

2. Implemente o método construtor que receba e inicialize os sete atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `refuel(): string` que retorne:
   ```
   Toyota Corolla está sendo abastecido com gasolina.
   ```

5. Implemente um método chamado `drive(float $km): string` que some o valor de `$km` à quilometragem atual e retorne:
   ```
   Toyota Corolla percorreu 150,00 km. Quilometragem atual: 150,00 km.
   ```

6. Implemente um método chamado `show()` que retorne as informações formatadas do veículo:
   ```
   Veículo (Vehicle): #id - Toyota Corolla
   Ano (Year): 2023
   Cor (Color): Prata
   Combustível (Fuel Type): gasolina
   Quilometragem (Mileage): 15.000,00 km
   ```

---

### Classe `Car` (Carro — filha de `Vehicle`)

1. Crie a classe `Car` que **estende** `Vehicle`, adicionando os seguintes atributos **privados**:
    - `doors` (int) — número de portas (number of doors), ex: `2`, `4`
    - `passengers` (int) — capacidade de passageiros (passenger capacity), ex: `5`
    - `trunkCapacity` (float) — capacidade do porta-malas (trunk capacity) em litros

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. Implemente um método chamado `openTrunk(): string` que retorne:
   ```
   O porta-malas do Toyota Corolla foi aberto. Capacidade: 370,00 litros.
   ```

5. **Sobrescreva (override)** o método `show()` para exibir as informações do carro incluindo os atributos específicos:
   ```
   Carro (Car): #id - Toyota Corolla
   Ano (Year): 2023
   Cor (Color): Prata
   Combustível (Fuel Type): gasolina
   Quilometragem (Mileage): 15.000,00 km
   Portas (Doors): 4
   Passageiros (Passengers): 5
   Porta-malas (Trunk Capacity): 370,00 litros
   ```

---

### Classe `Motorcycle` (Motocicleta — filha de `Vehicle`)

1. Crie a classe `Motorcycle` que **estende** `Vehicle`, adicionando os seguintes atributos **privados**:
    - `engineCC` (int) — cilindrada do motor (engine displacement) em CC, ex: `600`, `1000`
    - `hasSidecar` (bool) — indica se possui sidecar (has sidecar): `true` ou `false`

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. Implemente um método chamado `wheelie(): string` que retorne:
   ```
   Honda CB 600 está fazendo um wheeling!   (se engineCC >= 600)
   Honda Biz 125 não tem potência para wheeling.  (se engineCC < 600)
   ```

5. **Sobrescreva (override)** o método `show()` para exibir as informações da motocicleta incluindo os atributos específicos:
   ```
   Motocicleta (Motorcycle): #id - Honda CB 600
   Ano (Year): 2022
   Cor (Color): Preta
   Combustível (Fuel Type): gasolina
   Quilometragem (Mileage): 8.500,00 km
   Cilindrada (Engine Displacement): 600 CC
   Sidecar: Não
   ```

---

### Classe `Truck` (Caminhão — filha de `Vehicle`)

1. Crie a classe `Truck` que **estende** `Vehicle`, adicionando os seguintes atributos **privados**:
    - `payload` (float) — capacidade de carga (payload) em toneladas, ex: `5.0`, `15.0`
    - `axles` (int) — número de eixos (number of axles), ex: `2`, `3`, `6`
    - `hasRefrigeration` (bool) — indica se possui baú refrigerado (refrigerated cargo): `true` ou `false`

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. Implemente um método chamado `loadCargo(float $tons): string` que retorne, validando se o peso não excede a capacidade:
   ```
   Volvo FH 460 carregado com 10,00 toneladas com sucesso!        (se $tons <= payload)
   Carga de 20,00 toneladas excede a capacidade do Volvo FH 460 (15,00 ton).  (se exceder)
   ```

5. **Sobrescreva (override)** o método `show()` para exibir as informações do caminhão incluindo os atributos específicos:
   ```
   Caminhão (Truck): #id - Volvo FH 460
   Ano (Year): 2021
   Cor (Color): Branco
   Combustível (Fuel Type): diesel
   Quilometragem (Mileage): 120.000,00 km
   Capacidade de Carga (Payload): 15,00 toneladas
   Eixos (Axles): 6
   Baú Refrigerado (Refrigerated): Sim
   ```

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Vehicle\Car;
   use source\Models\Vehicle\Motorcycle;
   use source\Models\Vehicle\Truck;
   ```

2. Instancie pelo menos **dois** objetos `Car` com dados diferentes.

3. Instancie pelo menos **dois** objetos `Motorcycle`, incluindo uma com cilindrada acima e outra abaixo de 600 CC para testar o método `wheelie()`.

4. Instancie pelo menos **um** objeto `Truck`.

5. Chame os métodos `drive()` em cada veículo para atualizar a quilometragem e exiba os resultados.

6. Utilize `refuel()` e os métodos específicos de cada classe (`openTrunk()`, `wheelie()`, `loadCargo()`).

7. Tente passar uma carga que excede a capacidade do caminhão para verificar a validação de `loadCargo()`.

8. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.

9. Exiba o resultado chamando `show()` de cada veículo, imprimindo com `echo`.

10. Demonstre a **herança** chamando `refuel()` (herdado de `Vehicle`) diretamente em objetos das classes filhas.

11. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar veículos com diferentes tipos de combustível e anos de fabricação. Observe que os métodos `refuel()` e `drive()`, herdados de `Vehicle`, funcionam para todos os tipos de veículo — isso é herança em ação.





