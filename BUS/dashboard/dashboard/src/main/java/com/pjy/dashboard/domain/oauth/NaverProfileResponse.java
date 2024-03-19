package com.pjy.dashboard.domain.oauth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverProfileResponse {
	 private String resultcode;
	    private String message;
	    private NaverProfile response;

	    public NaverProfileResponse() {
	    }
}
