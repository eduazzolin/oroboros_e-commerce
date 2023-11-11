const getProdutos = async (id, categoria, pagina, ordem, texto) => {
    const url = 'http://127.0.0.1:8080/produto'
    const response = await fetch(url);
    let produtos = [];
    if (response.ok) {
        produtos = await response.json();
    }
    return produtos;
}

const putProduto = async (produto) => {
    const url = 'http://127.0.0.1:8080/produto/' + produto.id;
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(produto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert('Produto atualizado com sucesso!');
    } else {
        alert('Erro ao atualizar produto!');
    }
}

const getProdutosAtivos = async (query) => {
    if (query == null) {
        query = {}
    }
    const url = 'http://127.0.0.1:8080/produto/ativos'
    let response;
    let produtos = [];
    try {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            produtos = await response.json();
        }
        return produtos;
    } catch (error) {
        return produtos;
    }

}
const getProdutosCount = async (query) => {
    if (query == null) {
        query = {}
    }
    const url = 'http://127.0.0.1:8080/produto/count';
    let count = 0;
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            count = await response.json();
        }
        return count;
    } catch (error) {
        return count;
    }
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
const getTodasVendas = async () => {
    const url = 'http://127.0.0.1:8080/venda/listar'
    const response = await fetch(url);
    let vendas = [];
    if (response.ok) {
        vendas = await response.json();
    }
    return vendas;
}
const getTodosProdutos = async () => {
    const url = 'http://127.0.0.1:8080/produto/listar'
    const response = await fetch(url);
    let produtos = [];
    if (response.ok) {
        produtos = await response.json();
    }
    return produtos;
}
const getArtistaById = async (id) => {
    const url = 'http://127.0.0.1:8080/artista/' + id;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
}

const getVendaById = async (id) => {
    const url = 'http://127.0.0.1:8080/venda/' + id;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
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
    if (response.ok) {
        return await response.json();
    }
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


const admPutVenda = async (venda) => {
    const url = 'http://127.0.0.1:8080/venda/put';
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(venda),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert('Artista atualizado com sucesso!');
    } else {
        alert('Erro ao atualizar artista!');
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

const cadastrarUsuarioPersistence = async (usuario) => {
    const url = 'http://127.0.0.1:8080/usuario/cadastrar';
    usuario.senha = await stringToHash(usuario.senha);
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const fazerLoginPersistence = async (usuario) => {
    const url = 'http://127.0.0.1:8080/usuario/login';
    usuario.senha = await stringToHash(usuario.senha);
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const postLogout = async () => {
    const url = 'http://127.0.0.1:8080/usuario/logout';
    const response = await fetch(url, {
        method: 'POST'
    });
    if (response.ok) {
        // remover token e usuario da sessão
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioLogado');
        window.location.href = '/';
    } else {
        alert('Erro ao realizar logout!');
    }
}

async function stringToHash(inputString) {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


const getDadosLimitadosUsuarioLogado = async () => {
    const url = 'http://127.0.0.1:8080/usuario/u';
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
}

const checkLoginFrontEnd = async () => {
    const url = 'http://127.0.0.1:8080/usuario/check';
    const response = await fetch(url);
    return response.ok;
}
const checkAdminFrontEnd = async () => {
    const url = 'http://127.0.0.1:8080/usuario/checkRole';
    const response = await fetch(url);
    const role = await response.json();
    return role;
}
const getComprasUsuarioLogado = async () => {
    const url = 'http://127.0.0.1:8080/venda/minhasCompras';
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
}

const putUsuario = async (usuario) => {
    const url = 'http://127.0.0.1:8080/usuario/edit';
    if (usuario.senha != null && usuario.senha !== '') {
        usuario.senha = await stringToHash(usuario.senha);
    }
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert('Usuário atualizado com sucesso!');
    } else {
        alert('Erro ao atualizar usuário!');
    }
}


const comprarProduto = async (produto) => {
    const url = 'http://127.0.0.1:8080/venda/novaVenda';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log(response);
        const vendaCadastrada = await response.json();

        const telefone = '5521999999999';

        const nomeProduto = encodeURI(vendaCadastrada.produto.nome);
        const artista = await getArtistaById(vendaCadastrada.produto.artista_id);
        const nomeArtista = encodeURI(artista.nome);
        const valorVenda = encodeURI(vendaCadastrada.valor);
        const urlRedirecionamento = encodeURI('http://127.0.0.1:8080/r?c=' + vendaCadastrada.id);
        const mensagem = `Ol%C3%A1,%20gostaria%20de%20comprar%20o%20item:%0A-------------------------------%0AProduto:%20${nomeProduto}%0AArtista:%20${nomeArtista}%0AValor:%20R$%20${valorVenda}%0AC%C3%B3digo:%20${urlRedirecionamento}%20%0A-------------------------------`
        const urlZap = `https://api.whatsapp.com/send?phone=5523333333333&text=${mensagem}`;
        window.location.href = urlZap;


    } else {
        alert('Erro ao realizar compra!');
    }
}