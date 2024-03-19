/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '버스ID';
 var endString = '요약';
 var startRow = 6;

let columnMap = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['emp_nm'       	,'운전자']
	,['danger_km100'    ,'100km']
	,['danger_act_cnt'  ,'실제횟수']
	,['danger_act'      ,'주요위험운전행동']
	,['danger_level'    ,'위험수준']
	,['driving_cnt'   	,'운행일수']
	,['driving_distance','총운행거리']
	,['driving_time'    ,'총운행시간']
	,['base_ym'     	,'기준월']
	,['last_chg_user'   ,'최종사용자']	 
	,['last_chg_date'   ,'최종수정일']	 
]);
 
var excelColumns = [
	 {title:'운전자'		,data:'emp_nm'			,render:render_QueryResult}
	,{title:'100km당'	,data:'danger_km100'	,render:render_QueryResult}
	,{title:'실제횟수'		,data:'danger_act_cnt'	,render:render_QueryResult}
	,{title:'주요위험운전행동',data:'danger_act'		,render:render_QueryResult}
	,{title:'위험수준'		,data:'danger_level'	,render:render_QueryResult}
	,{title:'운행일수'		,data:'driving_cnt'		,render:render_QueryResult}
	,{title:'총운행거리'	,data:'driving_distance',render:render_QueryResult}
	,{title:'총운행시간'	,data:'driving_time'	,render:render_QueryResult}
];

  
function render_check(data,type,row,meta){
		return '<input type="checkbox"' + (data == "true" ? ' checked="checked"' : '') + '>';
}
function render_QueryResult(data,type,row,meta){
	//var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.row == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	return data;
} 
 
