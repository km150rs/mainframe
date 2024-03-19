package com.pjy.dashboard.domain;

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
public class DerivativesSunmulVarVo {
	private String jm_cd                ;
	private String koscom_cd;
	private String jm_nm                ;
	private int prev_qty             ;
	private int cum_sell_qty             ;
	private int boyu_qty             ;
	private int order_qty           ;
	private int sps_qty           ;
	private int sim_qty           ;
	private int match_qty            ;
	private int curr_qty             ;
	private String pas_gb               ;
	private double boyu_amt             ;
	private String fd_jasan_pas_gb      ;
	private String fd_jasan_std_cd      ;
	private String fd_jasan_koscom_cd   ;
	private String fd_jasan_jm_nm       ;
	private double base_asset_aek       ;
	private double sens_delta           ;
	private double sens_vega            ;
	private double sens_gamma           ;
	private double ivlat                ;
	private double unit_aek             ;
}
