# 🏋️ Programação Web II — Avaliação

## 📋 Instruções Gerais

- **Duração:** 2 horas e 30 minutos
- **Formato:** Individual, sem internet, com consulta ao material de aula disponibilizado
- **Pontuação:** Questão 1 vale **4 pontos** | Questão 2 vale **6 pontos** | Total: **10 pontos** | **1 ponto extra**
- **Estrutura:** Os `scripts` das classes já estão criados na pasta `source/Models/` dentro da namespace correspondente. O arquivo `source/autoload.php` já está disponível.
- **Arquivos de resposta:** `question-01.php` (Questão 1) e `question-02.php` (Questão 2) — o `require` do autoload e os `use` das classes já estão incluídos.

---

# Questão 1 — Classe `Member` (2,5 pontos)

## 🧭 Contextualizando

Uma academia de ginástica precisa de um sistema para cadastrar seus membros. Cada membro possui um identificador, nome completo, e-mail de contato, tipo de plano contratado (mensal, trimestral ou anual) e o valor da mensalidade. O sistema precisa calcular automaticamente o custo total do plano considerando descontos progressivos para planos mais longos e exibir as informações do membro de forma organizada. A classe `Member` encapsula esses dados, garantindo que nenhum código externo altere diretamente os atributos sem passar pelos métodos controlados da classe.

## 🎯 Objetivo

Implementar uma classe em PHP aplicando:

- Definição de classe com atributos **privados**
- **Encapsulamento** com getters e setters
- Uso do método **construtor** para inicializar valores
- Método de negócio com cálculo
- Organização de código com **namespace**

---

## 📝 Enunciado

> **Namespace:** `source\Models\Gym`
> Utilize o arquivo `Member.php` na pasta `source/Models/Gym/`.

### Classe `Member`

1. Crie a classe `Member` com os seguintes atributos **privados** (private) **(0,5 ponto)**:
    - `id` (int) — identificador único do membro
    - `name` (string) — nome completo do membro (ex.: "João Silva")
    - `email` (string) — e-mail de contato (ex.: "joao@email.com")
    - `plan` (string) — tipo de plano: "mensal", "trimestral" ou "anual"
    - `monthlyFee` (float) — valor da mensalidade em reais

2. Implemente o método **construtor** (`__construct`) que receba e inicialize os cinco atributos **(0,5 ponto)**.

3. Implemente **getters e setters** para todos os atributos **(0,5 ponto)**.

4. Implemente um método chamado `calculateTotalCost(): float` que retorne o custo total do plano contratado, calculado como **(0,5 ponto)**:
   ```
   Plano "mensal":     monthlyFee × 1         (sem desconto)
   Plano "trimestral": monthlyFee × 3 × 0.90  (10% de desconto)
   Plano "anual":      monthlyFee × 12 × 0.75 (25% de desconto)
   ```
   > Exemplo: membro com mensalidade de R$ 120,00 no plano trimestral = 120 × 3 × 0.90 = R$ 324,00

5. Implemente um método chamado `show(): string` que retorne as informações formatadas do membro **(0,5 ponto)**:
   ```
   Membro: #1 - João Silva
   E-mail: joao@email.com
   Plano: trimestral
   Mensalidade: R$ 120,00
   Custo Total do Plano: R$ 324,00
   ```

### No arquivo `question-01.php` **0,5 ponto extra**

1. A classe já está importada com `use source\Models\Gym\Member;`.

2. Instancie pelo menos **dois** objetos `Member` com dados diferentes.

3. Utilize getters e setters para consultar e atualizar atributos após a criação.

4. Chame o método `calculateTotalCost()` e exiba o resultado.

5. Exiba as informações de cada membro chamando `show()` e imprimindo com `echo`.

---

# Questão 2 — Classes `Workout`, `CardioWorkout` e `StrengthWorkout` (7,5 pontos)

## 🧭 Contextualizando

No módulo de treinos da academia, os treinos podem ser de dois tipos — **cardio** (esteira, bicicleta, elíptico) ou **musculação** (aparelhos, pesos livres, funcionais) — cada um com regras específicas de cálculo de calorias queimadas e estimativa de duração total. Todos os treinos compartilham informações básicas: o nome do aluno, o nome do instrutor e uma duração base em minutos. Porém, o treino **cardio** tem suas calorias influenciadas pela intensidade do exercício (leve, moderada ou intensa), enquanto o treino de **musculação** varia de acordo com o grupo muscular trabalhado (superior, inferior ou completo). A **abstração** garante que todo treino implemente obrigatoriamente os métodos de cálculo de calorias e estimativa de duração, enquanto cada classe concreta fornece a sua própria lógica. O **polimorfismo** permite que o sistema gere relatórios de desempenho iterando sobre todos os treinos de forma uniforme, independentemente do tipo.

## 🎯 Objetivo

Aplicar **herança**, **polimorfismo** e **abstração** em PHP:

- Definição de classe **abstrata** com métodos abstratos e método concreto
- Criação de classes filhas que **implementam** os métodos abstratos com comportamentos distintos
- Uso do método construtor com `parent::__construct()`
- Polimorfismo através da implementação específica dos métodos abstratos
- Encapsulamento com atributos protegidos/privados e getters/setters
- Organização de código com **namespace**

