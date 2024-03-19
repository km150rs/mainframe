<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>위험 운전행동 분석</title>


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
	

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

	<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/dangerDrivingAnalyze.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/xls.js"></script>
<script src="/resources/static/js/xlsx.js"></script>
<script src="/resources/static/js/jquery.inputmask.bundle.js"></script>

<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>

<script src="/resources/static/js/jquery.alert.js"></script>

<style type="text/css">
label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

}

.empCard0{width:99.7%;border: 0px solid gray;height:85% !important}
.empCard0_1{width:100%;float: left;background: white;height:20%}
.empCard0_2{width:100%;float: left;background: white;height:40%}
.empCard0_3{width:100%;float: left;background: white;height:25%}

.QueryResultGrid{
	
    	/* 이것때문에 고민많이함...table/block/다 안됨 display: table-cell;*/
    	display: table-cell;
    /* border: 1px solid gray; */
  	font-family: Lucida Console,Helvetica,sans-serif !important;
    font-size:14px !important;
	  /* width: 100%!important ; */
}


.highcharts-figure,
.highcharts-data-table table {
/*     min-width: 360px;
    max-width: 800px;
 */    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}


</style>

</head>
	<div style="position: relative ;margin:2px;height:5%;width:99.6%;border: 1px solid gray;z-index:100;">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>위험운전행동 분석</h4>
		  	</td>
		  	<td style = "text-align:center;width:2%">
		  		<span >기준월 </span>
			</td>
		  	<td style = "text-align:center;width:3%">  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="from" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-from" style="margin-top: -1px"></div>		  	
				<!-- <input class="form-control" autofocus tabindex="1"  type="text" id="from" name="from" style="width:90px" > -->
		  	</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >to </span>
			</td>
		  	<td style = "text-align:center;width:3%">  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="to" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-to" style="margin-top: -1px"></div>		  	
				<!-- <input class="form-control" autofocus tabindex="2"  type="text" id="to" name="to" style="width:90px" > -->
		  	</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:4%">			  
				  <select  class="form-control" tabindex="2" style="width:100px" id="group" > </select>
			</td>

		    <td style = "text-align:right;width:20%">
			    <input tabindex="3" class="pjy_btn_query" type="button" id="btnView" value="조회">
			</td>
		  </tr>
		 </table>
		 
   	</div>
   	
   	<div  class="empCard0">
	   	<div class="empCard0_1">
		    <table id="dangerStepTable" class=" cell-border">  </table>
		</div>
	   	<div class="empCard0_2">
		    <table id="dangerDriverTable" class=" cell-border">  </table>
		</div>
	   	<div class="empCard0_3">
	   		<div class="dynamicSqlGrid0_2_3_1">
			    <table id="dangerEmpTable" class=" cell-border">  </table>
	   		</div>
		    
	   		<div class="dynamicSqlGrid0_2_3_2">
				<figure class="highcharts-figure">
				    <div id="container"></div>
				    
				</figure>
	   		</div>
		</div>
	</div>

</body>


</html>