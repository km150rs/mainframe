package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class F7011 extends KoscomCommonVo {
	@FieldInfo(korName="F7",length=2)
	private String data_gb;
	@FieldInfo(korName="01:주식",length=2)
	private String info_gb;
	@FieldInfo(korName="1:유가증권",length=1)
	private String market_gb;
	@FieldInfo(korName="ETF종목코드",length=12)
	private String etf_std_cd;
	@FieldInfo(korName="시간",length=6)
	private String tm;
	@FieldInfo(korName="9999999V99",length=9)
	private String yes_nav;
	@FieldInfo(korName="9999999V99",length=9)
	private String last_nav;
	@FieldInfo(korName="추적오차율부호",length=1)
	private String mis_rt_sign;
	@FieldInfo(korName="추적오차율",length=9)
	private String mis_rt;
	@FieldInfo(korName="괴리율부호",length=1)
	private String diff_rt_sign;
	@FieldInfo(korName="괴리율",length=9)
	private String diff_rt;
	@FieldInfo(korName="SPACE",length=8)
	private String filler;
	@FieldInfo(korName="0xff",length=1)
	private String ff;
	@FieldInfo(korName="0x0d",length=1)
	private String cr;
	@FieldInfo(korName="0x0a",length=1)
	private String lf;
}
