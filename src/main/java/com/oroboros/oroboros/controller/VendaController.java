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

   @GetMapping("/listar")
   public List<Venda> getVendas() {
      List<Venda> vendas = vr.findAll();
      vendas.sort((v1, v2) -> v2.getDt_venda().compareTo(v1.getDt_venda()));
      return vendas;
   }
   @GetMapping("/{id}")
   public Venda getVendaById(@PathVariable Long id) {
     return vr.findById(id).orElseThrow(() -> new EntidadeException("Venda", id));
   }

   @PutMapping("/put")
   public ResponseEntity<?> putVenda(@RequestBody Venda v) {
      return ResponseEntity.ok(vr.save(v));
   }

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
}
