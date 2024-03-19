/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '버스ID';
 var endString = '요약';
 var startRow = 6;

 let columnMap = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['emp_no'          ,'사번'          ] 
	,['emp_nm'          ,'사원명'        ] 
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

function render_check(data,type,row,meta){
		return '<input type="checkbox"' + (data == "true" ? ' checked="checked"' : '') + '>';
}

function render_analCheck(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col > 9 && meta.col < 11)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	if (meta.col > 11 && meta.col < 19)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
			
	return data;
}

function render_analResultCheck(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col > 8 && meta.col < 10)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	if (meta.col > 11 && meta.col < 19)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
			
	return data;
}
  
function render_viewAll(data,type,row,meta){
	//var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col > 0) {
		if (data == '◆')
			$(api.cell(meta.row, meta.col).node()).css('color', 'blue');
		else $(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}
	return data;
}
function render_QueryResult(data,type,row,meta){
	//var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.row == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	return data;
} 
 
function render_AnalView(data,type,row,meta){
	
	return data;
}  
$( function() {
	var tabs = $( "#tabs" ).tabs(
/*		{
		  activate: function(e, ui) {
		    var id = $(ui.newPanel).prop('id');
		    if (id == 'tabs-1')
				ChatManager.btnViewDetail();
		    else if (id == 'tabs-2')
				ChatManager.btnAnalView();
		    else if (id == 'tabs-3')
		    	ChatManager.btnAnalResultView()();
		  }
		}*/		
	);    
  
/*    var baseYm = $('#baseYm');
		baseYm.inputmask(
		    "9999-99"
		);
	$( "#baseYm" ).val(comm_getToday2());*/
	
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#baseYm',
            format: 'yyyy-MM'
        }
    });
    
  	var fileTarget = $('.filebox .upload-hidden');

  	fileTarget.on('change', function(){  // 값이 변경되면
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();    
  	
	    if(window.FileReader){  // modern browser
	      var filename = $(this)[0].files[0].name;
	    } 
	    else {  // old IE
	      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	    }
	    
	    // 추출한 파일명 삽입
	    $(this).siblings('.upload-name').val(filename);
	    
	    g_blockStart();
	    
	    fn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString,startRow);
	    $.unblockUI(); 
	});
  	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	

	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList  = table.rows().data().toArray();
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function setCommonVo(bYmd,targetTable,filterType,filterText,bValidCheck) {
			if (bYmd) {
				var baseYmd = $('#baseYmd').val();
				//console.log(baseYmd);
				if (bValidCheck) {
				    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
						swal('기준일을 선택하세요');
						return null;
					}
				}	
				commonVo.baseYmd = baseYmd;
				var checkDay = 'd' + parseInt(baseYmd.substring(8,10));
				//console.log(checkDay);
				
				commonVo.checkDay = checkDay;
			} else {
				var baseYm = $('#baseYm').val();
				if (bValidCheck) {
				    if (baseYm == null || baseYm == undefined || baseYm == '') {
						swal('기준월을 입력하세요');
						return null;
					}
				}			
				commonVo.baseYm = baseYm;
			}
			
			var routeNm = $('#routeNm').val();
			commonVo.routeNm = routeNm;
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 *  저장
		 */
	    ChatManager.btnSave = function () {
			commonVo.baseYm = '';
			var commonVoString = ChatManager.setCommonVo(true,'TBL_ARRANGE_PUNCTUALITY_INFO','TBL_ARRANGE_PUNCTUALITY_INFO','',true);
			if (commonVoString == null)
				return;
			var jsonString = ChatManager.setSaveParamVo();
			//console.log(commonVoString);
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        //async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.btnViewAll();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 *  월전체 등록현황 조회
		 */
	    ChatManager.btnViewAll = function () {
			var commonVoString = ChatManager.setCommonVo(false,'','selectMonthlyPunctuality','',true);
			//console.log(commonVoString);
			var columns = [];
			var newData = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        async: false,
			       	dataType : 'json',
			       	timeout : 10000,
			       	success : function(ret) {	
						console.log(ret);
						columns[0] = {
			    	            'title': '노선',
			    	            'data': 'routeNm',
			    	            'className': 'dt-body-center'
			    	    }
						var monthArray = ret.data[0].column_a.split(',');
						for (var j = 0; j < monthArray.length; j++) {
			    	        columns[j+1] = {
			    	            'title': monthArray[j],
			    	            'data': 'd' + (j+1),
			    	            'className': 'dt-body-center'
			    	        }
						}
						var row=0;
						for (var k = 1; k < ret.data.length; k++) {
							var initData = {};
							initData['routeNm'] = ret.data[k].column_a;
							//전체 일자 초기화
							for (var j = 0; j < monthArray.length; j++) {
								initData['d' + (j+1)] = ' ';
							}
							// 집계된 일자만 y 처리
							var ddArray = ret.data[k].column_b.split(',');
							var aArray = ret.data[k].column_c.split(',');
							var bArray = ret.data[k].column_d.split(',');
							
							for (var m = 0; m < ddArray.length; m++) {
								if (bArray[m] > 0)
									initData['d' + ddArray[m]] = '◆';
								else initData['d' + ddArray[m]] = '◑';
				    	    };
				    	    newData.push(initData);
			    	    };						
			    	    //console.log(columns);
			    	    //console.log(newData);
		    	        fn_setGridDataAll('#viewTable',columns,newData,0);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 *  자료등록 조회
		 */
	    ChatManager.btnViewDetail = function () {
			var commonVoString = ChatManager.setCommonVo(true,'', 'TBL_ARRANGE_PUNCTUALITY_INFO','',true);
			//console.log(commonVoString);
			if (commonVoString == null)
				return;
			var columns = [];
			var initData = [];
		    	        var aaa;
		    	        var colNm ;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async: false,
			       	dataType : 'json',
			       	timeout : 10000,
			       	success : function(ret) {	
						console.log(ret);
						if (ret.data.length == 0)	{
							swal('해당 자료가 없습니다.');
						   return;
						}
						for (var i = 0; i < ret.header.length; i++) {
							//var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
							colNm = ret.header[i].COLUMN_NAME.toLowerCase();
							//eval("aaa = ret.data[0]." + colNm);
							aaa = ret.data[0][colNm]; 
							//console.log(aaa);
			    	        if (aaa == ' ') {
								break;
							} else {
				    	        columns[i] = {
				    	            'title': i < 5 ? colNm : ret.data[0][colNm],
				    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
				    	           // 'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
				    	            'render' : colNm == 'col' ? render_check : render_QueryResult,
				    	            'visible' : i < 4 ? false : true
				    	        }
								commonVo.lastColumnNm = colNm;
				    	    }
			    	    };
			    	    
						for (var j = 0; j < ret.data.length; j++) {
							for (var key in ret.data[j]){
								if (ret.data[j][key] == ' ') {
									delete ret.data[j][key];
								} 
				    	    };
			    	    };
			    	    //var height = calcDataTableHeight_analResult();
			    	    var height= $('.empCard1').height() -120;
			    	    console.log(height);
		    	        fn_setGridData('#exceltable',columns,ret.data,6,height);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}

	    ChatManager.setSaveAnalVo = function setSaveAnalVo() {
			var table = $('#newanaltable').DataTable();
			var itemList = [];
			
			var cnt = table.rows().count();
			console.log(cnt);
			if (cnt == 0) {
				swal('대상자료가 없습니다. [setSaveAnalVo]');
				return null;
			}
	    	table.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
				 var vo =  new Object();
				 vo = Object.assign({}, aData);
				 
				itemList [idx] = vo;
			});

			return JSON.stringify (itemList);
			
		}

		/*
		 *  분석결과저장
		 */
	    ChatManager.btnAnalSave = function () {
			commonVo.baseYm = null;
			var commonVoString = ChatManager.setCommonVo(true,'TBL_ARRANGE_PUNCTUALITY_ANALIZE','TBL_ARRANGE_PUNCTUALITY_ANALIZE','',true);
			if (commonVoString == null)
				return;
				
			var jsonString = ChatManager.setSaveAnalVo();
			if (jsonString == null)
				return;
			
			//console.log(commonVoString);
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.btnViewAll();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}

		/*
		 *  분석결과에 기사명 재 맵핑
		 */
	    ChatManager.btnEmpMapping = function () {
			commonVo.baseYm = null;
			var commonVoString = ChatManager.setCommonVo(true,'','','',true);
			if (commonVoString == null)
				return;
				
			$.ajax({
			       url : "/BUS_batchUpdateArrangePunctualityAnalEmpNm",
			       "data" :  {commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		
		/*
		 *  분석/검토
		 */
	    ChatManager.btnAnalProc = function () {
			
			var table = $('#analtable').DataTable();
			var table2 = $('#newanaltable').DataTable();
			
			table2.clear().draw();
			
			var arr = table.rows().data().toArray();
			var arr2 = table.rows().data().toArray();
			
			var wiban_gijun = $('#wiban_gijun').val();
			var wiban_min_value = parseInt($('#wiban_min_value').val());
			var wiban_max_value = parseInt($('#wiban_max_value').val());
			//console.log(wiban_gijun);
			//console.log(wiban_min_value);
			//console.log(wiban_max_value);
			var prevValue,value,start,end,diffTime,stanDate;
			$.each(arr, function ( idx, item ) {
					var newItem = [];
					// 첫차는 산출할수 없으므로 제외
					if (idx > 0){
						for (var key in item) {
							value = item[key];
							prevValue = arr2[idx-1][key];
							
							if (key.startsWith('col') && (key != 'col' && value.includes(':'))) {
								if (prevValue.includes(':')) {
									if (prevValue.startsWith('00:'))
										start = new Date('2023-01-02 ' + prevValue );
									else start = new Date('2023-01-01 ' + prevValue );
									
									if (value.startsWith('00:'))
										end = new Date('2023-01-02 ' + value );
									else end = new Date('2023-01-01 ' + value );
	
									
									diffTime = (end.getTime() - start.getTime()) / (1000);
									newItem[key] = diffTime;
								} else { 
									newItem[key] = '-';
								}
							} else {
								newItem[key] = value;
							}
						}
						newItem['term'] = newItem['col003'];
						// 위반기준이 퍼센트인경우
						if (wiban_gijun == 'P') {
							newItem['term_85'] = parseInt(newItem['col003'] * wiban_min_value / 100);
							newItem['term_125'] = parseInt(newItem['col003'] * wiban_max_value / 100);
						} else {
							// 위반기준이 분단위인경우 초로 환산
							newItem['term_85'] = parseInt(newItem['col003'] - (wiban_min_value * 60));
							newItem['term_125'] = parseInt(newItem['col003'] + (wiban_max_value * 60));
						}
						newItem['term_past_cnt'] = '*';
						newItem['term_late_cnt'] = '*';
						newItem['term_wiban_cnt'] = '*';
						newItem['total_station_cnt'] = '*';
						
						newItem['col003'] = arr2[idx]['col003'];
						newItem['col004'] = arr2[idx]['col004'];
						//console.log(newItem);
						table2.row.add(newItem);
					}			
				});
				

				table2.rows( function ( idx, aData, node2 ) {
					var value;
					var cnt85=0,cnt125=0,cntTotal=0 ;
					for (var key in aData){
						value = aData[key];
						if (key > 'col004' && key.startsWith('col')) {
							++cntTotal;
							if (value == '-')	continue;
							if (value < aData['term_85']) {
								$(table2.cell(idx,key+':name').node()).css('color', 'red');
								++cnt85;
							}
							if (value > aData['term_125']) {
								$(table2.cell(idx,key+':name').node()).css('color', 'blue');
								++cnt125;
							}
							aData[key] = secToMin(value);	
						}
		    	    };
		    	    aData['term'] = secToMin(aData['term']);
		    	    aData['term_85'] = secToMin(aData['term_85']);
		    	    aData['term_125'] = secToMin(aData['term_125']);
		    	    aData['term_past_cnt'] = cnt85;
		    	    aData['term_late_cnt'] = cnt125;
		    	    aData['term_wiban_cnt'] = cnt85 + cnt125;
		    	    aData['total_station_cnt'] = cntTotal;
		    	    table2.row(idx).data(aData);
				});					
				table2.draw(false);				
		}
		ChatManager.btnAnalInit = function () {
			
			if ($('#analtable').DataTable().row().count() > 0) {
		   		$('#analtable').DataTable().clear().destroy();
		   		$('#analtable').empty();    
			}
			if ($('#newanaltable').DataTable().row().count() > 0) {
		   		$('#newanaltable').DataTable().clear().destroy();
		   		$('#newanaltable').empty();    
			}

	   		$('#code_am').val('');    
	   		$('#code_pm').val(''); 			
		}
		ChatManager.btnInit = function () {
			$('.filebox .upload-hidden').val('');
			$(this).siblings('.upload-name').val('');
			
	   		$('#viewtable').DataTable().clear();
	   		$('#viewtable').empty();
	   		$('#exceltable').DataTable().clear();
	   		$('#exceltable').empty();
	   		$('#analtable').DataTable().clear();
	   		$('#analtable').empty();
	   		$('#newanaltable').DataTable().clear();
	   		$('#newanaltable').empty();
	   		$('#analresulttable').DataTable().clear();
	   		$('#analresulttable').empty();
	   		
		}		
		/*
		 *  분석 대상 조회
		 */
	    ChatManager.btnAnalView = function () {
			ChatManager.btnAnalInit();

			if (!ChatManager.btnAMPMSeq())
				return;
			var wiban_gijun = $('#wiban_gijun').val();
			var wiban_min_value = parseInt($('#wiban_min_value').val());
			var wiban_max_value = parseInt($('#wiban_max_value').val());

			var title_85,title_125;
			if (wiban_gijun == 'P') {
				title_85 = '몰림기준(' + wiban_min_value + '%)';
				title_125 = '지연기준(' + wiban_max_value + '%)';
			} else {
				title_85 = '몰림기준(' + wiban_min_value + '분)';
				title_125 = '지연기준(' + wiban_max_value + '분)';				
			}
			var baseYmd = $('#baseYmd').val();
			commonVo.baseYm  = baseYmd.substring(0,7);
			var commonVoString = ChatManager.setCommonVo(true,'TBL_ARRANGE_PUNCTUALITY_INFO','TBL_ARRANGE_PUNCTUALITY_INFO_BEFORE','',true);
			//console.log(commonVoString);
			if (commonVoString == null )
				return;
				
			var columns = [];
			var newColumns = [];
			var initData = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        async: false,
			       	dataType : 'json',
			       	timeout : 10000,
			       	success : function(ret) {	
						//console.log(ret);
						if (ret.data.length == 0)	{
							swal('해당 자료가 없습니다.');
						   return;
						}
		    	        var aaa;
		    	        var colNm ;
						var newNo=0;
						for (var i = 0; i < ret.header.length; i++) {
							//var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
							colNm = ret.header[i].COLUMN_NAME.toLowerCase();
							//eval("aaa = ret.data[0]." + colNm);
							//console.log(aaa);
							aaa = ret.data[0][colNm]; 
							//console.log(aaa);
			    	        if (aaa == ' ') {
								break;
							} else {
				    	        columns[i] = {
									'name' : colNm,
				    	            'title': i < 7 ? colNm : ret.data[0][colNm],
				    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
				    	            'render' : render_AnalView,
				    	            'visible' : (i != 1 && i < 7) ? false : true,
				    	            'width' : (i < 7) ? '100px' : '300px'
				    	            
				    	        }
				    	        newColumns[newNo++] = columns[i];
				    	        if (i == 11) {
					    	        newColumns[newNo++] = {render:render_analCheck,title:'배차간격',data:'term'};
					    	        newColumns[newNo++] = {render:render_analCheck,title:title_85,data:'term_85'};
					    	        newColumns[newNo++] = {render:render_analCheck,title:title_125,data:'term_125'};
					    	        newColumns[newNo++] = {render:render_analCheck,title:'몰림',data:'term_past_cnt'};
					    	        newColumns[newNo++] = {render:render_analCheck,title:'지연',data:'term_late_cnt'};
					    	        newColumns[newNo++] = {render:render_analCheck,title:'위반건수',data:'term_wiban_cnt'};
					    	        newColumns[newNo++] = {render:render_analCheck,title:'정류장수',data:'total_station_cnt'};
								}				    	        
								commonVo.lastColumnNm = colNm;
				    	    }
			    	    };
			    	    
						for (var j = 0; j < ret.data.length; j++) {
							for (var key in ret.data[j]){
								if (ret.data[j][key] == ' ') {
									delete ret.data[j][key];
								} 
				    	    };
			    	    };
			    	    
			    	    var height= ($('.empCard1').height()-140) / 2;
			    	    
		    	        fn_setGridDataAnal('#analtable',columns,ret.data,height,5);
		    	        fn_setGridDataAnal('#newanaltable',newColumns,initData,height, 6);
		    	        
		    	        //console.log(ret.data);
		    	        //console.log(initData);
						//ChatManager.btnProc();
						
						//$('.pjy_button_unfixed').show();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}		
	    ChatManager.btnAMPMSeq = function () {
			var routeNm = $('#routeNm').val();
			//console.log(routeNm);
			if (routeNm == null || routeNm == '' ) {
				//console.log('선택하세요');
				swal('노선을 선택하세요');
				return false;
			}
			var commonVoString = ChatManager.setCommonVo(false,'','getRouteCommonInfo','',true);
			if (commonVoString == null)
				return false;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        async: false,
			       	dataType : 'json',
			       	timeout : 10000,
			       	success : function(ret) {	
						   console.log(ret);
						$('#code_am').val(ret.data[0].am_seq_array);
						$('#code_pm').val(ret.data[0].pm_seq_array);
						$('#wiban_gijun').val(ret.data[0].wiban_gijun);
						$('#wiban_min_value').val(ret.data[0].wiban_min_value);
						$('#wiban_max_value').val(ret.data[0].wiban_max_value);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			    	   return false;
			       }
				});	
			return true;				
		}   
		
	    ChatManager.btnAnalResultView = function () {
			if (!ChatManager.btnAMPMSeq())
				return;

			var commonVoString = ChatManager.setCommonVo(true,'','TBL_ARRANGE_PUNCTUALITY_ANALIZE','',true);
			if (commonVoString == null)
				return false;

			var wiban_gijun = $('#wiban_gijun').val();
			var wiban_min_value = parseInt($('#wiban_min_value').val());
			var wiban_max_value = parseInt($('#wiban_max_value').val());

			var title_85,title_125;
			if (wiban_gijun == 'P') {
				title_85 = '몰림기준(' + wiban_min_value + '%)';
				title_125 = '지연기준(' + wiban_max_value + '%)';
			} else {
				title_85 = '몰림기준(' + wiban_min_value + '분)';
				title_125 = '지연기준(' + wiban_max_value + '분)';				
			}

			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, 
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  // console.log(ret);
						for (var i = 0; i < ret.header.length; i++) {
							var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
							if (colNm == '몰림기준')
								colNm = title_85;
							else if (colNm == '지연기준')
								colNm = title_125;
							
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
			    	            'render' : render_analResultCheck,
			    	            'visible' : (i < 6) ? false : true
			    	        }
			    	    };
			    	    //var height = calcDataTableHeight_analResult();
			    	    var height= ($('.empCard1').height()-120) ;
		    	        fn_setGridData('#analresulttable',columns,ret.data,0,height);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		$.contextMenu({
			selector : "#analresulttable td",
			//autoHide: true,
			  trigger: 'right',
			build: function ($trigger) {
				var table = $('#analresulttable').DataTable();
  	    	  	var colIndex = parseInt($trigger[0].cellIndex),
        	  		row = table.row($trigger[0].parentNode),
          	  		rowIndex = row.index();
          	  		console.log(colIndex);
          	    if (colIndex != 5) // visible된 칼럼순번은 5번
          	   		return false;
          	   				
          	   	// 실제 data칼럼번호는 11번			
  	    	  	var emp_nm = table.cell(rowIndex, 11).data();
				var options = {
           		  	items: {},
                  	callback: function (key, options, e) {
					  	contextMenuHandler(table,key, options,emp_nm,row.data());
                  	}
				};
				

				if (checkNum(emp_nm))
					options.items["insertEmpNm"] = {name: emp_nm + ' -> ' + '신규등록',icon:"add"};
				else
					options.items["updateEmpNm"] = {name: emp_nm + ' -> ' + '사원명 변경',icon:"edit"};
						
	  		  	return options;
  		  	}
  		});  
		var contextMenuHandler=function(table,key, options,emp_nm,rowData) {
			switch(key){
				case "updateEmpNm":
					returnValue = ChatManager.modifyPunctualityEmpNm(table,emp_nm,rowData);
					break;
				case "insertEmpNm":
					returnValue = ChatManager.regIscDriverId(table,emp_nm);
					break;
				default :
					break;					
			}
		}

		/*
		 * isc 운전자정보 신규등록
		 */
		ChatManager.regIscDriverId = function (table,beforeEmpNm) {
			$.MessageBox({
				    buttonDone  : "등록",
				    buttonFail  : "취소",
			    	input    : {
						emp_nm    : {
				            type         : "text",
				            label        : "신규ID : [ "+ beforeEmpNm + " ]",
				            title        : "사원명"
				        }
					},
			    	tupe : "textarea",
			    	message  : "ISC사원명 등록"
				}
			).done(function(data){
				data.driver_id = beforeEmpNm;
				data.sex = '남자';
				data.regular_gb = '임시등록';

				var iscVo =  new Object();
				iscVo.targetTable = 'TBL_ISC_DRIVER_INFO';
				iscVo.filterType = 'insertOnly';
				iscVo.filterText = '';
				var commonVoString = JSON.stringify (iscVo);
	
				var itemList  = [];
				itemList.push(data);
				var jsonString =  JSON.stringify (itemList);
	
				var formData = new FormData();
	    		formData.append('jsonDataStr', jsonString);
	    		formData.append('commonVoStr', commonVoString);
	
				$.ajax({
				       url : "/BUS_insertInfo",
							method: "post",
					      	data: formData,
					      	contentType: false,
					      	processData: false,
					      	cache: false,
					      	enctype: 'multipart/form-data',
					      	//dataType: "json",
	      			   success : function(ret) {	
				    	   swal(ret);
				    	   ChatManager.btnAnalResultView();
				       },
				       error : function(request, status, error) {
				    	   alert(request.responseText,'error');
				       }
				});	
			});	
		}		

		/*
		 * 배차정시성 사원명 변경
		 */
		ChatManager.modifyPunctualityEmpNm = function (table,beforeEmpNm,rowData) {
			$.MessageBox({
				    buttonDone  : "변경",
				    buttonFail  : "취소",
			    	input    : {
						emp_nm    : {
				            type         : "text",
				            label        : "현재 사원명 : [ "+ beforeEmpNm + " ]",
				            title        : "변경 사원명"
				        }
					},
			    	tupe : "textarea",
			    	message  : "사원명 변경"
				}
			).done(function(data){
				var iscVo =  new Object();
				iscVo.baseYmd = rowData.base_ymd;
				iscVo.routeNm = rowData.route_nm;
				iscVo.filterText = rowData.col000 + rowData.col001 + rowData.col002;
				iscVo.empNm   = data.emp_nm;
				var commonVoString = JSON.stringify (iscVo);
	
				var formData = new FormData();
	    		formData.append('commonVoStr', commonVoString);
	
				console.log(commonVoString);
				$.ajax({
				       url : "/BUS_modifyPunctualityEmpNm",
							method: "post",
					      	data: formData,
					      	contentType: false,
					      	processData: false,
					      	cache: false,
					      	enctype: 'multipart/form-data',
					      	//dataType: "json",
	      			   success : function(ret) {	
				    	   swal(ret);
				    	   ChatManager.btnAnalResultView();
				       },
				       error : function(request, status, error) {
				    	   alert(request.responseText,'error');
				       }
				});	
			});	
		}						              
	    return ChatManager;
	}());
	
	$('.filebox').hide();
	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
		ChatManager.btnInit();
   	});
	$(document).on('click', '#btnAnalInit', function () {
		ChatManager.btnAnalInit();
   	});
	$(document).on('click', '#btnViewAll', function () {
		ChatManager.btnViewAll();
	});
	
	calMonthKo.on('change', () => {
		ChatManager.btnViewAll();
	});
		
	$(document).on('click', '#btnView', function () {
		ChatManager.btnViewDetail();
	});

	$(document).on('click', '#btnAnalView', function () {
		ChatManager.btnAnalView();
	});

	$(document).on('click', '#btnAnalResultView', function () {
		ChatManager.btnAnalResultView();
	});

	$(document).on('click', '#btnAnalSave', function () {
		ChatManager.btnAnalSave();
	});
	$(document).on('click', '#btnEmpMapping', function () {
		ChatManager.btnEmpMapping();
		ChatManager.btnAnalResultView();
	});
	$(document).on('click', '#btnAnalProc', function () {
		if (!ChatManager.btnAMPMSeq())
			return;		
		ChatManager.btnAnalProc();
	});
	$(document).on('click', '#btnCommonView', function () {
		fnMdiOpen('배차정시성 분석대상 설정','common','/monitor/popupPunctualityTargetSeq.html', 500,300); // 이게 더 크게	
	});
	
	// grid조회시 하단 내용조회
	$('#viewTable').on('click','td', function() {
		//ChatManager.btnInit();
		$('.filebox').show();

	   		$('#exceltable').DataTable().clear()
	   		$('#exceltable').empty();
	   		$('#analtable').DataTable().clear()
	   		$('#analtable').empty();
	   		$('#newanaltable').DataTable().clear()
	   		$('#newanaltable').empty();
	   		$('#analresulttable').DataTable().clear()
	   		$('#analresulttable').empty();

		
		var table = $('#viewTable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var routeNm = table.cell( row,0 ).data();
		var baseYmd = $('#baseYm').val() + '-' + lpad(col,2,'0');
		
		$('#routeNm').val(routeNm);
		$('#baseYmd').val(baseYmd);
		
		
		console.log(table.cell( row,col ).data());
		if ( table.cell( row,col ).data().trim() == '' ) {
			$( "#tabs" ).tabs( "option", "active", 0 );
		} else if ( table.cell( row,col ).data().trim() == '◆' ) {
			$( "#tabs" ).tabs( "option", "active", 2 );		
			ChatManager.btnAnalResultView();
		} else { 
			$( "#tabs" ).tabs( "option", "active", 1 );
			ChatManager.btnAnalView();
		}
	});

/*	// 분석결과 사원명칭 변경
	$('#analresulttable').on('click','td', function() {
		var table = $('#analresulttable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		if (col != 11)	return;
		
		var rData = table.row( row ).data();
		
		
		if (checkNum(rData.emp_nm) == false) return;
				
		$.MessageBox({
			    buttonDone  : "등록",
			    buttonFail  : "취소",
		    	input    : {
					emp_nm    : {
			            type         : "text",
			            label        : "신규ID : [ "+rData.emp_nm + " ]",
			            title        : "사원명"
			        }
				},
		    	tupe : "textarea",
		    	message  : "ISC사원명 등록"
			}
		).done(function(data){
			table.cell(row,11).data(data.emp_nm).draw();
			data.driver_id = rData.emp_nm;
			data.sex = '남자';
			data.regular_gb = '임시등록';
			ChatManager.regIscDriverId(data);
		});	
	});*/

	$(document).on('click', '#btnSave', function () {
//			var table = $('#exceltable').DataTable();
//			var itemList  = table.rows().data().toArray();
//			console.log (itemList);
		
		ChatManager.btnSave();
	});	
/*	$('#exceltable').on('change', 'input[type="checkbox"]', function(){
		var $row = $(this).closest('tr');
		var table = $('#exceltable').DataTable();
		var data = table.row($row).data(); 
		
		// 버스id는 수정불가
		if (data.col0 == startString)	return;
		
		if(this.checked){
			data.col = 'true';
		} else data.col = 'false';
	});
*/

});

/* excel upload */
function fn_ExportToTable(columnMap,targetGrid,excelFile,startString,endString,startRow) {  
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
     /*Checks whether the file is a valid excel file*/  
     //if (regex.test($("#excelfile").val().toLowerCase())) {  
     if (1) {  
         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
         if ($(excelFile).val().toLowerCase().indexOf(".xlsx") > 0) {  
             xlsxflag = true;  
         }  
         /*Checks whether the browser supports HTML5*/  
         if (typeof (FileReader) != "undefined") {  
             var reader = new FileReader();  
             reader.onload = function (e) {  
                 var data = e.target.result;  
                 /*Converts the excel data in to object*/  
                 if (xlsxflag) {  
                     var workbook = XLSX.read(data, { type: 'binary' ,raw:false,cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss'});  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' ,raw:false,cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss'});  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  
                     if (xlsxflag) {  
                         //var exceljson = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y],{ header: 1 });  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: 1 });  
                         //var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: ['A','B','C'] });  
                     }  
                     if (exceljson.length > 0 && cnt == 0) {  
                         fn_BindTable(columnMap,targetGrid,exceljson,startString,endString,startRow);  
                         cnt++;  
                     }  
                     return;
                 });  
                 //$('#exceltable').show();  
             }  
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                 reader.readAsBinaryString($(excelFile)[0].files[0]);  
             }  
             else {  
                 reader.readAsBinaryString($(excelFile)[0].files[0]);  
             }  
         }  
         else {  
             alert("Sorry! Your browser does not support HTML5!");  
         }  
     }  
     else {  
         alert("Please upload a valid Excel file!");  
     }  
 }  
 
function fn_BindTable(columnMap,targetGrid,jsondata,startString,endString,startRow) {/*Function used to convert the JSON array to Html Table*/  
    var gridColumns = [];
    var gridData = [];
	var start = false;
    var columns = [];//fn_BindTableHeader(jsondata); /*Gets all the column headings of Excel*/  
	var regex = /[, ]/gi;
	//console.log(jsondata);
	

    for (var i = 0; i < jsondata.length; i++) {
		var firstColData = jsondata[i][0];
		if (firstColData == undefined)
			continue;  

        var gridRowData = {};
		  
		if (startString == jsondata[i][0]) {
			if 	(start)	
				break;
			start = true;
			var colVo =  new Object();
			colVo.title = '제외';	
			colVo.data = 'col';	
			//colVo.className =  'select-checkbox';
			
			columns[0] = colVo;
			gridRowData['col'] = 'true';		

			for (var key in jsondata[i]){
				var colVo =  new Object();
				colVo.title = 'col'+zerofill(key,3);	
				colVo.data = 'col'+zerofill(key,3);	
				
				columns[parseInt(key)+1] = colVo;
				gridRowData['col'+zerofill(key,3)] = jsondata[i][key];		
				
				// 최종 column name 보관
				commonVo.lastColumnNm = colVo.title;
			}
			gridData.push(gridRowData);
			continue;
		}
		//		console.log(columns);
	    var k=0;
        gridRowData = {};
        gridRowData['col'] = 'false';
		for (var key in jsondata[i]){
			//console.log("[runFunction] : [for : json key] : " + key);
			//console.log("[runFunction] : [for : json value] : " + jsondata[i][key]);
			var cellValue = jsondata[i][key].toString();

			if (cellValue.includes('GMT')) {
				cellValue = cellValue.substring(cellValue.indexOf('GMT')-9,cellValue.indexOf('GMT'));
			}
			
/*			if (key == 0) { 
				cellValue = cellValue.substring(0,cellValue.indexOf('('));
			} else 
				cellValue = cellValue.replace(regex, '');
*/			
			//console.log(cellValue + '/' + ExcelDateToJSDate(cellValue));
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
			gridRowData[columns[parseInt(k)+1].data] = cellValue;	
			k++;	
		}
  		gridData.push(gridRowData);
    }
	//console.log(columns);
	//console.log(gridData);
	var height = calcDataTableHeight();
    fn_setGridData(targetGrid,columns,gridData,6,height);

}  

function calcDataTableHeight () {
	  return ($(window).height() * 55 / 100)-160;
};

function calcDataTableHeight_analResult () {
	  return ($(window).height() * 55 / 100) / 1.2;
};

function fn_setGridDataAll(targetGrid,gridColumns, gridData,fixedColCount) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": 120,
	    scrollX : true,
	    //ordering : true,
	    "columnDefs": [
	        {"className": "dt-center", "targets": "_all"}
	       ,{
	        	'targets': "_all",
	        	'render' : render_viewAll
	        }
   		],
		/*select: {
				style: 'multi',
				selector: 'td:first-child'
			},*/   		
		columns: gridColumns,
        //"searching": true,
	    data: gridData,
/*	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
*/	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
	});
	//resultTable.row(0).remove().draw(false);
	resultTable.columns.adjust().draw();  
}  

