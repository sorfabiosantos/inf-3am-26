# P4 — Prova A: Livraria

**Estudante:** ____________________________________  **Turma:** __________

**Data:** ____ / ____ / ______  **Nota:** __________ / 10,0

## Orientações

- A avaliação tem 5 questões objetivas, 2 subjetivas e 3 questões práticas.
- O valor de cada questão e de seus itens está indicado no enunciado.
- O professor instalou os arquivos em `www`, iniciou o WAMP e preparou o banco
  `db-livraria` com o script fornecido. Não altere a estrutura do banco.
- Não execute Composer nem baixe dependências.
- Os nomes de tabelas, colunas, variáveis de banco e rotas devem seguir o
  padrão em inglês usado no projeto.
- As rotas não exigem autenticação. Respeite os métodos HTTP e os formatos JSON
  solicitados.
- Os dados mockados da interface são exemplos visuais; eles não substituem a
  leitura e a gravação no banco.

## Pontuação

| Parte | Pontuação |
|---|---:|
| 5 questões objetivas — 0,4 cada | 2,0 |
| 2 questões subjetivas — 1,0 cada | 2,0 |
| 3 questões práticas | 6,0 |
| **Total** | **10,0** |

## Parte I — Questões objetivas

Assinale uma única alternativa em cada questão.

### 1. `FormData` e cabeçalho `Content-Type` — 0,4 ponto

Um cliente HTTP remove o `Content-Type` padrão quando o corpo é `FormData`
(estrutura do navegador para enviar campos e arquivos). Qual é a razão
principal? O boundary é o delimitador que separa cada parte do conteúdo
multipart.

```javascript
if (_isFormData) {
    delete headers["Content-Type"];
}
```

A. O browser precisa definir o `Content-Type` com o `boundary` correto do
   `multipart/form-data`.

B. `FormData` só pode ser enviado com o método `GET`.

C. O backend PHP não aceita cabeçalhos HTTP.

D. A remoção transforma os campos em parâmetros de caminho.

### 2. Tratamento de respostas HTTP — 0,4 ponto

Ao usar `fetch`, a API responde com status `404` e um corpo JSON de erro. Qual
afirmação está correta? `Promise` é o objeto que representa o resultado futuro
de uma operação assíncrona.

A. A Promise de `fetch` sempre é rejeitada automaticamente para qualquer
   status `4xx` ou `5xx`.

B. O navegador converte automaticamente o corpo JSON de erro em uma exceção
   PHP.

C. O frontend deve considerar qualquer resposta recebida como sucesso, pois
   a conexão foi estabelecida.

D. A Promise de `fetch` pode ser resolvida mesmo com status `404`; o frontend
   deve verificar `response.ok` ou `response.status` e tratar a resposta de
   erro.

### 3. Envelope da API — 0,4 ponto

A API responde com:

```json
{
  "code": 200,
  "status": "success",
  "message": "Book list",
  "data": [{ "id": 1, "title": "Sample book" }]
}
```

Depois de `const result = await response.json()`, como iterar os livros?

A. `result.json.data.forEach(book => renderBook(book));`

B. `result.data.forEach(book => renderBook(book));`

C. `response.data.forEach(book => renderBook(book));`

D. `JSON.parse(result.data).forEach(book => renderBook(book));`

### 4. Rota com parâmetro — 0,4 ponto

Observe este registro simplificado de rota. O Router (componente que associa
caminhos e métodos HTTP aos controllers) agrupa rotas sob um prefixo:

```php
$route->group("/records");
$route->get("/{recordId}", "Records:findById");
$route->group(null);
```

Considerando que a base da API termina em `/api`, qual caminho corresponde à
consulta do registro de identificador `6`?

A. `/api/6/records`

B. `/api/records/6`

C. `/api/records/{recordId}=6`

D. `/api/records?GET=6`

### 5. CORS e preflight — 0,4 ponto

O frontend e a API estão em origens diferentes. CORS (política do navegador
para controlar requisições entre origens diferentes) pode exigir um preflight
(requisição preliminar `OPTIONS` que verifica se a chamada principal é
permitida) antes da requisição principal. Qual é a finalidade mais provável
dessa chamada?

A. Executar o cadastro antes de enviar o `POST`.

B. Consultar o banco de dados para testar se a tabela existe.

C. Verificar, por meio do mecanismo CORS, se a origem, o método e os
   cabeçalhos da requisição principal são permitidos pelo servidor.

D. Converter automaticamente uma resposta JSON em HTML.

## Parte II — Questões subjetivas

### 6. Percurso dos dados — 1,0 ponto