$( function() {
	$.datepicker.setDefaults( $.datepicker.regional["ko"]);
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
	$( "#baseYmd" ).val(comm_getToday2());
	

  	var fileTarget = $('.filebox .upload-hidden');

  	fileTarget.on('change', function(){  // 값이 변경되면
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();    
  	
	    if(window.FileReader){  // modern browser
	      var filename = $(this)[0].files[0].name;
	    } 
	    else {  // old IE
	      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	    }
	    
	    // 추출한 파일명 삽입
	    $(this).siblings('.upload-name').val(filename);
	    
	    g_blockStart();
	    
	    fn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString,startRow);
	    $.unblockUI(); 
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
	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList  = table.rows().data().toArray();
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText,bValidCheck) {
			var baseYmd = $('#baseYmd').val();
			if (bValidCheck) {
			    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
					swal('기준월을 입력하세요');
					return null;
				}
			}			
			commonVo.baseYmd = baseYmd;
			commonVo.routeNm = ChatManager.$group.val();
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 *  저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_ARRANGE_PUNCTUALITY_INFO','TBL_ARRANGE_PUNCTUALITY_INFO','',true);
			var jsonString = ChatManager.setSaveParamVo();
			//console.log(commonVoString);
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        //async : false,
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
		 *  조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_ARRANGE_PUNCTUALITY_INFO','TBL_ARRANGE_PUNCTUALITY_INFO','',true);
			//console.log(commonVoString);
			var columns = [];
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
						//console.log(ret);
						if (ret.data.length == 0)	{
							swal('해당 자료가 없습니다.');
						   return;
						}
		    	        var aaa;
		    	        var colNm ;
/*
						for (var i = 0; i < ret.header.length; i++) {
							//var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
							colNm = ret.header[i].COLUMN_NAME.toLowerCase();
							eval("aaa = ret.data[0]." + colNm);
			    	        if (aaa == ' ') {
								break;
							} else {
				    	        columns[i] = {
				    	            'title': colNm == 'col' ? '제외' : colNm,
				    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
				    	           // 'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
				    	            'render' : colNm == 'col' ? render_check : render_QueryResult,
				    	            'visible' : colNm == 'seq' ? false : true
				    	        }
								commonVo.lastColumnNm = colNm;
				    	    }
			    	    };
*/
						for (var i = 0; i < ret.header.length; i++) {
							//var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
							colNm = ret.header[i].COLUMN_NAME.toLowerCase();
							eval("aaa = ret.data[0]." + colNm);
			    	        if (aaa == ' ') {
								break;
							} else {
				    	        columns[i] = {
				    	            'title': i < 5 ? colNm : ret.data[0][colNm],
				    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
				    	           // 'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
				    	            'render' : colNm == 'col' ? render_check : render_QueryResult,
				    	            'visible' : i < 4 ? false : true
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
		    	        fn_setGridData('#exceltable',columns,ret.data,6);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
        
	    return ChatManager;
	}());
	
	ChatManager.btnQueryGroup();

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
//			var table = $('#exceltable').DataTable();
//			var itemList  = table.rows().data().toArray();
//			console.log (itemList);
		
		ChatManager.btnSave();
	});	
	$('#exceltable').on('change', 'input[type="checkbox"]', function(){
		var $row = $(this).closest('tr');
		var table = $('#exceltable').DataTable();
		var data = table.row($row).data(); 
		
		// 버스id는 수정불가
		if (data.col0 == startString)	return;
		
		if(this.checked){
			data.col = 'true';
		} else data.col = 'false';
	});


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
                     var workbook = XLSX.read(data, { type: 'binary' ,raw:false,cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss'});  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' ,raw:false,cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss'});  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  
                     if (xlsxflag) {  
                         //var exceljson = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y],{ header: 1 });  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: 1 });  
                         //var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: ['A','B','C'] });  
                     }  
                     if (exceljson.length > 0 && cnt == 0) {  
                         fn_BindTable(columnMap,targetGrid,exceljson,startString,endString,startRow);  
                         cnt++;  
                     }  
                     return;
                 });  
                 //$('#exceltable').show();  
             }  
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                 reader.readAsBinaryString($(excelFile)[0].files[0]);  
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
    var columns = [];//fn_BindTableHeader(jsondata); /*Gets all the column headings of Excel*/  
	var regex = /[, ]/gi;
	//console.log(jsondata);
	

    for (var i = 0; i < jsondata.length; i++) {
		var firstColData = jsondata[i][0];
		if (firstColData == undefined)
			continue;  

        var gridRowData = {};
		  
		if (startString == jsondata[i][0]) {
			if 	(start)	
				break;
			start = true;
			var colVo =  new Object();
			colVo.title = '제외';	
			colVo.data = 'col';	
			//colVo.className =  'select-checkbox';
			
			columns[0] = colVo;
			gridRowData['col'] = 'true';		

			for (var key in jsondata[i]){
				var colVo =  new Object();
				colVo.title = 'col'+zerofill(key,3);	
				colVo.data = 'col'+zerofill(key,3);	
				
				columns[parseInt(key)+1] = colVo;
				gridRowData['col'+zerofill(key,3)] = jsondata[i][key];		
				
				// 최종 column name 보관
				commonVo.lastColumnNm = colVo.title;
			}
			gridData.push(gridRowData);
			continue;
		}
		//		console.log(columns);
	    var k=0;
        gridRowData = {};
        gridRowData['col'] = 'false';
		for (var key in jsondata[i]){
			//console.log("[runFunction] : [for : json key] : " + key);
			//console.log("[runFunction] : [for : json value] : " + jsondata[i][key]);
			var cellValue = jsondata[i][key].toString();

			if (cellValue.includes('GMT')) {
				cellValue = cellValue.substring(cellValue.indexOf('GMT')-9,cellValue.indexOf('GMT'));
			}
			
/*			if (key == 0) { 
				cellValue = cellValue.substring(0,cellValue.indexOf('('));
			} else 
				cellValue = cellValue.replace(regex, '');
*/			
			//console.log(cellValue + '/' + ExcelDateToJSDate(cellValue));
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
			gridRowData[columns[parseInt(k)+1].data] = cellValue;	
			k++;	
		}
  		gridData.push(gridRowData);
    }
	//console.log(columns);
	//console.log(gridData);
    fn_setGridData(targetGrid,columns,gridData,6);

}  

function calcDataTableHeight () {
	  return 100 +($(window).height() * 55 / 100);
};

function fn_setGridData(targetGrid,gridColumns, gridData,fixedColCount) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	//$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": calcDataTableHeight(),
	    scrollX : true,
	    //ordering : true,
	    "columnDefs": [
	        {"className": "dt-center", "targets": "_all"}
	       ,{
	        	'targets': 0,
	        	//data:null,
	        	//defaultContent: "N",
	        	'render' : render_check
/*	        	'render' : function(data, type, full, meta) {
							return '<input type="checkbox"' + (data == "true" ? ' checked="checked"' : '') + '>';
						}*/
	        }
   		],
		/*select: {
				style: 'multi',
				selector: 'td:first-child'
			},*/   		
		columns: gridColumns,
        fixedColumns:   {
            left: 6
        },
        //"searching": true,
	    data: gridData,
/*	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
*/	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
	});
	//resultTable.row(0).remove().draw(false);
	resultTable.columns.adjust().draw();  
}  

 function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569)*86400*1000));
}