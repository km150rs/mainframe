<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

   
<!DOCTYPE html>
<html lang="en">


<!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_hover -->
<style>
html { background-color: #000; } 
body {
    min-height: 100vh;
    background-color: papayawhip; 
    margin: 0 auto;
}
.loginDiv {
	float:right;
	width:30%;
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
 	<div style="float:left;width:70%" class="myfilter" >
 		<button type="button" class="btn btn-primary" onclick="location.href='/'">버스배차관리</button>
 		<!-- button type="button" class="btn btn-primary" onclick="location.href='/'">버스배차관리(Bus Dispatch Management System)</button> -->
  	</div>	    
  	

  <div class="loginDiv" >
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
	      	<button class="dropbtn_login" onclick="location.href='/updateInfo'"><sec:authentication property="principal.displayName" /></button>
	      	<button class="dropbtn_login" ><sec:authentication property="principal.companyNm" /></button>
	      	
		</sec:authorize>
      </li>

    </ul>
  </div>  
</header>