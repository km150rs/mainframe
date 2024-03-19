/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '회사';
 var endString = '';
 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['base_year'   ,'기준년도']
	,['company_nm'      ,'회사']
	,['seq'             ,'연번']
	,['acc_gb'          ,'사고구분']
	,['gapi_gb'         ,'가피구분']
	,['acc_kind'        ,'사고유형']
	,['jacha_rate'      ,'자차과실(%)']
	,['sangdae_rate'    ,'상대과실(%)']
	,['proc_result'     ,'처리결과']
	,['proc_memo'       ,'처리 진행사항']
	,['acc_date'        ,'사고날짜']
	,['acc_time'        ,'사고시간']
	,['acc_place'       ,'사고장소']
	,['route_nm'        ,'노선번호']
	,['car_no'       	,'차량번호']
	,['emp_nm'          ,'운전자']
	,['daein_in_amt'    ,'대인 입금금액']
	,['daemul_in_amt'   ,'대물 입금금액']
	,['in_tot_amt'      ,'입금금액 합계']
	,['daein_out_amt'   ,'대인 지출금액']
	,['daemul_out_amt'  ,'대물 지출금액']
    ,['jacha_amt'       ,'자차수리비 지출금액']
    ,['out_tot_amt'     ,'지출금액 합계']
    ,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);
 
function render_accidentResult(data,type,row,meta){
	var iData = data.toString();
    if (data == null || data == undefined )
    	return '-';
	data = iData.trim();

    var colNm = meta.settings.aoColumns[meta.col].mData;
    
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	var expNumCol = /(_amt)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
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
	    fn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString,0);
	});


    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'year',
        input: {
            element: '#baseYear',
            format: 'yyyy'
        }
    });
    

	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    

	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList  = table.rows().data().toArray();
			
	    	table.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
				 var vo =  new Object();
				 vo = Object.assign({}, aData);
				 
				itemList [idx] = vo;
			});			
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function (bValidCheck,targetTable,filterType,filterText) {
			
			var baseYear = $('#baseYear').val();
			if (bValidCheck) {
			    if (baseYear == null || baseYear == undefined || baseYear == '') {
					swal('기준년도를 입력하세요');
					return null;
				}
			}			
			commonVo.baseYear = baseYear;
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * 사원정보 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo(true,'TBM_ACCIDENT_INFO','TBM_ACCIDENT_INFO','');
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
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 사고 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo(true,'TBM_ACCIDENT_INFO','TBM_ACCIDENT_INFO','');
			//console.log(commonVoString);
			var columns = [];
			var exp2 = /(_amt|_rate)/;
			var exp1 = /(_memo|_result|_place)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  // //console.log(ret);
					  var colNmEng;
						for (var i = 0; i < ret.header.length; i++) {
							colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
							var colNm = columnMap.get(colNmEng);
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colNmEng,
			    	            'className': exp2.test(colNmEng) ? "dt-right" : exp1.test(colNmEng) ? "dt-left" : "dt-center",
			    	            'render' : render_accidentResult,
			    	            'visible' : (i == 1 || i == 2) ? false : true
			    	        }
			    	    };
			    	    
			    	    var height= $('.empInfo0_2_2').height();
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
	
	////console.log(jsondata);
    
	var exp1 = /(amt|amount)/;

    for (var i = 0; i < jsondata.length; i++) {  
		if (startString == '') {
			if (i < startRow ) 
				continue;
			else 
				start = true;
		} else {
			if (start == false && jsondata[i][columns[0]] != startString) {
				 start = false;
			 	continue;
			} else {
				 start = true;
			}
			if (endString != '') {
				if (jsondata[i][columns[0]].replace(regex, '') == endString)	 break;
			}
		}
		if (jsondata[i].length == 0)	break;
		if (jsondata[i][columns[0]] == '')	break;
		
        var row$ = $('<tr/>');  
    	var gridRowData = {};
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
			var cellValue = jsondata[i][columns[colIndex]];
			
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
            if (k == 0) { 
				cellValue = cellValue.replace(/\r?\n/g,  "");
				cellValue = cellValue.replace("E-MAIL","EMAIL");
				var jhonKeys = [...columnMap.entries()]
        			.filter(({ 1: v }) => v === cellValue)
        			.map(([k]) => k)
        			;
	        	////console.log(cellValue + "--" + jhonKeys);
				gridColumns[colIndex] = {
					'title': cellValue,
				    'data': jhonKeys,
				    'render' : render_accidentResult
				}
				gridRowData[gridColumns[colIndex].data] = '0';
			} else {
				//console.log(gridColumns[colIndex].data + ':' + cellValue + ':' + typeof cellValue);
				
				if (typeof cellValue == 'number') {
					//console.log(cellValue + ':' + typeof cellValue);
					if (cellValue == ' ' || cellValue == '' || cellValue == 0)
						cellValue = '0';

				    if (gridColumns[colIndex].data == 'route_nm') 
							cellValue = cellValue + '번';
					
					gridRowData[gridColumns[colIndex].data] = cellValue;
					////console.log(gridRowData[gridColumns[colIndex].data]);
				} else if (typeof cellValue == 'object') {
					cellValue = cellValue.toString();
						
					if (cellValue.includes('1899')) {
						cellValue = cellValue.substring(cellValue.indexOf('GMT')-9,cellValue.indexOf('GMT'));
					} else {
						const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
						var isoDate = new Date(cellValue);
						const utc = isoDate.getTime() + KR_TIME_DIFF;
						const kr_curr = new Date(utc +KR_TIME_DIFF).toISOString().toString();
						////console.log(kr_curr);
						
						if (kr_curr.includes('.000Z')){
							cellValue = kr_curr.substring(0,10);
						}
					}
					gridRowData[gridColumns[colIndex].data] = cellValue.trim();
				} else {	
					if( exp1.test(gridColumns[colIndex].data)){
						////console.log(iData);
							cellValue = '0';
					} else	if (cellValue == ' ' || cellValue == '')
						cellValue = '-';	

				    if (gridColumns[colIndex].data == 'route_nm') 
							cellValue = cellValue.replace('~','-').replace('!','-') + '번';
						
						
					gridRowData[gridColumns[colIndex].data] = cellValue;
				}
				////console.log(gridRowData);		
				////console.log(cellValue);		
			}

            //row$.append($('<td/>').html(cellValue));  
  		}  
		if (k > 0) {
			//console.log(gridRowData);
	  		gridData.push(gridRowData);
	  	}
        //$(tableid).append(row$);  
  		k++;
    }
	  		////console.log(gridColumns);
	  		////console.log(gridData);
    ////console.log(targetGrid);
    fn_setGridData(targetGrid,gridColumns,gridData);

}  


function fn_setGridData(targetGrid,gridColumns, gridData,height,bSearch) {/*Function used to get all column names from JSON and bind the html table header*/  
    ////console.log(height);
    ////console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	if (height == null || height == undefined)
		height = gfn_calcDataTableHeight;

	if (bSearch == null || bSearch == undefined)
		bSearch = true;
				
	var resultTable = $(targetGrid).DataTable({
		destroy : true,
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
	resultTable.columns.adjust().draw();  
}  