function fn_setGridData(targetGrid,gridColumns, gridData,fixedColCount,height) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	//$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": height,
	    scrollX : true,
	    //ordering : true,
	    "columnDefs": [
	        {"className": "dt-center", "targets": "_all"}
	       ,{
	        	'targets': 0,
	        	//data:null,
	        	//defaultContent: "N",
	        	'render' : render_check
/*	        	'render' : function(data, type, full, meta) {
							return '<input type="checkbox"' + (data == "true" ? ' checked="checked"' : '') + '>';
						}*/
	        }
   		],
		/*select: {
				style: 'multi',
				selector: 'td:first-child'
			},*/   		
		columns: gridColumns,
        fixedColumns:   {
            left: 6
        },
        //"searching": true,
	    data: gridData,
/*	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
*/	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
	});
	//resultTable.row(0).remove().draw(false);
	resultTable.columns.adjust().draw();  
}  

function calcDataTableHeight2 () {
	  return ($(window).height() * 55 / 100) /3;
};

function fn_setGridDataAnal(targetGrid,gridColumns, gridData,height,fixedColCount) {/*Function used to get all column names from JSON and bind the html table header*/  
   	$(targetGrid).empty();

	//var height = calcDataTableHeight2();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": height, //$(window).height()-250,
	    scrollX : true,
	    //"sScrollY": height,
	    //ordering : true,
	    "columnDefs": [
	        {"className": "dt-center", "targets": "_all"}
	       ,{
	        	'targets': 0,
	        	'render' : render_analCheck
	        }
   		],
		select: {
	            	style: 'os',
	            	items: 'row'
	        	},
		columns: gridColumns,
        fixedColumns:   {
            left: fixedColCount
        },
	    data: gridData,
	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
/*	    ,"initComplete": function (settings, json) {  
    		$("#analtable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");            
  		}*/
	});
	if (fixedColCount == 5)
		resultTable.row(0).remove().draw(false);
	resultTable.columns.adjust().draw(false);  
	//resultTable.columns.adjust().responsive.recalc();
}  

 function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569)*86400*1000));
}


function fnMdiOpen (title,uniqueKey,url, w_width,w_height) {
	var iframName = "iframe_" + uniqueKey;

	var child = document.getElementById("iframe_" + uniqueKey);
	if (child != null) return;
	
	
	var text = '<iframe class="resized" id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';
	//var text = '<iframe id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';

	//var $objWindow = $('<div class="window">'+text+'</div>');
	var $objWindow = $('<div class="window resizer ugly">'+text+'</div>');
    var intRandom = Math.floor((Math.random() * 12) + 1);
    
    $($objWindow).appendTo('body');
    //var height = $(iframName).contents().height();
    //var width = $(iframName).contents().width();
    $objWindow.itemCd=uniqueKey;
    $objWindow.window({
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