function dataFormatada(data) {
    var dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear(),
        horaF = (data.getHours().toString().length == 1) ? '0' + data.getHours() : data.getHours(),
        minF = (data.getMinutes().toString().length == 1) ? '0' + data.getMinutes() : data.getMinutes(),
        segF = (data.getSeconds().toString().length == 1) ? '0' + data.getSeconds() : data.getSeconds();
    return diaF + "/" + mesF + "/" + anoF + ' ' + horaF + ':' + minF + ':' + segF;
}


function validarTelaCadastroProduto(nomeProduto, descricaoProduto, precoProduto, imgProduto, categoriaProdutoId, artistaProdutoId) {
    const formInfo = document.getElementById('info-fim-form-cad-prod');
    if (nomeProduto.value == '' || nomeProduto.length > 255) {
        formInfo.innerText = 'Nome do produto inválido!';
        return false;
    }
    if (descricaoProduto.value == '' || descricaoProduto.length > 500) {
        formInfo.innerText = 'Descrição do produto inválida!';
        return false;
    }
    if (precoProduto.value == '' || precoProduto.value < 0) {
        formInfo.innerText = 'Preço do produto inválido!';
        return false;
    }
    if (imgProduto.files[0] == null) {
        formInfo.innerText = 'Insira uma imagem do produto!';
        return false;
    }
    if (categoriaProdutoId == '') {
        formInfo.innerText = 'Selecione uma categoria!';
        return false;
    }
    if (artistaProdutoId == '') {
        formInfo.innerText = 'Selecione um artista!';
        return false;
    }
    formInfo.innerText = '';
    return true;
}

/* Funções de CADASTRO */
const admCadastrarProduto = async () => {

    const imgProduto = document.getElementById('input-imagem-produto');
    const nomeProduto = document.getElementById('inputNomeCadastrarProduto');
    const descricaoProduto = document.getElementById('inputDescricaoCadastrarProduto');
    const precoProduto = document.getElementById('inputPrecoCadastrarProduto');
    const ativoProduto = document.getElementById('inputAtivoCadastrarProduto').checked;
    const categoriaProdutoId = document.getElementById('inputCategoriaCadastrarProduto').value;
    const artistaProdutoId = document.getElementById('adm-seletor-artista-cadastrar-produto').value;

    /* validações */
    if (validarTelaCadastroProduto(nomeProduto, descricaoProduto, precoProduto, imgProduto, categoriaProdutoId, artistaProdutoId)) {
        const produto = {
            nome: nomeProduto.value,
            descricao: descricaoProduto.value,
            preco: precoProduto.value,
            categoria: categoriaProdutoId,
            artista_id: artistaProdutoId,
            ativo: ativoProduto
        }
        alert(await postProdutoPersistence(produto, imgProduto.files));
        location.reload();
    }
}

function validarTelaCadastroArtista(eNomeArtista, eDescricaoArtista, eCpfCnpjArtista, eImgArtista) {
    const formInfo = document.getElementById('info-fim-form-cad-art');
    if (eNomeArtista.value == '' || eNomeArtista.value.length > 255) {
        formInfo.innerText = 'Nome do artista inválido!';
        return false;
    }
    if (eDescricaoArtista.value == '' || eDescricaoArtista.value.length > 400) {
        formInfo.innerText = 'Descrição do artista inválida!';
        return false;
    }
    if (eCpfCnpjArtista.value == '' || eCpfCnpjArtista.value.length > 14 || eCpfCnpjArtista.value.length < 11 || isNaN(eCpfCnpjArtista.value)) {
        formInfo.innerText = 'CPF/CNPJ do artista inválido! Insira somente números.';
        return false;
    }
    if (eImgArtista.files[0] == null) {
        formInfo.innerText = 'Insira uma imagem do artista!';
        return false;
    }
    formInfo.innerText = '';
    return true;
}

