/*
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  ____  ___    ___ ___  ____  ____
 /    ||   \  |   |   ||    ||    \
|  o  ||    \ | _   _ | |  | |  _  |
|     ||  D  ||  \_/  | |  | |  |  |
|  _  ||     ||   |   | |  | |  |  |
|  |  ||     ||   |   | |  | |  |  |
|__|__||_____||___|___||____||__|__|



 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */

/* coisas da página adm */
if (document.title == 'oroboros adm') {

    document.getElementById('bt-logout').addEventListener('click', (event) => {
        event.preventDefault();
        postLogout();
    });
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
        deleteArtista(botaoRemover.getAttribute('_id'));
    });
    document.getElementById('bt-remover-produto').addEventListener('click', (event) => {
        event.preventDefault();
        const botaoRemover = event.target;
        deleteProduto(botaoRemover.getAttribute('_id'));
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
    let idCompraParametro = new URLSearchParams(window.location.search).get('c');
    if (idCompraParametro != null) {
        admSelecaoMenu('botao-adm-4');
        admExibirEdicaoVenda(idCompraParametro);

    }
    const liberarPagina = async () => {
        if (!await getCheckAdminFrontEnd()) {
            window.location.href = '/login';
        }
    }
    liberarPagina();
    admPopularComboBoxArtistas();
    admPopularComboBoxCategorias();
}


/* coisas da página de login */
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


/*
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 ____   ____   ____  ____  ____    ____      ____  ____   ____   __  ____   ____  _
|    \ /    | /    ||    ||    \  /    |    |    ||    \ |    | /  ]|    | /    || |
|  o  )  o  ||   __| |  | |  _  ||  o  |     |  | |  _  | |  | /  /  |  | |  o  || |
|   _/|     ||  |  | |  | |  |  ||     |     |  | |  |  | |  |/  /   |  | |     || |___
|  |  |  _  ||  |_ | |  | |  |  ||  _  |     |  | |  |  | |  /   \_  |  | |  _  ||     |
|  |  |  |  ||     | |  | |  |  ||  |  |     |  | |  |  | |  \     | |  | |  |  ||     |
|__|  |__|__||___,_||____||__|__||__|__|    |____||__|__||____\____||____||__|__||_____|


 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */

if (document.head.id === '01') {

    function montarQueryHome() {
        const ordernacao = document.getElementById('home-select-ordenacao').value;
        const categorias = getCategoriasSelecionadas();
        const texto = document.getElementById('pesquisa-produtos').value;
        let query = {
            ordem: "",
            direcao: "",
            categoria: "",
            texto: ""
        };
        switch (ordernacao) {
            case '1':
                query.ordem = "preco";
                query.direcao = "desc";
                break;
            case '2':
                query.ordem = "preco";
                query.direcao = "asc";
                break;
            case '3':
                query.ordem = "data";
                query.direcao = "desc";
                break;
            case '4':
                query.ordem = "data";
                query.direcao = "asc";
                break;
        }
        if (categorias.length > 0) {
            query.categoria = categorias.join(',');
        }
        if (texto != null && texto.trim() !== '') {
            query.texto = texto.trim();
        }
        console.log(query);
        return query;
    }

    const paginar = async (page) => {
        const paginas = document.getElementsByClassName('page-item');
        for (let p of paginas) {
            p.classList.remove('active');
        }
        const pagina = document.getElementById('pi_' + page);
        pagina.classList.add('active');
        const query = montarQueryHome();
        query.pagina = page;
        await popularTelaInicialComProdutos(query);
    }

    const popularPaginacao = async (query) => {
        /* paginação */
        let qtdProdutos = await getProdutosCount(query);
        const paginacaoContainer = document.getElementById('home-page-cont');
        paginacaoContainer.innerHTML = '';
        let pageHtml = `<li class="page-item active" id="pi_1"><a class="page-link" href="#">1</a></li>`
        paginacaoContainer.insertAdjacentHTML('beforeend', pageHtml)
        while (qtdProdutos > 9) {
            let page = 2;
            let pageHtml = `<li class="page-item" id="pi_${page}"><a class="page-link" href="#">${page++}</a></li>`
            paginacaoContainer.insertAdjacentHTML('beforeend', pageHtml)
            qtdProdutos = qtdProdutos - 9;
        }
        let pagelinks = document.getElementsByClassName('page-link');
        for (let element of pagelinks) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Isso tornará a rolagem suave
                });
                paginar(element.innerHTML);
            });
        }
    }
    popularPaginacao();

    const popularTelaInicialComProdutos = async (query) => {

        const rowListaProdutos = document.getElementById("row-lista-produtos");
        const eLoading = document.getElementById('index-loading');
        rowListaProdutos.classList.add('d-none');
        eLoading.classList.remove('d-none');

        if (query.pagina == null) {
            query.pagina = 1;
        }
        let produtos = await getProdutosAtivos(query);
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
        rowListaProdutos.innerHTML = '';
        rowListaProdutos.classList.remove('d-none');
        produtos.forEach(produto => {

            const blocoProdutoHtml = `
                            <div class="col-lg-4 col-md-6 col-sm-12 produto-col-container">
                               <a href='/prod?id=${produto.id}'>
                                    <img src='${produto.imagem == null ? 'https://via.placeholder.com/300x300?text=Sem+imagem' : ('data:image/png;base64,' + produto.imagem)}' alt='' width='100%' class='produto-img'>
                                    <div class='produto-desc'>
                                        <p class='prod-autor'>${produto.artista_nome}</p>
                                        <p class='prod-nome'>${produto.nome}</p>
                                        <p class='prod-preco'>R$ ${produto.preco.toFixed(2)}</p>
                                    </div>
                                </a>
                            </div>
                                
                                `;
            rowListaProdutos.insertAdjacentHTML('beforeend', blocoProdutoHtml);
        });
    }
    popularTelaInicialComProdutos(montarQueryHome());

    /* ícone do usuário */
    document.getElementById('user-icon').addEventListener('click', async (event) => {
        event.preventDefault();
        if (await getCheckLoginFrontEnd()) {
            if (await getCheckAdminFrontEnd()) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/userpage';
            }
        } else {
            window.location.href = '/login';
        }
    });


    /* botões de categorias */
    function getCategoriasSelecionadas() {
        const categoriasSelecionadas = [];
        const botoesCategorias = document.getElementsByClassName("home-bt-categoria");
        for (let categoria of botoesCategorias) {
            if (categoria.ariaPressed === "true") {
                categoriasSelecionadas.push(categoria.getAttribute('_id'));
            }
        }
        return categoriasSelecionadas;
    }

    const btCategorias = document.getElementsByClassName('home-bt-categoria');
    for (let btCategoria of btCategorias) {
        btCategoria.addEventListener('click', (event) => {
            for (let bt of btCategorias) {
                if (bt !== btCategoria) {
                    bt.classList.remove('active');
                    bt.setAttribute('aria-pressed', 'false');
                }
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Isso tornará a rolagem suave
            });
            event.preventDefault();
            popularPaginacao(montarQueryHome());
            popularTelaInicialComProdutos(montarQueryHome());
        });
    }

    /* ordenação */
    const selectOrdenacao = document.getElementById('home-select-ordenacao');
    selectOrdenacao.addEventListener('change', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Isso tornará a rolagem suave
        });
        popularPaginacao(montarQueryHome());
        popularTelaInicialComProdutos(montarQueryHome());
    });

    /* pesquisa */
    const btPesquisa = document.getElementById('search-addon');
    btPesquisa.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Isso tornará a rolagem suave
        });
        popularPaginacao(montarQueryHome());
        popularTelaInicialComProdutos(montarQueryHome());
    });

}


