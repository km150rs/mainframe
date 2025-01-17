<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ include file="../nav.jsp" %>

<!DOCTYPE html>
<html lang="ko">


<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>입력항목 예제1</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
 
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
 
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script> 
<script> 
 function sample6_execDaumPostcode() { 
 new daum.Postcode({ 
 oncomplete: function(data) { 
  // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분. 
  // 각 주소의 노출 규칙에 따라 주소를 조합한다. 
  // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다. 
  var fullAddr = ''; // 최종 주소 변수 
  var extraAddr = ''; // 조합형 주소 변수 
  // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다. 
  if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우 
   fullAddr = data.roadAddress; 
  } else { // 사용자가 지번 주소를 선택했을 경우(J) 
   fullAddr = data.jibunAddress; 
  } 
  // 사용자가 선택한 주소가 도로명 타입일때 조합한다. 
  if(data.userSelectedType === 'R'){ 
   //법정동명이 있을 경우 추가한다. 
  if(data.bname !== ''){ 
   extraAddr += data.bname; 
  } 
  // 건물명이 있을 경우 추가한다. 
  if(data.buildingName !== ''){ 
   extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); 
  } 
  // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다. 
   fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : ''); 
  } 
  // 우편번호와 주소 정보를 해당 필드에 넣는다. 
  document.getElementById('post1').value = data.zonecode; //5자리 새우편번호 사용 
  document.getElementById('address1').value = fullAddr; 
  // 커서를 상세주소 필드로 이동한다. 
  document.getElementById('address2').focus(); 
 } 
 }).open(); 
} 
</script>
</head>    
<body>

<div class="container">
    <form name="f" method="post">
 
        <div class="col-sm-12 pt-3">
            <div class="card">
                <div class="card-header card-header-primary">
                    <h4 class="card-title"><i class="fas fa-square"></i> 관리자 환경설정</h4>
                    <p class="card-catagory"></p>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                            <tr style="line-height:32px;">
                                <td>관리자 ID</td>
                                <td>
                                    <input type="text" name="admin_id" class="form-control" value="" readonly>
                                </td>
                                <td>관리자 이름</td>
                                <td>
                                    <input type="text" name="admin_name" class="form-control" value="">
                                </td>                        
                            </tr>
                            <tr>
                                <td>관리자 비밀번호</td>
                                <td>
                                    <input type="password" name="admin_passwd1" class="form-control" maxlength="10" value="">                                    
                                </td>
                                <td>관리자 비밀번호 확인</td>
                                <td>
                                    <input type="password" name="admin_passwd2" class="form-control" maxlength="10" value="">                                    
                                </td>
                            </tr>  
                            <tr>
                                <td>전화번호</td>
                                <td>
                                    <input type="tel" name="tel" class="form-control" value="">
                                </td>
                                <td>팩스</td>
                                <td>
                                    <input type="tel" name="fax" class="form-control" value="">
                                </td>
                            </tr>
                            <tr>
                                <td>우편번호</td>
                                <td>
                                    <input type="text" name="post1" id="post1" size="5" class="form-control" readonly value="" style="display:inline-block;width:100px;"> 
                                    <i class="fas fa-search" onclick="sample6_execDaumPostcode()" style="cursor:pointer;font-size:24px;"></i>
                                </td>
                                <td>HP</td>
                                <td><input type="tel" name="hp" class="form-control" value=""></td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td colspan="3">
                                    <input type="text" name="address1" id="address1" class="form-control mb-3" value="">
                                    <input type="text" name="address2" id="address2" class="form-control" value="">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
 
            <div class="pt-3"></div>
 
            <div class="card">
                <div class="card-header"><i class="fas fa-square"></i> GPS 거리 설정</div>
                <div class="card-body">
                    <table class="table">
                        <tbody>
                            <tr style="line-height:32px;">
                                <td>기본 변경값</td>
                                <td>
                                    <input type="text" name="gps_radius" class="form-control text-right" maxlength="3" size="3" value="" style="display:inline-block;width:100px;"> Km
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
 
        </div>
        
    </form>
 
    <div class="text-center mt-3">
        <button type="button" class="btn btn-success">변경하기</button>
        <button type="button" class="btn btn-info">다시쓰기</button>
    </div>
</div>
</body>
</html>
