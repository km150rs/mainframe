package com.pjy.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.pjy.dashboard.service.RestService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
public class CorsController {

	@Autowired
	RestService restService;
	
//	@Autowired
//	MapperXmlParserService parserService;

  @RequestMapping("/proxy/viewCount")
  public String proxy() {
    String url = "http://172.16.112.54:10020/view/showSiseCount";

    try {
	    RestTemplate restTemplate = new RestTemplate();
	    return restTemplate.getForObject(url, String.class);
    } catch (Exception e) {
    	log.error(e.getMessage());
		// TODO: handle exception
        return e.getMessage();
	}
  }
//  @RequestMapping("/proxy/xmlParse")
//  public String xmlParse(@RequestParam("serviceName") String serviceName) throws JsonProcessingException {
//	  
 //     return parserService.testTobeParse_new();	  
 // }   

  @RequestMapping("/proxy/restCall")
  public String siseCount(@RequestParam("serviceName") String serviceName) {
//	  return restService.restCall(10030,serviceName);
	  return restService.restCall(10030,"/view/DynamicSqlFilter?filterType=ksdStatus&filterText=KSD&server=prd");
  }  
  
  
}