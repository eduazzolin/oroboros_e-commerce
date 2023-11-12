package com.oroboros.oroboros.controller;

import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.model.Usuario;
import com.oroboros.oroboros.model.Venda;
import com.oroboros.oroboros.repository.UsuarioRepository;
import com.oroboros.oroboros.repository.VendaRepository;
import com.oroboros.oroboros.util.EntidadeException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/venda")
public class VendaController {

   @Autowired
   private VendaRepository vr;

   @Autowired
   private UsuarioRepository ur;
   @Autowired
   UsuarioController uc = new UsuarioController();

   /***
    * Retorna todas as vendas
    * @param request
    * @return List<Venda>
    */
   @GetMapping("/listar")
   public List<Venda> getAllVendas(HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return null;
      } else {
         List<Venda> vendas = vr.findAll();
         vendas.sort((v1, v2) -> v2.getDt_venda().compareTo(v1.getDt_venda()));
         return vendas;
      }
   }

   /***
    * Retorna uma venda pelo id
    * @param id
    * @param request
    * @return Venda
    */
   @GetMapping("/{id}")
   public Venda getVenda(@PathVariable Long id, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return null;
      } else {
         return vr.findById(id).orElseThrow(() -> new EntidadeException("Venda", id));
      }
   }

   /***
    * Edita os dados de uma venda
    * @param v venda
    * @param request
    * @return ResponseEntity<?>
    */
   @PutMapping("/put")
   public ResponseEntity<?> putVenda(@RequestBody Venda v, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return ResponseEntity.status(401).body("Não autorizado");
      } else {
         return ResponseEntity.ok(vr.save(v));
      }
   }

   /***
    * Cadastra uma nova venda no banco para o usuário logado
    * dt_venda é gerado automaticamente
    * status é gerado automaticamente como "Aguardando pagamento"
    * @param p produto
    * @param request
    * @return ResponseEntity<?>
    */
   @PostMapping("/novaVenda")
   public ResponseEntity<?> postVenda(@RequestBody Produto p, HttpServletRequest request) {

      // verificar usuario
      if (request.getSession().getAttribute("usuarioLogado") == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      }
      Long id = Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString());
      String token = request.getSession().getAttribute("token").toString();
      Usuario userSessao = ur.findByIdAndToken(id, token);
      if (userSessao == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      }

      Venda v = new Venda();
      v.setDt_venda(LocalDateTime.now());
      v.setComprador(userSessao);
      v.setProduto(p);
      v.setStatus("Aguardando pagamento");
      v.setValor(p.getPreco());

      return ResponseEntity.ok(vr.save(v));
   }

   /***
    * Retorna todas as vendas de um usuário
    * @param request
    * @return List<Venda>
    */
   @GetMapping("/minhasCompras")
   public List<Venda> getVendasUsuario(HttpServletRequest request) {
      if (request.getSession().getAttribute("usuarioLogado") == null || request.getSession().getAttribute("token") == null) {
         return null;
      }
      Usuario u = ur.findByIdAndToken(Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString()), request.getSession().getAttribute("token").toString());
      if (u == null) {
         return null;
      } else {
         if (u.getDt_exp_token().isBefore(LocalDateTime.now())) {
            return null;
         } else {
            List<Venda> vendas = vr.findByComprador(u);
            vendas.sort((v1, v2) -> v2.getDt_venda().compareTo(v1.getDt_venda()));
            for (Venda v : vendas) {
               v.setComprador(null);
            }
            return vendas;
         }
      }
   }


}
