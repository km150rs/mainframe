package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class F1011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="일련번호",length=8)
	private String seq;
	@FieldInfo(korName="매매일자",length=8)
	private String trd_ymd;
	@FieldInfo(korName="종목한도비율",length=5)
	private String forn_item_lmtrt;
	@FieldInfo(korName="개인한도비율",length=5)
	private String pers_item_lmtrt;
	@FieldInfo(korName="상장주식수",length=15)
	private String f_list_qty;
	@FieldInfo(korName="주문가능수량",length=15)
	private String ord_poss_qty;
	@FieldInfo(korName="한도소진구분",length=1)
	private String lim_vnis_gb;
	@FieldInfo(korName="FILLER",length=5)
	private String filler2;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}

