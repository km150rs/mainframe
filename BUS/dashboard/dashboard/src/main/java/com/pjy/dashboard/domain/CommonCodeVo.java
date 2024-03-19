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
public class CommonCodeVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = 7876927406000175218L;
	private String companyNo ;
	private String routeNm;
	private String baseYear;
	private String baseYm;
	private String baseYmd;
	private String baseFirstYmd;			// 기준월01일
	private String nextMonthYmd;	// 익월01일
	private String prevWeekYmd;	// 일주일전
	private String empNm;			// 
	private String carRegno;			// 
	private String carNo;			// 
	private int    dispatchSeq;		// 기준월01일
	private String checkDay;			// 
	private String dayValue;	// 
	private String ampmGubun;
	private String fileId;
	private String fileGb;
	private String workDate;
	private String attendanceType ;
	private String fromDate;
	private String toDate ;
	private String arrangeStatus ;
	private String lastChgUser ;
	private String offIncludeYn;
	private String weekGb;
	private String lastColumnNm;
	private String codeType1;
	private String codeType2;
	private String codeType3;
	private String codeGb;
	private String errorMsg;

	private boolean  includeHeader = true;

	private int  initSeq;
	
	private String targetTable;
	private String filterText;
	private String filterType;
	private UserCustomVo userVo;
	
	public void init() {
		this.dispatchSeq = 0;

    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	Object principal= authentication.getPrincipal();
    	if (principal instanceof UserCustomVo) {
    		this.setUserVo((UserCustomVo) principal);
    		 setCompanyNo (userVo.getCompanyNo());
    		 setLastChgUser (userVo.getUsername());
   		} else {
   			throw new BusinessException(
   			     "You are not authorized to perform this operation!",
   			  ErrorCode.HANDLE_ACCESS_DENIED);
   		}
		if (this.baseYm != null && !baseYm.isEmpty()) {		
			baseFirstYmd = baseYm.replace("-", "") + "01";
			nextMonthYmd = DateUtil.afterMonthDay(baseFirstYmd, 1);
			prevWeekYmd  = DateUtil.afterDay(baseFirstYmd, -7);
		}
	}
}
