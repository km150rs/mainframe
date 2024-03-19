/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var regex2 = /[*!\@]/;
 var OFFDAY_SET_CHAR = '@';
 var BEFORE_SET_CHAR = '*';
 var AFTER_SET_CHAR  = '-';
 var NOEMP_SET_CHAR  = '!';
 var SPOTHER_SET_CHAR  = '#';
 var ALLOCATE_BIT_COLUMN = 34;
 var commonVo =  new Object();
 var lineGubunColumn = 3;
 let columnMap = new Map([
	 ['no'              ,'no']
	,['bit'              ,'bit']
	,['car_no'           ,'차량번호']
	,['car_subno'        ,'보조코드']
	,['car_regno'        ,'차량번호']	
	,['emp_nm'           ,'기사']
	,['prev_daily_seq'        ,'전월순번']
	,['prev_work_pattern'   ,'전월근무<br>패턴']
]);

var tabTitle = $( "#tab_title" ),
tabContent = $( "#tab_content" ),
tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
tabCounter = 1;


/*
 * grid에 국기/프로그레스바 추가시 
 * https://datatables.net/examples/basic_init/data_rendering.html 
 */

function render_arrangeStatus_popup(data,type,row,meta){
	if (meta.col < 2) {
		var html = '<span2>' + data + '</span2>';
		return html;
	}
	return data;
}

function render_tab1(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.row % 2 == 0) {
			
			$(api.cell(meta.row, meta.col).node()).css('border-top', 'thin dashed gray');
	}    
	if (meta.col <= 1) {
		//$(api.cell(meta.row, meta.col).node()).css('background-color', 'black');
		//$(api.cell(meta.row, meta.col).node()).css('color', 'white');
		//return iData;
	}
	
	return data;
}

function render_tab2(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col <= 1) {
		//$(api.cell(meta.row, meta.col).node()).css('background-color', 'black');
		//$(api.cell(meta.row, meta.col).node()).css('color', 'white');
		//return iData;
	}
	
	return data;
}

function render_QueryResultBasic(data,type,row,meta){

	//ar iData = data.toString();
	//if (row.item_cd == '') {
	//	return '';
	//}
		
	//console.log(meta.settings.aoColumns[meta.col].className);
    if (data == null || data == undefined )
    	return;
	//var basicTable = $('#QueryResultGridBasic').DataTable();
	var api = new $.fn.dataTable.Api(meta.settings);
	try {
		var week = api.cell(0, meta.col).data();
		if (week.toString().includes('월') || meta.col == lineGubunColumn ) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
			
		}
		
	} catch (exception ) {
		return data;
	}

	//cell span 영역
	if (meta.col == 0 && meta.row>=1) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', '#ece8da');
		$(api.cell(meta.row, meta.col).node()).css('color', 'black');
		//return iData;
	}
	//cell span 영역
	if (meta.row==0) {
		if (data.toString().includes('Y') || data.toString().includes('일')) {
			$(api.cell(meta.row, meta.col).node()).css('background-color', 'skyblue');
			$(api.cell(meta.row, meta.col).node()).css('color', 'red');
			data = data.replace('Y','');
			
			var html = 	'<span data-toggle="tooltip" title="' + data.substr(1) + '">' + data.substr(0,1) + '</span>';	
			return html;		
		} else if (data.toString().includes('토')) {
			$(api.cell(meta.row, meta.col).node()).css('background-color', 'skyblue');
			$(api.cell(meta.row, meta.col).node()).css('color', 'yellow');
			data = data.replace('Y','');
			
			var html = 	'<span data-toggle="tooltip" title="' + data.substr(1) + '">' + data.substr(0,1) + '</span>';	
			return html;		
		} else {
			$(api.cell(meta.row, meta.col).node()).css('background-color', '#ece8da');
			
		}
		//return iData;
	}	
	//배차미지정
	if (meta.row == 4 && meta.col >= lineGubunColumn) {
		if (data > 0)
			$(api.cell(meta.row, meta.col).node()).css('background-color', '#ece8da');
		else 
			$(api.cell(meta.row, meta.col).node()).css('background-color', '');
		//return iData;
	}	
	return data;
}

