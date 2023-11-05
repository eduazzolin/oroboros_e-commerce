package com.oroboros.oroboros.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "venda")
public class Venda {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   @Column(name = "dt_venda")
   private LocalDateTime dt_venda;
   @Column(name = "status")
   private String status;
   @Column(name = "forma_pagamento")
   private String forma_pagamento;
   @Column(name = "valor")
   private Double valor;

   public Double getValor() {
      return valor;
   }

   public void setValor(Double valor) {
      this.valor = valor;
   }

   @Column(name = "comentario", length = 1000)
   private String comentario;
   @ManyToOne
   @JoinColumn(name = "produto_id")
   private Produto produto;
   @ManyToOne
   @JoinColumn(name = "usuario_id")
   private Usuario comprador;

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public LocalDateTime getDt_venda() {
      return dt_venda;
   }

   public void setDt_venda(LocalDateTime dt_venda) {
      this.dt_venda = dt_venda;
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
   }

   public String getForma_pagamento() {
      return forma_pagamento;
   }

   public void setForma_pagamento(String forma_pagamento) {
      this.forma_pagamento = forma_pagamento;
   }

   public String getComentario() {
      return comentario;
   }

   public void setComentario(String comentario) {
      this.comentario = comentario;
   }

   public Produto getProduto() {
      return produto;
   }

   public void setProduto(Produto produto) {
      this.produto = produto;
   }

   public Usuario getComprador() {
      return comprador;
   }

   public void setComprador(Usuario comprador) {
      this.comprador = comprador;
   }

   public Venda(Long id, LocalDateTime dt_venda, String status, String forma_pagamento, Double valor, String comentario, Produto produto, Usuario comprador) {
      this.id = id;
      this.dt_venda = dt_venda;
      this.status = status;
      this.forma_pagamento = forma_pagamento;
      this.valor = valor;
      this.comentario = comentario;
      this.produto = produto;
      this.comprador = comprador;
   }

   public Venda() {
   }

}
