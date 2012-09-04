package mx.spring.test.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import mx.spring.test.data.entity.UserEntity;
import mx.spring.test.data.privider.UserProvider;
import mx.spring.test.model.JsonData;
import mx.spring.test.model.JsonMsg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;


@Controller
public class UserController 
{
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	 @Autowired
	 private 	UserProvider userProvider;
	
	
	@RequestMapping(value="/users",method=RequestMethod.GET)
	public @ResponseBody JsonData<UserEntity> getUsers(@RequestParam(value="key",required=false) String key){
		
		List<UserEntity> list= userProvider.getUsers(key);
		
		return new JsonData<UserEntity>(list.size(),list);
	}
	@RequestMapping(value="/submitUser",method=RequestMethod.POST)
	public  @ResponseBody JsonMsg submitUser(@ModelAttribute UserEntity m,HttpServletRequest request){
		
		List<UserEntity> list= userProvider.getUsers(m.getUserName());
		
		if(list.size()<=0){
		
			m.setCreateDT(new Date());
			m.setCreateIP(request.getRemoteAddr());
			userProvider.addUser(m);
		}else{
			
			userProvider.updateUser(m);			
		}
		return new JsonMsg(true,"保存用户成功！");
	}
	
	@RequestMapping(value="/deleteUser",method=RequestMethod.POST)
	public  @ResponseBody JsonMsg delUser(@RequestParam String  users){
		
		String list[]=users.split(";");
		
		for(String m:list){
			
			userProvider.removeUser(m);	
		}
		return new JsonMsg(true,"删除用户成功！");
	}
}
