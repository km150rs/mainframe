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
import com.pjy.dashboard.domain.MenuVo;
import com.pjy.dashboard.mapper.h2.h2Mapper;
import com.pjy.dashboard.mapper.h2.h2Mapper3;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Getter
@Service
public class DynamicSqlService {
	@Autowired
	private h2Mapper h2DbMapper;

	@Autowired
	private h2Mapper3 h2DbMapper3;

	@Autowired
	private DynamicSqlH2Dao h2dao;
//	@Autowired
//	private DynamicSqlOmsDev1Dao omsdev1dao;
    @Autowired
    private MtrProperties properties;

//	public Map<String, Map<String,Object>> getData2() throws Exception {
//		return Collections.singletonMap("data",dao.getData(1));
//	}
	
	
	public List<Object> getHeaderBySql(String sql) throws Exception {
		return h2dao.getHeaderBySql(sql);
	}

	public Collection<?> getDataBySql(String sql) throws Exception {
		return h2dao.getDataBySql(sql);
	}

	/*
	 * filter sql은 무조건 real에서
	 */
	public Object getSqlFilter(CommonCodeVo commonVo) throws Exception {
		String sql = null;

		if (commonVo.getFilterType() == null)
			sql = commonVo.getFilterText();
		else { 
			try {
				log.info("filterType={{}} " ,commonVo.getFilterType());	    	
				sql = properties.getString("mtr.query.filter_"+commonVo.getFilterType());
				sql = sql.replace("@companyNo",commonVo.getCompanyNo());
				if (commonVo.getRouteNm() !=null)
					sql = sql.replace("@routeNm",commonVo.getRouteNm());
				if (commonVo.getBaseYear() !=null)
					sql = sql.replace("@baseYear",commonVo.getBaseYear());
				if (commonVo.getBaseYmd() !=null)
					sql = sql.replace("@baseYmd",commonVo.getBaseYmd());
				if (commonVo.getBaseYm() !=null)
					sql = sql.replace("@baseYm",commonVo.getBaseYm());
				if (commonVo.getCheckDay() !=null)
					sql = sql.replace("@checkDay",commonVo.getCheckDay());
				if (commonVo.getDayValue() !=null)
					sql = sql.replace("@dayValue",commonVo.getDayValue());

				if (commonVo.getBaseFirstYmd() !=null)
					sql = sql.replace("@baseFirstYmd",commonVo.getBaseFirstYmd());
				if (commonVo.getNextMonthYmd() !=null)
					sql = sql.replace("@nextMonthYmd",commonVo.getNextMonthYmd());
				
				if (commonVo.getWorkDate() !=null)
					sql = sql.replace("@workDate",commonVo.getWorkDate());
				if (commonVo.getAttendanceType() !=null)
					sql = sql.replace("@attendanceType",commonVo.getAttendanceType());
				if (commonVo.getEmpNm() !=null)
					sql = sql.replace("@empNm",commonVo.getEmpNm());
				if (commonVo.getFromDate() !=null)
					sql = sql.replace("@fromDate",commonVo.getFromDate());
				if (commonVo.getToDate() !=null)
					sql = sql.replace("@toDate",commonVo.getToDate());
				if (commonVo.getFilterText() !=null)
					sql = sql.replace("@filterText",commonVo.getFilterText());
				if (commonVo.getCodeType1() !=null)
					sql = sql.replace("@codeType1",commonVo.getCodeType1());
				if (commonVo.getCodeType2() !=null)
					sql = sql.replace("@codeType2",commonVo.getCodeType2());
				if (commonVo.getCodeType3() !=null)
					sql = sql.replace("@codeType3",commonVo.getCodeType3());

				
				log.info("properties mtr.query.sql : " + sql);	    	
		    } catch (Exception e) {
				log.error("properties error: " + e.getMessage());
				throw new BusinessException("properties read error",ErrorCode.INVALID_PROPERTIES); 
		    }
		}
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			if (commonVo.isIncludeHeader()) {
				List<Object> header = this.getHeaderBySql(sql);
				data.put("header", header);
			}
			Collection<?> rec = this.getDataBySql(sql);
			data.put("data", rec);
			
	    } catch (Exception e) {
			log.error("jdbcTemplate error: " + e.getMessage());
			throw new BusinessException("jdbcTemplate query error",ErrorCode.INVALID_RESULT); 
	    }
        return data ;
	}

	
	public Object getSqlFilterMybatis(CommonCodeVo commonVo) throws Exception {
		Map<String, Object> data = new HashMap<String, Object>();

		Collection<?> rec= null;	
		try {
			if (commonVo.getFilterType().equals("select_getEmployeeCard"))
				rec = this.getH2DbMapper().select_getEmployeeCard(commonVo);
			else if (commonVo.getFilterType().equals("select_getDrivingOrder"))
				rec = this.getH2DbMapper().select_getDrivingOrder(commonVo);
			else if (commonVo.getFilterType().equals("select_getDailyOffList"))
				rec = this.getH2DbMapper().select_getDailyOffList(commonVo);
			else if (commonVo.getFilterType().equals("select_PunctualityAnalize_route"))
				rec = this.getH2DbMapper().select_PunctualityAnalize_route(commonVo);
			else if (commonVo.getFilterType().equals("select_PunctualityAnalize_month"))
				rec = this.getH2DbMapper().select_PunctualityAnalize_month(commonVo);
			else if (commonVo.getFilterType().equals("select_PunctualityAnalize_day"))
				rec = this.getH2DbMapper().select_PunctualityAnalize_day(commonVo);
			else if (commonVo.getFilterType().equals("select_PunctualityAnalize_emp"))
				rec = this.getH2DbMapper().select_PunctualityAnalize_emp(commonVo);
			else if (commonVo.getFilterType().equals("select_PunctualityAnalize_detail"))
				rec = this.getH2DbMapper().select_PunctualityAnalize_detail(commonVo);
			else if (commonVo.getFilterType().equals("select_PunctualityAnalize_empDetail"))
				rec = this.getH2DbMapper().select_PunctualityAnalize_empDetail(commonVo);
			else if (commonVo.getFilterType().equals("select_uploadStatus_Punctuality_year"))
				rec = this.getH2DbMapper().select_uploadStatus_Punctuality_year(commonVo);
			else if (commonVo.getFilterType().equals("select_uploadStatus_Punctuality_month"))
				rec = this.getH2DbMapper().select_uploadStatus_Punctuality_month(commonVo);
			else if (commonVo.getFilterType().equals("select_uploadStatus_iscDrivingRecord_year"))
				rec = this.getH2DbMapper().select_uploadStatus_iscDrivingRecord_year(commonVo);
			else if (commonVo.getFilterType().equals("select_uploadStatus_iscDrivingRecord_month"))
				rec = this.getH2DbMapper().select_uploadStatus_iscDrivingRecord_month(commonVo);
			else if (commonVo.getFilterType().equals("select_uploadStatus_dangerDriving_year"))
				rec = this.getH2DbMapper().select_uploadStatus_dangerDriving_year(commonVo);
			else if (commonVo.getFilterType().equals("select_getAccidentAge"))
				rec = this.getH2DbMapper().select_getAccidentAge(commonVo);
			else if (commonVo.getFilterType().equals("select_getAccidentEnterDate"))
				rec = this.getH2DbMapper().select_getAccidentEnterDate(commonVo);
			else if (commonVo.getFilterType().equals("select_checkDrivingRecord_duplicationNm"))
				rec = this.getH2DbMapper().select_checkDrivingRecord_duplicationNm(commonVo);
			else if (commonVo.getFilterType().equals("select_TBM_EMP_POINT_INFO"))
				rec = this.getH2DbMapper3().select_TBM_EMP_POINT_INFO(commonVo);

			
			data.put("data", rec);
	    } catch (Exception e) {
			log.error("jdbcTemplate error: " + e.getMessage());
			throw new BusinessException("jdbcTemplate query error",ErrorCode.INVALID_RESULT); 
	    }

        return data ;
	}
	

	/*
	 * filter sql은 무조건 real에서
	 */
	public Object getSqlFilterNoHeader(CommonCodeVo commonVo) throws Exception {
		String sql = null;
		try {
			sql = properties.getString("mtr.query.filter_"+commonVo.getFilterType());
			sql = sql.replace("@companyNo",commonVo.getCompanyNo());
			if (commonVo.getRouteNm() !=null)
				sql = sql.replace("@routeNm",commonVo.getRouteNm());
			if (commonVo.getBaseYm() !=null)
				sql = sql.replace("@baseYm",commonVo.getBaseYm());
			if (commonVo.getCheckDay() !=null)
				sql = sql.replace("@checkDay",commonVo.getCheckDay());
			if (commonVo.getDayValue() !=null)
				sql = sql.replace("@dayValue",commonVo.getDayValue());

			if (commonVo.getWorkDate() !=null)
				sql = sql.replace("@workDate",commonVo.getWorkDate());
			if (commonVo.getAttendanceType() !=null)
				sql = sql.replace("@attendanceType",commonVo.getAttendanceType());
			if (commonVo.getEmpNm() !=null)
				sql = sql.replace("@empNm",commonVo.getEmpNm());
			if (commonVo.getFromDate() !=null)
				sql = sql.replace("@fromDate",commonVo.getFromDate());
			if (commonVo.getToDate() !=null)
				sql = sql.replace("@toDate",commonVo.getToDate());
			if (commonVo.getFilterText() !=null)
				sql = sql.replace("@filterText",commonVo.getFilterText());
			
			log.info("properties mtr.query.sql : " + sql);	
		} catch (Exception e) {
			log.error("properties error: " + e.getMessage());
			throw new BusinessException("properties read error",ErrorCode.INVALID_PROPERTIES); 
	    }
	
		return this.getDataBySql(sql);
	
	}	


	
	// table의 colume,index info
	public Object BUS_monthArrangeBasic(CommonCodeVo vo) throws Exception {
		String sql = properties.getString("mtr.h2.BUS_monthArrangeBasic");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNo",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		//log.info(sql);
		Map<String, Object> data = new HashMap<String, Object>();
		Collection<?> rec = this.getDataBySql(sql);
		data.put("data", rec);
		 
		//요일
		String sql2 = properties.getString("mtr.h2.BUS_monthArrangeDetail2");
		sql2 = sql2.replace("@companyNo",vo.getCompanyNo());
		sql2 = sql2.replace("@routeNo",vo.getRouteNm());
		sql2 = sql2.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql2 = sql2.replace("@baseYm",vo.getBaseYm());
		sql2 = sql2.replace("@initSeq",String.valueOf(vo.getInitSeq()));
			//log.info(sql);
		Map<String, Object> data2 = new HashMap<String, Object>();
		Collection<?> rec2 = this.getDataBySql(sql2);
			
		data.put("data2", rec2);
			
		return data;
		
	}
	// 배차삭제는 initSeq =0 인것만 대상
	public Object BUS_DeleteMonthArrange(CommonCodeVo vo) throws Exception {
		vo.setArrangeStatus("");
		this.getH2DbMapper().deleteTBL_MONTH_ARRANGE_BASIC(vo);
		this.getH2DbMapper().deleteTBL_MONTH_ARRANGE_DETAIL(vo);
		this.getH2DbMapper().deleteTBL_MONTH_ARRANGE_STATUS(vo);
		
		return true;
	}
	// table의 colume,index info
	public Object BUS_ViewMonthArrange(CommonCodeVo vo) throws Exception {
		
		String sql = properties.getString("mtr.h2.BUS_monthArrangeBasic");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Map<String, Object> data = new HashMap<String, Object>();
		Collection<?> rec = this.getDataBySql(sql);
		data.put("data", rec);
		 
		//요일
		sql = properties.getString("mtr.h2.BUS_monthArrangeDetail2");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec2 = this.getDataBySql(sql);
			
		data.put("data2", rec2);
		
		sql = properties.getString("mtr.h2.BUS_monthArrangeDetail");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@offIncludeYn",vo.getOffIncludeYn());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec3 = this.getDataBySql(sql);
		data.put("data3", rec3);

		sql = properties.getString("mtr.h2.BUS_monthArrangeSP_other");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@empNm","");	// 전체조회시 
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@offIncludeYn",vo.getOffIncludeYn());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec4 = this.getDataBySql(sql);
		data.put("data4", rec4);

		
		return data;
		
	}	
	
	// table의 colume,index info
	public Object BUS_ViewMonthArrange_atttendOnly(CommonCodeVo vo) throws Exception {
		
		Map<String, Object> data = new HashMap<String, Object>();

		String sql = properties.getString("mtr.h2.BUS_monthArrangeDetail");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@offIncludeYn",vo.getOffIncludeYn());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec3 = this.getDataBySql(sql);
		data.put("data3", rec3);

		sql = properties.getString("mtr.h2.BUS_monthArrangeSP_other");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@empNm","");	// 전체조회시 
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@offIncludeYn","Y");
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec4 = this.getDataBySql(sql);
		data.put("data4", rec4);

		
		return data;
		
	}		
	// table의 colume,index info
	public Object BUS_ViewMonthArrange_ampm(CommonCodeVo vo) throws Exception {
		
		String sql = properties.getString("mtr.h2.BUS_monthArrangeBasic");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Map<String, Object> data = new HashMap<String, Object>();
		Collection<?> rec = this.getDataBySql(sql);
		data.put("data", rec);
		 
		//요일
		sql = properties.getString("mtr.h2.BUS_monthArrangeDetail2");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec2 = this.getDataBySql(sql);
			
		data.put("data2", rec2);
		
		sql = properties.getString("mtr.h2.BUS_monthArrangeDetail_ampm");
		sql = sql.replace("@companyNo",vo.getCompanyNo());
		sql = sql.replace("@routeNm",vo.getRouteNm());
		sql = sql.replace("@baseFirstYmd",vo.getBaseFirstYmd());
		sql = sql.replace("@baseYm",vo.getBaseYm());
		sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
		log.info(sql);
		Collection<?> rec3 = this.getDataBySql(sql);
		data.put("data3", rec3);

		return data;
		
	}		
	// table의 colume,index info
	public Object BUS_getRouteNmInfo(CommonCodeVo vo) throws Exception {
		String sql = properties.getString("mtr.h2.BUS_getRouteNmInfo");
		sql = sql.replace("@companyNo",vo.getCompanyNo());

		//log.info(sql);
		Map<String, Object> data = new HashMap<String, Object>();
		Collection<?> rec = this.getDataBySql(sql);
		data.put("data", rec);

			 
		return data;
		
	}	
	
	// table의 colume,index info
	public Object BUS_getCompanyInfo() throws Exception {
		String sql = properties.getString("mtr.h2.BUS_getCompanyInfo");
		//sql = sql.replace("@companyNo",vo.getCompanyNo());

		//log.info(sql);
		Map<String, Object> data = new HashMap<String, Object>();
		Collection<?> rec = this.getDataBySql(sql);
		data.put("data", rec);

			 
		return data;
		
	}		
	// table delete
	public void deleteInfoTable(CommonCodeVo vo,String tableName) throws Exception {
		if (vo.getFilterType() != null && vo.getFilterType().equals("insertOnly"))
			return;
		
		String sql = String.format("DELETE FROM %s WHERE company_no = '%s' ", tableName, vo.getCompanyNo() );
		if (vo.getBaseYm() != null && !vo.getBaseYm().isEmpty()) {
			sql = sql + String.format(" AND base_ym = '%s' ", vo.getBaseYm());
		}
		if (vo.getBaseYmd() != null && !vo.getBaseYmd().isEmpty()) {
			sql = sql + String.format(" AND base_ymd = '%s' ", vo.getBaseYmd());
		}
		if (vo.getRouteNm() != null && !vo.getRouteNm().isEmpty()) {
			sql = sql + String.format(" AND route_nm = '%s' ", vo.getRouteNm());
		}
		if (vo.getBaseYear() != null && !vo.getBaseYear().isEmpty()) {
			sql = sql + String.format(" AND base_year = '%s' ", vo.getBaseYear());
		}
		if (tableName.equals("TBM_COMMON_CODE_INFO") && !vo.getFilterText().isEmpty()) {
			sql = sql + String.format(" AND code_gb like '%s' || '%%' ", vo.getFilterText());
		}
		h2dao.execute(sql);
	}
	// update 전월 근무패턴
	public int updateTBM_DRIVERINFO_DETAIL(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		
	    List<Map<String, Object>> resultList2 = list.stream()
                .filter(h ->h.get("bit").equals("Y"))
                .collect(Collectors.toList());
	    
		  if (resultList2.size() > 0) {
			  String sql = h2dao.getupdateSql_tbm_driverInfo_detail(vo);
			  //log.info("sapdb [{}] inserting list :{}",tableNameSap, Arrays.toString(list.toArray()));
			  h2dao.batchInsert(sql,resultList2);
		  }	  
		  return  1;		
	}
	
	// update 배차정시성 사원명 변경
	public int modifyPunctualityEmpNm(CommonCodeVo vo) throws Exception {
		 return this.getH2DbMapper().modifyPunctualityEmpNm(vo);
		
	}
	
	
	// update 배차정시성 사원명 변경
	public int createEmpPointInfo(CommonCodeVo vo) throws Exception {
		 this.getH2DbMapper3().delete_TBM_EMP_POINT_INFO(vo);
		 this.getH2DbMapper3().insert_TBM_EMP_POINT_INFO(vo);
		
		 return 1;
	}	
	 
	// update 요일별 근무순번
	public int updateTBM_ROUTEWEEKSEQ_INFO(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		
	    List<Map<String, Object>> resultList2 = list.stream()
                .filter(h ->h.get("bit").equals("Y"))
                .collect(Collectors.toList());
	    
		  if (resultList2.size() > 0) {
			  String sql = h2dao.getupdateSql_tbm_routeWeekSeq_info(vo);
			  //log.info("sapdb [{}] inserting list :{}",tableNameSap, Arrays.toString(list.toArray()));
			  h2dao.batchInsert(sql,resultList2);
		  }	  
		  return  1;		
	}
	// update 감차정보
	public int updateTBM_ROUTEREDUCTION_INFO(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		
	    List<Map<String, Object>> resultList2 = list.stream()
                .filter(h ->h.get("bit").equals("Y"))
                .collect(Collectors.toList());
	    
		  if (resultList2.size() > 0) {
			  //토요일 감차 update
			  String sql = h2dao.getupdateSql_tbm_routeReduction_info(vo,7);
			  h2dao.batchInsert(sql,resultList2);

			  //일요일 감차 update
			  sql = h2dao.getupdateSql_tbm_routeReduction_info(vo,1);
			  h2dao.batchInsert(sql,resultList2);

		  }	  
		  return  1;		
	}
	// update 배차현황판
	public int monthArrangeReview(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		
	    List<Map<String, Object>> resultList2 = list.stream()
                .filter(h ->h.get("bit").equals("Y"))
                .collect(Collectors.toList());
	    
		  if (resultList2.size() > 0) {
			  String sql = h2dao.getupdateSql_arrangeDetail(vo);
			  //log.info("sapdb [{}] inserting list :{}",tableNameSap, Arrays.toString(list.toArray()));
			  h2dao.batchInsert(sql,resultList2);
		  }	  
		    List<Map<String, Object>> resultList3 = list.stream()
	                .filter(h ->h.get("bit").equals("D"))
	                .collect(Collectors.toList());
		    
			  if (resultList3.size() > 0) {
				  String sql = h2dao.getdeleteSql_arrangeDetail(vo);
				  //log.info("sapdb [{}] inserting list :{}",tableNameSap, Arrays.toString(list.toArray()));
				  h2dao.batchInsert(sql,resultList3);
			  }	  

		  return  1;		
	}
	// 타노선sp 삭제
	public int monthArrangeSPDelete(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		    List<Map<String, Object>> resultList3 = list.stream()
	                .filter(h ->h.get("bit").equals("D"))
	                .collect(Collectors.toList());
		    
			  if (resultList3.size() > 0) {
				  String sql = h2dao.getdeleteSql_arrangeDetail(vo);
				  //log.info("sapdb [{}] inserting list :{}",tableNameSap, Arrays.toString(list.toArray()));
				  h2dao.batchInsert(sql,resultList3);
			  }	  

		  return  1;		
	}

	// insert api 휴일정보
	public int insertApiHolidayInfo(CommonCodeVo vo,List<Map<String, Object>> list) throws Exception {
		
		  if (list.size() > 0) {
			  String sql = h2dao.getupdateSql_tbm_holiday_info(vo);
			  //log.info("sapdb [{}] inserting list :{}",tableNameSap, Arrays.toString(list.toArray()));
			  h2dao.batchInsert(sql,list);
		  }	  
		  return  1;		
	}
	
	/*
	 * 1. 기초데이타생성
	 */

	  public int initMONTH_ARRANGE(CommonCodeVo vo) throws Exception {
		  vo.setDispatchSeq(0);
		  vo.setArrangeStatus("작업중");
		  this.getH2DbMapper().deleteTBL_MONTH_ARRANGE_BASIC(vo);
		  this.getH2DbMapper().deleteTBL_MONTH_ARRANGE_DETAIL(vo);
		  //this.getH2DbMapper().deleteTBM_DRIVERINFO_DETAIL(vo);
	
		  this.getH2DbMapper().insertStep_0_TBM_MONTH_ARRANGE_STATUS(vo);
		  //this.getH2DbMapper().insertStep_0_TBM_ROUTEINFO_DETAIL(vo);
		  this.getH2DbMapper().insertStep_0_prevMonthInfo(vo);
		  this.getH2DbMapper().insertStep_0(vo);
		  this.getH2DbMapper().insertStep_1(vo);
		  this.getH2DbMapper().insertStep_2(vo);
		  this.getH2DbMapper().insertStep_2_8(vo);
		  this.getH2DbMapper().insertStep_2_9(vo);
		  this.getH2DbMapper().insertStep_3(vo);
		  this.getH2DbMapper().insertStep_4(vo);
		  this.getH2DbMapper().insertStep_5(vo);
		  this.getH2DbMapper().insertStep_5_SP(vo);
		  this.getH2DbMapper().insertStep_6(vo);
		  this.getH2DbMapper().insertStep_6_SP(vo);
		  return 1;
	  }		
	  
	  //사용안함
	  public int makeMONTH_ARRANGE(CommonCodeVo vo) throws Exception {
		  // 5,6삭제후 재생성
		  vo.setDispatchSeq(5);
		  this.getH2DbMapper().deleteTBL_MONTH_ARRANGE_DETAIL(vo);
	
		  this.getH2DbMapper().insertStep_5(vo);
		  this.getH2DbMapper().insertStep_5_SP(vo);
		  return 1;
	  }	  
	  /* 배차확정 
	   * 배차확정취소 
	   */
	  public int finishMONTH_ARRANGE(CommonCodeVo vo) throws Exception {
		 
		  this.getH2DbMapper().insertStep_0_TBM_MONTH_ARRANGE_STATUS(vo);
		  /*
		   * history 저장
		   */
		  this.getH2DbMapper().insertTBL_MONTH_ARRANGE_BASIC_FIX(vo);
		  this.getH2DbMapper().insertTBL_MONTH_ARRANGE_DETAIL_FIX(vo);
		  return 1;
	  }	  
	  
	  public int insertStep_0(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_0(vo);
	  }
	  public int insertStep_1(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_1(vo);
	  }
	  public int insertStep_2(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_2(vo);
	  }		
	  public int insertStep_3(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_3(vo);
	  }		
	  public int insertStep_4(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_4(vo);
	  }		
	  public int insertStep_5(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_5(vo);
	  }		
	  public int insertStep_5_SP(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().insertStep_5_SP(vo);
	  }		
	  // 타 SP 등록
	  // insert후 select할때 타sp의 휴가정보를 가져온다. 반드시 저장해야 반영됨
	  public Object insertStep_5_SP_other(CommonCodeVo vo) throws Exception {
		  this.getH2DbMapper().insertStep_5_SP_other(vo);
			  
		  vo.setOffIncludeYn("N");
		  // 신규 SP배차정보 조회
			String sql = properties.getString("mtr.h2.BUS_monthArrangeSP_other");
			sql = sql.replace("@companyNo",vo.getCompanyNo());
			sql = sql.replace("@routeNm",vo.getRouteNm());
			sql = sql.replace("@baseYm",vo.getBaseYm());
			sql = sql.replace("@empNm",vo.getEmpNm());
			sql = sql.replace("@offIncludeYn",vo.getOffIncludeYn());
			sql = sql.replace("@initSeq",String.valueOf(vo.getInitSeq()));
			//log.info(sql);
			Collection<?> result = this.getDataBySql(sql);
			
					  
			return result;		  
	  }		
	  public Object getAccidentInputOption(CommonCodeVo vo) throws Exception {
			Map<String, Object> data = new HashMap<String, Object>();

			Object primaryColumns = h2dao.getPrimaryColumns(vo);
			data.put("primaryColumns",primaryColumns);

			List<Map<String, Object>> optionList = this.getH2DbMapper().select_accident_option(vo);
			data.put("optionList",optionList);
			
/*
			String sql = properties.getString("mtr.h2.BUS_getRouteNmInfo");
			sql = sql.replace("@companyNo",vo.getCompanyNo());
			Collection<?> rec = this.getDataBySql(sql);
			data.put("routeNmList", rec);
			
			sql = properties.getString("mtr.h2.BUS_getCarNoInfo");
			sql = sql.replace("@companyNo",vo.getCompanyNo());
			Collection<?> rec2 = this.getDataBySql(sql);
			data.put("carNoList", rec2);
*/
			return data;		  
	  }	  
	  public Object getEmpWorkingLogInputOption(CommonCodeVo vo) throws Exception {
			Map<String, Object> data = new HashMap<String, Object>();

			Object primaryColumns = h2dao.getPrimaryColumns(vo);
			data.put("primaryColumns",primaryColumns);

			List<Map<String, Object>> optionList = this.getH2DbMapper().select_EmpWorkingLogInputOption(vo);
			data.put("optionList",optionList);
			
			return data;		  
	  }	  
	  public Object getEmpWorkingTimeView(CommonCodeVo vo) throws Exception {
			Map<String, Object> data = new HashMap<String, Object>();

			List<Map<String, Object>> headerList = this.getH2DbMapper().select_empWorkingTimeViewHeader(vo);
			data.put("header",headerList);
			
			List<Map<String, Object>> dataList = this.getH2DbMapper().select_empWorkingTimeView(vo);
			data.put("data",dataList);

			return data;		  
	  }	  
	  public Object getEmpWorkingKMView(CommonCodeVo vo) throws Exception {
			Map<String, Object> data = new HashMap<String, Object>();

			List<Map<String, Object>> headerList = this.getH2DbMapper().select_empWorkingTimeViewHeader(vo);
			data.put("header",headerList);
			
			List<Map<String, Object>> dataList = this.getH2DbMapper().select_empWorkingKMView(vo);
			data.put("data",dataList);

			return data;		  
	  }	  

	  public Object getPrimaryColumns(CommonCodeVo vo) throws Exception {
			Map<String, Object> data = new HashMap<String, Object>();

			Object primaryColumns = h2dao.getPrimaryColumns(vo);
			data.put("primaryColumns",primaryColumns);

			return data;		  
	  }	  

	  public String validationCheck(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		  StringBuffer msg = new StringBuffer();
		  if (list.size() > 0) {
			  //후속작업
			  // 행정민원 등록
			  // emp_nm 확인
			  int retCnt = 0;
			  String empNm = "";
			  String carNo = "";
			  String routeNm = "";
			  if (tableName.equals("TBL_PUBLIC_COMPLAINT_INFO")) {
				  for (Map<String, Object> map : list) { 
					  empNm = map.get("emp_nm").toString();
					  vo.setEmpNm( empNm );
					  retCnt = this.getH2DbMapper3().select_validationCheck_empNm(vo);
					  if (retCnt == 0) {
						  msg.append(String.format("미등록  기사 : [%s]\n",empNm));
					  } else if (retCnt > 1) {
						  msg.append(String.format("동명이인 존재 : [%s]\n",empNm));
					  }
					  
					  carNo = map.get("car_no").toString();
					  vo.setCarNo( carNo );
					  retCnt = this.getH2DbMapper3().select_validationCheck_carNo(vo);
					  if (retCnt == 0) {
						  msg.append(String.format("미등록 차량번호 : [%s]\n",carNo));
					  }
					  
					  routeNm = map.get("route_nm").toString();
					  vo.setRouteNm( routeNm );
					  retCnt = this.getH2DbMapper3().select_validationCheck_routeNm(vo);
					  if (retCnt == 0) {
						  msg.append(String.format("미등록 노선 : [%s]\n",routeNm));
					  }
				  }
			  }
		  }
		  try {
			  if (msg.length() == 0)	
				  return  null;
			  else {
				  vo.setErrorMsg(msg.toString());
				  return "error";
			  }
		  } catch (Exception e) {
			  return  null;			  
		  }
	  }

	  
	  public int insertInfo(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		  String insertSql = h2dao.getInsertSql(vo,tableName);
		  if (list.size() > 0) {
			  h2dao.batchInsert(insertSql,list);
			  
			  //후속작업
			  // 배차정시성 분석결과 저장시 기사명 맵핑(isc운행횟수에서 가져옴)
			  if (tableName.equals("TBL_ARRANGE_PUNCTUALITY_ANALIZE")) {
				  this.batchUpdateArrangePunctualityAnalEmpNm(vo);
			  }
			  // 배차정시성 최초 upload시 기사명 맵핑(isc운행횟수에서 가져옴)
			  if (tableName.equals("TBL_ARRANGE_PUNCTUALITY_INFO")) {
				  this.batchUpdateArrangePunctualityEmpNm(vo);
			  }
			  // 기사정보 upload시 입사일자 변경
			  if (tableName.equals("TBL_EMPLOYEEINFO")) {
				  this.getH2DbMapper().updateEmployeeInfoEnterDate(vo);
			  }
			  // 운전자정보 upload시 입사일자 변경
			  if (tableName.equals("TBL_DRIVERINFO")) {
				  this.getH2DbMapper().updateDriverInfoEnterDate(vo);
			  }
			  // 해당운전자의 노선정보 update
			  if (tableName.equals("TBL_DANGER_DRIVING_INFO")) {
				  this.getH2DbMapper().updateDangerDrivingRouteNm(vo);
			  }
			  
		  }	  
		  return  1;
	  }

	  
	  public int mergeInfo(CommonCodeVo vo,List<Map<String, Object>> list,String tableName) throws Exception {
		  String mergeSql = h2dao.getMergeSql(vo,tableName);
		  if (list.size() > 0) {
			  h2dao.batchInsert(mergeSql,list);

			  //후속작업
			  // isc 운행횟수 등록시 일별집계 배치 기동
			  if (tableName.equals("TBL_DRIVING_RECORD")) {
				  this.getH2DbMapper3().delete_TBB_DRIVING_RECORD_DAY(vo);
				  this.getH2DbMapper3().insert_TBB_DRIVING_RECORD_DAY(vo);
				  List<Map<String, Object>> checkList = this.getH2DbMapper().select_checkDrivingRecord_duplicationNm(vo);
				  if (checkList.size() > 0) {
					  this.getH2DbMapper3().delete_TBL_DRIVING_RECORD_dup(vo);
					  this.getH2DbMapper3().delete_TBB_DRIVING_RECORD_DAY_dup(vo);
					  
					  //return -1;
				  }
			  }
			  // isc운전자정보의 기사명을 driverInfo의 기사명으로 update (문영식 중복, 문영식C와 문영식으로 구분하기위해)
			  if (tableName.equals("TBL_ISC_DRIVER_INFO")) {
				  this.getH2DbMapper().updateIscDriverInfo_empNm(vo);
			  }
			  
		  }	  
		  return  1;
	  }

	  public int insertAttendanceInfo(AttendanceInfoVo vo) throws Exception {
		  //휴가등록시 해당노선의 배차상태 체크
		  int nCount = this.getH2DbMapper().getArrangeStatusCount(vo);
		  if (nCount > 0) {
			  throw new BusinessException("휴가등록불가:해당월 배차정보존재",ErrorCode.INVALID_INSERT_OFFDAY); 				  
		  }
		  return this.getH2DbMapper().insertAttendanceInfo(vo);
	  }
	  // 배차화면에서 휴가등록시
	  // 근태등록 + 배차에서 d1~d31 중 '@' 추가
	  public String insertAttendanceInfo_after(AttendanceInfoVo vo) throws Exception {
		  this.getH2DbMapper().insertAttendanceInfo(vo);
		  //this.getH2DbMapper().insertAttendanceInfo_after(vo);
		  
		  //if (vo.getStartDate().equals(vo.getEndDate()))	return 1;
		  
		  int startYm = Integer.parseInt(vo.getStartDate().substring(8));
		  int endYm = Integer.parseInt(vo.getEndDate().substring(8));
		  List<Map<String, Object>> dayList = new ArrayList<Map<String, Object>>();
		  StringBuffer str1 = new StringBuffer();
		  for (int i=startYm; i<=endYm; i++) {
			  Map<String, Object> dayMap = new HashMap<String, Object>();
				dayMap.put("key", String.format("d%d", i));
				
				dayList.add(dayMap);
				str1.append(i);
				str1.append(",");
		  }
		  vo.setDayList(dayList);
		  this.getH2DbMapper().insertAttendanceInfo_after_term(vo);
		  /*
		  
		  
			Map<String, Object> dayMap = new HashMap<String, Object>();
			dayMap.put("key", "d1");
			
			dayList.add(dayMap);
		  
			vo.setDayList(dayList);
		
			  this.getH2DbMapper().insertAttendanceInfo_after_term(vo);
			  */
		    if(str1.isEmpty()) {
		    	return "";
		    }
			return str1.substring(0,str1.length()-1);
	  }

	  public int insertTBM_ROUTE_COMMON_INFO(AttendanceInfoVo vo) throws Exception {
		  return  this.getH2DbMapper().insertTBM_ROUTE_COMMON_INFO(vo);
	  }	  

	  
	  public int updateAttendanceInfo(AttendanceInfoVo vo) throws Exception {
		  return  this.getH2DbMapper().updateAttendanceInfo(vo);
	  }	  
	  public int deleteAttendanceInfo(AttendanceInfoVo vo) throws Exception {
		  //휴가등록시 해당노선의 배차상태 체크
		  int nCount = this.getH2DbMapper().getArrangeStatusCount(vo);
		  if (nCount > 0) {
			  throw new BusinessException("휴가등록불가:해당월 배차정보존재",ErrorCode.INVALID_INSERT_OFFDAY); 				  
		  }
		  return  this.getH2DbMapper().deleteAttendanceInfo(vo);
	  }
	  
	  public int insertHolidayInfo(HolidayInfoVo vo) throws Exception {
		  return this.getH2DbMapper().insertHolidayInfo(vo);
	  }
	  public int updateHolidayInfo(HolidayInfoVo vo) throws Exception {
		  return  this.getH2DbMapper().updateHolidayInfo(vo);
	  }	  
	  public int deleteHolidayInfo(HolidayInfoVo vo) throws Exception {
		  return  this.getH2DbMapper().deleteHolidayInfo(vo);
	  }			  

	  // 배차정시성 분석결과 저장시 기사명 update(isc운전횟수에서 기사명 추출
	  public int batchUpdateArrangePunctualityAnalEmpNm(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().batchUpdateArrangePunctualityAnalEmpNm(vo);
	  }			  
	  // 배차정시성 최초저장시 기사명 update(isc운전횟수에서 기사명 추출
	  public int batchUpdateArrangePunctualityEmpNm(CommonCodeVo vo) throws Exception {
		  return  this.getH2DbMapper().batchUpdateArrangePunctualityEmpNm(vo);
	  }			  
		
		// **************************************************************************    
		// 승무지시서 excel 생성
		// **************************************************************************    
		public Object viewDailyArrangeOrderAll(CommonCodeVo vo)    throws  Exception {
			Map<String, Object> data = new HashMap<String, Object>();

		    List<Map<String, Object>> routeList = this.getH2DbMapper().select_getListRouteDrivingOrder(vo);
			
			for (Map<String, Object> map : routeList) { 
				// 해당 노선의 해당일자 배차정보 가져오기
			    vo.setRouteNm(map.get("FILE_ID").toString());
				List<Map<String, Object>> rec = this.getH2DbMapper().select_getDailyArrangeInfoAll(vo);
				data.put("head_"+vo.getRouteNm(), map.get("TITLE").toString());
				data.put("data_"+vo.getRouteNm(), rec);

			}
			// 당일 휴무자명단
			List<Map<String, Object>> offList = this.getH2DbMapper().select_getDailyOffList(vo);
			data.put("offList", offList);

			// 타노선 근무자
			List<Map<String, Object>> otherSPList = this.getH2DbMapper().select_getDailyOtherSPList(vo);
			data.put("otherSPList", otherSPList);
			
		    return data;
		}

		// table의 colume,index info
		public Object LOAD_getMenuInfo() throws Exception {
			String sql = properties.getString("mtr.h2.BUS_getCompanyInfo");
			//sql = sql.replace("@companyNo",vo.getCompanyNo());

			//log.info(sql);
			Map<String, Object> data = new HashMap<String, Object>();
			Collection<?> rec = this.getDataBySql(sql);
			data.put("data", rec);

				 
			return data;
			
		}
		
		  public MenuVo getMainFramMenuInfo(CommonCodeVo vo) throws Exception {
				//Map<String, Object> data = new HashMap<String, Object>();
			  MenuVo menuVo = new MenuVo();
			  List list = this.getH2DbMapper().select_getMainFrameMenuInfo(vo);
				//data.put("map",menuList);
				menuVo.setList(list);
				return menuVo;		  
		  }	 	
		  public List<Map<String,Object>> getMenuInfo(CommonCodeVo vo) throws Exception {
			  List<Map<String, Object>> optionList = this.getH2DbMapper().select_getMenuInfo(vo);
			  return optionList;		  
		  }			  
}
