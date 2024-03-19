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
		if (InputOption.primaryColumns.includes(row.colNm) || "no,bit,last_chg_user,last_chg_date".includes(row.colNm)) {
			$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'yellow');
			return data;
		}
	    return '<input class="form-control pjyInputEdit cell-datatable" id="' + row.colNm + '" type="text"  value = ' + data + ' >';
	} else if (meta.col == 2) {
		 var colNm = row.colNm.toUpperCase();
		 console.log(colNm);
		 if (InputOption.optionList[0][colNm] != undefined) {
		    var params = InputOption.optionList[0][colNm] .split("/");
		    var result;
		    for (var i = 0; i < params.length; i++) {
				result += '<option value="'+ params[i] +'">' + params[i] + '</option>';
		    }
    			return '<select class="comboBoxTypeAccident"  id="' + meta.row + '">' + result + '</select> ';
		}
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
		
		//var datatablesName = getParam("datatables");
		var row = getParam("row");
		
		//var exceltable = $('#'+datatablesName, window.parent.document).DataTable();
		//var datavalue = exceltable.row(row).data();
		var datavalue = parent.commonVo.currentRowData;
		//var arrHeader = exceltable.columns().header().map(d => d.textContent).toArray();
		
		console.log(parent.columns);
		console.log(datavalue);
		var title = '',engColNm='',value='';
		var k= 0;
		var exp1 = /(_amt)/;
	    for (var i = 0; i < parent.columns.length; i++) {
			if (parent.columns[i].visible == false ) continue;

			engColNm = parent.columns[i].data;
			value = datavalue[engColNm];
		//console.log(value);

			value = exp1.test(engColNm) ?  value.toString().replace(/,/g, '') : value; 

			saveData[engColNm] = value;

			
			title = parent.columns[i].title;
			
	        columns2[k] = {
				'id' : title
				,'value' : value
				,'colNm' :  engColNm
				,'combo' : ''
			}
			k++;
	    }
	    // rendering시 input editbox여부는 key 칼럼으로 check
		getInputOption();
			
		function setCommonVo (targetTable,filterType,filterText) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}		
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": 610,
		    scrollCollapse: true,
	        scrollX: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": [0,2]}	    
		        ,{"className": "dt-right", "targets": [1]}
		        ,{'render' : render_QueryResult2, 	"targets": [0,1,2]}    
	    	],
		    columns : [
		    	{data: "id" ,width:"150px"},
		    	{data: "value"},
		    	{data: "combo"},
		    	{data: "colNm",visible:false }		    	
		     ],
		     data : columns2	     
		});		
		
		/*
		 * 사고 저장
		 */
	    popupManager.btnSave = function () {

			if ( saveData['bit'] != 'Y') {
		  	    window.parent.postMessage('', "*");   // '*' on any domain 
		  	    return;     
			}
				
	
		    var data = {};
		    $.each($('input.cell-datatable'), function (index, value) {
		        saveData[this.id] = $(value).val();
		    })	    
//		    saveData['row'] = getParam("row");
  //  	    window.parent.postMessage(saveData, "*");   // '*' on any domain      

			var itemList  = []; 
			var vo =  new Object();
	 		vo = Object.assign({}, saveData);
			itemList.push( vo );
			
			var targetTable = getParam("table");
		    var jsonString = JSON.stringify(itemList);
			var commonVoString = setCommonVo(targetTable,'','');
			//console.log(jsonString);
			$.ajax({
			       url : "/BUS_mergeInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   saveData['row'] = getParam("row");
			    	   window.parent.postMessage(saveData, "*");   // '*' on any domain        
	
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			    	   
			       }
			});
		}			
		/*
		 * dynamic 공통 호출
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
		popupManager.mainGrid.cell(1,1).data('Y').draw();
	})
	$('.comboBoxTypeAccident').change(function () {
		console.log($(this).val());
		console.log(this.id);
		popupManager.mainGrid.cell(this.id,1).data($(this).val()).draw(); 		
	})
	    
});





