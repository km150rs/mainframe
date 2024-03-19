package com.pjy.dashboard.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Builder
@Data
public class MtpServiceDto implements Serializable {

  
  /**
	 * 
	 */
  private static final long serialVersionUID = 5988115656957721582L;
  @NonNull
  private String             status          ;
  private String             message         ;
  private String             className       ;
  private String             functionName    ;
  private List<Object>       objectList      ;
  private List<ObjectMapper> objectMapperList;

}
