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
public class MtrElapsedTimeVo {
	private int		recid;
	private  int	tot_count;
	private String svc_id;
	private String pid;
	private String start_time;
	private String end_time;
	private String elapsed_time;
	private String log_id;
	private String proc_ymd;
	private String server_ip;
	private	String max_time;
	private String avg_time;
	private String form_nm;
}
