<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="nav.jsp" %>

    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    
	<script src="/resources/static/js/jquery.alert.js"></script>
	<script src="/resources/static/js/jquery.disableautofill.js"></script>
	<script src="/resources/static/js/disableautofill.js"></script>
	<script src="/monitor/modify.js"></script>
	
	<main class="password_modify_page">
<!-- 	
	<div class="container">
		<div class="find_info">	
			<h3>새로운 비밀번호로 재설정해주세요</h3>


		  <div class="form-group">
		    <label for="pwd">새 비밀번호:</label>
		    <input type="password" class="form-control" id="password1"  autocomplete="do-not-autofill" name="password1" required>
		    <div class="valid-feedback">Valid.</div>
		  </div>

		  <div class="form-group">
		    <label for="pwd">새 비밀번호 확인:</label>
		    <input type="password" class="form-control" id="password2"  autocomplete="new-password" name="password2" required>
		    <div class="valid-feedback">Valid.</div>
		  </div>
			<br>
			<button id="btnModify" class="btn btn-primary" >변경하기</button>
		</div>
	</div> -->	
 
 <div class="container">
		<div class="find_info">	
    <form id="testForm" method="post" action="/modifyPassword">
	    <div class="form-group">
	        <label>이전 비밀번호</label>
	        <input type="text" id="oldPassword" autofocus  name="oldPassword" class="test-pass form-control" value="?">
	    </div>
	    <div class="form-group">
	        <label>신규 Password</label>
	        <input type="text" id="password" autofocus  name="password" class="test-pass form-control" value="?">
	    </div>
	    <div class="form-group">
	        <label>신규 password 확인</label>
	        <input type="text" id="password2" name="password2" class="test-pass2 form-control" value="?">
	    </div>
	    <div class="button-section">
<!-- 			<button id="btnModify" class="btn btn-primary" >변경</button> -->
 	        <button type="submit" class="btn btn-danger">변경</button>  
	    </div>
	</form>
	    </div>
	    </div>
	

	</main>
	
 
 
</body>
</html>
