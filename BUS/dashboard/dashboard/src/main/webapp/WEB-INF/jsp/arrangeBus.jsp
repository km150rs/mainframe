<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>배차시스템</title>


    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>

  	<link href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
	<!-- <script type="text/javascript" src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script> -->

		<script type="text/javascript" src="/resources/static/js/jquery.inputmask.bundle.js"></script>


<script src="/monitor/common.js"></script>
<script src="/monitor/arrangeBus.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>

<!--https://www.jqueryscript.net/chart-graph/Animated-Responsive-Skill-Bar-Plugin-jQuery-Simple-SkillBar.html -->
<script src="/resources/static/js/datatable-editor.js"></script>

<!-- https://gasparesganga.com/labs/jquery-message-box/ -->
<script src="/resources/static/js/messagebox.js"></script>
<link href="/resources/static/css/messagebox.css" rel="stylesheet" type="text/css" />

<!-- <script src="/resources/static/js/tui-date-picker.js"></script>
<link href="/resources/static/css/tui-date-picker.css" rel="stylesheet" type="text/css" /> -->

<!-- mdi 처리시 -->
 <!-- 
<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<script type="text/javascript" src="/resources/static/node_modules/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />
<link href="/resources/static/node_modules/jquery-ui-1.12.1/jquery-ui.structure.min.css" rel="stylesheet" type="text/css" />
<link id="themecss" href="/resources/static/js/jquery-lwd/themes/material/jquery-ui.theme.css" rel="stylesheet" type="text/css" />

 -->



	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>




<script src="https://cdn.datatables.net/plug-ins/1.13.4/api/fnFindCellRowIndexes.js"></script> 

  <link href="/resources/static/DataTables/RowGroup-1.3.1/css/rowGroup.dataTables.min.css" rel="stylesheet">
<script src="/resources/static/DataTables/RowGroup-1.3.1/js/dataTables.rowGroup.min.js"></script>


    <link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/south-street/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/jqueryui/dataTables.jqueryui.css" rel="stylesheet" type="text/css" />
   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
 
<!-- <script src="/resources/static/js/jquery.alert.js"></script> -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.contextMenu.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.ui.position.js"></script>

<script src="/resources/static/DataTables/Select-1.6.2/js/dataTables.select.min.js"></script> 
<link rel="stylesheet" href="/resources/static/DataTables/Select-1.6.2/css/select.dataTables.min.css">


  <link rel=stylesheet type=text/css href="https://cdn.datatables.net/fixedcolumns/3.2.5/css/fixedColumns.jqueryui.css?v=3.2.5">
  <script type="text/javascript" src="https://cdn.datatables.net/fixedcolumns/3.2.5/js/dataTables.fixedColumns.js?v=3.2.5"></script>

<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />



<link href="/main.css" rel="stylesheet">

<style type="text/css">

#QueryResultGridDetail,#QueryResultGridBasic{
	width: 100%;
	cursor:pointer; 
	overflow:auto;
}
/* 
#tbm_driverInfo_detail,
#TBL_DRIVERINFO_SP,
#tbm_arrangeStatus,
#tbm_routeInfoDetail
{
	width: 99% !important;
}
 */
#tabs,#tabs3 { margin-top: 0em;	font-size: 12px; }
#tabs li .ui-icon-close { float: left; margin: 0.4em 0.2em 0 0; cursor: pointer; }
#add_tab ,#btnViewParam{ cursor: pointer; }

/* label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

} */
.div_beforeAllocate {
  width: 0;
  height: 0;
  border-bottom: 9px solid silver;
  border-top: 9px solid transparent;
  border-left: 10px solid silver;
  border-right: 10px solid transparent;
/*
  border-bottom: 7px solid #EF9A9A;
  border-top: 7px solid transparent;
  border-left: 17px solid #EF9A9A;
  border-right: 25px solid transparent;
 */  position: relative;
}
.div_offDay {
  width: 0;
  height: 0;
  border-bottom: 9px solid #EF9A9A;
  border-top: 9px solid transparent;
  border-LEFT: 10PX solid #EF9A9A;
  border-right: 10px solid transparent;

/*   border-bottom: 7px solid red;
  border-top: 7px solid transparent;
  border-left: 13px solid red;
  border-right: 22px solid transparent;
 */
  position: relative;
}
.div_afterAllocate {
  width: 0;
  height: 0;
  border-bottom: 9px solid gray;
  border-top: 9px solid gray;
  border-LEFT: 10PX solid gray;
  border-right: 10px solid gray;

/*   border-bottom: 7px solid #EF9A9A;
  border-top: 7px solid #EF9A9A;
  border-left: 17px solid #EF9A9A;
  border-right: 25px solid #EF9A9A;
 */
  position: relative;
}
.div_afterAllocate_offday {
  width: 0;
  height: 0;
  border-bottom: 9px solid #EF9A9A;
  border-top: 9px solid #EF9A9A;
  border-LEFT: 10PX solid #EF9A9A;
  border-right: 10px solid #EF9A9A;

/*   border-bottom: 7px solid #E53935;
  border-top: 7px solid #E53935;
  border-left: 17px solid #E53935;
  border-right: 25px solid #E53935;
 */
  position: relative;
}
.div_Text_beforeAllocate {
  width: 0;
  height: 0;
  position: relative;
  text-align:center;
  top:-16px;
  left:2px;
   color : black;
}
.div_Text_afterAllocate {
  width: 0;
  height: 0;
  position: relative;
  text-align:left;
  top:-14px;
  left:0px;
  color : white; 
}
 .circle2 {
        width: calc(0.7em / 0.7);
        height: calc(0.7em / 0.7);
    }
    /* 아래는 위에서 설정한 내용 */
    .circle2 {
        border-radius: 50%;
 
        display: flex;
        justify-content: left;
        align-items: right;
  
        /* font-size: 2em; */
        color: rgb(56, 150, 128);
        border: 1px solid rgb(56, 150, 128);
    }
     .circle {
        margin: 0 auto;
        width: 15px;
        height: 7px;
        border: 7px solid rgb(163, 151, 198);
        border-radius: 50%;
    }

