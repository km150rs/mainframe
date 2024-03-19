var $objWindow;
/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var commonVoPopup =  new Object();
 var startString = '회사';
 var endString = '';
 var firstFlag = true;
 var firstFlag2 = true;
 var ChatManager = null;
 var columns = [];
 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
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
	,['bit' 	       ,'변경 여부']	 
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

	var now = new Date();
	var yearStart = new Date(now.setMonth(now.getMonth() - now.getMonth()));	// 한달 전
    var calMonthKo_from = new tui.DatePicker('#datepicker-from', {
        date: yearStart,
        language: 'ko',
        type: 'month',
        input: {
            element: '#fromYear',
            format: 'yyyy-MM'
        }
    });
    var calMonthKo_to = new tui.DatePicker('#datepicker-to', {
        date: new Date(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#toYear',
            format: 'yyyy-MM'
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
			
			var fromYear = $('#fromYear').val();
			var toYear = $('#toYear').val();
			if (bValidCheck) {
			    if (fromYear > toYear) {
					swal('from - to 기간을 확인하세요');
					return null;
				}
			}			
			commonVo.fromDate = fromYear ;
			commonVo.toDate = toYear;
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			commonVo.codeType1 =  $('#comboType1').val();
			commonVo.codeType2 =  $('#comboType2').val();
			commonVo.codeType3 =  $('#comboType3').val();
			
			
			return JSON.stringify (commonVo);
		}
		/*
		 * 사고 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo(true,'TBM_ACCIDENT_INFO','TBM_ACCIDENT_INFO','');
			var jsonString = ChatManager.setSaveParamVo();
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_mergeInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: false, // 추가
			       timeout : 10000,
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


		ChatManager.btnPopup_age = function (table,row) {
			commonVoPopup.filterType = 'select_getAccidentAge';
			commonVoPopup.fromDate = $('#fromYear').val();
			commonVoPopup.toDate = $('#toYear').val();
			fnMdiOpen('연령별 사고현황','detail_','/monitor/popupDynamic.html', 500, 300); // 이게 더 크게	
		}
		ChatManager.btnPopup_enterDate = function (table,row) {
			commonVoPopup.filterType = 'select_getAccidentEnterDate';
			commonVoPopup.fromDate = $('#fromYear').val();
			commonVoPopup.toDate = $('#toYear').val();
			fnMdiOpen('근속년차별 사고현황','detail_','/monitor/popupDynamic.html', 500, 600); // 이게 더 크게	
		}
		

		ChatManager.btnPopup = function (table,row) {
			commonVo.currentRowData = table.row(row).data();
	
			fnMdiOpen('사고내역 변경','detail_','/monitor/popupDetail_accident.html?table=TBM_ACCIDENT_INFO&row='+row, 770, 650); // 이게 더 크게	
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

			fnMdiOpen('사고내역 신규','detail_','/monitor/popupDetail_accident.html?table=TBM_ACCIDENT_INFO&row=-1', 770, 650); // 이게 더 크게	
			//table2.row(row).scrollTo();
			//table2.scroller.toPosition( row );
		}
			
		/*
		 * popup에서 사용될 option 미리가져오기
		 */
		ChatManager.btnGetInputOption = function () {
			var commonVoString = ChatManager.setCommonVo(false,'TBM_ACCIDENT_INFO','','');

			$.ajax({
		       url : "/BUS_getAccidentInputOption",
				"data" :  {commonVoStr : commonVoString}, 	
		       "dataSrc" : "",
		        global: true, // 추가
		        async : false,
		       dataType : 'json',
		       timeout : 10000,
		       success : function(ret) {	
				   console.log(ret);
				   commonVo.InputOption = ret;
				   
					ChatManager.setOptionValue('#comboType1',ret.optionList[0]['ACC_GB']);				   
					ChatManager.setOptionValue('#comboType2',ret.optionList[0]['ACC_KIND']);				   
					ChatManager.setOptionValue('#comboType3',ret.optionList[0]['GAPI_GB']);				   
				   
		       },
		       error : function(request, status, error) {
		        alert(request.responseText);
		       }
			});	
		}

		ChatManager.setOptionValue = function (comboName, optionList) {
			var comboNm = $(comboName);
    	   	comboNm.empty();

		    var params = optionList.split("/");
		    var result = '<option value="">' + '-선택-' + '</option>';
		    for (var i = 0; i < params.length; i++) {
				result += '<option value="'+ params[i] +'">' + params[i] + '</option>';
		    }
    	   	comboNm.append(result);
		}			
			
		/*
		 * 사고 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo(true,'TBM_ACCIDENT_INFO','TBM_ACCIDENT_INFO','');
			//console.log(commonVoString);
			var exp2 = /(_amt|_rate)/;
			var exp1 = /(_memo|_result|_place)/;
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async:false,
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
				    	            'visible' : (i == 2 ) ? false : true
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
	  		////console.log(gridColumns);
	  		////console.log(gridData);
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
                text: '근속년차별 사고현황...',
                action: function ( e, dt, node, config ) {
                    ChatManager.btnPopup_enterDate();
                }
            },
            {
                text: '연령대별 사고현황...',
                action: function ( e, dt, node, config ) {
                    ChatManager.btnPopup_age();
                }
            },
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