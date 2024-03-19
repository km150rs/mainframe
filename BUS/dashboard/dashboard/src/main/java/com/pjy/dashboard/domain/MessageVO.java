package com.pjy.dashboard.domain;

import java.io.Serializable;

import com.pjy.dashboard.core.error.exception.ErrorCode;

public class MessageVO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3116591538665178913L;
	private String senderName;
	private String sendMessage;
	public MessageVO(String msg, String ref) {
		this.senderName = ref;
		this.sendMessage = msg;
		// TODO Auto-generated constructor stub
	}
	public MessageVO(ErrorCode invalidTime, String ref) {
		// TODO Auto-generated constructor stub
		this.senderName = invalidTime.getCode();
		this.sendMessage = invalidTime.getMessage();
	}
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getSendMessage() {
		return sendMessage;
	}
	public void setSendMessage(String sendMessage) {
		this.sendMessage = sendMessage;
	}
}
