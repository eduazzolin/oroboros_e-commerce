

/* Funções de CADASTRO */
const admCadastrarProduto = async () => {
    const imgProduto = document.getElementById('input-imagem-produto');
    const nomeProduto = document.getElementById('inputNomeCadastrarProduto');
    const descricaoProduto = document.getElementById('inputDescricaoCadastrarProduto');
    const precoProduto = document.getElementById('inputPrecoCadastrarProduto');
    const ativoProduto = document.getElementById('inputAtivoCadastrarProduto').checked;
    const categoriaProdutoId = document.getElementById('inputCategoriaCadastrarProduto').value;
    const artistaProdutoId = document.getElementById('adm-seletor-artista-cadastrar-produto').value;

    const produto = {
        nome: nomeProduto.value,
        descricao: descricaoProduto.value,
        preco: precoProduto.value,
        categoria: categoriaProdutoId,
        artista_id: artistaProdutoId,
        ativo: ativoProduto
    }
    alert(await admCadastrarProdutoPersistence(produto, imgProduto.files));
    location.reload();
}

const admCadastrarArtista = async (id) => {
    const eNomeArtista = document.getElementById('nome-artista-cadastrar');
    const eDescricaoArtista = document.getElementById('descricao-artista-cadastrar');
    const eCpfCnpjArtista = document.getElementById('cpf-cnpj-artista-cadastrar');
    const eImgArtista = document.getElementById('img-artista-cadastrar');


    const artista = {
        nome: eNomeArtista.value,
        descricao: eDescricaoArtista.value,
        cpf_cnpj: eCpfCnpjArtista.value,
    }
    const imgArtista = eImgArtista.files[0];
    alert(await admCadastrarArtistaBanco(artista, imgArtista));
    location.reload();
}



/* Funções de EDIÇÃO */
const admSalvarEdicaoArtista = async (id) => {
    const eNomeArtistaSelecionado = document.getElementById('nome-artista-selecionado-editar');
    const eDescricaoArtistaSelecionado = document.getElementById('descricao-artista-selecionado-editar');
    const eCpfCnpjArtistaSelecionado = document.getElementById('cpf-cnpj-artista-selecionado-editar');
    const eImgArtistaSelecionado = document.getElementById('img-artista-selecionado-editar');
    const eInputImagemArtistaEditar = document.getElementById('input-imagem-artista-editar');

    if (eInputImagemArtistaEditar.files[0] == null) {
        const blobImagem = eImgArtistaSelecionado.src.split(',')[1];
        const artista = {
            id: id,
            nome: eNomeArtistaSelecionado.value,
            descricao: eDescricaoArtistaSelecionado.value,
            cpf_cnpj: eCpfCnpjArtistaSelecionado.value,
            imagem: blobImagem
        }
        await admSalvarArtistaBanco(artista);
    } else {
        const artista = {
            id: id,
            nome: eNomeArtistaSelecionado.value,
            descricao: eDescricaoArtistaSelecionado.value,
            cpf_cnpj: eCpfCnpjArtistaSelecionado.value,
        }
        const imgArtista = eInputImagemArtistaEditar.files[0];
        await admSalvarArtistaBanco(artista, imgArtista);
    }
    location.reload();
}

const admSalvarEdicaoProduto = async (id) => {
    
    const eImgProdutoSelecionado = document.getElementById('img-produto-selecionado-editar');
    const eNomeProdutoSelecionado = document.getElementById('nome-produto-selecionado-editar');
    const eDescricaoAProdutoSelecionado = document.getElementById('descricao-produto-selecionado-editar');
    const ePrecoProdutoSelecionado = document.getElementById('preco-produto-selecionado-editar');
    const eCategoriaProdutoSelecionado = document.getElementById('categoria-produto-selecionado-editar');
    const eAtivoProdutoSelecionado = document.getElementById('ativo-produto-selecionado-editar');

    
        /*
        * PAREI AQUI, COPIEI DA SALVAR EDIÇÃO ARTISTA DAQUI PRA BAIXO
        */


    if (eImgProdutoSelecionado.files[0] == null) {
        const blobImagem = eImgArtistaSelecionado.src.split(',')[1];
        const artista = {
            id: id,
            nome: eNomeArtistaSelecionado.value,
            descricao: eDescricaoArtistaSelecionado.value,
            cpf_cnpj: eCpfCnpjArtistaSelecionado.value,
            imagem: blobImagem
        }
        await admSalvarArtistaBanco(artista);
    } else {
        const artista = {
            id: id,
            nome: eNomeArtistaSelecionado.value,
            descricao: eDescricaoArtistaSelecionado.value,
            cpf_cnpj: eCpfCnpjArtistaSelecionado.value,
        }
        const imgArtista = eInputImagemArtistaEditar.files[0];
        await admSalvarArtistaBanco(artista, imgArtista);
    }
    location.reload();
}



