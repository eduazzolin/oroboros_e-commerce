package com.oroboros.oroboros.controller;

import com.oroboros.oroboros.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OroborosController {

   @Autowired
   private UsuarioRepository ur;
   @Autowired
   UsuarioController uc = new UsuarioController();

   @RequestMapping("/")
   public ModelAndView home() {
      ModelAndView mv;
      mv = new ModelAndView();
      mv.setViewName("index.html");
      return mv;
   }

   @RequestMapping("/prod")
   public ModelAndView prod() {
      ModelAndView mv = new ModelAndView();
      mv.setViewName("prod.html");
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
