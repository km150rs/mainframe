<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="nav.jsp" %>
<link href="/main.css" rel="stylesheet">
<script src="/monitor/login.js"></script>
<div class="container container_pjy">
	<form action="/login2" method="post" class="was-validated">
	
	  <div class="form-group">
	    <label for="companyNo">소속회사</label>
		<select id="companyNo" class="form-select" aria-label="Default select example" name="companyNo">
		  <!-- <option selected>---회사명---</option>
		  <option value="100">A교통</option>
		  <option value="200">B교통</option>
		   -->
		</select>	
	  </div>
	  <P>
	  <div class="form-group">
	    <label for="userId">USER ID</label>
	    <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">user id를 입력하세요</div>
	  </div>
	  
	  <div class="form-group">
	    <label for="password">비밀번호</label>
	    <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">비밀번호를 입력하세요.</div>
	  </div>
	  <!-- 
	  <div class="form-group form-check">
	    <input type="checkbox" class="form-check-input" id="exampleCheck1" name="auto_login">
	    <label class="form-check-label" for="exampleCheck1">Check me out</label>
	  </div>
	   -->
	  <button type="submit" class="btn btn-primary">로그인</button>
	</form>
	    <!-- <a href="/oauth2/authorization/naver">네이버 로그인</a>    <br><br> -->
</div>