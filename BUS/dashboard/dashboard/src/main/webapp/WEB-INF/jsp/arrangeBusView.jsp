<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>월간 배차현황 조회</title>


    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>

  	<link href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>

 	<!-- <link href="https://cdn.datatables.net/plug-ins/1.13.4/features/searchHighlight/dataTables.searchHighlight.css" rel="stylesheet"> -->
	<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.13.4/features/searchHighlight/dataTables.searchHighlight.min.js"></script>
	<script type="text/javascript" src="https://bartaz.github.io/sandbox.js/jquery.highlight.js"></script>
	<link href="/resources/static/css/searchHighlight.css" rel="stylesheet">
	
  <link href="/resources/static/DataTables/RowGroup-1.3.1/css/rowGroup.dataTables.min.css" rel="stylesheet">
<!-- <script src="https://cdn.jsdelivr.net/gh/ashl1/datatables-rowsgroup@fbd569b8768155c7a9a62568e66a64115887d7d0/dataTables.rowsGroup.js"></script> -->







<script src="/monitor/common.js"></script>
<script src="/monitor/arrangeBusView.js"></script>
<script src="/resources/static/js/rowsGroup.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>

<!--https://www.jqueryscript.net/chart-graph/Animated-Responsive-Skill-Bar-Plugin-jQuery-Simple-SkillBar.html -->


<!--
	<script src="/resources/static/js/datatable-editor.js"></script>
	-->



<!-- 

	<script src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js"></script> 
<link rel="stylesheet" href="https://cdn.datatables.net/select/1.3.1/css/select.dataTables.min.css">
 -->



<!--
  <link href="/resources/static/DataTables/RowGroup-1.3.1/css/rowGroup.dataTables.min.css" rel="stylesheet">
<script src="/resources/static/DataTables/RowGroup-1.3.1/js/dataTables.rowGroup.min.js"></script>
-->

     <link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/south-street/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/jqueryui/dataTables.jqueryui.css" rel="stylesheet" type="text/css" />
   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
<!-- <script src="/resources/static/js/jquery.alert.js"></script> -->

<!-- mdi 처리시 -->
 
<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

<!-- <link id="themecss" href="/resources/static/js/jquery-lwd/themes/material/jquery-ui.theme.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resources/static/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<link href="/resources/static/js/jquery-ui-1.12.1/jquery-ui.structure.min.css" rel="stylesheet" type="text/css" />
 -->
<!-- <script type="text/javascript" src="/resources/static/node_modules/jquery-ui-1.12.1/jquery-ui.min.js"></script> -->
<!-- <link href="/resources/static/node_modules/jquery-ui-1.12.1/jquery-ui.structure.min.css" rel="stylesheet" type="text/css" /> -->

<!-- <script src="/resources/static/js/tui-date-picker.js"></script>
<link href="/resources/static/css/tui-date-picker.css" rel="stylesheet" type="text/css" /> -->

<link href="/main.css" rel="stylesheet">

<style type="text/css">

#QueryResultGridDetail,#QueryResultGridBasic{
	width: 100%;
	cursor:pointer; 
}
#tabs { margin-top: 0em;	font-size: 12px; }
#tabs li .ui-icon-close { float: left; margin: 0.4em 0.2em 0 0; cursor: pointer; }
#add_tab ,#btnViewParam{ cursor: pointer; }

/* label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 1em;

} */
.empInfo0_2_2{width:99.7%;border: 0px solid gray;height:80% !important;}
span2 {
    font-size: 11pt;
    width: 5em;
    border-radius: 3em;
    padding: .1em  .2em;
    line-height: 1.25em;
    border: 1px solid #4eccc4;
    display: inline-block;
    text-align: center;
    color:#4eccc4;
    background-color:#f7f7f7;
}
</style>

</head>

	<div style="position: relative ;margin:2px;height:5%;width:99.6%;border: 1px solid gray;background-color:white;z-index:100;">
		<table  style="color:black;width:100%;background-color:white">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>월간배차 스케쥴 조회</h4>
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
				  <select class="form-control"  tabindex="2" style="width:100px" id="group" > </select>
			</td>
		  	<td style = "text-align:center;width:10%">
<!-- 		  		<span >승무지시서
		    	<input class="pjy_btn_small" type="button" tabindex="3" id="btnExcelTemplete" value="템플릿등록">
		    	</span> -->  
			</td>
		    <td style = "text-align:right;width:50%">
		    	<!-- <a href="/naver-login">네이버 로그인</a> -->
		    	<!-- <input class="pjy_btn_query" type="button" tabindex="3" id="btnNaver" value="네이버">   -->
		    	<input class="pjy_btn_query" type="button" tabindex="3" id="btnSelect" value="조회">  
			</td>
		  		
		  </tr>
		 </table>
		 
   	</div>
   	<div class="empInfo0_2_2" >
   	
   	<!-- 	<div class="arrangeViewGrid0_2_2_1" >

			<div style="height:auto;background:#f7f7f7;border: 1px solid #4eccc4">
		    	<div style="width:100%;height:48px"> 노선 배차상태 </div>
			    	<input type="button" class="pjy_btn_small" id="btnRefresh" value="새로고침">	

					<table id = "TBL_arrangeStatus_popup" class="cell-border" >
								<thead>
						        <tr >
						            <th>노선</th>
						            <th>상태</th>
						        </tr>
						    	</thead>  				    	
	    			</table>
		    	<div style="width:100%;height:48px"> * </div>
			</div>
   		</div> -->
   	
   		<div class="arrangeViewGrid0_2_2_2" >
			<div id="tabs">
			  <ul>
			    <li><a href="#tabs-0">고정기사별 </a> </li>
			    <li><a href="#tabs-1">배차순번별</a> </li>
			  </ul>
			  <div id="tabs-0" >
 			 		 	<div class="arrangeViewGrid1 pjy_table_fixed" >
				    		<table id="QueryResultGridBasic" class="cell-border ">	    		</table>
				    	</div>
 				
					 	<div class="arrangeViewGrid2 pjy_table_fixed" >
				    		<table id = "QueryResultGridDetail" class="cell-border ">
							    <thead>
							        <tr >
							            <th>차량</th>
							            <th>기사</th>
							            <th>계</th>
							            <%for ( int fontSize = 1; fontSize <= 31; fontSize++){ %>
								            <th><%= fontSize %></th>
								        <%}%>
							            <th>bit</th>
							        </tr>
							    </thead>        		
				    		</table>
				    	</div>
				    	
 			 		 	<div class="arrangeViewGrid3 pjy_table_fixed" >
				    		<table id="QueryResultGridSP" class="cell-border ">	    		</table>
				    	<div style="height:10px;">		</div> 
				    	</div>
				    	<div style="height:10px;">		</div> 

			  	</div>
			  	
			  <div id="tabs-1">
			 		 	<div class="arrangeViewGrid1 pjy_table_fixed" >
				    		<table id="QueryResultGridBasic2" class="cell-border ">	    		</table>
				    	</div>
				
					 	<div class="arrangeViewGrid2 pjy_table_fixed" >
				    		<table id = "QueryResultGridDetail2" class="cell-border ">
							    <thead>
							        <tr >
							            <th>오전/오후</th>
							            <th>순번</th>
							            <th>계</th>
							            <%for ( int fontSize = 1; fontSize <= 31; fontSize++){ %>
								            <th><%= fontSize %></th>
								        <%}%>
							        </tr>
							    </thead>        		
				    		</table>
				    	<div style="height:10px;">		</div> 
				    	</div>
			  	</div>			  	
			</div>
		</div>
	</div>
    

    
</body>


</html>