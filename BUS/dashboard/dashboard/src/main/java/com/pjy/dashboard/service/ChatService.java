package com.pjy.dashboard.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.core.util.UserBeanUtils;
import com.pjy.dashboard.domain.ChatMessage;
import com.pjy.dashboard.domain.ChatRequest;
import com.pjy.dashboard.domain.ChatResponse;
import com.pjy.dashboard.domain.MessageType;
import com.pjy.dashboard.domain.MtrErrorLogVo;
import com.pjy.dashboard.domain.ChatResponse.ResponseResult;
import com.pjy.dashboard.koscomVo.kospi.A3;
import com.pjy.dashboard.koscomVo.kospi.B6;
import com.pjy.dashboard.listener.SessionListener;

import lombok.extern.slf4j.Slf4j;



/**
 * @author pjy
 * @Date 2018-08-20
 * @GitHub : 
 */
@Slf4j
//@Service
public class ChatService {
	public static final int MAX_SISE_COUNT = 10000;
    private Map<ChatRequest, DeferredResult<ChatResponse>> waitingUsers;
    private Map<String, String> connectedUsers;
    private ReentrantReadWriteLock lock;

    private String[] siseMemory = new String[MAX_SISE_COUNT];
    private int siseIndex = 0;
    
    private static String uuid = UUID.randomUUID().toString();
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private DynamicSqlService dynamicSqlService; 
    

    @PostConstruct
    private void setUp() {
        this.waitingUsers = new LinkedHashMap<>();
        this.lock = new ReentrantReadWriteLock();
        this.connectedUsers = new ConcurrentHashMap<>();
    }

    public boolean isCountConnectUser() {
		return connectedUsers.size() > 0 ? true : false; 
	}
    
    /* AsyncConfiguration.java
     * 비동기 thread
     */
    
    @Async("asyncThreadPool")
    public void joinChatRoom(ChatRequest request, DeferredResult<ChatResponse> deferredResult) {
        log.info("## Join room request. {}[{}]", Thread.currentThread().getName(), Thread.currentThread().getId());
        if (request == null || deferredResult == null) {
            return;
        }
        log.info("## Join room request. {}", request.toString());

        try {
            lock.writeLock().lock();
            waitingUsers.put(request, deferredResult);
        } finally {
            lock.writeLock().unlock();
            enterChatRoom(request, deferredResult);
            //establishChatRoom();
        }
        log.info("## Join room . {}[{}]", Thread.currentThread().getName(), Thread.currentThread().getId());
    }

