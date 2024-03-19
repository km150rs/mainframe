package com.pjy.dashboard.core.error.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", " Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "C002", " Invalid Input Value"),
    ENTITY_NOT_FOUND(400, "C003", " Entity Not Found"),
    INTERNAL_SERVER_ERROR(500, "C004", "Server Error"),
    INVALID_TYPE_VALUE(400, "C005", " Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "C006", "Access is Denied"),


    // MemberVo
    EMAIL_DUPLICATION(400, "M001", "Email is Duplication"),
    LOGIN_INPUT_INVALID(400, "M002", "Login input is invalid"),

    // Coupon
    COUPON_ALREADY_USE(400, "CO001", "Coupon was already used"),
    COUPON_EXPIRE(400, "CO002", "Coupon was already expired"),

    INVALID_RESULT(400, "CO002", "SELECT QUERY 실행 오류"),
    INVALID_SQL(400, "CO003", "SELECT QUERY 만 사용가능합니다"),
    INVALID_META(400, "CO004", "테이블정보가 없습니다"),
    INVALID_PROPERTIES(400, "CO005", "SQL 프로퍼티 READ 오류"),
    INVALID_TIME(400, "CO006", "조회가능시간이 아닙니다"),

    INVALID_INSERT_OFFDAY(400, "OFF01", "해당월 배차정보존재로 휴가처리 불가"),
    INVALID_PASSWORD(400, "CO006", "비밀번호가 다릅니다")

    ;
    private final String code;
    private final String message;
    private int status;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }
}
