package com.pjy.dashboard.koscomVo.kospi;

import com.pjy.dashboard.core.anotation.FieldInfo;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class A7011 extends KoscomCommonVo {
	@FieldInfo(korName="DATA구분",length=2)
	private String data_gb;
	@FieldInfo(korName="정보구분",length=2)
	private String info_gb;
	@FieldInfo(korName="시장구분",length=1)
	private String market_gb;
	@FieldInfo(korName="종목코드",length=12)
	private String std_cd;
	@FieldInfo(korName="종목일련번호",length=5)
	private String seq;
	@FieldInfo(korName="보드ID",length=2)
	private String board_id;
	@FieldInfo(korName="보드이벤트ID",length=3)
	private String board_event_id;
	@FieldInfo(korName="보드이벤트시작시각",length=6)
	private String board_event_time;
	@FieldInfo(korName="보드이벤트적용군코드",length=5)
	private String board_event_gb;
	@FieldInfo(korName="세션ID",length=2)
	private String session_id;
	@FieldInfo(korName="거래정지사유코드",length=3)
	private String stop_sayu_cd;
	@FieldInfo(korName="FILLER",length=6)
	private String filler;
		@FieldInfo(korName="ff",length=1)
		private String ff;
		@FieldInfo(korName="cr",length=1)
		private String cr;
		@FieldInfo(korName="lf",length=1)
		private String lf;		
}
