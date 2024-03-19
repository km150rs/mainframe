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
public class MtrChart1MinVo {
	private String proc_ymd;
	private String minute;
	private  int   nfoss1_count;
	private  int   nfoss2_count;
}
