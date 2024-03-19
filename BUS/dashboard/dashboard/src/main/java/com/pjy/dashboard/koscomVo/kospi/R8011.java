package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class R8011 extends KoscomCommonVo {
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
	@FieldInfo(korName="보드ID",length=2)
	private String board_id;
	@FieldInfo(korName="매매체결처리시각",length=9)
	private String vi_contr_time;
	@FieldInfo(korName="VI해제시각",length=9)
	private String vi_oc_time;
	@FieldInfo(korName="VI적용구분코드",length=1)
	private String vi_gubun;
	@FieldInfo(korName="VI종류코드",length=1)
	private String vi_code;
	@FieldInfo(korName="정적VI발동기준가격",length=9)
	private String vi_st_gijun_prc;
	@FieldInfo(korName="동적VI발동기준가격",length=9)
	private String vi_dy_gijun_prc;
	@FieldInfo(korName="VI발동가격",length=9)
	private String vi_run_prc;
	@FieldInfo(korName="정적VI발동가격괴리율",length=13,decimalPoint = 6)
	private String vi_st_diff_rt;
	@FieldInfo(korName="동적VI발동가격괴리율",length=13,decimalPoint = 6)
	private String vi_dy_diff_rt;
	@FieldInfo(korName="FILLER",length=2)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
