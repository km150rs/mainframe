var $objWindow;
/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '날짜';
 var endString = '';
 var firstFlag = true;
 var firstFlag2 = true;
 var ChatManager = null;
 var columns = [];
 
 let columnMap = new Map([
	 ['no'           	,'no']
	,['company_no'   	,'회사코드']
	,['company_nm'      ,'회사']
	,['work_date'       ,'날짜']
	,['work_time'       ,'시간']
	,['emp_nm'          ,'성명']
	,['route_nm'        ,'노선']
	,['car_no'        	,'차량번호']
	,['code_type1'      ,'유형']
	,['code_type2'    	,'세부항목']
	,['code_type3'    	,'소분류항목']
	,['detail_desc' 	,'내용']
	,['disposition_amt'       	,'금액(사고 및 과태료)']
	,['disposition_date'       ,'교육 일자&처분일자']
	,['disposition_result'    	,'처분결과']
	,['memo'       		,'비고']
    ,['last_chg_user'   ,'최종사용자']	 
	,['last_chg_date'   ,'최종수정일']	 
	,['bit' 	       	,'변경 여부']	 
]);
 
function render_accidentResult(data,type,row,meta){
    if (data == null || data == undefined )
    	return '-';
	var iData = data.toString();
	data = iData.trim();

    var colNm = meta.settings.aoColumns[meta.col].mData;
    
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	if (row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}

	var expNumCol = /(_amt)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}
	return data;
} 
 
