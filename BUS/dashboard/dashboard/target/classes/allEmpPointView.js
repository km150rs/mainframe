var $objWindow;
/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();

 var ChatManager = null;
 var newColumns = [];
 var newData ;
 
function render_result(data,type,row,meta){
    var colNm = meta.settings.aoColumns[meta.col].mData;
	var api = new $.fn.dataTable.Api(meta.settings);
	
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'khaki');
		//return '<div id="wrapper">    <div class="circle">' + data + '</div></div>';
	} else if (meta.col == 2 || meta.col == 3) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	} else if (meta.col == 4) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'wheat');
	}
	if (colNm.includes('d')) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'lightcyan');
	}
	// 칭찬,표창은 없으면 '-'로 표시
	if (meta.col == 20 || meta.col == 19) {
		if (data == 0)
			return '-';
	}
	if (colNm == 'TOT_POINT') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
		data = $.fn.dataTable.render.number(',','.',1).display(data);
		return data;
	}
	if (colNm == 'TOTWORKINGDAY') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'wheat');
			
		if (ChatManager.$comboEnterDate.val() == 0)
			return cal_year(data)	;
		
		var html = 	'<div> ' + cal_year(data) + '<progress value="' + data + '" max="8000"></progress></div>';	
		return html;
		
	}

    if (data == null || data == undefined || data == '')
    	return '-';

	return data;
} 
  
