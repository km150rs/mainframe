package com.pjy.dashboard.koscomVo.kospi;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class A0 {
	@FieldInfo(korName="DATA구분",length= 2)                             private String col_1  ;
	@FieldInfo(korName="정보구분",length= 2)                             private String col_2  ;
	@FieldInfo(korName="시장구분",length= 1)                             private String col_3  ;
	@FieldInfo(korName="종목코드",length= 12,pk=true)                   private String col_4  ;
	@FieldInfo(korName="일련번호",length= 8)                             private String col_5  ;
	@FieldInfo(korName="단축코드",length= 9)                             private String col_6  ;
	@FieldInfo(korName="종목한글약명",length= 40)                        private String col_7  ;
	@FieldInfo(korName="종목영문약명",length= 40)                        private String col_8  ;
	@FieldInfo(korName="영업일자",length= 8)                             private String col_9  ;
	@FieldInfo(korName="정보분배그룹번호",length= 5)                     private String col_10 ;
	@FieldInfo(korName="증권그룹ID",length=   2)                         private String col_11 ;
	@FieldInfo(korName="단위매매체결여부",length= 1)                     private String col_12 ;
	@FieldInfo(korName="락구분",length=   2)                             private String col_13 ;
	@FieldInfo(korName="액면가변경구분",length=   2)                     private String col_14 ;
	@FieldInfo(korName="시가기준가격종목여부",length= 1)                 private String col_15 ;
	@FieldInfo(korName="재평가종목사유코드",length=   2)                 private String col_16 ;
	@FieldInfo(korName="기준가격변경종목여부",length= 1)                 private String col_17 ;
	@FieldInfo(korName="임의종료발동조건코드",length= 1)                 private String col_18 ;
	@FieldInfo(korName="시장경보위험예고여부",length= 1)                 private String col_19 ;
	@FieldInfo(korName="시장경보구분",length= 2)                         private String col_20 ;
	@FieldInfo(korName="지배구조우량여부",length= 1)                     private String col_21 ;
	@FieldInfo(korName="관리종목여부",length= 1)                         private String col_22 ;
	@FieldInfo(korName="불성실공시지정여부",length=   1)                 private String col_23 ;
	@FieldInfo(korName="우회상장여부",length= 1)                         private String col_24 ;
	@FieldInfo(korName="거래정지여부",length= 1)                         private String col_25 ;
	@FieldInfo(korName="지수업종대분류",length=   3)                     private String col_26 ;
	@FieldInfo(korName="지수업종중분류",length=   3)                     private String col_27 ;
	@FieldInfo(korName="지수업종소분류",length=   3)                     private String col_28 ;
	@FieldInfo(korName="업종ID",length=   10)                            private String col_29 ;
	@FieldInfo(korName="KOSPI200섹터업종",length= 1)                     private String col_30 ;
	@FieldInfo(korName="시가총액규모코드",length= 1)                     private String col_31 ;
	@FieldInfo(korName="제조업중소기업여부",length=   1)                 private String col_32 ;
	@FieldInfo(korName="KRX100종목여부",length=  1)                      private String col_33 ;
	@FieldInfo(korName="space1",length=   1)                             private String col_34 ;
	@FieldInfo(korName="지배구조소속부구분",length=   1)                 private String col_35 ;
	@FieldInfo(korName="투자기구구분",length= 2)                         private String col_36 ;
	@FieldInfo(korName="KOSDAQ지수종목여부",length=   1)                 private String col_37 ;
	@FieldInfo(korName="space2",length=   1)                             private String col_38 ;
	@FieldInfo(korName="KOSPI50여부",length=1)                           private String col_39 ;
	@FieldInfo(korName="space3",length=   1)                             private String col_40 ;
	@FieldInfo(korName="space4",length=   1)                             private String col_41 ;
	@FieldInfo(korName="space5",length=   1)                             private String col_42 ;
	@FieldInfo(korName="space6",length=   1)                             private String col_43 ;
	@FieldInfo(korName="space7",length=   1)                             private String col_44 ;
	@FieldInfo(korName="space8",length=   1)                             private String col_45 ;
	@FieldInfo(korName="space9",length=   1)                             private String col_46 ;
	@FieldInfo(korName="space10",length=   1)                            private String col_47 ;
	@FieldInfo(korName="space11",length=   1)                            private String col_48 ;
	@FieldInfo(korName="space12",length=   1)                            private String col_49 ;
	@FieldInfo(korName="space13",length=   1)                            private String col_50 ;
	@FieldInfo(korName="space14",length=   1)                            private String col_51 ;
	@FieldInfo(korName="space15",length=   1)                            private String col_52 ;
	@FieldInfo(korName="기준가격",length= 9)                             private String col_53 ;
	@FieldInfo(korName="전일종가구분",length= 1)                         private String col_54 ;
	@FieldInfo(korName="전일종가",length= 9 )                            private String col_55 ;
	@FieldInfo(korName="전일누적체결수량",length= 12)                    private String col_56 ;
	@FieldInfo(korName="전일누적거래대금",length= 18)                    private String col_57 ;
	@FieldInfo(korName="상한가",length= 9 )                              private String col_58 ;
	@FieldInfo(korName="하한가",length= 9 )                              private String col_59 ;
	@FieldInfo(korName="대용가격",length= 9 )                            private String col_60 ;
	@FieldInfo(korName="액면가",length=12,decimalPoint = 3)              private BigDecimal col_61 ;
	@FieldInfo(korName="발행가격",length= 9)                             private String col_62 ;
	@FieldInfo(korName="상장일자",length= 8)                             private String col_63 ;
	@FieldInfo(korName="상장주식수",length= 15)                          private String col_64 ;
	@FieldInfo(korName="정리매매여부",length= 1)                         private String col_65 ;
	@FieldInfo(korName="EPS부호",length=1)                               private String col_66 ;
	@FieldInfo(korName="EPS",length= 9)                                  private String col_67 ;
	@FieldInfo(korName="PER부호",length=1)                               private String col_68 ;
	@FieldInfo(korName="PER",length=6,decimalPoint = 2)                  private BigDecimal col_69 ;
	@FieldInfo(korName="PER산출제외여부",length=1)                       private String col_70 ;
	@FieldInfo(korName="BPS부호",length=1)                               private String col_71 ;
	@FieldInfo(korName="BPS",length= 9)                                  private String col_72 ;
	@FieldInfo(korName="PBR부호",length=1)                               private String col_73 ;
	@FieldInfo(korName="PBR",length=6,decimalPoint = 2)                  private BigDecimal col_74 ;
	@FieldInfo(korName="PBR산출제외여부",length=1)                       private String col_75 ;
	@FieldInfo(korName="결손여부",length= 1)                             private String col_76 ;
	@FieldInfo(korName="주당배당금액",length= 8)                         private String col_77 ;
	@FieldInfo(korName="주당배당산출제외여부",length= 1)                 private String col_78 ;
	@FieldInfo(korName="배당수익율",length=7,decimalPoint = 1)           private BigDecimal col_79 ;
	@FieldInfo(korName="존립개시일자",length= 8)                         private String col_80 ;
	@FieldInfo(korName="존립종료일자",length= 8)                         private String col_81 ;
	@FieldInfo(korName="행사기간개시일자",length= 8)                     private String col_82 ;
	@FieldInfo(korName="행사기간종료일자",length= 8)                     private String col_83 ;
	@FieldInfo(korName="ELW행사가격",length=12,decimalPoint = 3)         private BigDecimal col_84 ;
	@FieldInfo(korName="자본금",length=21,decimalPoint =3)               private BigDecimal col_85 ;
	@FieldInfo(korName="신용주문가능여부",length= 1)                     private String col_86 ;
	@FieldInfo(korName="지정가호가조건구분",length= 5)                   private String col_87 ;
	@FieldInfo(korName="시장가호가조건구분",length= 5)                   private String col_88 ;
	@FieldInfo(korName="조건부호가조건구분",length= 5)                   private String col_89 ;
	@FieldInfo(korName="최유리호가조건구분",length= 5)                   private String col_90 ;
	@FieldInfo(korName="최우선호가조건구분",length= 5)                   private String col_91 ;
	@FieldInfo(korName="증자구분",length= 2)                             private String col_92 ;
	@FieldInfo(korName="종류주권구분",length= 1)                         private String col_93 ;
	@FieldInfo(korName="국민주여부",length=   1)                         private String col_94 ;
	@FieldInfo(korName="평가가격",length= 9)                             private String col_95 ;
	@FieldInfo(korName="최저호가가격",length= 9)                         private String col_96 ;
	@FieldInfo(korName="최고호가가격",length= 9)                         private String col_97 ;
	@FieldInfo(korName="정규장매매수량단위",length= 5)                   private String col_98 ;
	@FieldInfo(korName="시간외매매수량단위",length= 5)                   private String col_99 ;
	@FieldInfo(korName="리츠종류코드",length= 1)                         private String col_100;
	@FieldInfo(korName="목적주권종목코드",length= 12)                    private String col_101;
	@FieldInfo(korName="space16",length=   1)                            private String col_102;
	@FieldInfo(korName="space17",length=   3)                            private String col_103;
	@FieldInfo(korName="space18",length=   1)                            private String col_104;
	@FieldInfo(korName="space19",length=   4)                            private String col_105;
	@FieldInfo(korName="통화ISO코드",length=3)                           private String col_106;
	@FieldInfo(korName="국가코드",length= 3)                             private String col_107;
	@FieldInfo(korName="시장조성가능여부",length= 1)                     private String col_108;
	@FieldInfo(korName="시간외매매가능여부",length=   1)                 private String col_109;
	@FieldInfo(korName="시간외종가가능여부",length=   1)                 private String col_110;
	@FieldInfo(korName="시간외대량가능여부",length=   1)                 private String col_111;
	@FieldInfo(korName="시간외바스켓가능여부",length= 1)                 private String col_112;
	@FieldInfo(korName="예상체결가공개여부",length=   1)                 private String col_113;
	@FieldInfo(korName="공매도가능여부",length=   1)                     private String col_114;
	@FieldInfo(korName="space20",length=   3)                            private String col_115;
	@FieldInfo(korName="추적수익율배수부호",length=   1)                 private String col_116;
	@FieldInfo(korName="추적수익율배수",length=11,decimalPoint = 6)      private BigDecimal col_117;
	@FieldInfo(korName="space21",length=   1)                            private String col_118;
	@FieldInfo(korName="space22",length=   1)                            private String col_119;
	@FieldInfo(korName="space23",length=   1)                            private String col_120;
	@FieldInfo(korName="space24",length=   3)                            private String col_121;
	@FieldInfo(korName="space25",length=   1)                            private String col_122;
	@FieldInfo(korName="space26",length=   1)                            private String col_123;
	@FieldInfo(korName="RegulationS적용여부",length=1)                   private String col_124;
	@FieldInfo(korName="기업인수목적회사여부",length= 1)                 private String col_125;
	@FieldInfo(korName="과세유형코드",length= 1)                         private String col_126;
	@FieldInfo(korName="대용가격사정비율",length=11,decimalPoint = 6)    private BigDecimal col_127;
	@FieldInfo(korName="space27",length=   1)                            private String col_128;
	@FieldInfo(korName="space28",length=   1)                            private String col_129;
	@FieldInfo(korName="space29",length=   1)                            private String col_130;
	@FieldInfo(korName="space30",length=   1)                            private String col_131;
	@FieldInfo(korName="투자주의환기종목여부",length= 1)                 private String col_132;
	@FieldInfo(korName="상장폐지일자",length= 8)                         private String col_133;
	@FieldInfo(korName="space31",length=   1)                            private String col_134;
	@FieldInfo(korName="단기과열종목구분",length= 1)                     private String col_135;
	@FieldInfo(korName="ETF복제방법구분",length=1)                       private String col_136;
	@FieldInfo(korName="space32",length=   1)                            private String col_137;
	@FieldInfo(korName="KOSPI200고배당여부",length=   1)                 private String col_138;
	@FieldInfo(korName="KOSPI200저변동성여부",length= 1)                 private String col_139;
	@FieldInfo(korName="space33",length=   3)                            private String col_140;
	@FieldInfo(korName="만기일자",length= 8)                             private String col_141;
	@FieldInfo(korName="FILLER1",length=   3)                            private String filler1;
	@FieldInfo(korName="분배금형태코드",length=   2)                     private String col_143;
	@FieldInfo(korName="만기상환결정시작일",length=   8)                 private String col_144;
	@FieldInfo(korName="만기상환결정종료일",length=   8)                 private String col_145;
	@FieldInfo(korName="ETP상품구분",length=1)                           private String col_146;
	@FieldInfo(korName="지수산출기관코드",length= 1)                     private String col_147;
	@FieldInfo(korName="지수시장분류ID",length=   6)                     private String col_148;
	@FieldInfo(korName="지수일련번호",length= 3)                         private String col_149;
	@FieldInfo(korName="추적지수레버리지구분",length= 2)                 private String col_150;
	@FieldInfo(korName="참고지수레버리지구분",length= 2)                 private String col_151;
	@FieldInfo(korName="지수자산분류ID1",length=6)                       private String col_152;
	@FieldInfo(korName="지수자산분류ID2",length=6)                       private String col_153;
	@FieldInfo(korName="LP주문가능여부",length=   1)                     private String col_154;
	@FieldInfo(korName="KOSDAQ150지수종목여부",length=  1)               private String col_155;
	@FieldInfo(korName="저유동성여부",length= 1)                         private String col_156;
	@FieldInfo(korName="이상급등여부",length= 1)                         private String col_157;
	@FieldInfo(korName="KRX300지수여부",length=  1)                      private String col_158;
	@FieldInfo(korName="상한수량",length= 16)                            private String col_159;
	@FieldInfo(korName="FILLER2",length=   132)                           private String col_160;
	
	
	@JsonIgnore
	public String getInsertSql() {
		String sql = String.format("insert into A0 select '%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				+ "  ,'%s','%s','%s','%s','%s'   ,'%s','%s','%s','%s','%s'"
				,col_1  
				,col_2  
				,col_3  
				,col_4  
				,col_5  
				,col_6  
				,col_7  
				,col_8  
				,col_9  
				,col_10 
				,col_11 
				,col_12 
				,col_13 
				,col_14 
				,col_15 
				,col_16 
				,col_17 
				,col_18 
				,col_19 
				,col_20 
				,col_21 
				,col_22 
				,col_23 
				,col_24 
				,col_25 
				,col_26 
				,col_27 
				,col_28 
				,col_29 
				,col_30 
				,col_31 
				,col_32 
				,col_33 
				,col_34 
				,col_35 
				,col_36 
				,col_37 
				,col_38 
				,col_39 
				,col_40 
				,col_41 
				,col_42 
				,col_43 
				,col_44 
				,col_45 
				,col_46 
				,col_47 
				,col_48 
				,col_49 
				,col_50 
				,col_51 
				,col_52 
				,col_53 
				,col_54 
				,col_55 
				,col_56 
				,col_57 
				,col_58 
				,col_59 
				,col_60 
				,col_61.toString() 
				,col_62 
				,col_63 
				,col_64 
				,col_65 
				,col_66 
				,col_67 
				,col_68 
				,col_69.toString() 
				,col_70 
				,col_71 
				,col_72 
				,col_73 
				,col_74.toString() 
				,col_75 
				,col_76 
				,col_77 
				,col_78 
				,col_79.toString() 
				,col_80 
				,col_81 
				,col_82 
				,col_83 
				,col_84.toString() 
				,col_85.toString() 
				,col_86 
				,col_87 
				,col_88 
				,col_89 
				,col_90 
				,col_91 
				,col_92 
				,col_93 
				,col_94 
				,col_95 
				,col_96 
				,col_97 
				,col_98 
				,col_99 
				,col_100
				,col_101
				,col_102
				,col_103
				,col_104
				,col_105
				,col_106
				,col_107
				,col_108
				,col_109
				,col_110
				,col_111
				,col_112
				,col_113
				,col_114
				,col_115
				,col_116
				,col_117.toString()
				,col_118
				,col_119
				,col_120
				,col_121
				,col_122
				,col_123
				,col_124
				,col_125
				,col_126
				,col_127.toString()
				,col_128
				,col_129
				,col_130
				,col_131
				,col_132
				,col_133
				,col_134
				,col_135
				,col_136
				,col_137
				,col_138
				,col_139
				,col_140
				,col_141
				
				 );
		return sql;
	}	
	
	@JsonIgnore
	public String getUpdateSql() {
		String sql = String.format("update A0 set "
		+ "  %s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s' ,%s='%s',%s='%s',%s='%s',%s='%s',%s='%s'"
		+ " where %s='%s' "
				,"DATA구분             ",col_1  
				,"정보구분             ",col_2  
				,"시장구분             ",col_3  
				,"일련번호             ",col_5  
				,"단축코드             ",col_6  
				,"종목한글약명         ",col_7  
				,"종목영문약명         ",col_8  
				,"영업일자             ",col_9  
				,"정보분배그룹번호     ",col_10 
				,"증권그룹ID           ",col_11 
				,"단위매매체결여부     ",col_12 
				,"락구분               ",col_13 
				,"액면가변경구분       ",col_14 
				,"시가기준가격종목여부 ",col_15 
				,"재평가종목사유코드   ",col_16 
				,"기준가격변경종목여부 ",col_17 
				,"임의종료발동조건코드 ",col_18 
				,"시장경보위험예고여부 ",col_19 
				,"시장경보구분         ",col_20 
				,"지배구조우량여부     ",col_21 
				,"관리종목여부         ",col_22 
				,"불성실공시지정여부   ",col_23 
				,"우회상장여부         ",col_24 
				,"거래정지여부         ",col_25 
				,"지수업종대분류       ",col_26 
				,"지수업종중분류       ",col_27 
				,"지수업종소분류       ",col_28 
				,"업종ID               ",col_29 
				,"KOSPI200섹터업종     ",col_30 
				,"시가총액규모코드     ",col_31 
				,"제조업중소기업여부   ",col_32 
				,"KRX100종목여부       ",col_33 
				,"space1               ",col_34 
				,"지배구조소속부구분   ",col_35 
				,"투자기구구분         ",col_36 
				,"KOSDAQ지수종목여부   ",col_37 
				,"space2               ",col_38 
				,"KOSPI50여부          ",col_39 
				,"space3               ",col_40 
				,"space4               ",col_41 
				,"space5               ",col_42 
				,"space6               ",col_43 
				,"space7               ",col_44 
				,"space8               ",col_45 
				,"space9               ",col_46 
				,"space10              ",col_47 
				,"space11              ",col_48 
				,"space12              ",col_49 
				,"space13              ",col_50 
				,"space14              ",col_51 
				,"space15              ",col_52 
				,"기준가격             ",col_53 
				,"전일종가구분         ",col_54 
				,"전일종가             ",col_55 
				,"전일누적체결수량     ",col_56 
				,"전일누적거래대금     ",col_57 
				,"상한가               ",col_58 
				,"하한가               ",col_59 
				,"대용가격             ",col_60 
				,"액면가               ",col_61.toString() 
				,"발행가격             ",col_62 
				,"상장일자             ",col_63 
				,"상장주식수           ",col_64 
				,"정리매매여부         ",col_65 
				,"EPS부호              ",col_66 
				,"EPS                  ",col_67 
				,"PER부호              ",col_68 
				,"PER                  ",col_69.toString() 
				,"PER산출제외여부      ",col_70 
				,"BPS부호              ",col_71 
				,"BPS                  ",col_72 
				,"PBR부호              ",col_73 
				,"PBR                  ",col_74.toString() 
				,"PBR산출제외여부      ",col_75 
				,"결손여부             ",col_76 
				,"주당배당금액         ",col_77 
				,"주당배당산출제외여부 ",col_78 
				,"배당수익율           ",col_79.toString() 
				,"존립개시일자         ",col_80 
				,"존립종료일자         ",col_81 
				,"행사기간개시일자     ",col_82 
				,"행사기간종료일자     ",col_83 
				,"ELW행사가격          ",col_84.toString() 
				,"자본금               ",col_85.toString() 
				,"신용주문가능여부     ",col_86 
				,"지정가호가조건구분   ",col_87 
				,"시장가호가조건구분   ",col_88 
				,"조건부호가조건구분   ",col_89 
				,"최유리호가조건구분   ",col_90 
				,"최우선호가조건구분   ",col_91 
				,"증자구분             ",col_92 
				,"종류주권구분         ",col_93 
				,"국민주여부           ",col_94 
				,"평가가격             ",col_95 
				,"최저호가가격         ",col_96 
				,"최고호가가격         ",col_97 
				,"정규장매매수량단위   ",col_98 
				,"시간외매매수량단위   ",col_99 
				,"리츠종류코드         ",col_100
				,"목적주권종목코드     ",col_101
				,"space16              ",col_102
				,"space17              ",col_103
				,"space18              ",col_104
				,"space19              ",col_105
				,"통화ISO코드          ",col_106
				,"국가코드             ",col_107
				,"시장조성가능여부     ",col_108
				,"시간외매매가능여부   ",col_109
				,"시간외종가가능여부   ",col_110
				,"시간외대량가능여부   ",col_111
				,"시간외바스켓가능여부 ",col_112
				,"예상체결가공개여부   ",col_113
				,"공매도가능여부       ",col_114
				,"space20              ",col_115
				,"추적수익율배수부호   ",col_116
				,"추적수익율배수       ",col_117.toString()
				,"space21              ",col_118
				,"space22              ",col_119
				,"space23              ",col_120
				,"space24              ",col_121
				,"space25              ",col_122
				,"space26              ",col_123
				,"RegulationS적용여부  ",col_124
				,"기업인수목적회사여부 ",col_125
				,"과세유형코드         ",col_126
				,"대용가격사정비율     ",col_127.toString()
				,"space27              ",col_128
				,"space28              ",col_129
				,"space29              ",col_130
				,"space30              ",col_131
				,"투자주의환기종목여부 ",col_132
				,"상장폐지일자         ",col_133
				,"space31              ",col_134
				,"단기과열종목구분     ",col_135
				,"ETF복제방법구분      ",col_136
				,"space32              ",col_137
				,"KOSPI200고배당여부   ",col_138
				,"KOSPI200저변동성여부 ",col_139
				,"space33              ",col_140
				,"만기일자             ",col_141

				,"종목코드             ",col_4  

				);		
	return sql;
}	
}
