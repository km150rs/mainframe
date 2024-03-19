package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class A1041 extends KoscomCommonVo {
	
	
	@FieldInfo(korName="데이타구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분04:주식",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드sht_cd",length=12)
	private String std_code;
	@FieldInfo(korName="일련번호",length=8)
	private String seq;
	@FieldInfo(korName="ETN발행시장참가자",length=80)
	private String etn_member1;
	@FieldInfo(korName="ETN발행시장참가자",length=80)
	private String etn_member2;
	@FieldInfo(korName="ETN발행시장참가자번호",length=5)
	private String etn_member_no;
	@FieldInfo(korName="ETN최종결제방법코드",length=1)
	private String etn_last_code;
	@FieldInfo(korName="ETN최종거래일자",length=8)
	private String etn_last_ymd;
	@FieldInfo(korName="ETN지급일자",length=8)
	private String etn_pay_ymd;
	@FieldInfo(korName="ETNLP보유수량",length=12)
	private String etn_lp_qty;

	@FieldInfo(korName="손실제한ETN수익구조코드",length=2)
	private String etn_profit_cd;
	@FieldInfo(korName="ETN최대상환가격",length=12,decimalPoint = 3)
	private String etn_max_redeem_price;
	@FieldInfo(korName="ETN최소상환가격",length=12,decimalPoint = 3)
	private String etn_min_redeem_price;
	@FieldInfo(korName="ETN조기상환가능여부",length=1)
	private String etn_fast_redeem_yn;
	@FieldInfo(korName="ETN조기상환주기코드",length=2)
	private String etn_fast_redeem_termcd;
	@FieldInfo(korName="평가가격산출기관코드1",length=2)
	private String etn_value_orgcd1;
	@FieldInfo(korName="평가가격산출기관코드2",length=2)
	private String etn_value_orgcd2;
	
	
	@FieldInfo(korName="FILLER",length=47)
	private String filler;
	@FieldInfo(korName="FF",length=1)
	private String ff;
	@FieldInfo(korName="CR",length=1)
	private String cr;
	@FieldInfo(korName="LF",length=1)
	private String lf;		
}
