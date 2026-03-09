# 📦 Programação Web II
## Exercício 04 – Classes `Faq` e `Type`

## 🧭 Contextualizando

O site oficial da **MOCITEC** (Mostra de Ciência e Tecnologia) recebe dezenas de dúvidas recorrentes de alunos, professores e visitantes — desde como realizar a inscrição até informações sobre datas, local e organização do evento. Para evitar que a equipe responda as mesmas perguntas repetidamente, o sistema precisa de um módulo de **FAQ (Frequently Asked Questions)**. Cada pergunta pertence a um **tipo** (categoria), como *Inscrições*, *Sobre o Evento*, *Organização*, *Avaliação de Projetos*, entre outros. A classe `Type` representa essas categorias, enquanto a classe `Faq` encapsula cada par de pergunta e resposta, vinculando-o ao seu respectivo tipo. Juntas, as duas classes permitem que o front-end do site agrupe e exiba as perguntas de forma organizada, facilitando a navegação do usuário.

## 🎯 Objetivo

Praticar a criação de classes em PHP consolidando:

- Definição de classe e atributos privados
- Encapsulamento com getters e setters
- Uso do método construtor para inicializar valores
- Relacionamento simples entre objetos (uma FAQ possui um Type)

---

## 📝 Enunciado

> **Namespace:** ambas as classes devem ser criadas dentro da namespace `source\Models\Faq`.
> Crie os arquivos `Type.php` e `Question.php` na pasta `source/Models/Faq/`.

### Classe `Type`

1. Crie a classe `Type` com os seguintes atributos privados:
   - `id` (int)
   - `name` (string) — ex.: "Inscrições", "Sobre o Evento", "Organização"

2. Implemente o método construtor que receba e inicialize os dois atributos.

3. Implemente getters e setters para ambos os atributos.

4. Implemente um método chamado `show` que retorne as informações formatadas do tipo (`Categoria: #id - Nome: Nome`).

### Classe `Question`

1. Crie a classe `Question` com os seguintes atributos privados:
   - `id` (int)
   - `question` (string)
   - `answer` (string)
   - `type` (Type) — objeto da classe `Type` que representa a categoria da pergunta

2. Implemente o método construtor que receba e inicialize os quatro atributos.

3. Implemente getters e setters para todos os atributos.

4. Implemente um método chamado `show` que retorne as informações formatadas da FAQ:
   ```
   FAQ #id
   Categoria: Nome do Tipo
   Pergunta: texto da pergunta
   Resposta: texto da resposta
   ```

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Faq\Type;
   use source\Models\Faq\Question;
   ```
2. Instancie pelo menos **dois** objetos `Type` representando categorias diferentes (ex.: "Inscrições" e "Sobre o Evento").
3. Instancie pelo menos **duas** Questions, cada uma vinculada a um tipo diferente.
4. Utilize getters e setters para consultar e atualizar atributos após a criação dos objetos.
5. Exiba o resultado chamando `show()` de cada FAQ e imprimindo com `echo`.

5. Garanta que o código continue legível e organizado, mantendo o mesmo nível de dificuldade dos exercícios anteriores.

> Experimente criar mais categorias e perguntas para simular um FAQ completo do site da MOCITEC.