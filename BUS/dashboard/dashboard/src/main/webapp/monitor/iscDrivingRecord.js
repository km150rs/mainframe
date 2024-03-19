/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var commonVoPopup =  new Object();
 var startString = '운행일자';
 var endString = '';


/*
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['work_date' , '운행일자']
//	,['company_nm' , '버스회사명']
	,['route_nm' , '노선']
	,['driver_id' , 'ISC운전자ID']
	,['car_regno' , '차량번호']
	,['start_time' , '운행출발일시']
	,['end_time' , '운행종료일시']
	,['bms_km' , '운행거리(Km):BMS']
//	,['bms1_km' , '운행거리(Km):BMS기준']
//	,['dtg_km' , '운행거리(Km):DTG']
//	,['dtg1_km' , '운행거리(Km):DTG기준']
//	,['auth_km' , '운행거리(Km):인가']
	,['tot_min' , '운행시간(분):당회']
//	,['tot_amt' , '수집금액(천원):당회']
//	,['driving_ok' , '운행인정:처리']
//	,['driving_sayu' , '운행인정:사유']
//	,['driving_memo' , '운행인정:최종사유']
//	,['proc_result' , '처리결과']
//	,['dtgbms_gb' , '적용구분']
	,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
*/ 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['base_ym' , '기준월']
	,['work_date' , '운행일자']
	,['route_nm' , '노선']
	,['driver_id' , 'ISC운전자ID']
	,['car_regno' , '차량번호']
	,['start_time' , '운행출발일시']
	,['end_time' , '운행종료일시']
	,['bms_km' , '운행거리(Km):BMS']
	,['tot_min' , '운행시간(분):당회']
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
	if (meta.col == 5) {
		data = iData.replace('.0','');
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
	    //const size = readExcel();
	    //ㅇ꺄console.log(size);
	    fn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString);
	});
	
    var calMonthKo = new tui.DatePicker('#datepicker-month', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#baseYm',
            format: 'yyyy-MM'
        }
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
			var baseYm = $('#baseYm').val();
		    if (baseYm == null || baseYm == undefined || baseYm == '') {
				swal('기준월을 입력하세요');
				return ;
			}
			commonVo.baseYm = baseYm;
			
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DRIVING_RECORD','','');
			var jsonString = ChatManager.setSaveParamVo();


			var formData = new FormData();
    		formData.append('jsonDataStr', jsonString);
    		formData.append('commonVoStr', commonVoString);

			$.ajax({
			       url : "/BUS_mergeInfo",
						method: "post",
				      	data: formData,
				      	contentType: false,
				      	processData: false,
				      	cache: false,
				      	enctype: 'multipart/form-data',
				      	//dataType: "json",
      			   success : function(ret) {	
			    	   if (ret == 'check') {
							commonVoPopup.filterType = 'select_checkDrivingRecord_duplicationNm';
							commonVoPopup.baseYm = $('#baseYm').val();
						   fnMdiOpen('중복 자료 확인바랍니다','detail_','/monitor/popupDynamic.html', 500, 300); // 이게 더 크게
					   } else {
	   			    	   swal(ret);
					   }
			    	   //ChatManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   alert(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DRIVING_RECORD','TBL_DRIVING_RECORD','');
			//console.log(commonVoString);
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async : false,
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
			    	            'visible' : (i < 3) ? false : true
			    	        }
			    	    };
			    	    var height= $('.empInfo0_2_2').height();
		    	        gfn_setGridData('#exceltable',columns,ret.data,height,false);
					
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


function fn_ExportToTable(columnMap,targetGrid,excelFile,startString,endString,startRow) {  
	$('html').css("cursor", "wait"); 
		$.blockUI({ message: 'excel file을 읽고있습니다. 잠시만 기다려주세요....' 
				, css: { 
		            border: '2px solid #ebebeb', 
		            padding: '15px', 
		            backgroundColor: '#000', 
		            '-webkit-border-radius': '10px', 
		            '-moz-border-radius': '10px', 
		            opacity: .5, 
		            color: '#fff' 
				} 
		});
			
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
                     var workbook = XLSX.read(data, { type: 'binary' ,raw:true,cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss'});  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' });  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  
                     if (y == '운행횟수 상세 및 이의신청')	{
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
	                 }  
                 });  
                 //$('#exceltable').show();  
             }  
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                 //reader.readAsArrayBuffer($(excelFile)[0].files[0]);
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
     
	$('html').css("cursor", "auto"); 
		$.unblockUI();
     
 }  
 
