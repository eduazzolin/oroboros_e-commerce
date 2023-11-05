/* coisas da página adm */
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


/* coisas da página inicial */
if (document.head.id === '01') {

    function montarQueryHome() {
        const ordernacao = document.getElementById('home-select-ordenacao').value;
        const categorias = getCategoriasSelecionadas();
        const texto = document.getElementById('pesquisa-produtos').value;
        let query = {
            ordem: "",
            ordemtipo: "",
            categoria: "",
            texto: ""
        };
        switch (ordernacao) {
            case '1':
                query.ordem = "preco";
                query.ordemtipo = "desc";
                break;
            case '2':
                query.ordem = "preco";
                query.ordemtipo = "asc";
                break;
            case '3':
                query.ordem = "data";
                query.ordemtipo = "desc";
                break;
            case '4':
                query.ordem = "data";
                query.ordemtipo = "asc";
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
    }


    const popularTelaInicialComProdutos = async () => {

        const eLoading = document.getElementById('index-loading');

        /* paginação */
        let qtdProdutos = await getProdutosCount();
        const paginacaoContainer = document.getElementById('home-page-cont');
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
                paginar(element.innerHTML);
            });
        }


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

    // function montarQueryHome() {
    //     const ordernacao = document.getElementById('home-select-ordenacao').value;
    //     const categorias = getCategoriasSelecionadas();
    //     const texto = document.getElementById('pesquisa-produtos').value;
    //     let url = '/?';
    //     switch (ordernacao) {
    //         case '1':
    //             url += 'o=preco&ot=desc&';
    //             break;
    //         case '2':
    //             url += 'o=preco&ot=asc&';
    //             break;
    //         case '3':
    //             url += 'o=data&ot=desc&';
    //             break;
    //         case '4':
    //             url += 'o=data&ot=asc&';
    //             break;
    //     }
    //     if (categorias.length > 0) {
    //         url += 'c=' + categorias.join(',') + '&';
    //     }
    //     if (texto != null && texto.trim() !== '') {
    //         url += 't=' + encodeURIComponent(texto.trim()) + '&';
    //     }
    //     console.log(url);
    //     return url;
    // }

    document.getElementById('bt-pintura').addEventListener('click', (event) => {
        event.preventDefault();
        montarQueryHome();
    });

}


/* coisas da página de produto */
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
              <button type="button" class="btn btn-outline-danger produto-desc-comprar">Comprar</button>
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
        containerCarrossel.insertAdjacentHTML('beforeend', blocoCarrosselHtml);

    }
    popularTelaProduto();


}

