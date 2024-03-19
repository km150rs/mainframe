package com.pjy.dashboard.koscomVo.kospi;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class D0 {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1,pk=true)
	private String market_gb;
	@FieldInfo(korName="업종코드",length=3,pk=true)
	private String up_cd;
	@FieldInfo(korName="시간",length=6,pk=true)
	private String time;
	@FieldInfo(korName="지수",length=8,decimalPoint = 2)
	private String jisu;
	@FieldInfo(korName="부호",length=1)
	private String sign;
	@FieldInfo(korName="대비",length=8,decimalPoint = 2)
	private String daebi;
	@FieldInfo(korName="체결수량",length=8)
	private String contr_qty;
	@FieldInfo(korName="거래대금",length=8)
	private String trd_amt;
	@FieldInfo(korName="FILLER",length=2)
	private String filler;
	@FieldInfo(korName="ff",length=1)
	private String ff;
	@FieldInfo(korName="cr",length=1)
	private String cr;
	@FieldInfo(korName="lf",length=1)
	private String lf;	
	
	
	@JsonIgnore
	public void parsePacket(String recvPacket) {	
		String str = null;
		data_gb   = recvPacket.substring( 0 , 2);
		info_gb   = recvPacket.substring( 2 , 2  + 2);
		market_gb = recvPacket.substring( 4 , 4  + 1);
		up_cd     = recvPacket.substring( 5 , 5  + 3);
		time      = recvPacket.substring( 8 , 8  + 6);
		str       = recvPacket.substring( 14, 14 + 8);
			jisu  = String.format("%s.%s", str.substring(0, 6), str.substring(6, 6+2));
		sign      = recvPacket.substring( 22, 22 + 1);
		str       = recvPacket.substring( 23, 23 + 8);
			daebi = String.format("%s.%s", str.substring(0, 6), str.substring(6, 6+2)); 
		contr_qty = recvPacket.substring( 31, 31 + 8);
		trd_amt   = recvPacket.substring( 39, 39 + 8);
		filler    = recvPacket.substring( 47, 47 + 2);
		ff        = recvPacket.substring( 49, 49 + 1);
		cr        = recvPacket.substring( 50, 50 + 1);
		lf	      = recvPacket.substring( 51, 51 + 1);
	}
	@JsonIgnore
	public String getInsertSql() {
		String sql = String.format("insert into D0 select '%s','%s','%s','%s','%s' "
				+ "										 ,'%s','%s','%s','%s','%s' "
				,data_gb   
				,info_gb   
				,market_gb 
				,up_cd     
				,time      
				,jisu.toString()  
				,sign      
				,daebi.toString()
				,String.valueOf(contr_qty)   
				,String.valueOf(trd_amt)
				);
		return sql;
	}
	@JsonIgnore
	public String getKey() {
		return info_gb+market_gb+up_cd;
	}
}
