package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class I7011 extends KoscomCommonVo {
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
	@FieldInfo(korName="시장참가자번호",length=5)
	private String lp_member_no;
	@FieldInfo(korName="LP개시일자",length=8)
	private String lp_start_ymd;
	@FieldInfo(korName="LP종료일자",length=8)
	private String lp_end_ymd;
	@FieldInfo(korName="최소호가수량배수",length=11)
	private String min_ap_mvol;
	@FieldInfo(korName="최대호가수량배수",length=11)
	private String max_ap_mvol;
	@FieldInfo(korName="호가스프레드단위코드",length=1)
	private String limit_unit_gb;
	@FieldInfo(korName="호가스프레드값",length=21)
	private String aprc_spread;
	@FieldInfo(korName="휴장호가스프레드배수",length=11)
	private String h_aprc_spread;
	@FieldInfo(korName="의무호가제출시간간격",length=6)
	private String aprc_send_intr;
	@FieldInfo(korName="매도최소호가금액",length=21,decimalPoint = 3)
	private String sell_min_ap_amt;
	@FieldInfo(korName="매수최소호가금액",length=21,decimalPoint = 3)
	private String buy_min_ap_amt;
	@FieldInfo(korName="FILLER",length=10)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