---

## 📝 Enunciado

> **Namespace:** `source\Models\Gym`
> Utilize os arquivos `Workout.php`, `CardioWorkout.php` e `StrengthWorkout.php` na pasta `source/Models/Gym/`.

### Classe Abstrata `Workout` (Treino)

1. Crie a classe **abstrata** `Workout` com os seguintes atributos **protegidos** (protected) **(0,5 ponto)**:
    - `memberName` (string) — nome do aluno
    - `trainerName` (string) — nome do instrutor
    - `baseDuration` (int) — duração base do treino em minutos

2. Implemente o método **construtor** que receba e inicialize os três atributos **(0,5 ponto)**.

3. Implemente **getters e setters** para todos os atributos **(0,5 ponto)**.

4. Declare os seguintes métodos **abstratos** (abstract) **(0,5 ponto)**:
    - `calculateCalories(): float` — calcula o total de calorias queimadas
    - `estimateDuration(): int` — estima a duração total do treino em minutos

5. Implemente um método **concreto** chamado `show(): string` que retorne as informações formatadas do treino **(0,5 ponto)**:
   ```
   Treino: CardioWorkout
   Aluno: João Silva | Instrutor: Carlos Lima
   Duração Base: 30 minutos
   Calorias Queimadas: 240,00 kcal
   Duração Total Estimada: 45 minutos
   ```
   > **Dica:** dentro do método `show()`, chame `$this->calculateCalories()` e `$this->estimateDuration()` para obter os valores calculados pelas classes filhas.

### Classe `CardioWorkout` (Treino Cardio — filha de `Workout`)

1. Crie a classe `CardioWorkout` que **estende** `Workout`, adicionando o seguinte atributo **privado** (private) **(0,5 ponto)**:
    - `intensity` (string) — intensidade do treino: `"leve"`, `"moderada"` ou `"intensa"`

2. Implemente o método **construtor** que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe **(0,5 ponto)**.

3. Implemente getter e setter para o atributo próprio (`intensity`) **(0,5 ponto)**.

4. **Implemente** o método `calculateCalories(): float` com a seguinte regra **(0,5 ponto)**:
    - Intensidade **leve**: `baseDuration × 5` calorias
    - Intensidade **moderada**: `baseDuration × 8` calorias
    - Intensidade **intensa**: `baseDuration × 12` calorias

5. **Implemente** o método `estimateDuration(): int` com a seguinte regra **(0,5 ponto)**:
    - Intensidade **leve**: 30 minutos
    - Intensidade **moderada**: 45 minutos
    - Intensidade **intensa**: 60 minutos

### Classe `StrengthWorkout` (Treino de Musculação — filha de `Workout`)

1. Crie a classe `StrengthWorkout` que **estende** `Workout`, adicionando o seguinte atributo **privado** (private) **(0,5 ponto)**:
    - `muscleGroup` (string) — grupo muscular trabalhado: `"superior"`, `"inferior"` ou `"completo"`

2. Implemente o método **construtor** que receba todos os atributos (incluindo os herdados) e chame `parent::__construct()` para inicializar os atributos da classe mãe **(0,5 ponto)**.

3. Implemente getter e setter para o atributo próprio (`muscleGroup`) **(0,5 ponto)**.

4. **Implemente** o método `calculateCalories(): float` com a seguinte regra **(0,5 ponto)**:
    - Grupo **superior**: `baseDuration × 6` calorias
    - Grupo **inferior**: `baseDuration × 7` calorias
    - Grupo **completo**: `baseDuration × 10` calorias

5. **Implemente** o método `estimateDuration(): int` com a seguinte regra **(0,5 ponto)**:
    - Grupo **superior**: 45 minutos
    - Grupo **inferior**: 50 minutos
    - Grupo **completo**: 75 minutos

### No arquivo `question-02.php` **0,5 ponto extra**

1. As classes já estão importadas com `use`.

2. Instancie pelo menos **dois** objetos `CardioWorkout` com intensidades diferentes.

3. Instancie pelo menos **dois** objetos `StrengthWorkout` com grupos musculares diferentes.

4. Utilize getters e setters para consultar (`getters`) e atualizar (`setters`) atributos após a criação.

5. Exiba o resultado chamando `show()` de cada treino, imprimindo com `echo`.

---

## 💡 Funções PHP Nativas Utilizadas

### `number_format()`
Formata um número com casas decimais, separador decimal e separador de milhar.
```php
number_format(float $num, int $decimals, string $dec_point, string $thousands_sep): string
```
**Exemplo:**
```php
echo number_format(1500.5, 2, ',', '.'); // Saída: "1.500,50"
```

### `get_class()`
Retorna o nome da classe de um objeto como string.
```php
get_class(object $object): string
```
**Exemplo:**
```php
$cardio = new CardioWorkout("João", "Carlos", 30, "intensa");
echo get_class($cardio); // Saída: "source\Models\Gym\CardioWorkout"
```
> **Dica:** Para obter apenas o nome curto da classe (sem o namespace), use:
> ```php
> $parts = explode("\\", get_class($this));
> $className = end($parts);
> ```
> - `explode(string $separator, string $string): array` — divide uma string em um array usando o separador informado.
> - `end(array $array): mixed` — retorna o último elemento de um array.

