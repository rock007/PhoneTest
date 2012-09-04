package mx.spring.test.controller;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.spring.test.comm.App;
import mx.spring.test.data.entity.UserEntity;
import mx.spring.test.data.privider.UserProvider;
import mx.spring.test.model.JsonMsg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;


/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	 @Autowired
	 private 	UserProvider userProvider;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Locale locale, Model model) {
		
		
		return "redirect:login";
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home( Model model) {
		
		return "home";
	}
	
	@RequestMapping(value = "/login",method=RequestMethod.GET)
	public String login(ModelMap model) {
				
		return "login";
	}
	
	@RequestMapping(value = "/login",method=RequestMethod.POST)
	public @ResponseBody JsonMsg login(@RequestParam("username") String userName ,@RequestParam("pwd") String pwd
			,HttpServletResponse response, final HttpServletRequest request,HttpSession session,
			   ModelMap model) {
		
		List<UserEntity> list=	userProvider.getUsers(userName);
		
		if(list.size()==0){			
						
			return new JsonMsg(false,"用户名不存在！");
		}
		
		if(pwd.equals(list.get(0).getPassWord())){
			
			session.setAttribute(App.CON_SESSION_LOGIN, list.get(0));
			
			return new JsonMsg(true,JSON.toJSONString(list.get(0)));
			
		}		
		return new JsonMsg(false,"用户名密码错误！");
		
	}
	
	@RequestMapping(value="/logoff")
	public String logoff(HttpSession session ){
		
		session.removeAttribute(App.CON_SESSION_LOGIN);
		
		return "login";
	}
	
}
