package com.pjy.dashboard.core.error.exception;

import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;

public class InvalidValueException extends BusinessException {

    public InvalidValueException(String value) {
        super(value, ErrorCode.INVALID_INPUT_VALUE);
    }

    public InvalidValueException(String value, ErrorCode errorCode) {
        super(value, errorCode);
    }
}