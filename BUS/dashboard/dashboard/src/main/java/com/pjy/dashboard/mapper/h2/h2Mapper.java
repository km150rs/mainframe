package com.pjy.dashboard.mapper.h2;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.pjy.dashboard.domain.CommonCodeVo;
import com.pjy.dashboard.domain.HolidayInfoVo;
import com.pjy.dashboard.domain.MenuVo;
import com.pjy.dashboard.domain.AttendanceInfoVo;

@Mapper
public interface h2Mapper {

	public List<Map<String,Object>> select_checkDrivingRecord_duplicationNm(CommonCodeVo vo) throws Exception ;

	public List<Map<String,Object>> select_empWorkingTimeViewHeader(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_empWorkingTimeView(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_empWorkingKMView(CommonCodeVo vo) throws Exception ;

	public List<Map<String,Object>> select_EmpWorkingLogInputOption(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_accident_option(CommonCodeVo vo) throws Exception ;
	public int modifyPunctualityEmpNm(CommonCodeVo vo) throws Exception ;
	public int batchUpdateArrangePunctualityEmpNm(CommonCodeVo vo) throws Exception ;
	public int batchUpdateArrangePunctualityAnalEmpNm(CommonCodeVo vo) throws Exception ;

	public List<Map<String,Object>> select_PunctualityAnalize_route(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_PunctualityAnalize_month(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_PunctualityAnalize_day(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_PunctualityAnalize_emp(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_PunctualityAnalize_detail(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_PunctualityAnalize_empDetail(CommonCodeVo vo) throws Exception ;

	public List<Map<String,Object>> select_uploadStatus_Punctuality_year(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_uploadStatus_Punctuality_month(CommonCodeVo vo) throws Exception ;
	
	public List<Map<String,Object>> select_uploadStatus_iscDrivingRecord_year(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_uploadStatus_iscDrivingRecord_month(CommonCodeVo vo) throws Exception ;

	public List<Map<String,Object>> select_uploadStatus_dangerDriving_year(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getAccidentAge(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getAccidentEnterDate(CommonCodeVo vo) throws Exception ;
	
	public List<Map<String,Object>> select_getListRouteDrivingOrder(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getDrivingOrder(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getDailyArrangeInfo(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getDailyOffList(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getDailyOtherSPList(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getDailyArrangeInfoAll(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getEmployeeCard(CommonCodeVo vo) throws Exception ;

	public int getArrangeStatusCount(AttendanceInfoVo vo) throws Exception ;
	
	public int deleteTBL_MONTH_ARRANGE_STATUS(CommonCodeVo vo) throws Exception ;
	public int deleteTBL_MONTH_ARRANGE_BASIC(CommonCodeVo vo) throws Exception ;
	public int deleteTBL_MONTH_ARRANGE_DETAIL(CommonCodeVo vo) throws Exception ;
	public int deleteTBM_DRIVERINFO_DETAIL(CommonCodeVo vo) throws Exception ;
	
	public int updateEmployeeInfoEnterDate(CommonCodeVo vo) throws Exception ;
	public int updateDriverInfoEnterDate(CommonCodeVo vo) throws Exception ;
	public int updateIscDriverInfo_empNm(CommonCodeVo vo) throws Exception ;

	public int updateDangerDrivingRouteNm(CommonCodeVo vo) throws Exception ;

	public int insertStep_0(CommonCodeVo vo) throws Exception ;
	public int insertStep_0_prevMonthInfo(CommonCodeVo vo) throws Exception ;
	public int insertStep_0_TBM_MONTH_ARRANGE_STATUS(CommonCodeVo vo) throws Exception ;
	public int insertStep_0_TBM_ROUTEINFO_DETAIL(CommonCodeVo vo) throws Exception ;
	public int insertStep_1(CommonCodeVo vo) throws Exception ;
	public int insertStep_2(CommonCodeVo vo) throws Exception ;
	public int insertStep_2_8(CommonCodeVo vo) throws Exception ;
	public int insertStep_2_9(CommonCodeVo vo) throws Exception ;
	public int insertStep_3(CommonCodeVo vo) throws Exception ;
	public int insertStep_4(CommonCodeVo vo) throws Exception ;
	public int insertStep_5(CommonCodeVo vo) throws Exception ;
	public int insertStep_5_SP(CommonCodeVo vo) throws Exception ;
	public int insertStep_5_SP_other(CommonCodeVo vo) throws Exception ;
	public int insertStep_6(CommonCodeVo vo) throws Exception ;
	public int insertStep_6_SP(CommonCodeVo vo) throws Exception ;

	public int insertAttendanceInfo_after_term(AttendanceInfoVo vo) throws Exception ;
	public int insertAttendanceInfo_after(AttendanceInfoVo vo) throws Exception ;
	public int insertAttendanceInfo(AttendanceInfoVo vo) throws Exception ;
	public int updateAttendanceInfo(AttendanceInfoVo vo) throws Exception ;
	public int deleteAttendanceInfo(AttendanceInfoVo vo) throws Exception ;
	public int insertTBM_ROUTE_COMMON_INFO(AttendanceInfoVo vo) throws Exception ;

	public int insertHolidayInfo(HolidayInfoVo vo) throws Exception ;
	public int updateHolidayInfo(HolidayInfoVo vo) throws Exception ;
	public int deleteHolidayInfo(HolidayInfoVo vo) throws Exception ;

	//public int finishTBL_MONTH_ARRANGE_DETAIL(CommonCodeVo vo) throws Exception ;
	public int insertTBL_MONTH_ARRANGE_BASIC_FIX(CommonCodeVo vo) throws Exception ;
	public int insertTBL_MONTH_ARRANGE_DETAIL_FIX(CommonCodeVo vo) throws Exception ;
	
	public List<MenuVo> select_getMainFrameMenuInfo(CommonCodeVo vo) throws Exception ;
	public List<Map<String,Object>> select_getMenuInfo(CommonCodeVo vo) throws Exception ;
	
}
