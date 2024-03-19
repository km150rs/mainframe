
var param = {};
var popupManager = null;
var commonVo =  new Object();
var newData ;

const TAB_DIV_HEIGHT =  80;

 let columnMap_publicComplaint = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['company_nm'   ,'운송업체']
	,['emp_nm'       ,'해당기사']
	,['comp_date'    ,'민원일자']
	,['real_comp_date'    ,'일시']
	,['comp_type'    ,'민원유형']
	,['place'        ,'장소']
	,['route_nm'     ,'노선번호']
	,['car_no'       ,'차량번호']
	,['memo'         ,'민원내용']
	,['seq'         ,'연번']
	,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);

 let columnMap_punctuality = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['base_ymd'        ,'일자'          ] 
	,['emp_no'          ,'사번'          ] 
	,['emp_nm'          ,'사원명'        ] 
	,['col'     	   	,'제외'      ] 
	,['col000'        	,'버스ID'      ] 
	,['col001'         	,'차량번호'      ] 
	,['col002'          ,'운행회차'   ] 
	,['col003'    		,'운행시작시각'      ] 
	,['col004'         	,'운행종료시각'          ] 
	,['route_nm'        ,'노선'          ] 
	,['term'        	,'배차간격'        ] 
	,['term_85'       	,'몰림기준'      ] 
	,['term_125'       	,'지연기준'        ] 
	,['term_past_cnt'   ,'몰림'        ] 
	,['term_late_cnt'   ,'지연'        ] 
	,['term_wiban_cnt'   	,'위반건수'            ] 
	,['total_station_cnt'   ,'정류장수'      ] 
	,['last_chg_user'       ,'최종사용자']	 
	,['last_chg_date'       ,'최종수정일']	 
]);
let columnMap_danger = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['emp_nm'       	,'운전자']
	,['danger_km100'    ,'100km']
	,['danger_act_cnt'  ,'실제횟수']
	,['danger_act'      ,'위험행동']
	,['danger_level'    ,'위험수준']
	,['driving_cnt'   	,'운행일수']
	,['driving_distance','총운행거리']
	,['driving_time'    ,'총운행시간']
	,['base_ym'     	,'기준월']
	,['last_chg_user'   ,'최종사용자']	 
	,['last_chg_date'   ,'최종수정일']	 
]);


let columnMap_accident = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['base_year'   ,'기준년도']
	,['company_nm'      ,'회사']
	,['seq'             ,'연번']
	,['acc_gb'          ,'사고구분']
	,['gapi_gb'         ,'가피구분']
	,['acc_kind'        ,'사고유형']
	,['jacha_rate'      ,'자차과실(%)']
	,['sangdae_rate'    ,'상대과실(%)']
	,['proc_result'     ,'처리결과']
	,['proc_memo'       ,'처리 진행사항']
	,['acc_date'        ,'사고날짜']
	,['acc_time'        ,'사고시간']
	,['acc_place'       ,'사고장소']
	,['route_nm'        ,'노선번호']
	,['car_no'       	,'차량번호']
	,['emp_nm'          ,'운전자']
	,['daein_in_amt'    ,'대인 입금금액']
	,['daemul_in_amt'   ,'대물 입금금액']
	,['in_tot_amt'      ,'입금금액 합계']
	,['daein_out_amt'   ,'대인 지출금액']
	,['daemul_out_amt'  ,'대물 지출금액']
    ,['jacha_amt'       ,'자차수리비 지출금액']
    ,['out_tot_amt'     ,'지출금액 합계']
    ,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);
 

 let columnMap_drivingRecord = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['work_date' , '운행일자']
	,['base_ym'   ,'기준월']
	,['route_nm' , '노선']
	,['driver_id' , 'ISC운전자ID']
	,['car_regno' , '차량번호']
	,['start_time' , '출발']
	,['end_time' , '종료']
	,['ampm_gb' , '오전/오후']
	,['start_time' , '출발']
	,['bms_km' , '총운행<br>거리(Km)']
	,['tot_min' , '총운행<br>시간']
	,['avg_bms_km' , '일평균<br>거리(Km)']
	,['avg_tot_min' , '일평균<br>시간']
	,['wholeavg_bms_km' , '회사평균<br>거리(Km)']
	,['wholeavg_tot_min' , '회사평균<br>시간']
	,['tot_day' , '총 운행<br>일수']
	,['tot_cnt' , '총 운행<br>횟수']
	,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);

 let columnMap_empWorkingLog = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['company_nm'      ,'회사']
	,['work_date'       ,'날짜']
	,['work_time'       ,'시간']
	,['emp_nm'          ,'성명']
	,['route_nm'        ,'노선']
	,['car_no'        	,'차량번호']
	,['code_type1'      ,'유형']
	,['code_type2'    	,'세부항목']
	,['code_type3'    	,'소분류항목']
	,['detail_desc' 	,'내용']
	,['disposition_amt'       	,'금액(사고 및 과태료)']
	,['disposition_date'       ,'교육 일자&처분일자']
	,['disposition_result'    	,'처분결과']
	,['memo'       		,'비고']
    ,['last_chg_user'   ,'최종사용자']	 
	,['last_chg_date'   ,'최종수정일']	 
	,['bit' 	       	,'변경 여부']	 
]);

 let columnMap_empVacation = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['start_date'      ,'시작일']
	,['end_date'        ,'종료일']
	,['reg_date'        ,'등록일']
	,['attendance_type' ,'휴가종류']
	,['memo'        	,'사유']
	,['delete_yn'      	,'취소여부']
    ,['last_chg_user'   ,'최종사용자']	 
	,['last_chg_date'   ,'최종수정일']	 
	,['bit' 	       	,'변경 여부']	 
]);

