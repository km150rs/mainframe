package com.pjy.dashboard.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class DerivativesVarVo {
    private List<String> fndListSplit400;
	private String  gubun              ;
	private String  mgr_id             ;
	private String  fund_cd            ;
	private String  proc_ymd          ;
	private String  churi_ymd          ;
	private String  seq_no             ;
	private String  pas_gb             ;
	private String  jm_cd              ;
	private String  jm_nm              ;
	private String  fd_jasan_std_cd    ;
	private String  fd_jasan_nm        ;
	private double  base_asset_aek     ;
	private String  sens_delta         ;
	private String  sens_vega          ;
	private String  sens_gamma         ;
	private String  correlation        ;
	private String  ivlat              ;
	private double  buy_boyu_qty       ;
	private double  sell_boyu_qty      ;
	private double  net_qty            ;
	private double  delta_buy_amt      ;
	private double  delta_sell_amt     ;
	private double  delta_amt          ;
	private String  bond_jm_cd         ;
	private String  bond_jm_nm         ;
	private double  hyunmul_amt        ;
	private double  loan_sell_amt      ;
	private String  hedge_yn           ;
	private double  delta_amt2         ;
	private double  delta_amt3         ;
	private double  delta_amt4         ;
	private double  delta_amt5         ;
	private double  gamma_amt          ;
	private double  vega_amt           ;
	private double  dup_amt            ;
	private double  after_hyunmul_amt  ;
	private double  new_delta_amt      ;
	private String  last_proc_date     ;
	private double  tdy_fund_nav       ;
	private double  var_rate           ;
}
