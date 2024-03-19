
	
// 비밀번호 변경시 비밀번호입력 상태 확인
const isSubmit = (function() {
	let submit = false;
	
	const getSubmit =function() {
		return submit;
	}
	
	const setSubmit = function(set){
		submit = set;
		return submit;
	}
	return {getSubmit : getSubmit, setSubmit : setSubmit};
})();	
	
 
	
	
 
 
 
function pwdCheck1() {
	const password1 = $("#password1").val();
	const password2 = $("#password2").val();
 
	const msgBox = $(".password_check_msg");
	
	if (!password1 || !password2) {
		swal("비밀번호를 입력해주세요");
		return false;
	}
	
	if(password1 != password2) {
		swal("비밀번호를 확인해 주세요");
		return false;
	}
	
	
	
	return true;
}

function pwdCheck2(){

 	const pw = $("#password1").val();
	const num = pw.search(/[0-9]/g);
	const eng = pw.search(/[a-z]/ig);
 	const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

	if(pw.length < 8 || pw.length > 20){
		swal("8자리 ~ 20자리 이내로 입력해주세요.");
  		return false;
 	} else if(pw.search(/\s/) != -1){
  		swal("비밀번호는 공백 없이 입력해주세요.");
  		return false;
 	} else if(num < 0 || eng < 0 || spe < 0 ){
  		swal("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
  		return false;
 	} else {
		console.log("통과"); 
    	return true;
 	}

} 
 
// 패스워드 변경
$("#btnModify").click(function(){
	if(!pwdCheck1()) {
		return;
	}
	if(!pwdCheck2()) {
		return;
	}
	
	const data = {
		password: $("#password1").val(),
		valueType : "password"
	}
	
	$.ajax({
		url: "/modifyPassword",
		type: "PATCH",
		data: data
	})
	.done(function(result){
		swal({
			text : result,
			closeOnClickOutside : false
		})
		.then(function(){
			location.href = "/login2";
		})
	})
	.fail(function(){
		swal("비밀번호 변경중 에러발생");
	})
})
