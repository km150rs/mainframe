package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class F8011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="ETF코드",length=12)
	private String etf_cd;
	@FieldInfo(korName="데이터일련번호",length=8)
	private String seq;
	@FieldInfo(korName="일자",length=8)
	private String ymd;
	@FieldInfo(korName="사무수탁회사번호",length=3)
	private String offi_no;
	@FieldInfo(korName="구성종목수",length=4)
	private String unit_qty;
	@FieldInfo(korName="구성종목코드",length=12)
	private String unit_cd;
	@FieldInfo(korName="1CU단위증권수",length=18)
	private String st_cnt_1cu;
	@FieldInfo(korName="구성종목시장구분",length=1)
	private String unit_market_gb;
	@FieldInfo(korName="구성종목명",length=40)
	private String unit_name;
	@FieldInfo(korName="액면금액",length=18)
	private String face_prc;
	@FieldInfo(korName="이익분배기준일",length=8)
	private String profit_date;
	@FieldInfo(korName="평가가격",length=18)
	private String valuat_prc;
	@FieldInfo(korName="SPACE",length=4)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
