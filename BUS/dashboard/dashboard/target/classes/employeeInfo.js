/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '사원번호';
 var endString = '합계';
 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['emp_no'       ,'사원번호']
	,['emp_nm'       ,'사원명']
	,['emp_regno'    ,'생년월일']
	,['sex'          ,'성별']
	,['team_nm'      ,'부서']
	,['pos_nm'       ,'직위']
	,['enter_date'   ,'입사일']
	,['exit_date'    ,'퇴사일']
	,['job_year'     ,'근속년월']
	,['phone_no'     ,'핸드폰']
	,['email'        ,'EMAIL']
	,['job_kind'     ,'구분']
	,['job_type'     ,'직종']
	,['bigo'       	 ,'비고']	 
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
			var commonVoString = ChatManager.setCommonVo('TBL_EMPLOYEEINFO','TBL_EMPLOYEEINFO','');
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
			var commonVoString = ChatManager.setCommonVo('TBL_EMPLOYEEINFO','TBL_EMPLOYEEINFO','');
			console.log(commonVoString);
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
			    	            'render' : render_QueryResult,
			    	            'visible' : (colNm == '생년월일' || colNm =='회사코드') ? false : true
			    	        }
			    	    };
			    	    var height= $('.empInfo0_2_2').height();
			    	    //console.log(height);
		    	        //gfn_setGridData('#dangerGrid',columns,ret.data,$('.empInfo0_2_2').height()*1.5,false);

		    	        gfn_setGridData('#exceltable',columns,ret.data,height,true);
					
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

	// 인사카드
	$('#exceltable').on('click','td', function() {
		var table = $('#exceltable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var empNm = table.cell( row,3 ).data();
		console.log(empNm);
		fnMdiOpen('인사카드:['+empNm + ']','employeeCard','/monitor/popupEmployeeCard.html?emp_nm=' + empNm, 900,400); // 이게 더 크게	
		
	});

	ChatManager.btnView();
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