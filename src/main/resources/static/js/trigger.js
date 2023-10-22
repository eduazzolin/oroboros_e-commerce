/**
 * evento associado ao click do botao salvar|atualizar fabricante
 */
document.getElementById('bt-cadastrar-artista-salvar').addEventListener('click', (event) => {
    event.preventDefault();
    //recuperar os dados do formulario
    admCadastrarArtista();
});