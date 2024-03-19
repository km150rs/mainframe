/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '연번';
 var endString = '';
 var company_nm = '인천스마트';
 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['car_regno'   ,'차량번호']
	,['emp_nm'       ,'성명']
	,['prev_daily_seq'         ,'연번']
	,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);
 
function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

 
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

console.log(fileTarget);
  	fileTarget.on('change', function(){  // 값이 변경되면
	    console.log(filename);
	    if(window.FileReader){  // modern browser
	      var filename = $(this)[0].files[0].name;
	    } 
	    else {  // old IE
	      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	    }
	    // 추출한 파일명 삽입
	    $(this).siblings('.upload-name').val(filename);
	    fn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString,0);
	    
	});
  	
  	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    
	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList =[];
			//var itemList  = table.rows().data().toArray();
			var bError = false;
	    	table.rows( function ( idx, aData, node2 ) {
				try {
					aData.comp_date = aData.real_comp_date.trim().substring(0,10);
					console.log(aData.comp_date);

					if (isValidDate(aData.comp_date )) {
						itemList [idx] = aData;
					} else {
						swal('입력일자를 확인하세요 -> ' + aData.real_comp_date);
						bError = true;
					}
				} catch (error) {
					swal('입력일자를 확인하세요 -> ' + aData.real_comp_date + error);
					//return;
					console.log(error);
					bError = true;
				}
			});
			if (bError ) {
				return null;
			}			
			console.log(itemList.length);
			if (itemList.length == 0) {
				swal('저장할 자료가 없습니다.');
				return null;
			}
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			commonVo.baseYm = $('#baseYm').val();
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * validation check(저장전 check)
		 */
	    ChatManager.btnValidationCheck = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_PUBLIC_COMPLAINT_INFO','TBL_PUBLIC_COMPLAINT_INFO','');
			var jsonString = ChatManager.setSaveParamVo();
			if (jsonString == null) {
				return;
			}
			$.ajax({
			       url : "/BUS_validationCheck",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: false, // 추가
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
		/*
		 *  저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_PUBLIC_COMPLAINT_INFO','TBL_PUBLIC_COMPLAINT_INFO','');
			var jsonString = ChatManager.setSaveParamVo();
			if (jsonString == null) {
				return;
			}
			$.ajax({
			       url : "/BUS_mergeInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: false, // 추가
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   //ChatManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
		/*
		 * 사원정보 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_PUBLIC_COMPLAINT_INFO','TBL_PUBLIC_COMPLAINT_INFO','');
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

		    	        fn_setGridData('#exceltable',columns,ret.data,height,true);
		    	        
					
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
	$(document).on('click', '#btnValidationCheck', function () {
		ChatManager.btnValidationCheck();
	});	

	//ChatManager.btnView();
});


/* excel upload */
function fn_ExportToTable(columnMap,targetGrid,excelFile,startString,endString,startRow) {  
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
     /*Checks whether the file is a valid excel file*/  
     //if (regex.test($("#excelfile").val().toLowerCase())) {  
     if (1) {  
         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
         if ($(excelFile).val().toLowerCase().indexOf(".xlsx") > 0) {  
             xlsxflag = true;  
         }  
         /*Checks whether the browser supports HTML5*/  
         if (typeof (FileReader) != "undefined") {  
             var reader = new FileReader();  
             reader.onload = function (e) {  
                 var data = e.target.result;  
                 /*Converts the excel data in to object*/  
                 if (xlsxflag) {  
                     //var workbook = XLSX.read(data, { type: 'binary' });
                     var workbook = XLSX.read(data, { type: 'binary' ,cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss'});  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' });  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  
                     if (xlsxflag) {  
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets['월간 계획'],{ header: 1 });  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets['월간 계획'],{ header: 1 });  
                         //var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: ['A','B','C'] });  
                     }  
                     //console.log(exceljson);
                     if (exceljson.length > 0 && cnt == 0) {  
                         fn_BindTable(columnMap,targetGrid,exceljson,startString,endString,startRow);  
                         cnt++;  
                     }  
                    
                     return;
                 });  
                 //$('#exceltable').show();  
             }  
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                 reader.readAsArrayBuffer($(excelFile)[0].files[0]);  
             }  
             else {  
                 reader.readAsBinaryString($(excelFile)[0].files[0]);  
             }  
         }  
         else {  
             alert("Sorry! Your browser does not support HTML5!");  
         }  
     }  
     else {  
         alert("Please upload a valid Excel file!");  
     }  
 }  

