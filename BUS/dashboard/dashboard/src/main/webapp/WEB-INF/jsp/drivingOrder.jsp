<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>일일 승무지시서</title>


    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    	<link rel="stylesheet" href="http://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

  	<link href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>

 	<!-- <link href="https://cdn.datatables.net/plug-ins/1.13.4/features/searchHighlight/dataTables.searchHighlight.css" rel="stylesheet"> -->
	<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.13.4/features/searchHighlight/dataTables.searchHighlight.min.js"></script>
	<script type="text/javascript" src="https://bartaz.github.io/sandbox.js/jquery.highlight.js"></script>
	<link href="/resources/static/css/searchHighlight.css" rel="stylesheet">
	
  <link href="/resources/static/DataTables/RowGroup-1.3.1/css/rowGroup.dataTables.min.css" rel="stylesheet">


<script src="/monitor/common.js"></script>
<script src="/monitor/drivingOrder.js"></script>
<script src="/resources/static/js/rowsGroup.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>



<!--      <link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/south-street/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/jqueryui/dataTables.jqueryui.css" rel="stylesheet" type="text/css" />
   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
 -->   
   	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   
<!-- <script src="/resources/static/js/jquery.alert.js"></script> -->

<!-- mdi 처리시 -->
 
<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

<!-- <link id="themecss" href="/resources/static/js/jquery-lwd/themes/material/jquery-ui.theme.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resources/static/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<link href="/resources/static/js/jquery-ui-1.12.1/jquery-ui.structure.min.css" rel="stylesheet" type="text/css" />
 -->

<link href="/main.css" rel="stylesheet">

<style type="text/css">

#QueryResultGridDetail,#QueryResultGridBasic{
	width: 100%;
	cursor:pointer; 
}


.empCard0{width:99.7%;border: 0px solid gray;height:80% !important}
.empCard0_1{width:60.0%;float: left;border: 0px solid gray;background: white;height:95%}
.empCard0_2{width:39.7%;float: right;border: 0px solid gray;
	background: white;
	height:95%;
	/* border-radius: 5px; */
	
} 

th {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
 }
</style>

</head>

	<div style="position: relative ;margin:2px;height:5%;width:99.6%;border: 1px solid gray;background-color:white;z-index:100;">
		<table  style="color:black;width:100%;background-color:white">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>일일 승무지시서 조회/생성</h4>
		  	</td>		  
		  	<td style = "text-align:center;width:4%">  
		  		<span>기준일</span>
		  	</td>
			<td style="width:4%">			  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYmd" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-day" style="margin-top: -1px"></div>
			</td>
<!-- 		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:4%">			  
				  <select class="form-control"  tabindex="2" style="width:100px" id="group" > </select>
			</td> -->
<!-- 		  	<td style = "text-align:center;width:12%">
				  <select class="form-control"  tabindex="2" style="width:100px;display:none" id="group" > </select>
		  		<span >승무지시서
		    	<input class="pjy_btn_small" type="button" tabindex="3" id="btnExcelTemplete" value="템플릿등록">
		    	</span>  
			</td> -->
		    <td style = "text-align:right;width:40%">
		    	<select class="form-control"  tabindex="2" style="display:none;width:100px" id="group" > </select>
		    	<!-- <a href="/naver-login">네이버 로그인</a> -->
		    	<!-- <input class="pjy_btn_query" type="button" tabindex="3" id="btnNaver" value="네이버">   -->
		    	<input class="pjy_btn_query" type="button" tabindex="3" id="btnSelect" value="조회">  
			</td>
		  		
		  </tr>
		 </table>
		 
   	</div>
   	
	<div id="widget" class="empCard0">
		<div id="foo" class="empCard0_1">
		    <table id="viewTable" class="nowrap">  
							<thead>
								<tr>
									<th rowspan="2">노선</th>
									<th rowspan="2">순번</th>
									<th rowspan="2">차량</th>
						            <th colspan="3" style="text-align:center;">오전</th>
						            <th colspan="3" style="text-align:center;">오후</th>
								</tr>
						        <tr >
						            <th >기사</th>
						            <th >SP구분</th>
						            <th >핸드폰</th>
						            <th >기사</th>
						            <th >SP구분</th>
						            <th >핸드폰</th>
						        </tr>
					    	</thead> 	    
		    </table>
		</div>
		<div id="bar" class="empCard0_2">
		    <span>[ 승무지시서 download ] </span>
		    <input class="pjy_btn_small" type="button" tabindex="3" id="btnExcelTemplete" value="템플릿등록">
		    <input class="pjy_btn_small" type="button" tabindex="3" id="btnExcelMake" value="지시서생성">
		    
		    <table id="fileTable" class="cell-border nowrap">  
							<thead>
						        <tr >
						            <th>파일명</th>
						            <th>size</th>
						            <th>date</th>
                       	            <th>download</th>
						        </tr>
					    	</thead> 	    
		    </table>
		</div>
	</div>

    
</body>


</html>