    @Async("asyncThreadPool")
    public void siseAutoUpdateThread(String userId) {
    	log.info("# sise thread start : [{}]",userId);
        
		String newThreadKey = userId.toUpperCase();

		// 관심종목 list를 H2 db에서 읽어 string으로 저장.
		DynamicSqlService dSqlService = (DynamicSqlService) UserBeanUtils.getBean("dynamicSqlService");
		if (dSqlService == null) {
			log.info("dynamicSqlService is null");
			return;
		}
        ObjectMapper mapper = new ObjectMapper();
        String itemList = null;

        try {
			//itemList = mapper.writeValueAsString(dSqlService.getDataBySql("H2", "SELECT distinct(item_cd) item_cd FROM SISE_FAVORATES_INFO WHERE user_id = '" + newThreadKey + "'"));
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return;
		}
        log.info("# sise threaditemList = {} ",itemList);
        // 시세(체결,호가) 데이타중 관심종목에 해당되면 client에 전송한다.
        int nCurrentSiseIndex = getSiseIndex();
		boolean bTarget = false;
		String data_gb = null;
		String message = null;
        while (true) {
        	// 수신 데이타를 모두 처리했으면 wait 5초
        	if (nCurrentSiseIndex == getSiseIndex()) {

        		try {
        			//log.info("autoUpdateThread wait");
    	            //ChatMessage chatMessage = new ChatMessage();
    	            //chatMessage.setMessageType(MessageType.WAIT);
    	            //chatMessage.setMessage(Thread.currentThread().getId() + " sise Wait");
    	            //sendMessage(newThreadKey, chatMessage);
    	            
        			Thread.sleep(100);
        		} catch (InterruptedException ie) {
                    break;
        		}    
            	//String inTime   = new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
            	// 시세처리시간이 아니면 종료
            	//if (inTime.compareTo("08:30:00") < 0 || inTime.compareTo("18:00:00") > 0 ) {
                //    log.info("# sise thread stop # 시세 push 시간 아님 ");
            	//	break;
            	//}
                if (!SessionListener.getInstance().isUsing(userId)) {
        		// 사용자 session이 없으면 thread 종료
                    log.info("# sise thread stop # 사용자접속정보 없음");
        			break;
        		}
        		continue;
        	}
        	nCurrentSiseIndex++;        	
        	if (nCurrentSiseIndex >= MAX_SISE_COUNT) nCurrentSiseIndex = 0;
        	
        	
    		message = siseMemory[nCurrentSiseIndex];
    		if (message== null) continue;
    		
	        // 관심종목이 없으면 종료
	        if (itemList == null || itemList.isEmpty()) {
				//log.info("# itemList is null continue");
	        	nCurrentSiseIndex = getSiseIndex();
				continue;
			}
	        try {
				
		        data_gb = message.substring(0,2);
		        message = message.substring(2);
		        
	
				bTarget = false;
				//log.info("# sise thread item update {}",message);
				if (data_gb.equals("00")) {
					// session destroyed
					if (message.contains(userId)) {
		    			log.info("# sise thread end signal");
						break;
					}
					continue;
				} else	if (data_gb.equals("01")) {
					// 시세관심종목 update
					if (message.contains(userId)) {
		                try {
		        			//itemList = mapper.writeValueAsString(dSqlService.getDataBySql("H2", "SELECT distinct(item_cd) item_cd FROM SISE_FAVORATES_INFO WHERE user_id = '" + newThreadKey + "'"));
		        		} catch (Exception e1) {
		        			// TODO Auto-generated catch block
		        			e1.printStackTrace();
		        			break;
		        		}
	        			log.info("# sise thread item update");
					}
	                continue;
	    		} else if (data_gb.equals("A3")) {
	    			// 체결
	    			A3 a3 = mapper.readValue(message, A3.class);
	    			if (itemList.contains(a3.getStd_cd())) bTarget = true;
	    		} else if (data_gb.equals("B6")) {
	    			// 호가
	    			B6 b6 = mapper.readValue(message, B6.class);
	    			if (itemList.contains(b6.getStd_cd())) bTarget = true;
	    		} else if ("D0,D1,D2,D3,E4,E5".contains(data_gb)) {
	    			// 지수
		            ChatMessage chatMessage = new ChatMessage();
		            chatMessage.setMessageType(MessageType.JISU);
		            chatMessage.setMessage(message);
		            sendMessage(uuid, chatMessage);    			
	    			bTarget = true;
	    		}
	    		if (bTarget) {
		            ChatMessage chatMessage = new ChatMessage();
		            chatMessage.setMessageType(MessageType.SISE);
		            chatMessage.setMessage(message);
		            sendMessage(userId, chatMessage);    			
	    		}
			} catch (Exception e) {
				e.printStackTrace();
				break;
				// TODO: handle exception
			}
        }
        
        log.info("## thread end sise . {}[{}]", Thread.currentThread().getName(), Thread.currentThread().getId());
    }    

    public void onCompletion(ChatRequest chatRequest) {
        try {
            lock.writeLock().lock();
            //setJoinResult(waitingUsers.remove(chatRequest), new ChatResponse(ResponseResult.CANCEL, null, chatRequest.getSessionId(),chatRequest.getClientIp()));
        } finally {
            lock.writeLock().unlock();
            log.info("onCompletion : " + chatRequest.getClientIp());
        }
    }

    public void onError(ChatRequest chatRequest) {
        try {
            lock.writeLock().lock();
            setJoinResult(waitingUsers.remove(chatRequest), new ChatResponse(ResponseResult.CANCEL, null, chatRequest.getSessionId(),chatRequest.getClientIp()));
        } finally {
            lock.writeLock().unlock();
            log.info("onError : " + chatRequest.getClientIp());
        }
    }

    public void onTimeout(ChatRequest chatRequest) {
        try {
            lock.writeLock().lock();
            setJoinResult(waitingUsers.remove(chatRequest), new ChatResponse(ResponseResult.TIMEOUT, null, chatRequest.getSessionId(),chatRequest.getClientIp()));
        } finally {
            lock.writeLock().unlock();
            log.info("onTimeout : " + waitingUsers.size());

        }
    }
    public void onCancle(ChatRequest chatRequest) {
        try {
            lock.writeLock().lock();
            setJoinResult(waitingUsers.remove(chatRequest), new ChatResponse(ResponseResult.CANCEL, null, chatRequest.getSessionId(),chatRequest.getClientIp()));
        } finally {
            lock.writeLock().unlock();
            log.info("onCancle : " + chatRequest.getClientIp());
        }
    }