const admCadastrarArtista = async (id) => {
    const eNomeArtista = document.getElementById('nome-artista-cadastrar');
    const eDescricaoArtista = document.getElementById('descricao-artista-cadastrar');
    const eCpfCnpjArtista = document.getElementById('cpf-cnpj-artista-cadastrar');
    const eImgArtista = document.getElementById('img-artista-cadastrar');


    if (validarTelaCadastroArtista(eNomeArtista, eDescricaoArtista, eCpfCnpjArtista, eImgArtista)) {
        const artista = {
            nome: eNomeArtista.value,
            descricao: eDescricaoArtista.value,
            cpf_cnpj: eCpfCnpjArtista.value,
        }
        const imgArtista = eImgArtista.files[0];
        alert(await postArtista(artista, imgArtista));
        location.reload();
    }


}

function validarTelaCadastroUsuario(eNome, eEmail, eCpfCnpj, eSenha) {
    const infoForm = document.getElementById('info-form-cad');
    if (eNome.value == '' || eNome.value.length > 255) {
        infoForm.innerText = 'Nome inválido!';
        return false;
    }
    if (eEmail.value == '' || eEmail.value.length > 255) {
        infoForm.innerText = 'Email inválido!';
        return false;
    }
    if (eCpfCnpj.value == '' || eCpfCnpj.value.length > 14 || eCpfCnpj.value.length < 11 || isNaN(eCpfCnpj.value)) {
        infoForm.innerText = 'CPF/CNPJ inválido! Insira somente números.';
        return false;
    }
    if (eSenha.value == '' || eSenha.value.length > 255) {
        infoForm.innerText = 'Senha inválida!';
        return false;
    }
    infoForm.innerText = '';
    return true;
}

const cadastrarUsuario = async () => {
    const eNome = document.getElementById("inputNomeCadUser");
    const eEmail = document.getElementById("inputEmailCadUser");
    const eCpfCnpj = document.getElementById("inputCpfCnpjCadUser");
    const eSenha = document.getElementById("inputSenhaCadUser");
    const infoForm = document.getElementById('info-form-cad');

    if (validarTelaCadastroUsuario(eNome, eEmail, eCpfCnpj, eSenha)) {
        const usuario = {
            nome: eNome.value,
            email: eEmail.value,
            cpf_cnpj: eCpfCnpj.value,
            senha: eSenha.value
        }

        const response = await postUsuario(usuario);

        if (response.ok) {
            alert('Bem vindo!');
            window.location.href = '/';
        } else {
            infoForm.innerText = await response.text();
        }
    }
}

const fazerLogin = async () => {
    const eEmail = document.getElementById("inputEmailLoginUser");
    const eSenha = document.getElementById("inputSenhaLoginUser");
    const infoForm = document.getElementById("info-form-login")

    if (eEmail.value == '' || eSenha.value == '') {
        infoForm.innerText = 'Preencha todos os campos!';
    } else {
        const usuario = {
            email: eEmail.value,
            senha: eSenha.value
        }
        const response = await postLogin(usuario);
        if (response.ok) {
            window.location.href = '/';
        } else {
            infoForm.innerText = await response.text();
        }
    }


}

function validarTelaEdicaoArtista(eNomeArtistaSelecionado, eDescricaoArtistaSelecionado, eCpfCnpjArtistaSelecionado) {
    infoForm = document.getElementById('info-fim-form-edit-art');
    if (eNomeArtistaSelecionado.value == '' || eNomeArtistaSelecionado.value.length > 255) {
        infoForm.innerText = 'Nome do artista inválido!';
        return false;
    }
    if (eDescricaoArtistaSelecionado.value == '' || eDescricaoArtistaSelecionado.value.length > 400) {
        infoForm.innerText = 'Descrição do artista inválida!';
        return false;
    }
    if (eCpfCnpjArtistaSelecionado.value == '' || eCpfCnpjArtistaSelecionado.value.length > 14 || eCpfCnpjArtistaSelecionado.value.length < 11 || isNaN(eCpfCnpjArtistaSelecionado.value)) {
        infoForm.innerText = 'CPF/CNPJ do artista inválido! Insira somente números.';
        return false;
    }
    infoForm.innerText = '';
    return true;
}

