<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>
<%@ include file="nav.jsp" %>

<!DOCTYPE html>
<html>
<head>
    <title>Main Frame with Dynamic Tabs</title>
    <style>
        /* 프레임 스타일 */
        .frame {
            width: 100%;
        }

        /* 상단 프레임 스타일 */
        #topFrame {
            width: 100%;
            height: 50px;
            background-color: #333;
            color: white;
            text-align: center;
        }

        /* 중간 프레임 스타일 */
        #middleFrame {
         
            height: 500px; 
            /*height: calc(100% - 200px); 전체 높이에서 상단, 하단 프레임 높이를 빼서 중간 프레임의 높이 설정 */
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
        /* 탭 스타일 */
        .tab {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
            position: relative;
        }

        /* 탭 링크 스타일 */
        .tab a {
            float: left;
            display: block;
            padding: 8px 12px;
            text-decoration: none;
            transition: 0.3s;
            background-color: #ddd;
            color: #333;
        }

        /* 선택된 탭 링크 스타일 */
        .tab a.active {
            background-color: red; /* 활성화된 탭 배경색을 빨간색으로 설정 */
            color: white; /* 글자색을 흰색으로 설정 */
        }

        /* 마우스 오버시 탭 링크 스타일 */
        .tab a:hover {
            background-color: #ccc; /* 마우스 오버시 배경색을 회색으로 설정 */
        }
		
        /* 탭 컨텐츠 스타일 */
        .tabcontent {
            display: none;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-top: none;
            width: 100%;
            height: calc(100% - 40px); /* 탭 컨텐츠 높이 */
        }


		/* iframe 스타일 */
		.tabcontent iframe {
		    width: 100%; /* 부모 요소의 너비에 맞게 설정 */
		    height: 100%; /* 부모 요소의 높이에 맞게 설정 */
		    border: none; /* 테두리 없애기 */
		}
				
		/* 탭 컨테이너 스타일 */
		#tabContainer {
		    width: 100%; /* 중간 프레임 가로폭에 맞게 설정합니다. */
		    height: 100%; /* 중간 프레임 높이에 맞게 설정합니다. */
		}

        /* 닫기 버튼 스타일 */
        .close-btn {
            width: 15px;
            float: right;
            cursor: pointer;
        }
    </style>
</head>
<body>

<!-- 상단 프레임 -->
<div id="topFrame" class="frame">
    <!-- 상단 메뉴 -->
    <ul>
        <li><a href="#" onclick="addTab('/jsp/employeeInfo', 'Menu 1')">Menu 1</a></li>
        <li><a href="#" onclick="addTab('/jsp/carInfo', 'Menu 2')">Menu 2</a></li>
        <!-- 다른 메뉴 항목들도 추가할 수 있습니다 -->
    </ul>
</div>

<!-- 중간 프레임 -->
<div id="middleFrame" class="frame">
    <!-- 메인 프레임의 탭 -->
    <div class="tab" id="tabContainer">
        <!-- 탭이 동적으로 추가될 곳입니다. -->
    </div>
</div>

<!-- 하단 프레임 -->
<div id="bottomFrame" class="frame">
    <!-- 하단 내용 -->
    <p>하단 프레임 내용</p>
</div>

<!-- JavaScript -->
<script>
	var tabCounter = 0;
	var currentTab = null;
	
	function addTab(url, tabName) {
        tabCounter++;
        var tabId = "menu" + tabCounter;

        // 탭 링크 추가
        var tabContainer = document.getElementById("tabContainer");
        var tabLink = document.createElement("a");
        tabLink.setAttribute("href", "#");
        tabLink.setAttribute("onclick", "openTab(event, '" + tabId + "')");
        tabLink.textContent = tabName;
        tabLink.classList.add("tablinks");
        tabContainer.appendChild(tabLink);

        // 닫기 버튼 추가
        var closeBtn = document.createElement("span");
        closeBtn.innerHTML = "&times;"; // "×" 문자
        closeBtn.classList.add("close-btn");
        closeBtn.setAttribute("onclick", "closeTab(event, '" + tabId + "')");
        tabLink.appendChild(closeBtn);

        // 탭 컨텐츠 추가 (iframe)
        var tabContent = document.createElement("div");
        tabContent.setAttribute("id", tabId);
        tabContent.classList.add("tabcontent");
        tabContainer.appendChild(tabContent);

        // iframe 추가
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", url);
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        tabContent.appendChild(iframe);

        // 새로 추가된 탭을 활성화
        openTab(event, tabId);
    }

	function openTab(evt, tabId) {
	    // 현재 탭 숨기기
	    if (currentTab !== null) {
	        currentTab.style.display = "none";
	    }
	
	    // 모든 탭 링크 비활성화
	    var tablinks = document.getElementsByClassName("tablinks");
	    for (var i = 0; i < tablinks.length; i++) {
	        tablinks[i].classList.remove("active");
	    }
	
	    // 선택된 탭 활성화
	    evt.currentTarget.classList.add("active");
	
	    // 선택된 탭 보이기
	    var tabContent = document.getElementById(tabId);
	    tabContent.style.display = "block";
	
	    // 현재 탭 갱신
	    currentTab = tabContent;
	}

    function closeTab(evt, tabId) {
        evt.stopPropagation(); // 이벤트 전파 방지

        var tabContent = document.getElementById(tabId);
        var tabLink = tabContent.previousSibling;

        // 탭 컨텐츠 및 탭 링크 제거
        tabContent.parentNode.removeChild(tabContent);
        tabLink.parentNode.removeChild(tabLink);

        // 현재 탭 링크 비활성화
        evt.currentTarget.parentNode.classList.remove("active");

        // 현재 탭 갱신
        currentTab = null;
    }
    function loadUrlInTab(url, tabId) {
        var tabContent = document.getElementById(tabId);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    tabContent.innerHTML = xhr.responseText;
                } else {
                    tabContent.innerHTML = "Failed to load content.";
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
        
	    // 중간 프레임 크기 조절
	    //document.getElementById("middleFrame").style.height = "calc(100% - 50px)";
            
    }
</script>

</body>
</html>