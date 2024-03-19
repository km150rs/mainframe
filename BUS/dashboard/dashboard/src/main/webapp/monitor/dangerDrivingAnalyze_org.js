/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '';
 var endString = '요약';
 var startRow = 6;

let columnMap = new Map([
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
 
var excelColumns = [
	 {title:'운전자'		,data:'emp_nm'			,render:render_QueryResult}
	,{title:'100km당'	,data:'danger_km100'	,render:render_QueryResult}
	,{title:'실제횟수'		,data:'danger_act_cnt'	,render:render_QueryResult}
	,{title:'주요위험운전행동',data:'danger_act'		,render:render_QueryResult}
	,{title:'위험수준'		,data:'danger_level'	,render:render_QueryResult}
	,{title:'운행일수'		,data:'driving_cnt'		,render:render_QueryResult}
	,{title:'총운행거리'	,data:'driving_distance',render:render_QueryResult}
	,{title:'총운행시간'	,data:'driving_time'	,render:render_QueryResult}
];

/*
 * 위험행동 종류별  
 */
function render_QueryResult1(data,type,row,meta){
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	//console.log(meta.settings.aoColumns[meta.col].data);
	
	if (meta.col <= 1) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}

	if (meta.settings.aoColumns[meta.col].data == 'total') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	} else {
		if (meta.col > 1) {
			var rate = parseInt(api.cell(meta.row, meta.col).data()) / parseInt(api.cell(5, meta.col).data());
			console.log(api.cell(meta.row, meta.col).data());
			console.log(api.cell(5, meta.col).data());
			console.log(rate);
		}		
	}
	if (row.danger_level == '합계') {
		var iData = data.toString();
		iData = iData.substring(0,iData.indexOf('('));
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		return iData;
	}
	
	
	return data;
} 

function render_QueryResult(data,type,row,meta){
	//var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	//console.log(meta.settings.aoColumns[meta.col].data);
	
	if (meta.col <= 1) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}

	if (meta.settings.aoColumns[meta.col].data == 'total') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}
	
	return data;
} 
 
