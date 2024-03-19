package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class A6011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",pk=true,length=12)
	private String std_cd;
	@FieldInfo(korName="종목일련번호",length=5)
	private String seq;
	@FieldInfo(korName="보드ID",length=2)
	private String board_id;
	@FieldInfo(korName="종목마감종가",length=9)
	private String close_prc;
	@FieldInfo(korName="종목마감가격구분코드",length=1)
	private String close_gb;
	@FieldInfo(korName="종목마감시간외단일가상한가",length=9)
	private String ot_dan_high_prc;
	@FieldInfo(korName="종목마감시간외단일가하한가",length=9)
	private String ot_dan_low_prc;
	@FieldInfo(korName="종목마감평균가중주가",length=9)
	private String add_avg_prc;
	@FieldInfo(korName="매입인도기준가격",length=9)
	private String buy_std_prc;
	@FieldInfo(korName="매입인도상한가",length=9)
	private String buy_high_prc;
	@FieldInfo(korName="매입인도하한가",length=9)
	private String buy_low_prc;
	@FieldInfo(korName="FILLER",length=1)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;		
}
