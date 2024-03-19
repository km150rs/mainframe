package com.pjy.dashboard.domain;

import java.io.Serializable;

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
public class MtrDeadlineVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = -1790436351229152352L;
	/**
	 * 
	 */
	/**
	 * 
	 */
	private String job_nm1 ;
	private String status1;
	private String time1;
	private String job_nm2 ;
	private String status2;
	private String time2;
 
}
