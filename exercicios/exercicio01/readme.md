# 📦 Programação Web II
## Exercício 01 – Classe `Product`

Uma loja virtual precisa manipular o catálogo de produtos exibidos no e-commerce. Cada item possui código interno, nome comercial e preço base que servem para calcular descontos promocionais e exibir informações no carrinho e nos relatórios de vendas. Para manter os dados consistentes e garantir que qualquer alteração siga as regras do domínio, o sistema utiliza a classe `Product`, responsável por representar cada produto e fornecer métodos seguros para aplicar descontos, formatar preços e disponibilizar os valores para outras camadas da aplicação.

## 🎯 Objetivo

Implementar uma classe simples em PHP aplicando:

- Definição de classe
- Encapsulamento
- Getters e Setters

---

## 📝 Enunciado

1. Crie a classe `Product` com os seguintes atributos:
    - `id` privado (int)
    - `name` privado (string)
    - `price` privado (float)

2. Crie um método chamado `discount` que recebe um valor percentual de desconto que deverá ser aplicado no preço do produto.

3. Crie um método chamado `show` para mostrar as informações do produto, nome e preço formatado em R$ 1.000,00.

4. Nesta primeira versão:
    - Instancie o objeto em `index.php`.
    - Atribua valores aos atributos utilizando o método construtor.
    - Atribua e altere valores dos atributos utilizando getters e setters
    - Exiba o nome e o preço usando `echo`.
