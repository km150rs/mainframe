package com.pjy.dashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
  @Component
  /* 호출안됨 */
  public class CustomAuthenticationProvider implements AuthenticationProvider{
    
      //@Autowired
      private MemberService memberService;
        
      
      private PasswordEncoder passwordEncoder;
        
      public CustomAuthenticationProvider(MemberService customUserService, PasswordEncoder passwordEncoder2) {
          this.memberService = customUserService;
          this.passwordEncoder = passwordEncoder2;
      }      
      @Override
      public Authentication authenticate(Authentication authentication) throws AuthenticationException {
            
          UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication; 
          String username = authToken.getName();
          String password = (String) authToken.getCredentials();
            
            
          UserDetails user = memberService.loadUserByUsername(authToken.getName());
            log.info("CustomAuthenticationProvider={},{}", password, user.getPassword());
          //입력 받은 비밀번호와 DB에 저장된 비밀번호를 비교하여 인증 처리를 한다.
          if(!this.passwordEncoder.matches(password, user.getPassword())) {
              throw new BadCredentialsException("password error");
          }
            
          return new UsernamePasswordAuthenticationToken(username, password, user.getAuthorities());
      }
    
      @Override
      public boolean supports(Class<?> authentication) {
    	  return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
          //return authentication.equals(UsernamePasswordAuthenticationToken.class);
      }
  }