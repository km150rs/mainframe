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
public class MtrSvcCountVo {
	private int 	countDev;
	private int 	countNfoss1;
	private int 	countNfoss2;
	private String 	lastLogTime;
}
