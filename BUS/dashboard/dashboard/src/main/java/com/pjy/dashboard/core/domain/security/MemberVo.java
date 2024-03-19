package com.pjy.dashboard.core.domain.security;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.repository.NoRepositoryBean;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/*
 * # ORM이란?
 - Object-Relational Mapping (객체와 관계형데이터베이스 매핑, 객체와 DB의 테이블이 매핑을 이루는 것)
 - 객체가 테이블이 되도록 매핑 시켜주는 프레임워크 이다.
 - 프로그램의 복잡도를 줄이고 자바 객체와 쿼리를 분리할 수 있으며 트랜잭션 처리나 
 기타 데이터베이스 관련 작업들을 좀 더 편리하게 처리할 수 있는 방법
 - SQL Query가 아닌 직관적인 코드(메서드)로서 데이터를 조작할 수 있다.
	ex) 기존쿼리 : SELECT * FROM MEMBER; 이를 ORM을 사용하면 Member테이블과 매핑된 객체가 member라고 할 때, 
	member.findAll()이라는 메서드 호출로 데이터 조회가 가능하다.

	출처: https://goddaehee.tistory.com/209?category=367461 [갓대희의 작은공간]	
 */

@Data 
//@AllArgsConstructor 
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor()
@Entity(name="MEMBER")
@EqualsAndHashCode(of = "userId")
public class MemberVo {
	private static final long serialVersionUID =  -6204260175392482439L;

	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, nullable = false)
    private String userName;

    @Column(length = 255, nullable = false, unique = true)
    private String userId;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(name = "last_access_dt")
    private LocalDateTime lastAccessDt;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    
    @Column(length = 255, nullable = true)
    private String role; 

    @Column(length = 50, nullable = true)
    private String ip; 

    @Column(length = 50, nullable = true)
    private String ldap_mail; 
    @Column(length = 500, nullable = true)
    private String ldap_displayName;     
    @Column(length = 500, nullable = true)
    private String ldap_description;     
    @Column(length = 50, nullable = true)
    private String ldap_mobile;     

    @Column(length = 3, nullable = true)
    private String companyNo;     
    private String email;     

    public MemberVo(Integer id, String name, String account, String password) {
        this.id = id;
        this.userName = name;
        this.userId = account;
        this.password = password;
    }

	public MemberVo(MemberVo member) {
        this.id = member.id;
        this.userName = member.userName;
        this.userId = member.userId;
        this.password = member.password;
        this.role = member.role;
        this.ip = member.ip;
        this.companyNo = member.companyNo;
        this.email = member.email;
	}
}
