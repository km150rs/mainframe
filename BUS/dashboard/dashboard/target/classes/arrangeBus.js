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
 var ALLOCATE_BIT_COLUMN = 36;
 var commonVo =  new Object();
 var DAY_START_COLUMN = 4;
 var offTypeArray = [];
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
	var iData = data.toString();
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.row % 2 == 0) {
			$(api.cell(meta.row, meta.col).node()).css('border-top', 'thin dashed gray');
	}    
	if (meta.col == 0) {
		data = iData.substr(-4);
	}	
	return data;
}

function render_tab23(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if ( row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}
	return data;
}
function render_tab24(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	return data;
}

function render_tab2(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col <= 1) {
	}
	
	return data;
}

function render_QueryResultBasic(data,type,row,meta){
    if (data == null || data == undefined )
    	return;
	var basicTable = $('#QueryResultGridBasic').DataTable();
	var week = basicTable.cell(0, meta.col).data();

	var api = new $.fn.dataTable.Api(meta.settings);
	if (week.toString().includes('월') || meta.col == (DAY_START_COLUMN+1) ) {
		$(api.cell(meta.row, meta.col).node()).css('border-left', '2px solid black');
		
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

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col != ALLOCATE_BIT_COLUMN) {
		var basicTable = $('#QueryResultGridBasic').DataTable();
		var week = basicTable.cell(0, meta.col).data();
		//console.log(week);
		if (week.toString().includes('월') || meta.col == (DAY_START_COLUMN+1)) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '2px solid black');
		}
	}

	
	if (meta.col == 0) {
		data = iData.substr(-4);
	}

	if (meta.row % 2 == 0) {
		$(api.cell(meta.row, meta.col).node()).css('border-top', 'thin dashed gray');
	}    


	//근무일수 backcolor = gray
	if (meta.col <= DAY_START_COLUMN) {
	} else if( meta.col > DAY_START_COLUMN && iData.includes(AFTER_SET_CHAR)){
		//감차
		//배정완료
		if (iData.includes(OFFDAY_SET_CHAR)){	
			$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');
/*			var html = 	'<div class="div_afterAllocate_offday"></div>'
				+	'<div class="div_Text_afterAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
				;
     		return html;*/
     	} else  {
			$(api.cell(meta.row, meta.col).node()).css('background-color', 'gray');
/*			var html = 	'<div class="div_afterAllocate"></div>'
				+	'<div class="div_Text_afterAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
				;
     		return html;*/
		}
	} else if( meta.col > DAY_START_COLUMN && iData.includes(BEFORE_SET_CHAR)){
			$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
		//휴식
/*		var html = 	'<div class="div_beforeAllocate"></div>'
				+	'<div class="div_Text_beforeAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'transparent');		
	
     	return html;*/
	} else if( meta.col > DAY_START_COLUMN && iData.includes(OFFDAY_SET_CHAR)){
		//휴식
			$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');
/*		var html = 	'<div class="div_offDay"></div>'
				+	'<div class="div_Text_beforeAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'transparent');		
	
     	return html;*/
	} else if( meta.col > DAY_START_COLUMN && iData.includes(NOEMP_SET_CHAR)){
			$(api.cell(meta.row, meta.col).node()).css('background-color', 'gray');

/*		var html = 	'<div class="div_beforeAllocate"></div>'
				+	'<div class="div_Text_beforeAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'transparent');		
     	return html;*/
	} else if( meta.col > DAY_START_COLUMN && iData.includes('input')){
	} else {
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	}

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
		if (week.toString().includes('월') || meta.col == (DAY_START_COLUMN+1)) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '2px solid black');
		}
	}
	if (meta.col == 0 ) {
		data = iData.replace('번','').replace('SP','');
	}
	if (meta.col == 0 && row.dispatch_seq > 6) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');
	}
	if (meta.col <= DAY_START_COLUMN) {
	} else if( meta.col > DAY_START_COLUMN && iData.includes(SPOTHER_SET_CHAR)){
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'moccasin');		
	} else if( meta.col > DAY_START_COLUMN && iData.includes(OFFDAY_SET_CHAR)){
		$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');		
	} else if( meta.col > DAY_START_COLUMN && iData.includes(BEFORE_SET_CHAR)){
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	} else if( meta.col > DAY_START_COLUMN && iData.trim() == '') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	} else if( meta.col > DAY_START_COLUMN && iData.trim() != ''){
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	} else {
	}
	return data;
}


