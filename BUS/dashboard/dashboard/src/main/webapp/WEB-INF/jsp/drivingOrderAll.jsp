<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>배차현황표</title>


    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>

  	<link href="/resources/static/DataTables/DataTables-1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/static/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>

 	<!-- <link href="https://cdn.datatables.net/plug-ins/1.13.4/features/searchHighlight/dataTables.searchHighlight.css" rel="stylesheet"> -->
	
<!-- 	<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.13.4/features/searchHighlight/dataTables.searchHighlight.min.js"></script>
	<script type="text/javascript" src="https://bartaz.github.io/sandbox.js/jquery.highlight.js"></script>
	<link href="/resources/static/css/searchHighlight.css" rel="stylesheet">
 -->	
  <link href="/resources/static/DataTables/RowGroup-1.3.1/css/rowGroup.dataTables.min.css" rel="stylesheet">







<script src="/monitor/common.js"></script>
<script src="/monitor/drivingOrderAll.js"></script>
<script src="/resources/static/js/rowsGroup.js"></script>
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>



     <link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/south-street/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/jqueryui/dataTables.jqueryui.css" rel="stylesheet" type="text/css" />
   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
   
   	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   
<!-- <script src="/resources/static/js/jquery.alert.js"></script> -->

<!-- mdi 처리시 -->
 
<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

<link id="themecss" href="/resources/static/js/jquery-lwd/themes/material/jquery-ui.theme.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resources/static/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>

<!-- <link href="/resources/static/js/jquery-ui-1.12.1/jquery-ui.structure.min.css" rel="stylesheet" type="text/css" />
 -->
<link href="/resources/static/js/pjy_extend/jquery.splitter.css" rel="stylesheet" type="text/css" />
<script src="/resources/static/js/pjy_extend/jquery.splitter.js"></script>

<!-- <script src="/resources/static/js/pjy_extend/printThis.js"></script>
<link href="/resources/static/css/print.css" rel="stylesheet" type="text/css" />
 -->
<link href="/main.css" rel="stylesheet">

<style type="text/css">


 
.empCard0{width:99.7%;border: 0px solid gray;overflow: hidden ;height:85%}
.empCard0_a{width:10.0%;float: left;background: white;overflow: hidden ;height:100%}
.empCard0_b{width:80.0%;float: left;background: white;overflow: hidden ;height:100%}

.empCard0_1{width:25.0%;float: left;border: 5px solid black;background: white;overflow: hidden ;height:50%;border-radius: 10px}
.empCard0_2{width:50.0%;float: left;border: 5px solid black;background: white;overflow: hidden ;height:50%;border-radius: 10px}

.span1 {
  background-color : aqua;
  color : black;
  margin-left:10px;
 }
.span2 {
  background-color : yellow;
  color : black;
  margin-left:10px;
 }
 
.panelContainer {
padding: 5px;
/* 	padding: 5px;
	margin: 5px;
 	 border-radius: 3em;
 	 */
	/* border: 1px solid gray; */
	background-color: darkgreen;
	color:black;
	text-align: center;
	font-weight: 800;
	font-size:18px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 14px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

</head>

	<div style="position: relative ;margin:2px;height:10%;width:99.6%;border: 1px solid gray;background-color:white;z-index:100;">
		<table  style="color:black;width:100%;background-color:white">
		  <tr class="form-group">
			<td style="width:30%">			  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="baseYmd" aria-label="Date-Time">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-day" style="margin-top: -1px"></div>
			</td>
		  	<td style = "text-align:center;width:40%">  
		  		<h1>배차현황</h1>
		  		<h2 id="workDate">기준일</h2>
		  	</td>		  
		  	
		  	
		  	<td style = "text-align:right;width:30%">  
				<select id="select_background">
				    <option style="color:gray" value="null">background color</option>
				    <option value="white" >white</option>
				    <option value="black" >black</option>
				    <option value="yellow" >yellow</option>
				    <option value="Red" >Red</option>
				    <option value="springgreen" >green</option>
				    <option value="aqua" >aqua</option>
				</select>		  		
				<select id="select_color">
				    <option style="color:gray" value="null">font color</option>
				    <option value="white" >white</option>
				    <option value="black" >black</option>
				</select>
						  						<!-- Rounded switch -->
				<label class="switch">
				  <input type="checkbox">
				  <span class="slider round"></span>
				</label>
	<!-- 	    	<input class="pjy_btn_query" type="button" tabindex="3" id="btnPrint" value="조회"> -->  
						  		
		  	</td>		  
		  		
		  </tr>
		 </table>
		 
   	</div>
   	
	<div id="widget" class="empCard0">
		<div class="empCard0_a"></div>
		<div class="empCard0_b">
		
			<div id="foo" class="empCard0_1">
				<div id="title1" class="panelContainer">title</div>		
			    <table id="viewTable1" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >순번</th>
							            <th >기사</th>
							            <th >차량</th>
							            <th >기사</th>
							            <th >순번</th>
							        </tr>
						    	</thead> 	    
			    </table>
			</div>
			<div id="foo" class="empCard0_1">
				<div id="title2" class="panelContainer">title</div>		
			    <table id="viewTable2" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >순번</th>
							            <th >기사</th>
							            <th >차량</th>
							            <th >기사</th>
							            <th >순번</th>
							        </tr>
						    	</thead> 	    
			    </table>
			</div>
			<div id="foo" class="empCard0_1">
				<div id="title3" class="panelContainer">title</div>		
			    <table id="viewTable3" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >순번</th>
							            <th >기사</th>
							            <th >차량</th>
							            <th >기사</th>
							            <th >순번</th>
							        </tr>
						    	</thead> 	    
			    </table>
			</div>
			<div id="foo" class="empCard0_1">
				<div id="title4" class="panelContainer">title</div>		
			    <table id="viewTable4" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >순번</th>
							            <th >기사</th>
							            <th >차량</th>
							            <th >기사</th>
							            <th >순번</th>
							        </tr>
						    	</thead> 	    
			    </table>
			</div>

			<div id="foo" class="empCard0_1">
				<div id="title5" class="panelContainer">title</div>		
			    <table id="viewTable5" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >순번</th>
							            <th >기사</th>
							            <th >차량</th>
							            <th >기사</th>
							            <th >순번</th>
							        </tr>
						    	</thead> 	    
			    </table>
			</div>
			
			<div id="foo" class="empCard0_2"> 
			    <table id="offTable" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >노선</th>
							            <th >휴무자</th>
							        </tr>
						    	</thead> 	    
			    </table>
			    <table id="otherSPTable" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >노선</th>
							            <th >SP 타노선 근무자</th>
							        </tr>
						    	</thead> 	    
			    </table>
	
			</div>
			
			<div id="foo" class="empCard0_1">
				<div id="title6" class="panelContainer">title</div>		
			    <table id="viewTable6" class="drivingOrder cell-border nowrap" >  
								<thead>
							        <tr >
							            <th >순번</th>
							            <th >기사</th>
							            <th >차량</th>
							            <th >기사</th>
							            <th >순번</th>
							        </tr>
						    	</thead> 	    
			    </table>
			</div>
		</div>
		<div class="empCard0_a"></div>
		
	</div>

<!-- 	<div id="message" class="panelContainer">
		<MARQUEE style="text-align:center" scrolldelay="500" direction="up">안내메시지</MARQUEE>
	</div>		
 -->    
</body>


</html>