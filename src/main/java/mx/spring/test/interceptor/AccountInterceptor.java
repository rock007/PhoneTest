package mx.spring.test.interceptor;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.spring.test.comm.App;
import mx.spring.test.model.JsonMsg;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSON;

public class AccountInterceptor extends HandlerInterceptorAdapter {

    private String passpg;
    
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {


		// 后台session控制
		String[] noFilters =passpg.split(";");
		String uri = request.getRequestURI();
				
		if (uri.indexOf("/resources/") == -1&&!"/PhoneTest/".equals(uri)&&uri.indexOf("/app/") == -1) {
			
			boolean beFilter = true;
			for (String s : noFilters) {
				if (uri.indexOf(s) != -1) {
					beFilter = false;
					break;
				}
			}
						
			if (beFilter) {
				Object obj = request.getSession().getAttribute(
						App.CON_SESSION_LOGIN);
				if (null == obj) {
					
					System.out.println(uri);
					
					// 未登录
					request.setCharacterEncoding("UTF-8");
					response.setCharacterEncoding("UTF-8");
					response.setContentType("text/html;charset=UTF-8");
					
					PrintWriter out = response.getWriter();					
					String msg=JSON.toJSONString(new JsonMsg(false,"页面过期，请重新登录"));
					out.print(msg);
					/**
				     StringBuilder builder = new StringBuilder();  
	                 builder.append("<script type=\"text/javascript\" charset=\"UTF-8\">");  
	                 builder.append("alert(\"页面过期，请重新登录\");");  
	                 builder.append("window.top.location.href=\"/");  
	                 builder.append(App.basePath);  
	                 builder.append("\";</script>");  
	                 out.print(builder.toString());  
					**/
					out.close();
					
			
					
					return false;
				}
			}
		}

		return super.preHandle(request, response, handler);
	}

	public void setPasspg(String passpg) {
		this.passpg = passpg;
	}

}
