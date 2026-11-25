<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Livraria — P4 Prova A</title>
    <link rel="stylesheet" href="views/assets/styles.css">
</head>
<body>
    <header class="page-header">
        <p class="eyebrow">Programação Web II · P4</p>
        <h1>Livraria</h1>
        <p>Catálogo de livros e cadastro integrado à API.</p>
    </header>

    <main>
        <section class="panel" aria-labelledby="catalog-title">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Catálogo</p>
                    <h2 id="catalog-title">Livros</h2>
                </div>
                <button id="reload-books" class="button button-secondary" type="button">
                    Carregar livros da API
                </button>
            </div>
            <p id="books-status" class="status" role="status" aria-live="polite">
                Exibindo dados de demonstração.
            </p>
            <div id="books-list" class="book-grid"></div>
        </section>

        <section class="panel" aria-labelledby="form-title">
            <p class="eyebrow">Cadastro</p>
            <h2 id="form-title">Incluir livro</h2>
            <p class="muted">Os gêneros, fornecedores e editoras são carregados pela API.</p>
            <p id="catalog-status" class="status" role="status" aria-live="polite"></p>

            <form id="book-form">
                <div class="form-grid">
                    <label>
                        Título
                        <input name="title" type="text" maxlength="180" required>
                    </label>
                    <label>
                        Autor
                        <input name="author" type="text" maxlength="140" required>
                    </label>
                    <label>
                        ISBN
                        <input name="isbn" type="text" maxlength="20" required>
                    </label>
                    <label>
                        Gênero
                        <select id="genre-select" name="genre_id" required>
                            <option value="">Carregando gêneros…</option>
                        </select>
                    </label>
                    <label>
                        Fornecedor
                        <select id="supplier-select" name="supplier_id" required>
                            <option value="">Carregando fornecedores…</option>
                        </select>
                    </label>
                    <label>
                        Editora
                        <select id="publisher-select" name="publisher_id" required>
                            <option value="">Carregando editoras…</option>
                        </select>
                    </label>
                    <label>
                        Preço
                        <input name="price" type="number" min="0" step="0.01" required>
                    </label>
                    <label>
                        Estoque
                        <input name="stock" type="number" min="0" step="1" required>
                    </label>
                </div>
                <div class="form-actions">
                    <button class="button" type="submit">Salvar livro</button>
                </div>
            </form>
            <p id="form-status" class="status" role="status" aria-live="polite"></p>
        </section>

        <section class="panel" aria-labelledby="toast-demo-title">
            <p class="eyebrow">Componente prototípico</p>
            <h2 id="toast-demo-title">Testar mensagens</h2>
            <p class="muted">Experimente as mensagens de sucesso e erro disponíveis para a interface.</p>
            <div class="toast-demo-actions">
                <button id="test-success-toast" class="button button-success" type="button">
                    Testar toast de sucesso
                </button>
                <button id="test-error-toast" class="button button-error" type="button">
                    Testar toast de erro
                </button>
            </div>
        </section>
    </main>

    <footer>
        <p>Prova A — Livraria · As opções dos campos de relacionamento vêm do banco.</p>
    </footer>
    <div id="toast" class="toast" role="status" aria-live="polite" aria-atomic="true" hidden></div>
    <script type="module" src="views/assets/app.js"></script>
</body>
</html>
