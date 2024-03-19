 var commonVo =  new Object();
var param = {};
var popupManager = null;
var columns2 = [];
var InputOption;
var saveData = {};


function render_QueryResult2(data,type,row,meta){
	//if( meta.row > 19){
		var api = new $.fn.dataTable.Api(meta.settings);
		
   // console.log(pastValue);
   // console.log(lateValue);
	if (meta.col == 0){		
		$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'silver');
		return data;
	} else   if (meta.col == 1){	
			if (InputOption.primaryColumns.includes(row.colNm) ) {
				$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'yellow');

				if (saveData['bit'] == 'N') 
					return data;
			} else {
				$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'khaki');
			}
	} else if (meta.col == 2) {
		var colNm = row.colNm.toUpperCase();
		//console.log(colNm);
		if (InputOption.primaryColumns.includes(row.colNm) && saveData['bit'] == 'N') {
			return data;
		}
		if (InputOption.optionList[0][colNm] != undefined) {
		    var params = InputOption.optionList[0][colNm] .split("/");
		    var result = '<option value="">' + '-선택-' + '</option>';
		    for (var i = 0; i < params.length; i++) {
				result += '<option value="'+ params[i] +'">' + params[i] + '</option>';
		    }
    		return '<select class="comboBoxTypeAccident"  id="' + meta.row + "__" +colNm + '">' + result + '</select> ';
		} else {
			if (colNm.includes('_DATE')) {
				return	'<div  class="tui-datepicker-input tui-datetime-input tui-has-focus">' +
		            	'<input type="text" id="'+ row.colNm + '" aria-label="Date-Time" autocomplete="off">' +
				        '<span class="tui-ico-date"></span>' +
				        '</div>	'			  +
				        '<div id="datepicker-' + row.colNm + '" style="margin-top: -1px;overflow:hidden"></div>';	
				
			} else if (colNm.includes('MEMO') || colNm.includes('_DESC')) {
				return '<textarea class="pjyTextarea" id="' +meta.row + "__" +colNm + '" cols="40" rows="4" maxlength="300">' + data + '</textarea>';
			} else {
			    return '<input class="form-control pjyInputEdit cell-datatable" id="' + meta.row + "__" +colNm + '" type="text"  value = ' + data + ' >';
			}
		}
	}
    
	var expNumCol = /(_amt)/;
	if( expNumCol.test(row.colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}
	return data;
}

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


function getParam_old(sname) {
    var paramArray = location.search.substr(location.search.indexOf("?") + 1);
    var params = paramArray.split("&header=");
    var header = params[1].split("&");
    for (var i = 1; i < header.length; i++) {
		    var temp = header[i].split("=");
		    var text = decodeURIComponent(temp[1]);
		    var subText,regNo,regSeq,subText2;
		    if (text.includes('[')) {
				subText = text.split('[')[0];
				subText2 = text.split(']')[1];
				regNo = text.match(/(?<=\[).+(?=\])/g);
				regSeq = parseInt(subText2.match(/(?<=\().+(?=\))/g)) + 1;
				//console.log(text + ':' + regSeq);
			} else {
				subText = text;
				regNo = '';
				regSeq = '';
			}
	        columns[i-1] = {
				'id' : subText
				,'value' : ''
				,'regNo' : (regNo == null) ? '' : regNo
				,'regSeq' : (regSeq == null) ? '' : regSeq
			}
    }

    var data = params[0].split("&");
    for (var k = 1; k < data.length; k++) {
		
		    var temp = data[k].split("=");
			columns[k-1].value = decodeURIComponent(temp[1]);
			
			if (k==13)		pastValue = decodeURIComponent(temp[1]);
			if (k==14)		lateValue = decodeURIComponent(temp[1]);
				
    }
    console.log(pastValue);
    console.log(lateValue);
    
}

var Request = function() {  
    this.getParameter = function(name) {  
        var rtnval = '';  
        var nowAddress = unescape(location.href);  
        var parameters = (nowAddress.slice(nowAddress.indexOf('?') + 1,  
                nowAddress.length)).split('&');  
        for (var i = 0; i < parameters.length; i++) {  
            var varName = parameters[i].split('=')[0];  
            if (varName.toUpperCase() == name.toUpperCase()) {  
                rtnval = parameters[i].split('=')[1];  
                break;  
            }  
        }  
        return rtnval;  
    }  
}  
var request = new Request(); 

