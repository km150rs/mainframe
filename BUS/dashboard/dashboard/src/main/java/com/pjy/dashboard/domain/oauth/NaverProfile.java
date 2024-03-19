package com.pjy.dashboard.domain.oauth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverProfile {
    private String email;
    private String nickname;
    private String profile_image;
    private String age;
    private String gender;
    private String id;
    private String name;
    private String birthday;
    private String birthyear;
    private String mobile;

    public NaverProfile() {
    }

}
