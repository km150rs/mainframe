package com.pjy.dashboard.koscomVo.kospi;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class B6 {
	@FieldInfo(korName="DATA구분",            length=2 )  private String data_gb;
	@FieldInfo(korName="정보구분",            length=2 )  private String info_gb;
	@FieldInfo(korName="시장구분",            length=1 )  private String market_gb;
	@FieldInfo(korName="종목코드",pk=true,    length=12)  private String std_cd;
	@FieldInfo(korName="종목일련번호",        length=5 )  private String seq;
	@FieldInfo(korName="누적체결수량",        length=12)  private String contr_qty;
	@FieldInfo(korName="매도호가1",           length=9 )  private String shoga1;
	@FieldInfo(korName="매수호가1",           length=9 )  private String bhoga1;
	@FieldInfo(korName="매도호가잔량1",       length=12)  private String s_j_vol1;
	@FieldInfo(korName="매수호가잔량1",       length=12)  private String b_j_vol1;
	@FieldInfo(korName="매도호가2",           length=9 )  private String shoga2;
	@FieldInfo(korName="매수호가2",           length=9 )  private String bhoga2;
	@FieldInfo(korName="매도호가잔량2",       length=12)  private String s_j_vol2;
	@FieldInfo(korName="매수호가잔량2",       length=12)  private String b_j_vol2;
	@FieldInfo(korName="매도호가3",           length=9 )  private String shoga3;
	@FieldInfo(korName="매수호가3",           length=9 )  private String bhoga3;
	@FieldInfo(korName="매도호가잔량3",       length=12)  private String s_j_vol3;
	@FieldInfo(korName="매수호가잔량3",       length=12)  private String b_j_vol3;
	@FieldInfo(korName="매도호가4",           length=9 )  private String shoga4;
	@FieldInfo(korName="매수호가4",           length=9 )  private String bhoga4;
	@FieldInfo(korName="매도호가잔량4",       length=12)  private String s_j_vol4;
	@FieldInfo(korName="매수호가잔량4",       length=12)  private String b_j_vol4;
	@FieldInfo(korName="매도호가5",           length=9 )  private String shoga5;
	@FieldInfo(korName="매수호가5",           length=9 )  private String bhoga5;
	@FieldInfo(korName="매도호가잔량5",       length=12)  private String s_j_vol5;
	@FieldInfo(korName="매수호가잔량5",       length=12)  private String b_j_vol5;
	@FieldInfo(korName="매도호가6",           length=9 )  private String shoga6;
	@FieldInfo(korName="매수호가6",           length=9 )  private String bhoga6;
	@FieldInfo(korName="매도호가잔량6",       length=12)  private String s_j_vol6;
	@FieldInfo(korName="매수호가잔량6",       length=12)  private String b_j_vol6;
	@FieldInfo(korName="매도호가7",           length=9 )  private String shoga7;
	@FieldInfo(korName="매수호가7",           length=9 )  private String bhoga7;
	@FieldInfo(korName="매도호가잔량7",       length=12)  private String s_j_vol7;
	@FieldInfo(korName="매수호가잔량7",       length=12)  private String b_j_vol7;
	@FieldInfo(korName="매도호가8",           length=9 )  private String shoga8;
	@FieldInfo(korName="매수호가8",           length=9 )  private String bhoga8;
	@FieldInfo(korName="매도호가잔량8",       length=12)  private String s_j_vol8;
	@FieldInfo(korName="매수호가잔량8",       length=12)  private String b_j_vol8;
	@FieldInfo(korName="매도호가9",           length=9 )  private String shoga9;
	@FieldInfo(korName="매수호가9",           length=9 )  private String bhoga9;
	@FieldInfo(korName="매도호가잔량9",       length=12)  private String s_j_vol9;
	@FieldInfo(korName="매수호가잔량9",       length=12)  private String b_j_vol9;
	@FieldInfo(korName="매도호가10",          length=9 )  private String shoga10;
	@FieldInfo(korName="매수호가10",          length=9 )  private String bhoga10;
	@FieldInfo(korName="매도호가잔량10",      length=12)  private String s_j_vol10;
	@FieldInfo(korName="매수호가잔량10",      length=12)  private String b_j_vol10;
	@FieldInfo(korName="호가매도총잔량",      length=12)  private String tot_shoga_qty;
	@FieldInfo(korName="호가매수총잔량",      length=12)  private String tot_bhoga_qty;
	@FieldInfo(korName="temp1",               length=12)  private String temp1;
	@FieldInfo(korName="temp2",               length=12)  private String temp2;
	@FieldInfo(korName="시간외매도총호가잔량",length=12)  private String end_market_s_t_vol;
	@FieldInfo(korName="시간외매수총호가잔량",length=12)  private String end_market_b_t_vol;
	@FieldInfo(korName="세션ID",              length=2 )  private String session_id;
	@FieldInfo(korName="보드ID",              length=2 )  private String board_id;
	@FieldInfo(korName="예상체결가격",        length=9 )  private String exp_contr_prc;
	@FieldInfo(korName="예상체결수량",        length=12)  private String exp_contr_vol;
	@FieldInfo(korName="경쟁대량방향구분",    length=1 )  private String dark_gb;
	@JsonIgnore @FieldInfo(korName="FILLER",              length=7 )  private String filler;
	@JsonIgnore @FieldInfo(korName="ff",                  length=1 )  private String ff;
	@JsonIgnore @FieldInfo(korName="cr",                  length=1 )  private String cr;
	@JsonIgnore @FieldInfo(korName="lf",                  length=1 )  private String lf;
		

	
	
	@JsonIgnore
	public void parsePacket(String recvPacket) {
		data_gb           = recvPacket.substring( 0  , 2 );
		info_gb           = recvPacket.substring( 2  , 2   + 2 );
		market_gb         = recvPacket.substring( 4  , 4   + 1 );
		std_cd            = recvPacket.substring( 5  , 5   + 12);
		seq               = recvPacket.substring( 17 , 17  + 5 );
		contr_qty         = recvPacket.substring( 22 , 22  + 12);
		shoga1            = recvPacket.substring( 34 , 34  + 9 );
		bhoga1            = recvPacket.substring( 43 , 43  + 9 );
		s_j_vol1          = recvPacket.substring( 52 , 52  + 12);
		b_j_vol1          = recvPacket.substring( 64 , 64  + 12);
		shoga2            = recvPacket.substring( 76 , 76  + 9 );
		bhoga2            = recvPacket.substring( 85 , 85  + 9 );
		s_j_vol2          = recvPacket.substring( 94 , 94  + 12);
		b_j_vol2          = recvPacket.substring( 106, 106 + 12);
		shoga3            = recvPacket.substring( 118, 118 + 9 );
		bhoga3            = recvPacket.substring( 127, 127 + 9 );
		s_j_vol3          = recvPacket.substring( 136, 136 + 12);
		b_j_vol3          = recvPacket.substring( 148, 148 + 12);
		shoga4            = recvPacket.substring( 160, 160 + 9 );
		bhoga4            = recvPacket.substring( 169, 169 + 9 );
		s_j_vol4          = recvPacket.substring( 178, 178 + 12);
		b_j_vol4          = recvPacket.substring( 190, 190 + 12);
		shoga5            = recvPacket.substring( 202, 202 + 9 );
		bhoga5            = recvPacket.substring( 211, 211 + 9 );
		s_j_vol5          = recvPacket.substring( 220, 220 + 12);
		b_j_vol5          = recvPacket.substring( 232, 232 + 12);
		shoga6            = recvPacket.substring( 244, 244 + 9 );
		bhoga6            = recvPacket.substring( 253, 253 + 9 );
		s_j_vol6          = recvPacket.substring( 262, 262 + 12);
		b_j_vol6          = recvPacket.substring( 274, 274 + 12);
		shoga7            = recvPacket.substring( 286, 286 + 9 );
		bhoga7            = recvPacket.substring( 295, 295 + 9 );
		s_j_vol7          = recvPacket.substring( 304, 304 + 12);
		b_j_vol7          = recvPacket.substring( 316, 316 + 12);
		shoga8            = recvPacket.substring( 328, 328 + 9 );
		bhoga8            = recvPacket.substring( 337, 337 + 9 );
		s_j_vol8          = recvPacket.substring( 346, 346 + 12);
		b_j_vol8          = recvPacket.substring( 358, 358 + 12);
		shoga9            = recvPacket.substring( 370, 370 + 9 );
		bhoga9            = recvPacket.substring( 379, 379 + 9 );
		s_j_vol9          = recvPacket.substring( 388, 388 + 12);
		b_j_vol9          = recvPacket.substring( 400, 400 + 12);
		shoga10           = recvPacket.substring( 412, 412 + 9 );
		bhoga10           = recvPacket.substring( 421, 421 + 9 );
		s_j_vol10         = recvPacket.substring( 430, 430 + 12);
		b_j_vol10         = recvPacket.substring( 442, 442 + 12);
		tot_shoga_qty     = recvPacket.substring( 454, 454 + 12);
		tot_bhoga_qty     = recvPacket.substring( 466, 466 + 12);
		temp1             = recvPacket.substring( 478, 478 + 12);
		temp2             = recvPacket.substring( 490, 490 + 12);
		end_market_s_t_vol= recvPacket.substring( 502, 502 + 12);
		end_market_b_t_vol= recvPacket.substring( 514, 514 + 12);
		session_id        = recvPacket.substring( 526, 526 + 2 );
		board_id          = recvPacket.substring( 528, 528 + 2 );
		exp_contr_prc     = recvPacket.substring( 530, 530 + 9 );
		exp_contr_vol     = recvPacket.substring( 539, 539 + 12);
		dark_gb           = recvPacket.substring( 551, 551 + 1 );
		                                          
		//setHogaArray(recvPacket);                                          		
	}
	
	@JsonIgnore
	public String getFirstInsertSql(String itemCd) {
		return String.format("INSERT INTO B6 (종목코드) VALUES ('%s')",itemCd);
	}
	
	@JsonIgnore
	public String getInsertSql() {
		String sql = String.format("insert into B6 select '%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s', "
				,data_gb            
				,info_gb            
				,market_gb          
				,std_cd             
				,seq                
				,contr_qty          
				,shoga1             
				,bhoga1             
				,s_j_vol1           
				,b_j_vol1           
				,shoga2             
				,bhoga2             
				,s_j_vol2           
				,b_j_vol2           
				,shoga3             
				,bhoga3             
				,s_j_vol3           
				,b_j_vol3           
				,shoga4             
				,bhoga4             
				,s_j_vol4           
				,b_j_vol4           
				,shoga5             
				,bhoga5             
				,s_j_vol5           
				,b_j_vol5           
				,shoga6             
				,bhoga6             
				,s_j_vol6           
				,b_j_vol6           
				,shoga7             
				,bhoga7             
				,s_j_vol7           
				,b_j_vol7           
				,shoga8             
				,bhoga8             
				,s_j_vol8           
				,b_j_vol8           
				,shoga9             
				,bhoga9             
				,s_j_vol9           
				,b_j_vol9           
				,shoga10            
				,bhoga10            
				,s_j_vol10          
				,b_j_vol10          
				,tot_shoga_qty      
				,tot_bhoga_qty      
				,temp1              
				,temp2              
				,end_market_s_t_vol 
				,end_market_b_t_vol 
				,session_id         
				,board_id           
				,exp_contr_prc      
				,exp_contr_vol      
				,dark_gb
				 );
		return sql;
	}					

	@JsonIgnore
	public String getUpdateSql() {
		String sql = String.format("update B6 set %s='%s',%s='%s'" 
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' "
				+ "					,%s='%s',%s='%s',%s='%s',%s='%s' where %s='%s' "
				 ,"DATA구분            ",data_gb            
				 ,"정보구분            ",info_gb            
				 ,"시장구분            ",market_gb          
				 ,"종목일련번호        ",seq                
				 ,"누적체결수량        ",contr_qty          
				 ,"매도호가1           ",shoga1             
				 ,"매수호가1           ",bhoga1             
				 ,"매도호가잔량1       ",s_j_vol1           
				 ,"매수호가잔량1       ",b_j_vol1           
				 ,"매도호가2           ",shoga2             
				 ,"매수호가2           ",bhoga2             
				 ,"매도호가잔량2       ",s_j_vol2           
				 ,"매수호가잔량2       ",b_j_vol2           
				 ,"매도호가3           ",shoga3             
				 ,"매수호가3           ",bhoga3             
				 ,"매도호가잔량3       ",s_j_vol3           
				 ,"매수호가잔량3       ",b_j_vol3           
				 ,"매도호가4           ",shoga4             
				 ,"매수호가4           ",bhoga4             
				 ,"매도호가잔량4       ",s_j_vol4           
				 ,"매수호가잔량4       ",b_j_vol4           
				 ,"매도호가5           ",shoga5             
				 ,"매수호가5           ",bhoga5             
				 ,"매도호가잔량5       ",s_j_vol5           
				 ,"매수호가잔량5       ",b_j_vol5           
				 ,"매도호가6           ",shoga6             
				 ,"매수호가6           ",bhoga6             
				 ,"매도호가잔량6       ",s_j_vol6           
				 ,"매수호가잔량6       ",b_j_vol6           
				 ,"매도호가7           ",shoga7             
				 ,"매수호가7           ",bhoga7             
				 ,"매도호가잔량7       ",s_j_vol7           
				 ,"매수호가잔량7       ",b_j_vol7           
				 ,"매도호가8           ",shoga8             
				 ,"매수호가8           ",bhoga8             
				 ,"매도호가잔량8       ",s_j_vol8           
				 ,"매수호가잔량8       ",b_j_vol8           
				 ,"매도호가9           ",shoga9             
				 ,"매수호가9           ",bhoga9             
				 ,"매도호가잔량9       ",s_j_vol9           
				 ,"매수호가잔량9       ",b_j_vol9           
				 ,"매도호가10          ",shoga10            
				 ,"매수호가10          ",bhoga10            
				 ,"매도호가잔량10      ",s_j_vol10          
				 ,"매수호가잔량10      ",b_j_vol10          
				 ,"호가매도총잔량      ",tot_shoga_qty      
				 ,"호가매수총잔량      ",tot_bhoga_qty      
				 ,"TEMP1               ",temp1              
				 ,"TEMP2               ",temp2              
				 ,"시간외매도총호가잔량",end_market_s_t_vol 
				 ,"시간외매수총호가잔량",end_market_b_t_vol 
				 ,"세션ID              ",session_id         
				 ,"보드ID              ",board_id           
				 ,"예상체결가격        ",exp_contr_prc      
				 ,"예상체결수량        ",exp_contr_vol      
				 ,"경쟁대량방향구분    ",dark_gb   

				 ,"종목코드            ",std_cd // where             
				 );
		return sql;
	}		
	/*
	@JsonIgnore
	public void setHogaArray(String recvPacket) {
		
		B6_member sellHoga[] = new B6_member[10];
		int pos = 0;
		int startPos = 34;
		for(int i=0;i<5;i++) {
			sellHoga[i] = new B6_member();
			pos = startPos + (i * 42);
			sellHoga[i].setHoga(recvPacket.substring( pos       , pos  + 9  ));                                      		
			sellHoga[i].setQty (recvPacket.substring( pos  + 18 , pos  + 18 + 12 ));                                        		
		}		
		B6_member buyHoga [] = new B6_member[10];
		pos = 0;
		startPos = 34;
		for(int i=0;i<5;i++) {
			buyHoga[i] = new B6_member();
			pos = startPos + (i * 42);
			buyHoga[i].setHoga(recvPacket.substring( pos  + 9  , pos  + 9  + 9  ));                                      		
			buyHoga[i].setQty (recvPacket.substring( pos  + 30 , pos  + 30 + 12 ));                                        		
		}		
	}
	*/
}
