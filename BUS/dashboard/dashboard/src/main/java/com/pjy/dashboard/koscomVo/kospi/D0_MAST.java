package com.pjy.dashboard.koscomVo.kospi;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class D0_MAST {
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

	private String max_time;
	private BigDecimal max_jisu;
	private String min_time;
	private BigDecimal min_jisu;
	private String open_time;
	private BigDecimal open_jisu;
	
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
	public String getInsertSql_D0() {
		String sql = String.format("insert into D0 select '%s','%s','%s','%s','%s' "
				+ "										 ,'%s','%s','%s','%s','%s' "
				,data_gb   
				,info_gb   
				,market_gb 
				,up_cd     
				,time      
				,jisu
				,sign      
				,daebi
				,contr_qty   
				,trd_amt
				);
		return sql;
	}
	
	@JsonIgnore
	public String getInsertSql_D0_MAST() {
		String sql = String.format("insert into D0_MAST select '%s','%s','%s','%s','%s' "
				+ "										 ,'%s','%s','%s','%s','%s' "
				+ "										 ,'%s','%s','%s','%s','%s','%s' "
				,data_gb   
				,info_gb   
				,market_gb 
				,up_cd     
				,time      
				,jisu  
				,sign      
				,daebi
				,contr_qty   
				,trd_amt
				,max_time      
				,max_jisu.toString()  
				,min_time      
				,min_jisu.toString()  
				,time      
				,jisu.toString()    
				);
		return sql;
	}
	@JsonIgnore
	public String getUpdateSql() {
		String sql = String.format("update D0_MAST set %s='%s',%s='%s'"
				+ "  ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
				+ "  ,%s='%s',%s='%s',%s='%s',%s='%s' where %s='%s' and %s='%s'"
				,"DATA구분    ",data_gb                     
				,"정보구분    ",info_gb                     
				,"시간        ",time                        
				,"지수        ",jisu        
				,"부호        ",sign                        
				,"대비        ",daebi            
				,"체결수량    ",contr_qty   
				,"거래대금    ",trd_amt     
				,"MAX_TIME    ",max_time                    
				,"MAX_JISU    ",max_jisu.toString()         
				,"MIN_TIME    ",min_time                    
				,"MIN_JISU    ",min_jisu.toString()         

				
				,"시장구분    ",market_gb                   
				,"업종코드    ",up_cd                       
				);		
		return sql;
	}	
	@JsonIgnore
	public String getKey() {
		return info_gb+market_gb+up_cd;
	}
}
