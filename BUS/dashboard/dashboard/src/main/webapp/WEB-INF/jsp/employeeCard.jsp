<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>

<%@ include file="nav.jsp" %>


<head>
    <meta charset="UTF-8">
    <title>인사카드</title>
    

	<link href="/main.css" rel="stylesheet">

    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>


  	<link href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css" rel="stylesheet">
	<script type="text/javascript" src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>

<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />

<!--   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.2.0/sweetalert2.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.2.0/sweetalert2.all.min.js"></script>
 -->	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>

	<link href="https://cdn.datatables.net/select/1.6.2/css/select.dataTables.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.js"></script>


<script src="/monitor/employeeCard.js"></script>
<script src="/monitor/common.js"></script>
<!-- <script src="/resources/static/js/jquery.alert.js"></script> -->
<script src="/resources/static/js/jquery.blockUI.js"></script>
<script src="/resources/static/js/jquery-number-master/jquery.number.min.js"></script>
<script src="/resources/static/js/jquery.alert.js"></script>

<script src="/resources/static/js/datatable-editor.js"></script>
<script src="/resources/static/js/dataTables.rowsGroup.js"></script>

<link href="/resources/static/js/pjy_extend/jquery.splitter.css" rel="stylesheet" type="text/css" />
<script src="/resources/static/js/pjy_extend/jquery.splitter.js"></script>

<script src="/resources/static/js/jquery-lwd/jquery-lwd_pjy.js"></script>
<link href="/resources/static/js/jquery-lwd/jquery-lwd.structure.css" rel="stylesheet" type="text/css" />



<style type="text/css">

.pjy_button_unfixed {
	float:right;
}
#empListGrid tbody td,
#empRankGrid tbody td,
#empGrid tbody td {
	line-height: 1.5 !important ;
   	font-family: Lucida Console,Helvetica,sans-serif ;
    font-size:14px !important; 
    color:black;
}

#empRankGrid tbody td
{
	line-height: 1.8 !important ;
   	font-family: Lucida Console,Helvetica,sans-serif ;
    font-size:18px !important; 
    color:black;
    /* background-color:aquamarine; */
}
#accidentGrid tfoot td {
  text-align: right !important;
}