$( function() {
	var now = new Date();
	var yearStart = new Date(now.setMonth(now.getMonth() - now.getMonth()));	// 한달 전
		
    var calMonthKo = new tui.DatePicker('#datepicker-month-from', {
        date: yearStart,
        language: 'ko',
        type:'month',
        input: {
            element: '#from',
            format: 'yyyy-MM'
        }
    });
   	var calMonthKo = new tui.DatePicker('#datepicker-month-to', {
        date: new Date(),
        language: 'ko',
        type:'month',
        input: {
            element: '#to',
            format: 'yyyy-MM'
        }
    });

	ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    
	    ChatManager.$comboRouteNm = $('#comboRouteNm');
	    ChatManager.$comboEnterDate = $('#comboEnterDate');

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

		/*
		 * 인사평가자료 구축
		 */
	    ChatManager.btnMake = function () {
			var commonVoString = ChatManager.setCommonVo(false,'','','');
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
			    
		ChatManager.setCommonVo = function (bValidCheck,targetTable,filterType,filterText) {
			var spgb = $('input[name="spGb"]:checked').val();

			var baseFrom = $('#from').val();
			var baseTo = $('#to').val();
			commonVo.routeNm = ChatManager.$comboRouteNm.val();
			commonVo.dayValue = ChatManager.$comboEnterDate.val();

		    /*if (bValidCheck ) {
				if (commonVo.routeNm == '' || commonVo.routeNm == null) {
					swal('노선을 선택하세요');
					return null;
				}		
			}	*/

			commonVo.fromDate = baseFrom + '-01';
			commonVo.toDate = baseTo + '-31';
			
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = spgb;
			return JSON.stringify (commonVo);
		}
		/*
		 * 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo(true,'','select_TBM_EMP_POINT_INFO','');
			if (commonVoString == null) return;
			$.ajax({
			       url : '/DynamicSqlFilterMybatis' ,
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async:false,
			       dataType : 'json',
			       timeout : 30000,
			       success : function(ret) {	
						var checkEnterDate = ChatManager.$comboEnterDate.val();
						console.log(ret);
					   	if (ret.data.length ==0 ) {
							swal ('해당 기준월(From~To) 인사평가자료가 없습니다. 생성후 조회하세요');   
						   return;
						}
						newData = ret;
												
						var p=0;
						newColumns[p++] = {
		    	            'title': 'No.',
		    	            'data': 'SEQ',
		    	            'className': 'dt-center',
		    	            render : render_result
		    	        }
						newColumns[p++] = {
		    	            'title': '기사명',
		    	            'data': 'EMP_NM',
		    	            'className': 'dt-center',
		    	            render : render_result
		    	        }
						newColumns[p++] = {
		    	            'title': '생년',
		    	            'data': 'BIRTH_YEAR',
		    	            'className': 'dt-center',
		    	            render : render_result
		    	        }
						newColumns[p++] = {
		    	            'title': 'SP',
		    	            'data': 'SP_GB',
		    	            'className': 'dt-center',
		    	            render : render_result
		    	        }
						newColumns[p++] = {
		    	            'title': '노선',
		    	            'data': 'ROUTE_NM',
		    	            'className': 'dt-center',
		    	            render : render_result
		    	        }
						newColumns[p++] = {
		    	            'title': '근속년차',
		    	            'data': 'TOTWORKINGDAY',
		    	            'className': 'dt-right',
		    	            render : render_result
		    	        }
						newColumns[p++] = {
		    	            'title': '총점',
		    	            'data': 'TOT_POINT',
		    	            'className': 'dt-center',
		    	            render : render_result
		    	        }

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
			    	            'className': 'dt-center'
			    	        }
						}

						var expDecimalCol = /(위험운전지수|배차정시성|근무협조도)/;
						var colNm;
						var cntValue;
						var pointValue;
						for (var i = 0; i < ret.data.length; i++) {

							var maxArray = ret.data[i].MAXLIST.split('/');
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
								
								if (checkEnterDate > 0) {
									if (pointValue == 0)
										 ret.data[i][colNm] = '0';
									else ret.data[i][colNm] = (1.0 * pointValue / maxArray[k]) * 100.0;
								} else {
									if (pointValue == 0)
										 ret.data[i][colNm] = '0';
									else ret.data[i][colNm] = pointValue;
	
									if (cntValue != 0)
										 ret.data[i][colNm] = ret.data[i][colNm] + '(' + cntValue + ')';
								}
							}
						}

			    	    var height= $('.empInfo_1').height();
		    	        fn_setGridData('#exceltable',newColumns,ret.data,height,true);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
		
	    return ChatManager;
	}());
	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();

   		newColumns = [];  
   	});

	$(document).on('click', '#btnMake', function () {
		ChatManager.btnMake();
   	});

	$(document).on('click', '#btnView', function () {
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();

   		newColumns = [];  

		ChatManager.btnView();
	});

	
	// 근태종류설정
	$(document).on('click', '#btnPointManage', function () {
		fnMdiOpen2('항목별 배점기준표','commonCode_','/monitor/popupPointManage.html', 700, 500); // 이게 더 크게	
	});	


	// 기사 클릭시
	$('#exceltable').on('click','td', function() {
		var table = $('#exceltable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		//var empNm = table.cell( row,1 ).data();
		fnMdiOpen2('인사평가 항목별 분포','commonCode_','/monitor/popupChart1.html?row='+row, 700, 500,row); // 이게 더 크게	

	});	


/*	$('input[name="search_type"]').change(function() {
        var value = $(this).val();              // value
        if(value == 'time')
	            $('#edtBaseTime').val('52');
        else
	            $('#edtBaseTime').val('109');
	});
*/
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

	var checkEnterDate = ChatManager.$comboEnterDate.val();

	var renderOption ;
	if (checkEnterDate > 0) {
		renderOption =[ 
/*
string square as default or round for a rounded bar.
string A hex color for the text.
string A hex color for the border.
string A hex color for the bar.
string A hex color for the background.
integer A number used to round the value.
string A border style, default=ridge (solid, outset, groove, ridge)
*/			
			 //{targets: 7,render: null} 
			 {targets: 7,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid'  )} 
			,{targets: 8,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid'  )} 
			,{targets: 9,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:10,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:11,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:12,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:13,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:14,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:15,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:16,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:17,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:18,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:19,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
			,{targets:20,render: DataTable.render.percentBar( 'round','gray', '#fff', '#FF9CAB', '#fff', 0, 'solid' )} 
	    ];		
	} else {
		renderOption = [];
	}			
	var resultTable = $(targetGrid).DataTable({
		destroy : true,
		dom: 'lBfrti',
		//orderCellsTop: true, //https://live.datatables.net/gejojiqu/1251/edit
	    scrollCollapse: true,
	    "scrollY": height,
	    //paging: false,
	    scrollX : true,
	    order : [[0,'asc']],
		//rowsGroup: [0,1],
		columns: gridColumns,
	    columnDefs: renderOption,		
		ordering: true,
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



//분류코드
function fnMdiOpen2 (title,uniqueKey,url, w_width,w_height,row) {
	var iframName = "iframe_pointChart";  //uniqueKey;

	var child = document.getElementById(iframName);
	if (child != null) {
		console.log('dup child');
		
		child.contentWindow.postMessage(row, '*');
		return;
	}
	
	
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
        modal:false,
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
function cal_year(day)
{
    var cYear = parseInt(day / 365);
    var cMonth = parseInt((day % 365)/30);

	if (cYear > 0)
		return  cYear + '년 ' + (cMonth > 0? (cMonth + '개월') : '' );
	else return cMonth + '개월' ;
}