Considere a consulta de um registro pelo identificador:

```php
$route->group("/records");
$route->get("/{recordId}", "Records:show");
$route->group(null);
```

Descreva o percurso dos dados desde a interação no frontend até a exibição dos
detalhes. Inclua o método e caminho HTTP, o Router, o Controller, o Model, a
resposta JSON e o tratamento no JavaScript.

### 7. Uma API para web e aplicativo móvel — 1,0 ponto

O trabalho prevê o uso do Web Service (serviço que expõe operações pela rede)
pelo frontend web e por uma aplicação móvel. Explique por que os dois clientes
devem consumir um contrato de API (acordo sobre caminhos, métodos, dados e
respostas) documentado em vez de acessar diretamente o banco. Cite as
informações que a equipe deve registrar para uma rota e explique como essa
documentação reduz divergências entre clientes.

## Referência — Códigos HTTP da API

Os códigos indicam o resultado da requisição. Nas respostas da API, o mesmo
número também aparece no campo `code` do envelope JSON.

| Código | Nome | Significado nesta prova |
|---:|---|---|
| `200` | OK | Consulta concluída, por exemplo `GET /api/books`. |
| `201` | Created | Livro criado com sucesso por `POST /api/books`. |
| `204` | No Content | Requisição `OPTIONS` concluída sem corpo de resposta. |
| `400` | Bad Request | Campos do formulário ausentes ou inválidos. |
| `404` | Not Found | Rota ou recurso solicitado não encontrado. |
| `409` | Conflict | Conflito com um registro existente, como ISBN duplicado. |
| `422` | Unprocessable Content | Requisição válida, mas com referência inexistente/inativa, como um gênero. |
| `500` | Internal Server Error | Falha inesperada no servidor ou no banco de dados. |

## Parte III — Questões práticas

### 8. Model de livros em PHP — 1,5 ponto

Crie `api/source/Models/Book.php` como uma classe filha de
`Source\Core\Model`, associada à tabela `books`.

Implemente:

- propriedades privadas para os dados do livro e um construtor; **(0,25)**
- configuração da tabela e dos campos persistíveis no padrão da classe
  `Genre` fornecida; **(0,25)**
- getters e setters, com validações simples: texto obrigatório, preço
  numérico não negativo, estoque inteiro não negativo e identificadores
  inteiros positivos; **(0,5)**
- conversão do objeto para os campos da API, incluindo os nomes relacionados
  de gênero, fornecedor e editora quando aplicável; **(0,25)**
- uso do método de persistência herdado para criar um livro. **(0,25)**

Os campos recebidos e persistidos devem corresponder ao script SQL.

### 9. API de livros — 3,0 pontos

Crie `api/source/Controller/Books.php`, filha de `Controller\Api`, e conecte
os métodos no roteador CoffeeCode de `api/index.php`.

1. Implemente `GET /api/books`. Consulte os livros ativos e inclua na resposta
   `genre_name`, `supplier_name` e `publisher_name`, obtidos por
   relacionamentos do banco. Responda com JSON no envelope usado pelo
   Controller de gêneros. **(1,0)**
2. Implemente `POST /api/books`. Leia os campos do formulário recebidos pelo
   Controller via CoffeeCode (`$data`) e valide `title`, `author`, `isbn`,
   `genre_id`, `supplier_id`, `publisher_id`, `price` e `stock`. Insira o livro
   usando o Model. A resposta do backend deve ser JSON e retornar o registro
   criado. **(1,5)**
3. Registre corretamente as rotas com CoffeeCode. Use status `200` para a
   listagem, `201` para a criação, `400` para dados inválidos, `422` para
   referências inexistentes e `500` para falhas internas. **(0,5)**

Não é necessário implementar autenticação, atualização ou exclusão.

### 10. Integração do frontend — 1,5 ponto

Use os arquivos em `views/`. Os seletores de gênero, fornecedor e editora já
são preenchidos pelas rotas GET implementadas; use as opções carregadas, sem
codificar valores fixos. A interface também inclui um componente Toast baseado
em protótipo, com botões para testar mensagens de sucesso e erro.

1. Substitua os livros mockados pela resposta real de `GET /api/books` e
   renderize os dados recebidos. **(0,6)**
2. Conecte o formulário pronto a `POST /api/books`, enviando os campos com os
   nomes esperados pela API como campos do formulário, não como JSON. Após
   criar, atualize a listagem. **(0,6)**
3. Apresente estados de carregamento, sucesso e erro. Use o Toast prototípico
   para informar sucesso e falhas, e limpe o formulário depois de uma criação
   bem-sucedida. **(0,3)**
