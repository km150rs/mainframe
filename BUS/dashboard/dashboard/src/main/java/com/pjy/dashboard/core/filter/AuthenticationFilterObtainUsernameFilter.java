package com.pjy.dashboard.core.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.pjy.dashboard.listener.SessionListener;

public class AuthenticationFilterObtainUsernameFilter extends UsernamePasswordAuthenticationFilter
{
    private String myField;



    // 사용자가 입력할 확률이 거의 없는 구분자를 사용한다 

   private final String delimiter = ":===:";


   public String getMyField() { return myField; }

   public void setMyField(String myField) { this.myField = myField; }





   // obtainUsername 메서드 (사용자명을 반환하는 메서드)

   @Override

   protected String obtainUsername(HttpServletRequest request) {

       String username = request.getParameter(getUsernameParameter());



         // 로그인 폼에서 선언한 파라미터 명으로 request

       String myField = request.getParameter("companyNo");

         

       // UserDetailService는 사용자명 + 구분자 + 추가 입력 필드를 사용자명으로 입력받게 된다 

       String combinedUsername = username + delimiter + myField;

       setMyField(myField);

       System.out.println("Combined username = " + combinedUsername);

       return combinedUsername;

   }


   @Override

   protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,

           Authentication authResult) throws IOException, ServletException {

       

       // 인증 성공 시에 참조 

       System.out.println("successfulAuthentication myField = " + myField);

       setAuthenticationSuccessHandler(new SimpleUrlAuthenticationSuccessHandler("/"));
       SessionListener.getInstance().setSession(request, authResult.getName());
       super.successfulAuthentication(request, response, chain, authResult);

   }


   @Override

   protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,

           AuthenticationException failed) throws IOException, ServletException {


       // 인증 실패 시에 참조 

       System.out.println("unsuccessfulAuthentication myField = " + myField);

       setAuthenticationFailureHandler(new SimpleUrlAuthenticationFailureHandler("/error2"));

       super.unsuccessfulAuthentication(request, response, failed);

   }

}