<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="nav.jsp" %>

<div class="container">
	<form action="/join" method="POST" class="was-validated">
	  
<%-- 	     	<a class="nav-link" href="/join2">회사:<sec:authentication property="principal.companyNo" /></a>
 --%>
	  <div class="form-group">
	    <label for="companyNo">회사:</label>
	    <input type="text" class="form-control" id="companyNo"  name="companyNo" readonly value=<sec:authentication property="principal.companyNo" />>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
	  
	  <div class="form-group">
	    <label for="userId">UserID:</label>
	    <input type="text" class="form-control" id="userId" placeholder="Enter userId" name="userId" autocomplete="new-password" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
	  
	  <div class="form-group">
	    <label for="pwd">Password:</label>
	    <input type="password" class="form-control" id="password" placeholder="Enter password" autocomplete="new-password" name="password" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
	  
	  <div class="form-group">
	    <label for="userName">이름:</label>
	    <input type="text" class="form-control" id="userName" placeholder="Enter user명" name="userName" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
	  
	  <div class="form-group">
	    <label for="role">역할:</label>
<!-- 	    <input type="text" class="form-control" id="role" placeholder="Enter role" name="role" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
 -->	    
		<select class="form-select" aria-label="Default select " name="role"  id="role">
		  <option selected>사용자 권한</option>
		  <option value="ADMIN">ADMIN</option>
		  <option value="MEMBER">MEMBER</option>
		  <option value="GUEST">GUEST</option>
		</select>
	    
	  </div>


	  <div class="form-group">
	    <label for="email">email:</label>
	    <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>

	  <button type="submit" class="btn btn-primary">회원가입 완료</button>
	</form>
</div>