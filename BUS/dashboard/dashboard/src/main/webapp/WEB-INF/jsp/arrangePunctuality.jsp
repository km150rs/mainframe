<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>배차정시성 월별 자료등록현황</title>

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
<script src="/monitor/arrangePunctuality.js"></script>
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
.empCard0{width:99.7%;border: 0px solid gray;height:72% !important}
.empCard0_1{width:99.7%;border: 0px solid gray;height:15% !important}

.empCard1{width:99.7%;border: 0px solid gray;height:100% !important}
.empCard1_1{width:99.7%;border: 0px solid gray;height:90% !important}

.empCard1_2{width:99.7%;border: 0px solid gray;height:45% !important}
.empCard1_3{width:99.7%;border: 0px solid gray;height:45% !important}

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
		  		<h4>배차정시성 월별 자료등록현황</h4>
		  	</td>
		  	<td style = "text-align:center;width:3%">  
		  		<span>기준월</span>
		  	</td>
			<td style="width:15%">			  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYm" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month" style="margin-top: -1px"></div>			
				<!-- <input  class="form-control" autofocus tabindex="1" style="width:120px;text-align:center" id="baseYm" type="text" name="baseYm"  /> -->
			</td>
		    <td style = "text-align:right;width:22%">
			    <input class="pjy_btn_query" type="button" id="btnViewAll" value="조회">
			</td>
		  </tr>
		 </table>
		 
   	</div>

	<div class="empCard0_1" >
			<table id = "viewTable" class="cell-border " >	    			</table>
	</div>

	<div class="empCard0">
		<div id="tabs" class="empCard1">
		  <ul>
		    <li><a href="#tabs-1">자료등록</a></li>
		    <li><a href="#tabs-2">자료검토</a></li>
		    <li><a href="#tabs-3">결과확인</a></li>
		    	<div style="float:right">
							<span class="txtRed">[*상단 표에서 노선과 일자를 선택하세요]</span>  기준일
							<input style="width:120px;text-align:center" id="baseYmd" type="text" name="baseYmd"  disabled/>
						  노선<input type="text" style="width:100px" id="routeNm" disabled> </input>
				</div>
		  </ul>
		  <div id="tabs-1">
			<div style="overflow:hidden;height:5%;width:100%">
				<table  style="width:100%;">
				  <tr class="form-group">
				  	<td style = "text-align:center;width:3%">  
				  	</td>
					<td style="width:5%">			  
					</td>
				  	<td style = "text-align:center;width:4%">
					</td>
					<td style="width:4%">			  
					</td>
				    <td style = "text-align:right;width:52%">
						<div class="filebox">
						  	<label for="excelfile">excel파일...</label> 
						  	<input class="upload-name" value="파일선택" disabled="disabled">
						  	<input type="file" id="excelfile" class="upload-hidden"> 
					    	<input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnView" value="조회">
							<input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnSave" value="저장">
					    	<input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnInit" value="초기화">
						</div>
					</td>
				  </tr>
				 </table>		  
			  </div>
			<div class="empCard1_1">
			    	<table id="exceltable" class="QueryResultGrid cell-border nowrap">	    		</table>
			  </div>
		  </div>
		  <div id="tabs-2">
			<div style="overflow:hidden;height:5%;width:99.6%">
				<table  style="width:100%;">
				  <tr >
				  	<td style = "text-align:left;width:13%">
							<span class="txtRed">* 처리순서 : 조회 -> 검토 -> 저장 </span>
				  	  	<input type="hidden" id="wiban_gijun" value="">
		  				<input type="hidden" id="wiban_min_value" value="">
		  				<input type="hidden" id="wiban_max_value" value="">
		  				<input type="hidden" id="code_am" value="">
		  				<input type="hidden" id="code_pm" value="">
				  	</td>
					<td style="width:5%">			  
					</td>
				  	<td style = "text-align:center;width:4%">
					</td>
					<td style="width:4%">			  
					</td>
				    <td style = "text-align:left;width:52%">
						<div class="filebox">
						    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnAnalView" value="조회" >
						    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnAnalProc" value="검토" >
						    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnAnalSave" value="저장" >
					    	<input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnAnalInit" value="초기화">
						    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnCommonView" value="설정...">
						</div>
					</td>
				  </tr>
				 </table>		  
			</div>		  
			<div class="empCard1_1">
			   	<div  id="basicData" class="empCard1_2">
				    <table id="analtable" class="QueryResultGrid cell-border nowrap">  </table>
				</div>
			   	<div class="empCard1_3">
				    <table id="newanaltable" class="QueryResultGrid cell-border nowrap">  </table>
				</div>
			</div>
		  </div>
		  
		  <div id="tabs-3">
			<div style="overflow:hidden;height:5%;width:99.6%">
				<table  style="width:100%;">
				  <tr >
				  	<td style = "text-align:left;width:23%">
							<span>* 사원명 변경 : 마우스 우클릭으로 변경 또는 신규id등록 가능</span>
				  	  	<input type="hidden" id="wiban_gijun" value="">
		  				<input type="hidden" id="wiban_min_value" value="">
		  				<input type="hidden" id="wiban_max_value" value="">
		  				<input type="hidden" id="code_am" value="">
		  				<input type="hidden" id="code_pm" value="">
				  	</td>
					<td style="width:15%">			  
							<span>[사원명 맵핑전 : ISC 운행기록 upload 필수]</span>
					</td>
				  	<td style="text-align:center;width:4%">
					</td>
					<td style="text-align:right;width:14%">			  
					</td>
				    <td style = "text-align:left;width:42%">
						<div class="filebox">
						    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnEmpMapping" value="사원명 맵핑" >
						    <input class="pjy_btn_small pjy_button_unfixed" type="button" id="btnAnalResultView" value="조회" >
						</div>
					</td>
				  </tr>
				 </table>		  
			</div>		  
		   	<div class="empCard1_1">
			    <table id="analresulttable" class="cell-border nowrap">  </table>
			</div>
		  </div>

		  
		</div>
   		
	</div>	
</body>


</html>