/* Funções de EDIÇÃO */
const admSalvarEdicaoArtista = async (id) => {
    const eNomeArtistaSelecionado = document.getElementById('nome-artista-selecionado-editar');
    const eDescricaoArtistaSelecionado = document.getElementById('descricao-artista-selecionado-editar');
    const eCpfCnpjArtistaSelecionado = document.getElementById('cpf-cnpj-artista-selecionado-editar');
    const eImgArtistaSelecionado = document.getElementById('img-artista-selecionado-editar');
    const eInputImagemArtistaEditar = document.getElementById('input-imagem-artista-editar');

    if (validarTelaEdicaoArtista(eNomeArtistaSelecionado, eDescricaoArtistaSelecionado, eCpfCnpjArtistaSelecionado)) {
        if (eInputImagemArtistaEditar.files[0] == null) {
            const blobImagem = eImgArtistaSelecionado.src.split(',')[1];
            const artista = {
                id: id,
                nome: eNomeArtistaSelecionado.value,
                descricao: eDescricaoArtistaSelecionado.value,
                cpf_cnpj: eCpfCnpjArtistaSelecionado.value,
                imagem: blobImagem
            }
            await putArtista(artista);
        } else {
            const artista = {
                id: id,
                nome: eNomeArtistaSelecionado.value,
                descricao: eDescricaoArtistaSelecionado.value,
                cpf_cnpj: eCpfCnpjArtistaSelecionado.value,
            }
            const imgArtista = eInputImagemArtistaEditar.files[0];
            await putArtista(artista, imgArtista);
        }
        location.reload();
    }
}

function validarTelaEdicaoVenda(evalor, eAnotacao) {
    const infoForm = document.getElementById('info-fim-form-edit-venda');
    if (evalor.value == '' || evalor.value < 0) {
        infoForm.innerText = 'Valor inválido!';
        return false;
    }
    if (eAnotacao.value.length > 1000) {
        infoForm.innerText = 'Anotação inválida!';
        return false;
    }
    infoForm.innerText = '';
    return true;
}

const admSalvarEdicaoVenda = async (id) => {

    const evalor = document.getElementById('adm-venda-preco-editar');
    const eStatus = document.getElementById('adm-venda-status-editar');
    const ePagamento = document.getElementById('adm-venda-pagamento-editar');
    const eAnotacao = document.getElementById('adm-venda-anotacao-editar');

    if (validarTelaEdicaoVenda(evalor, eAnotacao)) {
        const venda = await getVendaById(id);
        venda.valor = evalor.value;
        if (eStatus.value != 0) {
            venda.status = eStatus.value;
        }
        if (ePagamento.value != 0) {
            venda.forma_pagamento = ePagamento.value;
        }
        venda.comentario = eAnotacao.value;

        if (venda.status != 'Aguardando pagamento') {
            venda.produto.ativo = false;
            // produto.active = false;
            await putProduto(venda.produto)
        }
        const reponse = await putVenda(venda);
        if (reponse.ok) {
            alert('Venda editada com sucesso!');
        } else {
            alert('Erro ao editar venda!');
        }
        location.reload();
    }

}