.labelType {
	color:black !important
}
span2 {
    font-size: 16pt;
    width: 6em;
    border-radius: 3em;
    padding: .1em  .2em;
    line-height: 1.25em;
    border: 1px solid #333;
    display: inline-block;
    text-align: center;
    background-color:#4eccc4;
      }
      
.background {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://loremflickr.com/320/240');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}


</style>

</head>


	<div style="position: relative ;margin:2px;height:60px;width:99.6%;border: 1px solid gray;z-index:100;">
		<table  style="color:black;width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>월간배차 스케쥴 등록</h4>
				<label><input type="checkbox" name="leftDiv" value="N" checked>show left</label>
		  	</td>		  
		  	<td style = "text-align:center;width:4%">  
		  		<span>기준월</span>
		  	</td>
			<td style="width:4%">		
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYm" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month" style="margin-top: -1px"></div>
				<!-- <input  class="form-control" autofocus tabindex="1" style="width:100px;text-align:center" id="baseYm" type="text" name="baseYm"  /> -->
			</td>
		  	<td style = "text-align:center;width:4%">
		  		<span >노선번호 </span>
			</td>
			<td style="width:4%">			  
				  <select class="form-control"  tabindex="2" style="width:100px" id="comboRouteNm" > </select>
			</td>
		  	<td style = "text-align:center;width:4%">
			</td>
			
		    <td style = "text-align:right;width:50%">
		    	<input class="pjy_btn_query" type="button" tabindex="3" id="btnSelect" value="조회">  
			    <input class="pjy_btn_query pjy_button_fixed" type="button" tabindex="4" id="btnInit" value="기초자료생성" disabled>
<!-- 			    <input class="pjy_btn_query pjy_button_fixed" type="button" tabindex="5" id="btnDelete" value="배차삭제" disabled> -->
			    <input class="pjy_btn_query pjy_button_fixed" type="button" tabindex="6" id="btnReview" value="저장" disabled>
			    <input class="pjy_btn_query pjy_button_fixed" type="button" tabindex="7" id="btnFix" value="배차확정" disabled>
			    <input class="pjy_btn_query pjy_button_unfixed" type="button" tabindex="8" id="btnFixCancel" value="배차확정취소" disabled>

			</td>
			<td style="width:5%">			  
			   <select class="form-control"  id="comboInitSeq" > </select>
			</td>
			<td style="width:4%">			  
			    <input class="pjy_btn_query2" type="button" tabindex="9" id="btnAddOffType" value="근태설정.." >
			</td>
		  </tr>
		 </table>
		 
   	</div>
   	<div class="dynamicSqlGrid0_2_2" style="visibility:hidden">
   		<div class="dynamicSqlGrid0_2_2_1" >
   		
			<div class="status-color" style="height:600px;background:#f5f3e5 ">
			    <div id="tabs">
					<ul>
					    <li><a href="#svc_tab21">전월현황</a></li>
					    <li><a href="#svc_tab22">예비기사</a></li>
					    <li><a href="#svc_tab23">요일별간격</a></li>
					    <li><a href="#svc_tab24">근태현황</a></li>
					</ul>    
				    <div id="svc_tab21" class="tab_svc2">
				    	<div style="width:100%;height:17px"> [변경시 기초자료재생성 필수]</div>
				    	
				    	<label><input type="checkbox" name="autoMatching" value="N" checked>auto match</label>  
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab21_refresh" value="새로고침">
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab21_save" value="저장">	
				    	<table id="TBM_DRIVERINFO_DETAIL" class="cell-border pjy_table_fixed" >				    	
							<thead>
					        <tr >
					            <th>차량</th>
					            <th>기사</th>
					            <th>No</th>
					            <th>전월</th>
					            <th>a/p</th>
					            <th>off</th>
					            <th>bit</th>
					        </tr>
					    	</thead>  				    	
				    	</table>							    
					</div>
				    <div id="svc_tab22" class="tab_svc2">
				    	<div style="width:100%;height:17px"> </div>
				    	[예비기사 더블클릭]  
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab22_refresh" value="새로고침">
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab22_add" value="추가">	
				    	<table id="TBM_DRIVERINFO_SP" class="cell-border pjy_table_fixed" >
				    		<thead>
					        <tr >
					            <th>차량</th>
					            <th>기사</th>
					            <th>생일</th>
					            <th>입사</th>
					            <th>호봉</th>
					        </tr>
					    	</thead>  				    	
				    	
				    	</table>							    
					</div>
				    <div id="svc_tab23" class="tab_svc2">
				    	<div style="width:100%;height:17px"> </div>
				    	[변경시 기초자료재생성 필요]
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab23_refresh" value="새로고침">
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab23_save" value="저장">	
				    	<table id="TBM_ROUTE_WEEKSEQ_INFO" class="cell-border pjy_table_fixed" >
				    		<thead>
					        <tr >
					            <th>요일구분</th>
					            <th>요일구분1</th>
					            <th>요일구분2</th>
					            <th>근무간격</th>
					            <th>route_nm</th>
					            <th>bit</th>
					        </tr>
					    	</thead>  				    	
				    	
				    	</table>							    
					</div>
				    <div id="svc_tab24" class="tab_svc2">
				    	<div style="width:100%;height:17px"> </div>
				    	[기준월 근태현황]  <input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab24_refresh" value="새로고침">	
				    	<table id="TBM_EMPLOYEE_VACATION_INFO" class="cell-border pjy_table_fixed" >
				    		<thead>
					        <tr >
					            <th>일자</th>
					            <th>기사</th>
					            <th>근태구분</th>
					            <th>메모</th>
					        </tr>
					    	</thead>  				    	
				    	
				    	</table>							    
					</div>

				</div>
			</div>      		    
       		
			<div class="status-color" style="height:215px;margin-top:10px">
				<div id="tabs3">
					<ul>
					    <li><a href="#svc_tab31">기준월배차상태</a></li>
					    <li><a href="#svc_tab32">전체노선감차설정</a></li>
					</ul>    
				    <div id="svc_tab31" class="tab_svc3">
				    	<input type="button" class="pjy_btn_small" id="btnTab31_refresh" value="새로고침">	
				    	<table id="TBM_MONTH_ARRANGE_STATUS" class="cell-border" >				    	
							<thead>
					        <tr >
					            <th>노선</th>
					            <th>상태</th>
					            <th>처리</th>
					            <th>시간</th>
					        </tr>
					    	</thead>  				    	
				    	</table>							    
					</div>
				    <div id="svc_tab32" class="tab_svc3">
				    	[기초자료재생성 필요]
				    	<input type="button" class="pjy_btn_small pjy_button_fixed" id="btnTab32_refresh" value="새로고침">
				    	<input type="button" class="pjy_btn_small" id="btnTab32_save" value="저장">	
				    	<table id="TBM_ROUTE_REDUCTION_INFO" class="cell-border" >				    	
							<thead>
					        <tr>
					            <th>노선</th>
					            <th>보유<br>댓수</th>
					            <th>감차<br>토요일</th>
					            <th>감차<br>일/공휴일</th>
					            <th>bit</th>
					        </tr>
					    	</thead>  				    	
				    	</table>							    
					</div>
				</div>
			</div>
   		</div>

	 	<div class="dynamicSqlGrid0_2_2_2" >
 		 	<div class="dynamicSqlGrid1" >
	    		<table id="QueryResultGridBasic" class="cell-border pjy_table_fixed">	    		</table>
	    	</div>
	
		 	<div class="dynamicSqlGrid2" >
	    		<table id = "QueryResultGridDetail" class="cell-border pjy_table_fixed">
				    <thead>
				        <tr >
				            <th>차량</th>
				            <th>기사</th>
				            <th>오전</th>
				            <th>오후</th>
				            <th>계</th>
				            <%for ( int fontSize = 1; fontSize <= 31; fontSize++){ %>
					            <th><%= fontSize %></th>
					        <%}%>
				          <!--   <th>bit</th> -->
				        </tr>
				    </thead>        		
	    		</table>
	    	</div>
 		 	<div class="dynamicSqlGrid3" >
	    		<table id="QueryResultGridSP" class="cell-border pjy_table_fixed">	    		</table>
	    	</div>
	    	
    	</div>
	</div>
    

    
</body>


</html>