# P3 - Prova C

## Orientacoes

Implemente a solucao em JavaScript, sem bibliotecas externas. A prova e
individual, pratica, dura 2h30 e permite consulta ao material da disciplina e
aos repositorios fornecidos.

Entregue a pasta da prova com `assets/script.js` e um `README.md` contendo sua
identificacao, instrucoes de execucao e evidencias das questoes. Use um
servidor HTTP local para abrir `index.html`.

O valor total e 10,0 pontos. A prova possui duas partes:

- Parte 1 - fundamentos prototipicos e classes: 4,0 pontos;
- Parte 2 - aplicacao frontend local: 6,0 pontos.

Nao altere a estrutura de dados fornecida em `assets/script.js` para eliminar
requisitos da prova. Voce pode criar funcoes, objetos, classes e elementos
auxiliares quando necessario.

## Contexto

Voce esta implementando um catalogo de oficinas de desenvolvimento web. A
pagina inicial ja possui os dados de exemplo e a estrutura visual. Nao ha API,
banco de dados ou servidor PHP nesta versao. O foco e JavaScript orientado a
objetos aplicado a uma interface pequena e testavel.

## Parte 1 - Fundamentos (4,0 pontos)

Implemente os exemplos no inicio de `assets/script.js` e demonstre cada item
com `console.assert`, `console.log` ou evidencias equivalentes no README.

### Questao 1 - Protótipos e mutabilidade (2,0 pontos)

1. Crie `workshopPrototype` com os metodos `getLabel()` e `isAvailable()`.
   Crie dois workshops com `Object.create()` e propriedades proprias
   `title`, `level`, `duration` e `available`. (0,75 ponto)
2. Demonstre com `Object.getPrototypeOf()` e `Object.hasOwn()` que os dados
   pertencem aos objetos e os metodos sao herdados. (0,5 ponto)
3. Adicione `enroll()` ao prototipo depois de criar os objetos. O metodo deve
   alterar somente o workshop usado e impedir uma inscricao quando
   `available` for falso. (0,75 ponto)

### Questao 2 - Copia e restricao de objetos (2,0 pontos)

Considere um objeto `schedule` com uma lista aninhada de workshops.

1. Crie uma copia rasa com spread e demonstre que uma alteracao no item
   aninhado tambem aparece no objeto original. (0,5 ponto)
2. Crie uma copia profunda com `structuredClone()` ou alternativa documentada.
   Demonstre a independencia da lista aninhada e registre uma limitacao da
   tecnica escolhida. (0,5 ponto)
3. Use `Object.freeze()`, `Object.seal()` e `Object.preventExtensions()`.
   Para cada um, demonstre uma alteracao permitida e uma operacao impedida.
   Considere o comportamento em modo estrito ou explique a verificacao feita.
   (1,0 ponto)

## Parte 2 - Aplicacao frontend (6,0 pontos)

Complete a interface do catalogo usando os dados constantes `workshopData` e
`instructorData` fornecidos no starter.

### Questao 3 - Entidades e catalogo (2,5 pontos)

1. Implemente a classe `Instructor`, mantendo os dados recebidos e criando
   `getLabel()`, que deve retornar o nome e a especialidade. (0,5 ponto)
2. Implemente a classe `Workshop`, mantendo os dados recebidos e criando
   `getSummary()`, que deve retornar duracao, nivel e instrutor. (0,75 ponto)
3. Implemente a classe `WorkshopCatalog`. Seus metodos devem ficar no
   prototipo e a classe deve oferecer `list()`, `findById(id)` e
   `filterByTitle(term)`. (0,75 ponto)
4. Crie as entidades a partir dos dados fornecidos e demonstre que os metodos
   sao reutilizados pelas instancias, sem criar funcoes novas em cada objeto.
   (0,5 ponto)

### Questao 4 - Renderizacao e interacao (2,5 pontos)

1. Ao carregar a pagina, converta os dados em objetos `Instructor` e
   `Workshop`, preencha o select de instrutores e renderize a lista inicial.
   Nao deixe oficinas fixas no HTML. (0,75 ponto)
2. Ao selecionar um instrutor, mostre somente as oficinas dele. Ao limpar a
   selecao, mostre todas novamente. (0,75 ponto)
3. Implemente o filtro por titulo sem recriar os dados e sem usar valores
   fixos para decidir quais cards aparecem. O filtro deve respeitar tambem o
   instrutor selecionado. (0,5 ponto)
4. Ao acionar `Ver ementa`, mostre no painel de detalhes a descricao, o nivel,
   a duracao e o instrutor da oficina. (0,5 ponto)

### Questao 5 - Estados e qualidade (1,0 ponto)

1. Mostre estados distintos para carregamento, lista vazia, sucesso e erro de
   validacao ou consulta local. Como nao existe API nesta versao, o estado de
   erro pode ser demonstrado por uma funcao de validacao acionada no console ou
   por uma mensagem controlada na interface. (0,35 ponto)
2. Complete e utilize `toastPrototype` para informar sucesso, aviso ou erro.
   A mensagem deve usar a regiao `aria-live` e nao pode usar `alert()`. (0,25
   ponto)
3. Mantenha as responsabilidades separadas entre entidades, catalogo e
   renderizacao. Use corretamente `this`, `class` e metodos compartilhados.
   (0,25 ponto)
4. Corrija os labels associados, preserve foco visivel e mantenha a tela
   utilizavel em telas estreitas. (0,15 ponto)

## Criterios gerais

- A Parte 1 sera corrigida pelas evidencias executaveis e pela explicacao no
  README.
- Na Parte 2, dados, entidades e catalogo devem ser separados da manipulacao
  da interface.
- O uso de bibliotecas externas, `alert()` ou valores de oficina escritos
  diretamente na renderizacao pode reduzir a pontuacao do item correspondente.
- O codigo deve continuar executavel mesmo quando nao houver resultados para o
  filtro ou para o instrutor selecionado.
- Nao e necessario implementar API, banco, SQL, login ou alteracoes no CSS
  alem das necessarias para acessibilidade e responsividade.

## Execucao e entrega

1. Inicie o servidor local indicado pelo professor.
2. Abra `prova-c/index.html` por HTTP.
3. Edite principalmente `assets/script.js` e recarregue a pagina.
4. Entregue `assets/script.js`, eventuais alteracoes justificadas em HTML/CSS
   e o README com as evidencias.
