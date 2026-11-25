# Starter — Prova A: Livraria

## Abrir a aplicação

O professor instala esta pasta em `www`, inicia Apache e MySQL no WAMP e
prepara o banco `db-livraria` antes da avaliação. A configuração padrão em
`api/source/Config/Config.php` pressupõe MySQL em `127.0.0.1:3306`, usuário
`root` e senha vazia. O professor deve conferir esses dados e ajustar a
configuração antes da prova se o WAMP da escola usar outros valores.

Para abrir a aplicação:

```text
http://localhost/prova-a-livraria/
```

O estudante inicia a prova com o ambiente e o banco preparados pelo professor.
Não deve criar tabelas nem alterar a configuração local do banco.

Não execute Composer. A pasta `api/vendor` e o autoload já acompanham o
starter. A aplicação também é preparada e testada pelo professor no ambiente
Docker de desenvolvimento.

## Arquivos para a prática

- `api/source/Models/Genre.php`, `Supplier.php` e `Publisher.php` e as
  respectivas rotas GET são exemplos funcionais.
- Crie `api/source/Models/Book.php` e
  `api/source/Controller/Books.php` para a entidade e as rotas
  `GET /api/books` e `POST /api/books`.
- O formulário envia os campos com `FormData`; o Controller recebe os campos
  pelo CoffeeCode e responde em JSON.
- `views/assets/_common/prototypes/ToastPrototype.js` fornece um toast
  prototípico, instanciado com `Object.create`. Use os botões da página para
  testar os tipos `success` e `error` e reutilize o componente nas interações.
- `views/` contém dados mockados para a listagem e o formulário pronto. A
  integração de gêneros, fornecedores e editoras usa as rotas GET fornecidas.
- `database/db-livraria.sql` cria o schema e os dados iniciais. Identificadores
  SQL estão em inglês.

O frontend usa mensagens de estado acessíveis e renderiza conteúdo textual
sem interpretá-lo como HTML. Não remova essas proteções ao completar a
integração.