function render_QueryResult_Detail(data,type,row,meta){
    if (data == null || data == undefined )
    	return;
	var iData = data.toString();
	
	var tooltipText = '';
	if (iData.includes(BEFORE_SET_CHAR))	tooltipText = tooltipText + '/휴무';
	if (iData.includes(NOEMP_SET_CHAR))	tooltipText = tooltipText + '/고정기사없음';
	if (iData.includes(AFTER_SET_CHAR))	tooltipText = tooltipText + '/배차완료';
	if (iData.includes(OFFDAY_SET_CHAR))	tooltipText = tooltipText + '/휴가';
	/*var lastChar = iData.substr(-1);
	if (regex2.test(lastChar)) {
		iData = iData.replace(lastChar,'<br>'+lastChar);
		//console.log(data + ' :' + iData);
	}*/

	
	
	//console.log(iData);
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col != ALLOCATE_BIT_COLUMN) {
		var basicTable = $('#QueryResultGridBasic').DataTable();
		var week = basicTable.cell(0, meta.col).data();
		if (week.toString().includes('월') || meta.col ==lineGubunColumn) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
		}
	}

	if ( row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}

	if (meta.col == 0 && row.dispatch_seq > 6) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');
	}

	if (meta.row % 2 == 0) {
		$(api.cell(meta.row, meta.col).node()).css('border-top', 'thin dashed gray');
	}    
	
	//근무일수 backcolor = gray
	if (meta.col <= 2) {
	} else if( meta.col >= lineGubunColumn && iData.includes(BEFORE_SET_CHAR)){
		//휴식
		$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'white');		
		return '휴무'
	} else if( meta.col >= lineGubunColumn && iData.includes(OFFDAY_SET_CHAR)){
		//휴식
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'white');		
		return '휴가'
	} else if( meta.col >= lineGubunColumn && iData.includes(NOEMP_SET_CHAR)){
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'white');		
		return '미지정'
	} else if( meta.col >= lineGubunColumn && iData.includes('input')){
	} else {
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	}


	//var zData = data.toString().replace(/(^0+)/, ""); // 좌측 0 제거
	//zData= 	zData.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return data;
}

function render_QueryResult_Detail2(data,type,row,meta){
    if (data == null || data == undefined )
    	return;
	var iData = data.toString();
	
	
	//console.log(iData);
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col != ALLOCATE_BIT_COLUMN) {
		var basicTable = $('#QueryResultGridBasic2').DataTable();
		var week = basicTable.cell(0, meta.col).data();
		if (week == '월' || meta.col ==lineGubunColumn) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
		}
	}	
	//근무일수 backcolor = gray
	
	if( row.ampm_gubun.includes('오전')){
		//휴식
		$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'black');		
	} else {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'skyblue');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'black');		
	}


	//var zData = data.toString().replace(/(^0+)/, ""); // 좌측 0 제거
	//zData= 	zData.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return data;
}

function render_QueryResult_SP(data,type,row,meta){
    if (data == null || data == undefined )
    	return;
	var iData = data.toString();;
	
	
	var api = new $.fn.dataTable.Api(meta.settings);

	if (meta.col < ALLOCATE_BIT_COLUMN) {
		var basicTable = $('#QueryResultGridBasic').DataTable();
		var week = basicTable.cell(0, meta.col).data();
		if (week.toString().includes('월') || meta.col ==lineGubunColumn) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
		}
	}
	if ( row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}

	if (meta.col == 0 && row.dispatch_seq > 6) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');
	}

	if (meta.col <= 2) {
	} else if( meta.col >= lineGubunColumn && iData.includes(SPOTHER_SET_CHAR)){
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'pink');
		return '타-' + iData;		
	} else if( meta.col >= lineGubunColumn && iData.includes(BEFORE_SET_CHAR)){
		//휴식
		$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'white');		
		return '휴무'
	} else if( meta.col >= lineGubunColumn && iData.includes(OFFDAY_SET_CHAR)){
		//휴식
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'white');		
		return '휴가'
	} else if( meta.col >= lineGubunColumn && iData.trim() == '') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	}
	return data;
}


