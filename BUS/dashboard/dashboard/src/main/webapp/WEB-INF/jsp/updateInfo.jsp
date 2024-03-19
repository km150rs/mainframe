<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="nav.jsp" %>
    <style>
    .secure-font{
        -webkit-text-security:disc;
    }
    </style>
<div class="container">
	<form action="/updateInfo" method="POST" class="was-validated" >
	  
	  <div class="form-group">
	    <label for="UserID">UserID:</label>
	    <input type="text" class="form-control" id="userId" placeholder="Enter userId" name="userId"  value="${memberVo.userId}" readonly >
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
	  
	  <div class="form-group">
	    <label for="pwd">Password:</label>
	    <input type="text" class="form-control secure-font" id="password" placeholder="Enter password" name="password" value="?" autocomplete="new-password" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
	  <div class="form-group">
	    <label for="userName">name:</label>
	    <input type="text" class="form-control" id="userName" placeholder="Enter userName" name="userName"  value="${memberVo.userName}" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
<%-- 	  
	  
	  <div class="form-group">
	    <label for="role">role:</label>
	    <input type="text" class="form-control" id="role" placeholder="Enter role" name="role"  value="${memberVo.role}" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>
 --%>
	  <div class="form-group">
	    <label for="email">email:</label>
	    <input type="text" class="form-control" id="email" placeholder="Enter email" name="email"  value="${memberVo.email}" required>
	    <div class="valid-feedback">Valid.</div>
	    <div class="invalid-feedback">Please fill out this field.</div>
	  </div>

	  <button type="submit" class="btn btn-primary">저장</button>
	  <button type="button" class="btn btn-primary" onclick="location.href='/modify'">비밀번호 변경</button>
	</form>
</div>