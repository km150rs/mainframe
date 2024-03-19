package com.pjy.dashboard.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.pjy.dashboard.interceptor.FilterChannelInterceptor;

//@Configuration
//@EnableWebSocketMessageBroker
public class WebsocketConfiguration implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
//        config.enableSimpleBroker("/topic/");
//        config.setApplicationDestinationPrefixes("/app");
      config.enableSimpleBroker("/topic/chat");
      config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat-websocket").withSockJS();
//        registry.addEndpoint("/websockethandler").withSockJS();
    }
    
    @Override
    // websocket 인증처리시 filter 처리가능
    public void configureClientInboundChannel(ChannelRegistration registration) {
    	 registration.interceptors(new FilterChannelInterceptor());
    }    
}