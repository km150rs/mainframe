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
public class VarBondOffsetVo {
	private String base_asset_id  ;
	private String jm_cd          ;
	private String jm_nm          ;
	private double correlation    ;
	private double estamt         ;
	private double delta_amt      ;
	private double sum_amt        ;
	private double prev           ;
	private double next           ;
	private double new_delta      ;
}
