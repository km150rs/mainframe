package com.pjy.dashboard.core.domain.security;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter 
@Setter 
@ToString

public class UserCustomVo extends User {
    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    // 유저의 정보를 더 추가하고 싶다면 이곳과, 아래의 생성자 파라미터를 조절해야 한다.
    private String email;
    private String ip;
    private String displayName;
    private String description;
    private String mobile;
    private String companyNo;
    private String companyNm;

    public UserCustomVo(String username, String password
            , boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked
            , List<GrantedAuthority> authorities
            , String email, String ip,String displayName,String description,String mobile,String companyNo) {
        super(username, password
                , enabled, accountNonExpired, credentialsNonExpired, accountNonLocked
                , authorities);
        this.email = email;
        this.ip = ip;
        this.displayName = displayName;
        this.description = description;
        this.mobile = mobile;
        this.companyNo = companyNo;
    }
}
