package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class TJ extends KoscomCommonVo {
	@FieldInfo(korName="data구분",length=2)
	private String data_gb;
	@FieldInfo(korName="seq",length=5)
	private String seq;
	@FieldInfo(korName="검색코드(1-27)",length=5)
	private String std_code;
	@FieldInfo(korName="업종명",length=80)
	private String std_name;
	@FieldInfo(korName="전일시가(소수점아래2자리)",length=8)
	private String yes_s_jisu;
	@FieldInfo(korName="전일고가(소수점아래2자리)",length=8)
	private String yes_h_jisu;
	@FieldInfo(korName="전일저가(소수점아래2자리)",length=8)
	private String yes_l_jisu;
	@FieldInfo(korName="전일종가(소수점아래2자리)",length=8)
	private String yes_e_jisu;	
}
