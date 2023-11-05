package com.oroboros.oroboros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ProdutoRepository;
import com.oroboros.oroboros.util.EntidadeException;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

   @Autowired
   private ProdutoRepository pr;

   @GetMapping("/ativos")
   public List<Produto> getProdutosAtivos() {
      return pr.findByAtivo(true);
   }

   @GetMapping("/q")
   public List<Produto> getProdutosAtivosQuery(
           @RequestParam(name = "ordem", required = false) String ordem,
           @RequestParam(name = "ordemTipo", required = false) String ordemTipo,
           @RequestParam(name = "categoria", required = false) String categoria,
           @RequestParam(name = "texto", required = false) String texto,
           @RequestParam(name = "pagina", required = false) String pagina) {

      return pr.findByQuery(ordem, ordemTipo, categoria, texto, pagina);
   }


   @GetMapping("/{id}")
   public Produto getProdutoById(@PathVariable Long id) {
      return pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
   }

   @GetMapping("/count")
   public Long getQuantidadeProdutos() {
      return pr.countByAtivo(true);
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


}
