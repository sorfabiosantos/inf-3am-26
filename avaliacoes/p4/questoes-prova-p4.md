# Questões da Prova P4

## Questões subjetivas

## Fundamentos e integração

### 1. Percurso dos dados

Considere a consulta de um registro pelo identificador:

```php
$route->group("/records");
$route->get("/{recordId}", "Records:show");
$route->group(null);
```

Descreva o percurso dos dados desde a interação no frontend até a exibição dos detalhes. Inclua o método e caminho HTTP (protocolo usado para a comunicação entre cliente e servidor), o Router (componente que associa a URL à ação do servidor), o Controller (camada que coordena a requisição), o Model (camada de dados e persistência), a resposta JSON e o tratamento no JavaScript.

### 2. Requisição assíncrona e estados da interface

Escreva uma função JavaScript assíncrona (que pode aguardar operações sem bloquear a interface) ou pseudocódigo equivalente para buscar `GET /api/records` e renderizar a lista. Considere que a resposta contém uma lista na propriedade `data`. A solução deve prever:

- estado de carregamento;
- verificação de falha HTTP ou de rede;
- leitura do JSON e acesso à lista em `data`;
- estado de lista vazia e atualização da interface em caso de sucesso.

### 3. Contrato do endpoint

Considere um Controller PHP (componente que processa a requisição) que cria um registro, verifica autenticação e valida os campos recebidos:

```php
if (!$this->authToken($requiredRoleId)) {
    $this->call(401, "unauthorized", "Não autenticado", "error")->back();
    return;
}

if (empty($data["title"]) || empty($data["description"])) {
    $this->call(400, "bad_request", "Campos obrigatórios", "error")->back();
    return;
}

$this->call(201, "created", "Registro criado", "success")->back($response);
```

Indique:

1. quais campos principais o frontend deve enviar;
2. qual método HTTP e caminho de endpoint são adequados;
3. qual status de sucesso é esperado na criação;
4. o que representam os status `400` e `401` mostrados no código.

### 4. Diagnóstico de erro no consumo da API

Uma chamada com `fetch` (função do navegador para fazer requisições HTTP) executa o código abaixo. Quando a API responde com erro, a interface tenta executar `forEach` (método que percorre os itens de uma lista) e apresenta uma mensagem genérica:

```javascript
const response = await fetch(url);
const result = await response.json();
result.data.forEach(renderRecord);
```

Explique por que esse código pode falhar mesmo que `response.json()` funcione. Indique duas verificações ou tratamentos que tornariam o fluxo mais robusto.

### 5. Cliente HTTP reutilizável

Uma aplicação tem uma classe base `HttpClientBase` (cliente reutilizável que centraliza a comunicação HTTP) com o método `get(endpoint, params)`. Escreva um método `findById(recordId)` de um serviço de domínio que use esse método para chamar `/records/:recordId`. Descreva o caminho final para `recordId = 6` e explique por que a chamada deve ficar no serviço, e não espalhada pelo código da tela.

### 6. Autenticação e autorização

Descreva o fluxo de uma operação protegida no frontend: obtenção do JWT (token assinado que representa informações de autenticação) após o login, armazenamento/recuperação da sessão e envio do token no cabeçalho `Authorization` com o esquema `Bearer` (indica que o portador apresenta o token como credencial). Explique também por que um bloqueio de tela no frontend não substitui a validação do token e do perfil no backend. Diferencie `401` (não autenticado) de `403` (autenticado, mas sem permissão).

### 7. Planejamento de CRUD

Considere a entidade principal do SaaS da sua equipe. Descreva como o frontend realizaria o CRUD (Create, Read, Update, Delete: criar, consultar, atualizar e excluir/inativar). Para cada operação, indique o método HTTP e onde ficam os dados necessários (rota/parâmetro ou corpo da requisição). Dê exemplos de caminhos coerentes com a entidade escolhida.

### 8. Dados de demonstração versus API

Considere que uma página recebe registros da API e depois permite filtrá-los localmente na memória do navegador:

```javascript
const visibleRecords = state.records.filter(record =>
    record.title.toLowerCase().includes(state.searchTerm.toLowerCase())
);
renderRecords(visibleRecords);
```

Explique quais responsabilidades permanecem no frontend mesmo quando a origem dos registros é uma API. Diferencie o filtro visual em memória da persistência de uma alteração feita pelo usuário.