    public void establishChatRoom() {
        try {
            log.info("Current waiting users : " + connectedUsers.size());
            lock.readLock().lock();
            if (waitingUsers.size() < 2) {
                return;
            }

            Iterator<ChatRequest> itr = waitingUsers.keySet().iterator();
            ChatRequest user1 = itr.next();
            ChatRequest user2 = itr.next();

            String uuid = UUID.randomUUID().toString();

            DeferredResult<ChatResponse> user1Result = waitingUsers.remove(user1);
            DeferredResult<ChatResponse> user2Result = waitingUsers.remove(user2);

            user1Result.setResult(new ChatResponse(ResponseResult.SUCCESS, uuid, user1.getSessionId(),user1.getClientIp()));
            user2Result.setResult(new ChatResponse(ResponseResult.SUCCESS, uuid, user2.getSessionId(),user2.getClientIp()));
        } catch (Exception e) {
            log.warn("Exception occur while checking waiting users", e);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void enterSiseChatRoom(ChatRequest request, DeferredResult<ChatResponse> deferredResult,String key) {
        try {
            lock.readLock().lock();
            deferredResult.setResult(new ChatResponse(ResponseResult.SUCCESS, key, request.getSessionId(),request.getClientIp()));
        } catch (Exception e) {
            log.warn("Exception occur while checking waiting users", e);
        } finally {
            lock.readLock().unlock();
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setMessageType(MessageType.CONNECTED);
            chatMessage.setMessage(request.getClientIp() + ":" + request.getSessionId());
            sendMessage(key, chatMessage);            
        }
    }
    public void enterChatRoom(ChatRequest request, DeferredResult<ChatResponse> deferredResult) {
        try {
            log.info("Enter room current users : " + connectedUsers.size());
            lock.readLock().lock();

            //String uuid = UUID.randomUUID().toString();

            deferredResult.setResult(new ChatResponse(ResponseResult.SUCCESS, uuid, request.getSessionId(),request.getClientIp()));
        } catch (Exception e) {
            log.warn("Exception occur while checking waiting users", e);
        } finally {
            lock.readLock().unlock();
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setMessageType(MessageType.CONNECTED);
            chatMessage.setMessage(request.getClientIp() + ":" + request.getSessionId());
            sendMessage(uuid, chatMessage);            
        }
    }
    public void sendMessage(String userid) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessageType(MessageType.LOGIN);
        chatMessage.setMessage(userid );
        sendMessage(uuid, chatMessage);            
    }
    

    public void sendMessage(String chatRoomId, ChatMessage chatMessage) {
        String destination = getDestination(chatRoomId);
        messagingTemplate.convertAndSend(destination, chatMessage);
    }

    public void sendMessageErrorLog(MtrErrorLogVo vo) {
        String destination = getDestination(uuid);
        messagingTemplate.convertAndSend(destination, vo);
    }
    public void sendMessageSysInfo(String vo) {
        String destination = getDestination(uuid);
        messagingTemplate.convertAndSend(destination, vo);
    }
    public void sendMessageStatus(String vo) {
        String destination = getDestination("status");
        messagingTemplate.convertAndSend(destination, vo);
    }
    public void sendMessageCompliance(String vo) {
        String destination = getDestination("compliance");
        messagingTemplate.convertAndSend(destination, vo);
    }
    
    // websocketEventListenr 처리
    public void connectUser(String chatRoomId, String websocketSessionId) {
        log.info("connect users : " +chatRoomId + " " + websocketSessionId);
        connectedUsers.put(websocketSessionId, chatRoomId);
    }

    // websocketEventListenr 처리
    public void disconnectUser(String websocketSessionId) {
        String chatRoomId = connectedUsers.get(websocketSessionId);
        ChatMessage chatMessage = new ChatMessage();
        connectedUsers.remove(websocketSessionId);

        log.info("disconnect users : " +chatRoomId + " " + websocketSessionId);
        
        chatMessage.setMessageType(MessageType.DISCONNECTED);
        chatMessage.setMessage(websocketSessionId);
        sendMessage(chatRoomId, chatMessage);
    }

    private String getDestination(String chatRoomId) {
        return "/topic/chat/" + chatRoomId;
    }

    public String getJoinUser() {
    	ObjectMapper mapper = new ObjectMapper();
    	String jsonStr = "";
    	try {
        	JSONArray jsonArray = new JSONArray();
            try {
                for (Map.Entry<String, String> entry : connectedUsers.entrySet()) {
		    		JSONObject json = new JSONObject();

		    		String key = entry.getKey();
		    		String value = entry.getValue();
		    		
		    		if (value.indexOf("status") >=0)	continue;
		    		
                    json.put("sessionId", key);
                    json.put("info"     , value);

                    jsonArray.put(json);    		
                }
            } catch (Exception e) {
            }
	    	jsonStr = jsonArray.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return jsonStr;
    }
    private void setJoinResult(DeferredResult<ChatResponse> result, ChatResponse response) {
        if (result != null) {
            result.setResult(response);
        }
    }
    /* 
     * autoUpdate 관련 
     * 
     * */

    public void sessionDestroyed(String userId) {
    	setSiseMemory("00001"+userId);
	}
    public int setSiseMemory(String data) {
    	siseMemory[siseIndex++] = data;
    	if (siseIndex >= MAX_SISE_COUNT)
    		siseIndex = 0;
    	return siseIndex;
    }
    public int getSiseIndex() {
		return siseIndex;
	}


    
}