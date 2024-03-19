package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class F0011 extends KoscomCommonVo {
	@FieldInfo(korName="데이타구분F0:공시REALE9:공시BATCH",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String marker_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="공시일련번호",length=6)
	private String dc_seq;
	@FieldInfo(korName="공시건당총페이지수",length=3)
	private String dc_tot_page;
	@FieldInfo(korName="공시건당페이지일련번호",length=3)
	private String dc_page_no;
	@FieldInfo(korName="공시일자",length=8)
	private String dc_day;
	@FieldInfo(korName="전송일자",length=8)
	private String send_day;
	@FieldInfo(korName="공시용시장구분1:유가1:코스닥3:선물4:채권",length=1)
	private String market_bit;
	@FieldInfo(korName="종목명",length=40)
	private String kor_name;
	@FieldInfo(korName="처리구분",length=1)
	private String churi_bit;
	@FieldInfo(korName="사유",length=5)
	private String sa_yu;
	@FieldInfo(korName="국영문구분",length=1)
	private String ko_en_bit;
	@FieldInfo(korName="공시제목(TEXT형식)",length=264)
	private String dc_titl;
	@FieldInfo(korName="공시내용(HTML형식)",length=1000)
	private String dc_con;
	@FieldInfo(korName="SPACE",length=2)
	private String filler;
	@FieldInfo(korName="ff",length=1)
	private String ff;
	@FieldInfo(korName="cr",length=1)
	private String cr;
	@FieldInfo(korName="lf",length=1)
	private String lf;	
}
