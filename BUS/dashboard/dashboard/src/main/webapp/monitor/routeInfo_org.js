/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = 'LNO';
 var endString = '';
 var bFirst = true;
 
 let columnMap = new Map([
	  ['no'              ,'no']
	 ,['company_no'      ,'회사코드']
	 ,['lno' ,'LNO']
	 ,['route_no' ,'노선번호']
	 ,['route_nm' ,'노선명']
	 ,['reg_date' ,'적용일']
	 ,['end_point' ,'종점']
	 ,['start_point' ,'기점']
	 ,['holding_cnt' ,'보유']
	 ,['auto_cnt' ,'인가']
	 ,['distance' ,'거리']
	 ,['day_act_cnt' ,'평일운행']
	 ,['week_act_cnt' ,'주말운행']
	 ,['m_time' ,'M.Time']
	 ,['w_time' ,'W.Time']
	 ,['am_act_cnt' ,'오전']
	 ,['pm_act_cnt' ,'오후']
	 ,['working_day_cnt' ,'근무일수']
	 ,['off_day_cnt' ,'휴무일수']
	 ,['off_group_cnt' ,'휴무조']
	,['status' ,'상태']
	,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);
 
function render_QueryResult(data,type,row,meta){
	var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	return data;
} 

function render_distance(data,type,row,meta){
	var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (iData.trim() == '-') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}	
	return data;
} 
 
$( function() {
    $( "#tabs" ).tabs();

  	var fileTarget = $('.filebox .upload-hidden');

  	fileTarget.on('change', function(){  // 값이 변경되면
	    if(window.FileReader){  // modern browser
	      var filename = $(this)[0].files[0].name;
	    } 
	    else {  // old IE
	      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	    }
	    
	    // 추출한 파일명 삽입
	    $(this).siblings('.upload-name').val(filename);
	    gfn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString);
	});
  	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    
	    ChatManager.setSaveParamVo = function () {
			var table = $('#exceltable').DataTable();
			var itemList  = table.rows().data().toArray();
			return JSON.stringify (itemList);
		}	    
	    ChatManager.setSaveDistanceVo = function () {
			var table = $('#distancetable').DataTable();
			
			var itemList = [];
			
			
			
	    	table.rows( function ( idx, aData, node2 ) {
				//console.log(aData);
			    // combobox 값을 cell 값으로 가져옴
				var i=0;
				  
				for (var key in aData) {
					if (key  == 'route_nm')	{
						continue;
					} 
					if (aData[key] == '-')
						break;
					var vo =  new Object();
					vo.route_nm = aData.route_nm;
					vo.seq = (++i);
					vo.distance = aData[key]; 
					itemList.push( vo);
				}
				//console.log(itemList);
				 //vo = Object.assign({}, aData);
				 
				//itemList [idx] = vo;
			});
						
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function (targetTable,filterType,filterText,bIncludeHeader) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			commonVo.includeHeader = bIncludeHeader;
			return JSON.stringify (commonVo);
		}
		/*
		 * 정보 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_ROUTEINFO','TBL_ROUTEINFO','');
			var jsonString = ChatManager.setSaveParamVo();
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: false, // 추가
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}
		/*
		 * 배차순번 거리정보 저장
		 */
	    ChatManager.btnSaveDistance = function () {
			var commonVoString = ChatManager.setCommonVo('TBM_ROUTE_SEQ_DISTANCE_INFO','TBM_ROUTE_SEQ_DISTANCE_INFO','');
			var jsonString = ChatManager.setSaveDistanceVo();
			//console.log(jsonString);
			//return;
			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: false, // 추가
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.btnViewDistance();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}		
		/*
		 * 정보 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_ROUTEINFO','TBL_ROUTEINFO','',true);
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async: false,
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
			    	            'render' : render_QueryResult,
			    	            'visible' : (i < 3) ? false : true
			    	        }
			    	    };
			    	    var height = calcDataTableHeight();
		    	        gfn_setGridData('#exceltable',columns,ret.data,height);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
			       }
				});	
		}
		/*
		 *  배차순별거리 조회
		 */
	    ChatManager.btnViewDistance = function () {
			var commonVoString = ChatManager.setCommonVo('','selectRouteSeqDistance','',true);
			console.log(commonVoString);
			var columns = [];
			var newData = [];
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
						columns[0] = {
			    	            'title': '노선',
			    	            'data': 'route_nm',
			    	            'className': 'dt-body-center',
			    	            'render' : render_distance
			    	    }
						
						for (var j = 0; j < ret.data[0].maxcnt; j++) {
			    	        columns[j+1] = {
			    	            'title': 'no ' +(j+1),
			    	            'data': 'd' + (j+1),
			    	            'className': 'dt-body-center',
			    	            'render' : render_distance
			    	        }
						}
						var row=0;
						for (var k = 0; k < ret.data.length; k++) {
							var initData = {};
							initData['route_nm'] = ret.data[k].route_nm;
							//전체 일자 초기화
							for (var j = 0; j < ret.data[0].maxcnt; j++) {
								initData['d' + (j+1)] = '-';
							}
							// 집계된 일자만 y 처리
							var distanceArray = ret.data[k].distance.split(',');
							
							for (var m = 0; m < distanceArray.length; m++) {
								initData['d' + (m+1)] = distanceArray[m];
				    	    };
				    	    newData.push(initData);
			    	    };						
			    	    //console.log(columns);
			    	    //console.log(newData);
   			    	    var height = calcDataTableHeight() -50;

		    	        fn_setGridData('#distancetable',columns,newData,height,false);
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
		$('.filebox .upload-hidden').val('');
		$(this).siblings('.upload-name').val('');
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();    
   	});
	$(document).on('click', '#btnView', function () {
		ChatManager.btnView();
	});
	$(document).on('click', '#btnViewDistance', function () {
		ChatManager.btnViewDistance();
	});
	$(document).on('click', '#btnSaveDistance', function () {
		ChatManager.btnSaveDistance();
	});

	$(document).on('click', '#btnSave', function () {
		ChatManager.btnSave();
	});	

    
	ChatManager.btnView();
	ChatManager.btnViewDistance();


});
function calcDataTableHeight () {
	  return ($(window).height() * 55 / 100) /2;
};

function edit (){
	var table = $('#distancetable').DataTable();
	
	
	datatableEdit({
			dataTable : table,
			//eventTarget : 'tbody td',
			columnDefs : [
					{targets : 1	,maxlength:5}
					,{targets : 2	,maxlength:5}
					,{targets : 3	,maxlength:5}
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
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev.includes('-')) {
						table.cell(index.row, index.column).data(prev);
						swal('배차순번없습니다(차량보유댓수 초과). 거리등록불가')
						return false;
				}				
				if (prev != changed) {
					$(table.cell({row: index.row, column: index.column}).node()).css('color', 'red');
				}
			}
		});	
	
};

function fn_setGridData(targetGrid,gridColumns, gridData,height,bSearch) {/*Function used to get all column names from JSON and bind the html table header*/  
   // console.log(height);
    //console.log(gridData);
   	//$(targetGrid).DataTable().clear().destroy();
   //	$(targetGrid).empty();

	if (bFirst == false) {
		var table = $(targetGrid).DataTable();
		table.clear().draw();
		table.rows.add(gridData).draw();
		return;
	}
	var resultTable = $(targetGrid).DataTable({
//		destroy : true,
	   // scrollCollapse: true,
	    "scrollY": height,
	    scrollX : true,
		columns: gridColumns,
		//autoWidth: true,
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
	edit();
	bFirst = false;
	resultTable.columns.adjust().draw();  
}  