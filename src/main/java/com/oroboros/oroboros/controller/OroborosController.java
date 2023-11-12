package com.oroboros.oroboros.controller;

import com.oroboros.oroboros.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OroborosController {

   @Autowired
   private UsuarioRepository ur;
   @Autowired
   UsuarioController uc = new UsuarioController();

   /***
    * Retorna a página inicial
    * @return ModelAndView
    */
   @RequestMapping("/")
   public ModelAndView home() {
      ModelAndView mv;
      mv = new ModelAndView();
      mv.setViewName("index.html");
      return mv;
   }

   /***
    * Retorna a página de produto
    * @return ModelAndView
    */
   @RequestMapping("/prod")
   public ModelAndView prod() {
      ModelAndView mv = new ModelAndView();
      mv.setViewName("prod.html");
      return mv;
   }

   /***
    * Se o usuário for admin, direciona diretamente para a pagina de edição da venda,
    * senão para a página de usuário.
    * @param request
    * @param c id da compra
    * @return ModelAndView
    */
   @RequestMapping("/r")
   public ModelAndView redirect(HttpServletRequest request, @RequestParam String c) {
      if (uc.getCheckAdmin(request)) {
         ModelAndView mv = new ModelAndView();
         mv.setViewName("admin?c=" + c);
         return mv;
      } else {
         return userpage(request);
      }
   }

   /***
    * Retorna a página de usuário se estiver logado
    * senão, a página de login
    * @param request
    * @return ModelAndView
    */
   @RequestMapping("/userpage")
   public ModelAndView userpage(HttpServletRequest request) {
      if (uc.getCheckUsuario(request).getBody() == "Autorizado") {
         ModelAndView mv = new ModelAndView();
         mv.setViewName("userpage.html");
         return mv;
      } else {
         return login();
      }
   }

   /***
    * Retorna a página de login
    * @return ModelAndView
    */
   @RequestMapping("/login")
   public ModelAndView login() {
      ModelAndView mv = new ModelAndView();
      mv.setViewName("login_cadastro.html");
      return mv;
   }

   /***
    * Retorna a página de admin se estiver logado
    * senão, a página de login
    * @param request
    * @return ModelAndView
    */
   @RequestMapping("/admin")
   public ModelAndView admin(HttpServletRequest request) {
      if (uc.getCheckAdmin(request)) {
         ModelAndView mv = new ModelAndView();
         mv.setViewName("admin.html");
         return mv;
      } else {
         return login();
      }
   }


}
