package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class D4011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="업종코드",length=3)
	private String up_cd;
	@FieldInfo(korName="시간",length=6)
	private String time;
	@FieldInfo(korName="지수",length=8)
	private String jisu;
	@FieldInfo(korName="부호",length=1)
	private String sign;
	@FieldInfo(korName="대비",length=8)
	private String daebi;
	@FieldInfo(korName="체결수량",length=8)
	private String contr_qty;
	@FieldInfo(korName="거래대금",length=8)
	private String trd_amt;
	@FieldInfo(korName="FILLER",length=2)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
