package com.pjy.dashboard.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pjy.dashboard.service.DynamicSqlBatch;

import lombok.extern.slf4j.Slf4j;
/*
 * 초(0-59)   분(0-59)　　시간(0-23)　　일(1-31)　　월(1-12)　　요일(0-7)
 * 각 별 위치에 따라 주기를 다르게 설정 할 수 있다.
 * 순서대로 초-분-시간-일-월-요일 순이다. 그리고 괄호 안의 숫자 범위 내로 별 대신 입력 할 수도 있다.
 * 요일에서 0과 7은 일요일이며, 1부터 월요일이고 6이 토요일이다
 * 초 : 0~59
분 : 0~59
시 : 0~23
일 : 1~31
월 : 1~12 혹은 JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC
요일 : 1~7 혹은 SUN MON TUE WED THU FRI SAT
 * * : 모든 값
? : 설정 없음 (일과 요일만 사용 가능)
, : 배열 ex) 1,5,8 : 1,5,8에만
- : 앞부터 뒤까지 ex) 1-3 : 1부터 3까지
/ : 앞부터 뒤마다 ex) 1/3 : 1부터 매3마다 1,4,7,11...
 */

@Slf4j
@Component
public class DailyScheduler {
	
// @Scheduled(fixedDelay = 1000) // 1초에 한번 실행된다.
// @Scheduled(cron = "*/10 * * * * *")	// 10초마다실행
	 
   @Autowired
   DynamicSqlBatch dynamicSqlBatch;

   @Scheduled(cron = "0 41 22 * * *")	// 오전 7시 실행
   public void Sch_dailyBatchJob() {

	   //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	   //Date now = new Date();
	   //String strDate = sdf.format(now);

	   try {
		   //배치로 처리하려했으나 자료 upload시 처리하도록 변경  
		   log.info("DailyScheduler insert_TBB_DRIVING_RECORD_DAY start...");
		   dynamicSqlBatch.insert_TBB_DRIVING_RECORD_DAY();
		   log.info("DailyScheduler insert_TBB_DRIVING_RECORD_DAY end...");
		   
/* 근태등록자료에서 소숫점 절사
 * 	UPDATE TBM_EMP_WORKING_LOG
		set			DETAIL_DESC = round(CONVERT(DETAIL_DESC ,number),3)
	WHERE code_type2 = '정시성 위반율'		   
 */
		   
	   } catch (Exception e) {
		   e.printStackTrace();
	   }
   }         

   @Scheduled(cron = "0 40 14 * * *")	// 오전 7시 실행
   public void Sch_dailyBackup() {

	   //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	   //Date now = new Date();
	   //String strDate = sdf.format(now);

	   try {
		   //배치로 처리하려했으나 자료 upload시 처리하도록 변경  
		   log.info("DailyScheduler Sch_dailyBackup start...");
		   dynamicSqlBatch.dailyBackup();
		   log.info("DailyScheduler Sch_dailyBackup end...");
		   
/* 근태등록자료에서 소숫점 절사
 * 	UPDATE TBM_EMP_WORKING_LOG
		set			DETAIL_DESC = round(CONVERT(DETAIL_DESC ,number),3)
	WHERE code_type2 = '정시성 위반율'		   
 */
		   
	   } catch (Exception e) {
		   e.printStackTrace();
	   }
   }         
   
}