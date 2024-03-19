package com.pjy.dashboard.service;

import java.util.List;
import java.util.Map;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.dto.MtpServiceDto;

public abstract class AbstractMtpService implements MtpService {
  
  @Override
  public MtpServiceDto mtpServiceDtoBuilder(final String status, @Nullable final String message, final String className, final String functionName, @Nullable final List<Object> objectList, @Nullable final List<ObjectMapper> objectMapperList) {
    return MtpServiceDto.builder().status(status).message(message).className(className).functionName(functionName).objectList(objectList).objectMapperList(objectMapperList).build();    
  }
  
  protected abstract Object convertMapToDomain(Map<String, String> map);

}
