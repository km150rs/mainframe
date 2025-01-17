<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>근태현황 관리</title>

	
    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<link  href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet" >


   
  <link rel=stylesheet type=text/css href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css">
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css">
<!--   <link rel=stylesheet type=text/css href="/resources/static/DataTables/Select-1.6.2/css/select.dataTables.min.css"> -->
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/datetime/1.4.1/css/dataTables.dateTime.min.css">
 <!--  <link rel=stylesheet type=text/css href="https://editor.datatables.net/extensions/Editor/css/editor.dataTables.min.css">
  -->
 <!-- <link rel=stylesheet type=text/css href="https://sandbox.scoretility.com/static/js/Editor-1.8.1/css/editor.jqueryui.css?v=1539093792">
 <link href="https://sandbox.scoretility.com/static/js/Editor-1.8.1/css/editor.dataTables.css" rel="stylesheet" type="text/css" />
 -->

<link  href="/resources/static/js/pjy_extend/editor.dataTables.css" rel="stylesheet">
<link  href="/resources/static/js/pjy_extend/editor.jqueryui.css" rel="stylesheet">
   
 
  <script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
<!--   <script type="text/javascript" src="/resources/static/DataTables/Select-1.6.2/js/dataTables.select.min.js"></script> -->
  <script type="text/javascript" src="https://cdn.datatables.net/datetime/1.4.1/js/dataTables.dateTime.min.js"></script>
 <!--  <script type="text/javascript" src="https://editor.datatables.net/extensions/Editor/js/dataTables.editor.min.js"></script>
  -->
<script src="/resources/static/js/pjy_extend/dataTables.editor.js"></script>
<script src="/resources/static/js/pjy_extend/editor.jqueryui.js"></script>

<!--  	<script src="https://sandbox.scoretility.com/static/js/Editor-1.8.1/js/dataTables.editor.js"></script>
   	<script src="https://sandbox.scoretility.com/static/js/Editor-1.8.1/js/editor.jqueryui.js"></script>  
 -->   
<!--   
	<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css">

     <link href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<link href="https://cdn.datatables.net/buttons/1.5.4/css/buttons.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/buttons/1.5.4/js/dataTables.buttons.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2/css/select2.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2/js/select2.min.js"></script>
<link href="https://sandbox.scoretility.com/static/js/Editor-1.8.1/css/editor.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://sandbox.scoretility.com/static/js/Editor-1.8.1/js/dataTables.editor.js"></script>
  
 <link rel=stylesheet type=text/css href="https://cdn.datatables.net/1.13.4/css/dataTables.jqueryui.css">
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.jqueryui.css?v=1.5.2">
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/fixedcolumns/3.2.5/css/fixedColumns.jqueryui.css?v=3.2.5">
  <link rel=stylesheet type=text/css href="https://sandbox.scoretility.com/static/js/Editor-1.8.1/css/editor.jqueryui.css?v=1539093792">
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/select/1.2.6/css/select.jqueryui.css?v=1.2.6">

  <script type="text/javascript" src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/dataTables.jqueryui.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.jqueryui.js?v=1.5.2"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/fixedcolumns/3.2.5/js/dataTables.fixedColumns.js?v=3.2.5"></script>
  <script src="https://sandbox.scoretility.com/static/js/Editor-1.8.1/js/editor.jqueryui.js"></script>  

 -->
  <link href="https://cdn.datatables.net/select/1.6.2/css/select.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.js"></script>
  

  
<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/attendance.js"></script>
<script src="/resources/static/js/datatable-editor.js"></script>
<script src="/resources/static/js/datepicker-ko.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<!-- <script src="/resources/static/js/jquery.alert.js"></script> -->

<style>
#tabs { margin-top: 0em;	font-size: 12px; }
#tabs li .ui-icon-close { float: left; margin: 0.4em 0.2em 0 0; cursor: pointer; }
#add_tab { cursor: pointer; }

.toolbar,.toolbar2 {
    float: left;
    color: white;
    text-align: center;
}
.dt-button.red {
	padding : 2px;
 	vertical-align: right;
	margin-top:5px;
        color: blue;
        height:25px ; 
           font-size: 12px;
        
    }

.toolbar, .toolbar2 {
    float: right;
    color: white;
    text-align: center;
}
    
</style>

</head>
<body>
<div style="position:relative;margin:2px;height:60px;width:99.6%;border: 1px solid gray;z-index:100;">
	<table style="color:black;width:100%;font-size:14px;table-layout:auto;border-collapse:collapse">
	  <tr>
	    <td style = "text-align:left;width:25%">
	    	<h4>근태현황 관리</h4>
	    </td>		  
	    <td style = "text-align:left;width:10%">
			<label for="from">기준일:</label>
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="from" aria-label="Date-Time" autocomplete="off">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-from" style="margin-top: -1px"></div>

<!-- 
			<input type="text" id="from" name="from">
 -->
	    </td>		  
	    <td style = "text-align:left;width:20%">
 			<label for="to">to</label>
 			
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="to" aria-label="Date-Time" autocomplete="off">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-to" style="margin-top: -1px"></div>

 			
			<!-- <input type="text" id="to" name="to"> -->
			
	    </td>		  
	    <td style = "text-align:left;width:25%">근태구분 :
		  <select id="comboAttendanceType">
		    <option value="all">전체</option>
		    <option value="휴가">휴가</option>
		    <option value="병가">병가</option>
		  </select> 
			<label>기사명 : <input type="text" class="db_fillter" id="edtEmpNm" size="20"></label>
		</td>    

	    <td style = "text-align:right;width:10%">
	     	<!-- <input class="pjy_btn_query" type="button" id="btnTax" value="tax"> -->  
		    <input class="pjy_btn_query" type="button" id="btnQuery" value="조회">
		</td>
	  </tr>
	</table>
</div>

<div id="myGrid" class="ctiInfoGrid">
	<table id="attandanceTable" class="cell-border pjy_inputGrid" >
	    <thead>
	        <tr > 
	        	<th></th>
	            <th>시작일자</th>
	            <th>종료일자</th>
	            <th>기사명</th>
	            <th>근태구분</th>
	            <th>메모</th>
	            <th>삭제여부</th>
	            <th>노선</th>
	            <th>고정구분</th>
	            <th>차량번호</th>
	            <th>등록일</th>
	            <th>최종사용자</th>
	            <th>최종변경일</th>
	        	<th></th>
	        	<th></th>
	        	<th></th>
	        </tr>
	    </thead>    
	</table>
</div>

</body>


</html>