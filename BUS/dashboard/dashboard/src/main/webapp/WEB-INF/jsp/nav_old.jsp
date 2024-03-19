
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<style>

.dropdown:hover>.dropdown-menu {
  display: block;
}

.dropdown>.dropdown-toggle:active {
  /*Without this, clicking will make it sticky*/
    pointer-events: none;
}
</style>
   
<!DOCTYPE html>
<html lang="en">


<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  
  <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> -->

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
  
  	<link href="/main.css" rel="stylesheet">
  	<script src="/monitor/nav.js"></script>
	<script src="/resources/static/js/jquery.alert.js"></script>
</head>
<body>

<header class="navbar navbar-expand-md bg-dark navbar-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
 	<div style="width:35%" class="myfilter" >
  		<h4><a href="/"> <span> TMS(Transportation Management System) </span></a></h4>
  	</div>	    
  	
 
 
  	<div style="width:10%" class="dropdown">
			  <button class="btn  btn-primary  dropdown-toggle" type="button" id="dropdown1" data-bs-toggle="dropdown" aria-expanded="false">
			    기본정보관리
			  </button>
			
			  <ul class="dropdown-menu" aria-labelledby="dropdown1">
			    <li><button class="dropdown-item" type="button" id="btnEmployee">사원관리</button></li>
			    <li><button class="dropdown-item" type="button" id="btnCarInfo">차량관리</button></li>
			    <li><button class="dropdown-item" type="button" id="btnDriverInfo">운전자관리</button></li>
			    <li><button class="dropdown-item" type="button" id="btnRouteInfo">노선관리</button></li>
			  </ul>
	</div>
  	<div style="width:10%" class="dropdown">
			  <button class="btn btn-info dropdown-toggle" type="button" id="dropdown2" data-bs-toggle="dropdown" aria-expanded="false">
			    근태/휴일관리
			  </button>
			
			  <ul class="dropdown-menu" aria-labelledby="dropdown2">
			    <li><button class="dropdown-item" type="button" id="btnAttendance">근태관리</button></li>
			    <li><button class="dropdown-item" type="button" id="btnHoliday">휴일관리</button></li>
			  </ul>
	</div>
  	
  	<div style="width:10%" class="dropdown">
			  <button class="btn btn-warning dropdown-toggle" type="button" id="dropdown3" data-bs-toggle="dropdown" aria-expanded="false">
			    배차관리
			  </button>
			
			  <ul class="dropdown-menu" aria-labelledby="dropdown3">
			<sec:authorize access="hasRole('ROLE_MEMBER')"> 
			    <li><button class="dropdown-item" type="button" id="btnHoliday">배차조회</button></li>
			</sec:authorize>
			<sec:authorize access="hasRole('ROLE_ADMIN')"> 
			    <li><button class="dropdown-item" type="button" id="btnAttendance">배차</button></li>
			    <li><button class="dropdown-item" type="button" id="btnHoliday">배차조회</button></li>
			</sec:authorize>
			  
			  </ul>
	</div>

  <div style="width:35%;float:right" class="paginationDiv" >
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
      <li class="nav-item">
		<sec:authorize access="isAnonymous()"> 
			
		</sec:authorize> 
		<sec:authorize access="isAuthenticated()"> 
	      	<a class="nav-link" href=""><sec:authentication property="principal.username" /></a>
		</sec:authorize>
      </li>
 
      <li class="nav-item">
		<sec:authorize access="isAnonymous()"> 
			
		</sec:authorize> 
		<sec:authorize access="isAuthenticated()"> 
	      	<a class="nav-link" href="">[<sec:authentication property="principal.displayName" />]</a>
		</sec:authorize>
      </li>

    </ul>
  </div>  
</header>
