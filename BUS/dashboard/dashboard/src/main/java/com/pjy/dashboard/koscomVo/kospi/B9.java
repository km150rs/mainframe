package com.pjy.dashboard.koscomVo.kospi;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY) 
public class B9 {
	@FieldInfo(korName="DATA구분",            length=2 )  private String data_gb;
	@FieldInfo(korName="정보구분",            length=2 )  private String info_gb;
	@FieldInfo(korName="시장구분",            length=1 )  private String market_gb;
	@FieldInfo(korName="종목코드",pk=true,    length=12)  private String std_cd;
	@FieldInfo(korName="종목일련번호",        length=5 )  private String seq;

	private B9_member member[];

	@JsonIgnore
	public void parsePacket(String recvPacket) {
		data_gb           = recvPacket.substring( 0  , 2 );
		info_gb           = recvPacket.substring( 2  , 2   + 2 );
		market_gb         = recvPacket.substring( 4  , 4   + 1 );
		std_cd            = recvPacket.substring( 5  , 5   + 12);
		seq               = recvPacket.substring( 17 , 17  + 8 );
		member = new B9_member[5];
		int pos = 0;
		int startPos = 25;
		for(int i=0;i<5;i++) {
			member[i] = new B9_member();
			pos = startPos + (i * 70);
			member[i].setSellMemberNo(recvPacket.substring( pos       , pos  + 5  ));                                      		
			member[i].setSellQty     (recvPacket.substring( pos  + 5  , pos  + 5  + 12 ));                                        		
			member[i].setSellAmt     (recvPacket.substring( pos  + 17 , pos  + 17 + 18 ));                                        		
			member[i].setBuyMemberNo (recvPacket.substring( pos  + 35 , pos  + 35 + 5  ));                                        		
			member[i].setBuyQty      (recvPacket.substring( pos  + 40 , pos  + 40 + 12 ));                                        		
			member[i].setBuyAmt      (recvPacket.substring( pos  + 52 , pos  + 52 + 18 ));
		}
	}	

}