$( function() {
	window.addEventListener("message", receiveChildMessageHandler, false);		

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


    var calMonthKo_to = new tui.DatePicker('#datepicker-to', {
        date: new Date(),
        language: 'ko',
        //type: 'year',
        input: {
            element: '#toDate',
            format: 'yyyy-MM-dd'
        }
    });
	
	var yearStart = new Date().getFullYear();
    var calMonthKo_from = new tui.DatePicker('#datepicker-from', {
        date: new Date(yearStart,0,1),
        language: 'ko',
        //type: 'year',
        input: {
            element: '#fromDate',
            format: 'yyyy-MM-dd'
        }
    });

	
	ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    

	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList  = []; 
			//table.rows().data().toArray();
			
	    	table.rows( function ( idx, aData, node2 ) {
				
				if (aData.work_time == undefined) {
					aData.work_time = idx;
					aData.code_type3 = '';
					
				}
					
			    // combobox 값을 cell 값으로 가져옴
			    if (aData.bit == 'Y') {
					var vo =  new Object();
			 		vo = Object.assign({}, aData);
					itemList.push( vo );
					
				}
			});			
			console.log(itemList);
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function (bValidCheck,targetTable,filterType,filterText) {
			
			var fromDate = $('#fromDate').val();
			var toDate = $('#toDate').val();
			if (bValidCheck) {
			    if (fromDate > toDate) {
					swal('from - to 기간을 확인하세요');
					return null;
				}
			}			
			commonVo.codeType1 =  $('#comboType1').val();
			commonVo.codeType2 =  $('#comboType2').val();
			commonVo.codeType3 =  $('#comboType3').val();

			commonVo.fromDate = fromDate;
			commonVo.toDate = toDate;
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * 근태 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo(true,'TBM_EMP_WORKING_LOG','TBM_EMP_WORKING_LOG','');
			var jsonString = ChatManager.setSaveParamVo();
			
			
			var formData = new FormData();
    		formData.append('jsonDataStr', jsonString);
    		formData.append('commonVoStr', commonVoString);

			
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_mergeInfo",
					method: "post",
			      	data: formData,
			      	contentType: false,
			      	processData: false,
			      	cache: false,
			      	enctype: 'multipart/form-data',
			       success : function(ret) {	
			    	   swal(ret);
			    	   //$('#exceltable').DataTable().clear().destroy();
			    	   ChatManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		

		ChatManager.btnPopup = function (table,row) {
			commonVo.currentRowData = table.row(row).data();
	
			fnMdiOpen('근태내역 변경','detail_','/monitor/popupEmpWorkingLog.html?table=TBM_EMP_WORKING_LOG&row='+row, 770, 700); // 이게 더 크게	
		}

		ChatManager.btnNew = function () {
			var table2 = $('#exceltable').DataTable();
			var copyRow = table2.row(0).data();

			var exp1 = /(_amt)/;
		    for (var i = 0; i < columns.length; i++) {
				engColNm = parent.columns[i].data;
				copyRow[engColNm] = (exp1.test(engColNm)) ? 0 : ' ';
		    }
			copyRow['no'] = table2.rows().count()+1;
			copyRow['bit'] = 'C';
	    
			//var row = table2.row.add(copyRow).draw();
			
			commonVo.currentRowData = copyRow;
			
			//table2.row(row).select();
			
			//console.log(row);
			//table2.row(row).scrollTo();

			fnMdiOpen('근태내역 신규','detail_','/monitor/popupEmpWorkingLog.html?table=TBM_EMP_WORKING_LOG&row=-1', 770, 700); // 이게 더 크게	
			//table2.row(row).scrollTo();
			//table2.scroller.toPosition( row );
		}
			
		/*
		 * popup에서 사용될 option 미리가져오기
		 */
		ChatManager.btnGetInputOption = function () {
			var commonVoString = ChatManager.setCommonVo(false,'TBM_EMP_WORKING_LOG','','');

			$.ajax({
		       url : "/BUS_getEmpWorkingLogInputOption",
				"data" :  {commonVoStr : commonVoString}, 	
		       "dataSrc" : "",
		        global: true, // 추가
		        //async : false,
		       dataType : 'json',
		       timeout : 10000,
		       success : function(ret) {	
				   	console.log(ret);
				   	commonVo.InputOption = ret;
					ChatManager.setOptionValue('#comboType1',ret.optionList[0]['CODE_TYPE1']);				   
					ChatManager.setOptionValue('#comboType2',ret.optionList[0]['CODE_TYPE2']);				   
					ChatManager.setOptionValue('#comboType3',ret.optionList[0]['CODE_TYPE3']);				   
		       },
		       error : function(request, status, error) {
		        alert(request.responseText);
		       }
			});	
		}

		ChatManager.setOptionValue = function (comboName, optionList) {
			var comboNm = $(comboName);
    	   	comboNm.empty();
			if (optionList == null || optionList == undefined)	return;
			
		    var params = optionList.split("/");
		    var result = '<option value="">' + '-선택-' + '</option>';
		    for (var i = 0; i < params.length; i++) {
				result += '<option value="'+ params[i] +'">' + params[i] + '</option>';
		    }
    	   	comboNm.append(result);
		}			
		/*
		 * 근태 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo(true,'TBM_EMP_WORKING_LOG','TBM_EMP_WORKING_LOG','');
			//console.log(commonVoString);
			var exp2 = /(_amt|_rate)/;
			var exp1 = /(memo|result|detail)/;
			var exp0 = /(company_no|work_time)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        //async:false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   if (firstFlag) {
						  var colNmEng;
							for (var i = 0; i < ret.header.length; i++) {
								colNmEng = ret.header[i].COLUMN_NAME.toLowerCase();
								var colNm = columnMap.get(colNmEng);
				    	        columns[i] = {
				    	            'title': colNm,
				    	            'data': colNmEng,
				    	            'className': exp2.test(colNmEng) ? "dt-right" : exp1.test(colNmEng) ? "dt-left" : "dt-center",
				    	            'render' : render_accidentResult,
				    	            'visible' : (exp0.test(colNmEng)) ? false : true
				    	        }
				    	    };
				    	    
				    	    var height= $('.empInfo0_2_2').height();
			    	        fn_setGridData('#exceltable',columns,ret.data,height,true);
			    	        
			    	        //  buildSelect( '#exceltable' );
			    	        firstFlag = false;
						} else {
							
							var resultTable = $('#exceltable').DataTable();
							resultTable.clear().draw();
			    	 	    resultTable.rows.add( ret.data ).draw( );
						}
						
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
   		firstFlag = true;  
   	});
	$(document).on('click', '#btnView', function () {
		ChatManager.btnView();
	});

	$(document).on('click', '#btnSave', function () {
		ChatManager.btnSave();
	});	

	$('#exceltable').on('dblclick','td', function() {
		var table2 = $('#exceltable').DataTable();
		var row = table2.row(this).index();
		//var col = table2.cell(this).index().column;
		ChatManager.btnPopup(table2,row);
	});	
	
	// 근태종류설정
	$(document).on('click', '#btnCommonCode', function () {
		fnMdiOpen2('공통코드 관리','commonCode_','/monitor/popupCommonCode.html', 770, 700); // 이게 더 크게	
	});	

	
/*  https://live.datatables.net/gejojiqu/1251/edit
	$('#exceltable').on('draw', function() {
			    buildSelect( '#exceltable' );
	  } );
*/
	
	//ChatManager.btnView();
	ChatManager.btnGetInputOption();
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
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets['인사카드'],{ header: 1 });  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets['인사카드'],{ header: 1 });  
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
	var chk_value ;
    for (var i = 0; i < jsondata.length; i++) {  
		chk_value = jsondata[i][columns[0]];
		
		if (startString == '') {
			if (i < startRow ) 
				continue;
			else 
				start = true;
		} else {
			if (start == false && chk_value != startString) {
				 start = false;
			 	continue;
			} else {
				 start = true;
			}
			if (endString != '') {
				if (chk_value.replace(regex, '') == endString)	 break;
			}
		}
		if (jsondata[i].length == 0)	break;
		if (chk_value == ''|| chk_value == '-' || chk_value == ' ' || chk_value == undefined)	break;
		
		//if (i>1100)
		//	console.log(jsondata[i][columns[0]] );
		
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
	        	console.log(cellValue + "--" + jhonKeys);
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

					gridRowData[gridColumns[colIndex].data] = cellValue;
				}
				////console.log(gridRowData);		
				////console.log(cellValue);		
			}

            //row$.append($('<td/>').html(cellValue));  
  		}  
		if (k == 0) {
			gridColumns[colIndex] = {
				'title': 'bit',
			    'data': 'bit'
			}
	  	} else {
			gridRowData[gridColumns[colIndex].data] = 'Y';
	  		gridData.push(gridRowData);
		}
        //$(tableid).append(row$);  
  		k++;
    }
	  		console.log(gridColumns);
	  		//console.log(gridData);
    ////console.log(targetGrid);

    //var height= $('.empInfo0_2_2').height();
    //fn_setGridData(targetGrid,gridColumns,gridData,height,true);
    
	var resultTable = $(targetGrid).DataTable();
	resultTable.clear().draw();
    resultTable.rows.add( gridData ).draw( );    
	console.log(gridData);
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
		dom: 'lBfrti',
		//orderCellsTop: true, //https://live.datatables.net/gejojiqu/1251/edit
	    scrollCollapse: true,
	    "scrollY": height,
	    //paging: false,
	    scrollX : true,
	    order : [[0,'desc']],
		columns: gridColumns,
		ordering: true,
		//"deferRender":true,
		//autoWidth: true,
