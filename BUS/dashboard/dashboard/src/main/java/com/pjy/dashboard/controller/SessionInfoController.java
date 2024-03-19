package com.pjy.dashboard.controller;

import java.util.Date;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class SessionInfoController {
    @GetMapping("/session-info")
    public String sessionInfo(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null){
            return "세션이 없습니다.";
        }
        log.info("sessionId={}", session.toString());


        log.info("sessionId={}", session.getId());
        log.info("maxInactiveInterval={}", session.getMaxInactiveInterval());
        log.info("creationTime={}", new Date(session.getCreationTime()));
        log.info("lastAccessTjme={}",new Date(session.getLastAccessedTime()));
        log.info("isNew={}", session.isNew());
        
        
        Enumeration<?> attrName = session.getAttributeNames(); 
        while (attrName.hasMoreElements()) { 
        	String attr = (String) attrName.nextElement(); 
        	System.out.println(session.getAttribute(attr));

        	
        	log.info(session.getAttribute(attr).toString()); 
        }

        return "세션 출력";
    }
}