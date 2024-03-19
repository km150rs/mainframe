package com.pjy.dashboard.koscomVo.kospi;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class A3 {
	@FieldInfo(korName="DATA구분",            length=2 )  private String data_gb;
	@FieldInfo(korName="정보구분",            length=2 )  private String info_gb;
	@FieldInfo(korName="시장구분",            length=1 )  private String market_gb;
	@FieldInfo(korName="종목코드",pk=true,    length=12)  private String std_cd;
	@FieldInfo(korName="종목일련번호",        length=5 )  private String seq;
	@FieldInfo(korName="보드ID",              length=2 )  private String board_id;
	@FieldInfo(korName="전일대비구분",        length=1 )  private String yes_daebi_gb;
	@FieldInfo(korName="전일대비",            length=9 )  private String yes_daebi;
	@FieldInfo(korName="체결가격",            length=9 )  private String contr_prc;
	@FieldInfo(korName="체결수량",            length=10)  private String contr_qty;
	@FieldInfo(korName="세션ID",              length=2 )  private String session_id;
	@FieldInfo(korName="시가",                length=9 )  private String open_prc;
	@FieldInfo(korName="고가",                length=9 )  private String high_prc;
	@FieldInfo(korName="저가",                length=9 )  private String low_prc;
	@FieldInfo(korName="누적체결수량",pk=true,length=12)  private String vol;
	@FieldInfo(korName="누적거래대금",        length=18)  private String amt;
	@FieldInfo(korName="최종매도매수구분코드",length=1 )  private String last_sel_buy_gb;
	@FieldInfo(korName="체결가호가일치여부",  length=1 )  private String meet_contr_aprc_gb;
	@FieldInfo(korName="체결시각",            length=6 )  private String contr_time;
	@FieldInfo(korName="LP보유수량",          length=15)  private String lp_acqu_vol;
	@FieldInfo(korName="매도1호가",           length=9 )  private String shoga1;
	@FieldInfo(korName="매수1호가",           length=9 )  private String bhoga1;
	@FieldInfo(korName="FILLER",              length=6 )  private String filler;
	@FieldInfo(korName="ff",                  length=1 )  private String ff;
	@FieldInfo(korName="cr",                  length=1 )  private String cr;
	@FieldInfo(korName="lf",                  length=1 )  private String lf;


	@JsonIgnore
	public void parsePacket(String recvPacket) {
		data_gb            = recvPacket.substring( 0  , 2 );
		info_gb            = recvPacket.substring( 2  , 2   + 2 );
		market_gb          = recvPacket.substring( 4  , 4   + 1 );
		std_cd             = recvPacket.substring( 5  , 5   + 12);
		seq                = recvPacket.substring( 17 , 17  + 5 );
		board_id           = recvPacket.substring( 22 , 22  + 2 );
		yes_daebi_gb       = recvPacket.substring( 24 , 24  + 1 );
		yes_daebi          = recvPacket.substring( 25 , 25  + 9 );
		contr_prc          = recvPacket.substring( 34 , 34  + 9 );
		contr_qty          = recvPacket.substring( 43 , 43  + 10);
		session_id         = recvPacket.substring( 53 , 53  + 2 );
		open_prc           = recvPacket.substring( 55 , 55  + 9 );
		high_prc           = recvPacket.substring( 64 , 64  + 9 );
		low_prc            = recvPacket.substring( 73 , 73  + 9 );
		vol                = recvPacket.substring( 82 , 82  + 12);
		amt                = recvPacket.substring( 94 , 94  + 18);
		last_sel_buy_gb    = recvPacket.substring( 112, 112 + 1 );
		meet_contr_aprc_gb = recvPacket.substring( 113, 113 + 1 );
		contr_time         = recvPacket.substring( 114, 114 + 6 );
		lp_acqu_vol        = recvPacket.substring( 120, 120 + 15);
		shoga1             = recvPacket.substring( 135, 135 + 9 );
		bhoga1             = recvPacket.substring( 144, 144 + 9 );
		filler             = recvPacket.substring( 153, 153 + 6 );
		ff                 = recvPacket.substring( 159, 159 + 1 );
		cr                 = recvPacket.substring( 160, 160 + 1 );
		lf                 = recvPacket.substring( 161, 161 + 1 );
	
	}
		@JsonIgnore
		public String getInsertSql() {
			String sql = String.format("insert into A3 select '%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s' "
					,data_gb
					 ,info_gb
					 ,market_gb
					 ,std_cd
					 ,seq
					 ,board_id
					 ,yes_daebi_gb
					 ,yes_daebi
					 ,contr_prc
					 ,contr_qty
					 ,session_id
					 ,open_prc
					 ,high_prc
					 ,low_prc
					 ,vol
					 ,amt
					 ,last_sel_buy_gb
					 ,meet_contr_aprc_gb
					 ,contr_time
					 ,lp_acqu_vol
					 ,shoga1
					 ,bhoga1
					 );
			return sql;
		}
		public String getMastUpdateSql() {
			String sql = String.format("update A3_MAST set %s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' where %s='%s' "
	    			," DATA구분             ",data_gb
					," 정보구분             ",info_gb
					," 시장구분             ",market_gb
					," 종목일련번호         ",seq
					," 보드ID               ",board_id
					," 전일대비구분         ",yes_daebi_gb
					," 전일대비             ",yes_daebi
					," 체결가격             ",contr_prc
					," 체결수량             ",contr_qty
					," 세션ID               ",session_id
					," 시가                 ",open_prc
					," 고가                 ",high_prc
					," 저가                 ",low_prc
					," 누적체결수량         ",vol
					," 누적거래대금         ",amt
					," 최종매도매수구분코드 ",last_sel_buy_gb
					," 체결가호가일치여부   ",meet_contr_aprc_gb
					," 체결시각             ",contr_time
					," LP보유수량           ",lp_acqu_vol
					," 매도1호가            ",shoga1
					," 매수1호가            ",bhoga1
					
					," 종목코드            ",std_cd // where
					);		
		return sql;
	}
}
