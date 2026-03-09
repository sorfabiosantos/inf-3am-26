# 📦 Programação Web II
## Exercício 03 – Classe `Employee`

## 🧭 Contextualizando

No módulo de recursos humanos de um ERP corporativo, o cadastro de colaboradores é a base para folha de pagamento, controle de ponto e gestão de benefícios. A classe `Employee` representa cada funcionário dentro do sistema, armazenando o código de matrícula, o nome completo e o salário base. Quando o departamento financeiro precisa aplicar reajustes salariais — sejam aumentos por mérito, dissídios coletivos ou correções — o objeto garante que o cálculo seja feito de forma padronizada, evitando inconsistências entre os diferentes módulos que consomem essa informação, como holerites, relatórios gerenciais e integração contábil.

## 🎯 Objetivo

Reforçar a prática de criação de classes em PHP exercitando:

- Definição de classe e atributos privados
- Encapsulamento com getters e setters
- Uso do método construtor para inicializar valores
- Regra simples de negócio (aplicar reajuste salarial) com método próprio

---

## 📝 Enunciado

1. Crie a classe `Employee` com os seguintes atributos privados:
    - `id` (int)
    - `name` (string)
    - `salary` (float)

2. Implemente um método chamado `raise` que receba um valor percentual de reajuste (ex.: 10 para 10%) e aplique esse aumento ao salário do funcionário.

3. Implemente um método chamado `show` para retornar as informações formatadas do funcionário (`Funcionário: #id - Nome: Nome - Salário: R$ 1.000,00`).

4. No arquivo `index.php`:
    - Instancie o objeto utilizando o construtor, definindo os três atributos.
    - Utilize os getters e setters para consultar e atualizar `name` e `salary` após a criação.
    - Aplique pelo menos uma chamada ao método `raise`.
    - Exiba o resultado chamando `show()` e imprimindo com `echo`.

5. Garanta que o código continue legível e organizado, mantendo o mesmo nível de dificuldade dos exercícios anteriores.

> Experimente alterar os valores e percentuais para observar os diferentes resultados do método `show`.

