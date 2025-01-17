<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

   
<!DOCTYPE html>
<html lang="en">


<!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_hover -->
<style>
.dropbtn {
/*   background-color: #04AA6D; */
  background-color: black;
    border-radius: 3em;
  color: white;
  padding: 10px;
  font-size: 12px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color:  #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content li {
  color: black;
  padding: 5px 5px;
  text-decoration: none;
  display: block;
}

.dropdown-content li:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #3e8e41;}

html { background-color: #000; } 
body {
    min-height: 100vh;
    background-color: papayawhip; 
    margin: 0 auto;
}

</style>



<head>
  <meta charset="utf-8">
    <title>버스배차관리</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"> 
<!--   <link href="/resources/static/js/pjy_extend/bootstrap.bundle.min.css" rel="stylesheet" > 
 -->  
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  
<!--   <script src="/webjars/jquery/3.5.1/jquery.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>  
    <!-- <script src="/resources/static/js/pjy_extend/popper.min.js"></script> --> <!-- dropdown 용-->
  <!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> -->


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script> 
  	<!-- <script src="/resources/static/js/pjy_extend/bootstrap.bundle.min.js"></script> -->
  
  	<link href="/main.css" rel="stylesheet">
  	<script src="/monitor/nav.js"></script>
	<script src="/resources/static/js/jquery.alert.js"></script> <!-- swal 용-->
	<script src="/resources/static/js/pjy_extend/shortcut.js"></script>
	
	
<script src="/resources/static/js/tui-date-picker.js"></script>
<link href="/resources/static/css/tui-date-picker.css" rel="stylesheet" type="text/css" />	
	
</head>
<body>

<header style="z-index:1000;height:5%" class="navbar navbar-expand-md bg-dark navbar-dark" >
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
 	<div style="width:20%" class="myfilter" >
 		<button type="button" class="btn btn-primary" onclick="location.href='/'">버스배차관리</button>
 		<!-- button type="button" class="btn btn-primary" onclick="location.href='/'">버스배차관리(Bus Dispatch Management System)</button> -->
  	</div>	    
  	

 	<div style="width:30%" class="myfilter" >
  		<sec:authorize access="isAuthenticated()"> 
 
	  	<div class="dropdown">
				  <button class="dropbtn" >기초자료</button>
				
				  <ul class="dropdown-content" >
				    <li><button class="dropdown-item" type="button" id="btnEmployee">사원관리</button></li>
				    <li><button class="dropdown-item" type="button" id="btnCarInfo">차량관리</button></li>
				    <li><button class="dropdown-item" type="button" id="btnDriverInfo">운전자관리</button></li>
				    <li><button class="dropdown-item" type="button" id="btnRouteInfo">노선관리</button></li>
				    <li><button class="dropdown-item" type="button" id="btnHoliday">휴일관리</button></li>
				    <li><button class="dropdown-item" type="button" id="btnIscDriverInfo">ISC운전자정보</button></li>
				  </ul>
		</div>
	  	<div class="dropdown">
				  <button class="dropbtn" >근태</button>
				
				  <ul class="dropdown-content" >
					    <li><button class="dropdown-item" type="button" id="btnEmpWorkingLog">근태등록</button></li>
					    <li><button class="dropdown-item" type="button" id="btnAccident">사고등록</button></li>
					    <li><button class="dropdown-item" type="button" id="btnVacationManagement">휴가등록</button></li>
					    <li><button class="dropdown-item" type="button" id="btnPublicComplaint">행정민원등록</button></li>
				  </ul>
		</div>

	  	<div class="dropdown">
				  <button class="dropbtn" >노무/배차</button>
				
				  <ul class="dropdown-content" >
					    <li><button class="dropdown-item" type="button" id="btnArrange">배차등록</button></li>
					    <li><button class="dropdown-item" type="button" id="btnArrangeView">배차내역조회</button></li>
					    <li><button class="dropdown-item" type="button" id="btnDrivingOrder">승무지시</button></li>
					    <li><button class="dropdown-item" type="button" id="btnDrivingOrderAll">배차현황판</button></li>
				  </ul>
		</div>
	  	
	  	<div class="dropdown">
				  <button class="dropbtn" >운행기록</button>
				
				  <ul class="dropdown-content" >
					<sec:authorize access="hasRole('ROLE_MEMBER')"> 
					    <li><button class="dropdown-item" type="button" id="btnArrangeView">배차현황조회</button></li>
					</sec:authorize>
					<sec:authorize access="hasRole('ROLE_ADMIN')"> 
					    <li><button class="dropdown-item" type="button" id="btnDrivingRecord">ISC운행기록등록</button></li>
					    <li><button class="dropdown-item" type="button" id="btnDanger">위험운전 자료등록</button></li>
					    <li><button class="dropdown-item" type="button" id="btnPunctuality">배차정시성 자료등록</button></li>
					</sec:authorize>
				  
				  </ul>
		</div>

		<div class="dropdown">
				  <button class="dropbtn" >인사</button>
				
				  <ul class="dropdown-content" >
					<sec:authorize access="hasRole('ROLE_MEMBER')"> 
					    <li><button class="dropdown-item" type="button" id="btnDangerView">위험운전 분석</button></li>
					    <li><button class="dropdown-item" type="button" id="btnPunctualityView">배차정시성 분석</button></li>
					</sec:authorize>
					<sec:authorize access="hasRole('ROLE_ADMIN')"> 
					    <li><button class="dropdown-item" type="button" id="btnEmployeeCard">개인 인사카드</button></li>
					    <li><button class="dropdown-item" type="button" id="btnDangerView">위험운전 분석</button></li>
					    <li><button class="dropdown-item" type="button" id="btnPunctualityView">배차정시성 상세분석</button></li>
					    <li><button class="dropdown-item" type="button" id="btnEmpWorkingTimeView">근로시간 분석</button></li>
					</sec:authorize>
				  
				  </ul>
		</div>
				</sec:authorize>
	</div>

  <div style="width:50%;float:right" class="paginationDiv" >
    <ul class="navbar-nav" style="float:right">
      <li class="nav-item">
		<sec:authorize access="isAnonymous()"> 
			<a class="nav-link" href="/login2">Login</a>
		</sec:authorize> 
		<sec:authorize access="isAuthenticated()"> 
			<a class="nav-link" href="/logout">Logout</a>
		</sec:authorize>
      </li>
      <li class="nav-item">
		<sec:authorize access="hasRole('ROLE_ADMIN')"> 
			<a class="nav-link" href="/join2">Join</a>
		</sec:authorize>
      </li>
		
<%--       <li class="nav-item">
		<sec:authorize access="isAnonymous()"> 
			
		</sec:authorize> 
		<sec:authorize access="isAuthenticated()"> 
	      	<a class="nav-link" href="">회사:<sec:authentication property="principal.companyNo" /></a>
		</sec:authorize>
      </li> --%>

<%--       <li class="nav-item">
		<sec:authorize access="isAnonymous()"> 
			
		</sec:authorize> 
		<sec:authorize access="isAuthenticated()"> 
	      	<a class="nav-link" href=""><sec:authentication property="principal.username" /></a>
		</sec:authorize>
      </li>
 --%> 
      <li class="nav-item">
		<sec:authorize access="isAnonymous()"> 
			
		</sec:authorize> 
		<sec:authorize access="isAuthenticated()"> 
	      	<button class="dropbtn" onclick="location.href='/updateInfo'"><sec:authentication property="principal.displayName" /></button>
	      	<button class="dropbtn" ><sec:authentication property="principal.companyNm" /></button>
	      	
		</sec:authorize>
      </li>

    </ul>
  </div>  
</header>
