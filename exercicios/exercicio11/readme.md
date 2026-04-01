# 🔷 Programação Web II
## Exercício 11 – Classes Abstratas: `Shape`, `Circle`, `Rectangle`, `Triangle` (Abstração)

## 🧭 Contextualizando

Um sistema educacional de geometria precisa calcular áreas e perímetros de diferentes formas geométricas (geometric shapes). A solução deve garantir que toda forma implemente obrigatoriamente os cálculos de **área** (area) e **perímetro** (perimeter), mas cada figura possui sua própria fórmula específica. A **abstração** é o mecanismo ideal: uma classe abstrata `Shape` define o contrato — os métodos que todas as formas devem implementar — enquanto as classes concretas (`Circle`, `Rectangle`, `Triangle`) fornecem as implementações específicas para cada figura. Isso garante consistência e extensibilidade ao sistema: novas formas podem ser adicionadas sem alterar o código existente.

## 🎯 Objetivo

Praticar **abstração** em PHP usando classes abstratas e métodos abstratos:

- Definição de classe abstrata com métodos abstratos
- Implementação obrigatória de métodos abstratos nas classes concretas
- Encapsulamento com atributos protegidos/privados e getters/setters
- Organização de código com **namespaces**
- Aplicação de fórmulas matemáticas para cálculos geométricos

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Geometry`.
> Crie os arquivos na pasta `source/Models/Geometry/`.

### Classe Abstrata `Shape` (Forma Geométrica)

1. Crie a classe **abstrata** `Shape` com o seguinte atributo protegido:
    - `color` (string) — cor (color) da forma geométrica

2. Implemente o método construtor que receba e inicialize o atributo `color`.

3. Implemente getter e setter para o atributo `color`.

4. Declare os seguintes métodos **abstratos** (abstract):
    - `calculateArea(): float` — calcula a área (area) da forma
    - `calculatePerimeter(): float` — calcula o perímetro (perimeter) da forma

5. Implemente um método **concreto** chamado `show()` que retorne as informações formatadas da forma:
   ```
   Forma: Circle
   Cor: Azul
   Área: 78,54
   Perímetro: 31,42
   ```
   > **Dica:** use `get_class($this)` para obter o nome da classe dinamicamente.

---

### Classe `Circle` (Círculo — filha de `Shape`)

1. Crie a classe `Circle` que **estende** `Shape`, adicionando o seguinte atributo privado:
    - `radius` (float) — raio (radius) do círculo

2. Implemente o método construtor que receba `color` e `radius`, chamando `parent::__construct($color)`.

3. Implemente getter e setter para o atributo `radius`.

4. **Implemente** o método `calculateArea()` usando a fórmula:
   ```
   A = π × r²
   ```
   > Use a constante `M_PI` do PHP.

5. **Implemente** o método `calculatePerimeter()` usando a fórmula da circunferência (circumference):
   ```
   C = 2 × π × r
   ```

---

### Classe `Rectangle` (Retângulo — filha de `Shape`)

1. Crie a classe `Rectangle` que **estende** `Shape`, adicionando os seguintes atributos privados:
    - `width` (float) — largura (width) do retângulo
    - `height` (float) — altura (height) do retângulo

2. Implemente o método construtor que receba `color`, `width` e `height`, chamando `parent::__construct($color)`.

3. Implemente getters e setters para os atributos próprios.

4. **Implemente** o método `calculateArea()` usando a fórmula:
   ```
   A = largura × altura  (width × height)
   ```

5. **Implemente** o método `calculatePerimeter()` usando a fórmula:
   ```
   P = 2 × (largura + altura)  (2 × (width + height))
   ```

---

### Classe `Triangle` (Triângulo — filha de `Shape`)

1. Crie a classe `Triangle` que **estende** `Shape`, adicionando os seguintes atributos privados:
    - `base` (float) — base (base) do triângulo
    - `sideA` (float) — lado a (side a) do triângulo
    - `sideB` (float) — lado b (side b) do triângulo
    - `height` (float) — altura (height) do triângulo

2. Implemente o método construtor que receba `color`, `base`, `sideA`, `sideB` e `height`, chamando `parent::__construct($color)`.

3. Implemente getters e setters para os atributos próprios.

4. **Implemente** o método `calculateArea()` usando a fórmula:
   ```
   A = (base × altura) / 2  ((base × height) / 2)
   ```

5. **Implemente** o método `calculatePerimeter()` usando a fórmula:
   ```
   P = base + sideA + sideB
   ```

---

## 💡 Dicas

- Classes abstratas **não podem** ser instanciadas diretamente — experimente tentar e observe o erro.
- Todos os métodos abstratos **devem** ser implementados nas classes concretas, caso contrário o PHP lançará um erro fatal.
- Use a constante `M_PI` do PHP para o valor de π (pi).
- Use `number_format($value, 2, ',', '.')` para formatar os valores decimais na exibição.
- Use `get_class($this)` dentro do método `show()` para obter o nome da classe dinamicamente.
- O método `show()` é **concreto** na classe abstrata pois sua estrutura é igual para todas as subclasses; apenas os valores mudam.

