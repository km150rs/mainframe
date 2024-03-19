package com.pjy.dashboard.domain;

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
public class ComplElapsedSumVo {
	private String 	product;
	private String 	server_ip;
	private String 	proc_ymd;
	
	private int 	s1;
	private int 	s2;
	private int 	s3;
	private int 	s4;
	private int 	s5;
	private int 	s6;
	private int 	s7;
	private int 	s8;
	private int 	s9;

}
