package com.pjy.dashboard.core.util;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.pjy.dashboard.core.util.CookieUtil;

public class RememberMeUtil {
    public static final String REMEMEBER_ME_COOKIE_NAME = "REMEMBER_ME";

    public static String getSeries() {
        return randomString();
    }

    public static String getToken() {
        return randomString();
    }

    public static String get(HttpServletRequest request) {
        return CookieUtil.getValue(request, REMEMEBER_ME_COOKIE_NAME);
    }
    public static String randomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