/*		   scroller: {
        loadingIndicator: true
    },*/
        "searching": bSearch,
	    data: gridData,
	    select: {
        	style: 'os',
        	items: 'row'
    	},	        	
	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    },
        buttons: [
            {
                text: 'NEW',
                action: function ( e, dt, node, config ) {
                    ChatManager.btnNew();
                }
            },
            {
                text: '저장',
                action: function ( e, dt, node, config ) {
                    ChatManager.btnSave();
                }
            }
        ]	    
	});
	resultTable.columns.adjust().draw();  
	
/*
	if (firstFlag) {
		datatableEdit({
			dataTable : resultTable,
			//eventTarget : 'tbody td',
			columnDefs : [
					{targets :  4	,maxlength:10}
					,{targets : 5	,maxlength:10}
					,{targets : 6	,maxlength:10}
					,{targets : 7	,maxlength:10}
					,{targets : 8	,maxlength:10}
					,{targets : 9	,maxlength:10}
					,{targets : 10	,maxlength:10}
					,{targets : 11	,maxlength:10}
					,{targets : 12	,maxlength:30}
					,{targets : 13	,maxlength:30}
					,{targets : 14	,maxlength:10}
					,{targets : 15	,maxlength:10}
					,{targets : 16	,maxlength:50}
					,{targets : 17	,maxlength:50}

					,{targets : 18	,maxlength:10}
					,{targets : 19	,maxlength:10}
					,{targets : 20	,maxlength:10}
					,{targets : 21	,maxlength:10}
					,{targets : 22	,maxlength:10}
					,{targets : 23	,maxlength:10}
					,{targets : 24	,maxlength:10}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {

					$(resultTable.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					resultTable.cell(index.row, 1).data('Y');

				}
			}
		});
		firstFlag = false;		    
	}	*/
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

