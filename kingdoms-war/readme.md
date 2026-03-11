# 🛡️ Kingdoms War
## Contextualizando

Imagine um RPG estratégico em que cada reino envia representantes com habilidades totalmente distintas para disputar territórios. Para manter o equilíbrio e facilitar novas expansões de gameplay, precisamos de um núcleo orientado a objetos que descreva todos os personagens do tabuleiro. O domínio "Kingdoms War" usa a classe base `Character` para centralizar atributos vitais (`name`, `life`, `mana`, `strength`) e expande o comportamento por meio das classes `Warrior`, `Wizard` e `Thief`, cada uma com seu atributo especializado.

## 🎯 Objetivo

- Exercitar encapsulamento, herança e reutilização de código em PHP.
- Manter todos os atributos e classes nomeados em inglês para facilitar integrações futuras.
- Utilizar o método construtor, getters e setters para garantir consistência dos dados.

---

## 📝 Enunciado

1. Dentro de `source/Models`, crie uma pasta `Game` e defina a namespace `Source\Models\Game` para todas as classes do jogo.
2. Crie a classe `Character` com os atributos privados `name`, `life`, `mana` e `strength`, expondo getters e setters para cada um deles.
3. Torne `Character` a classe pai e crie as classes filhas:
   - `Warrior` com o atributo adicional `defense`.
   - `Wizard` com o atributo adicional `intelligence`.
   - `Thief` com o atributo adicional `agility`.
4. Garanta que cada classe filha receba o atributo extra pelo construtor e mantenha os demais argumentos esperados pela classe pai.
5. Implemente um método `describe()` que retorne uma string com os atributos principais e o campo exclusivo de cada classe.
6. No arquivo `kingdoms-war/index.php`, instancie pelo menos um objeto de cada classe e exiba o resultado de `describe()` utilizando `echo`.

---

## 🗂️ Estrutura esperada

```
kingdoms-war/
  index.php
  readme.md
source/
  autoload.php
  Models/
    Game/
      Character.php
      Warrior.php
      Wizard.php
      Thief.php
```
