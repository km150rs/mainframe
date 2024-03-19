package com.pjy.dashboard.core.domain.security;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/* https://codevang.tistory.com/274
 * 여러 기기에서 로그인을 해야 할 때 이슈가 있었다. 
 * 한쪽 에서 Remember me 를 이용하여 로그인 하거나, 다른쪽에서 로그아웃을 할 경우 인증 TOKEN 데이터가 덮어씌워지거나, 
 * 삭제되어서 기존의 기기는 Remember Me 가 무력화 되었다.
 * 출처: http://chooco13.github.io/Spring-Spring-Security%EC%9D%98-Remember-Me-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0/
 */
@Data
@Entity(name = "REMEMBER_ME")
public class RememberMeVo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REMEMBER_ME_ID")
    private int id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "REMEMBER_ME_SERIES", unique = true)
    private String series;

    @Column(name = "REMEMBER_ME_TOKEN")
    private String token;

    @Column(name = "last_access_dt")
    private Date lastAccessDt;

    @Column(name = "reg_dt")
    private Date regDt;;

    public RememberMeVo() {
    }

    public RememberMeVo(String userId, String series, String token) {
        this.userId = userId;
        this.series = series;
        this.token = token;
    }
}