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
const getTodasCategorias = async () => {
    const url = 'http://127.0.0.1:8080/categoria/listar'
    const response = await fetch(url);
    categorias = [];
    if (response.ok) {
        categorias = await response.json();
    }
    return categorias;
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
const getImagensProdutoById = async (id) => {
    const url = 'http://127.0.0.1:8080/imgprod/prodid/' + id;
    const response = await fetch(url);
    let imagens = [];
    if (response.ok) {
        imagens = await response.json();
    }
    return imagens;
}
const getCategoriaById = async (id) => {
    const url = 'http://127.0.0.1:8080/categoria/' + id;
    const response = await fetch(url);
    let categoria = null;
    if (response.ok) {
        categoria = await response.json();
    }
    return categoria;
}
const getProdutoById = async (id) => {
    const url = 'http://127.0.0.1:8080/produto/' + id;
    const response = await fetch(url);
    let produto = null;
    if (response.ok) {
        produto = await response.json();
    }
    return produto;
}
const admRemoverArtista = async (id) => {
    const url = 'http://127.0.0.1:8080/artista/remover/' + id;
    const response = await fetch(url, {
        method: 'PUT'
    });
    if (response.ok) {
        alert('Artista removido com sucesso!');
    } else {
        alert('Erro ao remover artista!');
    }
    location.reload();
}
const admRemoverProduto = async (id) => {
    const url = 'http://127.0.0.1:8080/produto/remover/' + id;
    const response = await fetch(url, {
        method: 'PUT'
    });
    if (response.ok) {
        alert('Produto removido com sucesso!');
    } else {
        alert('Erro ao remover produto!');
    }
    location.reload();
}
const admSalvarArtistaBanco = async (artista, imgArtista) => {
    const url = 'http://127.0.0.1:8080/artista/' + artista.id;
    let response = null;
    if (imgArtista == null) {
        response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(artista),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        const formData = new FormData();
        formData.append('image', imgArtista);
        formData.append('id', artista.id);
        const urlImg = 'http://127.0.0.1:8080/artista/upload';
        response = await fetch(urlImg, {
            method: 'PUT',
            body: formData
        });
    }
    if (response.ok) {
        alert('Artista atualizado com sucesso!');
    } else {
        alert('Erro ao atualizar artista!');
    }

}

const admCadastrarArtistaBanco = async (artista, imgArtista) => {
    const url = 'http://127.0.0.1:8080/artista/salvar';
    artista.data_cadastro = new Date();
    artistaJson = JSON.stringify(artista);
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
            formData.append('image', imgArtista);
            formData.append('id', artistaCadastrado.id);
            const urlImg = 'http://127.0.0.1:8080/artista/upload';
            const responseImg = await fetch(urlImg, {
                method: 'PUT',
                body: formData
            });
            return "Artista cadastrado com sucesso!"
        }
    } catch (error) {
        return "Erro ao cadastrar artista!"
    }

}

const admCadastrarProdutoPersistence = async (produto, images) => {
    const url = 'http://127.0.0.1:8080/produto/salvar';
    produto.data_cadastro = new Date();
    produto.categoria = await getCategoriaById(produto.categoria);
    try {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(produto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            for (let image of images) {
                const responseImg = await uploadImagemProduto(image, data.id);
                if (!responseImg.ok) {
                    return "Erro ao cadastrar produto!"
                }
            }
            return "Produto cadastrado com sucesso!"
        }
    } catch (error) {
        return "Erro ao cadastrar produto!"
    }
}
const admSalvarProdutoPersistence = async (produto, images) => {
    const url = 'http://127.0.0.1:8080/produto/' + produto.id;
    produto.categoria = await getCategoriaById(produto.categoria);
    try {
        response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(produto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            await deleteImagensProduto(produto.id);
            const data = await response.json();
            if (images instanceof FileList) {
                for (let image of images) {
                    const responseImg = await uploadImagemProduto(image, data.id);
                    if (!responseImg.ok) {
                        return "Erro ao cadastrar produto!"
                    }
                }
            } else {
                for (let image of images) {
                    const imgProd = {
                        dados: image.dados,
                    }
                    const responseImg = await uploadUpdateImagemProduto(imgProd, produto.id);
                    if (!responseImg.ok) {
                        return "Erro ao cadastrar produto!"
                    }
                }
            }
            return "Produto cadastrado com sucesso!"
        }
    } catch (error) {
        return "Erro ao cadastrar produto!"
    }
}
const deleteImagensProduto = async (id) => {
    const url = 'http://127.0.0.1:8080/imgprod/deletebyprod/' + id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
}

const uploadUpdateImagemProduto = async (image, id) => {
    const url = 'http://127.0.0.1:8080/imgprod/upload/' + id;
    try {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(image),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return "Erro ao cadastrar produto!"
    }
    return response;
}

const uploadImagemProduto = async (image, id) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);
    const urlImg = 'http://127.0.0.1:8080/imgprod/upload';
    return responseImg = await fetch(urlImg, {
        method: 'PUT',
        body: formData
    });

}