function fn_BindTable(columnMap,targetGrid,jsondata,startString,endString,startRow) {/*Function used to convert the JSON array to Html Table*/  
    var gridColumns = [];
    var gridData = [];
	var start = false;
    var columns = gfn_BindTableHeader(jsondata); /*Gets all the column headings of Excel*/  
    var k=0;
	var regex = / /gi;
	
	console.log(jsondata.length);
	console.log(columns);
	
    for (var i = 0; i < jsondata.length; i++) {  
		if (startString == '') {
			if (i < startRow ) 
				continue;
			else 
				start = true;
		} else {
			console.log(jsondata[i][columns[0]]); 
			if (start == false && jsondata[i][columns[0]] != startString) {
				 start = false;
			 	continue;
			} else {
				 start = true;
			}
			console.log(jsondata[i][columns[0]]); 
			if (endString != '') {
				if (jsondata[i][columns[0]].replace(regex, '') == endString)	 break;
			} else {
					console.log('break'); 
				if (jsondata[i][columns[0]] == undefined) break;
			}
		}
		console.log(jsondata[i]); 
		
        //var row$ = $('<tr/>');  
        var gridRowData = {};
        var cellValue;
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
			cellValue = jsondata[i][columns[colIndex]];
			
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
            if (k == 0) { 
				cellValue = cellValue.replace(/\r?\n/g,  "");
				var jhonKeys = [...columnMap.entries()]
        			.filter(({ 1: v }) => v === cellValue)
        			.map(([k]) => k)
        			;
        		//if (jhonKeys == null || jhonKeys == '')	continue;
	        	//console.log(cellValue + "--" + jhonKeys);
				gridColumns[colIndex] = {
					'title': cellValue,
				    'data': jhonKeys,
				    'render' : render_QueryResult
				}
			} else {
				//if (gridColumns[colIndex] == undefined || gridColumns[colIndex] == null || gridColumns[colIndex]  == '')	continue;
				var colNm = gridColumns[colIndex].data;
				if (colNm == 'car_no')	cellValue = cellValue.toString().replace('.0','');
				
				gridRowData[colNm] = cellValue;		
				//console.log(gridRowData);		
				console.log(cellValue);		
			}

            //row$.append($('<td/>').html(cellValue));  
  		}  
		if (k > 0) {
	  		//console.log(gridColumns);
//	  		console.log(gridRowData);
			//if (gridRowData['company_nm'] == company_nm)
		  		gridData.push(gridRowData);
	  	}
        //$(tableid).append(row$);  
  		k++;
    }
    console.log('setGrid start');
		console.log(gridColumns);
  		console.log(gridRowData);

    var height= $('.empInfo0_2_2').height();
    fn_setGridData(targetGrid,gridColumns,gridData,height,true);
    console.log('setGrid end');

}  


function fn_setGridData(targetGrid,gridColumns, gridData,height,bSearch) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(height);
    //console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	if (height == null || height == undefined)
		height = gfn_calcDataTableHeight;

	if (bSearch == null || bSearch == undefined)
		bSearch = true;

			
	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    //paging: false,
	    "scrollY": height,
	    dom: 'lBfrti',	
	    scrollX : true,
		columns: gridColumns,
		//autoHeight: false,
        "searching": bSearch,
        'colReorder': {
        	'allowReorder': false
    	},
	    data: gridData,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	    deferRender: true,
/*    fixedHeader: {
        header: true,
        footer: true
    },*/
	    language: {
	        "emptyTable": "No data",
    	    searchPlaceholder: "Search records",
        	search: ""
	    },
        //$(this).find("tfoot").html($(this).find("thead tr").clone());
    //},	    
	    //"footerCallback": footerCallback
	});
	//resultTable.row(0).select();

	//resultTable.rows.add( gridData ).draw(false);
	resultTable.columns.adjust().draw();
	
/*	
    // 셀 붙여넣기 기능 활성화
    new $.fn.dataTable.Buttons(resultTable, {
        buttons: [
            {
                extend: 'copy',
                text: '붙여넣기',
                action: function(e, dt, node, config) {
                    var clipboardData = window.clipboardData || e.originalEvent.clipboardData;
                    var pastedData = clipboardData.getData('text');
                    var rowData = pastedData.split('\n');
                    
                    // 붙여넣은 데이터를 테이블에 적용
                    rowData.forEach(function(row) {
                        var cellData = row.split('\t');
                        resultTable.row.add(cellData).draw();
                    });
                }
            }
        ]
   }).add().container().appendTo($('#exceltable_wrapper .dataTables_length'));

    // 버튼을 DataTables 도구 모음에 추가
    resultTable.buttons().container().appendTo($('#exceltable_wrapper .dataTables_length'));	  */
}  