//분류코드
function fnMdiOpen2 (title,uniqueKey,url, w_width,w_height) {
	var iframName = "iframe_commonCode";  //uniqueKey;

	var child = document.getElementById(iframName);
	if (child != null) return;
	
	
	var text = '<iframe class="resized" id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';
	//var text = '<iframe id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';

	//var $objWindow = $('<div class="window">'+text+'</div>');
	var $objWindow2 = $('<div class="window resizer ugly">'+text+'</div>');
    var intRandom = Math.floor((Math.random() * 12) + 1);
    
    $($objWindow2).appendTo('body');
    //var height = $(iframName).contents().height();
    //var width = $(iframName).contents().width();
    //$objWindow.itemCd=uniqueKey;
    $objWindow2.window({
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
            ChatManager.btnGetInputOption();
        	$(this).remove();
        },
        open: function (event, ui) {
            $(this).css('overflow', 'hidden'); //this line does the actual hiding
          },          
        //icon: '../src/jquery-lwd/themes/windows2000/images/default.png'
        icon: '/resources/static/js/jquery-lwd/themes/material/images/icons/'+intRandom+'.png'
    });
}
function receiveChildMessageHandler(event) {
	$objWindow.remove();
	if (event.data == undefined || event.data == '') return;
	
	console.log(event.data.row);
		
	var table = $('#exceltable').DataTable();
	if (event.data.row >=0 ) {
		table.row(event.data.row).data(event.data).draw();
	} else {
		table.row.add(event.data).draw();
	}	
}

/*
//https://live.datatables.net/gejojiqu/1251/edit
function buildSelect( targetGrid ) {
	
  var table = $(targetGrid).DataTable();
	
  table.columns().every( function () {
    var column = table.column( this, {search: 'applied'} );
    console.log(this.index())
    var select = $('<select><option value=""></option></select>')
          .appendTo($("thead tr:nth-child(2) th").eq(column.index()).empty())
    .on( 'change', function () {
      var val = $.fn.dataTable.util.escapeRegex(
        $(this).val()
      );

      column
      .search( val ? '^'+val+'$' : '', true, false )
      .draw();
    } );

    column.data().unique().sort().each( function ( d, j ) {
      select.append( '<option value="'+d+'">'+d+'</option>' );
    } );
    
//     The rebuild will clear the exisiting select, so it needs to be repopulated
    var currSearch = column.search();
    if ( currSearch ) {
      select.val( currSearch.substring(1, currSearch.length-1) );
    }
  } );
}*/