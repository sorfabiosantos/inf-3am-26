# 🦁 Programação Web II
## Exercício 14 – Classes `Animal`, `Mammal`, `Bird`, `Reptile` (Herança)

## 🧭 Contextualizando

Um zoológico digital precisa organizar o cadastro de seus animais em um sistema hierárquico que reflita a classificação biológica real. Todos os animais compartilham informações básicas — como nome, espécie (species), habitat e peso — mas cada classe biológica possui características únicas: mamíferos (mammals) possuem pelo (fur) e são de sangue quente (warm-blooded); aves (birds) possuem envergadura das asas (wingspan) e indicam se conseguem voar (can fly); répteis (reptiles) informam se são venenosos (venomous) e o tipo de escamas (scale type). A **herança** permite que as classes especializadas reutilizem os atributos e comportamentos da classe base `Animal`, adicionando apenas o que é específico a cada grupo, evitando repetição de código e facilitando futuras extensões do sistema.

## 🎯 Objetivo

Praticar **herança** em PHP modelando uma hierarquia de animais para um zoológico:

- Definição de classe base com atributos e comportamentos comuns
- Criação de classes filhas que **estendem** a classe base
- Uso do método construtor com `parent::__construct()`
- Reaproveitamento de métodos herdados com possibilidade de extensão
- Encapsulamento com atributos privados e getters/setters
- Organização de código com **namespaces**

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Zoo`.
> Crie os arquivos na pasta `source/Models/Zoo/`.

### Classe `Animal` (Animal — classe base)

1. Crie a classe `Animal` com os seguintes atributos privados:
    - `id` (int) — identificador do animal
    - `name` (string) — nome (name) do animal, ex: "Simba"
    - `species` (string) — espécie (species) do animal, ex: "Panthera leo"
    - `habitat` (string) — habitat natural (natural habitat) do animal, ex: "Savana"
    - `weight` (float) — peso (weight) do animal em quilogramas
    - `age` (int) — idade (age) do animal em anos

2. Implemente o método construtor que receba e inicialize os seis atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `eat(): string` que retorne:
   ```
   Simba está se alimentando.
   ```

5. Implemente um método chamado `sleep(): string` que retorne:
   ```
   Simba está dormindo.
   ```

6. Implemente um método chamado `show()` que retorne as informações formatadas do animal:
   ```
   Animal: #id - Simba
   Espécie (Species): Panthera leo
   Habitat: Savana
   Peso (Weight): 190,00 kg
   Idade (Age): 5 anos
   ```

---

### Classe `Mammal` (Mamífero — filha de `Animal`)

1. Crie a classe `Mammal` que **estende** `Animal`, adicionando os seguintes atributos privados:
    - `furColor` (string) — cor do pelo (fur color) do mamífero
    - `gestationPeriod` (int) — período de gestação (gestation period) em dias

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. Implemente um método chamado `breastfeed(): string` que retorne:
   ```
   Simba está amamentando seus filhotes.
   ```

5. **Sobrescreva (override)** o método `show()` para exibir as informações do mamífero incluindo os atributos específicos:
   ```
   Mamífero (Mammal): #id - Simba
   Espécie (Species): Panthera leo
   Habitat: Savana
   Peso (Weight): 190,00 kg
   Idade (Age): 5 anos
   Cor do Pelo (Fur Color): Dourado
   Período de Gestação (Gestation Period): 110 dias
   ```

---

### Classe `Bird` (Ave — filha de `Animal`)

1. Crie a classe `Bird` que **estende** `Animal`, adicionando os seguintes atributos privados:
    - `wingspan` (float) — envergadura das asas (wingspan) em centímetros
    - `canFly` (bool) — indica se a ave consegue voar (can fly): `true` para voa, `false` para não voa

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. Implemente um método chamado `sing(): string` que retorne:
   ```
   Blu está cantando.
   ```

5. Implemente um método chamado `fly(): string` que retorne, de acordo com `canFly`:
   ```
   Blu está voando!          (se canFly for true)
   Blu não consegue voar.    (se canFly for false)
   ```

6. **Sobrescreva (override)** o método `show()` para exibir as informações da ave incluindo os atributos específicos:
   ```
   Ave (Bird): #id - Blu
   Espécie (Species): Spix's Macaw
   Habitat: Floresta Tropical
   Peso (Weight): 0,30 kg
   Idade (Age): 3 anos
   Envergadura (Wingspan): 40,00 cm
   Voa (Can Fly): Sim
   ```

---

### Classe `Reptile` (Réptil — filha de `Animal`)

1. Crie a classe `Reptile` que **estende** `Animal`, adicionando os seguintes atributos privados:
    - `isVenomous` (bool) — indica se o réptil é venenoso (venomous): `true` ou `false`
    - `scaleType` (string) — tipo de escamas (scale type), ex: "Lisas", "Carenadas", "Granulosas"

2. Implemente o método construtor que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. Implemente um método chamado `shed(): string` que retorne:
   ```
   Rex está trocando de pele (shedding).
   ```

5. **Sobrescreva (override)** o método `show()` para exibir as informações do réptil incluindo os atributos específicos:
   ```
   Réptil (Reptile): #id - Rex
   Espécie (Species): Boa constrictor
   Habitat: Floresta Amazônica
   Peso (Weight): 12,00 kg
   Idade (Age): 8 anos
   Venenoso (Venomous): Não
   Tipo de Escamas (Scale Type): Lisas
   ```

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Zoo\Animal;
   use source\Models\Zoo\Mammal;
   use source\Models\Zoo\Bird;
   use source\Models\Zoo\Reptile;
   ```

2. Instancie pelo menos **dois** objetos `Mammal` com dados diferentes (ex: leão e golfinho).

3. Instancie pelo menos **dois** objetos `Bird`, incluindo uma ave que não voa (ex: pinguim) e uma que voa (ex: arara).

4. Instancie pelo menos **um** objeto `Reptile`.

5. Chame os métodos comportamentais (`eat()`, `sleep()`, `breastfeed()`, `sing()`, `fly()`, `shed()`) de cada objeto e exiba os resultados com `echo`.

6. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.

7. Exiba o resultado chamando `show()` de cada animal, imprimindo com `echo`.

8. Demonstre a **herança** acessando o método `eat()` (herdado de `Animal`) diretamente em objetos das classes filhas.

9. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente criar mais animais de cada tipo para simular o acervo completo do zoológico. Adicione uma ave que não voa para demonstrar a lógica condicional do método `fly()`.



