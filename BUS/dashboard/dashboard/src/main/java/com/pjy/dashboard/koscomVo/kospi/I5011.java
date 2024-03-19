package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class I5011 extends KoscomCommonVo {
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
	@FieldInfo(korName="결산월일",length=4)
	private String close_day;
	@FieldInfo(korName="ff",length=1)
	private String ff;
	@FieldInfo(korName="cr",length=1)
	private String cr;
	@FieldInfo(korName="lf",length=1)
	private String lf;	
}
