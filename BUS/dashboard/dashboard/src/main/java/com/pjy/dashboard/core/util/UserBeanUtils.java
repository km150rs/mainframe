package com.pjy.dashboard.core.util;

import org.springframework.context.ApplicationContext;

import com.pjy.dashboard.core.common.ApplicationContextProvider;

public class UserBeanUtils {
    public static Object getBean(String string) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(string);
    }

}
