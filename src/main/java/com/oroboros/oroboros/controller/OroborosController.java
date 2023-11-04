package com.oroboros.oroboros.controller;

import com.oroboros.oroboros.model.Usuario;
import com.oroboros.oroboros.repository.UsuarioRepository;
import com.oroboros.oroboros.util.EntidadeException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OroborosController {

   @Autowired
   private UsuarioRepository ur;
   @Autowired
   UsuarioController uc = new UsuarioController();

   /*
         ResponseEntity<String> r = uc.check(request);
      if (r.getStatusCodeValue() == 200) {
         Long id = Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString());
         Usuario usuarioLogado = ur.findById(id).orElseThrow(() -> new EntidadeException("Usuario", id));
         if (usuarioLogado.getRole().equals("ADMIN")) {
            mv = new ModelAndView();
            mv.setViewName("admin.html");
            return mv;
         }
      }
    */


   @RequestMapping("/")
   public ModelAndView home() {
      ModelAndView mv;
      mv = new ModelAndView();
      mv.setViewName("index.html");
      return mv;
   }

   @RequestMapping("/userpage")
   public ModelAndView userpage() {
      ModelAndView mv = new ModelAndView();
      mv.setViewName("userpage.html");
      return mv;
   }

   @RequestMapping("/login")
   public ModelAndView login() {
      ModelAndView mv = new ModelAndView();
      mv.setViewName("login_cadastro.html");
      return mv;
   }

   @RequestMapping("/admin")
   public ModelAndView admin(HttpServletRequest request) {
      if (uc.checkAdmin(request)){
         ModelAndView mv = new ModelAndView();
         mv.setViewName("admin.html");
         return mv;
      } else {
         return login();
      }
   }

   public ModelAndView adminPage() {
      ModelAndView mv = new ModelAndView();
      mv.setViewName("admin.html");
      return mv;
   }

}
