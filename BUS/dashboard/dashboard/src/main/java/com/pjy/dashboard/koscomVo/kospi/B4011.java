package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class B4011 extends KoscomCommonVo {
	@FieldInfo(korName="B3:시간외단일가최종B4:시간외단일가REC",length=2)
	private String data_gb;
	@FieldInfo(korName="01:주식",length=2)
	private String info_gb;
	@FieldInfo(korName="1:유가증권2:코스닥",length=1)
	private String market_gb;
	@FieldInfo(korName="표준코드",length=12)
	private String std_cd;
	@FieldInfo(korName="종목일련번호",length=5)
	private String seq;
	@FieldInfo(korName="0:판단불가1:상한2:상승3:보합4:하한5:하락",length=1)
	private String ot_danil_dung_gu;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_dung_daebi;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_max;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_min;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_hyun;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_open;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_high;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_low;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_dhoga;
	@FieldInfo(korName="단위:원",length=9)
	private String ot_danil_shoga;
	@FieldInfo(korName="단위:원",length=12)
	private String ot_danil_vol;
	@FieldInfo(korName="단위:원",length=18)
	private String ot_danil_amt;
	@FieldInfo(korName="단위:원",length=12)
	private String tot_vol;
	@FieldInfo(korName="단위:원",length=18)
	private String tot_amt;
	@FieldInfo(korName="0:초기값1:시간외단일가개시2:시간외단일가마감",length=1)
	private String ot_danil_gu;
	@FieldInfo(korName="거래종료구분",length=1)
	private String trd_stop_yn;
	@FieldInfo(korName="0:초기값1:실세2:기세3:거래무4:시가기준가종목의기세",length=1)
	private String silse_gu;
	@FieldInfo(korName="SPACE",length=2)
	private String filler;
	@FieldInfo(korName="0xff",length=1)
	private String ff;
	@FieldInfo(korName="0x0d",length=1)
	private String cr;
	@FieldInfo(korName="0x0a",length=1)
	private String lf;	
	
}
