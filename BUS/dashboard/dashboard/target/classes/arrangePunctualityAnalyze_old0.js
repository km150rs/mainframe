/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();

function render_up(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	
	if (meta.row == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	
	var colNm = meta.settings.aoColumns[meta.col].mData;
	var expNumCol = /(SUM_|AVG_)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}	
	return data;
} 
function render_detail(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col < 12) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	
	return data;
} 

function render_check(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col > 9 && meta.col < 11)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	if (meta.col > 11 && meta.col < 19)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
			
	return data;
}
 
$( function() {
    var calMonthKo = new tui.DatePicker('#datepicker-month-from', {
        date: new Date(),
        language: 'ko',
        input: {
            element: '#from',
            format: 'yyyy-MM-dd'
        }
    });
   	var calMonthKo = new tui.DatePicker('#datepicker-month-to', {
        date: new Date(),
        language: 'ko',
        input: {
            element: '#to',
            format: 'yyyy-MM-dd'
        }
    });
    	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
		ChatManager.routeTable = null;
		ChatManager.monthTable = null;
		ChatManager.dayTable = null;
		ChatManager.detailTable = null;
	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			commonVo.fromDate 		= $('#from').val();
			commonVo.toDate 		= $('#to').val();

			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		
		var height= $('.empCard0_1_1').height();
	    ChatManager.routeTable = $("#routeTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: true,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : [0]}
		    	,{"className": "dt-right", "targets"  : [1,2,3,4,5,6]}
		        ,{ targets: "_all" , render: render_up}
	        ],
		    columns : [
    	    	 {data: "ROUTE_NM"		}
    	    	,{data: "SUM_PAST"		}
    	    	,{data: "SUM_LATE"		}
    	    	,{data: "SUM_WIBAN"		}
    	    	,{data: "AVG_WIBAN"		}
    	    	,{data: "SUM_STATION"	}
    	    	,{data: "RATE_WIBAN"	}
	 	    ]
		});	

	    ChatManager.monthTable = $("#monthTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: true,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : [0]}
		    	,{"className": "dt-right", "targets"  : [1,2,3,4,5,6]}
		        ,{ targets: "_all" , render: render_up}
	        ],
		    columns : [
    	    	 {data: "BASE_YM"		}
    	    	,{data: "SUM_PAST"		}
    	    	,{data: "SUM_LATE"		}
    	    	,{data: "SUM_WIBAN"		}
    	    	,{data: "AVG_WIBAN"		}
    	    	,{data: "SUM_STATION"	}
    	    	,{data: "RATE_WIBAN"	}
	 	    ]
		});	

	    ChatManager.dayTable = $("#dayTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: true,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : [0]}
		    	,{"className": "dt-right", "targets"  : [1,2,3,4,5,6]}
		        ,{ targets: "_all" , render: render_up}
	        ],
		    columns : [
    	    	 {data: "BASE_YMD"		,width:"15%"}
    	    	,{data: "SUM_PAST"		,width:"10%"}
    	    	,{data: "SUM_LATE"		,width:"10%"}
    	    	,{data: "SUM_WIBAN"		,width:"10%"}
    	    	,{data: "AVG_WIBAN"		,width:"15%"}
    	    	,{data: "SUM_STATION"	,width:"15%"}
    	    	,{data: "RATE_WIBAN"	,width:"15%"}
	 	    ]
		});	

		
		ChatManager.btnView_route = function () {
			var commonVoStr = ChatManager.setCommonVo('','select_PunctualityAnalize_route','');
			if (commonVoStr == null) return;
			console.log(commonVoStr);
			$.ajax({
		       url : "/DynamicSqlFilterMybatis",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
			    	   ChatManager.routeTable.clear().draw();
					   ChatManager.routeTable.rows.add( result.data).draw(false);
					   ChatManager.routeTable.columns.adjust().draw();  
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}	    		
		ChatManager.btnView_month = function () {
			var commonVoStr = ChatManager.setCommonVo('','select_PunctualityAnalize_month','');
			if (commonVoStr == null) return;
			console.log(commonVoStr);
			$.ajax({
		       url : "/DynamicSqlFilterMybatis",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
			    	   ChatManager.monthTable.clear().draw();
					   ChatManager.monthTable.rows.add( result.data).draw(false);
					   ChatManager.monthTable.columns.adjust().draw();  
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}	    	
		ChatManager.btnView_day = function () {
			var commonVoStr = ChatManager.setCommonVo('','select_PunctualityAnalize_day','');
			if (commonVoStr == null) return;
			console.log(commonVoStr);
			$.ajax({
		       url : "/DynamicSqlFilterMybatis",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
			    	   ChatManager.dayTable.clear().draw();
					   ChatManager.dayTable.rows.add( result.data).draw(false);
					   ChatManager.dayTable.columns.adjust().draw();  
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}			
		ChatManager.btnAMPMSeq = function () {
			var commonVoString = ChatManager.setCommonVo('','getRouteCommonInfo','',true);
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
						$('#code_am').val(ret.data[0].am_seq_array);
						$('#code_pm').val(ret.data[0].pm_seq_array);
						$('#wiban_gijun').val(ret.data[0].wiban_gijun);
						$('#wiban_min_value').val(ret.data[0].wiban_min_value);
						$('#wiban_max_value').val(ret.data[0].wiban_max_value);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}        
		/*
		 *  detail 조회
		 */
	    ChatManager.btnView_detail = function () {
			ChatManager.btnAMPMSeq();
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
			var commonVoString = ChatManager.setCommonVo('TBL_ARRANGE_PUNCTUALITY_INFO','TBL_ARRANGE_PUNCTUALITY_INFO_DETAIL','');
			if (commonVoString == null)
				return;
			var columns = [];
			var exp1 = /(company_no|seq|_place)/;
			
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
							aaa = ret.data[0][colNm].toString();
							
							//console.log('aaa=' + aaa + ' colnm=' + colNm);
							var title;
							
							if (i < 12) {
								title = colNm;
								if (colNm == 'term') title = '배차간격';
								if (colNm == 'term_85') title = title_85;
								if (colNm == 'term_125') title = title_125;
								if (colNm == 'term_past_cnt') title = '몰림';
								if (colNm == 'term_late_cnt') title = '지연';
								if (colNm == 'term_wiban_cnt') title = '위반건수';
								if (colNm == 'total_station_cnt') title = '정류장수';
							} else {
								title = ret.data[0][colNm];
							}
							
			    	        if (aaa == ' ') {
								break;
							} else {
				    	        columns[i] = {
									'name' : colNm,
				    	            'title': title,
				    	            'data' : colNm,
				    	            'render' : render_detail,
	   			    	            'visible': (exp1.test(colNm) || title == 'col') ? false : true
				    	        }
/*				    	        newColumns[newNo++] = columns[i];
				    	        if (i == 11) {
					    	        newColumns[newNo++] = {render:render_check,title:'배차간격',data:'term'};
					    	        newColumns[newNo++] = {render:render_check,title:title_85,data:'term_85'};
					    	        newColumns[newNo++] = {render:render_check,title:title_125,data:'term_125'};
					    	        newColumns[newNo++] = {render:render_check,title:'몰림',data:'term_past_cnt'};
					    	        newColumns[newNo++] = {render:render_check,title:'지연',data:'term_late_cnt'};
					    	        newColumns[newNo++] = {render:render_check,title:'위반건수',data:'term_wiban_cnt'};
					    	        newColumns[newNo++] = {render:render_check,title:'정류장수',data:'total_station_cnt'};
								}				    	        
*/								commonVo.lastColumnNm = colNm;
				    	    }
			    	    };
			    	    
/*						for (var j = 0; j < ret.data.length; j++) {
							for (var key in ret.data[j]){
								var checkValue = ret.data[j][key].toString().trim();
								if (checkValue == '' ) {
									delete ret.data[j][key];
								} 
				    	    };
			    	    };*/
		    	        //fn_setGridData('#exceltable',columns,ret.data,5);
		    	        fn_setGridData('#detailTable',columns,ret.data,6);
		    	        
		    	        console.log(columns);
						//ChatManager.btnProc();
						//$('.pjy_button_unfixed').show();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}

	    return ChatManager;
	}());


	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
   		$('#routeTable').DataTable().clear().destroy();
   		$('#monthTable').DataTable().clear().destroy();
   		$('#dayTable').DataTable().clear().destroy();
   		$('#detailTable').DataTable().clear().destroy();
   	});
	$(document).on('click', '#btnView', function () {
		ChatManager.btnView_route();
	});
	
	//$(tableTopN.table().container()).on('dblclick','td', function() {
	$('#routeTable').on('click','td', function() {
		var table = $('#routeTable').DataTable();
		var row = table.cell(this).index().row;
		//var col = table.cell(this).index().column;

		commonVo.routeNm = table.cell( row,0 ).data();
		ChatManager.btnView_month();
	});	
	$('#monthTable').on('click','td', function() {
		var table = $('#monthTable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		commonVo.baseYm = table.cell( row,0 ).data();
		ChatManager.btnView_day();
	});	

	$('#dayTable').on('click','td', function() {
		var table = $('#dayTable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		commonVo.baseYmd = table.cell( row,0 ).data();
		ChatManager.btnView_detail();
	});	

});

function fn_setGridData(targetGrid,gridColumns, gridData,fixedColCount) {/*Function used to get all column names from JSON and bind the html table header*/  
   	$(targetGrid).empty();

	var	height= $('.empCard0_2').height();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": height, //$(window).height()-250,
	    scrollX : true,
	    //"sScrollY": calcDataTableHeight(),
	    //ordering : true,
	    "columnDefs": [
	        {"className": "dt-center", "targets": "_all"}
	       ,{
	        	'targets': 0,
	        	'render' : render_check
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
	});
	//if (fixedColCount == 5)
		resultTable.row(0).remove().draw(false);
	//resultTable.columns.adjust().draw();  
}  