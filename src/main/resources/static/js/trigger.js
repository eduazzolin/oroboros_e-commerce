/**
 * evento associado ao click do botao salvar|atualizar fabricante
 */
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

/**
 * popular admin
 */
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