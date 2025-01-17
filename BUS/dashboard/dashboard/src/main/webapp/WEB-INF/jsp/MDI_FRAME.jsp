<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>
<%@ include file="nav_20240318.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
<head>
    <title>Main Frame with Dynamic Tabs</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
 
    <style>
        /* 프레임 스타일 */
        .frame {
            width: 100%;
        }
        body {
            height: 100vh; /* 화면 전체 높이 */
            margin: 0;
            padding: 0;
        }        

        /* 상단 프레임 스타일 */
        #topFrame {
            width: 100%;
            height: 50px;
            background-color: #506FB0;
            color: white;
            text-align: center;
        }

        /* 중간 프레임 스타일 */
        #middleFrame {
         
           /*height: 700px;*/
            height: calc(100% - 150px); /*전체 높이에서 상단, 하단 프레임 높이를 빼서 중간 프레임의 높이 설정 */
            background-color: #e5e5e5;
            overflow: auto; /* 내용이 넘칠 경우 스크롤 표시 */
        }

        /* 하단 프레임 스타일 */
        #bottomFrame {
            width: 100%;
            height: 50px;
            background-color: #333;
            color: white;
            text-align: center;
        }
        /* 탭 컨테이너 스타일 */
		#tabs { margin-top: 0em;	font-size: 12px;
		            width: 100%;
            height: 100%; 
            user-select: none;
		}
		#tabs li .ui-icon-close { float: left; margin: 0.4em 0.2em 0 0; cursor: pointer; }
		#add_tab ,#btnViewParam{ cursor: pointer; }
		
        /* 탭 컨텐츠 스타일 */
        .tabcontent {
        	width: 100%;
        	height: 95%;
          /* width: calc(100% - 200px);*/ /* 탭 컨텐츠 너비 */
          /*  height: calc(100% - 200px);*/
            float: left;
        }
		
		/* iframe 스타일 */
		.tabcontent iframe {
		    width: 100%; /* 부모 요소의 너비에 맞게 설정 */
		    height: 90%; /* 부모 요소의 높이에 맞게 설정 */
		    border: none; /* 테두리 없애기 */
		}
				
		/* 탭 컨테이너 스타일 */
		#tabContainer {
		    width: 100%; /* 중간 프레임 가로폭에 맞게 설정합니다. */
		    height: 90%; /* 중간 프레임 높이에 맞게 설정합니다. */
		}

        /* 닫기 버튼 스타일 */
        .close-btn {
            width: 15px;
            float: right;
            cursor: pointer;
            user-select: none;
        }
        
		.dropbtn_login {
		  background-color: black;
		    border-radius: 1em;
		  color: white;
		  padding: 10px;
		  font-size: 12px;
		  border: none;
		}
		.dropbtn {
		  background-color: #506FB0;
		    /*border-radius: 1em;*/
		  color: white;
		  padding: 10px;
		  font-size: 12px;
		  border: none;
		  width:150px;
		}		
		.dropdown {
		  position: relative;
		  display: inline-block;
		  float: left;
    		margin-top: 5px;
		}
		
		.dropdown-content {
		  display: none;
		  position: absolute;
		  background-color:  #f9f9f9;
		  width: 160px;
		  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		  z-index: 1;
		}
		
		.dropdown-content li {
		  color: black;
		  padding: 1px 1px;
		  text-decoration: none;
		  display: block;
		}
		
		.dropdown-content li:hover {background-color: #ddd;}
		
		.dropdown:hover .dropdown-content {display: block;}
		
		.dropdown:hover .dropbtn {background-color: #3e8e41;}
        
    </style>
</head>
<body>

<!-- 상단 프레임 -->
<div id="topFrame" class="frame">
    <!-- 상단 메뉴 -->
    	<c:forEach var="list" items="${menuVO.list}" varStatus="status">
		  	<div class="dropdown">
				<button class="dropbtn" >${list.menuNm}</button>
				<c:set var="subMenuList" value="${fn:split(list.subMenu, ',')}" />
				<ul class="dropdown-content" >
				  	<c:forEach var="subMenuInfo" items="${subMenuList}" varStatus="status">
				  		<c:set var="subMenu" value="${fn:split(subMenuInfo, '$')}" />
				  		
				  		<c:if test="${subMenu[2] == 'A'}">
							<sec:authorize access="hasRole('ROLE_ADMIN')"> 
					        	<li><a href="#" onclick="addTab(null, '${subMenu[3]}')">${subMenu[0]}</a></li>
							</sec:authorize>
				  		</c:if>
				  		<c:if test="${subMenu[2] == 'M'}">
				        	<li><a href="#" onclick="addTab(null, '${subMenu[3]}')">${subMenu[0]}</a></li>
				  		</c:if>
				  		
					</c:forEach>	
				</ul>
			</div>				  
		</c:forEach>   
		<button class="pjy_btn_small" onclick="closeAllTab()" />closeAll</button>
</div>

<!-- 중간 프레임 -->
<div id="middleFrame" class="frame">
    <!-- 메인 프레임의 탭 -->
    <div id="tabs">
        <ul>
            <!-- 탭 링크는 jQuery UI 탭 위젯에서 자동으로 생성됩니다 -->
        </ul>
        <div class="clear"></div>
    </div>
</div>

<!-- 하단 프레임 -->
<div id="bottomFrame" class="frame">
    <!-- 하단 내용 -->
    <p>하단 프레임 내용</p>
</div>

<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript">
	var g_tabCounter = 0;
    
 	// spring MVC Model 변수느
 	// 숫자는 "" 제거
    //var number = [[${number}]];
    let  g_menuMap = ${menuMap};	
    //let  g_menuMap = JSON.parse(menuMap);
    
   	console.log(g_menuMap);
    function addTab(url, menuId) {
    	var tabName ;
    	console.log(url + '/' + menuId);
    	preCheck();
    	
    	if (url == null) {
    		var menuInfo = g_menuMap[menuId];

    		if (menuInfo == undefined) return;

    		console.log(menuInfo);
    		console.log(menuInfo.split('$')[0]);
    		console.log(menuInfo.split('$')[1]);
    		
    		tabName = menuInfo.split('$')[0];
    		url = menuInfo.split('$')[1];
    	}
    	if (tabName == null || url == null)
    		return;
    	
        g_tabCounter++;
        var tabId = "menu" + g_tabCounter;

        // 탭을 동적으로 추가합니다
        $("#tabs ul").append('<li><a href="#' + tabId + '">[' + menuId + ']' + tabName + '</a><span class="close-btn" onclick="closeTab(\'' + tabId + '\')">x</span></li>');
        $("#tabs").append('<div id="' + tabId + '" class="tabcontent"><iframe src="' + url + '" frameborder="0" style="width: 100%; height: 100%;"></iframe></div>');

        // 탭 위젯을 업데이트합니다
        $("#tabs").tabs("refresh");
        //$("#" + tabId + " a").trigger("click");
        // 추가된 탭의 인덱스를 찾습니다
        var tabIndex = $("#tabs ul li").index($("#tabs ul li:last"));

        // 추가된 탭을 활성화합니다
        $("#tabs").tabs("option", "active", tabIndex);        
    }

    function closeTab(tabId) {
        // 탭을 닫습니다
        $("#" + tabId).remove();
        $("#tabs ul li a[href='#" + tabId + "']").parent().remove();

        // 탭 위젯을 업데이트합니다
        $("#tabs").tabs("refresh");
    }
    

    function closeAllTab(tabId) {
        $('#tabs ul li a').each(function (i) {  
        	
            console.log($(this).attr('href'));  
            var tabId = $(this).attr('href');
            $(tabId).remove();
            $("#tabs ul li a[href='" + tabId + "']").parent().remove();
        }); 
    	
        // 탭 위젯을 업데이트합니다
        $("#tabs").tabs("refresh");
    }
    

    function preCheck() {
		$.ajax({
		       url : "/proxy_check-session",
		       "dataSrc" : "",
		        //global: true, // 추가
		        cashe : false,
		        //async:false,
		       success : function(result) {	
				   //console.log(result);
				     return true;
		       },
		       error : function(request, status, error) {
			        location.href = '/expired';
			        return false;
		       }
		});	
    }	
    
    // jQuery UI 탭 위젯을 초기화합니다
    $(function() {
        $("#tabs").tabs({
            tabOrientation: 'horizontal' // 탭 방향을 수평으로 설정
        });
        addTab(null, 'M0001');
        
        //console.log(menuMap);
        //console.log(menuMap["M1004"]);
    });
</script>

</body>
</html>