/* Funções de PÁGINA */
const admSelecaoMenu = (id) => {
    const eBotao = document.getElementById(id);
    const eContainer = document.getElementById(id + '-cont');
    const cButtonAdmin = document.getElementsByClassName('button-admin');
    const cContainerAdmin = document.getElementsByClassName('container-admin');
    Array.from(cButtonAdmin).forEach((b) => {
        b.classList.remove('botao-importado-pressinado');
    });

    if (!eBotao.classList.contains('botao-importado-pressinado')) {
        eBotao.classList.add('botao-importado-pressinado');
    }
    Array.from(cContainerAdmin).forEach((c) => {
        if (c != cContainerAdmin) {
            c.classList.add('d-none');
        }
    });
    if (eContainer.classList.contains('d-none')) {
        eContainer.classList.remove('d-none');
    }
}

const admExibirEdicaoArtista = async (id) => {
    const artistaSelecionado = await getArtistaById(id);
    const eRowArtistaSelecionado = document.getElementById('row-artista-selecionado-editar');
    const eImgArtistaSelecionado = document.getElementById('img-artista-selecionado-editar');
    const eNomeArtistaSelecionado = document.getElementById('nome-artista-selecionado-editar');
    const eDescricaoArtistaSelecionado = document.getElementById('descricao-artista-selecionado-editar');
    const eCpfCnpjArtistaSelecionado = document.getElementById('cpf-cnpj-artista-selecionado-editar');
    const btSalvar = document.getElementById('bt-salvar-edicao-artista');
    const btRemover = document.getElementById('bt-remover-artista');

    eImgArtistaSelecionado.src = 'data:image/png;base64,' + artistaSelecionado.imagem;
    eNomeArtistaSelecionado.value = artistaSelecionado.nome;
    eDescricaoArtistaSelecionado.innerText = artistaSelecionado.descricao;
    eCpfCnpjArtistaSelecionado.value = artistaSelecionado.cpf_cnpj;
    btSalvar.setAttribute('_id', artistaSelecionado.id);
    btRemover.setAttribute('_id', artistaSelecionado.id);

    if (eRowArtistaSelecionado.classList.contains('d-none')) {
        eRowArtistaSelecionado.classList.remove('d-none');
    }
}

const admExibirEdicaoProduto = async (id) => {
    const produtoSelecionado = await getProdutoById(id);
    const eRowProdutoSelecionado = document.getElementById('row-produto-selecionado-editar');
    const eNomeProdutoSelecionado = document.getElementById('nome-produto-selecionado-editar');
    const eDescricaoAProdutoSelecionado = document.getElementById('descricao-produto-selecionado-editar');
    const ePrecoProdutoSelecionado = document.getElementById('preco-produto-selecionado-editar');
    const eCategoriaProdutoSelecionado = document.getElementById('categoria-produto-selecionado-editar');
    const eAtivoProdutoSelecionado = document.getElementById('ativo-produto-selecionado-editar');

    eNomeProdutoSelecionado.value = produtoSelecionado.nome;
    eDescricaoAProdutoSelecionado.innerText = produtoSelecionado.descricao;
    ePrecoProdutoSelecionado.value = produtoSelecionado.preco;
    eCategoriaProdutoSelecionado.value = produtoSelecionado.categoria.id;
    eAtivoProdutoSelecionado.checked = produtoSelecionado.ativo;

    const btSalvar = document.getElementById('bt-salvar-edicao-produto');
    const btRemover = document.getElementById('bt-remover-produto');

    btSalvar.setAttribute('_id', produtoSelecionado.id);
    btRemover.setAttribute('_id', produtoSelecionado.id);

    if (eRowProdutoSelecionado.classList.contains('d-none')) {
        eRowProdutoSelecionado.classList.remove('d-none');
    }
}

const admAbrirSelecaoArtista = async () => {
    const eArtistaSelecionado = document.getElementById('adm-seletor-artista-cadastrar-produto').selectedOptions[0].value;
    const aArtistaSelecionado = await getArtistaById(eArtistaSelecionado);
    const cArtistaSelecionado = document.getElementById('artista-selecionado-cadastrar-produto');
    const conteudoHtml = `
            <div>
                <img src='data:image/png;base64,${aArtistaSelecionado.imagem}' width="100px" class="img-fluid mb-2">
            </div>
            <div class="descricao-artista-adm">
                <p><strong>Nome: </strong> ${aArtistaSelecionado.nome} </p>
                <p><strong>Descrição: </strong> ${aArtistaSelecionado.descricao}</p>
                <p><strong>CPF/CNPJ: </strong> ${aArtistaSelecionado.cpf_cnpj}</p>
            </div>
            `;
    cArtistaSelecionado.innerHTML = conteudoHtml;

    if (eArtistaSelecionado != '') {
        cArtistaSelecionado.classList.remove('d-none');
    } else {
        cArtistaSelecionado.classList.add('d-none');
    }
}

