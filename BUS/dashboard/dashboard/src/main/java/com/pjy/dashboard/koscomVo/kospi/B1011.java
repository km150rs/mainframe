package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class B1011 extends KoscomCommonVo {
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
	@FieldInfo(korName="등락구분(기준가대비)구분",length=1)
	private String yes_daebi_gb;
	@FieldInfo(korName="전일대비",length=9)
	private String yes_daebi;
	@FieldInfo(korName="현재가",length=9)
	private String contr_prc;
	@FieldInfo(korName="시가",length=9)
	private String open_prc;
	@FieldInfo(korName="고가",length=9)
	private String high_prc;
	@FieldInfo(korName="저가",length=9)
	private String low_prc;
	@FieldInfo(korName="매도호가",length=9)
	private String shoga1;
	@FieldInfo(korName="매수호가",length=9)
	private String bhoga1;
	@FieldInfo(korName="누적체결수량",length=12)
	private String vol;
	@FieldInfo(korName="누적거래대금",length=18)
	private String amt;
	@FieldInfo(korName="실세기세구분",length=1)
	private String silse_gu;
	@FieldInfo(korName="보드이벤트ID",length=3)
	private String board_event_id;
	@FieldInfo(korName="보드ID",length=2)
	private String board_id;
	@FieldInfo(korName="거래정지여부",length=1)
	private String market_stop_gb;
	@FieldInfo(korName="장개시전시간외종가체결수량",length=12)
	private String bef_ovtm_cprc_vol;
	@FieldInfo(korName="장개시전시간외종가거래대금",length=18)
	private String bef_ovtm_cprc_amt;
	@FieldInfo(korName="정규장체결수량",length=12)
	private String jang_contr_vol;
	@FieldInfo(korName="정규장체결대금",length=18)
	private String jang_contr_amt;
	@FieldInfo(korName="장종료후시간외종가체결수량",length=12)
	private String af_ovtm_cprc_vol;
	@FieldInfo(korName="장종료후시간외종가거래대금",length=18)
	private String af_ovtm_cprc_amt;
	@FieldInfo(korName="ELW조기종료여부",length=1)
	private String elw_end_gb;
	@FieldInfo(korName="ELW조기종료시간",length=6)
	private String elw_end_time;
	@FieldInfo(korName="경쟁대량방향구분",length=1)
	private String dark_gb;
	@FieldInfo(korName="일반Buy_in체결수량",length=12)
	private String buyin_qty;
	@FieldInfo(korName="일반Buy_in거래대금",length=18)
	private String buyin_amt;
	@FieldInfo(korName="당일Buy_in체결수량",length=12)
	private String td_buyin_qty;
	@FieldInfo(korName="당일Buy_in거래대금",length=18)
	private String td_buyin_amt;
	@FieldInfo(korName="filler",length=8)
	private String filler;
	@FieldInfo(korName="ff",length=1)
	private String ff;
	@FieldInfo(korName="cr",length=1)
	private String cr;
	@FieldInfo(korName="lf",length=1)
	private String lf;	
}