$( function() {
	$("#from").val("");
    var from = $('#from');
		from.inputmask(
		    "9999-99"
		);
	$("#to").val("");
    var to = $('#to');
		to.inputmask(
		    "9999-99"
		);

 
  	
	var ChatManager = (function () {
	    ChatManager.$group = $('#group');
	    
	    function ChatManager() {
	    } 	
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryGroup = function () {
			var jsonString = ChatManager.setParamVo(false,'',true);
			$.ajax({
			       url : "/BUS_getRouteNmInfo",
			      "data" : {strData : jsonString},
			       "dataSrc" : "",
			       async : false,
			        //global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
			    	   //console.log(ret.data);
			    	   var size = ret.data.length;
			    	   var option = $("<option></option>");
			    	   ChatManager.$group.empty();
			    	   ChatManager.$group.append(option);
			    	   
			    	    for (var i = 0; i < size; i++) {
			    	    	var option = $("<option>"+ret.data[i].route_nm+"</option>");
			    	    	ChatManager.$group.append(option);
			    	    };
			    	   //ChatManager.$group.append(ret.data);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
	    
	    ChatManager.setParamVo = function setParamVo(bValidCheck,filterType,bIncludeHeader) {
			commonVo.filterType = filterType;
			commonVo.routeNm 	= ChatManager.$group.val();
			commonVo.includeHeader = bIncludeHeader;
			commonVo.fromDate 		= $('#from').val();
			commonVo.toDate 		= $('#to').val();

			let fromDate = $('#from').val();
			let toDate= $('#to').val();

			if (bValidCheck) {
			    if (fromDate == null || fromDate == undefined || fromDate == '') {
					swal('from 기준월을 입력하세요');
					return null;
				}
			    if (toDate == null || toDate == undefined || toDate == '') {
					swal('to 기준월을 입력하세요');
					return null;
				}
			    if (fromDate > toDate) {
					swal('기간확인 : from  < to');
					return null;
				}
			}
			//commonVo.baseYm = commonVo.baseYm.replace(/\D+/g, '');
			//var jsonString = JSON.stringify (commonVo);
			return JSON.stringify (commonVo);
		}
		/*
		 *  조회
		 */
	    ChatManager.btnView1 = function () {
			var commonVoString = ChatManager.setParamVo(true,'danagerAnal_Step',true);
			if (commonVoString == null) return;
			console.log(commonVoString);
			var newColumns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   //console.log(ret);
						//var newDatas = [];  					   

						for (var i = 0; i < ret.data.length; i++) {
							if (i == 0) {
								// 칼럼 header 구하기
								newColumns[0] = {
				    	            'title': '행동구분',
				    	            'data': 'danger_level',
				    	            'className': 'dt-body-center',
				    	            render : render_QueryResult1
				    	        }
								newColumns[1] = {
				    	            'title': 'lv구분',
				    	            'data': 'danger_level_no',
				    	            'className': 'dt-body-center',
				    	            render : render_QueryResult1
				    	        }

								var monthArray = ret.data[i].base_ym.split(',');
								for (var j = 0; j < monthArray.length; j++) {
					    	        newColumns[j+2] = {
					    	            'title': monthArray[j],
					    	            'data': 'd' + (j+1),
					    	            'className': 'dt-body-center',
					    	             render : render_QueryResult1
					    	        }
								}
								newColumns[monthArray.length+2] = {
				    	            'title': '행동count',
				    	            'data': 'total',
				    	            'className': 'dt-body-center',
				    	            render : render_QueryResult1
				    	        }
							}
							var stepDataArray = ret.data[i].rate.split(',');
							for (var k = 0; k < stepDataArray.length; k++) {
								//eval("ret.data[i].d" + (k+1) + "= '" + stepDataArray[k] + "'");
								ret.data[i]['d'+ (k+1)] = stepDataArray[k];
							}

			    	    };
			    	    //console.log(newColumns);
			    	    //console.log(ret.data);
						fn_setGridData('#dangerStepTable',newColumns,ret.data,true,false);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
 
	    ChatManager.btnView2 = function () {
			var commonVoString = ChatManager.setParamVo(true,'danagerAnal_Driver',true);
			if (commonVoString == null) return;
			console.log(commonVoString);
			var newColumns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   //console.log(ret);
						//var newDatas = [];  					   

						for (var i = 0; i < ret.data.length; i++) {
							if (i == 0) {
								// 칼럼 header 구하기
								newColumns[0] = {
				    	            'title': '운전기사',
				    	            'data': 'emp_nm',
				    	            'className': 'dt-body-center',
				    	            render : render_QueryResult
				    	        }
								newColumns[1] = {
				    	            'title': 'sp구분',
				    	            'data': 'sp_gb',
				    	            'className': 'dt-body-center',
				    	            render : render_QueryResult
				    	        }

								var monthArray = ret.data[i].base_ym.split(',');
								for (var j = 0; j < monthArray.length; j++) {
					    	        newColumns[j+2] = {
					    	            'title': monthArray[j],
					    	            'data': 'd' + (j+1),
					    	            'className': 'dt-body-center' 
					    	            //"orderable": false
					    	        }
								}
								newColumns[monthArray.length+2] = {
				    	            'title': '위험level',
				    	            'data': 'total',
				    	            'className': 'dt-body-center',
				    	            render : render_QueryResult
				    	        }
								newColumns[monthArray.length+3] = {
				    	            'title': 'base_ym',
				    	            'data': 'base_ym',
				    	            'className': 'dt-body-center',
				    	            visible : false
				    	        }
								newColumns[monthArray.length+4] = {
				    	            'title': 'danger_level_no',
				    	            'data': 'danger_level_no',
				    	            'className': 'dt-body-center',
				    	            visible : false
				    	        }
							}
							var stepDataArray = ret.data[i].rate.split(',');
							for (var k = 0; k < stepDataArray.length; k++) {
								//eval("ret.data[i].d" + (k+1) + "= '" + stepDataArray[k] + "'");
								ret.data[i]['d'+ (k+1)] = stepDataArray[k];
							}

			    	    };
			    	    //console.log(newColumns);
			    	    //console.log(ret.data);
						fn_setGridData('#dangerDriverTable',newColumns,ret.data,200,true);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		} 
		
		/*
		 *  조회
		 */
	    ChatManager.btnView3 = function (empNm) {
			commonVo.empNm = empNm;
			var commonVoString = ChatManager.setParamVo(true,'danagerAnal_Employee',true);
			console.log(commonVoString);
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   //console.log(ret);
						for (var i = 0; i < ret.header.length; i++) {
							var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
			    	            'visible' : colNm == '생년월일' ? false : true
			    	        }
			    	    };
			    	    
		    	        fn_setGridData('#dangerEmpTable',columns,ret.data,150,true);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
	    ChatManager.btnDrawChart= function (row) {
			var table = $('#dangerDriverTable').DataTable();
			var empNm = table.cell( row,0 ).data();
			if (empNm != '') {
				var colCount = table.columns().header().length;
	
				const  charTitleData = table.cell( row,colCount-2 ).data();
				const  charTitleDataArray = charTitleData.split(',');
	
				const  charData = table.cell( row,colCount-1 ).data();
				const  charDataArray = charData.split(',').map(Number);
				
				ChatManager.btnView3(empNm);
				drawChart(charTitleDataArray,charDataArray);
			}

		}				
	    return ChatManager;
	}());
	/*
	 * 조회
	 */
	$(document).on('click', '#btnView', function () {
 	    $('#dangerStepTable').DataTable().clear().draw();
 	    $('#dangerDriverTable').DataTable().clear().draw();
 	    $('#dangerEmpTable').DataTable().clear().draw();
		
		ChatManager.btnView1();
		ChatManager.btnView2();
		
		var table = $('#dangerDriverTable').DataTable();
		var rowCount = table.rows( ).count();
		if (rowCount > 0) {
			table.row(0).select();
			ChatManager.btnDrawChart(0);
		}
	});

	// 기사 이름 클릭시 근태정보 필터링
	$('#dangerDriverTable').on('click','td', function() {
			console.log('test');
		var table = $('#dangerDriverTable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;
		var empNm = table.cell( row,col ).data();
		if (col == 0) {
			ChatManager.btnDrawChart(row);
		}	
	});


	ChatManager.btnQueryGroup();

});

 function fn_setGridData(targetGrid,gridColumns, gridData,heightValue,bOrder) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	
	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": heightValue,
	//    aaSorting: [1,2,3,4,5],
	    ordering: bOrder,
	    //scrollX : true,
		columns: gridColumns,
		autoWidth: false,
        //"searching": true,
	    data: gridData,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
	});
	//resultTable.columns.adjust().draw();
	//$(resultTable.cell({row: index.row, column: index.column}).node()).css('color', 'red');
  
}  

function drawChart(charTitleDataArray,charDataArray) {
	console.log(charDataArray);
	Highcharts.chart('container', {
		chart: {
	        height: 200
     	},
     	title: {
			text: ''
		},
	    yAxis: {
	        title: {
	            text: '위험운전단계'
	        }
	    },
		exporting: {
	    	enabled: false
	  	},
	    xAxis: {
	        categories: charTitleDataArray
	    },
	
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	
	    plotOptions: {
	        series: {
				marker: {
	                enabled: false,
	                states: {
	                    hover: {
	                        enabled: false
	                    }
	                }
	            },
	            label: {
	                connectorAllowed: false
	            }
	        }
	    },
	
	    series: [{
	        name: '',
	        data: charDataArray,
	        showInLegend: false
	    }]
	
	});	
}