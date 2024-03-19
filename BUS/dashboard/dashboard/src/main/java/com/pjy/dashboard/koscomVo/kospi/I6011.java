package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class I6011 extends KoscomCommonVo {
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
	@FieldInfo(korName="이벤트종류코드",length=2)
	private String event_cd;
	@FieldInfo(korName="이벤트발생사유코드",length=4)
	private String event_caus_cd;
	@FieldInfo(korName="개시일자,시작일자,적용일자",length=8)
	private String start_dt;
	@FieldInfo(korName="만료일자,종료일자",length=8)
	private String end_dt;
	@FieldInfo(korName="FILLER",length=2)
	private String filler2;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;
}
