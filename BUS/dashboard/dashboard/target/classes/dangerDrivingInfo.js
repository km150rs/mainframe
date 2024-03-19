/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '';
 var endString = '요약';
 var startRow = 6;

let columnMap = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['emp_nm'       	,'운전자']
	,['route_nm'       	,'노선']
	,['sp_gb'       	,'고정여부']
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

function render_QueryResult(data,type,row,meta){
	//var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 1) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	return data;
} 
 
$( function() {
	$("#baseYm").val("");
    var baseYm = $('#baseYm');
		baseYm.inputmask(
		    "9999-99"
		);

    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#baseYm',
            format: 'yyyy-MM'
        }
    });
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
	    fn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString,startRow);
	});
  	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    
	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			//var table = $('#exceltable').DataTable();
			//var itemList  = table.rows().data().toArray();
			
			var table = $('#exceltable').DataTable();
			var itemList  = []; 
			//table.rows().data().toArray();
			
	    	table.rows( function ( idx, aData, node2 ) {
				var vo =  new Object();
		 		vo = Object.assign({}, aData);
		 		vo.route_nm = '';
		 		vo.sp_gb = '';
				itemList.push( vo );
			});			
			
			
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			var baseYmd = $('#baseYm').val();
		    if (baseYmd == null || baseYmd == undefined || baseYmd == '') {
				swal('기준월을 입력하세요');
				return null;
			}
			
			commonVo.baseYm = baseYmd;
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 *  저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DANGER_DRIVING_INFO','TBL_DANGER_DRIVING_INFO','');
			var jsonString = ChatManager.setSaveParamVo();
			console.log(commonVoString);
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
		 *  조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DANGER_DRIVING_INFO','TBL_DANGER_DRIVING_INFO','');
			console.log(commonVoString);
			var columns = [];
			
			var exp1 = /(company_no|no)/;

			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   console.log(ret);
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
			    	            'visible' : exp1.test(colNmEng) ? false : (colNmEng == 'no') ? false :true,
			    	        }
			    	    };
			    	    var height= $('.empCard0').height();
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
		$.confirm({
			title : '확인',
			content :  $('#baseYm').val() +' 해당 월 자료를 등록하시겠습니까?',
			 boxWidth: '20%',
			 useBootstrap: false,
			buttons: {
		        confirm: function () {
					ChatManager.btnSave();
		        },
		        cancel: function () {
		        },
		    }
		});		
		
	});	


	ChatManager.btnView();
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
                     var workbook = XLSX.read(data, { type: 'binary' });  
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
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y],{ header: ['A','B'] });  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: 1 });  
                         //var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: ['A','B','C'] });  
                     }  
                     if (exceljson.length > 0 && cnt == 0) {  
                         fn_BindTable(columnMap,targetGrid,exceljson,startString,endString,startRow);  
                         cnt++;  
                     }  
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
    var columns = excelColumns;//fn_BindTableHeader(jsondata); /*Gets all the column headings of Excel*/  
	var regex = /[, ]/gi;
	
	
    for (var i = 0; i < jsondata.length; i++) {  
		if (startString == '') {
			if (i < startRow ) 
				continue;
			else 
				start = true;
							
		}
		if (jsondata[i][0].replace(regex, '') == endString)	 break;
		
        var gridRowData = {};
	    var k=0;
		for (var key in jsondata[i]){
			//console.log("[runFunction] : [for : json key] : " + key);
			//console.log("[runFunction] : [for : json value] : " + jsondata[i][key]);
			var cellValue = jsondata[i][key];
			
			if (key == 0) { 
				cellValue = cellValue.substring(0,cellValue.indexOf('('));
			} else 
				cellValue = cellValue.replace(regex, '');
			
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
			gridRowData[columns[k++].data] = cellValue;		
		}
  		gridData.push(gridRowData);
    }
    fn_setGridData(targetGrid,columns,gridData);

}  
function calcDataTableHeight () {
	  return 100 + ($(window).height() * 55 / 100) ;
};

function fn_setGridData(targetGrid,gridColumns, gridData) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();
	var height = calcDataTableHeight();
	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	   // scrollCollapse: true,
	    "scrollY": height,
	    scrollX : true,
	    "columnDefs": [
	    	 {"className": "dt-center", "targets"  : [0,3,4]}
	    	,{"className": "dt-right", "targets"  : [1,2,5,6,7]}
        ],
		columns: gridColumns,
		//autoWidth: true,
        "searching": true,
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

 