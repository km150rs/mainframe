var $objWindow;
/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();

 var ChatManager = null;
 var newColumns = [];
  
function render_queryResult(data,type,row,meta){

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	} else	if (meta.col == 1) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'khaki');
	} else {
	//    var colNm = meta.settings.aoColumns[meta.col].mData;
    	if (newColumns[meta.col].title.includes('일')  ) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid gray');
		}

		if (newColumns[meta.col].title.includes('평균')) {
				$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		} else {
			//var month = $('#baseYm').val().substr(5,2);		
	    	if (newColumns[meta.col].title.includes('-')  ) {
				$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
			}
		}		
	}
	if (meta.row>0 && (meta.row%2) == 1) {
		$(api.cell(meta.row, meta.col).node()).css('border-bottom', '1px solid gray');
		if (newColumns[meta.col].title.includes('토')  ) {
			
			var time = $('#edtBaseTime').val() + ':00';
			if (data > time) {
				$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');
				$(api.cell(meta.row, meta.col).node()).css('color', 'white');
			} else {
				$(api.cell(meta.row, meta.col).node()).css('background-color', 'skyblue');
				$(api.cell(meta.row, meta.col).node()).css('color', 'white');
			}
		}		
	}

    if (data == null || data == undefined || data == '')
    	return '-';

	return data;
} 
 
function render_avg(data,type,row,meta){

	var api = new $.fn.dataTable.Api(meta.settings);
	
	if (row.route_nm == '전체') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'lavender');
		return data;
	}
	
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}

	if (meta.col > 1 && row.route_nm != '전체') {
		return minToTime(data);
	}

    if (data == null || data == undefined || data == '')
    	return '-';

	return data;
} 
  