/*
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 ____  ____   ___   ___    __ __  ______   ___
|    \|    \ /   \ |   \  |  |  ||      | /   \
|  o  )  D  )     ||    \ |  |  ||      ||     |
|   _/|    /|  O  ||  D  ||  |  ||_|  |_||  O  |
|  |  |    \|     ||     ||  :  |  |  |  |     |
|  |  |  .  \     ||     ||     |  |  |  |     |
|__|  |__|\_|\___/ |_____| \__,_|  |__|   \___/


 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */
if (document.head.id === '02') {
    let idProdutoParametro = new URLSearchParams(window.location.search).get('id');
    if (idProdutoParametro == null) {
        window.location.href = '/';
    }
    const containerCarrossel = document.getElementById('prod-carrossel-cont');
    const containerProdInfo = document.getElementById('prod-info-cont');
    const containerArtInfo = document.getElementById('prod-sobre-art-cont');
    const prodloading = document.getElementById('prod-loading');

    const popularTelaProduto = async () => {
        const produto = await getProdutoById(idProdutoParametro);
        if (produto == null) {
            alert('Produto não encontrado!');
            window.location.href = '/';
        }
        const artista = await getArtistaById(produto.artista_id);

        const blocoProdutoHtml = `
        <div class="produto-desc-textos">
            <div class="produto-desc-desc">
              ${artista.nome}
            </div>
            <h1 class="produto-desc-titulo">
              ${produto.nome}
            </h1>
            <div class="produto-desc-desc">
              ${produto.descricao}
            </div>
            <h1 class="produto-desc-preco">
              R$ ${produto.preco.toFixed(2)}
            </h1>
            <div class="produto-desc-botoes">
              <button type="button" id="bt-comprar" class="btn btn-outline-danger produto-desc-comprar">Comprar</button>
            </div>
          </div>
        `;
        containerProdInfo.insertAdjacentHTML('beforeend', blocoProdutoHtml);

        const blocoArtistaHtml = `
                            <div class="row row-sobre-artista justify-content-center ">
                                <div class="col-12 col-sobre-artista">
                                  <h1 class="sobre-artista-titulo">
                                    Sobre o artista
                                  </h1>
                                </div>
                              </div>
                            
                              <div class="row row-sobre-artista-content justify-content-center">
                            
                                <div class="col-3 col-sobre-artista-foto">
                                  <img class="img-fluid" src="${artista.imagem == null ? 'https://via.placeholder.com/300x300?text=Sem+imagem' : ('data:image/png;base64,' + artista.imagem)}" alt=""/>
                                </div>
                            
                                <div class="col-9 col-sobre-artista-desc my-auto">
                                  <h2 class="sobre-artista-nome">
                                    ${artista.nome}
                                  </h2>
                                  <div class="sobre-artista-desc">
                                     ${artista.descricao}
                                  </div>
                                </div>
                              </div>
        `;
        containerArtInfo.insertAdjacentHTML('beforeend', blocoArtistaHtml);

        const imgs = await getImagensProdutoById(idProdutoParametro);

        let blocoCarrosselHtml = `
        <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active ">
            <img src="${imgs == null || imgs.length === 0 ? 'https://via.placeholder.com/300x300?text=Sem+imagem' : ('data:image/png;base64,' + imgs[0].dados)}" class="d-block w-100" alt="...">
          </div>
        `;
        if (imgs != null && imgs.length > 1) {
            for (let i = 1; i < imgs.length; i++) {
                blocoCarrosselHtml += `
                <div class="carousel-item">
                  <img src="data:image/png;base64,${imgs[i].dados}" class="d-block w-100" alt="...">
                </div>
                `;
            }
        }
        blocoCarrosselHtml += '</div>';
        if (imgs != null && imgs.length > 1) {
            blocoCarrosselHtml += `
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>`;
        }
        blocoCarrosselHtml += '</div>';


        prodloading.classList.add('d-none');

        /* botão de comprar */
        const btComprar = document.getElementById('bt-comprar');
        btComprar.addEventListener('click', async (event) => {
            event.preventDefault();
            if (await getCheckLoginFrontEnd()) {
                await postVenda(produto);
            } else {
                window.location.href = '/login';
            }
        });


        containerCarrossel.insertAdjacentHTML('beforeend', blocoCarrosselHtml);

    }
    popularTelaProduto();
}


