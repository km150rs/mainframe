<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>휴가 등록</title>

	
    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    	<link rel="stylesheet" href="http://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
   
  <link rel=stylesheet type=text/css href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css">
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css">
  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/datetime/1.4.1/css/dataTables.dateTime.min.css">

<link  href="/resources/static/js/pjy_extend/editor.dataTables.css" rel="stylesheet">
<link  href="/resources/static/js/pjy_extend/editor.jqueryui.css" rel="stylesheet">
   
 
  <script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/datetime/1.4.1/js/dataTables.dateTime.min.js"></script>

<script src="/resources/static/js/pjy_extend/dataTables.editor.js"></script>
<script src="/resources/static/js/pjy_extend/editor.jqueryui.js"></script>


<link href="https://cdn.datatables.net/select/1.6.2/css/select.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.js"></script>
  

<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

 
<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/vacationManagement.js"></script>
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

.empInfo0_2_2{width:99.7%;border: 0px solid gray;height:80% !important;}

    
</style>

</head>

<div style="position:relative;margin:2px;height:5%;width:99.6%;border: 1px solid gray;z-index:100;">
	<table style="color:black;width:100%;font-size:14px;table-layout:auto;border-collapse:collapse">
	  <tr>
	    <td style = "text-align:left;width:25%">
	    	<h4>휴가 등록</h4>
	    </td>		  
	    <td style = "text-align:left;width:15%">
			<label for="from">기준월</label>
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="from" aria-label="Date-Time" autocomplete="off">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-from" style="margin-top: -1px"></div>

<!-- 
			<input type="text" id="from" name="from">
 -->
	    </td>		  
	    <td style = "text-align:left;width:15%">
 			<label for="to">to</label>
 			
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="to" aria-label="Date-Time" autocomplete="off">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-to" style="margin-top: -1px"></div>

 			
			<!-- <input type="text" id="to" name="to"> -->
			
	    </td>		  
	    <td style = "text-align:left;width:25%">
			  <select class="comboBoxType"  tabindex="2" style="width:150px" id="comboAttendanceType" > </select>
			<label>기사명 : <input type="text" class="db_fillter" id="edtEmpNm" size="20"></label>
		</td>    

	    <td style = "text-align:right;width:10%">
	     	<!-- <input class="pjy_btn_query" type="button" id="btnTax" value="tax"> -->  
		    <input class="pjy_btn_query" type="button" id="btnQuery" value="조회">
		</td>
	  </tr>
	</table>
</div>

<div class="empInfo0_2_2">
	<table id="vacationTable" class="cell-border pjy_inputGrid" >
	    <thead>
	        <tr > 
	        	<th></th>
	            <th>시작일자</th>
	            <th>종료일자</th>
	            <th>기사명</th>
	            <th>휴가구분</th>
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