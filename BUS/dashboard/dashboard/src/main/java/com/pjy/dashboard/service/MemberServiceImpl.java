package com.pjy.dashboard.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pjy.dashboard.core.dao.jpa.h2.MemberRepository;
import com.pjy.dashboard.core.domain.security.MemberVo;
import com.pjy.dashboard.core.domain.security.UserCustomVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
//@Transactional(transactionManager = "jpaTransactionMangaer")
public class MemberServiceImpl implements MemberService {
    private final String delimiter = ":===:";

	
    private final MemberRepository memberRepository;
	/*
	@Autowired
	private DynamicSqlH2Dao h2dao;
	*/
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;
        
        // 사용자명 + 구분자 + 추가 입력 필드로 넘어온 값을 구분자로 split

        String[] split = userId.split(delimiter);

        if (split == null || split.length != 2) throw new UsernameNotFoundException("Not Found ID : " + userId);

               
        
    	MemberVo userVo = memberRepository.testserId(split[0],split[1]);
    	if(userVo == null) {
			throw new UsernameNotFoundException("User "+userId+" Not Found!");
		}
        List<GrantedAuthority> authorities = new ArrayList<>();

        String[] roles = userVo.getRole().split(",");
        // 권한 앞에 접두사(rolePrefix) 붙임
        for(int i = 0; i < roles.length; i++) {
        	String role = "ROLE_" + roles[i].toUpperCase();
        	authorities.add(new SimpleGrantedAuthority(role));
        	log.info(role);
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        
        //save(userVo);
        String companyNm = memberRepository.getCompanyNm(split[1]);
        log.info("pass:{},{}",userVo.getPassword(), passwordEncoder.encode("km154rs@ab"));
    	// 조회한 정보를 userCustom에 담는다.
        // 만약 파라미터를 추가해야한다면 UserCustom 을 먼저 수정한다.
        UserCustomVo userCustom = new UserCustomVo(userVo.getUserId()
                , userVo.getPassword()
                , enabled, accountNonExpired, credentialsNonExpired, accountNonLocked
                , authorities
                , userVo.getLdap_mail()
                , userVo.getIp() 
                , userVo.getUserName()
                , userVo.getLdap_description()
                , userVo.getLdap_mobile()
                , userVo.getCompanyNo()
        );
        userCustom.setCompanyNm(companyNm);
    	return userCustom;
        /*
    	Optional<MemberVo> memberVoEntityWrapper = memberRepository.findByUserId(userId);
        MemberVo memberVoEntity = memberVoEntityWrapper.orElse(null);

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));

        return new User(memberVoEntity.getUserId(), memberVoEntity.getPassword(), authorities);
        */
    }

    @Transactional(transactionManager = "H2transactionManager")
    @Override
    public Integer save(MemberVo member) {
        MemberVo memberVo = new MemberVo(member);
        memberVo.setLastAccessDt(LocalDateTime.now());
        memberVo.setRegDt(LocalDateTime.now());

        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        memberVo.setPassword(passwordEncoder.encode(memberVo.getPassword()));
        return memberRepository.save(memberVo).getId();
    }


	//회원정보보기
    @Override
	public MemberVo readMember(String id,String companyNo) {
		System.out.println("S : readMember()실행");
		MemberVo vo = null;
		
		try {
			vo = memberRepository.testserId(id,companyNo);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		
		return vo;
	}
    
    @Transactional(transactionManager = "H2transactionManager")
    @Override
	public boolean updateUserInfo(MemberVo vo) throws Exception {
    	MemberVo beforeVo = memberRepository.testserId(vo.getUserId(),vo.getCompanyNo());
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	log.info("{},{}",vo.getPassword(), beforeVo.getPassword());
		boolean result=bcrypt.matches(vo.getPassword(), beforeVo.getPassword());
		//입력된 값과 password가 같을 경우
		if(result) {
        	//login에 암호화 된 password를 담아준다
			memberRepository.update( vo );
			return true;
		} else {
			return false;
			//throw new BusinessException("[비밀번호 틀림]",ErrorCode.INVALID_PASSWORD);
		}
	}	
    @Override
	public boolean checkPassword(String id,String pwd,String companyNo) throws Exception {
    	MemberVo beforeVo = memberRepository.testserId(id,companyNo);
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	//log.info("{},{}",vo.getPassword(), beforeVo.getPassword());
    	return bcrypt.matches(pwd, beforeVo.getPassword());
	}    
    @Transactional(transactionManager = "H2transactionManager")
    @Override
	public boolean updateUserInfoByLdap(MemberVo vo) throws Exception {
			memberRepository.updateByLdap( vo );
			return true;
	}

    @Transactional(transactionManager = "H2transactionManager")
	@Override
	public boolean updatePassword(MemberVo vo) throws Exception {
		memberRepository.updatePassword( vo );
		return false;
	}	    
}