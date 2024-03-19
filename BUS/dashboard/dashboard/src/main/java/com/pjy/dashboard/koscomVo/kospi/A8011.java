package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class A8011 extends KoscomCommonVo {
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
	@FieldInfo(korName="보드ID",length=2)
	private String board_id;
	@FieldInfo(korName="기준가격",length=9)
	private String std_prc;
	@FieldInfo(korName="상한가",length=9)
	private String std_high_prc;
	@FieldInfo(korName="하한가",length=9)
	private String std_low_prc;
	@FieldInfo(korName="평가가격",length=9)
	private String valuat_prc;
	@FieldInfo(korName="최고호가가격",length=9)
	private String high_hoga_prc;
	@FieldInfo(korName="최저호가가격",length=9)
	private String low_hoga_prc;
	@FieldInfo(korName="시가기준가격여부",length=1)
	private String bas_sprc_yn;
	@FieldInfo(korName="락구분코드",length=2)
	private String rak_gb;
	@FieldInfo(korName="액면가변경구분코드",length=2)
	private String chg_face_gb;
	@FieldInfo(korName="매매수량단위",length=11)
	private String trade_unit;
	@FieldInfo(korName="상장주식수",length=16)
	private String list_qty;
	@FieldInfo(korName="정리매매여부",length=1)
	private String rearange_yn;
	@FieldInfo(korName="장개시전시간외종가가능여부",length=1)
	private String bef_ovtm_cprc_yn;
	@FieldInfo(korName="FILLER",length=4)
	private String filler;
	@FieldInfo(korName="FF",length=1)
	private String ff;
	@FieldInfo(korName="CR",length=1)
	private String cr;
	@FieldInfo(korName="LF",length=1)
	private String lf;	
}
