package com.pjy.dashboard.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
public class CpsVo {

    private static final long serialVersionUID = -273437998803936928L;

    /**
     * 시뮬레이션 거래 시
     * < input >
     * - 기관코드(필수), 운용사코드(필수), 운용역사용자ID(필수), 사전적용단계구분코드(필수), 주문일자(필수), 거래코드(필수), 시뮬거래번호(필수), 시뮬계산구분코드(필수)
     * < output >
     *  [ ArrayList ]
     *    - input정보 + 등록일련번호, 펀드코드, 위반여부, 위반건수
     */
    /**
     * 주문지 생성 거래 시
     * < input >
     * - 기관코드(필수), 운용사코드(필수), 운용역사용자ID(필수), 사전적용단계구분코드(필수), 주문일자(필수), 거래코드(필수), 시뮬거래번호(필수), 시뮬계산구분코드(필수)
     *   [ ArrayList ] 주문번호(필수)
     * < output >
     *  [ ArrayList ]
     *    - input정보 + 등록일련번호, 펀드코드, 위반여부, 위반건수
     */

    private List<Long> ornoList = new ArrayList<Long>();  // [ ArrayList ] 주문번호(필수)

    /**
     * 위반상세처리여부
     */
    private String dtlYn;    
    /**
     * Array건수
     */
    private Integer arrayCnt;    

    /*
     * INPUT 관련 정보
     */
    /**
     * 기관코드
     */
    private String istCd;      
    /**
     * 운용사코드
     */
    private String amcoCd;    
    /**
     * 운용역사용자ID
     */
    private String fnmnUsid;  
    /**
     * 사전적용단계구분코드 [공통코드:M0582]
     */
    private String bfrAplyStgTc;
    /**
     * 주문일자
     */
    private String ordDt;      
    /**
     * 거래코드
     */
    private String trCd;      
    /**
     * 시뮬레이션거래번호
     */
    private Long simlTrno;    
    /**
     * 등록일련번호
     */
    private Long enrSno;   
    /**
     * 시뮬계산구분코드
     */
    private String simlCalTc; 
    /**
     * 주문번호
     */
    private Long orno;     
    /**
     * 종목주문번호
     */
    private Long itmOrno;   
    /**
     * 펀드코드
     */
    private String fndCd;    
    /**
     * 티커코드
     */
    private String tickrCd;   

    /*
     * 시스템 관련 정보
     */
    /**
     * 서버IP
     */
    private String hostIp;     
    /**
     * exeUserId
     */
    private String exeUserId;  
    /**
     * jobId
     */
    private String jobId;    
    /**
     * 배치일자
     */
    private String bseDt;    


    /**
     * 위반건수
     */
    private Integer vltCnt   ;    
    /**
     * 경고건수
     */
    private Integer wrnCnt   ;     
    /**
     * 컴플승인대상건수
     */
    private Integer cmpCnt   ;    
    /**
     * CIO승인대상건수
     */
    private Integer cioCnt   ;    
    /**
     * 투자전략승인대상건수
     */
    private Integer ivSgcCnt ;    
    /**
     * 리스크승인대상건수
     */
    private Integer rskCnt   ;    
    /**
     * 신용CIO승인대상건수
     */
    private Integer crdCioCnt;    

    /*
     * 점검결과 처리용 정보
     */
    /**
     * 위반경고구분코드(0:정상,1:위반,2:경고)
     */
    private String vltWrnTc ;     
    /**
     * (결과)점검값
     */
    private Double rltCkgValu = 0d;    
    /**
     * (결과)위반기준상한값
     */
    private Double rltVltBseHlmValu = 0d;   
    /**
     * (결과)위반기준하한값
     */
    private Double rltVltBseLltValu = 0d;  
    /**
     * (결과)경고기준상한값
     */
    private Double rltWrnBseHlmValu = 0d;  
    /**
     * (결과)경고기준하한값
     */
    private Double rltWrnBseLltValu = 0d;   
    /* 삭제예정 시작 */
    /**
     * (결과)보유상한비율
     */
    private Double rltHldHlmRt = 0d;       
    /**
     * (결과)보유하한비율
     */
    private Double rltHldLltRt = 0d;      
    /**
     * (결과)채권하한신용등급코드
     */
    private String rltBdLltCrdGrCd;    
    /**
     * (결과)채권상한신용등급코드
     */
    private String rltBdHlmCrdGrCd;    
    /**
     * (결과)보유수량
     */
    private Double rltHldQty = 0d;          
    /**
     * (결과)예상지분율
     */
    private Double rltAtpQtaRt = 0d;     
    /**
     * (결과)위반오차
     */
    private Double rltVltAbr = 0d;      
    /**
     * (결과)비고
     */
    private String rltRmk;               
    /* 삭제예정 끝 */

