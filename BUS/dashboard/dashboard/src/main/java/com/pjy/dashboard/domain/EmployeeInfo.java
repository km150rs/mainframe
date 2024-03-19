package com.pjy.dashboard.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EmployeeInfo {

    String empNo;       //사원번호	    integer
    String empNm;       //사원명	    varchar(10)
    String birthDay;    //생년월일	    varchar(13)
    String sex;         //성별	        varchar(2)
    String teamNm;      //부서	        varchar(10)
    String posNm;       //직위	        varchar(10)
    String enterDate;   //입사일	    varchar(8)
    String exitDate;    //퇴사일	    varchar(8)
    String jobYear;     //근속년월	    varchar(10)
    String phoneNo;     //핸드폰	    varchar(15)
    String email;       //EMAIL	    varchar(20)
    String jobKind;     //구분	        varchar(20)
    String jobType;     //직종	        varchar(20)
    String bigo;        //비고       varchar(20)	
}
