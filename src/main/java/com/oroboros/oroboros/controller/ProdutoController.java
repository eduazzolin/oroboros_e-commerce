package com.oroboros.oroboros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository pr;

    @GetMapping
    public List<Produto> get(
        @RequestParam(name = "id", required = false) Long id,
            @RequestParam(name = "categoria", required = false) String categoria,
            @RequestParam(name = "pagina", required = false) Integer pagina,
            @RequestParam(name = "ordem", required = false) String ordem,
            @RequestParam(name = "texto", required = false) String texto) {
        
        return pr.findAll();
    }

    @GetMapping("/ativos")
    public List<Produto> getProdutosAtivos() {
        return pr.findByAtivo(true);
    }

    @PostMapping
    public Produto salvar(Produto p) {
        return pr.save(p);
    }

    @DeleteMapping("/{id}") // assim fica produto/6 por exemplo
    public Produto excluir(@PathVariable Long id) {
        Produto p = this.get(id, null, null, null, null).get(0);
        pr.deleteById(id);
        return p;
    }

}
