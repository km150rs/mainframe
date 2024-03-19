package com.pjy.dashboard.domain.oauth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class NaverOAuthToken {
    private String access_token;
    private String refresh_token;
    private String token_type;
    private String expires_in;

}