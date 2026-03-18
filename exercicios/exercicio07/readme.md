# 📐 Programação Web II
## Exercício 07 – Classes `PythagoreanTheorem` e `Bhaskara` (Namespace)

## 🧭 Contextualizando

Em plataformas de ensino de matemática, é comum disponibilizar calculadoras especializadas para auxiliar alunos no aprendizado de fórmulas fundamentais. O sistema precisa oferecer ferramentas para resolver dois dos teoremas mais importantes da geometria e da álgebra: o **Teorema de Pitágoras**, que relaciona os catetos (catheti) e a hipotenusa (hypotenuse) de um triângulo retângulo (right triangle); e a **Fórmula de Báskara**, que encontra as raízes (roots) de uma equação quadrática (quadratic equation) a partir dos coeficientes (coefficients) da equação. Ambas as classes compartilham a mesma namespace `Math`, garantindo organização e separação lógica dos módulos do sistema.

## 🎯 Objetivo

Praticar **namespaces** em PHP organizando cálculos matemáticos em classes especializadas:

- Organização de classes dentro de uma **namespace** comum
- Definição de atributos privados e encapsulamento com getters e setters
- Implementação de métodos com lógica matemática
- Uso do método construtor para inicializar valores

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Math`.
> Crie os arquivos `PythagoreanTheorem.php` e `Bhaskara.php` na pasta `source/Models/Math/`.

### Classe `PythagoreanTheorem` (Teorema de Pitágoras)

1. Crie a classe `PythagoreanTheorem` com os seguintes atributos privados:
    - `cathetusA` (float) — cateto a (cathetus a): primeiro lado do triângulo retângulo (right triangle) que forma o ângulo reto (right angle)
    - `cathetusB` (float) — cateto b (cathetus b): segundo lado do triângulo retângulo (right triangle) que forma o ângulo reto (right angle)
    - `hypotenuse` (float) — hipotenusa (hypotenuse): lado oposto ao ângulo reto (right angle), calculado pela fórmula `c = √(a² + b²)`

2. Implemente o método construtor que receba e inicialize os atributos `cathetusA` e `cathetusB`.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `calculate` que calcule e armazene a hipotenusa (hypotenuse) a partir dos catetos (catheti) informados, usando a fórmula: `c = √(a² + b²)`.

5. Implemente um método chamado `show` que retorne as informações formatadas do cálculo:
   ```
   Teorema de Pitágoras (Pythagorean Theorem)
   Cateto a (Cathetus a): 3
   Cateto b (Cathetus b): 4
   Hipotenusa (Hypotenuse): 5
   ```

### Classe `Bhaskara` (Fórmula de Báskara)

1. Crie a classe `Bhaskara` com os seguintes atributos privados:
    - `a` (float) — coeficiente a (coefficient a): coeficiente do termo quadrático (quadratic term)
    - `b` (float) — coeficiente b (coefficient b): coeficiente do termo linear (linear term)
    - `c` (float) — coeficiente c (coefficient c): termo independente (constant term)
    - `discriminant` (float) — discriminante (discriminant), também chamado delta (delta): valor calculado pela fórmula `Δ = b² − 4ac`
    - `root1` (float|null) — primeira raiz (first root): resultado `x₁ = (−b + √Δ) / 2a`
    - `root2` (float|null) — segunda raiz (second root): resultado `x₂ = (−b − √Δ) / 2a`

2. Implemente o método construtor que receba e inicialize os atributos `a`, `b` e `c`.

3. Implemente getters e setters para os atributos `a`, `b` e `c`.

4. Implemente um método chamado `calculate` que:
    - Calcule o discriminante (discriminant): `Δ = b² − 4ac`
    - Se o discriminante (discriminant) for **negativo**, não existem raízes reais (real roots) — armazene `null` em `root1` e `root2`
    - Se o discriminante (discriminant) for **zero**, existe apenas uma raiz real (real root) — armazene o mesmo valor em `root1` e `root2`
    - Se o discriminante (discriminant) for **positivo**, existem duas raízes reais distintas (distinct real roots) — calcule e armazene `root1` e `root2`

5. Implemente um método chamado `show` que retorne as informações formatadas do cálculo:
   ```
   Fórmula de Báskara (Bhaskara's Formula)
   Coeficiente a (Coefficient a): 1
   Coeficiente b (Coefficient b): -5
   Coeficiente c (Coefficient c): 6
   Discriminante (Discriminant) Δ: 1
   Raiz 1 (Root 1) x₁: 3
   Raiz 2 (Root 2) x₂: 2
   ```
   > Caso não existam raízes reais (real roots), exiba uma mensagem informando que a equação não possui solução real.

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Math\PythagoreanTheorem;
   use source\Models\Math\Bhaskara;
   ```

2. Instancie pelo menos **dois** objetos `PythagoreanTheorem` com catetos (catheti) diferentes.

3. Instancie pelo menos **dois** objetos `Bhaskara` com coeficientes (coefficients) diferentes — inclua ao menos um caso com discriminante (discriminant) negativo.

4. Utilize getters e setters para consultar e atualizar os atributos após a criação dos objetos.

5. Chame o método `calculate` antes de `show` em cada objeto.

6. Exiba o resultado chamando `show()` de cada objeto, imprimindo com `echo`.

7. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Experimente diferentes valores de catetos (catheti) e coeficientes (coefficients) para observar os diferentes resultados dos cálculos.