.QueryResultGrid{
	
    	display: table-cell;
    border: 1px solid gray;
  	font-family: Lucida Console,Helvetica,sans-serif !important;
    font-size:14px !important;
	  width: 100%!important ;
}
.QueryResultGrid2{
    	display: table-cell;
    border: 1px solid gray;
  	font-family: Lucida Console,Helvetica,sans-serif !important;
    font-size:14px !important;
	  width: 100%!important ;
}
.input-file-button{
  padding: 6px 25px;
  background-color:#FF6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.empCard0{width:99.7%;border: 0px solid gray;overflow: hidden ;height:90%}
.empCard0_1{width:15.0%;float: left;border: 0px solid gray;background: #f7f7f7 }
.empCard0_2{
	width:84.7%;border: 1px solid gray;
    overflow: hidden !important; 
	background: #f7f7f7;
	border-radius: 10px;
} 
.empCard0_2_0{width:100%;border: 0px solid gray;height:4%;padding-top:5px} 
.empCard0_2_1{width:100%;border: 1px solid gray;height:21.5%} 
.empCard0_2_2{width:100%;border: 0px solid gray;height:12%;padding-left:130px;padding-top:10px;padding-right:130px} 
.empCard0_2_3{width:100%;border: 0px solid gray;height:60%} 

.empCard0_3_0{width:99%;border: 0px solid gray;height:99%} 

.resultGrid2 tbody td {
	line-height: 1.2 !important ;
     /* padding: 1px 1px !important; */ 
   font-family: Lucida Console,Helvetica,sans-serif ;
     font-size:14px !important; 
     color:black;
}

span2 {
    font-size: 9pt;
}
  .circle {
         width: calc(1em / 0.4);
        height: calc(1em / 0.4);
        /*  box-shadow: 2px 2px 5px rgb(193, 193, 193); */
 		background-color:yellow;
    }
    /* 아래는 위에서 설정한 내용 */
    .circle {
        border-radius: 50%;
 
        display: flex;
        justify-content: center;
        align-items: center;
 
        font-size: 1em;
        color: rgb(56, 150, 128);
        border: 2px solid rgb(56, 150, 128);
    }
    /* 기본 스타일: 래퍼 */
    #wrapper {
        display: flex;
        justify-content: center;
 
        margin: 0 auto;
        padding: 3px;
        max-width: 1170px;
    }      

      
</style>

</head>
	<div style="position:relative;margin:2px;height:5%;width:99.6%;border: 1px solid gray;z-index:100;">
		<table  style="width:100%;">
		  <tr class="form-group">
		  	<td style = "text-align:left;width:20%">  
		  		<h4>인사 종합정보</h4>
		  	</td>
		  	<td style = "text-align:center;width:2%">
		  		<span >기준월 </span>
			</td>
		  	<td style = "text-align:center;width:3%">  
				<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">
		            <input type="text" id="from" aria-label="Date-Time" autocomplete="off">
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
		            <input type="text" id="to" aria-label="Date-Time" autocomplete="off">
		            <span class="tui-ico-date"></span>
		        </div>				  
		        <div id="datepicker-month-to" style="margin-top: -1px"></div>		  	
				<!-- <input class="form-control" autofocus tabindex="2"  type="text" id="to" name="to" style="width:90px" > -->
		  	</td>

		  	<td style = "text-align:center;width:4%">
			</td>
		    <td style = "text-align:right;width:30%">
			    <input type="radio" id="spGb1" name="spGb" value="ALL" checked>
			    <label class="chartType" for="spGb1">전체</label>
			    <input type="radio" id="spGb2" name="spGb" value="고정">
		    	<label class="chartType" for="spGb2">고정</label>
			    <input type="radio" id="spGb3" name="spGb" value="SP">
		    	<label class="chartType" for="spGb3">SP</label>
			    <input class="pjy_btn_query" type="button" id="btnView" value="조회">
			    <input class="pjy_btn_query" type="button" id="btnMake" value="평가자료생성">
			</td>
		  </tr>
		 </table>
		 
   	</div>

	<div id="widget" class="empCard0">
		<div id="foo" class="empCard0_1">
		    <table id="empListGrid" width="100%" class="cell-border nowrap">  
							    <thead>
							        <tr >
							            <th> 사번</th>
							            <th> 기사명</th>
							            <th> 노선번호</th>
							            <th> 노동조합</th>
							        </tr>
							    </thead>		    
		    </table>
	    </div>
		
		<div id="bar" class="empCard0_2">
		    <div class="empCard0_2_0">
				<form id="uploadForm" method="post" action="/upload_image" enctype="multipart/form-data">
					<label style="float:right" class="pjy_btn_small" for="input-file">
		  				사진등록...
					</label>
					<input style="float:right;display:none" type="file" id="input-file" name="images" class="inp-img" accept=".gif, .jpg, .png" value="선택"> 
					<button class="pjy_btn_small" style="float:right" type="button" id="deleteImageBtn">사진삭제</button> 
				</form>
			</div>
		    <div class="empCard0_2_1">
		    	<table id = "empGrid" width="100%" class="cell-border nowrap">
							    <thead>
							        <tr >
							            <th> 직원사진</th>
							            <th>개인정보</th>
							            <th> </th>
							            <th>입사정보</th>
							            <th> </th>
							            <th>근무정보</th>
							            <th> </th>
							            <th>구분</th>
							            <th> </th>
							            <th>자격득실</th>
							            <th> </th>
							        </tr>
							    </thead>
	    		</table>
		    </div>
	    	
		    <div class="empCard0_2_2">
		    	<table id = "empRankGrid" width="100%" class="cell-border nowrap">
	    		</table>
		    </div>

			<div class="empCard0_2_3" id="tabs">
			  	<ul>
				    <li><a href="#tabs-1">근태기록</a></li>
				    <li><a href="#tabs-2">휴가내역</a></li>
				    <li><a href="#tabs-3">사고내역</a></li>
				    <li><a href="#tabs-4">위험운전행동</a></li>
				    <li><a href="#tabs-5">배차정시성</a></li>
				    <li><a href="#tabs-6">근무협조(운행기록)</a></li>
				    <li><a href="#tabs-7">행정민원내역</a></li>
			  	</ul>
				<div class="empCard0_3_0" id="tabs-1">
				    	<table id="empWorkingLogGrid"  class="resultGrid2 cell-border nowrap">	    		</table>
				</div>
				<div class="empCard0_3_0" id="tabs-2">
				    	<table id="empVacationGrid"  class="resultGrid2 cell-border nowrap">	    		</table>
				</div>
				<div class="empCard0_3_0" id="tabs-3">
				    	<table id="accidentGrid"  class="resultGrid2 cell-border nowrap">	    		
    
				    	</table>
				</div>

				<div class="empCard0_3_0" id="tabs-4">
							<span2>최근3년 기준</span2>	
						    <table id="dangerGrid" class="resultGrid2 cell-border nowrap">  </table>
				</div>
					  
				<div class="empCard0_3_0" id="tabs-5">
							<span2></span2>	
						    <table id="punctualityGrid" class="resultGrid2 cell-border nowrap">  </table>
				</div>

				<div class="empCard0_3_0" id="tabs-6">
					    <div style="Width:100%;height:100%;overflow:hidden"> 
					        <div style="float:left; height: 100%; Width:61%; ">
<!-- 					        	<div style="position:relative;z-index:100">
							        <div  class="tui-datepicker-input tui-datetime-input tui-has-focus">		
						            <input type="text" id="baseYear" aria-label="Date-Time">
						            <span class="tui-ico-date"></span>
							        </div>				  
						        	<div id="datepicker-month" ></div>
						        </div> -->
				        		<span2>월별통계</span2>
							    <table id="yearDrivingRecordGrid" class="resultGrid2 cell-border nowrap">  </table>
					        </div>
					        <div style="float:right; height: 49%; Width:38.8%;">
					        		<span2>일별통계</span2>
								    <table id="monthDrivingRecordGrid"  class="resultGrid2 cell-border nowrap">  </table>
					        </div>
					        <br>
					        <div style="float:right; height: 49%; Width:38.8%;">
					        		<span2>일일상세내역</span2>
								    <table id="dayDrivingRecordGrid" class="resultGrid2 cell-border nowrap">  </table>
					        </div>
					    </div>
				</div>

				<div class="empCard0_3_0" id="tabs-7">
							<span2></span2>	
						    <table id="publicComplaintGrid" class="resultGrid2 cell-border ">  </table>
				</div>

			</div>
			
	    </div>
    </div>
</body>


</html>