    /*
     * 펀드별 점검룰 조회 정보
     */
    
    /**
     * 점검항목그룹구분코드
     */
    private String ckgHdnGrpTc;   
    /**
     * 유니버스코드
     */
    private String unvrCd;             
    /**
     * 점검함수
     */
    private String ckgFuncSvcNm;         
    /**
     * 점검항목코드
     */
    private String ckgHdnCd;        
    /**
     * 점검항목명
     */
    private String ckgHdnNm;      
    /**
     * 점검시점구분(1:사전,2:장중,3:사전/장중)
     */
    private String ckgPtmTc;            
    /**
     * 컴플라이언스승인대상여부
     */
    private String cmplApvTgtYn;  
    /**
     * CIO승인대상여부
     */
    private String cioApvTgtYn;    
    /**
     * 투자전략승인대상여부
     */
    private String ivSgcApvTgtYn;      
    /**
     * 리스크승인대상여부
     */
    private String rskApvTgtYn;      
    /**
     * 신용CIO승인대상여부
     */
    private String crdCioApvTgtYn;  
    /**
     * 컴플라이언스 매수매도구분코드(A:전체, B:매수, S:매도)
     */
    private String cmplBuySllTc;     
    /**
     * 상한비율
     */
    private Double hlmRt = 0d;        
    /**
     * 하한비율
     */
    private Double lltRt = 0d;       
    /**
     * 경고상한비율
     */
    private Double wrnHlmRt = 0d;       
    /**
     * 경고하한비율
     */
    private Double wrnLltRt = 0d;      
    /**
     * 채권등급상한
     */
    private String bdGrHlm;          
    /**
     * 채권등급하한
     */
    private String bdGrLlt;            
    /**
     * 채권등급상한점수
     */
    private Double bdGrHlmPit = 0d;     
    /**
     * 채권등급하한점수
     */
    private Double bdGrLltPit = 0d;    
    /**
     * 채권등급경고상한
     */
    private String bdGrWrnHlm;          
    /**
     * 채권등급경고하한
     */
    private String bdGrWrnLlt;       
    /**
     * 채권등급경고상한점수
     */
    private Double bdGrWrnHlmPit = 0d; 
    /**
     * 채권등급경고하한점수
     */
    private Double bdGrWrnLltPit = 0d; 
    /**
     * 유동등급상한
     */
    private String fudGrHlm;            
    /**
     * 유동등급하한
     */
    private String fudGrLlt;        
    /**
     * 유동등급상한점수
     */
    private Double fudGrHlmPit = 0d;    
    /**
     * 유동등급하한점수
     */
    private Double fudGrLltPit = 0d;  
    /**
     * 유동등급경고상한
     */
    private String fudGrWrnHlm;         
    /**
     * 유동등급경고하한
     */
    private String fudGrWrnLlt;  
    /**
     * 유동등급경고상한점수
     */
    private Double fudGrWrnHlmPit = 0d; 
    /**
     * 유동등급경고하한점수
     */
    private Double fudGrWrnLltPit = 0d; 
    /**
     * 잔존만기1
     */
    private Double svlXrt1 = 0d;        
    /**
     * 잔존만기2
     */
    private Double svlXrt2 = 0d;       
    /**
     * 상한수정듀레이션
     */
    private Double hlmAdjtDrt = 0d;     
    /**
     * 하한수정듀레이션
     */
    private Double lltAdjtDrt = 0d;    
    /**
     * 경고상한수정듀레이션
     */
    private Double wrnHlmAdjtDrt = 0d; 
    /**
     * 경고하한수정듀레이션
     */
    private Double wrnLltAdjtDrt = 0d;  
    /**
     * 기타1
     */
    private String etc1;               
    /**
     * 기타2
     */
    private String etc2;             
    /**
     * 기타3
     */
    private String etc3;                
    /**
     * 집합자산분류
     */
    private String cmpsCpstAstCls;   
    /**
     * 국내외점검구분코드
     */
    private String hbrdCkgTc;          
    /**
     * 합성유니버스여부
     */
    private String cpstUnvrYn;       
    /**
     * 소프트룰여부
     */
    private String softRuleYn;    
    /**
     * 수익자코드(펀드기본)
     */
    private String bnrCd;    
    /**
     * 기본여부
     */
    private String bseYn;    


