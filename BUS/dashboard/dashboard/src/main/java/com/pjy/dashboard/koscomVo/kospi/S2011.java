package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class S2011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="종목일련번호",length=8)
	private String seq;
	@FieldInfo(korName="일자",length=8)
	private String ymd;
	@FieldInfo(korName="사무수탁회사번호",length=3)
	private String offi_no;
	@FieldInfo(korName="구성종목수",length=4)
	private String unit_qty;
	@FieldInfo(korName="구성종목코드",length=12)
	private String unit_cd;
	@FieldInfo(korName="구성종목명",length=80)
	private String unit_name;
	@FieldInfo(korName="구성비",length=7)
	private String unit_rate;
	@FieldInfo(korName="FILLER",length=60)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
