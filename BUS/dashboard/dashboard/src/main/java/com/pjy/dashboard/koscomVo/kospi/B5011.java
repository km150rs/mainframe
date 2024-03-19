package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class B5011 extends KoscomCommonVo {
	@FieldInfo(korName="B5",length=2)
	private String data_gb;
	@FieldInfo(korName="01:주식",length=2)
	private String info_gb;
	@FieldInfo(korName="1:유가증권2:코스닥",length=1)
	private String market_gb;
	@FieldInfo(korName="전체종목수",length=5)
	private String tot_std_su;
	@FieldInfo(korName="거래형성종목수",length=5)
	private String deal_std_su;
	@FieldInfo(korName="상한종목수",length=5)
	private String max_std_su;
	@FieldInfo(korName="상승종목수",length=5)
	private String high_std_su;
	@FieldInfo(korName="보합종목수",length=5)
	private String bo_std_su;
	@FieldInfo(korName="하한종목수",length=5)
	private String low_std_su;
	@FieldInfo(korName="하락종목수",length=5)
	private String min_std_su;
	@FieldInfo(korName="기세종목수",length=5)
	private String gise_std_su;
	@FieldInfo(korName="기세상승종목수",length=5)
	private String gisehigh_std_su;
	@FieldInfo(korName="기세하락종목수",length=5)
	private String giselow_std_su;
	@FieldInfo(korName="SPACE",length=4)
	private String filler;
	@FieldInfo(korName="0xff",length=1)
	private String ff;
	@FieldInfo(korName="0x0d",length=1)
	private String cr;
	@FieldInfo(korName="0x0a",length=1)
	private String lf;
}
