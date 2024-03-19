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
	var basicTable = $('#QueryResultGridBasic').DataTable();
	var week = basicTable.cell(0, meta.col).data();

	var api = new $.fn.dataTable.Api(meta.settings);
	if (week.toString().includes('월') || meta.col == lineGubunColumn ) {
		$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
		
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
		if (week == '월' || meta.col ==lineGubunColumn) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
		}
	}

/*	if ( row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}*/

	if (meta.col == 0 && row.dispatch_seq > 6) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');
	}

	if (meta.row % 2 == 0) {
		$(api.cell(meta.row, meta.col).node()).css('border-top', 'thin dashed gray');
	}    
	
	//근무일수 backcolor = gray
	if (meta.col <= 2) {
		//$(api.cell(meta.row, meta.col).node()).css('background-color', 'gray');
		//$(api.cell(meta.row, meta.col).node()).css('color', 'black');
		//return iData;
	} else if( meta.col >= lineGubunColumn && iData.includes(AFTER_SET_CHAR)){
		//감차
		//배정완료
		if (iData.includes(OFFDAY_SET_CHAR)){	
			var html = 	'<div class="div_afterAllocate_offday"></div>'
				+	'<div class="div_Text_afterAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
				;
     		return html;
     	} else  {
			var html = 	'<div class="div_afterAllocate"></div>'
				+	'<div class="div_Text_afterAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
				;
     		return html;
		}
	} else if( meta.col >= lineGubunColumn && iData.includes(BEFORE_SET_CHAR)){
		//휴식
		var html = 	'<div class="div_beforeAllocate"></div>'
				+	'<div class="div_Text_beforeAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'transparent');		
	
     	return html;
	} else if( meta.col >= lineGubunColumn && iData.includes(OFFDAY_SET_CHAR)){
		//휴식
		var html = 	'<div class="div_offDay"></div>'
				+	'<div class="div_Text_beforeAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'transparent');		
	
     	return html;
	} else if( meta.col >= lineGubunColumn && iData.includes(NOEMP_SET_CHAR)){
		var html = 	'<div class="div_beforeAllocate"></div>'
				+	'<div class="div_Text_beforeAllocate">'+ '<span data-toggle="tooltip" title="' + tooltipText + '">' + iData + '</span>'	+ '</div>'
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'transparent');		
/*		//휴식
		var html = 	'<div class="circle"></div>'
		+	'<div class="divtest2">'+ data	+ '</div>';
*/     	return html;
	} else if( meta.col >= lineGubunColumn && iData.includes('input')){
	} else {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');		
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
		if (week == '월' || meta.col ==lineGubunColumn) {
			$(api.cell(meta.row, meta.col).node()).css('border-left', '1px solid black');
		}
	}
/*	if ( row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}
*/
	if (meta.col == 0 && row.dispatch_seq > 6) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');
	}
	if (meta.col <= 2) {
	} else if( meta.col >= lineGubunColumn && iData.includes(SPOTHER_SET_CHAR)){
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'pink');		
	} else if( meta.col >= lineGubunColumn && iData == OFFDAY_SET_CHAR){
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'red');		
	} else if( meta.col >= lineGubunColumn && iData.trim() == '') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	} else if( meta.col >= lineGubunColumn && iData.trim() != ''){
		$(api.cell(meta.row, meta.col).node()).css('background-color', '');		
	} else {
	}
	return data;
}


