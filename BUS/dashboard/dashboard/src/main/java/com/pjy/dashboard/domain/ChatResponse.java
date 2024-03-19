package com.pjy.dashboard.domain;

/**
 * @author zacconding
 * @Date 2018-08-22
 * @GitHub : https://github.com/zacscoding
 */
public class ChatResponse {

    private ResponseResult responseResult;
    private String chatRoomId;
    private String sessionId;
    private String clientIp;

    public ChatResponse(ResponseResult responseResult, String chatRoomId, String sessionId, String clientIp) {
		this.responseResult = responseResult;
		this.chatRoomId = chatRoomId;
		this.sessionId = sessionId;
		this.clientIp = clientIp;
	}

	public String getClientIp() {
		return clientIp;
	}

	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}

	public ChatResponse() {
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(String chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public ResponseResult getResponseResult() {
        return responseResult;
    }

    public void setResponseResult(ResponseResult responseResult) {
        this.responseResult = responseResult;
    }

    @Override
    public String toString() {
        return "ChatResponse{" + "responseResult=" + responseResult + ", chatRoomId='" + chatRoomId + '\'' + ", sessionId='" + sessionId + '\'' + '}';
    }

    public enum ResponseResult {
        SUCCESS, CANCEL, TIMEOUT;
    }
}