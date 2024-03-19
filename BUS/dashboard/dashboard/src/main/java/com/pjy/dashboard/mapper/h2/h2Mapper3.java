package com.pjy.dashboard.mapper.h2;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.pjy.dashboard.domain.CommonCodeVo;
import com.pjy.dashboard.domain.HolidayInfoVo;
import com.pjy.dashboard.domain.AttendanceInfoVo;

@Mapper
public interface h2Mapper3 {

	public int insert_TBB_DRIVING_RECORD_DAY(CommonCodeVo vo) throws Exception ;
	public int delete_TBB_DRIVING_RECORD_DAY(CommonCodeVo vo) throws Exception ;
	public int delete_TBL_DRIVING_RECORD_dup(CommonCodeVo vo) throws Exception ;
	public int delete_TBB_DRIVING_RECORD_DAY_dup(CommonCodeVo vo) throws Exception ;

	public int insert_TBM_EMP_POINT_INFO(CommonCodeVo vo) throws Exception ;
	public int delete_TBM_EMP_POINT_INFO(CommonCodeVo vo) throws Exception ;
	
	public int select_validationCheck_empNm(CommonCodeVo vo) throws Exception ;
	public int select_validationCheck_carNo(CommonCodeVo vo) throws Exception ;
	public int select_validationCheck_routeNm(CommonCodeVo vo) throws Exception ;

	public List<Map<String,Object>> select_TBB_DRIVING_RECORD_baseYm() throws Exception ;
	public List<Map<String,Object>> select_TBM_EMP_POINT_INFO(CommonCodeVo vo) throws Exception ;
	
	
}
