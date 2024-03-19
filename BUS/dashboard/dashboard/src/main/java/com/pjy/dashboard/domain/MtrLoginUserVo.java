package com.pjy.dashboard.domain;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MtrLoginUserVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = -3646904099899069636L;
	/**
	 * 
	 */
	private String seq_no ;
	private String user_id ;
	private String user_nm ;
	private String team_cd ;
	private String team_nm ;
	private String ip ;
	private String start_time ;
	private String end_time;
	private String ad_id;
	private String ad_enm;
	
}