### 9. CORS, rota e diagnóstico

Uma tela aberta no navegador não consegue carregar dados da API. Descreva uma sequência de verificações usando o console e a aba Network (ferramenta do navegador que exibe requisições e respostas) para diferenciar:

- erro de CORS (política do navegador para requisições entre origens diferentes) ou de preflight (requisição preliminar `OPTIONS` para verificar se a chamada será permitida);
- URL ou rota inexistente;
- erro interno do backend.

Indique pelo menos uma evidência que você procuraria em cada caso.

### 10. Renderização segura e experiência do usuário

Os campos `title` e `description` vêm da API e serão exibidos no DOM (estrutura de elementos da página manipulada por JavaScript). Explique o risco de inserir esses valores diretamente em `innerHTML` (que interpreta o conteúdo como marcação HTML) e proponha uma forma mais segura de renderizar o texto. Cite também dois estados ou recursos de acessibilidade/usabilidade, como `aria-live` (região que anuncia atualizações a tecnologias assistivas).

---

## Novas questões com análise de código

### 11. Inicialização de uma lista a partir da API

Considere uma inicialização que atualmente usa dados locais (mock: valores de demonstração que não são carregados do servidor):

```javascript
function initialize() {
    state.records = localRecords.map(data => new Record(data));
    renderFilters();
    renderRecords();
}
```

Explique como adaptar essa inicialização para carregar registros de um endpoint (caminho da API que oferece uma operação) HTTP. Apresente uma versão em JavaScript ou pseudocódigo que preserve a criação de instâncias `Record` e trate carregamento, resposta inválida, falha de rede e lista vazia.

### 12. Identificando divergência entre rota e cliente

O backend de uma aplicação registra a rota desta forma, dentro do grupo `/records`:

```php
$route->get("/{recordId}", "Records:findById");
```

O cliente JavaScript foi escrito assim:

```javascript
async findById(recordId) {
    return this.get("/records/items/:recordId", { recordId });
}
```

Identifique a divergência entre o caminho esperado pelo backend e o caminho produzido pelo cliente. Reescreva o método para que uma chamada com `recordId = 6` atinja a rota registrada. O parâmetro de caminho é um valor inserido na URL no lugar de um marcador entre chaves.

### 13. Validação e respostas do controller

Analise este trecho simplificado de um controller PHP:

```php
if (!$this->authToken($requiredRoleId)) {
    $this->call(401, "unauthorized", "Token ausente ou inválido", "error")->back();
    return;
}

if (empty($data["title"]) || empty($data["description"])) {
    $this->call(400, "bad_request", "Campos obrigatórios", "error")->back();
    return;
}

// Persistência concluída com sucesso.
$this->call(201, "created", "Registro criado", "success")->back($response);
```

Explique os três caminhos possíveis mostrados no código. Para cada status (`401`, `400` e `201`), descreva o que o frontend deve comunicar ou fazer. Por que o `return` após uma resposta de erro é importante?

### 14. Corpo JSON ou `FormData`

Considere este método do cliente HTTP:

```javascript
async post(endpoint, data = {}) {
    return this.#fetchWithConfig(endpoint, {
        method: "POST",
        body: JSON.stringify(data)
    });
}
```

Explique por que o objeto é convertido com `JSON.stringify` (serialização de um valor JavaScript para texto JSON). Que cabeçalho deve acompanhar esse corpo JSON? Compare com o envio de `FormData` (estrutura do navegador para campos e arquivos) e explique por que, nesse segundo caso, o código normalmente deixa o navegador definir o cabeçalho `Content-Type` e o boundary (delimitador das partes do multipart).

### 15. Corrigindo o acesso ao envelope JSON

A API de um sistema retorna:

```json
{
  "code": 200,
  "type": "success",
  "status": "success",
  "message": "Lista de registros",
  "data": [
    { "id": 16, "title": "Primeiro registro", "description": "Descrição." }
  ]
}
```

O frontend usa este código:

```javascript
const result = await response.json();
result.records.forEach(record => renderRecord(record));
```

Explique por que o acesso provavelmente falha e reescreva o trecho para iterar sobre a lista correta recebida em `data`, verificando também que a propriedade usada é um array (lista em JavaScript).

### 16. Rastreamento de URL com parâmetros

O cliente base substitui marcadores de caminho por valores recebidos em `params`:

```javascript
let url = `${this.#baseUrl}${endpoint}`;
for (const [key, value] of Object.entries(params)) {
    if (url.includes(`/:${key}`)) {
        url = url.replace(`:${key}`, value);
    }
}
```

Um serviço de registros chama:

```javascript
this.get("/records/page/:page/size/:per_page", {
    page: 2,
    per_page: 10
});
```

Considerando uma base `/api`, escreva a URL de caminho resultante e explique como a substituição de parâmetros de caminho (valores inseridos no segmento da URL) se diferencia de parâmetros de consulta (pares chave/valor após `?`).

### 17. Autorização por perfil

Um controller pode restringir uma ação a um perfil exigido:

```php
if (!$this->authToken($requiredRoleId)) {
    $this->call(401, "unauthorized", "Não autorizado", "error")->back();
    return;
}
```

O frontend envia o token assim:

```javascript
this.#defaultHeaders["Authorization"] = `Bearer ${token}`;
```

Explique a função do cabeçalho `Authorization`, como o backend pode usar o perfil esperado para autorizar a operação e por que a API precisa validar o token mesmo que a tela correspondente esteja protegida por um guard JavaScript.

### 18. Análise do preflight CORS

O ponto de entrada PHP de uma API pode possuir um tratamento semelhante a este:

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}
```

Explique por que um navegador pode enviar `OPTIONS` antes da requisição principal e qual é a função do bloco condicional. Cite duas informações que você verificaria na aba Network ao investigar uma falha de CORS.

### 19. Tratamento de erro JSON no cliente HTTP

Analise esta ordem de operações:

```javascript
const contentType = response.headers.get("content-type");
if (contentType && contentType.includes("application/json")) {
    return await response.json();
}

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}
```

Se uma resposta `400` tiver `Content-Type: application/json`, qual problema pode ocorrer com a ordem atual? Reorganize ou complemente o tratamento para que a aplicação possa reconhecer o status de erro e, quando possível, continuar tendo acesso ao corpo JSON com a mensagem retornada pela API.

### 20. Renderização e estados do DOM

Um elemento de interface é criado a partir de dados enviados pelo backend:

```javascript
function renderRecord(record, list) {
    const item = document.createElement("article");
    item.innerHTML = `<p>${record.title}</p><p>${record.description}</p>`;
    list.appendChild(item);
}
```

Reescreva a função para inserir `title` e `description` como texto, sem interpretá-los como HTML. Em seguida, descreva como a tela deveria comunicar os estados de carregamento, lista vazia e erro de requisição; cite um recurso de acessibilidade apropriado para mensagens de estado.

---

## Questões gerais sobre o TFD e o projeto didático

### 21. Problema, público-alvo e escopo

Escolha a proposta de sistema da sua equipe. Descreva o problema real que ela pretende resolver, a área de atuação e pelo menos dois perfis de usuário. Para cada perfil, cite uma necessidade e uma funcionalidade que o sistema deve oferecer. Explique como essa análise ajuda a evitar funcionalidades sem relação com o objetivo do projeto. SaaS é um sistema disponibilizado como serviço pela Web, geralmente com acesso por conta de usuário.

### 22. Divisão das áreas do sistema

Usando o TFD, proponha uma divisão entre área pública (acessível sem login), área de aplicação (para usuários cadastrados) e área administrativa (para perfis de gestão) para o sistema da sua equipe. Para cada área, indique quem pode acessá-la, quais informações ou operações ela deve oferecer e quais funcionalidades precisam de autenticação.

### 23. Entidades e relacionamentos

Escolha a entidade principal do seu sistema e duas entidades relacionadas. Explique o propósito de cada entidade, indique os principais atributos e descreva a cardinalidade (quantidade de ocorrências que podem se relacionar, como 1:N) dos relacionamentos. Em seguida, cite uma operação CRUD necessária para cada entidade e explique como o modelo de dados apoia essas operações.

### 24. Aplicação do MVC a uma funcionalidade

Considere a funcionalidade de cadastrar a entidade principal do SaaS da sua equipe, usando uma rota genérica como `POST /api/records`. Descreva o percurso da solicitação e separe as responsabilidades do Router, Controller, Model, banco de dados, serviço HTTP JavaScript e interface. Relacione o exemplo à entidade e aos termos de domínio escolhidos pela equipe. MVC (Model–View–Controller) é o padrão que separa os dados, a interface e o controle das requisições.

### 25. Perfis e autorização no projeto

Defina três perfis apropriados ao SaaS da sua equipe (por exemplo, administrador, profissional e cliente). Escolha uma operação que cada perfil poderia executar e explique como o sistema deve impedir que um usuário acesse operações ou dados fora de sua permissão. Diferencie o bloqueio de navegação no frontend da autorização efetiva no backend.

### 26. Uma API para web e aplicativo móvel

O TFD prevê o uso do Web Service (serviço que expõe operações pela rede) pelo frontend web e por uma aplicação móvel. Explique por que os dois clientes devem consumir um contrato de API (acordo sobre caminhos, métodos, dados e respostas) documentado em vez de acessar diretamente o banco. Cite as informações que a equipe deve registrar para uma rota e explique como essa documentação reduz divergências entre clientes.

### 27. Exclusão lógica e estado da interface

No SaaS da sua equipe, um registro pode ser inativado sem apagar seu histórico. Explique a diferença entre exclusão lógica (marcar como inativo, preservando o registro) e exclusão física (remover o registro do banco). Descreva como a API, a interface de consulta e a área administrativa devem refletir o estado de um registro inativo, sem comunicar ao usuário uma exclusão que não ocorreu.

### 28. Continuidade entre integração e orientação a objetos

Considere esta separação de responsabilidades:

```javascript
class DomainEntity {
    constructor({ id = null, title = "" }) {
        this.id = id;
        this.title = title;
    }
}

class EntityService extends HttpClientBase {
    create(entity) {
        return this.post("/records", entity);
    }
}

const toastPrototype = {
    show(message) {
        console.log(message);
    }
};
const toast = Object.create(toastPrototype);
```

Explique por que uma refatoração do frontend integrado deve preservar o comportamento funcional. Identifique a responsabilidade da entidade, do serviço HTTP e do objeto baseado em protótipo (objeto que compartilha propriedades e métodos por meio de uma cadeia de herança). Cite como demonstrar que o método `show` é compartilhado entre instâncias.

### 29. Dados locais, integração e evidências

Considere este carregamento de dados:

```javascript
const exampleRecords = [{ id: 1, title: "Registro de demonstração" }];

function initialize() {
    state.records = exampleRecords;
    renderRecords();
}
```

Explique por que esse trecho, por si só, não demonstra integração com o backend. Descreva como substituir a origem local por uma chamada à API e indique uma evidência que demonstraria que a funcionalidade realmente persiste (grava de forma durável) e recupera dados do servidor.

### 30. Fluxo completo de imagens

Considere o envio de uma imagem associada a um registro usando `FormData` (estrutura que empacota campos e arquivos para uma requisição multipart):

```javascript
const formData = new FormData();
formData.append("image", selectedFile);
await imageService.upload(recordId, formData);
```

Planeje para o sistema da sua equipe o fluxo de atualização de uma foto de perfil autenticada e de uma galeria 1:N (uma entidade principal relacionada a várias imagens) associada à entidade principal. Descreva as responsabilidades do frontend, serviço HTTP, Controller, classe de upload, Model, banco de dados e sistema de arquivos. Inclua autenticação/autorização, envio multipart, tratamento de falhas de persistência e o que deve acontecer ao remover uma imagem.


## Questões objetivas

## Fundamentos e integração

### 1. Fluxo de uma requisição

Uma pessoa abre uma tela que precisa listar registros de um sistema Web. Qual alternativa representa melhor o fluxo em uma arquitetura MVC (Model–View–Controller: separação entre dados, interface e controle do fluxo) com API?

A. O JavaScript consulta diretamente o MySQL e envia o resultado ao controller PHP.

B. O navegador solicita uma página HTML ao model, que transforma a resposta em uma rota.

C. O frontend faz uma requisição HTTP; o roteador encaminha a rota ao controller; o controller coordena o acesso ao model; a API responde, normalmente em JSON; o frontend interpreta os dados e atualiza a interface.

D. O navegador chama o model PHP diretamente e recebe uma função JavaScript executável.

### 2. Método HTTP para cadastro

Um formulário enviará os campos `title` e `description` para cadastrar um novo registro em uma API (interface que permite a comunicação entre aplicações). Qual opção é a mais adequada?

A. Enviar uma requisição `GET` para `/records`, colocando a resposta que será criada na URL.

B. Enviar uma requisição `POST` para `/records`, com os dados no corpo da requisição.

C. Enviar uma requisição `DELETE` para `/records`, com os dados no corpo, pois o servidor atualizará o cadastro.

D. Enviar uma requisição `OPTIONS` para `/records`, que executará o cadastro.

### 3. Leitura de uma resposta JSON

A API responde com o envelope JSON (estrutura padronizada que agrupa os dados e informações da resposta) abaixo, no qual `data` contém uma lista de registros:

```json
{
  "code": 200,
  "type": "success",
  "status": "success",
  "message": "Lista de registros",
  "data": [{ "title": "Primeiro registro", "description": "..." }]
}
```

Qual trecho acessa corretamente cada registro depois de chamar `response.json()` e armazenar o resultado em `result`?

A. `result.data.forEach(record => console.log(record.title));`

B. `result.json.data.forEach(record => console.log(record.title));`

C. `response.data.forEach(record => console.log(record.title));`

D. `JSON.parse(result.data).forEach(record => console.log(record.title));`

### 4. Tratamento de respostas HTTP

Ao usar `fetch`, a API responde com status `404` e um corpo JSON de erro. Qual afirmação está correta? `Promise` é o objeto que representa o resultado futuro de uma operação assíncrona.

A. A Promise de `fetch` sempre é rejeitada automaticamente para qualquer status `4xx` ou `5xx`.

B. O navegador converte automaticamente o corpo JSON de erro em uma exceção PHP.

C. O frontend deve considerar qualquer resposta recebida como sucesso, pois a conexão foi estabelecida.

D. A Promise de `fetch` pode ser resolvida mesmo com status `404`; o frontend deve verificar `response.ok` ou `response.status` e tratar a resposta de erro.

### 5. Rota com parâmetro

Observe este registro simplificado de rota. O Router (componente que associa caminhos e métodos HTTP aos controllers) agrupa rotas sob um prefixo:

```php
$route->group("/records");
$route->get("/{recordId}", "Records:findById");
$route->group(null);
```

Considerando que a base da API termina em `/api`, qual caminho corresponde à consulta do registro de identificador `6`?

A. `/api/6/records`

B. `/api/records/6`

C. `/api/records/{recordId}=6`

D. `/api/records?GET=6`

### 6. Códigos de status

Uma chamada a uma rota protegida é feita sem token de autenticação. Qual status HTTP é mais adequado para indicar que a requisição não está autenticada?

A. `401 Unauthorized`.

B. `201 Created`.

C. `404 Not Found`.

D. `500 Internal Server Error`.

### 7. Envio de token

Como uma chamada protegida deve enviar um token JWT (token assinado que representa informações de autenticação) ao backend?

A. Como parâmetro de caminho, por exemplo, `/api/records/{token}`.

B. No HTML da tela, dentro de um atributo `style`.

C. No corpo de toda requisição `GET`, sem cabeçalho HTTP.

D. No cabeçalho `Authorization`, usando o esquema `Bearer`, enquanto o backend valida o token e as permissões.

### 8. CORS e preflight

O frontend e a API estão em origens diferentes. CORS (política do navegador para controlar requisições entre origens diferentes) pode exigir um preflight (requisição preliminar `OPTIONS` que verifica se a chamada principal é permitida) antes da requisição principal. Qual é a finalidade mais provável dessa chamada?

A. Executar o cadastro antes de enviar o `POST`.

B. Consultar o banco de dados para testar se a tabela existe.

C. Verificar, por meio do mecanismo CORS, se a origem, o método e os cabeçalhos da requisição principal são permitidos pelo servidor.

D. Converter automaticamente uma resposta JSON em HTML.

### 9. Dados locais e integração

Considere os dados definidos diretamente no JavaScript:

```javascript
const records = [
    { id: 1, title: "Primeiro registro" },
    { id: 2, title: "Segundo registro" }
];
```

Qual afirmação descreve corretamente a origem desses dados e o que seria necessário para carregá-los de uma API? Dados mockados (valores fictícios ou locais usados para demonstração e teste) não são, por si só, dados recebidos do servidor.

A. São dados locais; para carregá-los da API, o frontend deve fazer uma requisição, tratar a resposta e atualizar o estado/interface.

B. São necessariamente tabelas MySQL, pois cada objeto contém um `id`.

C. São rotas REST executadas quando o usuário abre a tela.

D. São respostas JSON que o browser busca automaticamente ao encontrar a variável `records`.

### 10. JSON e JavaScript

Qual alternativa diferencia corretamente JSON de JavaScript em uma integração com API?

A. JSON é uma linguagem que executa eventos de clique no navegador.

B. `response.json()` envia automaticamente uma requisição `POST` ao backend.

C. JSON é um formato de dados; `response.json()` lê o corpo da resposta e o converte em um valor JavaScript, como um objeto ou array.

D. Todo objeto JavaScript é, sem conversão, um documento JSON válido transmitido pela rede.

---

## Novas questões com análise de código

### 11. Interpretando o retorno de `fetch`

Considere o trecho. `response.json()` converte o corpo JSON da resposta para um valor JavaScript:

```javascript
const response = await fetch(url);
const result = await response.json();
console.log(result.data);
```

O que a variável `result` representa após a execução bem-sucedida de `response.json()`?

A. O objeto JavaScript convertido do corpo JSON da resposta HTTP.

B. O código de status HTTP, como `200` ou `404`.

C. O elemento HTML que originou a requisição.

D. Uma nova requisição enviada pelo servidor ao navegador.

### 12. Compatibilidade entre rota e cliente

O backend registra a rota:

```php
$route->group("/records");
$route->get("/{recordId}", "Records:findById");
$route->group(null);
```

O frontend chama o serviço assim:

```javascript
this.get("/records/items/:recordId", { recordId });
```

Qual ajuste no cliente faz a chamada corresponder à rota do backend?

A. `this.get("/records/:recordId", { recordId });`

B. `this.get("/items/records/:recordId", { recordId });`

C. `this.get("/records", { recordId });`

D. `this.get("/records/:id", { recordId });`

### 13. Substituição de parâmetro no cliente HTTP

Um serviço de registros usa o método abaixo:

```javascript
async findById(id) {
    return this.get("/records/:record_id", {
        record_id: id
    });
}
```

Se `id` valer `42`, qual URL de caminho deve ser solicitada depois de substituir o marcador `:record_id`?

A. `/records?id=42`

B. `/records/:record_id/42`

C. `/records/42`

D. `/records/{id}`

### 14. Código de sucesso no cadastro

Analise o final do método `insert` de um controller PHP genérico:

```php
if (!$record->insert()) {
    $this->call(500, "internal_server_error", "Falha", "error")->back();
    return;
}

$this->call(201, "success", "Registro criado", "success")
    ->back($response);
```

Qual status HTTP será usado quando a inserção terminar com sucesso?

A. `200 OK`.

B. `201 Created`.

C. `400 Bad Request`.

D. `500 Internal Server Error`.

### 15. HTTP não-successo e `fetch`

Considere a consulta de um registro inexistente:

```javascript
const response = await fetch("/api/records/999");
const result = await response.json();
```

Se o servidor responder com status `404` e corpo JSON válido, qual afirmação é correta?

A. `fetch` necessariamente rejeita a Promise por causa do `404`, então `response` nunca é criado.

B. `response.json()` transforma o `404` em status `200`.

C. O trecho pode ler o JSON; ainda é necessário verificar `response.ok` ou `response.status` para identificar a falha HTTP.

D. O navegador repete automaticamente a solicitação com outro identificador.

### 16. Delegação de eventos no catálogo

Considere uma lista de elementos criada dinamicamente no DOM:

```javascript
recordsList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-record-id]");
    if (button) {
        showRecordDetail(button.dataset.recordId);
    }
});
```

Qual técnica está sendo usada e por que ela é útil quando os elementos da lista são criados dinamicamente? Delegação de eventos é registrar o listener em um elemento ancestral para tratar eventos de seus descendentes.

A. Delegação de eventos: um listener no contêiner trata cliques em elementos internos, inclusive os criados depois.

B. Polling: o código consulta o backend repetidamente até receber todos os cards.

C. Autenticação: `dataset` valida o token do usuário.

D. Roteamento PHP: `closest()` registra uma rota REST.

### 17. `FormData` e cabeçalho `Content-Type`

Um cliente HTTP remove o `Content-Type` padrão quando o corpo é `FormData` (estrutura do navegador para enviar campos e arquivos). Qual é a razão principal? O boundary é o delimitador que separa cada parte do conteúdo multipart.

```javascript
if (_isFormData) {
    delete headers["Content-Type"];
}
```

A. O browser precisa definir o `Content-Type` com o `boundary` correto do `multipart/form-data`.

B. `FormData` só pode ser enviado com o método `GET`.

C. O backend PHP não aceita cabeçalhos HTTP.

D. A remoção transforma os campos em parâmetros de caminho.

### 18. Token e rota protegida

Analise:

```javascript
setAuthToken(token) {
    this.#defaultHeaders["Authorization"] = `Bearer ${token}`;
}
```

Qual afirmação descreve melhor a finalidade desse método em um cliente HTTP?

A. Converte o token em senha e o envia na URL.

B. Configura o cabeçalho usado pelo cliente nas requisições protegidas; o backend ainda precisa validar o token e as permissões.

C. Torna desnecessária a verificação de autenticação no PHP.

D. Converte automaticamente todas as respostas JSON em tokens JWT.

### 19. Renderização de dados recebidos

Um texto recebido da API é exibido assim no DOM (estrutura de elementos da página manipulada por JavaScript):

```javascript
item.innerHTML = `<p>${record.description}</p>`;
```

Qual cuidado é mais adequado ao apresentar conteúdo textual vindo da API? XSS é a execução de conteúdo malicioso injetado na página por meio de dados tratados como HTML ou script.

A. Usar `eval(record.description)` antes de atribuir o conteúdo.

B. Colocar o valor em um parâmetro da URL para o browser remover caracteres especiais.

C. Preferir criar o elemento `<p>` e definir `textContent` com `record.description`, evitando interpretar o texto como HTML.

D. Desativar a validação do backend para impedir caracteres especiais.

### 20. Dados locais ou dados da API

Uma classe de domínio e um serviço HTTP são definidos assim:

```javascript
class Record {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
    }
}

class RecordService extends HttpClientBase {
    create(record) {
        return this.post("/records", record);
    }
}
```

Qual alternativa descreve melhor a separação de responsabilidades nesse exemplo?

A. A entidade representa os dados do domínio e o serviço encapsula a comunicação HTTP com a API.

B. O serviço deve conter o HTML da tela e o Model PHP deve ser instanciado diretamente no browser.

C. O construtor de `Record` deve executar SQL diretamente no banco.

D. O método `create` deve manipular os elementos do DOM em vez de enviar a requisição.

---

## Questões gerais sobre o TFD e o projeto didático

### 21. Delimitação do problema do TFD

Uma equipe propõe um micro SaaS (serviço de software disponibilizado pela Web, geralmente com foco e público específicos) para uma empresa ou serviço de sua escolha. Qual abordagem está mais alinhada à definição do trabalho final?

A. Escolher as tecnologias primeiro e depois inventar funcionalidades sem identificar usuários.

B. Descrever o setor e o problema real, identificar o público-alvo e definir objetivos e funcionalidades coerentes com as necessidades desse público.

C. Criar apenas uma página inicial, pois o backend pode ser planejado depois da apresentação final.

D. Reproduzir todas as telas de outro sistema, mesmo que não tenham relação com a proposta da equipe.

### 22. Áreas do sistema

O TFD prevê áreas pública, de aplicação e administrativa (áreas que podem ter diferentes requisitos de autenticação e permissões). Qual distribuição de acesso está mais adequada?

A. Todas as áreas devem ser públicas, pois o frontend não pode ter login.

B. A área pública apresenta informações sem login; a área de aplicação atende usuários cadastrados; a área administrativa oferece funções de gestão a perfis autorizados.

C. A área administrativa é destinada a qualquer usuário e a área pública exige JWT.

D. A área de aplicação deve conter apenas documentos de desenvolvimento, como o README.

### 23. Perfis de acesso de um SaaS

Um SaaS possui perfis de administrador, profissional e cliente. Qual estratégia é mais adequada para controlar o acesso? Autorização é a verificação do que um usuário autenticado pode fazer.

A. Definir permissões por perfil no backend e verificar autorização em cada operação protegida.

B. Ocultar botões no frontend; isso torna desnecessária a validação do servidor.

C. Permitir todas as operações a qualquer usuário autenticado.

D. Guardar o perfil em um campo editável do formulário e confiar no valor enviado pelo navegador.

### 24. Responsabilidades no MVC

Uma funcionalidade nova permite editar o perfil de um usuário. Qual alternativa distribui melhor as responsabilidades entre as camadas? Model representa dados e regras de persistência; View é a interface; Controller coordena a requisição e a resposta.

A. O Model atualiza o DOM e o JavaScript executa SQL diretamente no banco.

B. O Controller processa a rota, valida a requisição e coordena a resposta; o Model trata persistência e regras de dados; o frontend consome a API e atualiza a interface.

C. O Controller deve conter todo o HTML, CSS, SQL e JavaScript da funcionalidade.

D. O navegador chama o Model PHP diretamente, sem passar por rota ou Controller.

### 25. API para mais de um cliente

O TFD prevê que o Web Service (serviço que disponibiliza operações e dados pela rede) possa atender o frontend web e uma aplicação móvel. Qual é a principal vantagem dessa organização?

A. Cada cliente precisa implementar sua própria cópia do banco de dados.

B. O aplicativo móvel pode consultar diretamente os arquivos privados do servidor, sem autenticação.

C. Clientes diferentes podem consumir um contrato de API comum, enquanto o backend centraliza regras, validações e acesso aos dados.

D. A API elimina a necessidade de documentar métodos HTTP e formatos de resposta.

### 26. Escopo dos dados autenticados

Uma aplicação oferece uma rota `GET /api/me/records` para que uma pessoa consulte seus próprios registros. Qual prática protege melhor os dados? A sessão é o estado de autenticação mantido entre requisições, normalmente identificado por um token.

A. Determinar o usuário a partir da sessão/token validado no backend e retornar apenas os registros autorizados.

B. Receber um `user_id` enviado pela tela e confiar nele como prova de identidade.

C. Esconder no CSS os registros pertencentes a outros usuários.

D. Guardar a senha do usuário na URL para filtrar os registros.

### 27. Exclusão lógica de registros

Considere a operação de inativação, também chamada exclusão lógica (marcar um registro como inativo sem apagá-lo fisicamente):

```php
$record->setActive(false);
$record->updateById($recordId);
```

O que caracteriza essa abordagem em comparação com a exclusão física?

A. O registro é removido permanentemente do banco e não pode mais ser auditado.

B. O registro permanece armazenado com estado inativo; listagens podem filtrá-lo e a gestão pode continuar consultando-o conforme as permissões.

C. Apenas o elemento visual é removido; o estado do banco não muda.

D. A operação transforma automaticamente o registro em outra entidade.

### 28. Refatoração da Etapa 06

Qual alternativa corresponde ao objetivo da etapa de JavaScript orientado a objetos do TFD, que inclui POO prototípica (reutilização de propriedades e métodos por meio de protótipos)?

A. Criar classes apenas para cumprir uma exigência, sem utilizá-las nas telas.

B. Substituir a API por dados mockados para evitar manter o CRUD.

C. Refatorar sem alterar o comportamento integrado, usando entidades e serviços HTTP com responsabilidades separadas e funcionalidades reutilizáveis baseadas em protótipos.

D. Mover toda a persistência SQL para classes JavaScript executadas no navegador.

### 29. Relacionamento para uma galeria de imagens

Uma entidade principal do sistema precisa ter várias imagens. Qual modelagem representa adequadamente essa relação 1:N (um registro principal relacionado a vários registros de imagem)?

A. Salvar todo o conteúdo binário de todas as imagens em uma única string JSON no registro da entidade.

B. Guardar os arquivos em `FormData` no navegador sem enviá-los à API.

C. Manter cada arquivo no sistema de arquivos e seus metadados em registros relacionados à entidade por uma chave estrangeira, validando autorização no backend.

D. Usar o nome original do arquivo como autorização para permitir a remoção.

### 30. Documentação do contrato da API

Uma equipe concluiu uma rota para editar uma entidade do seu sistema. O que deve constar na documentação para que o frontend web e um aplicativo móvel possam integrá-la? Contrato da API é a definição acordada de métodos, caminhos, dados e respostas entre cliente e servidor.

A. Somente uma captura de tela da interface.

B. Método HTTP, caminho, parâmetros, corpo esperado, autenticação/permissões, exemplos de resposta e códigos de status.

C. Apenas o nome do arquivo PHP que contém o Controller.

D. A senha do banco de dados e o segredo usado para assinar tokens.

