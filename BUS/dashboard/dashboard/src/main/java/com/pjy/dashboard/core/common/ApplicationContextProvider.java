package com.pjy.dashboard.core.common;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider implements ApplicationContextAware{
    
    private static ApplicationContext applicationContext;
    
    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        applicationContext = ctx;
    }
    
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }
 
}

//출처: https://jeong-pro.tistory.com/174 [기본기를 쌓는 정아마추어 코딩블로그]