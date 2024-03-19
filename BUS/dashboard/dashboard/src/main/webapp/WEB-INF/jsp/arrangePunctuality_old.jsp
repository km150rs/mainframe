<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>배차정시성 자료등록</title>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    	<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
<!-- 	<script type="text/javascript" src="https://unpkg.com/xlsx@0.17.1/dist/xlsx.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xls/0.7.4-a/xls.core.min.js"></script> 
 -->
  	<link href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
<!-- 	<script type="text/javascript" src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>
 -->
	<link href="https://cdn.datatables.net/select/1.6.2/css/select.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.js"></script>
	
	<link href="https://cdn.datatables.net/fixedcolumns/4.2.2/css/fixedColumns.dataTables.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/fixedcolumns/4.2.2/js/dataTables.fixedColumns.min.js"></script>


	
<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/arrangePunctualityInfo.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/xls.js"></script>
<!-- <script src="/resources/static/js/xlsx.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<script src="/resources/static/js/jquery.inputmask.bundle.js"></script>

<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>

<script src="/resources/static/js/jquery.alert.js"></script>
<script src="/resources/static/js/datepicker-ko.js"></script>

<style type="text/css">
label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

}

/* 
table.dataTable thead tr>.dtfc-fixed-left
{
	background: #459e00;
} */

.QueryResultGrid{
	
    	/* 이것때문에 고민많이함...table/block/다 안됨 display: table-cell;*/
    	display: table-cell;
    border: 1px solid gray;
  	font-family: Lucida Console,Helvetica,sans-serif !important;
    font-size:14px !important;
	  width: 100%!important ;
}

</style>

</head>
	<div style="margin:2px;overflow:hidden;height:60px;width:99.6%;border: 1px solid gray">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>배차정시성 자료등록</h4>
		  	</td>
		  	<td style = "text-align:center;width:3%">  
		  		<span>기준일</span>
		  	</td>
			<td style="width:5%">			  
				<input  class="form-control" autofocus tabindex="1" style="width:120px;text-align:center" id="baseYmd" type="text" name="baseYmd"  />
			</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:4%">			  
				  <select class="form-control"  tabindex="2" style="width:100px" id="group" > </select>
			</td>
		    <td style = "text-align:right;width:22%">
				<div class="filebox">
				
				  <label for="excelfile">파일불러오기...</label> 
				  <input class="upload-name" value="파일선택" disabled="disabled">
				  <input type="file" id="excelfile" class="upload-hidden"> 
<!-- 		    
			    <input type="file" id="excelfile" />  
   				<input type="button" id="viewfile" value="Export To Table" onclick="ExportToTable()" />
   				<input class="pjy_btn_query" type="button" id="viewfile" value="Export To Table" onclick="ExportToTable()" />
   				 -->  
			    <input class="pjy_btn_query" type="button" id="btnSave" value="저장">
			    <input class="pjy_btn_query" type="button" id="btnInit" value="초기화">
			    <input class="pjy_btn_query" type="button" id="btnView" value="조회">
				</div>
			</td>
		  </tr>
		 </table>
		 
   	</div>
   	<div class="dynamicSqlGrid0_2_2">
	    <table id="exceltable" class="QueryResultGrid cell-border">  </table>
	</div>
	
</body>


</html>