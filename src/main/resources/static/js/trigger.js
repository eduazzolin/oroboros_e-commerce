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
document.getElementById('bt-remover-artista').addEventListener('click', (event) => {
    event.preventDefault();
    const botaoRemover = event.target;
    admRemoverArtista(botaoRemover.getAttribute('_id'));
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
    const eComboBox = document.getElementById('inputCategoriaCadastrarProduto');
    const eComboBoxEditar = document.getElementById('categoria-produto-selecionado-editar');
    const categorias = await getTodasCategorias();
    for (let c of categorias) {
        const option = document.createElement('option');
        option.setAttribute('value', c.id);
        option.innerHTML = c.nome;
        eComboBox.appendChild(option);
        eComboBoxEditar.appendChild(option);
    }
}

admPopularComboBoxArtistas();
admPopularComboBoxCategorias();