package com.pjy.dashboard.interceptor;

//import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pjy.dashboard.core.common.MtrProperties;
import com.pjy.dashboard.core.domain.security.PrincipalDetails;

//import com.pjy.dashboard.common.MtrProperties;

import lombok.extern.slf4j.Slf4j;
/*
 * 인터셉터란? 
 * 클라이언트의 요청이 Controller로 가기 전에 중간에 요청을 가로채서 검사하는 모듈입니다. 
 * 예를 들어 클라이언트의 요청이 들어왔는데, 로그인을 하지 않아 Session이 생성되지 않았다면 
 * Interceptor가 체크를 하고 로그인 페이지로 돌려보내주게 됩니다.
 * 
 * 
 * https://elfinlas.github.io/2017/12/28/SpringBootInterceptor/
 * Spring 또는 Spring Boot 프레임워크로 웹 어플리케이션을 개발하다 보면 아래와 같은 요구사항이 생기게 됩니다.

특정 url 진입 시 로그인이 된(인가된) 사용자가 접근을 해야 함
특정 url 진입 시 Jwt와 같은 토큰을 검사해야 함
특정 url의 경우 계정의 권한에 따라 접근을 막아야 함 (물론 이 부분은 view단에서 처리할 수도 있습니다.)
위 요구사항의 특징은 특정 url 진입 시 어떤 작업을 수행해야 하는 것 입니다.
이름의 의미와 같이 무언가를 진행할 때 특정 작업을 수행하는 것이 인터셉터입니다.
Java 웹 프로그래밍에서는 이런 작업을 하는 기술로는 Servlet Filter, Interceptor, AOP가 있습니다.

 */
@Slf4j
@Component
public class LoggerInterceptor extends HandlerInterceptorAdapter {
    @Autowired
    private MtrProperties properties;
	/*	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Interceptor > preHandle");
        if(hasSessionInAccount(request.getSession())) { return true; }//세션에 계정 정보가 존재하는 경우
        else {
            try { response.sendRedirect("/users/login/nosession"); }
            catch (IOException ie ) {} //만약 리다이렉션 도중 에러가 난 경우
            return false;
    } //세션 정보가 존재하지 않는 경우
	 */    
	
	//controller로 보내기 전 이벤트 작동(false - controller로 요청을 안함)
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//log.info("Interceptor");

		if (request.getRequestURI().contains("expired"))
			 return super.preHandle(request, response, handler);
		if (request.getRequestURI().contains("error2"))
			 return super.preHandle(request, response, handler);
		
		if (request.getRequestURI().equals("/CTINotify"))
			return true;

		if (request.getRequestURI().contains("proxy"))
			 return super.preHandle(request, response, handler);

		if (request.getRequestURI().contains(".css"))
			return true;
		if (request.getRequestURI().contains(".js"))
			return true;
		
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Object object = auth.getPrincipal();

		if (object instanceof PrincipalDetails) {
			return super.preHandle(request, response, handler);
		}

		
		
		if (auth == null)
			return super.preHandle(request, response, handler);
		//log.info("{}",auth.getAuthorities()); 
		if(auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) { 
			//log.info("관리자"); 
		//} else if(auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ANONYMOUS"))) { 
		} else if(auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_MEMBER"))) { 
			//log.info("사용자"); 
		} else {
			log.info("============================== START ==============================");
			log.info(" Class       \t:  " + handler.getClass());
			log.info(" Request URI \t:  " + request.getRequestURI());
			log.info(" Request addr\t:  " + request.getRemoteAddr());
			log.info(" Servlet URI \t:  " + request.getServletPath());	
			response.sendRedirect("/login2");  
			return false;
			//return super.preHandle(request, response, handler);
		}
		//UserCustomVo user = (UserCustomVo) auth.getPrincipal();
		//log.info(user.toString());
		//log.info(user.getUser_ip());
		
		/*
		String auth_ip = null;
		String strAuthCheck = null;
		String sql = null;
		try {
			strAuthCheck = properties.getString("mtr.auth.check");
			auth_ip = properties.getString("mtr.auth.ip");
	    } catch (Exception e) {
			log.error("properties error: " + e.getMessage());	    	
	    }
		if (strAuthCheck.equals("true") == true && auth_ip.indexOf(request.getRemoteAddr()) < 0) {
			
			log.info("============================== START ==============================");
			log.info(" Class       \t:  " + handler.getClass());
			log.info(" Request URI \t:  " + request.getRequestURI());
			log.info(" Request addr\t:  " + request.getRemoteAddr());
			log.info(" Servlet URI \t:  " + request.getServletPath());
			
			Enumeration<String> paramNames = request.getParameterNames();
			
			while (paramNames.hasMoreElements()) {
				String key = (String) paramNames.nextElement();  
				String value = request.getParameter(key);
				log.info("# RequestParameter: " + key + "=" + value + "");
			}
			log.info("==================================================================== ");
			if(isAjaxRequest(request)){
                //response.sendRedirect("/loginError");  
                response.sendError(400);
            }else{
                //response.sendRedirect("/loginError");
            	response.sendError(400);
            }
            return false;
		}
		*/
		return super.preHandle(request, response, handler);
	}
	
	//controller 처리 이후 이벤트 작동
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		//log.info("================================ END ================================");
	}
	
	//view 처리 이후 이벤트 작동
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		//log.info("================================ END ================================");
	}
	
    private boolean isAjaxRequest(HttpServletRequest req) {
    	log.info(req.toString());
        String header = req.getHeader("AJAX");
        if ("true".equals(header)){
         return true;
        }else{
         return false;
        }
    }


	
}