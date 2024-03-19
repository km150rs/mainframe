package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class S3011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="시간",length=6)
	private String etn_time;
	@FieldInfo(korName="전일IV",length=9)
	private String etn_bf_iv;
	@FieldInfo(korName="장중/최종IV",length=9)
	private String etn_iv;
	@FieldInfo(korName="FILLER",length=28)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
