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
public class MtrDBLockVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = -1790436351229152353L;
	/**
	 * 
	 */
	/**
	 * 
	 */
	private String object_type ;
	private String object_name ;
	private String machine;
	private String program;
	private String created_ddl_time;
	private String last_ddl_time;
 
}
