<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>인사 종합평가</title>


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
	
<script src="/resources/static/js/pjy_extend/percentageBars.js"></script>
<!-- <script src="https://cdn.datatables.net/plug-ins/1.13.5/dataRender/percentageBars.js"></script> -->


<!-- <link rel="stylesheet" href="https://nightly.datatables.net/responsive/css/responsive.dataTables.min.css" />
 <script src="https://nightly.datatables.net/responsive/js/dataTables.responsive.min.js"></script>
 -->
 
<!-- <link rel="stylesheet" href="https:///cdn.datatables.net/scroller/2.1.1/css/scroller.dataTables.min.css" />
<script src="https://cdn.datatables.net/scroller/2.1.1/js/dataTables.scroller.min.js"></script>
 --> 	
<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/allEmpPointView.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>


<!-- <script src="/resources/static/js/xlsx.js"></script> -->

<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>
<script src="/resources/static/js/jquery.alert.js"></script>


<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

	<!-- 변수type -->
	<!-- <script  src="https://code.jquery.com/jquery-latest.min.js"></script> -->

<style type="text/css">
/* label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

} */
.empInfo_1{width:100%;border: 0px solid gray;height:80% !important;}

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
		  	<td style = "text-align:left;width:15%">  
		  		<h4>인사 종합평가</h4>
		  	</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >기준월 </span>
			</td>
		    <td style = "text-align:left;width:7%">
					<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
			            <input type="text" id="from" aria-label="Date-Time" autocomplete="off">
			            <span class="tui-ico-date"></span>
			        </div>				  
			        <div id="datepicker-month-from" style="margin-top: -1px"></div>
		    </td>		  
		    <td style = "text-align:left;width:7%">
					<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
			            <input type="text" id="to" aria-label="Date-Time" autocomplete="off">
			            <span class="tui-ico-date"></span>
			        </div>				  
			        <div id="datepicker-month-to" style="margin-top: -1px"></div>
		    </td>	

		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:5%">			  
				  <select class="form-control"  tabindex="2" style="width:100px" id="comboRouteNm" > </select>
			</td>
		    <td style = "width:5%">
			    <input type="radio" id="spGb1" name="spGb" value="ALL" checked>
			    <label class="chartType" for="spGb1">전체</label>
			    <input type="radio" id="spGb2" name="spGb" value="고정">
		    	<label class="chartType" for="spGb2">고정</label>
			    <input type="radio" id="spGb3" name="spGb" value="SP">
		    	<label class="chartType" for="spGb3">SP</label>
			</td>
			<td style="text-align:right;width:5%">		
				  <select class="txtBlack2" id="comboEnterDate">
				    <option value="0">-근속년차-</option>
				    <option value="1">1년 이상</option>
				    <option value="2">2년 이상</option>
				    <option value="3">3년 이상</option>
				    <option value="5">5년 이상</option>
				    <option value="10">10년이상</option>
				  </select> 
			</td>
			
			<td style="text-align:right;width:3%">			  
			    <input class="pjy_btn_small" type="button" tabindex="9" id="btnPointManage" value="배점기준표.." >
			</td>
		  	
		    <td style = "text-align:right;width:15%">
			    <input class="pjy_btn_query" type="button" id="btnInit" value="초기화">
			    <input class="pjy_btn_query" type="button" id="btnMake" value="평가자료생성">
			    <input class="pjy_btn_query" type="button" id="btnView" value="조회">
			</td>
		  </tr>
		 </table>
		 
   	</div>
   	<div class="empInfo_1">
	    <table id="exceltable" class="resultGrid2 cell-border nowrap">  </table>
   	</div>

</body>


</html>