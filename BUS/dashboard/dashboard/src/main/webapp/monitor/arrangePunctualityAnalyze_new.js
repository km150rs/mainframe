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
	var colNm = meta.settings.aoColumns[meta.col].mData;
	if (row.ROUTE_NM != undefined && !row.ROUTE_NM.includes('번') ) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	
	var expNumCol = /(SUM_|AVG_)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}	
	return data;
} 
function render_detail(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
/*	if (meta.col < 12) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	
*/	return data;
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
		
		var height= $('.empCard0_1_1').height() - 20;
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
	            {
	                "className":      'details-control',
	                "orderable":      false,
	                "data":           null,
	                "defaultContent": ''
	            }				
    	    	,{data: "ROUTE_NM"		}
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

		height= $('.empCard0_2').height() - 20;
		
	    ChatManager.detailTable = $("#detailTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: true,
		    "columnDefs": [
		        { targets: "_all" , render: render_detail}
	        ],
		    columns : [
    	    	 {data: "BASE_YMD"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "ROUTE_NM"			,width:"5%"		,"className": "dt-center"}
    	    	,{data: "COL001"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "COL002"			,width:"3%"		,"className": "dt-center"}
    	    	,{data: "COL003"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "COL004"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "TERM"				,width:"10%"	,"className": "dt-center"}
    	    	,{data: "TERM_85"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "TERM_125"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "TERM_PAST_CNT"		,width:"3%"		,"className": "dt-right"}
    	    	,{data: "TERM_LATE_CNT"		,width:"3%"		,"className": "dt-right"}
    	    	,{data: "TERM_WIBAN_CNT"	,width:"5%"		,"className": "dt-right"}
    	    	,{data: "TOTAL_STATION_CNT"	,width:"5%"		,"className": "dt-right"}
    	    	,{data: "RATE_WIBAN"		,width:"5%"		,"className": "dt-right"}
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
		ChatManager.btnView_detail = function () {
			var commonVoStr = ChatManager.setCommonVo('','select_PunctualityAnalize_detail','');
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
			    	   ChatManager.detailTable.clear().draw();
					   ChatManager.detailTable.rows.add( result.data).draw(false);
					   ChatManager.detailTable.columns.adjust().draw();  
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
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