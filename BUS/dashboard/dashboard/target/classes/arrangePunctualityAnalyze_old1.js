/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '버스ID';
 var endString = '요약';
 var startRow = 6;

  
function render_check(data,type,row,meta){
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col > 9 && meta.col < 11)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	if (meta.col > 11 && meta.col < 19)
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
			
	return data;
}
function render_QueryResult(data,type,row,meta){
	return data;
} 
 
$( function() {
/*	$.datepicker.setDefaults( $.datepicker.regional["ko"]);
	//$( "#datepicker" ).datepicker();
	   
 	var dateFormat = "yy-mm-dd",
      baseYmd = $( "#baseYmd" )
        .datepicker({
          defaultDate: "-1w",
      changeMonth: true,
      changeYear: true,
          numberOfMonths: 1
        });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }	   
	$( "#baseYmd" ).datepicker("option", "dateFormat", "yy-mm-dd");
	$( "#baseYmd" ).val(comm_getToday2());*/
	
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        input: {
            element: '#baseYmd',
            format: 'yyyy-MM-dd'
        }
    });
    
    	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    ChatManager.$group = $('#group');
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryGroup = function () {
			var jsonString = ChatManager.setCommonVo('','','',false);
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

	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText,bValidCheck) {
			var baseYmd = $('#baseYmd').val();
			var routeNm = ChatManager.$group.val();
			if (bValidCheck) {
			    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
					swal('기준일을 입력하세요');
					return null;
				}
				if (routeNm == null || routeNm == undefined || routeNm == '') {
					swal('노선번호를 입력하세요');
					return null;
				}
			}	
			var checkDay = 'd' + parseInt(baseYmd.substring(8,10));
			//console.log(checkDay);
			
			commonVo.checkDay = checkDay;
			commonVo.baseYmd = baseYmd;
			commonVo.routeNm = ChatManager.$group.val();
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#newtable').DataTable();
			var itemList = [];
			
			
			
	    	table.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
				 var vo =  new Object();
				 vo = Object.assign({}, aData);
				 
				itemList [idx] = vo;
			});

			return JSON.stringify (itemList);
			
		}
		/*
		 *  저장
		 */
	    ChatManager.btnSave = function () {
			commonVo.baseYm = null;
			var commonVoString = ChatManager.setCommonVo('TBL_ARRANGE_PUNCTUALITY_ANALIZE','TBL_ARRANGE_PUNCTUALITY_ANALIZE','',true);
			var jsonString = ChatManager.setSaveParamVo();
			
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
			    	   //popupManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 *  검토
		 */
	    ChatManager.btnProc = function () {
			
			var table = $('#exceltable').DataTable();
			var table2 = $('#newtable').DataTable();
			
			table2.clear().draw();
			
			var arr = table.rows().data().toArray();
			var arr2 = table.rows().data().toArray();
			
			var wiban_gijun = $('#wiban_gijun').val();
			var wiban_min_value = parseInt($('#wiban_min_value').val());
			var wiban_max_value = parseInt($('#wiban_max_value').val());
			
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
				//var arr3 = table2.rows().data().toArray();
			//console.log(arr3);
		}
		/*
		 *  조회
		 */
	    ChatManager.btnView = function () {
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
			var baseYmd = $('#baseYmd').val();
			commonVo.baseYm  = baseYmd.substring(0,7);
			var commonVoString = ChatManager.setCommonVo('TBL_ARRANGE_PUNCTUALITY_INFO','TBL_ARRANGE_PUNCTUALITY_INFO_DETAIL','',true);
			if (commonVoString == null)
				return;
			//console.log(commonVoString);
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
							aaa = ret.data[0][colNm];
			    	        if (aaa == ' ') {
								break;
							} else {
				    	        columns[i] = {
									'name' : colNm,
				    	            'title': i < 7 ? colNm : ret.data[0][colNm],
				    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
				    	            'render' : render_QueryResult,
				    	            'visible' : (i != 1 && i < 7) ? false : true
				    	        }
				    	        newColumns[newNo++] = columns[i];
				    	        if (i == 11) {
					    	        newColumns[newNo++] = {render:render_check,title:'배차간격',data:'term'};
					    	        newColumns[newNo++] = {render:render_check,title:title_85,data:'term_85'};
					    	        newColumns[newNo++] = {render:render_check,title:title_125,data:'term_125'};
					    	        newColumns[newNo++] = {render:render_check,title:'몰림',data:'term_past_cnt'};
					    	        newColumns[newNo++] = {render:render_check,title:'지연',data:'term_late_cnt'};
					    	        newColumns[newNo++] = {render:render_check,title:'위반건수',data:'term_wiban_cnt'};
					    	        newColumns[newNo++] = {render:render_check,title:'정류장수',data:'total_station_cnt'};
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
		    	        fn_setGridData('#exceltable',columns,ret.data,5);
		    	        fn_setGridData('#newtable',newColumns,initData,6);
		    	        
		    	        //console.log(ret.data);
		    	        //console.log(initData);
						//ChatManager.btnProc();
						$('.pjy_button_unfixed').show();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
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
	    return ChatManager;
	}());
	$('.pjy_button_unfixed').hide();
	ChatManager.btnQueryGroup();

	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
		$('.pjy_button_unfixed').hide();
   		$('#exceltable').DataTable().clear().destroy();
   		$('#newtable').DataTable().clear().destroy();
   		$('#exceltable').empty();    
   		$('#newtable').empty();    
   		$('#code_am').val('');    
   		$('#code_pm').val('');    
   	});
	$(document).on('click', '#btnView', function () {
		ChatManager.btnView();
	});
	$(document).on('click', '#btnSave', function () {
		ChatManager.btnSave();
	});
	$(document).on('click', '#btnProc', function () {
		ChatManager.btnAMPMSeq();		
		ChatManager.btnProc();
	});
	$(document).on('click', '#btnCommonView', function () {
		fnMdiOpen('배차정시성 분석대상 설정','common','/monitor/popupPunctualityTargetSeq.html', 500,300); // 이게 더 크게	
	});
	
	//$(tableTopN.table().container()).on('dblclick','td', function() {
	$('#newtable').on('click','td', function() {
		var table2 = $('#newtable').DataTable();
		var row = table2.cell(this).index().row;
		var col = table2.cell(this).index().column;
		
		//var arr = table2.rows(row).data().toArray();
		//console.log(arr);
		var arr = [];
		var colCount = table2.columns(':visible').count();
		for (var i=0; i< colCount; i++) {
			arr.push( table2.cell(row,i).data());
		}
		//console.log(arr);

		var arrHeader = table2.columns().header().map(d => d.textContent).toArray()
		//console.log(arrHeader);

		//return;

		
		    
		//console.log(arr);

		//var arrHeader = table2.columns().header().map(d => d.textContent).toArray()
		//console.log(arrHeader);
		
		//for (var key in arr[0]){
		//      console.log( 'Data in index: '+key+' is: '+arr[0][key] );
		//};
		
		var objCov = $.extend(true, {}, arr); // 객체로	
		var objHeader = $.extend(true, {}, arrHeader); // 객체로	
		//console.log(objCov);
		//console.log(objHeader);

		var data = jQuery.param( objCov );
		var header = jQuery.param( objHeader );
		//console.log(data);
		//console.log(header);
		fnMdiOpen('detail','detail_'+row,'/monitor/popupDetail.html?' + data +'&header=' +header, 575,580); // 이게 더 크게	
	});	



	$("input:checkbox[name='basicDataView']").change(function(){
		var chk = $("input:checkbox[name='basicDataView']").is(":checked")
    	if (chk) 
    		$('#basicData').css('display', '');
    	else  $('#basicData').css('display', 'none');

 		$('#newtable').closest('div.dataTables_scrollBody').css('max-height', calcDataTableHeight() + 'px');
 		//$('#newtable').closest('div.dataTables_scrollBody').css('max-height', '500px');
        $('#newtable').DataTable().draw();
            
	});
});

function zerofill_1(value, fillCount){
    var result = value;
    // value가 number 타입일 경우 string으로 변경 후 작업
    if(typeof value === "number") result = value.toString()
    return result.padStart(fillCount, '0')
}

function calcDataTableHeight () {
	var chk = $("input:checkbox[name='basicDataView']").is(":checked");
	//console.log(chk);
	if (chk)
	  return ($(window).height() * 55 / 100) /1.6;
	else
	  return 300 +($(window).height() * 55 / 100);
};

function fn_setGridData(targetGrid,gridColumns, gridData,fixedColCount) {/*Function used to get all column names from JSON and bind the html table header*/  
   	$(targetGrid).empty();

	var height = calcDataTableHeight();

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
	if (fixedColCount == 5)
		resultTable.row(0).remove().draw(false);
	//resultTable.columns.adjust().draw();  
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