<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>
<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>배차정시성 상세분석</title>


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
<script src="/monitor/arrangePunctualityAnalyze.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/xls.js"></script>
<!-- <script src="/resources/static/js/xlsx.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<script src="/resources/static/js/jquery.inputmask.bundle.js"></script>

<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>

<script src="/resources/static/js/jquery.alert.js"></script>
<script src="/resources/static/js/datepicker-ko.js"></script>

<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />


<!-- <link id="themecss" href="/resources/static/js/jquery-lwd/themes/material/jquery-ui.theme.css" rel="stylesheet" type="text/css" />
 -->

<!-- <script type="text/javascript" src="/resources/static/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<link href="/resources/static/js/jquery-ui-1.12.1/jquery-ui.structure.min.css" rel="stylesheet" type="text/css" />
 -->

<style type="text/css">
label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

}
.pjy_button_unfixed {
	float:right;
}

table.dataTable thead tr>.dtfc-fixed-left
{
	background: #459e00;
}

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
<body>
<div id='wrapper'>
	<div style="margin:2px;overflow:hidden;height:45px;width:99.6%;border: 1px solid gray;z-index:100">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>배차정시성 상세분석</h4>
		  	</td>
		  	<td style = "text-align:center;width:3%">  
		  		<span>기준일</span>
		  	</td>
			<td style="width:5%">			
			  	<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYmd" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month" style="margin-top: -1px"></div>			
			  
				<!-- <input  class="form-control" autofocus tabindex="1" style="width:120px;text-align:center" id="baseYmd" type="text" name="baseYmd"  /> -->
			</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:10%">			  
				<select class="form-control"  tabindex="2" style="width:80px" id="group" > </select>
			</td>
		  	<td style = "text-align:center;width:4%">
		  		<!-- <span >대상회차 </span> -->
		  		<input type="hidden" id="wiban_gijun" value="">
		  		<input type="hidden" id="wiban_min_value" value="">
		  		<input type="hidden" id="wiban_max_value" value="">
			</td>
			<td style="width:5%;text-align:center">			  
		  		<!-- <span >오전 </span> -->
				<input  class="form-control"  tabindex="3" style="width:80px;text-align:center" id="code_am" type="hidden" name="code_am"  />
			</td>
			<td style="width:5%;text-align:center">			  
		  		<!-- <span >오후 </span> -->
				<input  class="form-control"  tabindex="4" style="width:80px;text-align:center" id="code_pm" type="hidden" name="code_pm"  />
			</td>
		    <td style = "text-align:right;width:30%">
		     	<label><input type="checkbox" name="basicDataView" value="N" checked>기초자료보기 </label>
		    	
			    <input class="pjy_btn_query" type="button" id="btnCommonView" value="설정...">
			    <input class="pjy_btn_query" type="button" id="btnInit" value="초기화">
			    <input class="pjy_btn_query" type="button" id="btnView" value="조회">
				</div>
			</td>
		  </tr>
		 </table>
		 
   	</div>
   	<div  id="basicData" class="dynamicSqlGrid0_2_2">
	    <table id="exceltable" class="QueryResultGrid cell-border nowrap" >  </table>
	</div>
   	<div class="dynamicSqlGrid0_2_2">
		    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnProc" value="검토" >
		    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnSave" value="저장" >
	    <table id="newtable" class="QueryResultGrid cell-border nowrap">  </table>
	</div>
	<div class="floatRight"></div>
</div>	
<footer></footer>
</body>


</html>