package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class S1011 extends KoscomCommonVo {
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
	@FieldInfo(korName="최종지표가치",length=9)
	private String last_iv;
	@FieldInfo(korName="지표가치금액",length=15)
	private String iv_amt1;
	@FieldInfo(korName="전일과표기준가격",length=9)
	private String iv_amt2;
	@FieldInfo(korName="전일배당과표기준가격",length=9)
	private String iv_amt3;
	@FieldInfo(korName="전일현금배당금액",length=12)
	private String iv_amt4;
	@FieldInfo(korName="전전일가격과표기준가격",length=9)
	private String iv_amt5;
	@FieldInfo(korName="FILLER",length=11)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;
}
