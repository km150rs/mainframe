package com.pjy.dashboard.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.pjy.dashboard.core.domain.security.MemberVo;

public interface MemberService extends UserDetailsService {
	
    Integer save(MemberVo member);

	MemberVo readMember(String id,String companyNo);

	boolean updateUserInfo(MemberVo vo) throws Exception;
	boolean checkPassword(String id,String pwd,String companyNo) throws Exception;

	boolean updateUserInfoByLdap(MemberVo vo) throws Exception;
	boolean updatePassword(MemberVo vo) throws Exception;
}