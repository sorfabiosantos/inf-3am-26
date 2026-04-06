# 📊 Programação Web II
## Exercício 17 – Classes Abstratas: `DataExporter`, `CsvExporter`, `JsonExporter`, `XmlExporter` (Abstração)

## 🧭 Contextualizando

Um sistema de relatórios empresariais precisa exportar dados em diferentes formatos — CSV, JSON e XML — dependendo do destino: planilhas eletrônicas usam CSV, APIs REST usam JSON e sistemas legados usam XML. Cada formato possui regras específicas de cabeçalho (header), formatação de linhas (row formatting) e rodapé (footer), mas todos compartilham o mesmo fluxo de geração: preparar os dados, montar o cabeçalho, iterar sobre as linhas, adicionar o rodapé e retornar o conteúdo final. A **abstração** é o mecanismo ideal: uma classe abstrata `DataExporter` define o contrato com métodos abstratos para cada etapa, garantindo que todas as implementações concretas sigam o mesmo fluxo, enquanto as classes `CsvExporter`, `JsonExporter` e `XmlExporter` fornecem as implementações específicas de cada formato.

## 🎯 Objetivo

Aprofundar o uso de **abstração** em PHP aplicando o padrão Template Method com classes abstratas:

- Definição de classe abstrata com métodos abstratos e métodos concretos
- Implementação do padrão **Template Method** (o método `export()` chama os abstratos em sequência)
- Implementação obrigatória de métodos abstratos nas classes concretas
- Encapsulamento com atributos protegidos/privados e getters/setters
- Organização de código com **namespaces**
- Manipulação de arrays de dados para geração de diferentes formatos de saída

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Export`.
> Crie os arquivos na pasta `source/Models/Export/`.

### Classe Abstrata `DataExporter` (Exportador de Dados)

1. Crie a classe **abstrata** `DataExporter` com os seguintes atributos protegidos:
    - `title` (string) — título (title) do relatório
    - `headers` (array) — cabeçalhos das colunas (column headers), ex: `['id', 'nome', 'email']`
    - `rows` (array) — linhas de dados (data rows): array de arrays com os valores

2. Implemente o método construtor que receba e inicialize `title`, `headers` e `rows`.

3. Implemente getters e setters para todos os atributos.

4. Declare os seguintes métodos **abstratos** (abstract):
    - `buildHeader(): string` — gera o cabeçalho do arquivo no formato específico
    - `buildRow(array $row): string` — gera uma linha de dados no formato específico
    - `buildFooter(): string` — gera o rodapé do arquivo no formato específico
    - `getFileExtension(): string` — retorna a extensão do arquivo, ex: `"csv"`, `"json"`, `"xml"`

5. Implemente um método **concreto** chamado `export(): string` que:
    - Chame `buildHeader()` para montar o cabeçalho
    - Itere sobre `$this->rows` chamando `buildRow()` para cada linha
    - Chame `buildFooter()` para montar o rodapé
    - Retorne o conteúdo completo do arquivo gerado

    > Este é o padrão **Template Method**: o algoritmo geral está definido aqui; apenas os passos específicos são implementados nas subclasses.

6. Implemente um método **concreto** chamado `show()` que retorne as informações do exportador:
   ```
   Exportador: CsvExporter
   Título: Relatório de Usuários
   Formato: CSV (.csv)
   Colunas (Headers): id, nome, email
   Total de Linhas (Rows): 3
   ```
   > Use `get_class($this)` para obter o nome da classe dinamicamente.

---

### Classe `CsvExporter` (Exportador CSV — filha de `DataExporter`)

1. Crie a classe `CsvExporter` que **estende** `DataExporter`.

2. **Implemente** `buildHeader()` para retornar os cabeçalhos separados por vírgula (comma-separated) seguidos de quebra de linha:
   ```
   id,nome,email
   ```

3. **Implemente** `buildRow(array $row)` para retornar os valores separados por vírgula:
   ```
   1,Ana Souza,ana@email.com
   ```

4. **Implemente** `buildFooter()` para retornar uma linha com o total de registros:
   ```
   Total de registros: 3
   ```

5. **Implemente** `getFileExtension()` para retornar `"csv"`.

---

### Classe `JsonExporter` (Exportador JSON — filha de `DataExporter`)

1. Crie a classe `JsonExporter` que **estende** `DataExporter`.

2. **Implemente** `buildHeader()` para retornar a abertura do JSON com o título:
   ```json
   {
     "titulo": "Relatório de Usuários",
     "dados": [
   ```

3. **Implemente** `buildRow(array $row)` para retornar a linha como objeto JSON combinando headers e valores:
   ```json
       {"id": "1", "nome": "Ana Souza", "email": "ana@email.com"},
   ```
   > **Dica:** use `array_combine($this->headers, $row)` e `json_encode()`.

4. **Implemente** `buildFooter()` para retornar o fechamento do JSON com o total:
   ```json
     ],
     "total": 3
   }
   ```

5. **Implemente** `getFileExtension()` para retornar `"json"`.

---

### Classe `XmlExporter` (Exportador XML — filha de `DataExporter`)

1. Crie a classe `XmlExporter` que **estende** `DataExporter`.

2. **Implemente** `buildHeader()` para retornar a declaração XML e a tag raiz de abertura:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <relatorio titulo="Relatório de Usuários">
   ```

