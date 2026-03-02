# 📦 Programação Web II
## Exercício 02 – Classe `Order`

Uma plataforma de gestão de vendas precisa controlar cada pedido processado pelo sistema. A classe \`Order\` representa o pedido que trafega entre o checkout, a expedição e o financeiro, garantindo que o identificador interno (\`id\`), o nome do cliente e o valor total fiquem encapsulados. Assim, qualquer atualização passa pelos getters, setters e pelo método \`addFee\`, permitindo aplicar taxas de serviço ou ajustes logísticos de forma centralizada antes de apresentar o resultado final ao usuário ou integrar com outras camadas do sistema.

## 🎯 Objetivo

Praticar novamente a criação de classes em PHP consolidando:

- Definição de classe e atributos privados
- Encapsulamento com getters e setters
- Uso do método construtor para inicializar valores
- Perfis simples de negócio (aplicar taxas) com métodos próprios

---

## 📝 Enunciado

1. Crie a classe `Order` com os seguintes atributos privados:
    - `id` (int)
    - `customerName` (string)
    - `total` (float)

2. Implemente um método chamado `addFee` que receba um valor percentual de acréscimo (ex.: 5 para 5%) e some esse valor ao total do pedido.

3. Implemente um método chamado `show` para retornar as informações formatadas do pedido (`Pedido: #id - Cliente: Nome - Total: R$ 1.000,00`).

4. No arquivo `index.php`:
    - Instancie o objeto utilizando o construtor, definindo os três atributos.
    - Utilize os getters e setters para consultar e atualizar `customerName` e `total` após a criação.
    - Aplique pelo menos uma chamada ao método `addFee`.
    - Exiba o resultado chamando `show()` e imprimindo com `echo`.

5. Garanta que o código continue legível e organizado, mantendo o mesmo nível de dificuldade do Exercício 01.

> Experimente alterar os valores e percentuais para observar os diferentes resultados do método `show`.

