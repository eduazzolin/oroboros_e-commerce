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

