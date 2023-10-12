


let produtos;

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
    produtos = [];
    if (response.ok) {
        produtos = await response.json();
    }
    return produtos;
}


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

document.addEventListener("DOMContentLoaded", function () {
    popularTelaInicialComProdutos();
});