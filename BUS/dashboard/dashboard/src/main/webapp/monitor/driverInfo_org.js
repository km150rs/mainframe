/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '사번';
 var endString = '합계';
 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['emp_no'           ,'사번'          ] 
	,['emp_nm'           ,'사원명'        ] 
	,['birth_ymd'        ,'생년월일'      ] 
	,['enter_gb'         ,'입사구분'      ] 
	,['hobong'           ,'호봉'   ] 
	,['active_status'    ,'재직상태'      ] 
	,['job_type'         ,'직종'          ] 
	,['route_nm'         ,'노선'          ] 
	,['off_group'        ,'휴무조'        ] 
	,['work_group'       ,'노동조합'      ] 
	,['enter_date'       ,'입사일'        ] 
	,['exit_date'        ,'퇴사일'        ] 
	,['job_year'         ,'근속일'        ] 
	,['sp_gb'            ,'SP'            ] 
	,['car_regno'        ,'담당직무'      ] 
	,['dirver_regno'     ,'면허번호'      ] 
	,['call_sign'        ,'운전기사ID'    ] 
	,['memo'             ,'입사메모'      ] 
	,['exit_memo'        ,'퇴직사유'      ] 
	,['view_seq'         ,'표시순서'      ] 
	,['phone_no'         ,'핸드폰'        ] 
	,['email'            ,'E-mail'        ] 
	,['address'          ,'주소'          ] 
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
 
$( function() {
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
	    
	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList  = table.rows().data().toArray();
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * 사원정보 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DRIVERINFO','','');
			var jsonString = ChatManager.setSaveParamVo();

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
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 사원정보 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DRIVERINFO','TBL_DRIVERINFO','');
			//console.log(commonVoString);
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  // console.log(ret);
						for (var i = 0; i < ret.header.length; i++) {
							var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
			    	            'render' : render_QueryResult
			    	        }
			    	    };
			    	    
		    	        gfn_setGridData('#exceltable',columns,ret.data);
					
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

	$(document).on('click', '#btnSave', function () {
		ChatManager.btnSave();
	});	



});

//function ExportToTable() {  
//     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
//     /*Checks whether the file is a valid excel file*/  
//     //if (regex.test($("#excelfile").val().toLowerCase())) {  
//     if (1) {  
//         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
//         if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
//             xlsxflag = true;  
//         }  
//         /*Checks whether the browser supports HTML5*/  
//         if (typeof (FileReader) != "undefined") {  
//             var reader = new FileReader();  
//             reader.onload = function (e) {  
//                 var data = e.target.result;  
//                 /*Converts the excel data in to object*/  
//                 if (xlsxflag) {  
//                     var workbook = XLSX.read(data, { type: 'binary' });  
//                 }  
//                 else {  
//                     var workbook = XLS.read(data, { type: 'binary' });  
//                 }  
//                 /*Gets all the sheetnames of excel in to a variable*/  
//                 var sheet_name_list = workbook.SheetNames;  
//  
//                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
//                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
//                     /*Convert the cell value to Json*/  
//                     if (xlsxflag) {  
//                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y],{ header: ['A','B'] });  
//                     }  
//                     else {  
//                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: 1 });  
//                         //var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: ['A','B','C'] });  
//                     }  
//                     if (exceljson.length > 0 && cnt == 0) {  
//                         BindTable(exceljson, '#exceltable');  
//                         cnt++;  
//                     }  
//                 });  
//                 $('#exceltable').show();  
//             }  
//             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
//                 reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
//             }  
//             else {  
//                 reader.readAsBinaryString($("#excelfile")[0].files[0]);  
//             }  
//         }  
//         else {  
//             alert("Sorry! Your browser does not support HTML5!");  
//         }  
//     }  
//     else {  
//         alert("Please upload a valid Excel file!");  
//     }  
// }  
//
//function BindTable(jsondata, tableid) {  
//    var gridColumns = [];
//    var gridData = [];
//	var start = false;
//    var columns = BindTableHeader(jsondata, tableid); 
//    var k=0;
//	var regex = / /gi;
//	
//    for (var i = 0; i < jsondata.length; i++) {  
//		if (start == false && jsondata[i][columns[0]] != "사원번호") {
//			 start = false;
//		 	continue;
//		} else {
//			 start = true;
//		}
//		if (jsondata[i][columns[0]].replace(regex, '') == "합계")	 break;
//        var row$ = $('<tr/>');  
//        var gridRowData = {};
//        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
//			var cellValue = jsondata[i][columns[colIndex]];
//            if (typeof cellValue == "undefined" || cellValue == null)  
//                 cellValue = " ";  
//			//cellValue = cellValue.replace(regex, "");
//            if (k == 0) { 
//				cellValue = cellValue.replace("E-MAIL","EMAIL");
//				let jhonKeys = [...columnMap.entries()]
//        			.filter(({ 1: v }) => v === cellValue)
//        			.map(([k]) => k);
//	        	//console.log(cellValue + "--" + jhonKeys);
//				gridColumns[colIndex] = {
//					'title': cellValue,
//				    'data': jhonKeys,
//				    'render' : render_QueryResult
//				}
//			} else {
//				gridRowData[gridColumns[colIndex].data] = cellValue;		
//				//console.log(gridRowData);		
//				//console.log(cellValue);		
//			}
//
//            //row$.append($('<td/>').html(cellValue));  
//  		}  
//		if (k > 0) {
//	  		//console.log(gridColumns);
//	  		//console.log(gridRowData);
//	  		gridData.push(gridRowData);
//	  	}
//        //$(tableid).append(row$);  
//  		k++;
//    }
//    setGridData(gridColumns,gridData);
//
//}  
//
//function setGridData(gridColumns, gridData) {  
//    //console.log(columns);
//    //console.log(gridData);
//   	$('#exceltable').DataTable().clear().destroy();
//   	$('#exceltable').empty();
//
//	var resultTable = $('#exceltable').DataTable({
//		destroy : true,
//	   // scrollCollapse: true,
//	    "scrollY": 700,
//	    scrollX : true,
//		columns: gridColumns,
//		//autoWidth: true,
//        "searching": true,
//	    data: gridData,
//	    language: {
//    	    searchPlaceholder: "Search records",
//        	search: "",
//	    }
//	});
//	resultTable.columns.adjust().draw();  
//}  
//
// function BindTableHeader(jsondata, tableid) {  
//     var columnSet = [];  
//
//     var headerTr$ = $('<tr/>');  
//     for (var i = 0; i < jsondata.length; i++) {  
//         var rowHash = jsondata[i];  
//         for (var key in rowHash) {  
//             if (rowHash.hasOwnProperty(key)) {  
//                 if ($.inArray(key, columnSet) == -1) {  
//                    columnSet.push(key);  
//                     //headerTr$.append($('<th/>').html(key));
//                               
//                 }  
//             }  
//         }  
//     }  
//     
//     //$(tableid).append(headerTr$);  
//     return columnSet;  
// }  
 