    /*
     * 점검룰 체크 관련 정보
     */
    /**
     * 위반여부
     */
    private String vltYn;            
    /**
     * 종목코드
     */
    private String itmCd;        
    /**
     * 종목명
     */
    private String itmNm;        
    /**
     * 종목코드 JHJ 삭제예정
     */
    private String stnItmCd;         
    /**
     * 기초자산구분코드(시뮬기본)
     */
    private String basAstTc;   
    /**
     * 처리일련번호
     */
    private Long pcsSno;            
    /**
     * 보유금액
     */
    private Double hldAmt = 0d;       
    /**
     * 보유비율
     */
    private Double hldRt = 0d;      
    /**
     * 계산기준금액
     */
    private Double calBseAmt = 0d;   
    /**
     * 확정주문번호
     */
    private String dfnOrno;     
    /**
     * 보유상한비율
     */
    private Double hldHlmRt = 0d;  
    /**
     * 보유하한비율
     */
    private Double hldLltRt = 0d;   
    /**
     * ETF여부
     */
    private String isEtf;            
    /**
     * 예상NAV 삭제예정
     */
    private Double nav = 0d;       
    /**
     * 분모금액
     */
    private Double dnmAmt = 0d;     
    /**
     * I:종목, F:펀드
     */
    private String outUnit = "";     
    /**
     * 한도체크단위(H:한도설정체크)
     */
    private String isLmt = "";         
    /**
     * 분모 (예: NAV => 분모값이 NAV)
     */
    private String dnm = "";       
    /**
     * 분모값 포함하여 조회처리여부 (Y/N)
     */
    private String isDnm = "";     
    /**
     * 신용등급
     */
    private String crdGr = "";       
    /**
     * 비고
     */
    private String rmk = "";
    /**
     * 위반사유내용
     */
    private String vltRsnCts = "";     
    /**
     * 대상펀드 전체 조회처리 여부
     */
    private String fndCdsYn = "N";    
    /**
     * 주식인 경우
     */
    private String kscCd = "";    
    /**
     * ISIN코드
     */
    private String isinCd;            
    /**
     * 투자구분코드
     */
    private String ivTc;             
    /**
     * 종목건수
     */
    private Integer itmCnt;          
    /**
     * 코스콤발행기관코드
     */
    private String kscPubIstCd;        
    /**
     * 주문관리 매수매도구분코드(B:매수, S:매도)
     */
    private String buySllTc;           
    /**
     * 통화코드
     */
    private String curCd;      
    /**
     * ISO국가코드
     */
    private String isoNtnCd;        
    /**
     * 발행기관건수
     */
    private Integer pubIstCnt;            
    /**
     * 거래정지건수
     */
    private Integer trStopCnt;       
    /**
     * 발행증권건수
     */
    private Integer pubScuCnt;     
    /**
     * 최종등급점수
     */
    private Double lstGrPit = 0d;     
    /**
     * 최종등급코드
     */
    private String lstGrCd;      
    /**
     * 자산구분
     */
    private String astDtt;             
    /**
     * 발행총수량
     */
    private Double pubTotQty = 0d;     
    /**
     * 계산결과비율
     */
    private Double calRltRt = 0d;      
    /**
     * 계산결과일자
     */
    private String calRltDt;           
    /**
     * 계산결과일수
     */
    private Integer calRltDds;            
    /**
     * 계산결과건수
     */
    private Integer calRltCnt;     
    /**
     * 위반기준일수
     */
    private Integer vltBseDds;   
    /**
     * 만기일자
     */
    private String rdmDt;            
    /**
     * 보유수량
     */
    private Double hldQty = 0d;      
    /**
     * 미체결수량
     */
    private Double nccsQty = 0d;     
    /**
     * 주문수량
     */
    private Double ordQty = 0d;        
    /**
     * 개별자산NAV
     */
    private Double itmNav = 0d;        
    /**
     * 개별자산NAV합산
     */
    private Double itmNavSum = 0d;    
    /**
     * 개별자산비중
     */
    private Double itmWhgt = 0d;       
    /**
     * 펀드자산비중
     */
    private Double fndWhgt = 0d;     