$( function() {
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#baseYm',
            format: 'yyyy-MM'
        }
    });
    	
	ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    
	    ChatManager.$comboRouteNm = $('#comboRouteNm');
	    ChatManager.avgTable = null;
	    
		ChatManager.btnAvg = function () {
			var commonVoStr = ChatManager.setCommonVo(true,'','getEmpWorkingTimeRouteAvg','');
			if (commonVoStr == null) return;
			$.ajax({
			       url : "/DynamicSqlFilter",
		    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        //global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   console.log(result);
			    	   ChatManager.avgTable.clear().draw();
					   ChatManager.avgTable.rows.add( result.data).draw(false);
					   
					   fn_sum_footer(result);
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
			
		}
	    
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryRouteNm = function () {
			var jsonString = ChatManager.setCommonVo(false,'','','');
			$.ajax({
			       url : "/BUS_getRouteNmInfo",
			      "data" : {strData : jsonString},
			       "dataSrc" : "",
			        //global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
			    	   //console.log(ret.data);
			    	   var size = ret.data.length;
			    	   var option = $("<option></option>");
			    	   ChatManager.$comboRouteNm.empty();
			    	   ChatManager.$comboRouteNm.append(option);
			    	   
			    	    for (var i = 0; i < size; i++) {
			    	    	var option = $("<option>"+ret.data[i].route_nm+"</option>");
			    	    	ChatManager.$comboRouteNm.append(option);
			    	    };
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
			    
		ChatManager.setCommonVo = function (bValidCheck,targetTable,filterType,filterText) {
			
			var baseYm = $('#baseYm').val();
			commonVo.routeNm = ChatManager.$comboRouteNm.val();

		    if (bValidCheck ) {
				if (commonVo.routeNm == '' || commonVo.routeNm == null) {
					swal('노선을 선택하세요');
					return null;
				}		
			}	

			commonVo.baseYm = baseYm;
			commonVo.checkDay = $('#edtCheckDay').val();
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo(true,'','','');
			if (commonVoString == null) return;
			$.ajax({
			       url : "/BUS_getEmpWorkingTimeView",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async:false,
			       dataType : 'json',
			       timeout : 30000,
			       success : function(ret) {	
						console.log(ret);
						newColumns[0] = {
		    	            'title': '기사명',
		    	            'data': 'EMP_NM',
		    	            'className': 'dt-center',
		    	            render : render_queryResult
		    	        }
						newColumns[1] = {
		    	            'title': 'SP',
		    	            'data': 'SP_GB',
		    	            'className': 'dt-center',
		    	            render : render_queryResult
		    	        }

						var dateArray = ret.header[0].DATELIST.split(',');
						var weekArray = ret.header[0].WEEKLIST.split(',');
						var title;
						for (var j = 0; j < dateArray.length; j++) {
							if (dateArray[j].substr(5,2) == commonVo.baseYm.substr(5,2))
								title = dateArray[j].substr(8,2) + '<br>' + weekArray[j];
							else title = dateArray[j].substr(5,5) + '<br>' + weekArray[j];
							
			    	        newColumns[j+2] = {
			    	            'title': title,
			    	            'data': 'd' + (j+1),
			    	            'className': 'dt-center',
			    	             render : render_queryResult
			    	        }
						}
						newColumns[j+2] = {
		    	            'title': '일수' + '<br>' + '평균',
		    	            'data': 'AVG',
		    	            'className': 'dt-center',
		    	            render : render_queryResult
		    	        }

						var newData = [];
						var colNm;
						for (var i = 0; i < ret.data.length; i++) {

							ret.data[i]['AVG'] = 0;
							var stepDataArray = ret.data[i].MINLIST.split(',');
							var tempData = Object.assign({}, ret.data[i]);
							var sumMin = 0;
							var sumMonthMin = 0;
							var monthCnt=0;
							
							for (var k = 0; k < stepDataArray.length; k++) {
								colNm = 'd'+ (k+1);
								if (stepDataArray[k] == 0)
									 ret.data[i][colNm] = '';
								else ret.data[i][colNm] = minToTime(stepDataArray[k]);

								// 주합계 구한뒤 토요일 하단에 표시
								sumMin += parseInt(stepDataArray[k]);
								if (weekArray[k] == '토') {
									tempData[colNm] = minToTime(sumMin);
									sumMin = 0;
								}
								// 월 누적 합계와 근무일수 합계
								if (dateArray[k].substr(5,2) == commonVo.baseYm.substr(5,2)) {
									if (parseInt(stepDataArray[k]) > 0) {
										monthCnt++;
										sumMonthMin += parseInt(stepDataArray[k]);
									}
								}
								//tempData[colNm] = stepDataArray[k];
							}
							if (monthCnt > 0) {
								ret.data[i]['AVG'] = monthCnt;
								tempData['AVG'] = minToTime(Math.round(sumMonthMin / monthCnt));
							}
							newData.push(ret.data[i]);
							newData.push(tempData);
						}

			    	    var height= $('.empInfo_2').height();
		    	        fn_setGridData('#exceltable',newColumns,newData,height,true);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
		
   	    var height2= $('.empInfo_1_b').height();
		ChatManager.avgTable  = $("#avgTable").DataTable({
			    "scrollY": height2,
		        scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        scrollX: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        ,{ targets: "_all" , render: render_avg}
	    		],
	    		//"initComplete" :fn_sum_footer,
		        columns : [
	    	    	{data: "route_nm"	,width:'10%'		},
	    	        {data: "emp_cnt"	,width:'10%'		},
	    	        {data: "tot_min" 	,width:'10%'		},
	    	        {data: "avg_min" 	,width:'10%'		}
			    ]
		});  
		
        
	    return ChatManager;
	}());
	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();
   		ChatManager.avgTable.clear().draw();

   		newColumns = [];  
   	});

	$(document).on('click', '#btnView', function () {
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();
   		ChatManager.avgTable.clear().draw();

   		newColumns = [];  

		ChatManager.btnAvg();
		ChatManager.btnView();
	});
	$('#edtBaseTime').change(function () {
		$('#exceltable').DataTable().rows().invalidate().draw(); 		
	})

/*	$('#edtCheckDay').change(function () {
		ChatManager.btnAvg(); 		
	})*/

	ChatManager.btnQueryRouteNm();
	//ChatManager.btnView();
});


function fn_setGridData(targetGrid,gridColumns, gridData,height,bSearch) {/*Function used to get all column names from JSON and bind the html table header*/  
    ////console.log(height);
    ////console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	if (height == null || height == undefined)
		height = gfn_calcDataTableHeight;

	if (bSearch == null || bSearch == undefined)
		bSearch = true;
				
	var resultTable = $(targetGrid).DataTable({
		destroy : true,
		dom: 'lBfrti',
		//orderCellsTop: true, //https://live.datatables.net/gejojiqu/1251/edit
	    scrollCollapse: true,
	    "scrollY": height,
	    //paging: false,
	    scrollX : true,
//	    order : [[0,'desc']],
		rowsGroup: [0,1],
		columns: gridColumns,
	//	ordering: true,
		//"deferRender":true,
		//autoWidth: true,
/*		   scroller: {
        loadingIndicator: true
    },*/
        "searching": bSearch,
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
	resultTable.columns.adjust().draw();  
}  

/*
 * 금액 합계 footer 
 */
function fn_sum_footer (result) {
/*	
	document.getElementById("avgTable").deleteTFoot();

	// Find a <table> element with id="myTable":
	var table = document.getElementById("avgTable");
	
	// Create an empty <tfoot> element and add it to the table:
	var footer = table.createTFoot();
	
	// Create an empty <tr> element and add it to the first position of <tfoot>:
	var row = footer.insertRow(0);     
	
	// Insert a new cell (<td>) at the first position of the "new" <tr> element:
	//var cell = row.insertCell(0);
		
	// Add some bold text in the new cell:
	//cell.innerHTML = "<b>This is a table footer</b>";
*/

	var copyRow = ChatManager.avgTable.row(0).data();

	console.log(copyRow);
	//var footData = new Object();	

	var api = $('#avgTable').dataTable().api();
	var exp1 = /(avg_min)/;

    let intVal = function (i) {
        return typeof i === 'string'
            ? i.replace(/[\$,]/g, '') * 1
            : typeof i === 'number'
            ? i
            : 0;
    };

	//var i=0;
	var numFormat = $.fn.dataTable.render.number(',').display;
	 
	for (var i=0;i < result.header.length; i++) {
		var data=result.header[i];
		//if (data.visible == false)	continue;
		console.log(data);
		var key = data.COLUMN_NAME;
		//var cell = row.insertCell(i);
		if (exp1.test(key)) {
	        var total = api.column(i).data().reduce((a, b) => intVal(a) + intVal(b), 0);
	        
	        total = total / result.data.length;
       		copyRow[key] = minToTime(total);

			//footDatacell.innerHTML = '<b style="font-size:16px;background:lavender; text-align: center">' + minToTime(total) + '</b>';

		} else if (key == 'emp_cnt') {
	        var total = api.column(i).data().reduce((a, b) => intVal(a) + intVal(b), 0);
			//cell.innerHTML = '<b style="font-size:16px;background:lavender; text-align: center">' + numFormat(total) + '</b>';
			copyRow[key] = numFormat(total);
			
		} else if (key == 'route_nm') {
			//cell.innerHTML = '<b style="background:lavender; text-align: center">전체</p>';
			copyRow[key] = '전체';
		} else {
			//cell.innerHTML = '<b style="background:lavender; text-align: center">-</b>';
			copyRow[key] = '-';
		}
				
	} 

	ChatManager.avgTable.row.add(copyRow).draw();
	
}		