$( function() {
	//$("#baseYm").inputmask("0000/00",{placeholder:" ", clearMaskOnLostFocus:true, removeMaskOnSubmit:true });
    //$('input[name="date"]').mask('0000/00');
    //$("#baseYm").inputmask({greedy: false});
  
/*
 $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월',
        '7월','8월','9월','10월','11월','12월'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        weekHeader: 'Wk',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '',
        showOn: 'both',
        buttonText: "달력2",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: false,
        yearRange: 'c-99:c+99'
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);

    var datepicker_default = {
        showOn: 'both',
        buttonText: "",
        currentText: "이번달",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: 'c-99:c+99',
        showOtherMonths: true,
        selectOtherMonths: true
    }

    datepicker_default.closeText = "선택";
    datepicker_default.dateFormat = "yy-mm";
    datepicker_default.onClose = function (dateText, inst) {
        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
        $(this).datepicker('setDate', new Date(year, month, 1));
    }

    datepicker_default.beforeShow = function () {
        var selectDate = $("#baseYm").val().split("-");
        var year = Number(selectDate[0]);
        var month = Number(selectDate[1]) - 1;
        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
    }
  
  $("#baseYm").attr("autocomplete", "off");
    $("#baseYm").datepicker(datepicker_default);
*/    
	$("#baseYm").val("");
    var baseYm = $('#baseYm');
		baseYm.inputmask(
		    "9999-99"
		);

  	$('.tab_svc2').hide();
  	$($('.active2').find('a').attr('href')).show();
  
	$("ul.tabs_svc2 li").click(function () {
		var activeTab = $(this).find("a").attr("href");
		
		$("ul.tabs_svc2 li").removeClass("active2");
	    //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
	    $(this).addClass("active2");
	    $(".tab_svc2").hide();
	    console.log("ul :" + activeTab);
	    $(activeTab).fadeIn();
	    
	    var ret = ChatManager.checkinvalid();
	    console.log(ret);
	    if (ret == null) {
	    	return;
	    }
	    if (activeTab == "#svc_tab21") {
			ChatManager.btnTab21_refresh();
	    } else if (activeTab == "#svc_tab22") {
			ChatManager.btnTab22_refresh();
	    } else if (activeTab == "#svc_tab23") {
			ChatManager.btnTab23_refresh();
	    } else if (activeTab == "#svc_tab24") {
			ChatManager.btnTab24_refresh();
	    }
	});  
    
    
  	//$('.tab_svc3').hide();
  	$($('.active3').find('a').attr('href')).show();
  
	$("ul.tabs_svc3 li").click(function () {
		var activeTab = $(this).find("a").attr("href");
		
		$("ul.tabs_svc3 li").removeClass("active3");
	    //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
	    $(this).addClass("active3");
	    $(".tab_svc3").hide();
	    console.log("ul :" + activeTab);
	    $(activeTab).fadeIn();
	    if (activeTab == "#svc_tab31") {
			ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
	    } else if (activeTab == "#svc_tab32") {
			ChatManager.btnRouteReductionInfo();
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
	    ChatManager.TBM_DRIVER_ATTENDANCE_INFO = null;
	    ChatManager.$group = $('#group');
	    ChatManager.SPTable =null;
		commonVo.select_SProw = -1;
				    
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryGroup = function () {
			var jsonString = ChatManager.setParamVo(false,'',true,'N');
			$.ajax({
			       url : "/BUS_getRouteNmInfo",
			      "data" : {strData : jsonString},
			       "dataSrc" : "",
			        //global: false, // 추가
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
	    ChatManager.setParamVo = function setParamVo(bValidCheck,filterType,bIncludeHeader,offIncludeYn) {
			commonVo.filterType = filterType;
			commonVo.routeNm = ChatManager.$group.val();
			commonVo.includeHeader = bIncludeHeader;
			commonVo.offIncludeYn = offIncludeYn;

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
	     * 기초자료생성 1~6번생성
	     */
	    ChatManager.btnInit = function btnInit() {
	 	    ChatManager.BasicTable.clear();
	 	    ChatManager.DetailTable.clear();
			
			var jsonString = ChatManager.setParamVo(true,'',true,'N');
			//console.log(jsonString);
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
	    	 	    ChatManager.btnSelect(true,'N');
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
					   console.log(result);
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
	    ChatManager.btnSelect = function btnSelect(bPatternShow,offIncludeYn) {
	 	    
			var jsonString = ChatManager.setParamVo(true,'',true,offIncludeYn);
			//console.log(jsonString);
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
					
	    	 	    if (bPatternShow) {
		    	 	    //ChatManager.setTotalWorkCount (ret);
	    	 	    	dynamicAjaxCall('TBM_DRIVERINFO_DETAIL',ChatManager.TBM_DRIVERINFO_DETAIL);
	    	 	    }
	    	 	    ChatManager.checkArrangeStatus();
					ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);

	    	 	    
	 	    		ChatManager.DetailTable.rows( function ( idx, aData, node2 ) {
						// 일별 배정/미배정 합계 산출
						if (idx >2)
							ChatManager.sumDailyAllocateCount(idx);
					});
		
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
			var jsonString = ChatManager.setParamVo(true,'',true,'Y');
			//console.log(jsonString);
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
			

			var orgRow = $('#TBM_MONTH_ARRANGE_STATUS').dataTable().fnFindCellRowIndexes (ChatManager.$group.val(),0);
			var status = ChatManager.TBM_MONTH_ARRANGE_STATUS.cell(orgRow,1).data();
			
			if (status == '확정') {
				$('.pjy_button_fixed').prop('disabled', true);
				$('.pjy_table_fixed').addClass("disabled");
				$(".pjy_button_unfixed").prop('disabled', false);
			} else {
				$('.pjy_button_fixed').prop('disabled', false);
				$('.pjy_table_fixed').removeClass("disabled");
				$('.pjy_button_unfixed').prop('disabled', true);
			}
		}
	    /*
	    *  검토(현재상황저장 및 재조회)
	    */
	    ChatManager.btnReview = function btnReview() {
			var commonVoString = ChatManager.setParamVo(true,'BUS_monthArrangeReview',true,'N');
			
			var itemList  = ChatManager.DetailTable.rows().data().toArray();
			var itemList2  = ChatManager.SPTable.rows().data().toArray();
			
			//console.log(itemList);
			
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
			    	   ChatManager.btnSelect(false,'N');
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
	    ChatManager.btnSave = function btnSave(status) {
	 	    //ChatManager.BasicTable.clear();
	 	    //ChatManager.DetailTable.clear();
	 	    commonVo.arrangeStatus = status;
			var jsonString = ChatManager.setParamVo(true,'',true,'N');
			console.log(jsonString);
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
	    	 			
	    	 		//$('#btnInit').attr('disabled', true);
					//$('#btnReview').attr('disabled', true);

	    	 	    ChatManager.btnArrangeStatusRefresh(ChatManager.TBM_MONTH_ARRANGE_STATUS);
	    	 	    ChatManager.btnSelect(false,'N');
	    	    },
	    	    error : function(request, status, error) {
	    	 	   swal(request.responseText + error + status,'error');
	    	    }
	    	});		    			
	    }		  
	    // 전월 패턴저장
	    ChatManager.btnTab21_save = function () {
			var commonVoString = ChatManager.setParamVo(true,'update_tbm_driverInfo_detail',true,'N');
			var table = $('#TBM_DRIVERINFO_DETAIL').DataTable();
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
			    	  // tab_1_show();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}
	    // 노선별 요일별 근무순번조정
	    ChatManager.btnTab23_save = function () {
			var commonVoString = ChatManager.setParamVo(true,'updateTBM_ROUTE_WEEKSEQ_INFO',true,'N');
			var table = $('#TBM_ROUTE_WEEKSEQ_INFO').DataTable();
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
			    	  // tab_1_show();
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
	    	var table = $('#TBM_DRIVER_ATTENDANCE_INFO').DataTable();
			table.search('').draw();
			dynamicAjaxCall('TBM_DRIVER_ATTENDANCE_INFO',table);
		}		

	    // 전체노선 감차/근무간격 저장
	    ChatManager.btnTab32_save = function () {
			var commonVoString = ChatManager.setParamVo(true,'update_tbm_routeReduction_Info',true,'N');
			var table = $('#TBM_ROUTE_REDUCTION_INFO').DataTable();
			var itemList  = table.rows().data().toArray();
			var jsonString = JSON.stringify (itemList);

			console.log(jsonString);
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
		    for (var i =0; i<5;i++) {
				$(ChatManager.BasicTable.cell(i, 0).node()).attr('colspan','3');
  				$(ChatManager.BasicTable.cell(i, 1).node()).css('display','none');
  				$(ChatManager.BasicTable.cell(i, 2).node()).css('display','none');
			}  
		}
		ChatManager.updateDS = function (table,row,Dataset) {
		    //Dataset[row] = 		    table.rows(row).data();
		    console.log($(ChatManager.DetailTable.cell(2, 3).node()).find('span').attr('title'));
			console.log ( $(ChatManager.DetailTable.cell(2, 3).node()).find('span').text());

		}
	    ChatManager.BasicTable = $("#QueryResultGridBasic").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": 87,
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
					if (prev.includes(OFFDAY_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev);
						swal('휴가정보는 수기 삭제불가')
						return false;
					}
					if (changed.includes(OFFDAY_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev);
						swal('휴가정보는 수기 등록불가:  마우스우클릭후 휴가등록 가능')
						return false;
					}
					if (prev.includes(AFTER_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev);
						swal('SP가 지정된 경우 수정불가')
						return false;
					}ㅣ
					if (changed.includes(AFTER_SET_CHAR)) {
						ChatManager.DetailTable.cell(index.row, index.column).data(prev);
						swal('SP 지정은 하단 SP그리드 우측마우스클릭후 지정가능')
						return false;
					}

					$(ChatManager.DetailTable.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					ChatManager.DetailTable.cell(index.row, ALLOCATE_BIT_COLUMN).data('Y');
					ChatManager.sumAllocateCount(ChatManager.DetailTable, index.row, index.column);
					
					var data = changed.replace(AFTER_SET_CHAR,'').replace(OFFDAY_SET_CHAR,'').replace(SPOTHER_SET_CHAR,'');
					ChatManager.DetailTable.cell(index.row, index.column).data(data);
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
          	  
          	  	if (colIndex > 2) {
					if(!regex2.test(currData)) {
						options.items["regAttendance"] = {name: emp_nm + ' : ' + (colIndex-2) +'일 휴가등록',icon:"add"};
						return options;  		 
					}
	  		  	}
	  		  	return false;
  		  	}
  		});  
		var contextMenuHandler3=function(table,key, options) {
			var col = parseInt(options.$trigger[0].cellIndex),
			rows = table.row(options.$trigger[0].parentNode),
			row = rows.index();
			
			switch(key){
				case "regAttendance":
					$.MessageBox({
						    buttonDone  : "등록",
						    buttonFail  : "취소",
					    	input    : {
    					        attendanceType : {
						            type         : "select",
						            label        : "근태구분선택:",
						            title        : "Select 근태구분",
						            options      : ["휴가", "병가", "기타"]
						        },								
								memo    : {
						            type         : "text",
						            label        : "메모:",
						            title        : "근태등록사유"
						        }
							},
					    	tupe : "textarea",
					    	message  : "근태등록"
						}
					).done(function(data){
						//console.log(data.attendanceType);
						//console.log(data.memo);
						ChatManager.regAttendance(table,key,row,col,data);
					});
					
					break;
				default :
					break;					
			}
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
          	  
          	  	if (colIndex <= 2) {
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
          	  	if (colIndex > 2) {
					var options = {
	           		  	items: {},
	                  	callback: function (key, options, e) {
						  	contextMenuHandler2(ChatManager.SPTable,key, options);
	                  	}
					};
					// 타 노선 배정된 sp인경우
	          	  	if (currData.includes('#')) {
		  			  	var result = ChatManager.MenuShowSPOtherAllocateInfo(currData,rowIndex,colIndex);
		  			  	//console.log(result);
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
								var key = 'cell'+index;
								//console.log(key);
					  			options.items[key] = {name: value + '/' + emp_nm,icon:"add",orgIdx :index};
								bExists = true;
							}
						});
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
			
			switch(key){
				case "cancelRow":
					ChatManager.MenuCancelAll(table,key,row,col);
					break;
				case "cancelCell":
					ChatManager.MenuCancelCell(table,key,row,col);
					break;
				case "none":
					return;
				default :
					ChatManager.MenuAddCell(table,key,row,col,options);
					break;					
			}
			ChatManager.sumAllocateCount(table, row, col);
		}

		ChatManager.MenuShowSPOtherAllocateInfo = function (currData, row,col) {
			commonVo.checkDay = String(col-2);
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
					   //console.log(result);
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
		ChatManager.regAttendance = function (table,key, row,col,data) {
			var sendVo =  new Object();
			var url;
			sendVo.regDate 	= comm_getToday2();


			var clickYmd = $('#baseYm').val() + '-' + pad(col-2,2);
			console.log(clickYmd);

/*			if (clickYmd < sendVo.regDate) {
				swal('과거일자는 휴가등록이 불가합니다');
				return;
			}		
*/		
			url = "/InsertAttendanceInfo_after";

			var orgData = ChatManager.DetailTable.cell(row, col).data();
			
			sendVo.empNm 		  = ChatManager.DetailTable.cell(row, 1).data();
			sendVo.attendanceType = data.attendanceType;
			sendVo.startDate 	= clickYmd;
			sendVo.endDate 		= clickYmd;
			sendVo.memo 		= '배차:' + data.memo;
			sendVo.deleteYn		= 'N';
			sendVo.id 			= '';
			sendVo.key 			= 'd' + (col-2);
			sendVo.routeNm      = ChatManager.$group.val();
			
			var jsonString = JSON.stringify (sendVo);
			console.log(jsonString);
			
			var result = false;	
			$.ajax({
				  url: url,
				  "data" : {strData : jsonString},
				  async : false,
				  //global : false,
			      success: function(data) {
			    	   	swal("정상처리되었습니다.[C]");
						
						// 휴가구분자 append
			    	   	ChatManager.DetailTable.cell(row, col).data(orgData+OFFDAY_SET_CHAR);
						//row,column 미배정건수와 근무자 월근무합계 재산출
			    	   	ChatManager.sumAllocateCount(ChatManager.DetailTable, row, col);
			    	   // 휴가정보 refresh
			    	    ChatManager.btnTab24_refresh();
			    	   	result=true;
			      },
			      error : function(request, status, error) {
					  console.log(request);
					  console.log(status);
					  console.log(error);
		    	   swal("처리오류 : (key중복)" + request + '/' + status + '/' +error);
			    	result=false;
			      }			
			});
		 	return result;
		}
		ChatManager.MenuCancelAll = function (table,key, row,col) {
			//var table2 = $('#QueryResultGridSP').DataTable();
			var arr = table.rows(row).data().toArray();
			$.each(arr, function ( idx, item ) {
				for (var key in item) {
					if (key.startsWith('d') && (item[key].trim() != '')) {
						var seq = parseInt(key.replace('d','')) + 2;
						//console.log("key " + key + " has value " + item[key] + ' :' + seq);
						ChatManager.MenuCancelCell(table,key,row,seq);
					}
				}
				
			});
			
			
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
				
				console.log(orgData + ':' +orgRow + ':' + emp_nm + ':' + row + ':' + col);
				
			ChatManager.DetailTable.cell(orgRow,ALLOCATE_BIT_COLUMN).data('Y');			
			ChatManager.DetailTable.cell(orgRow,col).data(clickdata2).draw(false);			
			
			// SP clear
			table.cell(row, ALLOCATE_BIT_COLUMN).data('Y');
			table.cell(row, col).data(' ').draw();
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
		}
		
		// 1. detail grid에서 editing change시
		// 2. sp grid에서 popup 메뉴 실행시
		ChatManager.sumAllocateCount = function (changeTable,row,col) {
			ChatManager.sumDailyAllocateCount(col);
			ChatManager.sumEmpAllocateCount(changeTable,row);
		}
		ChatManager.sumDailyAllocateCount = function (col) {
			// 일별 배정건수/미배정건수  합계 산출
			var count = 0;
 
			ChatManager.DetailTable.column( col ).data().each( function ( value, index ) {
				if ((regex2.test(value) || value.trim() == '') && !value.includes(AFTER_SET_CHAR)) {
					count++;
				}
				//console.log(value + '-' + count);
		    });
		    ChatManager.BasicTable.cell(4,col).data(String(count));
		    var totCount=ChatManager.BasicTable.cell(2,col).data();
		    ChatManager.BasicTable.cell(3,col).data(String(totCount-count));
		}
		    
		ChatManager.sumEmpAllocateCount = function (changeTable,row) {
			var count = 0;
			// 기사별 근무일수  합계 산출
			var arr = changeTable.rows(row).data().toArray();
			//console.log(changeTable);
			$.each(arr, function ( idx, item ) {
				for (var key in item) {
					if (key.startsWith('d')) {
						if (changeTable == ChatManager.DetailTable) {
							if (item[key].trim() != '' && !regex2.test(item[key])) 
								count++;
						} else {														
							if (item[key].trim() != '') 
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
		
		ChatManager.TBM_DRIVERINFO_DETAIL  = $("#TBM_DRIVERINFO_DETAIL").DataTable({
			    "scrollY": 500,
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
	    	        {data: "emp_nm"				,width:'4%'		},
	    	        {data: "prev_daily_seq" 	,width:'1%'		},
	    	        {data: "prev_work_pattern" 	,width:'7%'		},
	    	    	{data: "ampm_gubun"			,width:'1%'	},
	    	    	{data: "off_group"			,width:'1%'	},
	    	    	{data: "bit"				,visible:false	},
			    ]
		});  
		datatableEdit({
			dataTable : ChatManager.TBM_DRIVERINFO_DETAIL,
			//eventTarget : 'tbody td',
			columnDefs : [
					{targets : 2	,maxlength:2}
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
						
						if (index.column == 2) {
							ChatManager.TBM_DRIVERINFO_DETAIL.rows( function ( idx, aData, node2 ) {
								if(aData.car_regno == changeRowData.car_regno){
									aData.prev_daily_seq = changeRowData.prev_daily_seq;
									aData.bit = 'Y';
									ChatManager.TBM_DRIVERINFO_DETAIL.rows().invalidate().draw( false );
									$(node2).find('td').css('color', 'red');
								}
							});
						}				
						if (index.column == 3) {
							ChatManager.TBM_DRIVERINFO_DETAIL.rows( function ( idx, aData, node2 ) {
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
	    	        {data: "hobong"				,width:'40%'	}
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
				

		ChatManager.TBM_DRIVER_ATTENDANCE_INFO  = $("#TBM_DRIVER_ATTENDANCE_INFO").DataTable({
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
	    	        {data: "last_chg_user" 	,width:'15%'		},
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
		
		//var routeNm = encodeURIComponent(encodeURIComponent(ChatManager.$group.val())); // 한글은 두번
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
				//console.log(ChatManager.SPTable.cell(commonVo.select_SProw, col).data());
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
			//console.log(selectedCount);
		}
	});
	
	// 타노선의 SP 기사를 배차현황판에 추가
	$(document).on('click', '#btnTab22_add', function () {
		 var selData = ChatManager.TBM_DRIVERINFO_SP.row('.selected' ).data();
		var emp_nm = selData.emp_nm;
		
		var orgRow = $('#QueryResultGridSP').dataTable().fnFindCellRowIndexes (emp_nm,1);
		
		if (orgRow.length > 0) {
			swal('이미 배차현황판에 존재합니다.');
			return;
		}
/*		let new_row = ChatManager.SPTable.row(0).node().cloneNode(true);
		new_row.emp_nm = emp_nm;
		console.log(new_row);
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
						   console.log(ret);
			    	   	swal('타노선 SP가 추가되었습니다.');
		    	 	    ChatManager.SPTable.rows.add( ret ).draw( );
		    	 	    ChatManager.SPTable.order([35, 'asc']).draw();
		    	 	    ChatManager.setTotalWorkCount (ret);
			    	   
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
			//console.log(selection);
			ChatManager.TBM_DRIVER_ATTENDANCE_INFO.search(selection).draw();
		}	
	});
	// 기사 이름 클릭시 근태정보 필터링
	$($('#QueryResultGridDetail').DataTable().table().header()).on( 'click', 'th', function () {
		var col = ChatManager.DetailTable.column( this ).index();
		if (col > 2) {
			
			var selection = '-' + lpad(String(col-2),2,'0');
			console.log(selection);
			ChatManager.TBM_DRIVER_ATTENDANCE_INFO.search(selection).draw();
		}      
	});
		
	$(document).on('click', '#btnSelect', function () {
		$('.dynamicSqlGrid0_2_2').css('visibility', 'visible');
		
 	    ChatManager.BasicTable.clear().draw();
 	    ChatManager.DetailTable.clear().draw();
 	    ChatManager.SPTable.clear().draw();
 	    ChatManager.TBM_DRIVERINFO_DETAIL.clear().draw();
 	    ChatManager.TBM_DRIVERINFO_SP.clear().draw();

		
		ChatManager.btnSelect(true,'N');
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
	$(document).on('click', '#btnReview', function () {
//ChatManager.updateDS ();
		ChatManager.btnReview();
	});

	// 근태정보가져오기
	$(document).on('click', '#btnDelete', function () {
		$.confirm({
			title : '확인',
			content : '해당 노선 배차정보를 삭제합니다!',
			 boxWidth: '20%',
			 useBootstrap: false,
			buttons: {
		        confirm: function () {
					ChatManager.btnDelete();
		        },
		        cancel: function () {
		        },
		    }
		});		
	});	
	// 배차확정
	$(document).on('click', '#btnSave', function () {
		ChatManager.btnSave('확정');
	});	
	// 배차확정취소
	$(document).on('click', '#btnSaveCancel', function () {
		ChatManager.btnSave('작업중');
	});	
	// 배차
	$('#TBM_MONTH_ARRANGE_STATUS_POPUP tbody').on('click','td', function() {
		var row = ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP.cell(this).index().row;
		var col = ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP.cell(this).index().column;
		var routeNm = ChatManager.TBM_MONTH_ARRANGE_STATUS_POPUP.cell(row,col).data();
		
		$('#group').val(routeNm);
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
	$(document).on('click', '#btnTab32_save', function () {
		ChatManager.btnTab32_save();
	});	
	$(document).on('click', '#btnTab24_refresh', function () {
		ChatManager.btnTab24_refresh();
	});	

	function test(){
	    $.ajax({
	        url : '/holidayInfoAPI',
    	   "data" :   {year:'2023', month:''},
	        error: function(xhr, status, error){
	            alert(error);
	        },
	        success : function(data){
	            console.log(data);
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
	//ChatManager.btnRouteReductionInfo();
});



function fnMdiOpen (title,itemCd,url, w_width,w_height) {
	var iframName = "iframe_" + itemCd;

	var child = document.getElementById("iframe_" + itemCd);
	if (child != null) return;
	
	
	var text = '<iframe class="resized" id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';
	//var text = '<iframe id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';

	//var $objWindow = $('<div class="window">'+text+'</div>');
	var $objWindow = $('<div class="window resizer ugly">'+text+'</div>');
    var intRandom = Math.floor((Math.random() * 12) + 1);
    
    $($objWindow).appendTo('body');
    //var height = $(iframName).contents().height();
    //var width = $(iframName).contents().width();
    $objWindow.itemCd=itemCd;
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
        maximizable: true,
        minimizable: true,
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
        icon: '/resources/static/node_modules/jquery-lwd/themes/material/images/icons/'+intRandom+'.png'
    });
}