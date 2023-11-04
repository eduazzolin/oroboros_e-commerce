if (document.title == 'oroboros adm') {
    document.getElementById('bt-cadastrar-artista-salvar').addEventListener('click', (event) => {
        event.preventDefault();
        admCadastrarArtista();
    });
    document.getElementById('bt-salvar-edicao-artista').addEventListener('click', (event) => {
        event.preventDefault();
        const botaoSalvar = event.target;
        admSalvarEdicaoArtista(botaoSalvar.getAttribute('_id'));
    });
    document.getElementById('bt-salvar-edicao-produto').addEventListener('click', (event) => {
        event.preventDefault();
        const botaoSalvar = event.target;
        admSalvarEdicaoProduto(botaoSalvar.getAttribute('_id'));
    });

    document.getElementById('bt-remover-artista').addEventListener('click', (event) => {
        event.preventDefault();
        const botaoRemover = event.target;
        admRemoverArtista(botaoRemover.getAttribute('_id'));
    });
    document.getElementById('bt-remover-produto').addEventListener('click', (event) => {
        event.preventDefault();
        const botaoRemover = event.target;
        admRemoverProduto(botaoRemover.getAttribute('_id'));
    });
    document.getElementById('bt-cadastrar-produto').addEventListener('click', (event) => {
        event.preventDefault();
        admCadastrarProduto();
    });
    const admPopularComboBoxArtistas = async () => {
        const eComboBox = document.getElementById('adm-seletor-artista-cadastrar-produto');
        const artistas = await getTodosArtistas();
        for (let artista of artistas) {
            const option = document.createElement('option');
            option.setAttribute('value', artista.id);
            option.innerHTML = artista.nome;
            eComboBox.appendChild(option);
        }
    }
    const admPopularComboBoxCategorias = async () => {
        const eComboBoxProd = document.getElementById('inputCategoriaCadastrarProduto');
        const eComboBoxEditar = document.getElementById('categoria-produto-selecionado-editar');
        const categorias = await getTodasCategorias();
        for (let c of categorias) {
            const optionProd = document.createElement('option');
            optionProd.setAttribute('value', c.id);
            optionProd.innerHTML = c.nome;
            eComboBoxProd.appendChild(optionProd);

            const optionEditar = document.createElement('option');
            optionEditar.setAttribute('value', c.id);
            optionEditar.innerHTML = c.nome;
            eComboBoxEditar.appendChild(optionEditar);
        }
    }

    admPopularComboBoxArtistas();
    admPopularComboBoxCategorias();
}

if (document.title === 'oroboros login') {
    document.getElementById('btCadUser').addEventListener('click', (event) => {
        event.preventDefault();
        cadastrarUsuario();
    });
    document.getElementById('btLogin').addEventListener('click', (event) => {
        event.preventDefault();
        fazerLogin();
        window.location.href = '/';
    });
    document.getElementById('bt-red-cad').addEventListener('click', (event) => {
        event.preventDefault();
        const eContLogin = document.getElementById('c-login')
        const eContCad = document.getElementById('c-cadastro')

        eContCad.classList.remove('d-none');
        eContLogin.classList.add('d-none');

    });
}

if (document.title === 'oroboros') {

    const popularTelaInicialComProdutos = async () => {

        const eLoading = document.getElementById('index-loading');
        const categoriasSelecionadas = getCategoriasSelecionadas();

        let produtos = await getProdutosAtivos();
        for (const produto of produtos) {
            const imgs = await getImagensProdutoById(produto.id);
            const artista = await getArtistaById(produto.artista_id);
            if (imgs != null && imgs.length > 0) {
                produto.imagem = imgs[0].dados;
            }
            if (artista != null) {
                produto.artista_nome = artista.nome;
            }
        }
        eLoading.classList.add('d-none');
        let rowListaProdutos = document.getElementById("row-lista-produtos");
        rowListaProdutos.classList.remove('d-none');
        produtos.forEach(produto => {

            const blocoProdutoHtml = `
                            <div class="col-lg-4 col-md-6 col-sm-12 produto-col-container">
                               <a href='/prod/${produto.id}'>
                                    <img src='${produto.imagem == null ? 'https://via.placeholder.com/300x300?text=Sem+imagem' : ('data:image/png;base64,' + produto.imagem)}' alt='' width='100%' class='produto-img'>
                                    <div class='produto-desc'>
                                        <p class='prod-autor'>${produto.artista_nome}</p>
                                        <p class='prod-nome'>${produto.nome}</p>
                                        <p class='prod-preco'>R$ ${produto.preco}</p>
                                    </div>
                                </a>
                            </div>
                                
                                `;
            rowListaProdutos.insertAdjacentHTML('beforeend', blocoProdutoHtml);

            // const divProdutoColConainer = document.createElement("div")
            // divProdutoColConainer.classList.add("col-lg-4", "col-md-6", "col-sm-12", "produto-col-container");
            // const aLink = document.createElement("a")
            // aLink.href = "produto.html";
            // const img = document.createElement("img")
            // if(produto.imagem == null){
            //     img.src = 'https://via.placeholder.com/300x300?text=Sem+imagem';
            // } else {
            //     img.src = 'data:image/png;base64,' + produto.imagem;
            // }
            // img.setAttribute("width", "100%")
            // img.classList.add("produto-img");
            // const divProdutoDesc = document.createElement("div")
            // divProdutoDesc.classList.add("produto-desc");
            // const pProdAutor = document.createElement("p")
            // pProdAutor.classList.add("prod-autor");
            // pProdAutor.innerHTML = produto.artista_nome;
            // const pProdNome = document.createElement("p")
            // pProdNome.classList.add("prod-nome");
            // pProdNome.innerHTML = produto.nome;
            // const pProdPreco = document.createElement("p")
            // pProdPreco.classList.add("prod-preco");
            // pProdPreco.innerHTML = "R$ " + produto.preco;
            //
            // divProdutoDesc.appendChild(pProdAutor);
            // divProdutoDesc.appendChild(pProdNome);
            // divProdutoDesc.appendChild(pProdPreco);
            // aLink.appendChild(img);
            // aLink.appendChild(divProdutoDesc);
            // divProdutoColConainer.appendChild(aLink);
            // rowListaProdutos.appendChild(divProdutoColConainer);
            //

        });
    }
    popularTelaInicialComProdutos();

    document.getElementById('user-icon').addEventListener('click', async (event) => {
        event.preventDefault();
        if (await checkLoginFrontEnd()) {
            if (await checkRoleFrontEnd()) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/userpage';
            }
        } else {
            window.location.href = '/login';
        }
    });


}

