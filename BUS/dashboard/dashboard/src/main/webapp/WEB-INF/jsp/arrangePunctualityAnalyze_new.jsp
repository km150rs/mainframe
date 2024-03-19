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
<script src="/monitor/arrangePunctualityAnalyze_new.js"></script>
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
.drivingAnal tbody td {
	line-height: 1.2 ;
     /* padding: 1px 1px !important; */ 
   font-family: Lucida Console,Helvetica,sans-serif ;
     font-size:14px !important; 
     color:black;
}


.empCard0{width:99.7%;border: 0px solid gray;height:80% !important}

.empCard0_1{width:100%;float: left;background: white;height:50%}
.empCard0_1_1{margin-left:5px; width:31%;float: left;height:100%}
.empCard0_1_2{width:31%;float: left;height:100%}
.empCard0_1_3{width:31%;float: right;height:100%}
.empCard0_1_S{width:3%;float: left;height:100%}

.empCard0_2{margin-lefT:5px;width:99.8%;float: left;border: 0px solid gray;background: white;height:50%}


.QueryResultGrid{
	
    	/* 이것때문에 고민많이함...table/block/다 안됨 display: table-cell;*/
    	display: table-cell;
    border: 1px solid gray;
  	font-family: Lucida Console,Helvetica,sans-serif !important;
    font-size:14px !important;
	  width: 100%!important ;
}
.panelContainer {
padding: 5px;
/* 	padding: 5px;
	margin: 5px;
 	 border-radius: 3em;
 	 */
	/* border: 1px solid gray; */
	background-color: darkgreen;
	color:white;
	text-align: center;
	font-weight: 600;
	font-size:12px;
}
  
td.details-control {
    background: url('https://www.datatables.net/examples/resources/details_open.png') no-repeat center center;
    cursor: pointer;
}
tr.shown td.details-control {
    background: url('https://www.datatables.net/examples/resources/details_close.png') no-repeat center center;
}


td.details-control1 {
    background: url('https://www.datatables.net/examples/resources/details_open.png') no-repeat center center;
    cursor: pointer;
}
tr.shown td.details-control1 {
    background: url('https://www.datatables.net/examples/resources/details_close.png') no-repeat center center;
}

  
</style>

</head>
	<div style="position:relative;margin:2px;height:10%;width:99.6%;border: 1px solid gray;z-index:100">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:25%">  
		  		<h4>배차정시성 상세분석</h4>
		  	</td>
		    <td style = "text-align:left;width:12%">
				<label for="from">From</label>
					<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
			            <input type="text" id="from" aria-label="Date-Time" autocomplete="off">
			            <span class="tui-ico-date"></span>
			        </div>				  
			        <div id="datepicker-month-from" style="margin-top: -1px"></div>
		    </td>		  
		    <td style = "text-align:left;width:12%">
	 			<label for="to">to</label>
					<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
			            <input type="text" id="to" aria-label="Date-Time" autocomplete="off">
			            <span class="tui-ico-date"></span>
			        </div>				  
			        <div id="datepicker-month-to" style="margin-top: -1px"></div>
		    </td>	
		    <td style = "text-align:right;width:30%">
			    <input class="pjy_btn_query" type="button" id="btnInit" value="초기화">
			    <input class="pjy_btn_query" type="button" id="btnView" value="조회">
			</td>
		  </tr>
		 </table>
		 
		  		<input type="hidden" id="wiban_gijun" value="">
		  		<input type="hidden" id="wiban_min_value" value="">
		  		<input type="hidden" id="wiban_max_value" value="">
	 
				<input  id="code_am" type="hidden" name="code_am"  />
				<input  id="code_pm" type="hidden" name="code_pm"  />
		 
   	</div>
   	<div  class="empCard0">
	   	<div  class="empCard0_1">
		   	<div  class="empCard0_1_1">
		   		<div class="panelContainer">노선별</div>		
			    <table id="routeTable" class="drivingAnal cell-border nowrap" >  
				    <thead>
				        <tr > 
				            <th>노선</th>
				            <th>몰림</th>
				            <th>지연</th>
				            <th>위반합계</th>
				            <th>위반평균</th>
				            <th>정류장수</th>
				            <th>위반비율</th>
				        </tr>
				    </thead>    
			    </table>
			</div>
		   	<div  class="empCard0_1_S"></div>

		   	<div  class="empCard0_1_2">
		   		<div class="panelContainer">월별</div>		
			    <table id="monthTable" class="drivingAnal cell-border nowrap" >  
				    <thead>
				        <tr > 
				            <th>기준월</th>
				            <th>몰림</th>
				            <th>지연</th>
				            <th>위반합계</th>
				            <th>위반평균</th>
				            <th>정류장수</th>
				            <th>위반비율</th>
				        </tr>
				    </thead>    
			    
			    </table>
			</div>
		   	<div  class="empCard0_1_S"></div>
		   	<div  class="empCard0_1_3">
		   		<div class="panelContainer">일별</div>		
			    <table id="dayTable" class="drivingAnal cell-border nowrap" >  
				    <thead>
				        <tr > 
				            <th>기준일</th>
				            <th>몰림</th>
				            <th>지연</th>
				            <th>위반합계</th>
				            <th>위반평균</th>
				            <th>정류장수</th>
				            <th>위반비율</th>
				        </tr>
				    </thead>
			    
			    </table>
			</div>
		</div>
	
	   	<div  class="empCard0_2">
	   		<div class="panelContainer">일일 점검내역</div>		
		    <table id="detailTable" class="drivingAnal cell-border nowrap">  
				    <thead>
				        <tr > 
				            <th>기준일</th>
				            <th>노선</th>
				            <th>차량번호</th>
				            <th>운행횟차</th>
				            <th>시작시각</th>
				            <th>종료시각</th>
				            <th>배차간격</th>
				            <th>몰림기준</th>
				            <th>지연기준</th>
				            <th>몰림</th>
				            <th>지연</th>
				            <th>위반건수</th>
				            <th>정류장수</th>
				            <th>위반비율</th>
				        </tr>
				    </thead>

		    </table>
		</div>
	</div>

</body>
</html>