package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class R3011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="종목일련번호",length=5)
	private String seq;
	@FieldInfo(korName="공개정보구분코드",length=3)
	private String op_inf_gb;
	@FieldInfo(korName="공개시각",length=6)
	private String op_time;
	@FieldInfo(korName="회원번호",length=5)
	private String member_no;
	@FieldInfo(korName="회원제재범위코드",length=5)
	private String member_jj_gb;
	@FieldInfo(korName="FILLER",length=8)
	private String filler;
	@FieldInfo(korName="FF",length=1)
	private String ff;
	@FieldInfo(korName="CR",length=1)
	private String cr;
	@FieldInfo(korName="LF",length=1)
	private String lf;
}