function fn_BindTable(columnMap,targetGrid,jsondata,startString,endString,startRow) {/*Function used to convert the JSON array to Html Table*/  
	var baseYm = $('#baseYm').val();
    var gridColumns = [];
    var gridData = [];
	var start = false;
    var columns = gfn_BindTableHeader(jsondata); /*Gets all the column headings of Excel*/  
    var k=0;
	var regex = / /gi;
	
	//console.log(jsondata);
	var skipColumns=[];
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
        //var row$ = $('<tr/>');  
        var gridRowData = {};
        var cellValue;
        var m=-1;
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
			cellValue = jsondata[i][columns[colIndex]];
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
            if (k == 0) { 
			//console.log(cellValue);
				cellValue = cellValue.replace(/\r?\n/g,  "");
				cellValue = cellValue.replace("E-MAIL","EMAIL");
				var jhonKeys = [...columnMap.entries()]
        			.filter(({ 1: v }) => v === cellValue)
        			.map(([k]) => k)
        			;
	        	//console.log(cellValue + "--" + jhonKeys);
        		if (jhonKeys == null || jhonKeys == '')	{
					skipColumns.push(colIndex);
					continue;
				}
				gridColumns[++m] = {
					'title': cellValue,
				    'data': jhonKeys,
				    'render' : render_QueryResult
				}
			} else {
				//if (gridColumns[colIndex] == undefined || gridColumns[colIndex] == null || gridColumns[colIndex]  == '')	continue;
				//console.log(colIndex);		
				//console.log(skipColumns.indexOf(colIndex));		
				//console.log(m);		
				
				if (skipColumns.indexOf(colIndex) > -1)	{
					continue;
				}
				// 노선에 '번' 붙힘.
				if (colIndex == 2)
				 	cellValue = cellValue + '번';		
				else if (colIndex == 3)
					cellValue = (cellValue == '') ? '0' : cellValue;
				
				gridRowData[gridColumns[++m].data] = cellValue;		
			}

            //row$.append($('<td/>').html(cellValue));  
  		}  
		if (k > 0) {
//	  		console.log(gridRowData);
			var inBaseYm = gridRowData['work_date'].substr(0,7);
			if (baseYm != inBaseYm)	{
				swal('입력 기준월과 엑셀 자료상 일자가 불일치합니다');
				return;
			}
			gridRowData['base_ym'] = gridRowData['work_date'].substr(0,7);		
	  		gridData.push(gridRowData);
	  	} else {
				gridColumns[++m] = {
					'title': '기준월',
				    'data': 'base_ym',
				    'render' : render_QueryResult
				}
	  		//console.log(gridColumns);
			  //console.log(skipColumns);
		  }
        //$(tableid).append(row$);  
  		k++;
    }
    console.log('setGrid start');
    var height= $('.empInfo0_2_2').height();
    fn_setGridData(targetGrid,gridColumns,gridData,height,false);
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
	   // scrollCollapse: true,
	    "scrollY": height,
	    scrollX : true,
		columns: gridColumns,
		//autoWidth: true,
        "searching": bSearch,
	    //data: gridData,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	    deferRender: true,
	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
	});
	
	resultTable.rows.add( gridData ).draw(false);
	//resultTable.columns.adjust().draw();  
}  

function fnMdiOpen (title,uniqueKey,url, w_width,w_height) {
	var iframName = "iframe_1";  //uniqueKey;

	var child = document.getElementById("iframe_1");
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