$( function() {
/*	$("#baseYm").val("");
    var baseYm = $('#baseYm');
		baseYm.inputmask(
		    "9999-99"
		);
*/		
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#baseYm',
            format: 'yyyy-MM'
        }
    });
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
		ChatManager.tbm_arrangeStatus_popup = null;
	    ChatManager.$group = $('#group');
	    ChatManager.BasicTable = null;
	    ChatManager.DetailTable = null;
	    ChatManager.BasicTable2 = null;
	    ChatManager.DetailTable2 = null;
	    ChatManager.SPTable =null;
				    
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryGroup = function () {
			var jsonString = ChatManager.setParamVo(false,'',true);
			$.ajax({
			       url : "/BUS_getRouteNmInfo",
			      "data" : {strData : jsonString},
			       "dataSrc" : "",
			        global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
			    	   console.log(ret.data);
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
	    ChatManager.checkinvalid = function checkinvalid() {
			var baseYmd = $('#baseYm').val();
			var routeNm = ChatManager.$group.val();
			
		    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
				return null;
			}
		    if (routeNm == null || routeNm == undefined || routeNm == '') {
				return null;
			}
			return 'ok';
		}
	    ChatManager.setParamVo = function setParamVo(bValidCheck,filterType,bIncludeHeader) {
			commonVo.filterType = filterType;
			commonVo.routeNm = ChatManager.$group.val();
			commonVo.includeHeader = bIncludeHeader;
			commonVo.offIncludeYn = 'N';

			var baseYmd = $('#baseYm').val();
			if (bValidCheck) {
			    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
					swal('기준월을 입력하세요');
					return null;
				}
			    if (commonVo.routeNm == null || commonVo.routeNm == undefined || commonVo.routeNm == '') {
					swal('노선번호를 선택하세요');
					return null;
				}
			}
			
			commonVo.baseYm = baseYmd;
			//commonVo.baseYm = commonVo.baseYm.replace(/\D+/g, '');
			//var jsonString = JSON.stringify (commonVo);
			return JSON.stringify (commonVo);
		}


	    /*
	    *  고정기사별  조회
	    */	    
	    ChatManager.btnSelect = function btnSelect(bPatternShow,nInitSeq) {
			//if (nInitSeq == 0) {
				//ChatManager.btnQueryInitSeq();
			//}	 	    
	 	    commonVo.initSeq = nInitSeq;
	 	    
			var jsonString = ChatManager.setParamVo(true,'',true);
			//console.log(jsonString);
			if (jsonString == null) return;
			$('.pjy_table_fixed').css('visibility', 'visible');
//			$( "#tabs" ).tabs( "option", "active", 0);	// last tab
	    	$.ajax({
	    	    url : "/BUS_ViewMonthArrange",
	    	   "data" : 
				   {strData : jsonString},
	    	    "dataSrc" : "",
	    	    async : false,
	    	     //global: false, // 추가
	    	    dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {	
	    	 	    
	    	 	   	if (ret.data2.length <= 0) {
							$('#btnInit').prop('disabled', false);

							swal("자료가 존재하지 않습니다");
							return;
					}
	    	 	   	
	    	 	    ChatManager.BasicTable.clear();
	    	 	    ChatManager.BasicTable.rows.add( ret.data2 ).draw( );
	    	 	    ChatManager.BasicTable.rows.add( ret.data ).draw( );
					ChatManager.setColumnVisible (ret);

	    	 	   
	    	 	    ChatManager.DetailTable.clear();
	    	 	    ChatManager.DetailTable.rows.add( ret.data3 ).draw( );
	    			
	    	 	    
	    	 	    ChatManager.SPTable.clear();
	    	 	    ChatManager.SPTable.rows.add( ret.data4 ).draw( );

					ChatManager.sumEmpTotWorkCount(ChatManager.DetailTable);
					ChatManager.sumEmpTotWorkCount(ChatManager.SPTable);
					
	    	 	    //ChatManager.checkArrangeStatus();

					var colCount = ChatManager.DetailTable.columns(':visible').count();
					for (var i=3; i< colCount; i++) {
						ChatManager.sumDailyAllocateCount(ChatManager.BasicTable,ChatManager.DetailTable,i);
					}
		
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }

	    /*
	    *  고정기사별  조회
	    */	    
	    ChatManager.btnNaver = function btnNaver() {
	 	    
	    	$.ajax({
	    	    url : "/naver-login",
	    	    "dataSrc" : "",
	    	    async : false,
	    	     //global: false, // 추가
	    	    dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {	
	    	 	   swal('ok');
		
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }
	    /*
	    *  오전오후별  조회
	    */	    
	    ChatManager.btnSelect2 = function btnSelect2(bPatternShow,nInitSeq) {
			//if (nInitSeq == 0) {
			//	ChatManager.btnQueryInitSeq();
			//}	 	    
	 	    commonVo.initSeq = nInitSeq;
	 	  
			$('.pjy_table_fixed').css('visibility', 'visible');
	 	    
			var jsonString = ChatManager.setParamVo(true,'',true);
			//console.log(jsonString);
			if (jsonString == null) return;
	    	$.ajax({
	    	    url : "/BUS_ViewMonthArrange_ampm",
	    	   "data" : 
				   {strData : jsonString},
	    	    "dataSrc" : "",
	    	    async : false,
	    	     global: false, // 추가
	    	    dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {	
	    	 	    
	    	 	   	if (ret.data2.length <= 0) {
							$('#btnInit').prop('disabled', false);

							swal("자료가 존재하지 않습니다");
							return;
					}
	    	 	   	
	    	 	    ChatManager.BasicTable2.clear();
	    	 	    ChatManager.BasicTable2.rows.add( ret.data2 ).draw( );
	    	 	    ChatManager.BasicTable2.rows.add( ret.data ).draw( );
					ChatManager.setColumnVisible2 (ret);

	    	 	   
	    	 	    ChatManager.DetailTable2.clear();
	    	 	    ChatManager.DetailTable2.rows.add( ret.data3 ).draw( );
	    			ChatManager.DetailTable2.rowsgroup.update();
					ChatManager.sumEmpTotWorkCount(ChatManager.DetailTable2);
					
	    	 	    //ChatManager.checkArrangeStatus();

					var colCount = ChatManager.DetailTable2.columns(':visible').count();
					for (var i=3; i< colCount; i++) {
						ChatManager.sumDailyAllocateCount(ChatManager.BasicTable2,ChatManager.DetailTable,i);
					}
		
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }

	    /*
	    *  승무지시서 템플릿등록
	    */	    
	    ChatManager.btnExcelTemplete = function () {
			fnMdiOpen('승무지시서 템플릿등록','templete','/monitor/popupOrderTempleteInfo.html' , 875,600); // 이게 더 크게	
	    }
		ChatManager.setColumnVisible = function (ret) {
			if (ret.data[0].d29 == 0) {
    			ChatManager.BasicTable.column( 31 ).visible( false );
    			ChatManager.DetailTable.column( 31 ).visible( false );
    			ChatManager.SPTable.column( 31 ).visible( false );
		    } else {
    			ChatManager.BasicTable.column( 31 ).visible( true );
    			ChatManager.DetailTable.column( 31 ).visible( true );				
    			ChatManager.SPTable.column( 31 ).visible( true );
			}
			if (ret.data[0].d30 == 0) {
    			ChatManager.BasicTable.column( 32 ).visible( false );
    			ChatManager.DetailTable.column( 32 ).visible( false );
    			ChatManager.SPTable.column( 32 ).visible( false );
		    } else {
    			ChatManager.BasicTable.column( 32 ).visible( true );
    			ChatManager.DetailTable.column( 32 ).visible( true );
    			ChatManager.SPTable.column( 32 ).visible( true );
			}
			if (ret.data[0].d31 == 0) {
    			ChatManager.BasicTable.column( 33 ).visible( false );
    			ChatManager.DetailTable.column( 33 ).visible( false );
    			ChatManager.SPTable.column( 33 ).visible( false );
		    } else {
    			ChatManager.BasicTable.column( 33 ).visible( true );
    			ChatManager.DetailTable.column( 33 ).visible( true );
    			ChatManager.SPTable.column( 33 ).visible( true );
			}		    		  
		    for (var i =0; i<7;i++) {
				$(ChatManager.BasicTable.cell(i, 0).node()).attr('colspan','3');
  				$(ChatManager.BasicTable.cell(i, 1).node()).css('display','none');
  				$(ChatManager.BasicTable.cell(i, 2).node()).css('display','none');
			}  
		}
		
		ChatManager.setColumnVisible2 = function (ret) {
			if (ret.data[0].d29 == 0) {
    			ChatManager.BasicTable2.column( 31 ).visible( false );
    			ChatManager.DetailTable2.column( 31 ).visible( false );
		    } else {
    			ChatManager.BasicTable2.column( 31 ).visible( true );
    			ChatManager.DetailTable2.column( 31 ).visible( true );				
			}
			if (ret.data[0].d30 == 0) {
    			ChatManager.BasicTable2.column( 32 ).visible( false );
    			ChatManager.DetailTable2.column( 32 ).visible( false );
		    } else {
    			ChatManager.BasicTable2.column( 32 ).visible( true );
    			ChatManager.DetailTable2.column( 32 ).visible( true );
			}
			if (ret.data[0].d31 == 0) {
    			ChatManager.BasicTable2.column( 33 ).visible( false );
    			ChatManager.DetailTable2.column( 33 ).visible( false );
		    } else {
    			ChatManager.BasicTable2.column( 33 ).visible( true );
    			ChatManager.DetailTable2.column( 33 ).visible( true );
			}		    		  
		    for (var i =0; i<7;i++) {
				$(ChatManager.BasicTable2.cell(i, 0).node()).attr('colspan','3');
  				$(ChatManager.BasicTable2.cell(i, 1).node()).css('display','none');
  				$(ChatManager.BasicTable2.cell(i, 2).node()).css('display','none');
			}  
		}		
	    ChatManager.BasicTable = $("#QueryResultGridBasic").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 127,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResultBasic }
		        ],
		    columns : [
    	    	 {data: "car_regno"		,width:"5%"}
    	    	,{data: "emp_nm"		,width:"3%"}
    	    	,{data: "tot_work_date"	,width:"2%"}
	 	    	,{data: "d1"		,width:"2%"}
	 	    	,{data: "d2"		,width:"2%"}
	 	    	,{data: "d3"		,width:"2%"}
	 	    	,{data: "d4"		,width:"2%"}
	 	    	,{data: "d5"		,width:"2%"}
	 	    	,{data: "d6"		,width:"2%"}
	 	    	,{data: "d7"		,width:"2%"}
	 	    	,{data: "d8"		,width:"2%"}
	 	    	,{data: "d9"		,width:"2%"}
	 	    	,{data: "d10"		,width:"2%"}
	 	    	,{data: "d11"		,width:"2%"}
	 	    	,{data: "d12"		,width:"2%"}
	 	    	,{data: "d13"		,width:"2%"}
	 	    	,{data: "d14"		,width:"2%"}
	 	    	,{data: "d15"		,width:"2%"}
	 	    	,{data: "d16"		,width:"2%"}
	 	    	,{data: "d17"		,width:"2%"}
	 	    	,{data: "d18"		,width:"2%"}
	 	    	,{data: "d19"		,width:"2%"}
	 	    	,{data: "d20"		,width:"2%"}
	 	    	,{data: "d21"		,width:"2%"}
	 	    	,{data: "d22"		,width:"2%"}
	 	    	,{data: "d23"		,width:"2%"}
	 	    	,{data: "d24"		,width:"2%"}
	 	    	,{data: "d25"		,width:"2%"}
	 	    	,{data: "d26"		,width:"2%"}
	 	    	,{data: "d27"		,width:"2%"}
	 	    	,{data: "d28"		,width:"2%"}
	 	    	,{data: "d29"		,width:"2%"}
	 	    	,{data: "d30"		,width:"2%"}
	 	    	,{data: "d31"		,width:"2%"}		     
	 	    ]
		});	
				
	    ChatManager.BasicTable2 = $("#QueryResultGridBasic2").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 127,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResultBasic }
		        ],
		    columns : [
    	    	 {data: "car_regno"		,width:"5%"}
    	    	,{data: "emp_nm"		,width:"3%"}
    	    	,{data: "tot_work_date"	,width:"2%"}
	 	    	,{data: "d1"		,width:"2%"}
	 	    	,{data: "d2"		,width:"2%"}
	 	    	,{data: "d3"		,width:"2%"}
	 	    	,{data: "d4"		,width:"2%"}
	 	    	,{data: "d5"		,width:"2%"}
	 	    	,{data: "d6"		,width:"2%"}
	 	    	,{data: "d7"		,width:"2%"}
	 	    	,{data: "d8"		,width:"2%"}
	 	    	,{data: "d9"		,width:"2%"}
	 	    	,{data: "d10"		,width:"2%"}
	 	    	,{data: "d11"		,width:"2%"}
	 	    	,{data: "d12"		,width:"2%"}
	 	    	,{data: "d13"		,width:"2%"}
	 	    	,{data: "d14"		,width:"2%"}
	 	    	,{data: "d15"		,width:"2%"}
	 	    	,{data: "d16"		,width:"2%"}
	 	    	,{data: "d17"		,width:"2%"}
	 	    	,{data: "d18"		,width:"2%"}
	 	    	,{data: "d19"		,width:"2%"}
	 	    	,{data: "d20"		,width:"2%"}
	 	    	,{data: "d21"		,width:"2%"}
	 	    	,{data: "d22"		,width:"2%"}
	 	    	,{data: "d23"		,width:"2%"}
	 	    	,{data: "d24"		,width:"2%"}
	 	    	,{data: "d25"		,width:"2%"}
	 	    	,{data: "d26"		,width:"2%"}
	 	    	,{data: "d27"		,width:"2%"}
	 	    	,{data: "d28"		,width:"2%"}
	 	    	,{data: "d29"		,width:"2%"}
	 	    	,{data: "d30"		,width:"2%"}
	 	    	,{data: "d31"		,width:"2%"}		     
	 	    ]
		});					
	    ChatManager.DetailTable = $("#QueryResultGridDetail").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 1000,
		   rowsGroup: [0],
    	    scrollCollapse: true,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResult_Detail }
	        ],
		    select : true,
		    columns : [
    	    	 {data: "car_regno"		,width:"5%"}
    	    	,{data: "emp_nm"		,width:"3%"}
    	    	,{data: "tot_work_date"	,width:"2%"}
	 	    	,{data: "d1"		,width:"2%"}
	 	    	,{data: "d2"		,width:"2%"}
	 	    	,{data: "d3"		,width:"2%"}
	 	    	,{data: "d4"		,width:"2%"}
	 	    	,{data: "d5"		,width:"2%"}
	 	    	,{data: "d6"		,width:"2%"}
	 	    	,{data: "d7"		,width:"2%"}
	 	    	,{data: "d8"		,width:"2%"}
	 	    	,{data: "d9"		,width:"2%"}
	 	    	,{data: "d10"		,width:"2%"}
	 	    	,{data: "d11"		,width:"2%"}
	 	    	,{data: "d12"		,width:"2%"}
	 	    	,{data: "d13"		,width:"2%"}
	 	    	,{data: "d14"		,width:"2%"}
	 	    	,{data: "d15"		,width:"2%"}
	 	    	,{data: "d16"		,width:"2%"}
	 	    	,{data: "d17"		,width:"2%"}
	 	    	,{data: "d18"		,width:"2%"}
	 	    	,{data: "d19"		,width:"2%"}
	 	    	,{data: "d20"		,width:"2%"}
	 	    	,{data: "d21"		,width:"2%"}
	 	    	,{data: "d22"		,width:"2%"}
	 	    	,{data: "d23"		,width:"2%"}
	 	    	,{data: "d24"		,width:"2%"}
	 	    	,{data: "d25"		,width:"2%"}
	 	    	,{data: "d26"		,width:"2%"}
	 	    	,{data: "d27"		,width:"2%"}
	 	    	,{data: "d28"		,width:"2%"}
	 	    	,{data: "d29"		,width:"2%"}
	 	    	,{data: "d30"		,width:"2%"}
	 	    	,{data: "d31"		,width:"2%"}		     
	 	    	,{data: "bit"		,visible : false}		     
	 	    ] 		        
		});	

	    ChatManager.DetailTable2 = $("#QueryResultGridDetail2").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 1000,
    	    scrollCollapse: true,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResult_Detail2 }
	        ],
	        dom: '<"top"i>rt<"bottom"flp><"clear">',
	        searchHighlight: true,
	        searching : true,
	        rowsGroup: [0],
		    columns : [
    	    	 {data: "ampm_gubun",width:"5%"}
    	    	,{data: "seq"		,width:"3%"}
    	    	,{data: "cnt"		,width:"2%"}
	 	    	,{data: "d1"		,width:"2%"}
	 	    	,{data: "d2"		,width:"2%"}
	 	    	,{data: "d3"		,width:"2%"}
	 	    	,{data: "d4"		,width:"2%"}
	 	    	,{data: "d5"		,width:"2%"}
	 	    	,{data: "d6"		,width:"2%"}
	 	    	,{data: "d7"		,width:"2%"}
	 	    	,{data: "d8"		,width:"2%"}
	 	    	,{data: "d9"		,width:"2%"}
	 	    	,{data: "d10"		,width:"2%"}
	 	    	,{data: "d11"		,width:"2%"}
	 	    	,{data: "d12"		,width:"2%"}
	 	    	,{data: "d13"		,width:"2%"}
	 	    	,{data: "d14"		,width:"2%"}
	 	    	,{data: "d15"		,width:"2%"}
	 	    	,{data: "d16"		,width:"2%"}
	 	    	,{data: "d17"		,width:"2%"}
	 	    	,{data: "d18"		,width:"2%"}
	 	    	,{data: "d19"		,width:"2%"}
	 	    	,{data: "d20"		,width:"2%"}
	 	    	,{data: "d21"		,width:"2%"}
	 	    	,{data: "d22"		,width:"2%"}
	 	    	,{data: "d23"		,width:"2%"}
	 	    	,{data: "d24"		,width:"2%"}
	 	    	,{data: "d25"		,width:"2%"}
	 	    	,{data: "d26"		,width:"2%"}
	 	    	,{data: "d27"		,width:"2%"}
	 	    	,{data: "d28"		,width:"2%"}
	 	    	,{data: "d29"		,width:"2%"}
	 	    	,{data: "d30"		,width:"2%"}
	 	    	,{data: "d31"		,width:"2%"}		     
	 	    ] 		        
		});	
		
	    ChatManager.SPTable = $("#QueryResultGridSP").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 1000,
    	    scrollCollapse: true,
	        select: {
	            style: 'os',
	            items: 'cell'
	        },
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResult_SP }
	        ],
		    columns : [
    	    	 {data: "car_regno"		,width:"5%"}
    	    	,{data: "emp_nm"		,width:"3%"}
    	    	,{data: "tot_work_date"	,width:"2%"}
	 	    	,{data: "d1"		,width:"2%"}
	 	    	,{data: "d2"		,width:"2%"}
	 	    	,{data: "d3"		,width:"2%"}
	 	    	,{data: "d4"		,width:"2%"}
	 	    	,{data: "d5"		,width:"2%"}
	 	    	,{data: "d6"		,width:"2%"}
	 	    	,{data: "d7"		,width:"2%"}
	 	    	,{data: "d8"		,width:"2%"}
	 	    	,{data: "d9"		,width:"2%"}
	 	    	,{data: "d10"		,width:"2%"}
	 	    	,{data: "d11"		,width:"2%"}
	 	    	,{data: "d12"		,width:"2%"}
	 	    	,{data: "d13"		,width:"2%"}
	 	    	,{data: "d14"		,width:"2%"}
	 	    	,{data: "d15"		,width:"2%"}
	 	    	,{data: "d16"		,width:"2%"}
	 	    	,{data: "d17"		,width:"2%"}
	 	    	,{data: "d18"		,width:"2%"}
	 	    	,{data: "d19"		,width:"2%"}
	 	    	,{data: "d20"		,width:"2%"}
	 	    	,{data: "d21"		,width:"2%"}
	 	    	,{data: "d22"		,width:"2%"}
	 	    	,{data: "d23"		,width:"2%"}
	 	    	,{data: "d24"		,width:"2%"}
	 	    	,{data: "d25"		,width:"2%"}
	 	    	,{data: "d26"		,width:"2%"}
	 	    	,{data: "d27"		,width:"2%"}
	 	    	,{data: "d28"		,width:"2%"}
	 	    	,{data: "d29"		,width:"2%"}
	 	    	,{data: "d30"		,width:"2%"}
	 	    	,{data: "d31"		,width:"2%"}		     
	 	    	,{data: "bit"		,visible : false}		     
	 	    	,{data: "prev_daily_seq"		,visible : false}		     
	 	    ] 		        
		});	

