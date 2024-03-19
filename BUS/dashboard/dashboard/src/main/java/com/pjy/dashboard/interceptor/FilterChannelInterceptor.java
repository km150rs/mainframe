package com.pjy.dashboard.interceptor;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.pjy.dashboard.core.domain.security.UserCustomVo;

/*
  https://imbf.github.io/spring/2020/06/29/Spring-Security-with-JWT.html
  
  
  Security Filter Chain은 스프링에서 보안과 관련된 여러 Security Filter List를 갖고 있는 객체로 이를 순회하면서 필터링을 실시한다.
  	대략 30개 이상의 필터 존재
  
  
  Client가 어플리케이션에 요청을 보내면, Servlet Filter에 의해서 Security Filter로 Security 작업이 위임되고 여러 Security Filter 중에서 UsernamePasswordAuthenticationFilter(Username and Password Authentication 방식에서 사용하는 AuthenticationFilter)에서 인증을 처리한다.

AuthenticationFilter(UsernamePasswordAuthenticationFilter인데 지금부터 AuthenticationFilter라고 부름)는 Servlet 요청 객체(HttpServletRequest)에서 username과 password를 추출해 UsernameAuthenticationToken(이하 인증 객체)을 생성한다.

AuthenticationFilter는 AuthenticationManager(구현체 : ProviderManager)에게 인증 객체를 전달한다.

ProviderManager는 인증을 위해 AuthenticationProvider에게 인증 객체를 전달한다.

AuthenticationProvider는 전달받은 인증 객체의 정보(일반적으로 사용자 아이디)를 UserDetailsService에 넘겨준다.

UserDetailsService는 전달 받은 사용자 정보를 통해 DB에서 알맞는 사용자를 찾고 이를 기반으로 UserDetails객체를 만듭니다.

사용자 정보와 일치하는 UserDetails객체를 AuthenticationProvider에 전달합니다.

AuthenticationProvider은 전달받은 UserDetails를 인증해 성공하면 ProviderManager에게 권한(Authorities)을 담은 검증된 인증 객체를 전달합니다.

ProviderManager는 검증된 인증 객체를 AuthenticationFilter에게 전달합니다. (event 기반 으로 전달)

AuthenticationFilter는 검증된 인증 객체를 SecurityContextHolder의 SecurityContext에 저장합니다.

 */

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class FilterChannelInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        System.out.println("full message:" + message);  
        System.out.println("auth:" + headerAccessor.getNativeHeader("Authorization"));
        try {
        	// 아래 둘다 됨.
        	//System.out.println(headerAccessor.getHeader("nativeHeaders").getClass());
        	//Principal princ = (Principal) headerAccessor.getHeader("simpUser");

        	UsernamePasswordAuthenticationToken userToken = (UsernamePasswordAuthenticationToken) headerAccessor.getHeader("simpUser");
            if (!userToken.isAuthenticated()) {
            	return null;
            }

        	UserCustomVo vo = (UserCustomVo)userToken.getPrincipal();
        	
        	//System.out.println(vo.getName());
	        //System.out.println(vo.getEmail());
	        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
	            System.out.println("msg: " + "conne");
	        }
        } catch (Exception e) {
			log.error(e.getMessage());
		}
        

        //throw new MessagingException("no permission! ");
        return message;
    }

	@Override
	public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception ex) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preReceive(MessageChannel channel) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Message<?> postReceive(Message<?> message, MessageChannel channel) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void afterReceiveCompletion(Message<?> message, MessageChannel channel, Exception ex) {
		// TODO Auto-generated method stub
		
	}
}