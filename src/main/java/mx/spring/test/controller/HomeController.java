package mx.spring.test.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
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
	public @ResponseBody JsonMsg login(@RequestParam("username") String userName ,@RequestParam("pwd") String pwd,@RequestParam("randCode") String code
			,HttpServletResponse response, final HttpServletRequest request,HttpSession session,
			   ModelMap model) {
		if(!session.getAttribute("verify").equals(code)){
			
			return new JsonMsg(false,"��֤�벻��ȷ��");
		}
		
		List<UserEntity> list=	userProvider.getUsers(userName);
		
		if(list.size()==0){			
						
			return new JsonMsg(false,"�û��������ڣ�");
		}
		
		if(pwd.equals(list.get(0).getPassWord())){
			
			session.setAttribute(App.CON_SESSION_LOGIN, list.get(0));
			
			return new JsonMsg(true,JSON.toJSONString(list.get(0)));
			
		}		
		return new JsonMsg(false,"�û����������");
		
	}
	
	@RequestMapping(value="/logoff")
	public String logoff(HttpSession session ){
		
		session.removeAttribute(App.CON_SESSION_LOGIN);
		
		return "login";
	}
	
	@RequestMapping("/verifycode.do")
	public void verifycode(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		HttpSession session = request.getSession(true);
		response.setContentType("image/jpeg");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 240);
		int width = 60, height = 22;
		ServletOutputStream out = response.getOutputStream();
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB); // ����ͼƬ��С��
		Graphics gra = image.getGraphics();

		Random random = new Random();

		gra.setColor(getRandColor(200, 250)); // ���ñ���ɫ
		gra.fillRect(0, 0, width, height);

		gra.setColor(Color.black); // ��������ɫ
		System.setProperty("java.awt.headless", "true");
		gra.setFont(new Font("Times New Roman", Font.PLAIN, 18));

		// �������155�������ߣ�ʹͼ���е���֤�벻�ױ���������̽�⵽
		gra.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			gra.drawLine(x, y, x + xl, y + yl);
		}

		// ȡ�����������֤��(4λ����)
		String sRand = "";
		for (int i = 0; i < 4; i++) {
			char rand = getChar();
			// Thread.sleep(new Random().nextInt(10)+10);//�����Կ����ַ����ظ�����
			sRand += rand;
			// ����֤����ʾ��ͼ����
			gra.setColor(new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110))); // ���ú�����������ɫ��ͬ����������Ϊ����̫�ӽ�������ֻ��ֱ������
			gra.drawString("" + rand, 13 * i + 6, 16);
		}

		// JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
		// encoder.encode(image);
		// session.setMaxInactiveInterval(300);
		session.setAttribute("verify", sRand);
		ImageIO.write(image, "JPEG", out);
		out.flush();
		out.close();
	}

	private char getChar() {
		// Random random = new Random();
		char ch = '0';
		LinkedList<String> ls = new LinkedList<String>();
		for (int i = 0; i < 10; i++) {// 0-9
			ls.add(String.valueOf(48 + i));
		}
		int index = (int) (Math.random() * ls.size());
		if (index > (ls.size() - 1)) {
			index = ls.size() - 1;
		}
		ch = (char) Integer.parseInt(String.valueOf(ls.get(index)));
		return ch;
	}

	private Color getRandColor(int fc, int bc) { // ������Χ��������ɫ
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}
	
}
