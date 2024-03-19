package com.pjy.dashboard.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;

import com.pjy.dashboard.core.common.MtrProperties;
import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;
import com.pjy.dashboard.dao.DynamicSqlH2Dao;
import com.pjy.dashboard.domain.AttendanceInfoVo;
import com.pjy.dashboard.domain.CommonCodeVo;
import com.pjy.dashboard.domain.HolidayInfoVo;
import com.pjy.dashboard.mapper.h2.h2Mapper;
import com.pjy.dashboard.mapper.h2.h2Mapper3;
import com.pjy.dashboard.util.DateUtil;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Getter
@Service
public class DynamicSqlBatch {
	@Autowired
	private h2Mapper3 h2DbMapper3;
	
	@Autowired
	private DynamicSqlH2Dao h2dao;

    @Value("${file.backup.dir}")
    private String fileBackupDir;

	/*
	 * 1. 당해년도 운행기록 월별 집계
	 */
	public int insert_TBB_DRIVING_RECORD_DAY() throws Exception {
		// 당해년도 저장된 운행기록 월 list가져옴 
	    CommonCodeVo vo= new CommonCodeVo();
	    vo.setCompanyNo("100");

	    List<Map<String, Object>> mmList = this.getH2DbMapper3().select_TBB_DRIVING_RECORD_baseYm();

	    
		for (Map<String, Object> map : mmList) { 
		    vo.setBaseYm(map.get("BASE_YM").toString());
			this.getH2DbMapper3().insert_TBB_DRIVING_RECORD_DAY(vo);
		}
		
		return 1;
	}		
	/*
	 * backup
	 */
	public int dailyBackup() throws Exception {
		h2dao.dailyBackup(fileBackupDir);
		return 1;
	}	
	  
}
