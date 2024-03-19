package com.pjy.dashboard.async;

public class Message {
	private String userId;
	private String msg;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

    
    public Message(String userId,String msg){
        this.msg=msg;
        this.userId=userId;
    }

    public String getMsg() {
        return msg;
    }
}
