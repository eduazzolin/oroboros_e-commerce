package com.oroboros.oroboros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Artista;
import com.oroboros.oroboros.model.Categoria;
import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ProdutoRepository;
import com.oroboros.oroboros.util.EntidadeException;

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

    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable Long id) {
        Produto p = null;
        Optional<Produto> cOptional = pr.findById(id);
        if (cOptional.isPresent()) {
            p = cOptional.get();
        }
        return p;
    }

    @PostMapping("/salvar")
    public Produto salvar(@RequestBody Produto p) {
        return pr.save(p);
    }

    @GetMapping("/listar")
    public List<Produto> listarProdutos() {
        return pr.findByRemoved(false);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualiza(@PathVariable Long id, @RequestBody Produto a) {
        Produto produtoAtual = pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
        if (produtoAtual.getId() != null) {
            a.setId(id);
            produtoAtual = pr.save(a);
        }
        return ResponseEntity.ok(produtoAtual);
    }

    @PutMapping("/remover/{id}")
    public ResponseEntity<?> remocaoLogica(@PathVariable Long id) {
        Produto p = pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
        p.setRemoved(true);
        p.setAtivo(false);
        p = pr.save(p);
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/{id}") // assim fica produto/6 por exemplo
    public Produto excluir(@PathVariable Long id) {
        Produto p = this.get(id, null, null, null, null).get(0);
        pr.deleteById(id);
        return p;
    }

}
