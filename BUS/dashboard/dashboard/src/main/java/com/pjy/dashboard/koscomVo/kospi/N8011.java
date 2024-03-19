package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class N8011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gu;
	@FieldInfo(korName="01:주식",length=2)
	private String info_gu;
	@FieldInfo(korName="1:유가증권",length=1)
	private String market_gu;
	@FieldInfo(korName="표준코드",length=12)
	private String std_cd;
	@FieldInfo(korName="일련번호건수체크용1~99999999",length=8)
	private String seq_no;
	@FieldInfo(korName="ETF유통주식수",length=10)
	private String etf_utong_stock;
	@FieldInfo(korName="ETF유통순자산총액",length=15)
	private String etf_utong_amt;
	@FieldInfo(korName="ETF순자산총액단위:원",length=15)
	private String etf_amt;
	@FieldInfo(korName="ETF최종순자산가치9(7)V9(2)",length=9)
	private String etf_last_amt;
	@FieldInfo(korName="ETF외화유통순자산총액",length=15)
	private String etf_cur_foreign_amt;
	@FieldInfo(korName="ETF외화순자산총액",length=15)
	private String etf_foreign_amt;
	@FieldInfo(korName="ETF외화최종순자산가치9(7)V9(2)",length=9)
	private String etf_last_foreign_amt;
	@FieldInfo(korName="ETFCU수량단위:증권",length=8)
	private String etf_cu_vol;
	@FieldInfo(korName="전일과표기준가격9999999V99",length=9)
	private String yes_boa_basis_amt;
	@FieldInfo(korName="전일배당전과표기준가격9999999V99",length=9)
	private String yse_dvd_boa_basis_amt;
	@FieldInfo(korName="전일현금배당금액9999999999V99",length=12)
	private String yes_money_dvd_amt;
	@FieldInfo(korName="전전일과표기준가격9999999V99",length=9)
	private String yes_yes_boa_basis_amt;
	;
	@FieldInfo(korName="해외전일과표기준가격9999999V99",length=9)
	private String oversea_yes_boa_basis_amt;
	@FieldInfo(korName="해외전일배당전과표기준가격9999999V99",length=9)
	private String oversea_yse_dvd_boa_basis_amt;
	@FieldInfo(korName="해외전전일과표기준가격9999999V99",length=9)
	private String oversea_yes_yes_boa_basis_amt;
	;
	@FieldInfo(korName="filler",length=62)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;	
}