3. **Implemente** `buildRow(array $row)` para retornar a linha como elemento XML:
   ```xml
     <registro>
       <id>1</id>
       <nome>Ana Souza</nome>
       <email>ana@email.com</email>
     </registro>
   ```

4. **Implemente** `buildFooter()` para retornar o fechamento da tag raiz:
   ```xml
   </relatorio>
   ```

5. **Implemente** `getFileExtension()` para retornar `"xml"`.

---

## 💡 Dicas

- A classe abstrata `DataExporter` **não pode** ser instanciada diretamente — experimente tentar e observe o erro fatal do PHP.
- Todos os métodos abstratos **devem** ser implementados nas classes concretas.
- O método concreto `export()` define o **esqueleto do algoritmo**; as subclasses apenas preenchem os detalhes de formatação.
- Use `implode(',', $row)` no `CsvExporter` para juntar os valores de uma linha.
- Use `array_combine($headers, $row)` no `JsonExporter` e `json_encode()` para formatar.
- Use `get_class($this)` dentro do método `show()` para exibir o tipo do exportador dinamicamente.

---

### No arquivo `index.php`

1. Importe as classes utilizando `use`:
   ```php
   use source\Models\Export\CsvExporter;
   use source\Models\Export\JsonExporter;
   use source\Models\Export\XmlExporter;
   ```

2. Defina um array de dados comum que será exportado nos três formatos:
   ```php
   $headers = ['id', 'nome', 'email'];
   $rows = [
       [1, 'Ana Souza',   'ana@email.com'],
       [2, 'Bruno Lima',  'bruno@email.com'],
       [3, 'Carla Dias',  'carla@email.com'],
   ];
   ```

3. Instancie um objeto de cada exportador passando o mesmo título, cabeçalhos e dados.

4. Chame o método `show()` de cada exportador e exiba com `echo`.

5. Chame o método `export()` de cada exportador e exiba o conteúdo gerado, comprovando que os mesmos dados são formatados de forma completamente diferente.

6. Tente instanciar `DataExporter` diretamente e observe o erro fatal do PHP, comprovando que classes abstratas não podem ser instanciadas.

7. Garanta que o código continue legível e organizado, mantendo o mesmo padrão dos exercícios anteriores.

> Observe que o método `export()` na classe abstrata chama os métodos abstratos em sequência — isso é o padrão Template Method em ação: o esqueleto do algoritmo está na classe mãe, e os detalhes de formatação estão nas filhas.

