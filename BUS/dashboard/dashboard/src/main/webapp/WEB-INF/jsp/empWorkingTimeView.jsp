<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>근로시간 조회</title>


    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    	<link rel="stylesheet" href="http://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    	
<!-- 	<script type="text/javascript" src="https://unpkg.com/xlsx@0.17.1/dist/xlsx.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xls/0.7.4-a/xls.core.min.js"></script> 
 -->
  	<link href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
<!-- 	<script type="text/javascript" src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>
 -->
	<link href="https://cdn.datatables.net/select/1.6.2/css/select.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.js"></script>
	
	
  <link href="/resources/static/DataTables/RowGroup-1.3.1/css/rowGroup.dataTables.min.css" rel="stylesheet">


<!-- <link rel="stylesheet" href="https://nightly.datatables.net/responsive/css/responsive.dataTables.min.css" />
 <script src="https://nightly.datatables.net/responsive/js/dataTables.responsive.min.js"></script>
 -->
 
<!-- <link rel="stylesheet" href="https:///cdn.datatables.net/scroller/2.1.1/css/scroller.dataTables.min.css" />
<script src="https://cdn.datatables.net/scroller/2.1.1/js/dataTables.scroller.min.js"></script>
 --> 	
<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/empWorkingTimeView.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/rowsGroup.js"></script>

<script src="/resources/static/js/xls.js"></script>
<script src="/resources/static/js/datatable-editor.js"></script>

<!-- <script src="/resources/static/js/xlsx.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="/resources/static/js/jquery.inputmask.bundle.js"></script>

<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>
<script src="/resources/static/js/jquery.alert.js"></script>


<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

	<!-- 변수type -->
	<!-- <script  src="https://code.jquery.com/jquery-latest.min.js"></script> -->

<style type="text/css">
label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

}
.empInfo_1{width:100%;border: 0px solid gray;height:15% !important;}
.empInfo_1_a{float:left;width:19%;border: 0px solid gray;height:100% !important;}
.empInfo_1_b{float:left;width:60%;border: 0px solid gray;height:100% !important;}
.empInfo_1_c{float:right;width:19%;border: 0px solid gray;height:100% !important;}
.empInfo_2{width:100%;border: 0px solid gray;height:65% !important;}

.QueryResultGrid{
	
    	/* 이것때문에 고민많이함...table/block/다 안됨 display: table-cell;*/
    	display: table-cell;
    border: 1px solid gray;
  	font-family: Lucida Console,Helvetica,sans-serif !important;
    font-size:14px !important;
	  width: 100%!important ;
}

.resultGrid thead th {
     font-size:12px !important; 
}
.resultGrid tbody td {
	line-height: 1.2 !important ;
     /* padding: 1px 1px !important; */ 
   font-family: Lucida Console,Helvetica,sans-serif ;
     font-size:12px !important; 
     color:black;
}
.resultGrid2 tbody td {
	line-height: 1.2 !important ;
     /* padding: 1px 1px !important; */ 
   font-family: Lucida Console,Helvetica,sans-serif ;
     font-size:14px !important; 
     color:black;
}
</style>

</head>
	<div style="position:relative;margin:2px;height:6%;width:99.6%;border: 1px solid gray;z-index:100;">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>근로시간 조회</h4>
		  	</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >기준월 </span>
			</td>
		  	<td style = "text-align:center;width:2%">  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYm" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month" style="margin-top: -1px"></div>
				<!-- <input class="form-control" autofocus tabindex="1"  type="text" id="from" name="from" style="width:90px" > -->
		  	</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:4%">			  
				  <select class="form-control"  tabindex="2" style="width:100px" id="comboRouteNm" > </select>
			</td>
			<td style="width:4%">			  
				<div class="list_search_form">
				    <label><input type="radio" name="search_type" value="time" checked/>근로시간</label>
				    <label><input type="radio" name="search_type" value="km" />운행거리</label>
				</div>
			</td>
			<td style="text-align:right;width:10%">			  
				주당근무초과기준<input class="txtRed" maxlength="2" style="width:50px" type="text" id="edtBaseTime" value="52">
				<br>
				월최소 근무일수<input class="txtRed" maxlength="2" style="width:50px" type="text" id="edtCheckDay" value="14">
			</td>
		  	
		    <td style = "text-align:right;width:20%">
			    <input class="pjy_btn_query" type="button" id="btnInit" value="초기화">
			    <input class="pjy_btn_query" type="button" id="btnView" value="조회">
			</td>
		  </tr>
		 </table>
		 
   	</div>
   	<div class="empInfo_1">
   		<div class="empInfo_1_a" ></div>
   		<div class="empInfo_1_b" >
		    <table id="avgTable" class="resultGrid2 cell-border nowrap">  
				<thead>
			        <tr >
			            <th>노선</th>
			            <th>총인원</th>
			            <th>평균근무시간합계</th>
			            <th>평균거리합계</th>
			            <th>일 평균시간</th>
			            <th>일 평균거리</th>
			        </tr>
		    	</thead>
		    </table>
		</div>
   		<div class="empInfo_1_c" ></div>
   	</div>
   	<div class="empInfo_2">
	    <table id="exceltable" class="resultGrid cell-border nowrap">  </table>
   	</div>

</body>


</html>