package com.pjy.dashboard.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.pjy.dashboard.filter.TestFilter;
import com.pjy.dashboard.interceptor.LoggerInterceptor;


@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
	
	@Autowired
	LoggerInterceptor loggerInterceptor;
	
	@Override
	public void addInterceptors (InterceptorRegistry registry) {
        registry.addInterceptor(loggerInterceptor)
        .addPathPatterns("/*")
        .excludePathPatterns("/login*") //로그인 쪽은 예외처리를 한다.
        .excludePathPatterns("/proxy/viewCount") //로그인 쪽은 예외처리를 한다.
        .excludePathPatterns("/proxy/**/"); //proxy쪽은 예외처리를 한다.
	}

	@Override
	/*
	 * public void addCorsMappings(CorsRegistry registry) {
	 * registry.addMapping("/**") .allowedOrigins("http://172.16.112.54:10010"); }
	 */
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600)
            ;
    }
    
	/* 
	 * 예제
	 * https://www.programcreek.com/java-api-examples/?class=org.springframework.boot.web.servlet.FilterRegistrationBean&method=setUrlPatterns
	 */

	@Bean
	public FilterRegistrationBean getFilterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean(new TestFilter());
		registrationBean.setOrder(Integer.MIN_VALUE);
		//registrationBean.addUrlPatterns("/*");
		registrationBean.setUrlPatterns(Arrays.asList("/filter/*"));
		return registrationBean;
	}

}