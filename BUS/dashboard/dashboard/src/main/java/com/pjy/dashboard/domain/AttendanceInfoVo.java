package com.pjy.dashboard.domain;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.pjy.dashboard.core.domain.security.UserCustomVo;
import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;
import com.pjy.dashboard.util.DateUtil;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AttendanceInfoVo {
	  /**
	 * 
	 */

	private String companyNo;
	private String regDate;
	private String empNm;
	private String attendanceType ;
	private String startDate;
	private String endDate ;
	private String routeNm ;
	private String memo ;
	private String deleteYn ;
	private String lastChgUser;
	private String lastChgDate;
	private String id;
	private String key;
	private UserCustomVo userVo;
	private List<Map<String, Object>> dayList ;
	
	public void init() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	Object principal= authentication.getPrincipal();
    	if (principal instanceof UserCustomVo) {
    		this.setUserVo((UserCustomVo) principal);
    		 setCompanyNo (userVo.getCompanyNo());
    		 setLastChgUser(userVo.getUsername());
   		} else {
   			throw new BusinessException(
   			     "You are not authorized to perform this operation!",
   			  ErrorCode.HANDLE_ACCESS_DENIED);
   		}
	}	
}
