package com.pjy.dashboard.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;


/**
 */
@Slf4j
@Service
public class RestService {
	@Value("${rest.sise.server}")
    private int restSisePort;
	@Value("${rest.omsdev.server}")
    private String restOmsDevPort;

    public String restCall(String callName) {
        String url = String.format("http://localHost:%d%s",restSisePort,callName);

        try {
    	    RestTemplate restTemplate = new RestTemplate();
    	    return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
        	log.error(e.getMessage());
    		// TODO: handle exception
            return e.getMessage();
    	}
    }
    public String restCall(int port,String callName) {
        String url = String.format("http://localHost:%d%s",port,callName);

        try {
    	    RestTemplate restTemplate = new RestTemplate();
    	    return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
        	log.error(e.getMessage());
    		// TODO: handle exception
            return e.getMessage();
    	}
    }

}