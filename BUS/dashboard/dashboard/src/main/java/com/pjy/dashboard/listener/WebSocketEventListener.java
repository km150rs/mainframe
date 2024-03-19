package com.pjy.dashboard.listener;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.messaging.support.NativeMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.pjy.dashboard.service.ChatService;

import lombok.extern.slf4j.Slf4j;



/**
 * @author zacconding
 * @Date 2018-08-22
 * @GitHub : https://github.com/zacscoding
 */
@Slf4j
//@Component
public class WebSocketEventListener {


    @Autowired
    private ChatService chatService;

    @SuppressWarnings("unchecked")
	@EventListener
    // SessionConnectedEvent 를 등록. handleWebSocketConnectListener는 암거나
	/*
	 * websocket 사용시 호출됨
	ChatManager.connectAndSubscribe = function () {
    if (ChatManager.stompClient == null || !ChatManager.stompClient.connected) {
        var socket = new SockJS('/chat-websocket');
        ChatManager.stompClient = Stomp.over(socket);
        ChatManager.stompClient.debug =  f => f;
        ChatManager.stompClient.connect({chatRoomId: 'SISE'+ChatManager.clientIp,clientIp:ChatManager.clientIp}, function (frame) {	          
        //ChatManager.stompClient.connect({chatRoomId: "compliance",clientIp:ChatManager.clientIp}, function (frame) {
          console.log('Connected: ' + frame);
          ChatManager.subscribeMessage();
        });
      } else {
        ChatManager.subscribeMessage();
      }
    };
    */
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
    	MessageHeaderAccessor accessor = NativeMessageHeaderAccessor.getAccessor(event.getMessage(), SimpMessageHeaderAccessor.class);
        GenericMessage<?> generic = (GenericMessage<?>) accessor.getHeader("simpConnectMessage");
        @SuppressWarnings("unchecked")
		Map<String, Object> nativeHeaders = (Map<String, Object>) generic.getHeaders().get("nativeHeaders");
        @SuppressWarnings("unchecked")
		String chatRoomId = ((List<String>) nativeHeaders.get("chatRoomId")).get(0);
        String clientIp = "";
        if (!chatRoomId.equals("status") && !chatRoomId.equals("compliance") ) {
        	clientIp = ((List<String>) nativeHeaders.get("clientIp")).get(0);
        }
        String sessionId = (String) generic.getHeaders().get("simpSessionId");


        log.info("[Connected] room id : {} | websocket session id : {} | clientIp : {}", chatRoomId, sessionId,clientIp);

        if (chatRoomId.contains("SISE")) {
        	chatService.connectUser(chatRoomId, sessionId);        	
        } else {
        	chatService.connectUser(chatRoomId+"/"+clientIp, sessionId);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        
        log.info("[Disconnected] websocket session id : {} {}", sessionId, username);

       	chatService.disconnectUser(sessionId);
    }
}