/*
		ChatManager.tbm_arrangeStatus_popup  = $("#TBL_arrangeStatus_popup").DataTable({
			    //"scrollY": -1,
		       // scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        //scrollX: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        ,{ targets: "_all" , render: render_arrangeStatus_popup}
	    		],
	    		select: {
	            	style: 'os',
	            	items: 'row'
	        	},
		        columns : [
	    	    	{data: "route_nm"		,width:'50%'		},
	    	    	{data: "status"			,width:'50%'		}
			    ]
		});  */
		// 1. detail grid에서 editing change시
		// 2. sp grid에서 popup 메뉴 실행시
		ChatManager.sumAllocateCount = function (changeTable,row,col,tableA,tableB) {
			ChatManager.sumDailyAllocateCount(tableA,tableB,col);
			ChatManager.sumEmpAllocateCount(changeTable,row);
		}
		ChatManager.sumDailyAllocateCount = function (tableA,tableB,col) {
			//console.log(tableA);
			//console.log(tableB);
			// 일별 배정건수/미배정건수  합계 산출
			var notAllocationCount_am = 0;
			var notAllocationCount_pm = 0;
			var allocationCount_am = 0;
			var allocationCount_pm = 0;
			 
			tableB.column( col ).data().each( function ( value, index ) {
				if ((regex2.test(value) || value.trim() == '') && !value.includes(AFTER_SET_CHAR)) {
					if (value.includes('a'))
						notAllocationCount_am++;
					else if (value.includes('p'))
						notAllocationCount_pm++;
				} else {
					if (value.includes('a'))
						allocationCount_am++;
					else if (value.includes('p'))
						allocationCount_pm++;
				}
				//console.log(value + '-' + count);
		    });
			//미배정건수
		    tableA.cell(5,col).data(String(notAllocationCount_am));
		    tableA.cell(6,col).data(String(notAllocationCount_pm));

		    var totCount=tableA.cell(2,col).data();
			//배정건수
		    tableA.cell(3,col).data(String(allocationCount_am));
		    tableA.cell(4,col).data(String(allocationCount_pm));
		    
		    // 미배정이 있으면 red
		    if (notAllocationCount_am > 0) 
		    	$(tableA.cell(5,col).node()).css('background-color', 'red');
		    if (notAllocationCount_pm > 0) 
		    	$(tableA.cell(6,col).node()).css('background-color', 'red');
			
			// 초과배정이면 red
		    if (totCount < (allocationCount_am + allocationCount_pm) ) {
		    	$(tableA.cell(3,col).node()).css('background-color', 'red');
		    	$(tableA.cell(4,col).node()).css('background-color', 'red');
		    } else if (totCount == (allocationCount_am + allocationCount_pm) ) {
				$(tableA.cell(3,col).node()).css('background-color', '');
				$(tableA.cell(4,col).node()).css('background-color', '');
				$(tableA.cell(5,col).node()).css('background-color', '');
				$(tableA.cell(6,col).node()).css('background-color', '');
			} else {
				$(tableA.cell(3,col).node()).css('background-color', 'aqua');
				$(tableA.cell(4,col).node()).css('background-color', 'aqua');
			}
			
		}
		    
		ChatManager.sumEmpAllocateCount = function (changeTable,row) {
			var count = 0;
			// 기사별 근무일수  합계 산출
			var arr = changeTable.rows(row).data().toArray();
			//console.log(changeTable);
			$.each(arr, function ( idx, item ) {
				for (var key in item) {
					if (key.startsWith('d')) {
						if (changeTable == ChatManager.DetailTable || changeTable == ChatManager.DetailTable2 ) {
							if (item[key].trim() != '' && !regex2.test(item[key])) 
								count++;
						} else {														
							if (item[key].includes('a') || item[key].includes('p')) 
								count++;
						}
					} 
				}
			});
		    changeTable.cell(row,2).data(String(count));
		}
		
		// 기사별 근무합계
		ChatManager.sumEmpTotWorkCount = function (changeTable) {
			changeTable.rows( function ( idx, aData, node2 ) {
				// 기사별 근무일수  합계 산출
				ChatManager.sumEmpAllocateCount(changeTable,idx);
			});
		}		
		/*
		 * TAB 생성
		 */
		ChatManager.fnAddTab = function (tabName) {
			  var tabs = $( "#tabs" ).tabs();
			  var title = (!tabName) ? "sql_" + tabCounter : tabName;
			  
			  var label = tabTitle.val() || title,
			    id = "tabs-" + tabCounter,
			    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
			    tabContentHtml = '<textarea class="sqlQeuryTextarea" spellcheck="false" id="textareaView_'+ tabCounter + '" wrap="soft"></textarea>';
			
			  tabs.find( ".ui-tabs-nav" ).append( li );
			  tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
			  tabs.tabs( "refresh" );
			
			  $( "#tabs" ).tabs( "option", "active", -1);	// last tab
			  //$('#textareaView_' + tabCounter).focus();
				//var textarea = document.querySelector('#textareaView_' + tabCounter);
				//textarea.onselect = ToolManager.logSelection;
			  tabCounter++;
		}		

	    /*
	    *  노선배차상태 조회
	    */	    
	    ChatManager.btnArrangeStatusRefresh = function btnArrangeStatusRefresh(table) {
			commonVo.baseYm = $('#baseYm').val();
			commonVo.filterType = 'getRouteArrangeStatus';
			commonVo.routeNm = '';
			var commonVoStr = JSON.stringify (commonVo);
			if (commonVoStr == null) return;
			$.ajax({
			       url : "/DynamicSqlFilterNoHeader",
		    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: false, // 추가
			        async:false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   console.log(result);
			    	   table.clear().draw();
					   table.rows.add( result).draw(false);
					  // ret = result.data;
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
	    }	    
	    
	    return ChatManager;
	}());


	//일별 상세 팝업
	$('#QueryResultGridDetail thead').on('dblclick','th', function() {
		console.log('test');
		var row = ChatManager.DetailTable.cell(this).index().row;
		var col = ChatManager.DetailTable.cell(this).index().column;
		popupDailyArrangeInfo(col-2);
	});	


	//일별 상세 팝업
	$('#QueryResultGridDetail2 thead').on('dblclick','td', function() {
		var row = ChatManager.DetailTable2.cell(this).index().row;
		var col = ChatManager.DetailTable2.cell(this).index().column;
		popupDailyArrangeInfo(col-2);
	});	

	//일별 상세 팝업
	$('#QueryResultGridDetail tbody').on('dblclick','td', function() {
		var row = ChatManager.DetailTable.cell(this).index().row;
		var col = ChatManager.DetailTable.cell(this).index().column;
		popupDailyArrangeInfo(col-2);
	});	

	//일별 상세 팝업2
	$('#QueryResultGridDetail2 tbody').on('dblclick','td', function() {
		var row = ChatManager.DetailTable2.cell(this).index().row;
		var col = ChatManager.DetailTable2.cell(this).index().column;

		popupDailyArrangeInfo(col-2);
	});	
