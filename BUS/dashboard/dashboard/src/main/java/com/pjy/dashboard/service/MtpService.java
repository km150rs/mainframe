package com.pjy.dashboard.service;

import java.util.List;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.dto.MtpServiceDto;

public interface MtpService {
  
  public MtpServiceDto mtpServiceDtoBuilder(final String status, @Nullable final String message, final String className, final String functionName, @Nullable final List<Object> objectList, @Nullable final List<ObjectMapper> objectMapperList) throws Exception;
  
}