$( function() {
	//$("#baseYm").val(comm_getToday2());
/*    var baseYm = $('#baseYm');
		baseYm.inputmask(
		    "9999-99"
		);*/
		
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#baseYm',
            format: 'yyyy-MM'
        }
    });
        		
    $( "#tabs" ).tabs({
    	activate: function( event, ui ){
     		var selectedTab = $("#tabs").tabs('option', 'active'); // 선택된 tab의 index value
     		if(selectedTab == 0){
				 ChatManager.btnTab21_refresh();
		    } else if (selectedTab == 1) {
				ChatManager.btnTab22_refresh();
		    } else if (selectedTab == 2) {
				ChatManager.btnTab23_refresh();
		    } else if (selectedTab == 3) {
				ChatManager.btnTab24_refresh();
		 	}
		 }
	});
	
    $( "#tabs3" ).tabs({
    	activate: function( event, ui ){
     		var selectedTab = $("#tabs3").tabs('option', 'active'); // 선택된 tab의 index value
     		if(selectedTab == 0){
				ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
		    } else if (selectedTab == 1) {
				ChatManager.btnRouteReductionInfo();
		 	}
		 }
	});	


	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
		ChatManager.TBM_MONTH_ARRANGE_STATUS = null;
		ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP = null;
		ChatManager.TBM_ROUTE_REDUCTION_INFO = null;
	    ChatManager.BasicTable = null;
	    ChatManager.DetailTable = null;
	    ChatManager.TBM_DRIVERINFO_DETAIL = null;
	    ChatManager.TBM_ROUTE_WEEKSEQ_INFO = null;
	    ChatManager.TBM_DRIVERINFO_SP = null;
	    ChatManager.TBM_EMPLOYEE_VACATION_INFO = null;
	    ChatManager.$comboRouteNm = $('#comboRouteNm');
	    ChatManager.$comboInitSeq = $('#comboInitSeq');
	    ChatManager.SPTable =null;
		commonVo.select_SProw = -1;
				    
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryRouteNm = function () {
			var jsonString = ChatManager.setParamVo(false,'',true,'N');
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
		 * 배차확정 history 가져오기
		 */
	    ChatManager.btnQueryInitSeq = function () {
			if (ChatManager.checkinvalid() == null)	return;
			
			var commonVoStr = ChatManager.setParamVo(false,'getFixedInitSeq',false,'N');
			$.ajax({
			       url : "/DynamicSqlFilterNoHeader",
			      "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        //global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   console.log(ret);
					   
			    	   var size = ret.length;
			    	   var option = $('<option value="">-회차-</option>');
			    	   ChatManager.$comboInitSeq.empty();
			    	   ChatManager.$comboInitSeq.append(option);
			    	   
			    	   for (var i = 0; i < size; i++) {
			    	    	var option = $("<option>"+ret[i].init_seq+"</option>");
			    	    	ChatManager.$comboInitSeq.append(option);
			    	   };
			    	   
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}		
		/*
		 * 휴가종류 가져오기
		 */
	    ChatManager.btnQueryCommonCode = function () {
			commonVo.filterText = '휴가종류';
			var commonVoStr = ChatManager.setParamVo(false,'TBM_ROUTE_COMMON_INFO',false,'N');
			$.ajax({
			       url : "/DynamicSqlFilterNoHeader",
			      "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        //global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
			    	   //console.log(ret[0].am_seq_array);
			    	   offTypeArray = ret[0].am_seq_array.split(',');
			    	   //console.log(offTypeArray);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}		
	    ChatManager.checkinvalid = function checkinvalid() {
			var baseYmd = $('#baseYm').val();
			var routeNm = ChatManager.$comboRouteNm.val();
			
		    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
				return null;
			}
		    if (routeNm == null || routeNm == undefined || routeNm == '') {
				return null;
			}
			return 'ok';
		}
	    ChatManager.setParamVo = function setParamVo(bValidCheck,filterType,bIncludeHeader,offIncludeYn) {
			//console.log(calMonthKo.getDateElements());
			commonVo.filterType = filterType;
			commonVo.routeNm = ChatManager.$comboRouteNm.val();
			commonVo.includeHeader = bIncludeHeader;
			commonVo.offIncludeYn = offIncludeYn;

			var baseYm = $('#baseYm').val();
			if (bValidCheck) {
			    if (baseYm == null || baseYm == undefined || baseYm == '') {
					swal('기준월을 입력하세요');
					return null;
				}
			    if (commonVo.routeNm == null || commonVo.routeNm == undefined || commonVo.routeNm == '') {
					swal('노선번호를 선택하세요');
					return null;
				}
			}
			
			commonVo.baseYm = baseYm;
			//commonVo.baseYm = commonVo.baseYm.replace(/\D+/g, '');
			//var jsonString = JSON.stringify (commonVo);
			return JSON.stringify (commonVo);
		}

	    /*
	     * 기초자료생성 1~6번생성
	     */
	    ChatManager.btnInit = function btnInit() {
	 	    ChatManager.BasicTable.clear();
	 	    ChatManager.DetailTable.clear();
			
			var jsonString = ChatManager.setParamVo(true,'',true,'N');
			////console.log(jsonString);
			if (jsonString == null) return;
	    	$.ajax({
	    	    url : "/BUS_monthArrangeInit",
	    	   	"data" :		    {strData : jsonString},
	    	    //global: false, // 추가
	    	    async: false,
	    	    //dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {	
	    	 		swal('기초자료생성완료');
	    	 	    ChatManager.btnSelect(true,'N',0);
	    	    },
	    	    error : function(request, status, error) {
	    	 	   alert(request.responseText);
	    	 	   document.location = "/error2";
	    	    }
	    	});		  
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
			        ////global: false, // 추가
			        async:false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   //console.log(result);
			    	   table.clear().draw();
					   table.rows.add( result).draw(false);
					  // ret = result.data;
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
	    }	    
	    
	    // 노선 배차정보 상세
	    ChatManager.btnRouteReductionInfo = function btnRouteReductionInfo() {
//			commonVo.baseYm = $('#baseYm').val();
			commonVo.filterType = 'getRouteInfoDetail';
//			commonVo.routeNm = '';
			var commonVoStr = JSON.stringify (commonVo);
			if (commonVoStr == null) return;
			$.ajax({
			       url : "/DynamicSqlFilterNoHeader",
		    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        ////global: false, // 추가
			        async:false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   //console.log(result);
			    	   ChatManager.TBM_ROUTE_REDUCTION_INFO.clear().draw();
					   ChatManager.TBM_ROUTE_REDUCTION_INFO.rows.add( result).draw(false);
					  // ret = result.data;
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
	    }
	    /*
	    *  상하단 조회
	    */	    
	    ChatManager.btnSelect = function btnSelect(bPatternShow,offIncludeYn,nInitSeq) {
			console.log(nInitSeq);
			if (nInitSeq == 0) {
				ChatManager.btnQueryInitSeq();
			} else {
			}	 	    
	 	    commonVo.initSeq = nInitSeq;
	 	    
			var jsonString = ChatManager.setParamVo(true,'',true,offIncludeYn);
			////console.log(jsonString);
			if (jsonString == null) return;
	    	$.ajax({
	    	    url : "/BUS_ViewMonthArrange",
	    	   "data" : 
				   {strData : jsonString},
	    	    "dataSrc" : "",
	    	    async : false,
	    	    global: true, // 추가
	    	    dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {	
	    	 	    console.log(ret);
	    	 	   	if (ret.data2.length <= 0 || ret.data3.length <= 0) {
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
					
	    	 	    if (bPatternShow) {
	    	 	    	dynamicAjaxCall('TBM_DRIVERINFO_DETAIL',ChatManager.TBM_DRIVERINFO_DETAIL);
	    	 	    }
					ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
	    	 	    ChatManager.checkArrangeStatus();

					var colCount = ChatManager.DetailTable.columns(':visible').count();
					for (var i=DAY_START_COLUMN; i< colCount; i++) {
						ChatManager.sumDailyAllocateCount(i);
					}
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }
	    
	    /*
	    *  해당월 노선의 배차정보 삭제
		*  month_arrange_basic,detail,status table 정보 모두 삭제
	    */	    
	    ChatManager.btnDelete = function btnDelete() {
			var cnt = ChatManager.BasicTable.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return ;
			}
						
			var jsonString = ChatManager.setParamVo(true,'',true,'Y');
			////console.log(jsonString);
			if (jsonString == null) return;
	    	$.ajax({
	    	    url : "/BUS_DeleteMonthArrange",
	    	   "data" : 
				   {strData : jsonString},
	    	    "dataSrc" : "",
	    	    async : false,
	    	     //global: false, // 추가
	    	    dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {	
					swal('정상처리되었습니다.');
			 	    ChatManager.BasicTable.clear().draw();
			 	    ChatManager.DetailTable.clear().draw();
			 	    ChatManager.SPTable.clear().draw();
	    	 	    ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }	    
	    ChatManager.checkArrangeStatus = function checkArrangeStatus () {
			

			var orgRow = $('#TBM_MONTH_ARRANGE_STATUS').dataTable().fnFindCellRowIndexes (ChatManager.$comboRouteNm.val(),0);
			var status = ChatManager.TBM_MONTH_ARRANGE_STATUS.cell(orgRow,1).data();
			
			var nInitSeq = ChatManager.$comboInitSeq.val();
			console.log(nInitSeq);
			console.log(status);
			if (nInitSeq == null || nInitSeq == '') {
				//$('.pjy_button_fixed').prop('disabled', false);
				//$('.pjy_table_fixed').removeClass("disabled");
				//$(".pjy_button_unfixed").prop('disabled', false);
				if (status == '확정') {
					$('.pjy_button_fixed').prop('disabled', true);
					$('.pjy_table_fixed').addClass("disabled");
					$(".pjy_button_unfixed").prop('disabled', false);
					$(".pjy_table_fixed").css("filter","brightness(90%)");
				} else {
					$('.pjy_button_fixed').prop('disabled', false);
					$('.pjy_table_fixed').removeClass("disabled");
					$('.pjy_button_unfixed').prop('disabled', true);
					$(".pjy_table_fixed").css("filter","");
				}
				
			} else {
				$('.pjy_button_fixed').prop('disabled', true);
				$('.pjy_table_fixed').addClass("disabled");
				$(".pjy_button_unfixed").prop('disabled', true);

				$(".pjy_table_fixed").css("filter","brightness(50%)");
			}	 	    

		}
	    /*
	    *  검토(현재상황저장 및 재조회)
	    */
	    ChatManager.btnReview = function btnReview() {
			var cnt = ChatManager.BasicTable.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return null;
			}
			
			var commonVoString = ChatManager.setParamVo(true,'BUS_monthArrangeReview',true,'N');
			
			var itemList  = ChatManager.DetailTable.rows().data().toArray();
			var itemList2  = ChatManager.SPTable.rows().data().toArray();
			
			////console.log(itemList);
			
			itemList.push(...itemList2);
			
			var jsonString = JSON.stringify (itemList);

			$.ajax({
			       url : "/BUS_monthArrangeReview",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        //global: false, // 추가
			        async:false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.btnSelect(false,'N',0);
			    	   //tab_1_show();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});			
	    }		   
	    /*
	    *  검토(현재상황저장 및 재조회)
	    */
	    ChatManager.btnSPDelete = function (row) {
			var cnt = ChatManager.BasicTable.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return null;
			}
			
			var commonVoString = ChatManager.setParamVo(true,'BUS_monthArrangeSPDelete',true,'N');
			var itemList  = ChatManager.SPTable.rows(row).data().toArray();
			var jsonString = JSON.stringify (itemList);

			$.ajax({
			       url : "/BUS_monthArrangeSPDelete",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        //global: false, // 추가
			        async:false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.SPTable.rows(row).remove().draw();
			    	   //tab_1_show();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});			
	    }		   	    
	    /*
	    *  확정
	    */
	    ChatManager.btnFix = function btnFix(status) {
			var cnt = ChatManager.BasicTable.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return null;
			}
			var nInitSeq = ChatManager.$comboInitSeq.val();
			if (nInitSeq != null && nInitSeq !='' ) {
				swal('현재조회화면은 [' + nInitSeq + '] 회차 자료입니다');
				return null;
			}
			
	 	    commonVo.arrangeStatus = status;
			var jsonString = ChatManager.setParamVo(true,'',true,'N');
			//console.log(jsonString);
			if (jsonString == null) return;
	    	$.ajax({
	    	    url : "/BUS_monthArrangeFinish",
	    	   "data" :   {strData : jsonString},
	    	    "dataSrc" : "",
	    	     //global: false, // 추가
	    	     async : false,
	    	    dataType : 'json',
	    	    timeout : 10000,
	    	    success : function(ret) {
					if (status == '확정') 		
	    	 			swal('배차확정이 완료되었습니다.');
	    	 		else 
	    	 			swal('배차확정이 취소되었습니다.');
	    	 			
	    	 	    ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
	    	 	    ChatManager.btnSelect(false,'N',0);
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }		  
	    // 전월 패턴저장
	    ChatManager.btnTab21_save = function () {
			var table = $('#TBM_DRIVERINFO_DETAIL').DataTable();
			
			var cnt = table.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return ;
			}
			var commonVoString = ChatManager.setParamVo(true,'update_tbm_driverInfo_detail',true,'N');
			var itemList  = table.rows().data().toArray();
			var jsonString = JSON.stringify (itemList);

			$.ajax({
			       url : "/BUS_updateTBM_DRIVERINFO_DETAIL",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        //global: false, // 추가
			        async: false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   dynamicAjaxCall('TBM_DRIVERINFO_DETAIL',table);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}
	    // 노선별 요일별 근무순번조정
	    ChatManager.btnTab23_save = function () {
			var table = $('#TBM_ROUTE_WEEKSEQ_INFO').DataTable();
			var cnt = table.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return ;
			}
			
			var commonVoString = ChatManager.setParamVo(true,'updateTBM_ROUTE_WEEKSEQ_INFO',true,'N');
			var itemList  = table.rows().data().toArray();
			var jsonString = JSON.stringify (itemList);

			$.ajax({
			       url : "/BUS_updateTBM_ROUTE_WEEKSEQ_INFO",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        //global: false, // 추가
			        async: false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   dynamicAjaxCall('TBM_ROUTE_WEEKSEQ_INFO',table);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}
	    ChatManager.btnTab21_refresh = function () {
	    	var table = $('#tbm_driverInfo_detail').DataTable();
			dynamicAjaxCall('TBM_DRIVERINFO_DETAIL',table);
		}		
	    ChatManager.btnTab22_refresh = function () {
	    	var table = $('#TBM_DRIVERINFO_SP').DataTable();
			dynamicAjaxCall('TBM_DRIVERINFO_SP',table);
		}		
	    ChatManager.btnTab23_refresh = function () {
			var table = $('#TBM_ROUTE_WEEKSEQ_INFO').DataTable();
			dynamicAjaxCall('TBM_ROUTE_WEEKSEQ_INFO',table);
		}		
	    ChatManager.btnTab24_refresh = function () {
	    	var table = $('#TBM_EMPLOYEE_VACATION_INFO').DataTable();
			table.search('').draw();
			dynamicAjaxCall('TBM_EMPLOYEE_VACATION_INFO',table);
		}		

	    // 전체노선 감차/근무간격 저장
	    ChatManager.btnTab32_save = function () {
			var table = $('#TBM_ROUTE_REDUCTION_INFO').DataTable();
			var cnt = table.rows().count();
			if (cnt == 0) {
				swal('대상자료가 없습니다');
				return ;
			}
			
			var commonVoString = ChatManager.setParamVo(true,'update_tbm_routeReduction_Info',true,'N');
			var itemList  = table.rows().data().toArray();
			var jsonString = JSON.stringify (itemList);

			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_updateTBM_routeReduction_Info",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        //global: false, // 추가
			        async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}		
		ChatManager.setColumnVisible = function (ret) {
			if (ret.data[0].d29 == 0) {
    			ChatManager.BasicTable.column( 33 ).visible( false );
    			ChatManager.DetailTable.column( 33 ).visible( false );
    			ChatManager.SPTable.column( 33 ).visible( false );
		    } else {
    			ChatManager.BasicTable.column( 33 ).visible( true );
    			ChatManager.DetailTable.column( 33 ).visible( true );				
    			ChatManager.SPTable.column( 33 ).visible( true );
			}
			if (ret.data[0].d30 == 0) {
    			ChatManager.BasicTable.column( 34 ).visible( false );
    			ChatManager.DetailTable.column( 34 ).visible( false );
    			ChatManager.SPTable.column( 34 ).visible( false );
		    } else {
    			ChatManager.BasicTable.column( 34 ).visible( true );
    			ChatManager.DetailTable.column( 34 ).visible( true );
    			ChatManager.SPTable.column( 34 ).visible( true );
			}
			if (ret.data[0].d31 == 0) {
    			ChatManager.BasicTable.column( 35 ).visible( false );
    			ChatManager.DetailTable.column( 35 ).visible( false );
    			ChatManager.SPTable.column( 35 ).visible( false );
		    } else {
    			ChatManager.BasicTable.column( 35 ).visible( true );
    			ChatManager.DetailTable.column( 35 ).visible( true );
    			ChatManager.SPTable.column( 35 ).visible( true );
			}		    		  
			//basic cell 병합
		    for (var i =0; i<7;i++) {
				$(ChatManager.BasicTable.cell(i, 0).node()).attr('colspan','5');
  				$(ChatManager.BasicTable.cell(i, 1).node()).css('display','none');
  				$(ChatManager.BasicTable.cell(i, 2).node()).css('display','none');
  				$(ChatManager.BasicTable.cell(i, 3).node()).css('display','none');
  				$(ChatManager.BasicTable.cell(i, 4).node()).css('display','none');
			}  
		}
	    ChatManager.BasicTable = $("#QueryResultGridBasic").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 125,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResultBasic }
		        ],
		    columns : [
    	    	 {data: "car_regno"		,width:"2%"}
    	    	,{data: "emp_nm"		,width:"2%"}
    	    	,{data: "counta"	,width:"2%"}
    	    	,{data: "countp"	,width:"2%"}
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
	        select: true,
		    "scrollY": 1000,
/*    	    select: {
    	           style: 'single'
    		},
    	    select: true,   
*/    	    scrollCollapse: true,
/*        select: {
            style: 'os',
            items: 'cell'
        },
*/		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_QueryResult_Detail }

		        ],
		    columns : [
    	    	 {data: "car_regno"		,width:"2%"}
    	    	,{data: "emp_nm"		,width:"2%"}
    	    	,{data: "counta"	,width:"2%"}
    	    	,{data: "countp"	,width:"2%"}
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
		datatableEdit({
			dataTable : ChatManager.DetailTable,
			//eventTarget : 'tbody td',
			columnDefs : [
					{targets :  3	,maxlength:5}
					,{targets : 4	,maxlength:5}
					,{targets : 5	,maxlength:5}
					,{targets : 6	,maxlength:5}
					,{targets : 7	,maxlength:5}
					,{targets : 8	,maxlength:5}
					,{targets : 9	,maxlength:5}
					,{targets : 10	,maxlength:5}
					,{targets : 11	,maxlength:5}
					,{targets : 12	,maxlength:5}
					,{targets : 13	,maxlength:5}
					,{targets : 14	,maxlength:5}
					,{targets : 15	,maxlength:5}
					,{targets : 16	,maxlength:5}
					,{targets : 17	,maxlength:5}
					,{targets : 18	,maxlength:5}
					,{targets : 19	,maxlength:5}
					,{targets : 20	,maxlength:5}
					,{targets : 21	,maxlength:5}
					,{targets : 22	,maxlength:5}
					,{targets : 23	,maxlength:5}
					,{targets : 24	,maxlength:5}
					,{targets : 25	,maxlength:5}
					,{targets : 26	,maxlength:5}
					,{targets : 27	,maxlength:5}
					,{targets : 28	,maxlength:5}
					,{targets : 29	,maxlength:5}
					,{targets : 30	,maxlength:5}
					,{targets : 31	,maxlength:5}
					,{targets : 32	,maxlength:5}
					,{targets : 33	,maxlength:5}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
/*
					if (prev.includes(OFFDAY_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev).draw();
						swal('휴가정보는 수기 삭제불가')
						return false;
					}
					if (changed.includes(OFFDAY_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev).draw();
						swal('휴가정보는 수기 등록불가:  마우스우클릭후 휴가등록 가능')
						return false;
					}
					if (prev.includes(AFTER_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev).draw();
						swal('SP가 지정된 경우 수정불가')
						return false;
					}
					if (changed.includes(AFTER_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev).draw();
						swal('SP 지정은 하단 SP그리드 우측마우스클릭후 지정가능')
						return false;
					}
*/
					$(ChatManager.DetailTable.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					ChatManager.DetailTable.cell(index.row, ALLOCATE_BIT_COLUMN).data('Y');

				/*	
					var data = changed.replace(AFTER_SET_CHAR,'').replace(OFFDAY_SET_CHAR,'').replace(SPOTHER_SET_CHAR,'');
					ChatManager.DetailTable.cell(index.row, index.column).data(data).draw(false);
*/
					ChatManager.sumAllocateCount(ChatManager.DetailTable, index.row, index.column);
					ChatManager.sumDailyAllocateCount(index.column);
				}
			}
		});		
		$.contextMenu({
			selector : "#QueryResultGridDetail td",
			//autoHide: true,
			  trigger: 'right',
			build: function ($trigger) {
  	    	  	var colIndex = parseInt($trigger[0].cellIndex),
        	  		row = ChatManager.DetailTable.row($trigger[0].parentNode),
          	  		rowIndex = row.index();
  	    	  	var currData = ChatManager.DetailTable.cell(rowIndex, colIndex).data();
  	    	  	var emp_nm = ChatManager.DetailTable.cell(rowIndex, 1).data();
				var options = {
           		  	items: {},
                  	callback: function (key, options, e) {
					  	contextMenuHandler3(ChatManager.DetailTable,key, options);
                  	}
				};

				//임시로 사용( 과거자료 복구용 )
						ChatManager.SPTable.column(colIndex).data().each( function (value,index) {
							if(!value.includes(SPOTHER_SET_CHAR) && !value.includes(BEFORE_SET_CHAR)) {	
								//var emp_nm = ChatManager.SPTable.cell(index, 1).data();
								var key = 'Temp'+index;
								////console.log(key);
					  			options.items[key] = {name: value ,icon:"add",orgIdx :index};
							}
						});
          	  
          	  	if (colIndex > DAY_START_COLUMN) {
					if(currData.includes('@')) {
						options.items["delAttendance"] = {name: emp_nm + ' : ' + (colIndex-String(count)) +'일 휴가취소',icon:"delete"};
						return options;  		 
					}
					if(!regex2.test(currData)) {
						options.items["regOff"] = {name: emp_nm + ' : ' + (colIndex-String(count)) +'일 휴무처리',icon:"add"};
					}
					// 근태종류 추가
					$.each(offTypeArray, function(index, element){
			  			options.items['regAttendance'+index] = {name: element ,icon:"add"};
					});
					options.items["addSetting"] = {name: '추가설정...',icon:"edit"};
					return options;  		 
	  		  	}

	  		  	return false;
  		  	}
  		});  
		var contextMenuHandler3=function(table,key, options) {
			var col = parseInt(options.$trigger[0].cellIndex),
			rows = table.row(options.$trigger[0].parentNode),
			row = rows.index();
			
			var clickYmd = $('#baseYm').val() + '-' + pad(col-DAY_START_COLUMN,2);

			if (key.includes('addSetting')) {
					$.MessageBox({
						    buttonDone  : "등록",
						    buttonFail  : "취소",
					    	input    : {
    					        startDate : {
						            type         : "date",
						            label        : "휴가시작:",
						            title        : "휴가시작일",
						            defaultValue		: clickYmd
						        },								
    					        endDate : {
						            type         : "date",
						            label        : "휴가종료:",
						            title        : "휴가종료일",
						            defaultValue		: clickYmd
						        },								
    					        attendanceType : {
						            type         : "select",
						            label        : "근태구분선택:",
						            title        : "근태구분",
						            options      : offTypeArray
						        },								
								memo    : {
						            type         : "text",
						            label        : "메모:",
						            title        : "근태사유"
						        }
							},
					    	tupe : "textarea",
					    	message  : "근태추가설정"
						}
					).done(function(data){
						ChatManager.regAttendance(table,key,row,col,data,'N');
					});			
			} else if (key.includes('regAttendance')) {
				if (options.items[key].name == '기타') {
					$.MessageBox({
						    buttonDone  : "등록",
						    buttonFail  : "취소",
					    	input    : {
/*    					        attendanceType : {
						            type         : "select",
						            label        : "근태구분선택:",
						            title        : "Select 근태구분",
						            options      : offTypeArray
						        },*/								
								memo    : {
						            type         : "text",
						            label        : "메모:",
						            title        : "근태사유"
						        }
							},
					    	tupe : "textarea",
					    	message  : "근태등록"
						}
					).done(function(data){
						////console.log(data);
						////console.log(data.attendanceType);
						////console.log(data.memo);
						data.startDate = clickYmd;
						data.endDate = clickYmd;
						data.attendanceType = '기타';
						ChatManager.regAttendance(table,key,row,col,data,'N');
					});			
				} else {
					var data = {};
					data.startDate = clickYmd;
					data.endDate = clickYmd;
					data.attendanceType = options.items[key].name;
					data.memo = '';
					ChatManager.regAttendance(table,key,row,col,data,'N');
				}
			} else if (key == 'delAttendance') {
				ChatManager.regAttendance(table,key,row,col,'','Y');
			} else if (key == 'regOff') {
				var currData = table.cell(row, col).data();
				table.cell(row, col).data(currData+BEFORE_SET_CHAR).draw();
				table.cell(row, ALLOCATE_BIT_COLUMN).data('Y');
	    	   	ChatManager.sumAllocateCount(table, row, col);
			} else if (key.includes('Temp')) {
				// 임시로
				var currData = table.cell(row, col).data();
				var newData =   options.items[key].name;
				if (currData.includes('*')) {
					table.cell(row, col).data(newData+BEFORE_SET_CHAR+AFTER_SET_CHAR).draw();
				} else {
					table.cell(row, col).data(newData+OFFDAY_SET_CHAR+AFTER_SET_CHAR).draw();
				}
				table.cell(row, ALLOCATE_BIT_COLUMN).data('Y');
			} 
			
		}
		
		ChatManager.addOffType = function () {
				var offTypeString = offTypeArray.join(",");
				console.log(offTypeString);
			$.MessageBox({
				    buttonDone  : "확인",
				    buttonFail  : "취소",
			    	input    : {
						memo    : {
				            type         : "memo",
				            label        : "근태종류:",
				            title        : "추가",
				            defaultValue : offTypeString
				        }
					},
			    	tupe : "textarea",
			    	message  : "근태 종류 설정"
				}
			).done(function(data){
				offTypeArray = data.memo.split(',');
				ChatManager.regOffType(data.memo);
			});	
		}
		// 휴가종류저장
		ChatManager.regOffType = function (offTypeString) {
			var sendVo =  new Object();
			var url;
			url = "/insertTBM_ROUTE_COMMON_INFO";
			//sendVo.filterType 	= '휴가종류';
			//sendVo.filterText   = offTypeString;
			sendVo.routeNm      = 'ALL';
			sendVo.key      = '휴가종류';
			sendVo.memo      = offTypeString;
			
			var jsonString = JSON.stringify (sendVo);
			
			$.ajax({
				  url: url,
				  "data" : {strData : jsonString},
				  async : false,
				  global : true,
			      success: function(data) {
		    	   		swal("정상처리되었습니다.[C]");
			      },
			      error : function(request, status, error) {
			    	   swal("처리오류 : " + request + '/' + status + '/' +error);
			      }			
			});
		}		
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
    	    	 {data: "car_regno"		,width:"2%"}
    	    	,{data: "emp_nm"		,width:"2%"}
    	    	,{data: "counta"	,width:"2%"}
    	    	,{data: "countp"	,width:"2%"}
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
		$.contextMenu({
			selector : "#QueryResultGridSP td",
			//autoHide: true,
			  trigger: 'right',
			build: function ($trigger) {
  	    	  	var colIndex = parseInt($trigger[0].cellIndex),
        	  		row = ChatManager.SPTable.row($trigger[0].parentNode),
          	  		rowIndex = row.index();
  	    	  	var currData = ChatManager.SPTable.cell(rowIndex, colIndex).data();
  	    	  	var emp_nm = ChatManager.SPTable.cell(rowIndex, 1).data();
          	  
          	  	if (colIndex <= DAY_START_COLUMN) {
	  			  	var options = {
	           		  	items: {
	                        "cancelRow": {name: "배차전체취소 " + emp_nm,icon:"delete"}
	                  	},
	                  	callback: function (key, options, e) {
						  	contextMenuHandler2(ChatManager.SPTable,key, options);
	                  	}
		  			};
					return options;  		 
				}
				var bExists = false;
          	  	if (colIndex > DAY_START_COLUMN) {
					var options = {
	           		  	items: {},
	                  	callback: function (key, options, e) {
						  	contextMenuHandler2(ChatManager.SPTable,key, options);
						  	contextMenuHandler3(ChatManager.SPTable,key, options);
	                  	}
					};
					// 타 노선 배정된 sp인경우
	          	  	if (currData.includes('#')) {
		  			  	var result = ChatManager.MenuShowSPOtherAllocateInfo(currData,rowIndex,colIndex);
		  			  	////console.log(result);
		  			  	if (result != null) {
							options.items["none"] = {name: result[0].route_nm + '[' + result[0].car_regno + ']',icon:""};
							bExists = true;
						}
	          	  	} else if (currData.trim() == OFFDAY_SET_CHAR) {
		  			  	
	          	  	} else if (currData.trim() != '') {
		  			  	options.items["cancelCell"] = {name: "배차취소 " + emp_nm,icon:"delete"};
							bExists = true;
		  			} else {
			  			// context menu에 배차대상 표시
						ChatManager.DetailTable.column(colIndex).data().each( function (value,index) {
							if(!value.includes(AFTER_SET_CHAR) && regex2.test(value)) {	
								
								var emp_nm = ChatManager.DetailTable.cell(index, 1).data();
								var key = 'cellSP'+index;
								////console.log(key);
					  			options.items[key] = {name: value + '/' + emp_nm,icon:"add",orgIdx :index};
								bExists = true;
							}
						});
					}
					// sp도 휴가지정기능 추가 2023.7.19
					{
						if(currData.includes('@')) {
							options.items["delAttendance"] = {name: emp_nm + ' : ' + (colIndex-DAY_START_COLUMN) +'일 휴가취소',icon:"delete"};
							return options;  		 
						}
						if(!regex2.test(currData)) {
							options.items["regOff"] = {name: emp_nm + ' : ' + (colIndex-DAY_START_COLUMN) +'일 휴무처리',icon:"add"};
						}
						// 근태종류 추가
						$.each(offTypeArray, function(index, element){
				  			options.items['regAttendance'+index] = {name: element ,icon:"add"};
						});
						options.items["addSettingAttendance"] = {name: '추가설정...',icon:"edit"};
						//return options;  		 
		  		  	}					
	  		  	}
	  		  	if (bExists)	return options;
	  		  	return false;
  		  	},
/*			className: 'typeWriter',
			items: {
				"cancel" : {name: "배차취소"}
			},
			callback : function(key, options) {
				contextMenuHandler2(ChatManager.SPTable,key, options);
			}
*/			
		});  
		var contextMenuHandler2=function(table,key, options) {
			var col = parseInt(options.$trigger[0].cellIndex),
			rows = table.row(options.$trigger[0].parentNode),
			row = rows.index();
			var returnValue = false;
			
			if (key.includes('Attendance')) {
				return;
			}
			switch(key){
				case "cancelRow":
					returnValue = ChatManager.MenuCancelAll(table,key,row,col);
					break;
				case "cancelCell":
					returnValue = ChatManager.MenuCancelCell(table,key,row,col);
					break;
				case "none":
					break;
				default :
					returnValue = ChatManager.MenuAddCell(table,key,row,col,options);
					break;					
			}
			//변동이 있을때만 합계 구함
			if (returnValue)
				ChatManager.sumAllocateCount(table, row, col);
		}

		ChatManager.MenuShowSPOtherAllocateInfo = function (currData, row,col) {
			commonVo.checkDay = String(col-DAY_START_COLUMN);
			commonVo.dayValue=currData.replace(SPOTHER_SET_CHAR,'');
			var commonVoStr = ChatManager.setParamVo(true,'sp_otherAllocateInfo',false,'N');
			if (commonVoStr == null) return;
			var ret;
			$.ajax({
			       url : "/DynamicSqlFilter",
		    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        //global: false, // 추가
			        async:false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   ////console.log(result);
					   ret = result.data;
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
						ret = null;
			       }
			});	
			return ret;
		}
		// 휴가등록
		ChatManager.regAttendance = function (table,key, row,col,data,deleteYn) {
			var sendVo =  new Object();
			var url;
			sendVo.regDate 	= comm_getToday2();


			url = "/InsertAttendanceInfo_after";

			var orgData = table.cell(row, col).data();
			
			sendVo.empNm 		  = table.cell(row, 1).data();
			if (deleteYn == 'N') {
				sendVo.startDate 	= data.startDate;
				sendVo.endDate 		= data.endDate;
				sendVo.attendanceType = data.attendanceType;
				sendVo.memo 		= '배차:' + data.memo;
			} else {
				var clickYmd = $('#baseYm').val() + '-' + pad(col-DAY_START_COLUMN,2);
				sendVo.startDate 	= clickYmd;
				sendVo.endDate 		= clickYmd;
				sendVo.attendanceType = '취소';
				sendVo.memo 		= '휴가취소';
			}
			sendVo.deleteYn		= deleteYn;
			sendVo.id 			= '';
			sendVo.key 			= 'd' + (col-DAY_START_COLUMN);
			sendVo.routeNm      = ChatManager.$comboRouteNm.val();
			
			var jsonString = JSON.stringify (sendVo);
			console.log(jsonString);
			
			var result = false;	
			$.ajax({
				  url: url,
				  "data" : {strData : jsonString},
				  async : false,
				  //global : false,
			      success: function(data) {
					  console.log(data);
						if (deleteYn == 'N') {
							//등록
			    	   		//swal("정상처리되었습니다.[C]");
							// 휴가구분자 append
							var dayArray = data.split(',');
							for (var j = 0; j < dayArray.length; j++) {
								var dayCol = parseInt(dayArray[j]) + DAY_START_COLUMN;
				    	   		var loopData = table.cell(row, dayCol).data();
				    	   		table.cell(row, dayCol).data(loopData+OFFDAY_SET_CHAR);
							}							
						} else {
							//삭제
							orgData = orgData.replace(OFFDAY_SET_CHAR,'');
				    	   	table.cell(row, col).data(orgData);
						}
						//row,column 미배정건수와 근무자 월근무합계 재산출
			    	   	ChatManager.sumAllocateCount(table, row, col);
			    	   // 휴가정보 refresh
			    	    ChatManager.btnTab24_refresh();
			    	   	result=true;
			      },
			      error : function(request, status, error) {
					  //console.log(request);
					  //console.log(status);
					  //console.log(error);
		    	   swal("처리오류 : (key중복)" + request + '/' + status + '/' +error);
			    	result=false;
			      }			
			});
		 	return result;
		}

		ChatManager.MenuCancelAll = function (table,key, row,col) {
			//var table2 = $('#QueryResultGridSP').DataTable();
			var arr = table.rows(row).data().toArray();
			var procCnt = 0;
			$.each(arr, function ( idx, item ) {
				for (var key in item) {
					if (key.startsWith('d') && (item[key].trim() != '') && (!item[key].includes('#') )) {
						var seq = parseInt(key.replace('d','')) + DAY_START_COLUMN;
						////console.log("key " + key + " has value " + item[key] + ' :' + seq);
						ChatManager.MenuCancelCell(table,key,row,seq);
						procCnt++;
					}
				}
				
			});
			// SP 배정건수가 없을경우 , 타노선인경우는 row 데이타 삭제처리
			if (procCnt ==0 ) {
				var car_regno = table.cell(row,0).data();
				if (car_regno.includes(ChatManager.$comboRouteNm.val())) return;
				
				table.cell(row,ALLOCATE_BIT_COLUMN).data('D');	
				ChatManager.btnSPDelete(row);
				return false;
			}
			return true;
		}
		ChatManager.MenuCancelCell = function (table,key, row,col) {
			var orgData = table.cell(row, col).data();
			//var clickdata1 = orgData ;	
			var clickdata1 = orgData + AFTER_SET_CHAR;	
			var orgRow = $('#QueryResultGridDetail').dataTable().fnFindCellRowIndexes (clickdata1,col);
			// 원복
			//기사명이 없는경우
			var emp_nm = ChatManager.DetailTable.cell(orgRow,1).data();
			var clickdata2;
			if (emp_nm == '')
				 clickdata2 = orgData ;	
			else clickdata2 = orgData ;
				
				//console.log(orgData + ':' +orgRow + ':' + emp_nm + ':' + row + ':' + col);
				
			ChatManager.DetailTable.cell(orgRow,ALLOCATE_BIT_COLUMN).data('Y');			
			ChatManager.DetailTable.cell(orgRow,col).data(clickdata2).draw(false);			
			
			// SP clear
			table.cell(row, ALLOCATE_BIT_COLUMN).data('Y');
			table.cell(row, col).data(' ').draw();
			return true;
		} 
		
		// sp 선택후 고정근무자 '-' 지정
		ChatManager.MenuAddCell = function (table,key, row,col,options) {
			//todo - 타노선에 기 배정여부 체크
		  	//var result = ChatManager.MenuShowSPOtherAllocateInfo(currData,rowIndex,colIndex);
		
			//
			var orgRow = options.items[key].orgIdx;
			var orgData =   options.items[key].name.split('/')[0];
			//data = orgData.replace(BEFORE_SET_CHAR,'');
			//data = data.replace(NOEMP_SET_CHAR,'');
			table.cell(row, ALLOCATE_BIT_COLUMN).data('Y');
			table.cell(row, col).data(orgData).draw();	// SP 배차지정

			ChatManager.DetailTable.cell(orgRow,ALLOCATE_BIT_COLUMN).data('Y');			
			ChatManager.DetailTable.cell(orgRow, col).data(orgData+AFTER_SET_CHAR).draw();
			return true;
		}
		
		// 1. detail grid에서 editing change시
		// 2. sp grid에서 popup 메뉴 실행시
		ChatManager.sumAllocateCount = function (changeTable,row,col) {
			ChatManager.sumDailyAllocateCount(col);
			
			ChatManager.sumEmpAllocateCount(changeTable,row);
		}
		ChatManager.sumDailyAllocateCount = function (col) {
			// 일별 배정건수/미배정건수  합계 산출
			var notAllocationCount_am = 0;
			var notAllocationCount_pm = 0;
			var allocationCount_am = 0;
			var allocationCount_pm = 0;
 
			ChatManager.DetailTable.column( col ).data().each( function ( value, index ) {
				// 휴무.휴가,인데 미배정인경우만
				if (!value.includes(AFTER_SET_CHAR)) {
					if (regex2.test(value) || value.trim() == '')  {
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
				}
		    });
			ChatManager.SPTable.column( col ).data().each( function ( value, index ) {
				// 휴무.휴가,인데 미배정인경우만
				if (!value.includes(BEFORE_SET_CHAR) && !value.includes(SPOTHER_SET_CHAR) && !value.includes(OFFDAY_SET_CHAR)) {
						if (value.includes('a'))
							allocationCount_am++;
						else if (value.includes('p'))
							allocationCount_pm++;
				}
		    });

			//미배정건수
		    ChatManager.BasicTable.cell(5,col).data(String(notAllocationCount_am));
		    ChatManager.BasicTable.cell(6,col).data(String(notAllocationCount_pm));

		    var totCount=ChatManager.BasicTable.cell(2,col).data();
			//배정건수
		    ChatManager.BasicTable.cell(3,col).data(String(allocationCount_am));
		    ChatManager.BasicTable.cell(4,col).data(String(allocationCount_pm));
		    
		    // 미배정이 있으면 red
		    if (notAllocationCount_am > 0) 
		    	$(ChatManager.BasicTable.cell(5,col).node()).css('background-color', 'red');
		    if (notAllocationCount_pm > 0) 
		    	$(ChatManager.BasicTable.cell(6,col).node()).css('background-color', 'red');
			
			// 초과배정이면 red
		    if (totCount < (allocationCount_am + allocationCount_pm) ) {
		    	$(ChatManager.BasicTable.cell(3,col).node()).css('background-color', 'red');
		    	$(ChatManager.BasicTable.cell(4,col).node()).css('background-color', 'red');
		    } else if (totCount == (allocationCount_am + allocationCount_pm) ) {
				$(ChatManager.BasicTable.cell(3,col).node()).css('background-color', '');
				$(ChatManager.BasicTable.cell(4,col).node()).css('background-color', '');
				$(ChatManager.BasicTable.cell(5,col).node()).css('background-color', '');
				$(ChatManager.BasicTable.cell(6,col).node()).css('background-color', '');
			} else {
				$(ChatManager.BasicTable.cell(3,col).node()).css('background-color', 'aqua');
				$(ChatManager.BasicTable.cell(4,col).node()).css('background-color', 'aqua');
			}
		}
		    
		    // 사용안함
		ChatManager.sumDailyAllocateCount_temp = function (col) {
			var beforeSeq;
			ChatManager.DetailTable.column( col ).data().each( function ( value, index ) {
				//
				if (value == '0*-') {
					beforeSeq = ChatManager.DetailTable.cell(index-1, col).data();
					var num = beforeSeq.replace(/[^0-9]/g,'');
					var eng = beforeSeq.replace(/[^a-zA-Z]/g,'');
					
					beforeSeq = (parseInt(num) + 1) + eng + '*-';
					ChatManager.DetailTable.column( col ).data(beforeSeq);
				}
				////console.log(value + '-' + count);
		    });
		}		    
		ChatManager.sumEmpAllocateCount = function (changeTable,row) {
			var count = 0;
			var countA = 0;
			var countP = 0;
			// 기사별 근무일수  합계 산출
			var arr = changeTable.rows(row).data().toArray();
			////console.log(changeTable);
			var dayValue;
			$.each(arr, function ( idx, item ) {
				for (var key in item) {
					if (key.startsWith('d')) {
						dayValue = item[key];
						if (changeTable == ChatManager.DetailTable) {
							if (dayValue.trim() != '' && !regex2.test(dayValue)) {
								count++;
								
								if (dayValue.includes('a'))	countA++;
								if (dayValue.includes('p'))	countP++;
							} 
						} else {														
							if (dayValue.includes('a') || dayValue.includes('p')) {
								count++;
								if (dayValue.includes('a'))	countA++;
								if (dayValue.includes('p'))	countP++;
							} 
						}
					} 
				}
			});
		    changeTable.cell(row,DAY_START_COLUMN-2).data(String(countA));
		    changeTable.cell(row,DAY_START_COLUMN-1).data(String(countP));
		    changeTable.cell(row,DAY_START_COLUMN).data(String(count));
		}
		
		// 기사별 근무합계
		ChatManager.sumEmpTotWorkCount = function (changeTable) {
			changeTable.rows( function ( idx, aData, node2 ) {
				// 기사별 근무일수  합계 산출
				ChatManager.sumEmpAllocateCount(changeTable,idx);
			});
		}
		
		ChatManager.TBM_DRIVERINFO_DETAIL  = $("#TBM_DRIVERINFO_DETAIL").DataTable({
			    "scrollY": 520,
		        scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        scrollX: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        ,{ targets: "_all" , render: render_tab1}
	    		],
		        columns : [
	    	    	{data: "car_regno"			,width:'10%'		},
	    	        {data: "emp_nm"				,width:'5%'		},
	    	        {data: "prev_daily_seq" 	,width:'1%'		},
	    	        {data: "prev_work_pattern" 	,width:'7%'		},
	    	    	{data: "ampm_gubun"			,width:'1%'	},
	    	    	{data: "off_group"			,width:'1%'	},
	    	    	{data: "bit"				,visible:false	},
	    	    	{data: "key"				,visible:false	}
			    ]
		});  
		datatableEdit({
			dataTable : ChatManager.TBM_DRIVERINFO_DETAIL,
			//eventTarget : 'tbody td',
			columnDefs : [
					{targets : 1	,maxlength:10}
				,	{targets : 2	,maxlength:2}
				, 	{targets : 3	,maxlength:8}
				, 	{targets : 4	,maxlength:1}
				, 	{targets : 5	,maxlength:1}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					$(ChatManager.TBM_DRIVERINFO_DETAIL.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					ChatManager.TBM_DRIVERINFO_DETAIL.cell(index.row, 6).data('Y');
		        	var chk = $("input:checkbox[name='autoMatching']").is(":checked")
		        	if (chk) {
						var changeRowData = ChatManager.TBM_DRIVERINFO_DETAIL.row(index.row).data();
						var maxCnt = ChatManager.TBM_DRIVERINFO_DETAIL.rows().count() / 2;
						
						if (index.column == 2) {
							if (index.row == 0) {
								var startSeq = changeRowData.prev_daily_seq;
								ChatManager.TBM_DRIVERINFO_DETAIL.rows( function ( idx, aData, node2 ) {
										 
									aData.prev_daily_seq = startSeq;
									aData.bit = 'Y';
									$(node2).find('td').css('color', 'red');

									if (idx % 2 == 1)
										startSeq++;

									if (startSeq > maxCnt)
										startSeq = 1;
								});
								ChatManager.TBM_DRIVERINFO_DETAIL.rows().invalidate().draw( false );
							} else {
								ChatManager.TBM_DRIVERINFO_DETAIL.rows( function ( idx, aData, node2 ) {
									if(aData.car_regno == changeRowData.car_regno){
										aData.prev_daily_seq = changeRowData.prev_daily_seq;
										aData.bit = 'Y';
										ChatManager.TBM_DRIVERINFO_DETAIL.rows().invalidate().draw( false );
										$(node2).find('td').css('color', 'red');
									}
								});
							}
						}				
						if (index.column == 3) {
							ChatManager.TBM_DRIVERINFO_DETAIL.rows( function ( idx, aData, node2 ) {
								if(aData.car_regno == changeRowData.car_regno && aData.ampm_gubun != changeRowData.ampm_gubun){
									var newData = changeRowData.prev_work_pattern.replaceAll('a','P');
									//console.log(newData);
									newData = newData.replaceAll('p','A');
									//console.log(newData);
									newData = newData.toLowerCase();
									//console.log(newData);
									aData.prev_work_pattern = newData;
									aData.bit = 'Y';
									ChatManager.TBM_DRIVERINFO_DETAIL.rows().invalidate().draw( false );
									$(node2).find('td').css('color', 'red');
								}
								if(aData.off_group === changeRowData.off_group && aData.ampm_gubun == changeRowData.ampm_gubun ){
									aData.prev_work_pattern = changeRowData.prev_work_pattern;
									aData.bit = 'Y';
									ChatManager.TBM_DRIVERINFO_DETAIL.rows().invalidate().draw( false );
									$(node2).find('td').css('color', 'red');
								}
							});
						}				
					}
				}
			}
		});

		ChatManager.TBM_DRIVERINFO_SP  = $("#TBM_DRIVERINFO_SP").DataTable({
			    "scrollY": 460,
		        scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
	    	    //fixedHeader: true,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
		        "searching": true,
				dom: '<"top"i>rt<"bottom"flp><"clear">',
	            rowGroup: {
	                dataSrc: ["route_nm"]
	            },
		        scrollX: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        ,{ targets: "_all" , render: render_tab2}
	    		],
		        columns : [
	    	    	{data: "route_nm"			,width:'10%',visible:false	},
	    	        {data: "emp_nm"				,width:'10%'	},
	    	        {data: "birth_ymd"			,width:'10%'	},
	    	        {data: "enter_date"			,width:'10%'	},
	    	        {data: "hobong"				,width:'40%',visible:false	}
			    ]
		});  
		
		ChatManager.TBM_ROUTE_WEEKSEQ_INFO  = $("#TBM_ROUTE_WEEKSEQ_INFO").DataTable({
			    "scrollY": 460,
		        scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        scrollX: true,
	    	    //fixedHeader: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        ,{ targets: "_all" , render: render_tab23}
	    		],
		        columns : [
	    	    	{data: "week_gb"			,visible:false	},
	    	    	{data: "week_gb1"			,width:'10%'	},
	    	    	{data: "week_gb2"			,width:'10%'	},
	    	        {data: "next_work_interval"	,width:'10%'	},
	    	    	{data: "route_nm"			,visible:false	},
	    	    	{data: "bit"				,visible:false	}
			    ]
		});  
		datatableEdit({
			dataTable : ChatManager.TBM_ROUTE_WEEKSEQ_INFO,
			//eventTarget : 'tbody td',
			columnDefs : [
				 	{targets : 3	,maxlength:1}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					ChatManager.TBM_ROUTE_WEEKSEQ_INFO.cell(index.row, 5).data('Y');
					$(ChatManager.TBM_ROUTE_WEEKSEQ_INFO.cell({row: index.row, column: index.column}).node()).css('color', 'red');
				}
			}
		});
				

		ChatManager.TBM_EMPLOYEE_VACATION_INFO  = $("#TBM_EMPLOYEE_VACATION_INFO").DataTable({
			    "scrollY": 460,
		        scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        scrollX: true,
		        "searching": true,
				dom: '<"top"i>rt<"bottom"flp><"clear">',
	    	    //fixedHeader: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": [0,1,2]}
			        ,{"className": "dt-left", "targets": [3]}
			        ,{ targets: "_all" , render: render_tab24}
	    		],
		        columns : [
	    	    	{data: "start_date"			,width:'10%'	},
	    	    	{data: "emp_nm"				,width:'10%'	},
	    	    	{data: "attendance_type"	,width:'10%'	},
	    	        {data: "memo"				,width:'30%'	}
			    ]
		}); 
				
		ChatManager.TBM_MONTH_ARRANGE_STATUS  = $("#TBM_MONTH_ARRANGE_STATUS").DataTable({
			    "scrollY": 130,
		       // scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        //scrollX: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        //,{ targets: "_all" , render: render_tab1}
	    		],
		        columns : [
	    	    	{data: "route_nm"		,width:'20%'		},
	    	        {data: "status"			,width:'15%'		},
	    	        {data: "last_chg_user" 	,visible : false    },	
	    	        {data: "last_chg_date" 	,width:'50%'		}
			    ]
		});  
		ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP  = $("#TBM_MONTH_ARRANGE_STATUS_POPUP").DataTable({
			    "scrollY": 330,
		       // scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        //scrollX: true,
			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        ,{ targets: "_all" , render: render_arrangeStatus_popup}
	    		],
/*	    		select: {
	            	style: 'os',
	            	items: 'row'
	        	},
*/		        columns : [
	    	    	{data: "route_nm"		,width:'35%'		},
	    	        {data: "status"			,width:'20%'		},
	    	        {data: "last_chg_user" 	,width:'15%'		},
	    	        {data: "last_chg_date" 	,width:'30%'		}
			    ]
		});  

		ChatManager.TBM_ROUTE_REDUCTION_INFO  = $("#TBM_ROUTE_REDUCTION_INFO").DataTable({
			    "scrollY": 110,
		        //scrollCollapse: true,
	    	    "language": {
	    	        "emptyTable": "No data"
	    	    },    		
		        //scrollX: true,
/*	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
*/			    "columnDefs": [
			        {"className": "dt-center", "targets": "_all"}
			        //,{ targets: "_all" , render: render_tab1}
	    		],
		        columns : [
	    	    	{data: "route_nm"		,width:'25%'		},
	    	        {data: "tot_count"		,width:'25%'		},
	    	        {data: "sat_count" 		,width:'25%'		},
	    	        {data: "sun_count" 		,width:'25%'		},
	    	    	{data: "bit"			,visible:false	}
			    ]
		});  
		datatableEdit({
			dataTable : ChatManager.TBM_ROUTE_REDUCTION_INFO,
			//eventTarget : 'tbody td',
			columnDefs : [
					{targets : 2	,maxlength:1}
				, 	{targets : 3	,maxlength:1}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					$(ChatManager.TBM_ROUTE_REDUCTION_INFO.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					ChatManager.TBM_ROUTE_REDUCTION_INFO.cell(index.row, 4).data('Y');
				}
			}
		});
		
	    ChatManager.inputPwd = function () {
					$.MessageBox({
						    buttonDone  : "확인",
						    buttonFail  : "취소",
					    	input    : {
								pwd    : {
						            type         : "password",
						            label        : "비밀번호:",
						            title        : "비밀번호"
						       }
							},
					    	tupe : "textarea",
					    	message  : "비밀번호확인"
						}
					).done(function(data){
						//console.log(data);
						ChatManager.checkPwd(data.pwd);
					});				
		}

	    ChatManager.checkPwd = function (pwd) {
				$.ajax({
			       url : "/checkPassword",
			       "data" :  {pwd : pwd}, 	       
			        global: true,
			       	timeout : 10000,
			       	async : false,
	 				//dataType : 'json',
			       	success : function(ret) {
						if (ret == "ok")
							ChatManager.btnDelete();
						else {
							swal ('비밀번호 틀림');
							ChatManager.inputPwd();
						}
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error2");
			       }
				});
		}			
	    ChatManager.popupStatus = function (seq) {
			if (seq > 0) return;
			
			var targeted_popup_class = 'example'; 
			$('[data-popup="' + targeted_popup_class + '"]').fadeIn(100); 
			$('div.dataTables_filter input').focus();
			//this.preventDefault(); 
			ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP);
	    }

	    return ChatManager;
	}());
	/*
	 * 조회
	 */
	$('#QueryResultGridDetail2 tbody').on('dblclick','td', function() {
		var row = ChatManager.DetailTable.cell(this).index().row;
		var col = ChatManager.DetailTable.cell(this).index().column;
		var data = ChatManager.DetailTable.cell( row,col ).data();
		
		//var routeNm = encodeURIComponent(encodeURIComponent(ChatManager.$comboRouteNm.val())); // 한글은 두번
		//var baseYmd = $('#baseYm').val();
/*
		var key = "allocate" ;
		fnMdiOpen('배차지정',key,'/monitor/popupTableInfo.html?routeNm=' + routeNm + '&baseYmd=' + baseYmd , 280,610); // 이게 더 크게	
*/
		// sp 선택후 대차지정
		if (data.includes(BEFORE_SET_CHAR) && commonVo.select_SProw >= 0) {
			data = data.replace(BEFORE_SET_CHAR,'');
			var bError = false;
			ChatManager.SPTable.column( col ).data().each( function ( value, index ) {
				if (value == data) {
			        swal( '다른 SP에 기 배정됨' );
			        bError= true;
			        return;
			    }
		    });
    		if (bError == false){		
				////console.log(ChatManager.SPTable.cell(commonVo.select_SProw, col).data());
				if (ChatManager.SPTable.cell(commonVo.select_SProw, col).data() != ' ') {
					swal( '해당 SP에 배차정보가 지정되어있음' );
					return;
				}
				// 대차시 오전오후 지정
				var ampm_gubun=null;
				if (row % 2 == 0) {
					ampm_gubun = 'a';	// 대차시 오전오후 지정
				} else {
					ampm_gubun = 'p';	// 대차시 오전오후 지정
				}
				ChatManager.SPTable.cell(commonVo.select_SProw, col).data(data+ampm_gubun);	// 대차시 오전오후 지정
				ChatManager.DetailTable.cell(row, col).data(data+ampm_gubun+AFTER_SET_CHAR);
			}
			////console.log(selectedCount);
		}
	});
	
	// 타노선의 SP 기사를 배차현황판에 추가
	$('#TBM_DRIVERINFO_SP tbody').on('dblclick','td', function() {
	//$(document).on('click', '#btnTab22_add', function () {
//		 var selData = ChatManager.TBM_DRIVERINFO_SP.row('.selected' ).data();
//		var emp_nm = selData.emp_nm;
		var row = ChatManager.TBM_DRIVERINFO_SP.cell(this).index().row;
		var col = ChatManager.TBM_DRIVERINFO_SP.cell(this).index().column;
		var emp_nm = ChatManager.TBM_DRIVERINFO_SP.cell( row,1 ).data();

		
		var orgRow = $('#QueryResultGridSP').dataTable().fnFindCellRowIndexes (emp_nm,1);
		
		if (orgRow.length > 0) {
			swal('이미 배차현황판에 존재합니다.');
			return;
		}
/*		let new_row = ChatManager.SPTable.row(0).node().cloneNode(true);
		new_row.emp_nm = emp_nm;
		//console.log(new_row);
    	ChatManager.SPTable.row.add(new_row).draw();
*/
		commonVo.empNm = emp_nm;
		var commonVoStr = ChatManager.setParamVo(true,'add_sp_driver',true,'N');

			$.ajax({
			       url : "/BUS_addSPDriver_Other",
			       "data" :  {commonVoStr : commonVoStr}, 	       
			        //global: false, // 추가
			       	timeout : 10000,
			       	async : false,
	 				dataType : 'json',
			       	success : function(ret) {	
						   //console.log(ret);
			    	   	swal('타노선 SP가 추가되었습니다.');
		    	 	    ChatManager.SPTable.rows.add( ret ).draw( );
		    	 	    ChatManager.SPTable.order([35, 'asc']).draw();
		    	 	    //ChatManager.setTotalWorkCount (ret);
			    	   
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
	});	
	// 기사 이름 클릭시 근태정보 필터링
	$('#QueryResultGridDetail tbody').on('click','td', function() {
		var row = ChatManager.DetailTable.cell(this).index().row;
		var col = ChatManager.DetailTable.cell(this).index().column;
		var selection = ChatManager.DetailTable.cell( row,col ).data();
		if (col == 1) {
			////console.log(selection);
			ChatManager.TBM_EMPLOYEE_VACATION_INFO.search(selection).draw();
		}	
	});
	// 기사 이름 클릭시 근태정보 필터링
	$($('#QueryResultGridDetail').DataTable().table().header()).on( 'click', 'th', function () {
		var col = ChatManager.DetailTable.column( this ).index();
		if (col > DAY_START_COLUMN) {
			
			var selection = '-' + lpad(String(col-DAY_START_COLUMN),2,'0');
			//console.log(selection);
			ChatManager.TBM_EMPLOYEE_VACATION_INFO.search(selection).draw();
		}      
	});
	
/*	$("#baseYm").change(function(){
		ChatManager.btnQueryInitSeq();
	});
	$("#comboRouteNm").change(function(){
		ChatManager.btnQueryInitSeq();
	});	 
*/	
	$("#comboInitSeq").change(function(){
 	    var initSeq = ChatManager.$comboInitSeq.val();
 	    if (initSeq == null || initSeq =='')
 	    	return;
 	    	console.log(initSeq);
 	    ChatManager.btnSelect(false,'N',initSeq);
	});	 
	 	    	
	$(document).on('click', '#btnSelect', function () {
		$('.dynamicSqlGrid0_2_2').css('visibility', 'visible');
		
 	    ChatManager.BasicTable.clear().draw();
 	    ChatManager.DetailTable.clear().draw();
 	    ChatManager.SPTable.clear().draw();
 	    ChatManager.TBM_DRIVERINFO_DETAIL.clear().draw();
 	    ChatManager.TBM_DRIVERINFO_SP.clear().draw();

		$( "#tabs" ).tabs( "option", "active", 0 );

		ChatManager.btnSelect(true,'N',0);
	});
	$(document).on('click', '#btnInit', function () {
		var obj = this;
		$.confirm({
			title : '확인',
			content : '해당 노선의 월 배차정보를 새로 생성합니다!',
			 boxWidth: '20%',
			 useBootstrap: false,
			buttons: {
		        confirm: function () {
					ChatManager.btnInit();
		        },
		        cancel: function () {
		        },
		    }
		});		
		
	});
	
	// 저장( 저장 후 재조회)
	$(document).on('click', '#btnReview', function () {
		ChatManager.btnReview();
	});
	// upload
	$(document).on('click', '#btnUpload', function () {
		var baseYm = $('#baseYm').val();
		fnMdiOpen('uplaod','upload','/monitor/popupArrangeUpload.html?baseYm=' + baseYm , 1080,1010); // 이게 더 크게	
	});

	
	
	
	// 근태종류설정
	$(document).on('click', '#btnAddOffType', function () {
/*
		var colCounta = ChatManager.BasicTable.columns(':visible').count();
		var colCountb = ChatManager.DetailTable.columns(':visible').count();
		var colCountc = ChatManager.SPTable.columns(':visible').count();
	
	console.log(colCounta );
	console.log(colCountb );
	console.log(colCountc );
					var colCount = ChatManager.DetailTable.columns(':visible').count();
					// 1일날은 수작업 이후는 자동으로 계산하기위해 3부터 시작
					for (var i=3; i< colCount; i++) {
						ChatManager.sumDailyAllocateCount_temp(i);
					}
*/
		ChatManager.addOffType();
	});	

	// 노선 배차정보를 삭제
	$(document).on('click', '#btnDelete', function () {
		var cnt = ChatManager.BasicTable.rows().count();
		if (cnt == 0) {
			swal('대상자료가 없습니다');
			return null;
		}		
		$.confirm({
			title : '확인',
			content : '해당 노선 배차정보를 삭제합니다!',
			 boxWidth: '20%',
			 useBootstrap: false,
			buttons: {
		        confirm: function () {
					ChatManager.inputPwd();
					//ChatManager.btnDelete();
		        },
		        cancel: function () {
		        },
		    }
		});		
	});	
	// 배차확정
	$(document).on('click', '#btnFix', function () {
		ChatManager.btnFix('확정');
	});	
	// 배차확정취소
	$(document).on('click', '#btnFixCancel', function () {
		ChatManager.btnFix('작업중');
	});	
	// 배차
	$('#TBM_MONTH_ARRANGE_STATUS_POPUP tbody').on('click','td', function() {
		var row = ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP.cell(this).index().row;
		var col = ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP.cell(this).index().column;
		var routeNm = ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP.cell(row,col).data();
		
		$('#comboRouteNm').val(routeNm);
		 $('[data-popup-close]').trigger('click');
		
	});	

	/*
	 * 기준월변경시 헤당월의 노선상태 재조회
	*/
	$(document).on('change', '#baseYm', function () {
		ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
		$('.dynamicSqlGrid0_2_2').css('visibility', 'hidden');
		//ChatManager.popupStatus(0);

	})
	$('[data-popup-close]').on('click', function(e) { // 팝업 닫기 버튼 클릭시 동작하는 이벤트입니다. 
		var targeted_popup_class = jQuery(this).attr('data-popup-close'); 
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(100); 
		e.preventDefault(); 
	});

	$(document).on('click', '#btnTab21_save', function () {
		ChatManager.btnTab21_save();
	});	
	$(document).on('click', '#btnTab23_save', function () {
		ChatManager.btnTab23_save();
	});	
	$(document).on('click', '#btnTab31_refresh', function () {
		ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
	});	
	$(document).on('click', '#btnTab32_refresh', function () {
		ChatManager.btnRouteReductionInfo();
	});	

	$(document).on('click', '#btnTab32_save', function () {
		ChatManager.btnTab32_save();
	});	
	$(document).on('click', '#btnTab24_refresh', function () {
		ChatManager.btnTab24_refresh();
	});	

	$("input:checkbox[name='leftDiv']").on('click', function(){
       	var chk = $("input:checkbox[name='leftDiv']").is(":checked")
		var width1 = $(".dynamicSqlGrid0_2_2_1").width();
		var width2 = $(".dynamicSqlGrid0_2_2_2").width();
	    $(".dynamicSqlGrid0_2_2_1").toggle(1000);

		if (chk) {
		    $(".dynamicSqlGrid0_2_2_2").width(width2 - width1);
			ChatManager.DetailTable.rows().invalidate().draw( false );
			
		} else {
		    $(".dynamicSqlGrid0_2_2_2").width(width1+width2);
			ChatManager.DetailTable.rows().invalidate().draw( false );
		}
	});

	function test(){
	    $.ajax({
	        url : '/holidayInfoAPI',
    	   "data" :   {year:'2023', month:''},
	        error: function(xhr, status, error){
	            alert(error);
	        },
	        success : function(data){
	            //console.log(data);
	        }
	 
	 
	    });
    }

	function dynamicAjaxCall(filterType,table) {
		var commonVoStr = ChatManager.setParamVo(true,filterType,false,'N');
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
				   ////console.log(result);
		    	   table.clear().draw();
				   table.rows.add( result.data).draw(false);
		       },
		       error : function(request, status, error) {
		        	alert(request.responseText);
		       }
		});	
		
	}
	ChatManager.btnQueryRouteNm();
	ChatManager.btnQueryCommonCode();
	//ChatManager.btnRouteReductionInfo();
});

function fnMdiOpen (title,uniqueKey,url, w_width,w_height) {
	var iframName = uniqueKey;

	var child = document.getElementById(iframName);
	if (child != null) return;
	
	
	var text = '<iframe class="resized" id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';
	//var text = '<iframe id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';

	//var $objWindow = $('<div class="window">'+text+'</div>');
	 $objWindow = $('<div class="window resizer ugly">'+text+'</div>');
    var intRandom = Math.floor((Math.random() * 12) + 1);
    
    $($objWindow).appendTo('body');
    //var height = $(iframName).contents().height();
    //var width = $(iframName).contents().width();
    //$objWindow.itemCd=uniqueKey;
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

function divWrite(msg) {
	var div = document.getElementById('fixed');
	
	div.innerHTML += msg;
	}