    /*
     * IBOR 관련 정보
     */
    
    /**
     * 티커코드
     */
    private String iborTickrCd;         
    /**
     * 표준종목코드
     */
    private String iborStnItmCd;        
    /**
     * IBOR 종목수량
     */
    private Double iborItmQty = 0d;     
    /**
     * 상품코드
     */
    private String iborPrdCd;        
    /**
     * 포지션관리기준번호
     */
    private String iborPtMngBseNo;  
    /**
     * 기초자산where조건문
     */
    private String whereText;       
    /**
     * 추가where조건문
     */
    private String addWhere;      

    /*
     * NAV 관련 정보
     */
    /**
     * 펀드순자산가치
     */
    private Double fndNav = 0d;        
    /**
     * 총자산금액
     */
    private Double totAstAmt = 0d;    

    /*
     * 가용자금 관련 정보
     */
    /**
     * 가용자금포지션구분코드
     */
    private String ablFunPtTc;
    /**
     * 가용자금포지션통화코드
     */
    private String ablCurCd;
    /**
     * T00가용자금금액
     */
    private Double t00AblFunAmt = 0d;    
    /**
     * T01가용자금금액
     */
    private Double t01AblFunAmt = 0d;    
    /**
     * T02가용자금금액
     */
    private Double t02AblFunAmt = 0d;    
    /**
     * T03가용자금금액
     */
    private Double t03AblFunAmt = 0d;    
    /**
     * T04가용자금금액
     */
    private Double t04AblFunAmt = 0d;    
    /**
     * T05가용자금금액
     */
    private Double t05AblFunAmt = 0d;    
    /**
     * T06가용자금금액
     */
    private Double t06AblFunAmt = 0d;    
    /**
     * T07가용자금금액
     */
    private Double t07AblFunAmt = 0d;    
    /**
     * T08가용자금금액
     */
    private Double t08AblFunAmt = 0d;    
    /**
     * T09가용자금금액
     */
    private Double t09AblFunAmt = 0d;    
    /**
     * T10가용자금금액
     */
    private Double t10AblFunAmt = 0d;    
    /**
     * T11가용자금금액
     */
    private Double t11AblFunAmt = 0d;    
    /**
     * T12가용자금금액
     */
    private Double t12AblFunAmt = 0d;    
    /**
     * T13가용자금금액
     */
    private Double t13AblFunAmt = 0d;    
    /**
     * T14가용자금금액
     */
    private Double t14AblFunAmt = 0d;    
    /**
     * T15가용자금금액
     */
    private Double t15AblFunAmt = 0d;    
    /**
     * T16가용자금금액
     */
    private Double t16AblFunAmt = 0d;    
    /**
     * T17가용자금금액
     */
    private Double t17AblFunAmt = 0d;    
    /**
     * T18가용자금금액
     */
    private Double t18AblFunAmt = 0d;    
    /**
     * T19가용자금금액
     */
    private Double t19AblFunAmt = 0d;    
    /**
     * T20가용자금금액
     */
    private Double t20AblFunAmt = 0d;    


    public String toArgu() {
        String strArgu = "BfrVltIo.........[istCd:"+istCd+"][amcoCd:"+amcoCd+"][fnmnUsid:"+fnmnUsid+"][fndCd:"+fndCd+"][bfrAplyStgTc:"+bfrAplyStgTc+"][ordDt:"+ordDt+"][bseDt:"+bseDt+"]";
        strArgu = strArgu + "[bfrVltCd:"+ckgHdnCd+"][itmCd:"+itmCd+"][ckgFuncSvcNm:"+ckgFuncSvcNm+"][ckgHdnGrpTc:"+ckgHdnGrpTc+"]";
        strArgu = strArgu + "[simlTrno:"+simlTrno+"][simlCalTc:"+simlCalTc+"][orNo:"+orno+"][trCd:"+trCd+"][pcsSno:"+pcsSno+"]vltCnt["+vltCnt+"]VltYn["+vltYn+"]";
        return strArgu;
    }

}