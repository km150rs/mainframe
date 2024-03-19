package com.pjy.dashboard.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.core.domain.security.UserCustomVo;
import com.pjy.dashboard.core.error.exception.ApiSessionExpiredException;
import com.pjy.dashboard.core.util.ServletUtil;
import com.pjy.dashboard.domain.ChatMessage;
import com.pjy.dashboard.domain.ChatRequest;
import com.pjy.dashboard.domain.ChatResponse;
import com.pjy.dashboard.domain.ChatResponse.ResponseResult;
import com.pjy.dashboard.domain.MessageType;
import com.pjy.dashboard.koscomVo.kospi.D0_MAST;
import com.pjy.dashboard.listener.SessionListener;
import com.pjy.dashboard.service.ChatService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
/**
 * @author zacconding
 * @Date 2018-08-20
 * @GitHub : https://github.com/zacscoding
 */
//@RestController
public class ChatController {

    //private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ChatService chatService;
    
    // tag :: async
    @GetMapping("/join")
    @ResponseBody
    public DeferredResult<ChatResponse> joinRequest(@AuthenticationPrincipal UserCustomVo userVo) {
    	String sessionId = userVo.getUsername();
    		
    	// 1번째
        //String sessionId = ServletUtil.getSession().getId();

    	// 2번째
    	//Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    	//String sessionId = ahAuthentication.getName();

    	// 3번째
    	//Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
    	//UserCustomVo userVo = (UserCustomVo)principal;
    	//String sessionId = userVo.getUsername();
        
        log.info(">> Join request. session id : {} {}", sessionId ,ServletUtil.getIpAddr());

        final ChatRequest user = new ChatRequest(sessionId,ServletUtil.getIpAddr());
        final DeferredResult<ChatResponse> deferredResult = new DeferredResult<>(null);
        chatService.joinChatRoom(user, deferredResult);
        
        deferredResult.onCompletion(() -> chatService.onCompletion(user));
        deferredResult.onError((throwable) -> chatService.onError(user));
        deferredResult.onTimeout(() -> chatService.onTimeout(user));

        log.info(">> Join request. end : {}", sessionId);

        return deferredResult;
    }


    @GetMapping("/cancel")
    @ResponseBody
    public ResponseEntity<Void> cancelRequest() {
    	Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    	String sessionId = ahAuthentication.getName();

    	//String sessionId = ServletUtil.getSession().getId();
        log.info(">> Cancel request. session id : {}", sessionId);

        final ChatRequest user = new ChatRequest(sessionId);
        chatService.onCancle(user);

        return ResponseEntity.ok().build();
    }

    // -- tag :: async

    // tag :: websocket stomp
    @MessageMapping("/chat.message/{chatRoomId}")
    public void sendMessage(@DestinationVariable("chatRoomId") String chatRoomId, @Payload ChatMessage chatMessage) {
        log.info("Request message. roomd id : {} | chat message : {} | principal : {}", chatRoomId, chatMessage);
        if (!StringUtils.hasText(chatRoomId) || chatMessage == null) {
            return;
        }

        if (chatMessage.getMessageType() == MessageType.CHAT) {
            chatService.sendMessage(chatRoomId, chatMessage);
        }
    }
    @GetMapping("/sise_connect")
    @ResponseBody
    public DeferredResult<ChatResponse> sise_connect(HttpServletRequest request,@AuthenticationPrincipal UserCustomVo userVo) {
    	String userId = userVo.getUsername();

    	SessionListener.getInstance().startAutoUpdate(request.getSession(), userId);

        final ChatRequest req = new ChatRequest(userId,ServletUtil.getIpAddr());
       final DeferredResult<ChatResponse> deferredResult = new DeferredResult<>(null);
        deferredResult.setResult(new ChatResponse(ResponseResult.SUCCESS, userId, req.getSessionId(),req.getClientIp()));
        return deferredResult;
    }

    @RequestMapping("/sise_connect_free")
    @ResponseBody
    public DeferredResult<ChatResponse> sise_connect_free(HttpServletRequest request,@RequestParam("userId") String userId ) {
    	SessionListener.getInstance().startAutoUpdate(request.getSession(), userId);

        final ChatRequest req = new ChatRequest(userId,ServletUtil.getIpAddr());
       final DeferredResult<ChatResponse> deferredResult = new DeferredResult<>(null);
        deferredResult.setResult(new ChatResponse(ResponseResult.SUCCESS, userId, req.getSessionId(),req.getClientIp()));
        return deferredResult;
    }
    
    @RequestMapping("/pjy")
    public String getPjy() throws Exception{
    	D0_MAST d0_mast = new D0_MAST();
    	d0_mast.setData_gb("D0");
    	d0_mast.setInfo_gb("01");
    	d0_mast.setMarket_gb("1");
        ObjectMapper mapper = new ObjectMapper();
        String jsonStr = mapper.writeValueAsString(d0_mast);

        return jsonStr;
    }
    
    
}