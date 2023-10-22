const getCategoriasSelecionadas = () => {
    const categoriasSelecionadas = [];
    const botoesCategorias = document.getElementsByClassName("categoria");
    for (let categoria of botoesCategorias) {
        if (categoria.ariaPressed == "true") {
            categoriasSelecionadas.push(categoria.id);
        }
    }
    return categoriasSelecionadas;
}

const getProdutos = async (id, categoria, pagina, ordem, texto) => {
    const url = 'http://127.0.0.1:8080/produto'
    const response = await fetch(url);
    let produtos = [];
    if (response.ok) {
        produtos = await response.json();
    }
    return produtos;
}

const getProdutosAtivos = async () => {
    const url = 'http://127.0.0.1:8080/produto/ativos'
    const response = await fetch(url);
    let produtos = [];
    if (response.ok) {
        produtos = await response.json();
    }
    return produtos;
}
const getTodosArtistas = async () => {
    const url = 'http://127.0.0.1:8080/artista/listar'
    const response = await fetch(url);
    artistas = [];
    if (response.ok) {
        artistas = await response.json();
    }
    return artistas;
}
const getArtistaById = async (id) => {
    const url = 'http://127.0.0.1:8080/artista/' + id;
    const response = await fetch(url);
    let artista = null;
    if (response.ok) {
        artista = await response.json();
    }
    return artista;
}
const admRemoverArtista = async (id) => {
    const url = 'http://127.0.0.1:8080/artista/' + id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    if (response.ok) {
        location.reload();
        alert('Artista removido com sucesso!');
    } else {
        alert('Erro ao remover artista!');
    }
}
const admSalvarArtistaBanco = async (artista) => {
    const url = 'http://127.0.0.1:8080/artista/' + artista.id;
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(artista),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        location.reload();
        alert('Artista atualizado com sucesso!');
    } else {
        alert('Erro ao atualizar artista!');
    }

}

const admCadastrarArtistaBanco = async (artista, imgArtista) => {
    const url = 'http://127.0.0.1:8080/artista/salvar';
    artista.data_cadastro = new Date();
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(artista),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            artistaCadastrado = await response.json();
            const formData = new FormData();
            formData.append('file', imgArtista);
            formData.append('id', artistaCadastrado.id);
            const urlImg = 'http://127.0.0.1:8080/artista/upload';
            const responseImg = await fetch(urlImg, {
                method: 'POST',
                body: formData
            });
            console.log(responseImg)
        }
    } catch (error) {
        console.log(error);
    }

}