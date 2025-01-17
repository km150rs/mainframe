<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="nav.jsp" %>
<title>메뉴</title>
<div class="container" style="height:90%">
		<div><br></div>
	<div class="row">
		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">사원정보</h4>
			    <p class="card-text">Upload</p>
			    <a href="#" onclick="callFunction('M1001'); return false;">상세보기</a>
			    <!-- <a href="/jsp/employeeInfo" class="btn btn-primary">상세보기</a>  -->
			  </div>
		  </div>
		</div>

		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">차량정보</h4>
			    <p class="card-text">Upload</p>
			    <a href="/jsp/carInfo" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">운전자정보</h4>
			    <p class="card-text">Upload</p>
			    <a href="/jsp/driverInfo" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">노선정보</h4>
			    <p class="card-text">Upload</p>
			    <a href="/jsp/routeInfo" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">ISC운전자ID</h4>
		    <p class="card-text">Upload</p>
		    <a href="/jsp/iscDriverInfo" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>		

		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">ISC운행기록</h4>
		    <p class="card-text">Upload</p>
		    <a href="/jsp/iscDrivingRecord" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>		
	</div>		
		<div><br></div>
	<div class="row">

		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">휴일관리</h4>
		    <p class="card-text">휴일등록 </p>
		    <a href="/jsp/holidayInfo" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>		


		
		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">휴가관리</h4>
		    <p class="card-text">휴가등록 </p>
		    <a href="/jsp/vacationManagement" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>		

		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">사고관리</h4>
			    <p class="card-text">교통사고등록</p>
			    <a href="/jsp/accidentInfo" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">노무관리</h4>
			    <p class="card-text">근태등록</p>
			    <a href="/jsp/empWorkingLog" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

 		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">행정민원 등록</h4>
			    <p class="card-text">upload 행정민원</p>
			    <a href="/jsp/publicComplaint" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>
 
		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body" style="text-align:center">
			    <h4 class="card-title">Upload 통계</h4>
			    <p class="card-text">upload 현황</p>
			    <a href="/jsp/uploadStatus" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

	</div>
		<div style="background-color:black;height:10px"></div>

	<div class="row">
	

		
		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">배차조회</h4>
		    <p class="card-text">월별 배차현황</p>
		    <a href="/jsp/arrangeBusView" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>		

		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">배차</h4>
		    <p class="card-text">월간 배차지정</p>
			<sec:authorize access="hasRole('ROLE_MEMBER')"> 
			    <a href="" class="btn btn-primary">상세보기</a>
			</sec:authorize>
			<sec:authorize access="hasRole('ROLE_ADMIN')"> 
			    <a href="/jsp/arrangeBus" class="btn btn-primary">상세보기</a>
			</sec:authorize>
		  </div>
		  </div>
		</div>
		
		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">승무지시</h4>
		    <p class="card-text">승무지시서 발급</p>
		    <a href="/jsp/drivingOrder" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>		

		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">배차현황표</h4>
		    <p class="card-text">배차현황표</p>
		    <a href="/jsp/drivingOrderAll" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>
		
		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">근로시간분석</h4>
		    <p class="card-text">근로시간/운행거리</p>
		    <a href="/jsp/empWorkingTimeView" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>
		
		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title">인사카드</h4>
		    <p class="card-text">인사종합정보</p>
		    <a href="/jsp/employeeCard" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>
	</div>
		<div><br></div>

	<div class="row">
		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">위험운전행동</h4>
			    <p class="card-text">upload</p>
			    <a href="/jsp/dangerDrivingInfo" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

	
		
		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">위험운전 분석</h4>
			    <p class="card-text">통계분석</p>
			    <a href="/jsp/dangerDrivingAnalyze" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>

		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
			    <h4 class="card-title">배차정시성</h4>
			    <p class="card-text">upload/검토</p>
			    <a href="/jsp/arrangePunctuality" class="btn btn-primary">상세보기</a>
			  </div>
		  </div>
		</div>


		<div class="col-sm-2">
		 <div class="card">
			  <div class="card-body">
 			    <h4 class="card-title">배차정시성</h4>
			    <p class="card-text">자료분석</p>			  
			    <a href="/jsp/arrangePunctualityAnalyze" class="btn btn-primary">상세보기</a>
<!-- 			    <h4 class="card-title">환경설정</h4>
			    <p class="card-text">사용자 정보 변경</p>
 --><!-- 			    <a href="/updateInfo" class="btn btn-primary">상세보기</a> -->
			  </div>
		  </div>
		</div>

<!-- 		<div class="col-sm-2">
		 <div class="card">
		  <div class="card-body">
		    <h4 class="card-title"></h4>
		    <p class="card-text"></p>
		    <a href="" class="btn btn-primary"></a>
		  </div>
		  </div>
		</div>
 -->
		<div class="col-sm-4">
		 <div class="card">
		  <div class="card-body" style="text-align:center">
		    <h4 class="card-title" >인사평가</h4>
		    <p class="card-text">종합평가</p>
		    <a href="/jsp/allEmpPointView" class="btn btn-primary">상세보기</a>
		  </div>
		  </div>
		</div>
				
	</div>
	
</div>

<script>
function callFunction(menuId) {
	console.log('call function : ' + menuId);
    //var parent = window.parent.document;
    parent.addTab(null, menuId);
    
	return true;
}
</script>