function render_resultRank(data,type,row,meta){
    var colNm = meta.settings.aoColumns[meta.col].mData;
	var api = new $.fn.dataTable.Api(meta.settings);
	
	if (meta.col == 0) {
		//$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		return '<div id="wrapper">    <div class="circle">' + data + '</div></div>';
		//$(api.cell(meta.row, meta.col).node()).css('background-color', 'wheat');
	}
	

	if (colNm == 'TOT_POINT') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		data = $.fn.dataTable.render.number(',','.',1).display(data);
		return data;
	}
	
    if (data == null || data == undefined || data == '')
    	return '-';

	return data;
} 

function render_check(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	$(api.cell(meta.row, meta.col).node()).css('background-color', '#d5ffff');
	
	return data;
}
function render_year(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 5 || meta.col == 7) {
		data = secToMin(data*60);		
	}

	if (meta.col > 5) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'khaki');
	}	
	return data;
}
function render_month(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 5) {
		data = secToMin(data*60);		
	}
	
	return data;
}
function render_day(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 5) {
		data = secToMin(data*60);		
	}
	
	return data;
}

function render_amt(data,type,row,meta){
    if (data == null)
    	return data;

    var colNm = meta.settings.aoColumns[meta.col].mData;
	
	var expNumCol = /(_amt)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}
	return data;
}

 
$( function() {
	var tabs = $( "#tabs" ).tabs(
		{
		  activate: function(e, ui) {
		    var id = $(ui.newPanel).prop('id');
		    if (id == 'tabs-3')
				popupManager.btnView_accident();
		    else if (id == 'tabs-1')
				popupManager.btnView_empWorkingLog();
		    else if (id == 'tabs-2')
				popupManager.btnView_empVacation();
		    else if (id == 'tabs-4')
				popupManager.btnView_danger();
		    else if (id == 'tabs-5')
		    	popupManager.btnView_punctuality();
		    else if (id == 'tabs-6')
				popupManager.btnView_iscDrivingRecord_year();
		    else if (id == 'tabs-7')
				popupManager.btnView_publicComplaint();
		  }
		}		
	);    

/*    var observer = window.ResizeObserver ? new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
            $(entry.target).DataTable().columns.adjust();
        });
    }) : null;
    // Function to add a datatable to the ResizeObserver entries array
    resizeHandler = function ($table) {
        if (observer)
            observer.observe($table[0]);
    };
    
	resizeHandler($('#empListGrid'));
*/ 	
/*
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'year',
        input: {
            element: '#baseYear',
            format: 'yyyy'
        }
    });
*/
	var now = new Date();
	var yearStart = new Date(now.setMonth(now.getMonth() - now.getMonth()));	// 한달 전
    var calMonthKo_from = new tui.DatePicker('#datepicker-month-from', {
        date: yearStart,
        language: 'ko',
        type: 'month',
        input: {
            element: '#from',
            format: 'yyyy-MM'
        }
    });
    
    var calMonthKo_to = new tui.DatePicker('#datepicker-month-to', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#to',
            format: 'yyyy-MM'
        }
    });    

   	$('#widget').css('height', calcDataTableHeight()+100).split({
//   $('#widget').css('height', calcDataTableHeight()+70).split({
       orientation: 'vertical',
       limit: 100,
       position: '17%',
       percent: true,
       onDrag: function(event) {
		   popupManager.empListGrid.columns.adjust();
		   popupManager.mainGrid.columns.adjust();
      		
    	}
   });
	popupManager = (function () {
	    function popupManager() {
	    } 	
	    popupManager.mainGrid = null;
	    popupManager.empListGrid = null;
 
		$(".inp-img").on('change', function(){
		    popupManager.readInputFile(this);
		});
		
		$(".btn-delete").click(function(event) {
		    popupManager.resetInputFile();
		});
	    popupManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#empGrid').DataTable();
			var itemList = [];
			
	    	table.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
    			var typeGb = $(node2).find('.comboBoxType').val()
				aData.wiban_gijun = typeGb;
				itemList [idx] = aData;
			});

			return JSON.stringify (itemList);
		}	    
		popupManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText,bValidCheck) {
			var spgb = $('input[name="spGb"]:checked').val();
			console.log(spgb);
			//commonVo.spGb = spgb;
			
			commonVo.fromDate = $('#from').val(); 
			commonVo.toDate = $('#to').val();
			
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = spgb;
			return JSON.stringify (commonVo);
		}		
		popupManager.btnView = function (empNm) {
			popupManager.empListGrid.clear(); 
			popupManager.empListView(popupManager.empListGrid);
		}
		
		
		popupManager.empListView = function (table) {
			var commonVoStr = popupManager.setCommonVo('','getEmployeeList','','N');
			if (commonVoStr == null) return;
			$.ajax({
			       url : "/DynamicSqlFilterNoHeader",
		    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        //async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   //console.log(result);
			    	   table.clear().draw();
					   table.rows.add( result).draw(false);
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
			
		}

		/*
		 * 인사평가 순위 조회
		 */
	    popupManager.btnView_empPointRanking = function () {
			var commonVoRank =  new Object();
			commonVoRank.fromDate = $('#from').val() + '-01';
			commonVoRank.toDate = $('#to').val() + '-31';
			commonVoRank.filterType = 'select_TBM_EMP_POINT_INFO';
			commonVoRank.empNm = commonVo.empNm;
			commonVoRank.dayValue = '0';	//근속년차
			commonVoRank.filterText = 'ALL';	//고정SP구분

			var commonVoString = JSON.stringify (commonVoRank);
			
			if (commonVoString == null) return;
			$.ajax({
			       url : 'DynamicSqlFilterMybatis' ,
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async:false,
			       dataType : 'json',
			       timeout : 30000,
			       success : function(ret) {	
					   	if (ret.data.length ==0 ) {
							$('.empCard0_2_2').html ('해당 기준월(From~To) 인사평가자료가 없습니다. 생성후 조회하세요');   
						   return;
						}
					    var newColumns = [];
						newData = ret;
						
						//console.log(ret);
						var p=0;
						newColumns[p++] = {
		    	            'title': '순위',
		    	            'data': 'SEQ',
		    	            'className': 'dt-center',
		    	            render : render_resultRank
		    	        }
						newColumns[p++] = {
		    	            'title': '기사명',
		    	            'data': 'EMP_NM',
		    	            'className': 'dt-center',
		    	            render : render_resultRank
		    	        }
/*
						newColumns[p++] = {
		    	            'title': 'SP',
		    	            'data': 'SP_GB',
		    	            'className': 'dt-center',
		    	            render : render_resultRank
		    	        }
						newColumns[p++] = {
		    	            'title': '노선',
		    	            'data': 'ROUTE_NM',
		    	            'className': 'dt-center',
		    	            render : render_resultRank
		    	        }*/
						var expHiddenCol = /(기본배점)/;

						var codeArray = ret.data[0].CODELIST.split('/');
						var title;
						for (var j = 0; j < codeArray.length; j++) {
							
							title = codeArray[j];
							
			    	/*        newColumns[p++] = {
			    	            'title': 'cnt',
			    	            'data': 'c' + (j+1),
			    	            'className': 'dt-center',
			    	             render : render_result 
			    	        }*/
							
			    	        newColumns[p++] = {
			    	            'title': title,
			    	            'data': 'd' + (j+1),
			    	            'className': 'dt-center',
			    	            'visible' : expHiddenCol.test(title) ? false : true,
			    	             render : render_resultRank 
			    	        }
						}
						newColumns[p++] = {
		    	            'title': '총점',
		    	            'data': 'TOT_POINT',
		    	            'className': 'dt-center',
		    	            render : render_resultRank
		    	        }

						var expDecimalCol = /(위험운전지수|배차정시성|근무협조도)/;
						var colNm;
						var cntValue;
						var pointValue;
						for (var i = 0; i < ret.data.length; i++) {


							var stepDataArray = ret.data[i].POINTLIST.split('/');
							var cntDataArray = ret.data[i].CNTLIST.split('/');
							
							for (var k = 0; k < stepDataArray.length; k++) {
								
								if (expDecimalCol.test(codeArray[k])) {
									pointValue = stepDataArray[k];
									cntValue = cntDataArray[k];
								} else {
									pointValue = parseInt(stepDataArray[k]);
									cntValue = parseInt(cntDataArray[k]);									
								}
								
								colNm = 'd'+ (k+1);
								if (pointValue == 0)
									 ret.data[i][colNm] = '0';
								else ret.data[i][colNm] = pointValue;

								if (cntValue != 0)
									 ret.data[i][colNm] = ret.data[i][colNm] + '(' + cntValue + ')';
							}
/*
							var cntDataArray = ret.data[i].CNTLIST.split('/');
							
							for (var k = 0; k < cntDataArray.length; k++) {
								
								if (expDecimalCol.test(codeArray[k])) {
									cntValue = cntDataArray[k];
								} else {
									cntValue = parseInt(cntDataArray[k]);									
								}
								
								colNm = 'd'+ (k+1);

								if (cntValue != 0)
									ret.data[i][colNm] = cntValue;
									 //ret.data[i][colNm] = ret.data[i][colNm] + '(' + cntValue + ')';
							}
*/							
						}

			    	    var height= $('.empCard0_2_2').height();
		    	        gfn_setGridData('#empRankGrid',newColumns,ret.data,height,false,null);
		    	        $('#empRankGrid').DataTable().row(0).deselect();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
		/*
		 * 배차정시성 조회
		 */
	    popupManager.btnView_punctuality = function () {
			// 기사명 클릭시 이미 저장됨
			//commonVo.empNm = empNm;
			var commonVoString = popupManager.setCommonVo('','TBL_ARRANGE_PUNCTUALITY_ANALIZE_emp','','');
			//console.log(commonVoString);
			var columns = [];
			var exp1 = /(company_no|last_chg_user|last_chg_date)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_punctuality.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서
			    	            'visible' : exp1.test(colNmEng) ? false : (colNmEng =='col') ? false : true
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
			    	    
		    	        gfn_setGridData('#punctualityGrid',columns,ret.data,height,false);
					
						//popupManager.btnView_danger(empNm);

			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 행정민원 조회
		 */
	    popupManager.btnView_publicComplaint = function () {
			var commonVoString = popupManager.setCommonVo('','TBL_PUBLIC_COMPLAINT_INFO_empNm','','');
			//console.log(commonVoString);
			var columns = [];
			var exp1 = /(company_no|last_chg_user|last_chg_date)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_publicComplaint.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서
			    	            'visible' : exp1.test(colNmEng) ? false : (colNmEng =='col') ? false : true
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
			    	    
		    	        gfn_setGridData('#publicComplaintGrid',columns,ret.data,height,false);
					
						//popupManager.btnView_danger(empNm);

			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}	
		/*
		 * 사고 조회
		 */
		var accident_footer = function (row, data, start, end, display) {
			var api = this.api();
			var table = $('#accidentGrid').DataTable();
			$( api.column( 4 ).footer() ).html(
                ' ( $total)'
            );
            var footer = $(this).find("tfoot");
            			console.log(footer);
			//console.log($(this));
			if (data.length <= 0)
				return;
			
			var api = this.api();
			var footer = $('#accidentFoot tr');
			var exp2 = /(_amt)/;
			var exp1 = /(company_no|base_year|company_nm|last_chg_user|last_chg_date)/;

	        let intVal = function (i) {
	            return typeof i === 'string'
	                ? i.replace(/[\$,]/g, '') * 1
	                : typeof i === 'number'
	                ? i
	                : 0;
	        };

			var i=0;
			var numFormat = $.fn.dataTable.render.number(',').display;
			 
			// $(footer).append('<tfoot><tr></tr></tfoot>');
			 
			for (const [key, value] of Object.entries(data[0])) {
				//console.log(api.column(i).header().textContent);
				if (exp1.test(key)) {
					i++;
					continue;
				}
	        
				if (exp2.test(key)) {
			        total = api.column(i).data().reduce((a, b) => intVal(a) + intVal(b), 0);
			        
					  console.log(key + ' = ' + value);
			        console.log(total);
					$(footer).append('<th style="background:lavender; text-align: right">' + numFormat(total) + '</th>');
				} else {
					$(footer).append('<th>-</th>');
				}
				i++;
			}
			//$(api.table().footer()).find('td').addClass("text-right");*/
	 
		}

	    popupManager.btnView_accident = function () {
			//commonVo.empNm = empNm;
			var commonVoString = popupManager.setCommonVo('','TBM_ACCIDENT_INFO_empNm','','');
			console.log(commonVoString);
			var columns = [];
			var exp1 = /(company_no|base_year|company_nm|last_chg_user|last_chg_date)/;
			var exp2 = /(_amt|_rate)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			       // async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  //console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_accident.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp2.test(colNmEng) ? "dt-right" : "dt-center",
			    	            'visible' : exp1.test(colNmEng) ? false : true,
			    	            'render' : exp2.test(colNmEng) ? render_amt : null
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
			    	    console.log(height);
		    	        gfn_setGridData('#accidentGrid',columns,ret.data,height,true);
					
						//popupManager.btnView_danger(empNm);

			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 휴가 조회
		 */
	    popupManager.btnView_empVacation = function () {
			// 기사명 클릭시 이미 저장됨
			//	commonVo.empNm = empNm;
			var commonVoString = popupManager.setCommonVo('','TBM_EMPLOYEE_VACATION_INFO_emp','','');
			//console.log(commonVoString);
			var columns = [];
			var exp1 = /(company_no|emp_nm|delete_yn|company_nm|last_chg_user|last_chg_date)/;
			var exp2 = /(_amt|_rate)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			       // async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_empVacation.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp2.test(colNmEng) ? "dt-right" : "dt-center",
			    	            'visible' : exp1.test(colNmEng) ? false : true
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
			    	    console.log(height);
		    	        gfn_setGridData('#empVacationGrid',columns,ret.data,height,true);
					
						//popupManager.btnView_danger(empNm);

			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}		
		/*
		 * 근태 조회
		 */
	    popupManager.btnView_empWorkingLog = function () {
			//commonVo.empNm = empNm;
			var commonVoString = popupManager.setCommonVo('','TBM_EMP_WORKING_LOG_empNm','','');
			//console.log(commonVoString);
			var columns = [];
			var exp1 = /(company_no|work_time|emp_nm|company_nm|last_chg_user|last_chg_date)/;
			var exp2 = /(_amt|_rate)/;
			var exp3 = /(route_nm|car_no|codeType|date)|^no/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			      //  async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_empWorkingLog.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp2.test(colNmEng) ? "dt-right" : exp3.test(colNmEng) ? "dt-center": "dt-left",
			    	            'visible' : exp1.test(colNmEng) ? false : true,
			    	            'render' : exp2.test(colNmEng) ? render_amt : null
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
			    	    console.log(height);
		    	        gfn_setGridData('#empWorkingLogGrid',columns,ret.data,height,true);
					
						//popupManager.btnView_danger(empNm);

			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}		
		/*
		 * 위험운전행동 분석(3년치)
		 */
	    popupManager.btnView_danger = function () {
			//commonVo.empNm = empNm;
			var commonVoString = popupManager.setCommonVo('','danagerAnal_Employee2','','');
			console.log(commonVoString);
			var columns = [];
			var exp1 = /(company_no|last_chg_user|last_chg_date)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  // //console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_danger.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서
			    	            'visible' : exp1.test(colNmEng) ? false : true
			    	        }
			    	    };
   			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
		    	        gfn_setGridData('#dangerGrid',columns,ret.data,height,false);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}	
		/*
		 * 운행기록(년도)
		 */
	    popupManager.btnView_iscDrivingRecord_year = function () {
			
			$('#yearDrivingRecordGrid').DataTable().clear().draw();
			$('#monthDrivingRecordGrid').DataTable().clear().draw();
			$('#dayDrivingRecordGrid').DataTable().clear().draw();
			//commonVo.empNm = empNm;
			//commonVo.baseYear = $('#baseYear').val();;
			
			var commonVoString = popupManager.setCommonVo('','getDrivingRecord_year','','');
			console.log(commonVoString);
			var columns = [];
			var exp1 = /(bms_km|tot_min|tot_cnt)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			       // async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_drivingRecord.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp1.test(colNmEng) ? "dt-right" : "dt-center",
			    	            'render' : render_year
			    	            //'visible' : exp1.test(colNmEng) ? false : true
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
		    	        gfn_setGridData('#yearDrivingRecordGrid',columns,ret.data,height,false);
		    	        if (ret.data.length > 0) {
							popupManager.btnView_iscDrivingRecord_month($('#yearDrivingRecordGrid').DataTable().cell(0,0).data());
						}
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 운행기록(월)
		 */
	    popupManager.btnView_iscDrivingRecord_month = function (baseYm) {
			//commonVo.empNm = empNm;
			commonVo.baseYm = baseYm;
			
			var commonVoString = popupManager.setCommonVo('','getDrivingRecord_month','','');
			console.log(commonVoString);
			var columns = [];
			var exp1 = /(bms_km|tot_min|tot_cnt)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			       // async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  // //console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_drivingRecord.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp1.test(colNmEng) ? "dt-right" : "dt-center",
			    	            'render' : render_month
			    	            //'visible' : exp1.test(colNmEng) ? false : true
			    	        }
			    	    };
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;

		    	        gfn_setGridData('#monthDrivingRecordGrid',columns,ret.data,(height /2)-40,false);
		    	        if (ret.data.length > 0) {
							popupManager.btnView_iscDrivingRecord_day($('#monthDrivingRecordGrid').DataTable().cell(0,0).data());
						}
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}		
		/*
		 * 운행기록(월)
		 */
	    popupManager.btnView_iscDrivingRecord_day = function (baseYmd) {
			//commonVo.empNm = empNm;
			commonVo.baseYmd = baseYmd;
			
			var commonVoString = popupManager.setCommonVo('','getDrivingRecord_day','','');
			console.log(commonVoString);
			var columns = [];
			var exp1 = /(bms_km|tot_min|tot_cnt)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			       // async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  console.log(ret);
					  var colNmEng ;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap_drivingRecord.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp1.test(colNmEng) ? "dt-right" : "dt-center",
			    	            'render' : render_day
			    	            //'visible' : exp1.test(colNmEng) ? false : true
			    	        }
			    	    };
			    	    
			    	    var height= $('.empCard0_3_0').height() - TAB_DIV_HEIGHT;
		    	        gfn_setGridData('#dayDrivingRecordGrid',columns,ret.data,(height /2)-40,false);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}				
		/*
		 * 인사평가자료 구축
		 */
	    popupManager.btnMake = function () {
			var commonVoString = popupManager.setCommonVo(false,'','','');
			$.ajax({
			       url : "/BUS_create_EMP_POINT_INFO",
			      "data" : {commonVoStr : commonVoString},
			       "dataSrc" : "",
			        global: true,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   swal(ret);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
		
		popupManager.uploadImage = function() {
			var input = $('.inp-img');
			
			commonVo.fileGb = 'empImage';
			commonVo.fileId = commonVo.empNm;	//file_id		
			//commonVo.empNm = commonVo.empNm;	//file_id		
			var commonVoString = popupManager.setCommonVo('','danagerAnal_Employee2','','');
			console.log(commonVoString);
			//console.log(input);
			let formData = new FormData($('#uploadForm')[0]);
			formData.append('images',input[0]);
			formData.append('commonVoStr',commonVoString);
		
			$.ajax({
				type:'post'
				,enctype:'multipart/form-data'
				,url :'/upload_file'
				,data:formData
				,processData:false
				,contentType : false
				,success: function(data) {
					alert(
				        '등록완료'
				      )
					popupManager.mainGrid.cell(0,0).invalidate().draw();
				}
				, error : function(e) {
					alert('error');
				}
			});
		    popupManager.resetInputFile();
		}

		popupManager.empListGrid  = $("#empListGrid").DataTable({
			    "scrollY": calcDataTableHeight(),
		        scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data",
    	    		searchPlaceholder: "search",
        			search: "검색:"	    	        
	    	    },    		
	    	    //fixedHeader: true,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	        	ordering: true,
		        "searching": true,
				//dom: '<"top"i>rt<"top"flp><"clear">',
		        scrollX: true,
		        //"autoWidth":true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
	    		],
		        columns : [
	    	        {data: "emp_no"				,width:'10%'	}
	    	        ,{data: "emp_nm"			,width:'10%'	}
	    	        ,{data: "route_nm"			,width:'10%'	}
	    	        ,{data: "work_group"		,width:'10%'	}
			    ]
		});  
		var height = $('.empCard0_1').height();
		popupManager.mainGrid = $("#empGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": height,
	        //scrollCollapse: true,
	        scrollX: true,

/*		    select: {
	            style: 'single'
		    },
*/	//	    order : [[3,'asc']],
		//    ordering: true,
		    //autoWidth: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": [0,2,4,6,8,10]}	        
		        ,{"className": "dt-right", "targets": [1,3,5,7,9],render : render_check}	        
	    	],
      		 columns : [
		    	{data: "A0" 			,width:"10%", 
		    		render: function (data, type, row, meta) {
						if (meta.row == 0)
							return '<img src="/images/' + data + '" height="100" width="100">';
						else return data;
//                		return '<img src="/resources/static/images/Screenshot.png" height="50" width="50"/>';
              		}
                },
		    	{data: "A1" 			,width:"5%" },
		    	{data: "A1_VALUE"		,width:"13%"},
		    	{data: "A2" 			,width:"8%" },
		    	{data: "A2_VALUE"		,width:"10%"},
		    	{data: "A3" 			,width:"8%" },
		    	{data: "A3_VALUE"		,width:"10%"},
		    	{data: "A4" 			,width:"8%" },
		    	{data: "A4_VALUE"		,width:"10%"},
		    	{data: "A5" 			,width:"8%" },
		    	{data: "A5_VALUE"		,width:"10%"},
		     ]
		});		
/*		
		datatableEdit({
			dataTable : popupManager.mainGrid,
			//eventTarget : 'tbody td',
			columnDefs : [
				 	{targets : 3	,maxlength:10}
				, 	{targets : 4	,maxlength:10}
				//,	{targets : 5	,maxlength:10}
				,	{targets : 6	,maxlength:10}
				,	{targets : 7	,maxlength:10}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					$(popupManager.mainGrid.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					popupManager.mainGrid.cell(index.row, 0).data('Y');
				}
			}
		});		*/

		// 등록 이미지 등록 미리보기
		popupManager.readInputFile = function (input) {
		    if(input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function (e) {
		            //$('#preview').html("<img src="+ e.target.result +">");
		            
					Swal.fire({
					  title: '사진등록',
					  text: '위 사진을 등록하시겠습니까?',
					  imageUrl: e.target.result,
					  imageWidth: 100,
					  imageHeight: 100,
					  imageAlt: 'Custom image',
						showCancelButton: true,
		  				confirmButtonText: '등록',		
		  					  showLoaderOnConfirm: true, // 데이터 결과를 받을때까지, 버튼에다가 로딩바를 표현
						  preConfirm: (login) => { // 확인 버튼 누르면 실행되는 콜백함수
								popupManager.uploadImage();
						  },
						  
						  // 실행되는 동안 배경 누를때 모달창 안닫히도록 설정
						  // isLoading() 즉, 로딩이 진행되는 동안 false를 리턴하게 해서 ousideClick을 안되게 하고, 로딩 상태가 아니면 ousideClick을 허용한다.
						  allowOutsideClick: () => !Swal.isLoading() 
					})
           		    //popupManager.resetInputFile();
		        }
		        reader.readAsDataURL(input.files[0]);
		    }
		}
		
		// 등록 이미지 삭제 ( input file reset )
		popupManager.resetInputFile =  function () {
			var $input = $(".inp-img");
		    var agent = navigator.userAgent.toLowerCase();
		    if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
		        // ie 일때
		        $input.replaceWith($input.clone(true));
		        //$preview.empty();
		    } else {
		        //other
		        $input.val("");
		        //$preview.empty();
		    }       
		}

	    return popupManager;
	}());

	$(document).on('click', '#btnView', function () {
		popupManager.btnView();
	});
	// Handle change event for status selection control
	//$('#empGrid').on('change', '.comboBoxType', function(){
	    
	 //   var row = $('#empGrid').DataTable().row($(this).closest('tr')).index();
	 //   console.log(row);
	    
	    //$(rownode).find('.comboBoxType').val(item.wiban_gijun)
	 //   popupManager.mainGrid.cell(row, 5).data($(this).val()).draw(false);	
	//});

	$(document).on('click', '#btnMake', function () {
		popupManager.btnMake();
   	});
	
	// 월에서 특정일  click시
	$('#monthDrivingRecordGrid').on('click','td', function() {
		var table = $('#monthDrivingRecordGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var baseYmd = table.cell( row,0 ).data();
		
		popupManager.btnView_iscDrivingRecord_day(baseYmd);
	});	
	// 년간운행기록 click시
	$('#yearDrivingRecordGrid').on('click','td', function() {
		var table = $('#yearDrivingRecordGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var baseYm = table.cell( row,0 ).data();
		
		popupManager.btnView_iscDrivingRecord_month(baseYm);
	});	
	// 기사 클릭시
	$('#empListGrid').on('click','td', function() {
		var table = $('#empListGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var empNm = table.cell( row,1 ).data();
		$( "#tabs" ).tabs( "option", "active", 0 );
	
			$('#monthDrivingRecordGrid').DataTable({
				destroy : true,
			    "language": {
			      "emptyTable": "-"
			    }
			}).clear().draw();
			$('#dayDrivingRecordGrid').DataTable({
				destroy : true,
			    "language": {
			      "emptyTable": "-"
			    }
			}).clear().draw();
		
		dynamicAjaxCall(empNm,'select_getEmployeeCard');
	});	
	// 평가 그리드 클릭시
	$('#empRankGrid').on('dblclick','td', function() {
		var table = $('#empRankGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		//var empNm = table.cell( row,1 ).data();
		fnMdiOpen2('인사평가 항목별 분포','commonCode_','/monitor/popupChart1.html?row='+row, 700, 500); // 이게 더 크게	

	});	
	// delete 수행
    $('#deleteImageBtn').on('click', function() {

		commonVo.fileGb = 'empImage';
		commonVo.fileId = commonVo.empNm;	//file_id		
		//commonVo.empNm = commonVo.empNm;	//file_id		
		var commonVoString = popupManager.setCommonVo('','','','');
		console.log(commonVoString);
		//console.log(input);
		let formData = new FormData($('#uploadForm')[0]);
		formData.append('commonVoStr',commonVoString);

		$.ajax({
			type:'post'
			,url :'/delete_file'
			,enctype:'multipart/form-data'
			,processData:false
			,contentType : false
			,data:formData
			,success: function(data) {
				alert('ok');
				popupManager.mainGrid.cell(0,0).invalidate().draw();

			}
			, error : function(e) {
				alert('error');
			}
		});
	});		
	popupManager.empListView(popupManager.empListGrid);
});




/*
 * dynamic 공통 호출
 */
function dynamicAjaxCall(empNm,filterType) {

	commonVo.filterType = filterType;
	//console.log(param.route_nm);
	//commonVo.routeNm = '';
	commonVo.empNm = empNm;
	commonVo.filterText = '';
	var commonVoStr = JSON.stringify (commonVo);
	
	console.log(commonVoStr);
	popupManager.mainGrid.clear();
	
	$.ajax({
	       url : "/DynamicSqlFilterMybatis",
    	   "data" :   {commonVoStr : commonVoStr},
	       "dataSrc" : "",
	        global: true, // 추가
	       dataType : 'json',
	       async : false,
	       timeout : 10000,
	       success : function(ret) {	
/*                $.each(ret.data, function (i, item) {
                	var rownode = popupManager.mainGrid.row.add( item ).draw(false).node();
                	// use_yn을 combobox로 변환	
                	$(rownode).find('.comboBoxType').val(item.wiban_gijun)
                })			   
*/
    	        popupManager.mainGrid.rows.add( ret.data ).draw();
	    	    //popupManager.mainGrid.columns.adjust().draw(false);

				$(popupManager.mainGrid.cell(5,2).node()).attr('colspan', 7);
				for (var i=3; i<=8;i++) {
					$(popupManager.mainGrid.cell(5,i).node()).css('display', 'none');
				}
				
				$(popupManager.mainGrid.cell(0,0).node()).attr('rowspan', 6);
				for (var j=1; j<=5;j++) {
					$(popupManager.mainGrid.cell(j,0).node()).css('display', 'none');
				}

	
				var day = popupManager.mainGrid.cell(2,4).data();
				
				popupManager.mainGrid.cell(2,4).data(cal_year(day)).draw();
				
				popupManager.btnView_empWorkingLog();
			    popupManager.btnView_empPointRanking();


	       },
	       error : function(request, status, error) {
	        alert(request.responseText);
	       }
	});	
}

function cal_year(day)
{
    var cYear = parseInt(day / 365);
    var cMonth = parseInt((day % 365)/30);

	return  cYear + '년 ' + cMonth + '개월' ;
}

function calcDataTableHeight () {
	  return ($(window).height() -200) ;
	  //return ($(window).height() * 55 / 100) ;
};

//분류코드
function fnMdiOpen2 (title,uniqueKey,url, w_width,w_height) {
	var iframName = "iframe_commonCode";  //uniqueKey;

	var child = document.getElementById(iframName);
	if (child != null) return;
	
	
	var text = '<iframe class="resized" id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';
	//var text = '<iframe id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';

	//var $objWindow = $('<div class="window">'+text+'</div>');
	var $objWindow2 = $('<div class="window resizer ugly">'+text+'</div>');
    var intRandom = Math.floor((Math.random() * 12) + 1);
    
    $($objWindow2).appendTo('body');
    //var height = $(iframName).contents().height();
    //var width = $(iframName).contents().width();
    //$objWindow.itemCd=uniqueKey;
    $objWindow2.window({
    	embeddedContent: true, 
        title: title,
        width: w_width +5,
        height: w_height + 27,
        position: {
            my: 'left+'+700+', top+'+200,
            at: 'left top',
            of: window
        },
        modal:true,
        maximizable: true,
       // minimizable: true,
        disablescroll : {
            handleScrollbar: false
        },
        close: function(event, ui) {
        	$(this).remove();
        },
        open: function (event, ui) {
            $(this).css('overflow', 'hidden'); //this line does the actual hiding
          },          
        //icon: '../src/jquery-lwd/themes/windows2000/images/default.png'
        icon: '/resources/static/js/jquery-lwd/themes/material/images/icons/'+intRandom+'.png'
    });
}