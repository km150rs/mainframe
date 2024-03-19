package com.pjy.dashboard.domain;

import java.io.Serializable;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.pjy.dashboard.core.domain.security.MemberVo;
import com.pjy.dashboard.core.domain.security.UserCustomVo;
import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;
import com.pjy.dashboard.util.DateUtil;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class AllocationVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = 7876927406000175212L;

	private String  companyNo       ;
	private String  routeNm         ;
	private String  baseYyyyMm      ;
	private int     initSeq         ;
	private String  carRegno        ;
	private String  empNm           ;
	private int     dispatchSeq     ;
	private String  ampmGubun       ;
	private int     prevDailySeq   ;
	private String  prevWorkPattern;
	private String  d1               ;
	private String  d2               ;
	private String  d3               ;
	private String  d4               ;
	private String  d5               ;
	private String  d6               ;
	private String  d7               ;
	private String  d8               ;
	private String  d9               ;
	private String  d10              ;
	private String  d11              ;
	private String  d12              ;
	private String  d13              ;
	private String  d14              ;
	private String  d15              ;
	private String  d16              ;
	private String  d17              ;
	private String  d18              ;
	private String  d19              ;
	private String  d20              ;
	private String  d21              ;
	private String  d22              ;
	private String  d23              ;
	private String  d24              ;
	private String  d25              ;
	private String  d26              ;
	private String  d27              ;
	private String  d28              ;
	private String  d29              ;
	private String  d30              ;
	private String  d31              ;	
	
	private UserCustomVo userVo;
	
	public void init() {
		this.dispatchSeq = 0;

    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	Object principal= authentication.getPrincipal();
    	if (principal instanceof UserCustomVo) {
    		this.setUserVo((UserCustomVo) principal);
    		 setCompanyNo (userVo.getCompanyNo());
   		} else {
   			throw new BusinessException(
   			     "You are not authorized to perform this operation!",
   			  ErrorCode.HANDLE_ACCESS_DENIED);
   		}
	}
}