/*
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


 __ __  _____   ___  ____   ____   ____   ____    ___
|  |  |/ ___/  /  _]|    \ |    \ /    | /    |  /  _]
|  |  (   \_  /  [_ |  D  )|  o  )  o  ||   __| /  [_
|  |  |\__  ||    _]|    / |   _/|     ||  |  ||    _]
|  :  |/  \ ||   [_ |    \ |  |  |  _  ||  |_ ||   [_
|     |\    ||     ||  .  \|  |  |  |  ||     ||     |
 \__,_| \___||_____||__|\_||__|  |__|__||___,_||_____|


 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */
if (document.head.id === '03') {


    const ativarBotaoEditar = () => {
        document.getElementById('bt-salvar-edicao-usuario').classList.remove('disabled');
    }

    const eNome = document.getElementById('up-inputNomeEditar');
    const eEmail = document.getElementById('up-inputEmailEditar');
    const eSenha = document.getElementById('up-inputPasswordEditar');
    const eDoc = document.getElementById('up-inputCPFCNPJEditar');

    eNome.addEventListener('change', ativarBotaoEditar);
    eEmail.addEventListener('change', ativarBotaoEditar);
    eSenha.addEventListener('change', ativarBotaoEditar);
    eDoc.addEventListener('change', ativarBotaoEditar);
    document.getElementById('bt-logout').addEventListener('click', (event) => {
        event.preventDefault();
        postLogout();
    });

    const popularTelaUsuario = async () => {
        if (await getCheckLoginFrontEnd()) {
            if (await getCheckAdminFrontEnd()) {
                window.location.href = '/admin';
            }
            const dadosUsuario = await getDadosLimitadosUsuarioLogado();

            eNome.value = dadosUsuario.nome;
            eEmail.value = dadosUsuario.email;
            eDoc.value = dadosUsuario.cpf_cnpj;

            document.getElementById('bt-salvar-edicao-usuario').addEventListener('click', (event) => {
                event.preventDefault();
                const botaoSalvar = event.target;
                editarUsuario();
            });


            const compras = await getComprasUsuarioLogado();
            const eCompras = document.getElementById('up-compras-cont');
            for (const c of compras) {
                const imgProd = await getImagensProdutoById(c.produto.id);
                const imgPrincipalDados = imgProd == null || imgProd.length > 0 ? 'data:image/png;base64,' + imgProd[0].dados : 'https://via.placeholder.com/300x300?text=Sem+imagem';
                const artista = await getArtistaById(c.produto.artista_id);
                const htmlCompras = `
                     <div class="row row-ultimas-compras ms-2 my-4">
                        <div class="col-2 col-imagem-ultima-compra">
                          <img src="${imgPrincipalDados}" alt="" class="img-fluid">
                        </div>
                        <div class="col-10 col-descricao-ultima-compra">
                          <h2>Pedido #${c.id}</h2>
                          <p><strong>Produto: </strong> ${c.produto.nome} </p>
                          <p><strong>Artista: </strong> ${artista.nome}</p>
                          <p><strong>Valor: </strong> R$ ${c.valor}</p>
                          <p><strong>Data: </strong> ${c.dt_venda}</p>
                          <p><strong>Status: </strong> ${c.status}</p>
                          <a href="mailto:oroboros@orobos.com">Contato</a>
                        </div>
                      </div>
                     `;
                eCompras.insertAdjacentHTML('beforeend', htmlCompras);
            }

        } else {
            window.location.href = '/login';
        }
    }
    popularTelaUsuario();


}