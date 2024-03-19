package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class C4011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="FILLER",length=8)
	private String filler;
	@FieldInfo(korName="보드ID",length=2)
	private String board_id;
	@FieldInfo(korName="체결가격",length=9)
	private String contr_prc;
	@FieldInfo(korName="체결수량",length=10)
	private String contr_qty;
	@FieldInfo(korName="세션ID",length=2)
	private String session_id;
	@FieldInfo(korName="누적체결수량",length=12)
	private String vol;
	@FieldInfo(korName="누적거래대금",length=18)
	private String amt;
	@FieldInfo(korName="체결시각",length=6)
	private String contr_time;
	@FieldInfo(korName="FILLER",length=6)
	private String filler2;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
