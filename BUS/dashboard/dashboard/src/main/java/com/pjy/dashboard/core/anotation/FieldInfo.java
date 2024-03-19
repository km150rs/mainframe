package com.pjy.dashboard.core.anotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface FieldInfo {
    String korName(); // 필드의 설명(주석용)
    int length();     // 길이
    boolean pk() default false;     // 길이
    int decimalPoint() default 0; // 소수점 길이 
}