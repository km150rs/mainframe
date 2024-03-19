<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>upload 자료 등록현황</title>

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
	
	<link href="https://cdn.datatables.net/fixedcolumns/4.2.2/css/fixedColumns.dataTables.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/fixedcolumns/4.2.2/js/dataTables.fixedColumns.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.contextMenu.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.ui.position.js"></script>

	
<link href="/main.css" rel="stylesheet">
<script src="/monitor/common.js"></script>
<script src="/monitor/uploadStatus.js"></script>
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

<script src="/resources/static/js/messagebox.js"></script>
<link href="/resources/static/css/messagebox.css" rel="stylesheet" type="text/css" />


<style type="text/css">
label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

}
/* tab font */
.ui-helper-reset {
	font-size : 12px !important;
}
 
table.dataTable thead tr>.dtfc-fixed-left
{
	background: #459e00;
} 
.empCard0{width:99.5%;border: 2px solid grey;height:25% !important;margin-left:5px}
.empCard0_1{width:29.5%;float:left;border: 0px solid gray;height:100% !important}
.empCard0_2{width:69.5%;float:right;border: 0px solid gray;height:100% !important}

.empCard1{width:99.5%;border: 2px solid grey;height:25% !important;margin-left:5px}
.empCard1_1{width:99.7%;border: 0px solid gray;height:90% !important}

.empCard2{width:99.5%;border: 2px solid grey;height:25% !important;margin-left:5px}
.empCard2_1{width:29.5%;float:left;border: 1px solid gray;height:100% !important}
.empCard2_2{width:29.5%;float:left;border: 1px solid gray;height:100% !important}
.empCard2_3{width:39.5%;float:right;border: 1px solid gray;height:100% !important}
.empCard2_a{width:0.5%;float:left;border: 0px solid gray;height:100% !important}

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
	<div style="position: relative ;margin:2px;height:5%;width:100%;border: 1px solid gray;z-index:100;">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>upload 자료 등록현황</h4>
		  	</td>
		  	<td style = "text-align:center;width:3%">  
		  		<span>기준년</span>
		  	</td>
			<td style="width:15%">			  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYear" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-year" style="margin-top: -1px"></div>			
				<!-- <input  class="form-control" autofocus tabindex="1" style="width:120px;text-align:center" id="baseYm" type="text" name="baseYm"  /> -->
			</td>
		    <td style = "text-align:right;width:22%">
			    <input class="pjy_btn_query" type="button" id="btnViewAll" value="조회">
			</td>
		  </tr>
		 </table>
		 
   	</div>

	<div class="empCard0" >
		<fieldset style="border:1 solid #9FB6FF">
		 	<legend > 배차정시성</legend>
			  	<div class="empCard0_1 ">
			    	<span>월별 등록현황(단위:일)</span>
					<table id = "punctualityYearGrid" class="cell-border " >	    			</table>
			  	</div>	
				<div class="empCard0_2 ">
			    	<span id="edt_punctualityBaseYm"></span>일별 등록현황(단위:건수)
					<table id = "punctualityMonthGrid" class="cell-border " >	    			</table>
				</div>
		</fieldset>	
	</div>
	<div class="empCard1" >
		<fieldset style="border:1 solid #9FB6FF">
		 	<legend > ISC운전횟수</legend>
			  	<div class="empCard0_1 ">
			    	<span>월별 등록현황(단위:일)</span>
					<table id = "iscDrivingRecordYearGrid" class="cell-border " >	    			</table>
			  	</div>	
				<div class="empCard0_2 ">
			    	<span id="edt_iscDrivingRecordBaseYm"></span>일별 등록현황(단위:건수)
					<table id = "iscDrivingRecordMonthGrid" class="cell-border " >	    			</table>
				</div>
		</fieldset>	

	</div>
	<div class="empCard2" >
	  	<div class="empCard2_1 ">
			<fieldset style="border:1 solid #9FB6FF">
			 	<legend > 위험운전행동</legend>
				    	<span>월별 등록현황(단위:명)</span>
						<table id = "dangerDrivingYearGrid" class="cell-border " >	    			</table>
			</fieldset>	
	  	</div>	
	  	<div class="empCard2_a "></div>
	  	<div class="empCard2_2 ">
			<fieldset style="border:1 solid #9FB6FF">
			 	<legend > 기타</legend>
				    	<span>-</span>
			</fieldset>	
	  	</div>	
	  	<div class="empCard2_a "></div>
	  	<div class="empCard2_3 ">
			<fieldset style="border:1 solid #9FB6FF">
			 	<legend > 기타</legend>
				    	<span>-</span>
			</fieldset>	
	  	</div>	

	</div>

</body>


</html>