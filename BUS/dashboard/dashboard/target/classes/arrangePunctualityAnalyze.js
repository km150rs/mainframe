/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();

function render_emp(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
		data = meta.row+1;
	}	
	var colNm = meta.settings.aoColumns[meta.col].mData;
/*	if (row.ROUTE_NM != undefined && !row.ROUTE_NM.includes('번') ) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	*/
	var expNumCol = /(SUM_|AVG_)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}	
	var expNumCol2 = /(RATE_)/;
	if( expNumCol2.test(colNm)){
		data = $.fn.dataTable.render.number(',','.',2).display(data);
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		$(api.cell(meta.row, meta.col).node()).css('font-weight', '900');
	}	
	return data;
} 
function render_up(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
/*	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'gray');
	}*/	
	var colNm = meta.settings.aoColumns[meta.col].mData;
/*	if (row.ROUTE_NM != undefined && !row.ROUTE_NM.includes('번') ) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	*/
	var expNumCol = /(SUM_|AVG_)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}	
	var expNumCol2 = /(RATE_)/;
	if( expNumCol2.test(colNm)){
		data = $.fn.dataTable.render.number(',','.',2).display(data);
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		$(api.cell(meta.row, meta.col).node()).css('font-weight', '900');
	}	
	return data;
} 

function render_detail(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	var colNm = meta.settings.aoColumns[meta.col].mData;
	var expNumCol2 = /(RATE_)/;
	if( expNumCol2.test(colNm)){
		data = $.fn.dataTable.render.number(',','.',2).display(data);
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}	

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
	    
		ChatManager.setCommonVo = function (targetTable,filterType,filterText) {
			commonVo.fromDate 		= $('#from').val();
			commonVo.toDate 		= $('#to').val();

			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		
		var height= $('.empCard0_1_1').height() - 50;
	    ChatManager.empTable = $("#empTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading...",
                search: "",
                searchPlaceholder: "Search...",
           	},    		
	        "searching": true,
		    "scrollY": height,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	        	ordering: true,		    
		     //scrollCollapse: true,
		    scrollX : false,
		    "columnDefs": [
		    	 {"className": "dt-right", "targets"  : [2,3,4,5,6]}
		    	,{"className": "dt-center", "targets"  : [0,1]}
		        ,{ targets: "_all" , render: render_emp}
	        ],
		    columns : [
    	    	 {data: null		,width:"10px"}
    	    	,{data: "EMP_NM"		}
    	    	,{data: "RATE_WIBAN"	}
    	    	,{data: "SUM_PAST"		}
    	    	,{data: "SUM_LATE"		}
    	    	,{data: "SUM_WIBAN"		}
    	    	,{data: "AVG_WIBAN"		}
	 	    ]
		});	
				
		
	    ChatManager.routeTable = $("#routeTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     //scrollCollapse: true,
		    scrollX : true,
		    "columnDefs": [
		    	 {"className": "dt-left", "targets"  : [1]}
		    	,{"className": "dt-right", "targets"  : [2,3,4,5]}
		    	,{"className": "dt-center", "targets"  : [6]}
		        ,{ targets: "_all" , render: render_up}
	        ],
          	createdRow: function ( row, data, index ) {
	            if (data.extn === '') {
	              var td = $(row).find("td:first");
	              td.removeClass( 'details-control' );
	            }
			},	        
		    columns : [
	            {
	                "className":      'details-control',
	                "orderable":      false,
	                "data":           null,
	                "defaultContent": '',
	                "width" : "10px"
	            }				
    	    	,{data: "ROUTE_NM"		}
    	    	,{data: "SUM_PAST"		}
    	    	,{data: "SUM_LATE"		}
    	    	,{data: "SUM_WIBAN"		}
    	    	,{data: "AVG_WIBAN"		}
    	    	//,{data: "SUM_STATION"	}
    	    	,{data: "RATE_WIBAN"	}
	 	    ]
		});	


		$('#routeTable').on('click','td', function() {
			var d_tr = $(this).closest('tr');
			var api = $(this).closest('table').DataTable();
	        var d_row = api.row( d_tr );
	  		var d_rowData = ChatManager.routeTable.row($(this)).data();
	  		if (d_rowData == undefined)	return;
	  		
	  		var d_index = $(this).index();
	  		
	  		console.log(d_rowData);
	  		
				commonVo.routeNm = d_rowData.ROUTE_NM;
			ChatManager.btnView_emp('','',ChatManager.empTable);
	  	});


	    // Add event listener for opening and closing first level childdetails
	    $('#routeTable tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = ChatManager.routeTable.row( tr );
	        var rowData = row.data();
	      
	        //get index to use for child table ID
	        var index = row.index();
	        console.log(index);
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // https://live.datatables.net/nabiyibo/503/edit
	            row.child( 
//			    	'<table id="child_details' + index + '" cellpadding="5" cellspacing="0" border="0" style="padding-left:27px;" class="child_table drivingAnal  cell-border nowrap" >'+  
			    	'<table id="child_details' + index + '" class="child_table drivingAnal  cell-border nowrap" >'+  
				    '<thead><tr ><th></th><th></th><th>기준월</th><th>몰림</th><th>지연</th><th>위반합계</th><th>위반평균</th><th>위반비율</th></tr></thead>'+    
			    	'</table>').show();
	                
	                console.log(rowData);
				commonVo.routeNm = rowData.ROUTE_NM;

			    var childTable = $("#child_details"+index).DataTable({
				    "language": {
				        "emptyTable": "No data",
		                "processing" : "loading..."
		           	},    		
				    //"scrollY": height,
				     scrollCollapse: true,
				    "columnDefs": [
				    	 {"className": "dt-center", "targets"  : [2]}
				    	,{"className": "dt-right", "targets"  : [3,4,5,6,7]}
				        ,{ targets: "_all" , render: render_up}
			        ],
		            destroy: true,
					columns : [
			            {
			                "className":      'details-control1',
			                "orderable":      false,
			                "data":           null,
			                "defaultContent": '',
			                "width" : "10px"
			            },				
		    	    	 {data: "ROUTE_NM"		,visible : false}
		    	    	,{data: "BASE_YM"		,"width" : '143px'}
		    	    	,{data: "SUM_PAST"		,"width" : '100px'}
		    	    	,{data: "SUM_LATE"		,"width" : '100px'}
		    	    	,{data: "SUM_WIBAN"		,"width" : '100px'}
		    	    	,{data: "AVG_WIBAN"		,"width" : '100px'}
		    	    	//,{data: "SUM_STATION"	}
		    	    	,{data: "RATE_WIBAN"	,"width" : '100px'}
			 	    ]
				});	
				ChatManager.btnView_month(childTable);
	            tr.addClass('shown');
	        }
		
			$('#child_details'+ index).on('click','td', function() {
				// child 클릭시에도 상위가 호출됨(index=0으로 호출)
		  		var d_index = $(this).index();
		  		
		  		console.log(d_index);
		  		
		  		if (d_index == 0) return;

				var d_tr = $(this).closest('tr');
				var api = $(this).closest('table').DataTable();
		        var d_row = api.row( d_tr );
		  		var d_rowData = api.row($(this)).data();

				console.log(d_rowData);
				if (d_rowData.BASE_YM == undefined || d_rowData.BASE_YM == '')	return;
				
					commonVo.routeNm = d_rowData.ROUTE_NM;
					commonVo.baseYm = d_rowData.BASE_YM;
					
				ChatManager.btnView_emp(commonVo.baseYm,'',ChatManager.empTable);
		  	});
	
	
			// Add event listener for opening and closing second level child details
		    $('.child_table tbody').off().on('click', 'td.details-control1', function () {
				var c_tr = $(this).closest('tr');
				var api = $(this).closest('table').DataTable();
				console.log(api.row($(this)).data());
		        var c_row = api.row( c_tr );
		  		var c_rowData = api.row($(this)).data();
		  		//var c_rowData = api.row(this).data();
		  		var c_index = $(this).index();
		  		
				console.log(c_index);

		        if ( c_row.child.isShown() ) {
		            // This row is already open - close it
		            c_row.child.hide();
		            c_tr.removeClass('shown');
		        }
		        else {
					console.log(c_rowData);
					commonVo.routeNm = c_rowData.ROUTE_NM;
					commonVo.baseYm = c_rowData.BASE_YM;
		            // Open this row
		            c_row.child( 
				    	'<table id="child_details2' + commonVo.routeNm + commonVo.baseYm + '" class="child_table2 drivingAnal  cell-border nowrap" >'+  
//				    	'<table id="child_details2' + commonVo.routeNm + commonVo.baseYm + '" cellpadding="5" cellspacing="0" border="0" style="padding-left:27px;" class="child_table2 drivingAnal  cell-border nowrap" >'+  
					    '<thead><tr ><th></th><th>기준일</th><th>몰림</th><th>지연</th><th>위반합계</th><th>위반평균</th><th>위반비율</th></tr></thead>'+    
				    	'</table>').show();
			          
					var childTable_day = $('#child_details2'+ c_rowData.ROUTE_NM + c_rowData.BASE_YM).DataTable({
					    "columnDefs": [
					    	 {"className": "dt-right", "targets"  : [1]}
					    	,{"className": "dt-right", "targets"  : [2,3,4,5,6]}
					        ,{ targets: "_all" , render: render_up}
				        ],
				        columns: [
		    	    	 	{data: "ROUTE_NM"		,visible : false}
			    	    	,{data: "BASE_YMD"		,"width" : '143px'}
			    	    	,{data: "SUM_PAST"		,"width" : '100px'}
			    	    	,{data: "SUM_LATE"		,"width" : '100px'}
			    	    	,{data: "SUM_WIBAN"		,"width" : '100px'}
			    	    	,{data: "AVG_WIBAN"		,"width" : '100px'}
			    	    	,{data: "RATE_WIBAN"	,"width" : '100px'}
				        ],
			            destroy: true
			        });
       				ChatManager.btnView_day(childTable_day);
					ChatManager.btnView_emp(commonVo.baseYm,'',ChatManager.empTable);
			    	c_tr.addClass('shown');
			    	
						    				// Add event listener for opening and closing second level child details
					$('#child_details2'+ c_rowData.ROUTE_NM + c_rowData.BASE_YM).on('click','td', function() {
						var d_tr = $(this).closest('tr');
						var api = $(this).closest('table').DataTable();
				        var d_row = api.row( d_tr );
				  		var d_rowData = api.row($(this)).data();
				  		//var c_rowData = api.row(this).data();
				  		var d_index = $(this).index();
				  		
							commonVo.routeNm = d_rowData.ROUTE_NM;
							commonVo.baseYmd = d_rowData.BASE_YMD;
		
						console.log(d_rowData);
						ChatManager.btnView_detail();
						ChatManager.btnView_emp('',commonVo.baseYmd,ChatManager.empTable);
		
				  	});
			    	
			   	}
			});		
			
			
	    });



		height= $('.empCard0_2').height() - 50;
	    ChatManager.detailTable = $("#detailTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: true,
		     ordering: true,
		    "columnDefs": [
		        { targets: "_all" , render: render_detail}
	        ],
		    columns : [
    	    	 {data: "BASE_YMD"			,width:"10%"	,"className": "dt-center"}
    	    	,{data: "ROUTE_NM"			,width:"5%"		,"className": "dt-center"}
    	    	,{data: "EMP_NM"			,width:"5%"		,"className": "dt-center"}
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
		ChatManager.btnView_month = function (targetTable) {
			//var table = $(targetTable).DataTable();
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
			    	   targetTable.clear().draw();
					   targetTable.rows.add( result.data).draw(false);
					   //targetTable.columns.adjust().draw();  
					   ChatManager.routeTable.columns.adjust().draw();  
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}	    	
		ChatManager.btnView_day = function (targetTable) {
			//var table = $(targetTable).DataTable();
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
			    	   targetTable.clear().draw();
					   targetTable.rows.add( result.data).draw(false);
					   //targetTable.columns.adjust().draw();
					   ChatManager.routeTable.columns.adjust().draw();  
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}			
		ChatManager.btnView_emp = function (ym,ymd,targetTable) {
			//$('#title_emp').html(commonVo.routeNm +  ' ' + ym + ymd);
			
			//var table = $(targetTable).DataTable();
			commonVo.baseYm = ym;
			commonVo.baseYmd = ymd;
			var commonVoStr = ChatManager.setCommonVo('','select_PunctualityAnalize_emp','');
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
			    	   targetTable.clear().draw();
					   targetTable.rows.add( result.data).draw(false);
					   targetTable.columns.adjust().draw();
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

		ChatManager.btnView_empDetail = function () {
			var commonVoStr = ChatManager.setCommonVo('','select_PunctualityAnalize_empDetail','');
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
   		$('#routeTable').DataTable().clear();
   		$('#monthTable').DataTable().clear();
   		$('#dayTable').DataTable().clear();
   		$('#empTable').DataTable().clear();
   		$('#detailTable').DataTable().clear();
   	});
	$(document).on('click', '#btnView', function () {
		ChatManager.btnView_route();
	});
	

	$('#empTable').on('click','td', function() {
		var table = $('#empTable').DataTable();
		var row = table.cell(this).index().row;
		//var col = table.cell(this).index().column;

		commonVo.empNm = table.cell( row,1 ).data();
		ChatManager.btnView_empDetail();
	});	
	
/*	
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
*/
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