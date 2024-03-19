package com.pjy.dashboard.domain;

import java.io.Serializable;
import java.util.List;

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
public class MtrSysInfoVo implements Serializable{
	  /**
	 * 
	 */
	private static final long serialVersionUID = 3821983858079851112L;
	/**
	 * 
	 */
	private String action ;
	private String proc_ymd;
	private String server_ip;
	private List<DiskInfo> orgMsg;
	@Getter
	@Setter
	@ToString
    //참고 @JsonProperty("image_path") json변경시 사용될 이름 지정가능
    public  class DiskInfo {
        private String recid;
        private String path;
        private String gblock;
        private String available;
        private String urate;
        private String iused;
        private String irate;
        private String mount;
    }
 
}
