package com.pjy.dashboard.listener;

import java.util.Enumeration;
import java.util.Hashtable;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.pjy.dashboard.core.util.UserBeanUtils;
import com.pjy.dashboard.service.ChatService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@WebListener
public class SessionListener implements HttpSessionListener  {
	
	@Value("${server.servlet.session.timeout}")
	private int sessionTime;

    public static SessionListener sessionListener = null;
    private static Hashtable loginSessionList = new Hashtable();

    /**
     * 싱글톤 생성
     * @return
     */
    public static synchronized SessionListener getInstance() {
        if(sessionListener == null) {
            sessionListener = new SessionListener();
        }
        return sessionListener;
    }

    /**
     * session.setAttribute 실행 되는 순간 같은 sessionId 일경우 1회만 실행
     * @param httpSessionEvent
     */
    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {
        log.info("sessionCreated -> {}", httpSessionEvent.getSession().getAttribute("userId"));
        // 여기선 interval을 줘도 안먹음. securityConfig.에서 적용해야함
    	if (httpSessionEvent.getSession().getAttribute("userId") != null) {
    		httpSessionEvent.getSession().setMaxInactiveInterval(sessionTime);
    	}
    }

    /**
     * session 이 소멸되는 시점에 실행, 기본 단위는 초(1분 미만은 설정할 수 없음)
     * @param httpSessionEvent
     */
    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        log.info("sessionDestroyed 실행");
        HttpSession session = httpSessionEvent.getSession();

        String userId = (String) session.getAttribute("userId");
  //      log.info("sessionDestroyed id = {}",userId);


        if(userId != null){
            //로그아웃 유저 삭제
            synchronized(loginSessionList){
                loginSessionList.remove(httpSessionEvent.getSession().getId());
            }

        	this.updateUserCloseTime(userId);
        	////ChatService chatService = (ChatService) UserBeanUtils.getBean("chatService");
        	////chatService.sessionDestroyed(userId);
            currentSessionList();
        }

    }

    /**
     * 현제 HashTable에 담겨 있는 유저 리스트, 즉 session list
     */
    private void currentSessionList(){
        Enumeration elements = loginSessionList.elements();
        log.info("currentSessionUserList ->  {}",elements.hasMoreElements());
        while (elements.hasMoreElements()){
            log.info("currentSessionUserList -> userId {} ", (String)elements.nextElement());
            //log.info("currentSessionUserList -> sessionId {} ", session.getId());
            //log.info("currentSessionUserList -> hashtable SessionList {} ", loginSessionList.get(session.getId()));
        }
    }

    /**
     * session 연장 
     * @param request
     * @param userid
     */
    public void setSession(HttpServletRequest request, String userid){
        log.info("setSession 실행");

        HttpSession session = request.getSession();
        session.setAttribute("userId", userid);
        //session.setMaxInactiveInterval(3000);
        
        startAutoUpdate(session,userid);
    }
    /**
     * 사용자 autoupdate thread 실행
     * @param session
     * @param userid
     */
    public void startAutoUpdate(HttpSession session, String userid){
        if (!this.isUsing(userid)) {
	        //HashMap에 Login에 성공한 유저 담기
	        synchronized(loginSessionList){
	            loginSessionList.put(session.getId(), userid);
	        }
	        ////ChatService chatService = (ChatService) UserBeanUtils.getBean("chatService");
	        ////chatService.siseAutoUpdateThread(userid);
        }
    }

    /**
     * session 삭제
     * 세션이 remove 되면 destroyed 함수 실행
     * @param request
     */
    public void removeSession(HttpServletRequest request){
        log.info("removeSession 실행");

        HttpSession session = request.getSession();
        String userId = (String)session.getAttribute("userId");

        session.removeAttribute("userId");
        session.invalidate();

        if(userId != null){
            this.updateUserCloseTime(userId);
        }
    }

    /**
     * 유저 나간 시간 업데이트
     * @param userId
     */
    private void updateUserCloseTime(String userId) {
        log.info("updateUserCloseTime {} ", userId);
        //호출부에서 NULL 검사
        //업데이트 로직
    }

    /*
     * 해당 아이디의 동시 사용을 막기위해서 
     * 이미 사용중인 아이디인지를 확인한다.
     */
    public boolean isUsing(String userId){
        return loginSessionList.containsValue(userId);
    }
     

     
    /**
     * 현재 로그인한 유저가 이미 존재 하는지 확인
     * @param request
     * @param loginUserId
     * @return boolean
     */
    public boolean isLoginUser(HttpServletRequest request, String loginUserId){
        Enumeration elements = loginSessionList.elements();
        HttpSession session = null;
        while (elements.hasMoreElements()){
            session = (HttpSession)elements.nextElement();
            String userId = (String)session.getAttribute("userId");
            if(loginUserId.equals(userId) && (!session.getId().equals(request.getSession().getId()))){
                return true;
            }
        }
        return false;
    }
}