const admExibirCadastrarArtista = () => {
    const cEditarArtista = document.getElementById('con-editar-artistas');
    const cCadastrarArtista = document.getElementById('con-cadastrar-artistas');
    cEditarArtista.classList.add('d-none');
    cCadastrarArtista.classList.remove('d-none');
}
const admSairCadastrarArtista = () => {
    const cEditarArtista = document.getElementById('con-editar-artistas');
    const cCadastrarArtista = document.getElementById('con-cadastrar-artistas');
    cCadastrarArtista.classList.add('d-none');
    cEditarArtista.classList.remove('d-none');
}


/* Funções de POPULAÇÃO */
const popularTelaInicialComProdutos = async () => {
    const categoriasSelecionadas = getCategoriasSelecionadas();
    produtos = await getProdutos();
    let rowListaProdutos = document.getElementById("row-lista-produtos");
    produtos.forEach(produto => {
        const divProdutoColConainer = document.createElement("div")
        divProdutoColConainer.classList.add("col-lg-4", "col-md-6", "col-sm-12", "produto-col-container");
        const aLink = document.createElement("a")
        aLink.href = "produto.html";
        const img = document.createElement("img")
        img.src = "img/prod/" + produto.imagem
        img.setAttribute("width", "100%")
        img.classList.add("produto-img");
        const divProdutoDesc = document.createElement("div")
        divProdutoDesc.classList.add("produto-desc");
        const pProdAutor = document.createElement("p")
        pProdAutor.classList.add("prod-autor");
        pProdAutor.innerHTML = produto.artista_id;
        const pProdNome = document.createElement("p")
        pProdNome.classList.add("prod-nome");
        pProdNome.innerHTML = produto.nome;
        const pProdPreco = document.createElement("p")
        pProdPreco.classList.add("prod-preco");
        pProdPreco.innerHTML = "R$ " + produto.preco;

        divProdutoDesc.appendChild(pProdAutor);
        divProdutoDesc.appendChild(pProdNome);
        divProdutoDesc.appendChild(pProdPreco);
        aLink.appendChild(img);
        aLink.appendChild(divProdutoDesc);
        divProdutoColConainer.appendChild(aLink);
        rowListaProdutos.appendChild(divProdutoColConainer);
    });
}

// document.addEventListener("DOMContentLoaded", function () {
//     popularTelaInicialComProdutos();
// });

const admPopularTabelaEditarProdutos = async () => {
    const cTabela = document.getElementById('cont-tabela-gerenciar-prod');
    cTabela.innerHTML = '';
    const produtosAtivos = await getProdutosAtivos();
    produtosAtivos.forEach((p) => {
        const divId = document.createElement('div');
        divId.innerText = p.id;
        divId.classList.add('col-2', 'border');
        const divNome = document.createElement('div')
        divNome.innerText = p.nome;
        divNome.classList.add('col-4', 'border');
        const divArtista = document.createElement('div');
        divArtista.innerText = p.artista_id;
        divArtista.classList.add('col-3', 'border');
        const divEditar = document.createElement('div');
        divEditar.innerHTML = '<a id=\'' + p.id + '\' href="javascript:void(0);" onclick="admExibirEdicaoProduto(this.id)">editar</a>';
        divEditar.classList.add('col-2', 'border');
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.appendChild(divId);
        divRow.appendChild(divNome);
        divRow.appendChild(divArtista);
        divRow.appendChild(divEditar);
        cTabela.appendChild(divRow);
    });
}
const admPopularTabelaEditarArtistas = async () => {
    const cTabela = document.getElementById('cont-tabela-gerenciar-artista');
    cTabela.innerHTML = '';
    const todosArtistas = await getTodosArtistas();
    todosArtistas.forEach((a) => {
        const divId = document.createElement('div');
        divId.innerText = a.id;
        divId.classList.add('col-2', 'border');
        const divNome = document.createElement('div')
        divNome.innerText = a.nome;
        divNome.classList.add('col-8', 'border');
        const divEditar = document.createElement('div');
        divEditar.innerHTML = '<a id=\'' + a.id + '\' href="javascript:void(0);" onclick="admExibirEdicaoArtista(this.id)">editar</a>';
        divEditar.classList.add('col-2', 'border');
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.appendChild(divId);
        divRow.appendChild(divNome);
        divRow.appendChild(divEditar);
        cTabela.appendChild(divRow);
    });
}