$( function() {
    
	popupManager = (function () {
		popupManager.mainGrid = null;
		
	    function popupManager() {
	    } 	
		
		var	currentRowData = parent.commonVo.currentRowData;
			
		InputOption = parent.commonVo.InputOption;
		
		var title = '',engColNm='',value='';
		var k= 0;
		var exp1 = /(_amt)/;
		var exp2 = /(last_chg_user|last_chg_date)|^no|^bit/;
	    for (var i = 0; i < parent.columns.length; i++) {
			// 부모 테이블에서 visible = false check 
			if (parent.columns[i].visible == false ) continue;
			engColNm = parent.columns[i].data;
			title = parent.columns[i].title;

			value = currentRowData[engColNm];
			value = exp1.test(engColNm) ?  value.toString().replace(/,/g, '') : value; 

			saveData[engColNm] = value;

			// 자식 테이블에 hidden 칼럼 
			if (exp2.test(engColNm)) continue;

	        columns2[k] = {
				'id' : title
				,'value' : value
				,'colNm' :  engColNm
				,'combo' : ''
			}
			k++;
	    }
	    // rendering시 input editbox여부는 key 칼럼으로 check
		//getInputOption();
		
		popupManager.setCommonVo = function (targetTable,filterType,filterText) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}		
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": 710,
		    scrollCollapse: true,
	        scrollX: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": [0,2]}	    
		        ,{"className": "dt-right", "targets": [1]}
		        ,{'render' : render_QueryResult2, 	"targets": [0,1,2]}    
	    	],
		    columns : [
		    	{data: "id" ,width:"150px"},
		    	{data: "value",width:"200px"},
		    	{data: "combo"},
		    	{data: "colNm",visible:false }		    	
		     ],
		     data : columns2	     
		});		
		
		/*
		 *  저장
		 */
	    popupManager.btnSave = function () {
			console.log(saveData['bit']);

			if ( saveData['bit'] == 'N') {
		  	    window.parent.postMessage('', "*");   // '*' on any domain 
		  	    return;     
			}
				
			saveData['work_time'] = comm_getCurrentTime();
		    //var data = {};
/*		    $.each($('input.cell-datatable'), function (index, value) {
				id = this.id.split('#')[1].toLowerCase();

		        saveData[id] = $(value).val();
		    })	    
*/
			var itemList  = []; 
			var vo =  new Object();
	 		vo = Object.assign({}, saveData);
			itemList.push( vo );
			
			var targetTable = getParam("table");
		    var jsonString = JSON.stringify(itemList);
			var commonVoString = popupManager.setCommonVo(targetTable,'','');
			console.log(jsonString);
			$.ajax({
			       url : "/BUS_mergeInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   saveData['bit'] = 'N';
			    	   saveData['row'] = getParam("row");
			    	   window.parent.postMessage(saveData, "*");   // '*' on any domain        
	
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			    	   
			       }
			});
		}			
		/*
		 * 사용안함
		 */
		function getInputOption() {
			var targetTable = getParam("table");
			var commonVoString = setCommonVo(targetTable,'','');

			$.ajax({
		       url : "/BUS_getPrimaryKey",
				"data" :  {commonVoStr : commonVoString}, 	
		       "dataSrc" : "",
		        global: true, // 추가
		        async : false,
		       dataType : 'json',
		       timeout : 10000,
		       success : function(ret) {	
				   console.log(ret);
				   InputOption = ret;
		       },
		       error : function(request, status, error) {
		        alert(request.responseText);
		       }
			});	
		}

		
	    return popupManager;
	}());

	//저장
	$('#btnSave').click(function () {
	    popupManager.btnSave();
	})
	

	// autoselect
	$('input.cell-datatable').click(function () {
		this.select();
	})
	// autoselect
	$('input.cell-datatable').change(function () {
		saveData['bit'] = 'Y';
		//popupManager.mainGrid.cell(1,1).data('Y').draw();
		//console.log($(this).val());
		//console.log(this.id.split('#')[0]);
		var row = this.id.split('__')[0];
		var id = this.id.split('__')[1].toLowerCase();
		saveData[id] = $(this).val();
		popupManager.mainGrid.cell(row,1).data($(this).val()).draw(); 		
	})
	$('.comboBoxTypeAccident').change(function () {
		saveData['bit'] = 'Y';
		//console.log($(this).val());
		//console.log(this.id);
		var row = this.id.split('__')[0];
		var id = this.id.split('__')[1].toLowerCase();
		saveData[id] = $(this).val();
		popupManager.mainGrid.cell(row,1).data($(this).val()).draw(); 		
	})
	$('.pjyTextarea').change(function () {
		saveData['bit'] = 'Y';
		//console.log($(this).val());
		//console.log(this.id);
		var row = this.id.split('__')[0];
		var id = this.id.split('__')[1].toLowerCase();
		saveData[id] = $(this).val();
		popupManager.mainGrid.cell(row,1).data($(this).val()).draw(); 		
	})
	if (getParam("row") == -1) {
	
	    var calMonthKo_work_date = new tui.DatePicker('#datepicker-work_date', {
	        date: new Date(),
	        language: 'ko',
	        input: {
	            element: '#work_date',
	            format: 'yyyy-MM-dd'
	        }
	    });	    
		 //$('#work_date').focus();
			saveData['work_date'] = $('#work_date').val();
			popupManager.mainGrid.cell(0,1).data($('#work_date').val()).draw(); 		
		 
		calMonthKo_work_date.on('change', () => {
			saveData['bit'] = 'Y';
			saveData['work_date'] = $('#work_date').val();
			popupManager.mainGrid.cell(0,1).data($('#work_date').val()).draw(); 		
		});
	}	

    var calMonthKo_disposition_date = new tui.DatePicker('#datepicker-disposition_date', {
        date: new Date(),
        language: 'ko',
        input: {
            element: '#disposition_date',
            format: 'yyyy-MM-dd'
        }
    });	    
	 //$('#proc_date').focus();
		saveData['disposition_date'] = $('#disposition_date').val();
		popupManager.mainGrid.cell(9,1).data($('#disposition_date').val()).draw(); 		
	 
	calMonthKo_disposition_date.on('change', () => {
		saveData['bit'] = 'Y';
		saveData['disposition_date'] = $('#disposition_date').val();
		popupManager.mainGrid.cell(9,1).data($('#disposition_date').val()).draw(); 		
	});
	 
	 
	
});