function validarTelaEdicaoProduto(eNomeProdutoSelecionado, eDescricaoAProdutoSelecionado, ePrecoProdutoSelecionado, eCategoriaProdutoSelecionado) {
    const infoForm = document.getElementById('info-fim-form-edit-prod');
    if (eNomeProdutoSelecionado.value == '' || eNomeProdutoSelecionado.value.length > 255) {
        infoForm.innerText = 'Nome do produto inválido!';
        return false;
    }
    if (eDescricaoAProdutoSelecionado.value == '' || eDescricaoAProdutoSelecionado.value.length > 500) {
        infoForm.innerText = 'Descrição do produto inválida!';
        return false;
    }
    if (ePrecoProdutoSelecionado.value == '' || ePrecoProdutoSelecionado.value < 0) {
        infoForm.innerText = 'Preço do produto inválido!';
        return false;
    }
    if (eCategoriaProdutoSelecionado == '') {
        infoForm.innerText = 'Selecione uma categoria!';
        return false;
    }
    infoForm.innerText = '';
    return true;
}

const admSalvarEdicaoProduto = async (id) => {


    const eImgProdutoSelecionado = document.getElementById('img-produto-selecionado-editar');
    const eNomeProdutoSelecionado = document.getElementById('nome-produto-selecionado-editar');
    const eDescricaoAProdutoSelecionado = document.getElementById('descricao-produto-selecionado-editar');
    const ePrecoProdutoSelecionado = document.getElementById('preco-produto-selecionado-editar');
    const eCategoriaProdutoSelecionado = document.getElementById('categoria-produto-selecionado-editar').value;
    const eAtivoProdutoSelecionado = document.getElementById('ativo-produto-selecionado-editar').checked;

    const produtoOriginal = await getProdutoById(id);
    const imagensOriginais = await getImagensProdutoById(id);

    if (validarTelaEdicaoProduto(eNomeProdutoSelecionado, eDescricaoAProdutoSelecionado, ePrecoProdutoSelecionado, eCategoriaProdutoSelecionado)) {
        const produto = {
            id: id,
            nome: eNomeProdutoSelecionado.value,
            descricao: eDescricaoAProdutoSelecionado.value,
            preco: ePrecoProdutoSelecionado.value,
            categoria: eCategoriaProdutoSelecionado,
            artista_id: produtoOriginal.artista_id,
            ativo: eAtivoProdutoSelecionado,
            data_cadastro: produtoOriginal.data_cadastro
        }

        if (eImgProdutoSelecionado.files[0] == null) {
            alert(await putProdutoPutImg(produto, imagensOriginais));
        } else {
            alert(await putProdutoPutImg(produto, eImgProdutoSelecionado.files));
        }
        location.reload();
    }

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

    if (eArtistaSelecionado !== '') {
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


const admPopularTabelaEditarProdutos = async () => {
    const cTabela = document.getElementById('cont-tabela-gerenciar-prod');
    cTabela.innerHTML = '' +
        '<div class="row">' +
        '<div class="col-2 border"><strong>Id</strong></div>' +
        '<div class="col-5 border"><strong>Nome</strong></div>' +
        '<div class="col-3 border"><strong>Artista</strong></div>' +
        '<div class="col-2 border"><strong>Editar</strong></div>' +
        '</div>';
    const produtosAtivos = await getTodosProdutos();
    for (const p of produtosAtivos) {
        const artista = await getArtistaById(p.artista_id);
        const divId = document.createElement('div');
        divId.innerText = p.id;
        divId.classList.add('col-2', 'border');
        const divNome = document.createElement('div')
        divNome.innerText = p.nome;
        divNome.classList.add('col-5', 'border');
        const divArtista = document.createElement('div');
        divArtista.innerText = artista.nome;
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
    }
}
const admPopularTabelaEditarArtistas = async () => {
    const cTabela = document.getElementById('cont-tabela-gerenciar-artista');
    cTabela.innerHTML = '' +
        '<div class="row">' +
        '<div class="col-2 border"><strong>Id</strong></div>' +
        '<div class="col-8 border"><strong>Nome</strong></div>' +
        '<div class="col-2 border"><strong>Editar</strong></div>' +
        '</div>';
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

const admExibirEdicaoVenda = async (id) => {
    const venda = await getVendaById(id);
    const artistaDaVenda = await getArtistaById(venda.produto.artista_id);
    const eRowVendaSelecionado = document.getElementById('row-venda-selecionada-editar');
    const imgProduto = await getImagensProdutoById(venda.produto.id);
    const btSalvar = document.getElementById('bt-salvar-edicao-artista');

    let htmlEdicaoVenda = `
    <div class="col-lg-4 col-12 mt-lg-1 mt-3" id="coluna-adm-venda-comprador">
            <label for="div-adm-comprador" class="sr-only">Comprador</label>
            <div class="border rounded p-1" id="div-adm-comprador">
              <div id="adm-comprador-nome"><strong>Nome: </strong>${venda.comprador.nome}</div>
              <div id="adm-comprador-id"><strong>Id: </strong>${venda.comprador.id}</div>
              <div id="adm-comprador-doc"><strong>CPF/CNPJ: </strong>${venda.comprador.cpf_cnpj}</div>
              <div id="adm-comprador-data_cad"><strong>Data cadastro: </strong>${venda.comprador.dt_cadastro}</div>
            </div>
          </div>

          <div class="col-lg-4 col-12 mt-lg-1 mt-3" id="coluna-adm-venda-produto">
            <label for="div-adm-venda-produto" class="sr-only">Produto</label>
            <div class="border rounded p-1" id="div-adm-venda-produto">
              <img id="adm-venda-produto-img" src="data:image/png;base64,${imgProduto[0].dados}" alt='' height="150px"
                   class="img-fluid mb-1 rounded"></img>
              <div id="adm-venda-produto-nome"><strong>Nome: </strong>${venda.produto.nome}</div>
              <div id="adm-venda-produto-id"><strong>Id: </strong>${venda.produto.id}</div>
              <div id="adm-venda-produto-preco"><strong>Preço: </strong>R$ ${parseFloat(venda.valor).toFixed(2)}</div>
            </div>
          </div>

          <div class="col-lg-4 col-12 mt-lg-1 mt-3" id="coluna-adm-venda-artista">
            <label for="div-adm-venda-artista" class="sr-only">Artista</label>
            <div class="border rounded p-1" id="div-adm-venda-artista">
              <img id="adm-venda-artista-img" src="data:image/png;base64,${artistaDaVenda.imagem}" alt='' height="150px"
                   class="img-fluid mb-1 rounded"></img>
              <div id="adm-venda-artista-nome"><strong>Nome: </strong>${artistaDaVenda.nome}</div>
              <div id="adm-venda-artista-id"><strong>Id: </strong>${artistaDaVenda.id}</div>
              <div id="adm-venda-artista-doc"><strong>CPF/CNPJ: </strong>${artistaDaVenda.cpf_cnpj}</div>
            </div>
          </div>
          
          <form class="form-editar-venda">

            <label for="adm-venda-preco-editar" class="sr-only">Preço</label>
            <input type="number" id="adm-venda-preco-editar" class="form-control  input-login"
                   placeholder="R$ 0,00" required="" value="${parseFloat(venda.valor).toFixed(2)}">

            <label for="adm-venda-status-editar" class="sr-only">Status [atual: ${venda.status}]</label>
            <select class="form-select input-login" id="adm-venda-status-editar" aria-label="Default select example">
              <option value="0" selected>Selecione um status</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Devolvido">Devolvido</option>
              <option value="Aguardando pagamento">Aguardando pagamento</option>
              <option value="Pago">Pago</option>
              <option value="Entregue">Entregue</option>
            </select>

            <label for="adm-venda-pagamento-editar" class="sr-only">Forma de pagamento [atual: ${venda.forma_pagamento}]</label>
            <select class="form-select input-login" id="adm-venda-pagamento-editar" aria-label="Default select example">
              <option value="0" selected>Selecione uma forma de pagamento</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Boleto">Boleto</option>
              <option value="Pix">Pix</option>
              <option value="Outro">Outro</option>
            </select>

            <label for="adm-venda-anotacao-editar" class="sr-only">Anotação</label>
                  <textarea class="form-control input-login" id="adm-venda-anotacao-editar" rows="4"
                            placeholder="Anotações">${venda.comentario}</textarea>

            <div class="text-end mt-5 d-flex bt-fim-form">
                    <div class="me-5 info-fim-form" id="info-fim-form-edit-venda"></div>
              <button id="bt-salvar-edicao-venda" _id="${venda.id}" class="btn btn-lg btn-danger btn-block login-centralizado "
                      type="submit">Salvar
              </button>
            </div>
          </form>
    `;

    eRowVendaSelecionado.innerHTML = htmlEdicaoVenda;
    if (eRowVendaSelecionado.classList.contains('d-none')) {
        eRowVendaSelecionado.classList.remove('d-none');
    }

    document.getElementById('bt-salvar-edicao-venda').addEventListener('click', (event) => {
        event.preventDefault();
        const botaoSalvar = event.target;
        admSalvarEdicaoVenda(botaoSalvar.getAttribute('_id'));
    });

}


const admPopularTabelaEditarVendas = async () => {
    const cTabela = document.getElementById('cont-tabela-gerenciar-vendas');
    cTabela.innerHTML = '' +
        '<div class="row">' +
        '<div class="col-2 border"><strong>Id</strong></div>' +
        '<div class="col-3 border"><strong>Data</strong></div>' +
        '<div class="col-3 border"><strong>Comprador</strong></div>' +
        '<div class="col-3 border"><strong>Status</strong></div>' +
        '<div class="col-1 border"><strong>Editar</strong></div>' +
        '</div>';
    const todasVendas = await getTodasVendas();
    todasVendas.forEach((v) => {
        let linha = `
            <div class="row">
              <div class="col-2 border">${v.id}</div>
              <div class="col-3 border">${dataFormatada(new Date(v.dt_venda))}</div>
              <div class="col-3 border">${v.comprador.nome}</div>
              <div class="col-3 border">${v.status}</div>
              <div class="col-1 border"><a _id="${v.id}" href="javascript:void(0);" onClick="admExibirEdicaoVenda(${v.id})">editar</a></div>
            </div>
        `;
        cTabela.insertAdjacentHTML('beforeend', linha);
    });
}

function validarTelaEdicaoUsuario(eNome, eEmail, eCpfCnpj, eSenha) {
    const infoForm = document.getElementById('info-form-edit-user');
    if (eNome.value == '' || eNome.value.length > 255) {
        infoForm.innerText = 'Nome inválido!';
        return false;
    }
    if (eEmail.value == '' || eEmail.value.length > 255) {
        infoForm.innerText = 'Email inválido!';
        return false;
    }
    if (eCpfCnpj.value == '' || eCpfCnpj.value.length > 14 || eCpfCnpj.value.length < 11 || isNaN(eCpfCnpj.value)) {
        infoForm.innerText = 'CPF/CNPJ inválido! Insira somente números.';
        return false;
    }
    if (eSenha.value.length > 255) {
        infoForm.innerText = 'Senha inválida!';
        return false;
    }
    infoForm.innerText = '';
    return true;
}

const editarUsuario = async () => {
    const eNome = document.getElementById("up-inputNomeEditar");
    const eEmail = document.getElementById("up-inputEmailEditar");
    const eCpfCnpj = document.getElementById("up-inputCPFCNPJEditar");
    const eSenha = document.getElementById("up-inputPasswordEditar");

    if (validarTelaEdicaoUsuario(eNome, eEmail, eCpfCnpj, eSenha)){
        const usuario = {
            nome: eNome.value,
            email: eEmail.value,
            cpf_cnpj: eCpfCnpj.value,
            senha: eSenha.value
        }
        await putUsuario(usuario);
    }
}