/*
	// 노선조회
	$('#TBL_arrangeStatus_popup tbody').on('click','td', function() {
		var row = ChatManager.tbm_arrangeStatus_popup.cell(this).index().row;
		var col = ChatManager.tbm_arrangeStatus_popup.cell(this).index().column;
		var routeNm = ChatManager.tbm_arrangeStatus_popup.cell(row,0).data();
		var status = ChatManager.tbm_arrangeStatus_popup.cell(row,1).data();
		
		if (status != '확정') {
			swal('해당월 배차작업이 확정되지않았습니다.');
			return;			
		}
		$('#group').val(routeNm);
		//$("#tabs-0").trigger("click");
 	    ChatManager.BasicTable.clear().draw();
 	    ChatManager.DetailTable.clear().draw();
 	    ChatManager.SPTable.clear().draw();
 	    ChatManager.BasicTable2.clear().draw();
 	    ChatManager.DetailTable2.clear().draw();

		ChatManager.btnSelect(true,0);
		
	});	*/

	$(document).on('click', '#btnNaver', function () {
		ChatManager.btnNaver(true);
	});
	$(document).on('click', '#btnExcelTemplete', function () {
		ChatManager.btnExcelTemplete();
	});
		
	$(document).on('click', '#btnSelect', function () {
		$( "#tabs" ).tabs( "option", "active", 0 );
		
 	    ChatManager.BasicTable.clear().draw();
 	    ChatManager.DetailTable.clear().draw();
 	    ChatManager.SPTable.clear().draw();
		
		ChatManager.btnSelect(true,0);
	});
	$(document).on('click', '#btnRefresh', function () {
		//ChatManager.btnQueryGroup();
		//ChatManager.btnArrangeStatusRefresh(ChatManager.tbm_arrangeStatus_popup);
	});

	var tabs = $( "#tabs" ).tabs(
		{
		  activate: function(e, ui) {
		    var id = $(ui.newPanel).prop('id');
		    if (id == 'tabs-0')
		    	ChatManager.btnSelect(false,0);
		    else ChatManager.btnSelect2(false,0);
		  }
		}		
	);
	
	$( "#btnAddTab" )
	  .button()
	  .on( "click", function() {
		  ChatManager.fnAddTab('');
	});
	// Close icon: removing the tab on click
	tabs.on( "click", "span.ui-icon-close", function() {
	  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
	  $( "#" + panelId ).remove();
	  tabs.tabs( "refresh" );
	});
	
	tabs.on( "keyup", function( event ) {
	  if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
	    var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
	    $( "#" + panelId ).remove();
	    tabs.tabs( "refresh" );
	  }
	});
	/*
	 * 기준월변경시 헤당월의 노선상태 재조회
	*/
	$(document).on('change', '#baseYm', function () {
		$('.pjy_table_fixed').css('visibility', 'hidden');
		//ChatManager.popupStatus(0);
		//ChatManager.btnArrangeStatusRefresh(ChatManager.tbm_arrangeStatus_popup);

	})
	calMonthKo.on('change', () => {
		$('.pjy_table_fixed').css('visibility', 'hidden');
		//ChatManager.popupStatus(0);
		//ChatManager.btnArrangeStatusRefresh(ChatManager.tbm_arrangeStatus_popup);
	});

	function popupDailyArrangeInfo(clickDay) {
		console.log(clickDay);
		if (clickDay > 0) {
			var routeNm = encodeURIComponent(encodeURIComponent(ChatManager.$group.val())); // 한글은 두번
			var baseYm = $('#baseYm').val();
			var checkDay = 'd' + (clickDay);
			var key = "daily_allocate" ;
			var dayValue = String(clickDay);
			dayValue = dayValue.padStart(2,'0');
			
			var title = ChatManager.$group.val() + ' [' + baseYm + '-' + dayValue + '] 배차현황 ';
			//console.log(dayValue);
			fnMdiOpen(title,key+checkDay,'/monitor/popupTableInfo.html?routeNm=' + routeNm + '&baseYm=' + baseYm + '&checkDay=' + checkDay , 775,600); // 이게 더 크게	
		}		
	}

	function dynamicAjaxCall(filterType,table) {
		var commonVoStr = ChatManager.setParamVo(true,filterType,false);
		if (commonVoStr == null) return;
		$.ajax({
		       url : "/DynamicSqlFilter",
	    	   "data" :   {commonVoStr : commonVoStr},
		       "dataSrc" : "",
		        global: true, // 추가
		        async : false,
		       dataType : 'json',
		       timeout : 10000,
		       success : function(result) {	
				   console.log(result);
		    	   table.clear().draw();
				   table.rows.add( result.data).draw(false);
		       },
		       error : function(request, status, error) {
		        	alert(request.responseText);
		       }
		});	
		
	}
	ChatManager.btnQueryGroup();
	$('.pjy_table_fixed').css('visibility', 'hidden');

	//ChatManager.btnRouteInfoDetail();
});



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