package com.oroboros.oroboros.controller;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.oroboros.oroboros.util.QueryProduto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ProdutoRepository;
import com.oroboros.oroboros.util.EntidadeException;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

   @Autowired
   private ProdutoRepository pr;
   @Autowired
   UsuarioController uc = new UsuarioController();

   /***
    * Retorna todos os produtos ativos de acordo com a query
    * @param query
    * @param request
    * @return List<Produto>
    */
   @PostMapping("/ativos")
   public List<Produto> getProdutoAtivo(@RequestBody QueryProduto query, HttpServletRequest request) {
      Long categoria = query.categoria();
      String texto = query.texto();
      String ordem = query.ordem();
      String direcao = query.direcao();
      String pagina = query.pagina();

      List<Produto> produtos = pr.findByQuery(categoria, texto);
      if (!produtos.isEmpty()) {

         /* ordenação */
         if (ordem != null && direcao != null) {
            Comparator<Produto> comparador = Comparator.comparing(Produto::getNome);
            if (ordem.equals("preco")) {
               comparador = Comparator.comparing(Produto::getPreco);
               if (direcao.equals("desc")) {
                  comparador = comparador.reversed();
               }
            }
            if (ordem.equals("data")) {
               comparador = Comparator.comparing(Produto::getData_cadastro);
               if (direcao.equals("desc")) {
                  comparador = comparador.reversed();
               }
            }
            produtos.sort(comparador);
         }

         /* paginação */
         if (pagina != null) {
            int p = Integer.parseInt(pagina);
            int tamanho = produtos.size();
            int inicio = (p - 1) * 9;
            int fim = inicio + 9;
            if (fim > tamanho) {
               fim = tamanho;
            }
            try {
               produtos = produtos.subList(inicio, fim);
            } catch (Exception e) {
               produtos = Collections.emptyList();
            }
         }

      }
      return produtos;
   }


   /***
    * Retorna um produto pelo id
    * @param id produto
    * @return Produto
    */
   @GetMapping("/{id}")
   public Produto getProduto(@PathVariable Long id) {
      return pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
   }

   /***
    * Retorna a quantidade de produtos de acordo com a query
    * @param query
    * @return Long
    */
   @PostMapping("/count")
   public Long getQuantidadeProduto(@RequestBody QueryProduto query) {
      Long categoria = query.categoria();
      String texto = query.texto();
      return pr.countByQuery(categoria, texto);
   }

   /***
    * Salva um produto
    * @param p produto
    * @param request
    * @return Produto
    */
   @PostMapping("/salvar")
   public Produto postProduto(@RequestBody Produto p, HttpServletRequest request) {
      if (uc.getCheckAdmin(request)) {
         return pr.save(p);
      } else {
         return null;
      }
   }

   /***
    * Retorna todos os produtos
    * @param request
    * @return List<Produto>
    */
   @GetMapping("/listar")
   public List<Produto> getAllProduto(HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return null;
      } else {
         return pr.findByRemoved(false);
      }
   }

   /***
    * Atualiza umm produto
    * @param id produto
    * @param a produto
    * @param request
    * @return ResponseEntity<?>
    */
   @PutMapping("/{id}")
   public ResponseEntity<?> putProduto(@PathVariable Long id, @RequestBody Produto a, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      } else {
         Produto produtoAtual = pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
         if (produtoAtual.getId() != null) {
            a.setId(id);
            produtoAtual = pr.save(a);
         }
         return ResponseEntity.ok(produtoAtual);
      }
   }

   /***
    * Remove logicamente um produto pelo id
    * @param id produto
    * @param request
    * @return ResponseEntity<?>
    */
   @PutMapping("/remover/{id}")
   public ResponseEntity<?> deleteLogicProduto(@PathVariable Long id, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      } else {
         Produto p = pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
         p.setRemoved(true);
         p.setAtivo(false);
         p = pr.save(p);
         return ResponseEntity.ok(p);
      }
   }


}
