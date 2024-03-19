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
public class MtrErrorLogVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = 7876927406000175217L;

	private String log_id ;
	private String action ;
	private String log_time ;
	private String end_time ;
	private String elapsed_time ;
	private String pid ;
	private String svc_id;
	private String proc_ymd;
	private String server_ip;
	private String orgMsg;
	private String form_nm;
	private String pid_nm ;
	
	public MtrErrorLogVo(String msg) {
		this.setOrgMsg(msg.trim());

		// 일자에 error 면 action 에러
		if (this.getOrgMsg().indexOf("ERROR") >= 0) {
			this.setProc_ymd("");
			this.setAction("ERROR");
			return;
		}
		
		this.setProc_ymd(msg.split(" ")[0].trim());
		
		this.setLog_id(msg.split(" ")[1].trim());
		this.setAction(msg.split(" ")[2].trim());
		this.setLog_time(msg.split(" ")[3].trim());
		this.setPid(msg.split(" ")[4].trim());
		if (this.getAction().equals("start")) {
			this.setSvc_id(msg.split(" ")[5].trim());
		} else {
			this.setSvc_id("-");
		}
		this.setElapsed_time("-");
		
	}
}
