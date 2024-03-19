package com.pjy.dashboard.core.error.exception;

import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;

public class EntityNotFoundException extends BusinessException {

    public EntityNotFoundException(String message) {
        super(message, ErrorCode.ENTITY_NOT_FOUND);
    }
}