package com.pjy.dashboard.domain;

import java.io.Serializable;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j

@AllArgsConstructor
@NoArgsConstructor
public class MtrQueryLoadVo2 implements Serializable{
	   /**
	 * 
	 */
	private static final long serialVersionUID = 4031395055145879515L;
	
	HashMap<String, String> queryLoadMap = new HashMap<String, String>(); // Map 선언
	/*
	private	String nfoss1SysInfo;
	private	String nfoss2SysInfo;
	private String nfoss1SvcStatus;
	private String nfoss2SvcStatus;
	private String nfossSvcCount;
	private String nfossSvcChart1Min;
	*/
	@Getter
	private  final String MtrIP_dev = "172.21.12.116";

	@Getter
	private  final String MtrIP_nfoss1 = "172.21.12.117";

	@Getter
	private  final String MtrIP_nfoss2 = "172.21.12.118";
	
	public void setQueryLoadMap(String key, String server_ip,String jsonStr) {
		//log.info("setQueryLoadMap {}{}{}",key,server_ip,jsonStr);
		if (queryLoadMap.containsKey(key+server_ip)) {
            queryLoadMap.replace(key+server_ip,jsonStr);
        } else {
        	queryLoadMap.put(key+server_ip,jsonStr);
        }
		//log.info("setQueryLoadMap end {}{}{}",key,server_ip,jsonStr);
	}
	public String getQueryLoadMap(String key, String server_ip) {
		if (queryLoadMap.containsKey(key+server_ip)) {
            return queryLoadMap.get(key+server_ip);
        } else {
        	return null;
        }
	}

	/*
	public String getNfossSysInfo(String server_ip) {
		if (server_ip.equals("172.21.12.117"))
			return getNfoss1SysInfo();
		else return getNfoss2SysInfo();
	}
	public String getNfossSvcStatus(String server_ip) {
		if (server_ip.equals("172.21.12.117"))
			return getNfoss1SvcStatus();
		else return getNfoss2SvcStatus();
	}
	public void setNfossSysInfo(String server_ip,String jsonStr) {
		if (server_ip.equals("172.21.12.117"))
			this.setNfoss1SysInfo(jsonStr);
		else this.setNfoss2SysInfo(jsonStr);
	}
	public void setNfossSvcStatus(String server_ip,String jsonStr) {
		if (server_ip.equals("172.21.12.117"))
			this.setNfoss1SvcStatus(jsonStr);
		else this.setNfoss2SvcStatus(jsonStr);
	}
	*/
}
