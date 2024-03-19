
var param = {};
var popupManager = null;
 var commonVo =  new Object();


function render_QueryResult2(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	if ( row.bit == 'Y') {
		$(api.cell(meta.row, meta.col).node()).css('color', 'red');
	}
	if (meta.col == 1) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
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
	    function popupManager() {
	    } 	
	    popupManager.mainGrid = null;
		//param.route_nm = decodeURIComponent(getParam("routeNm"));
//		param.baseYm = getParam("baseYm");
//		param.checkDay = getParam("checkDay");
		//console.log(param.route_nm);
		//var aa =  decodeURI(decodeURIComponent(request.getParameter('routeNm')));
//		param.route_nm =  decodeURIComponent(request.getParameter('routeNm'));
//		console.log(param.route_nm);
//		console.log(param.baseYm);
//		console.log(param.checkDay);
		
		
	    popupManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#popupGrid').DataTable();
			var itemList = [];
			
	    	table.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
    			var typeGb = $(node2).find('.comboBoxType').val()
				aData.wiban_gijun = typeGb;
				itemList [idx] = aData;
			});

			return JSON.stringify (itemList);
		}	    
		popupManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText,bValidCheck) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}		
		/*
		 *  저장
		 */
	    popupManager.btnSave = function () {
			var commonVoString = popupManager.setCommonVo('TBM_ROUTE_COMMON_INFO','TBM_ROUTE_COMMON_INFO','',true);
			var jsonString = popupManager.setSaveParamVo();
			//console.log(commonVoString);
			console.log(jsonString);
			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: true, // 추가
			        async : false,
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   popupManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		popupManager.btnView = function () {
			popupManager.mainGrid.clear(); 
			dynamicAjaxCall(null,'TBM_ROUTE_COMMON_INFO','','#popupGrid',200,function (result) {});	
		}
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": 570,
	        //scrollCollapse: true,
	        //scrollX: true,

/*		    select: {
	            style: 'single'
		    },
*/	//	    order : [[3,'asc']],
		//    ordering: true,
		    //autoWidth: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": "_all"}	        
	    	],
		    columns : [
		    	{data: "bit" 			,visible : false},
		    	{data: "route_nm" 		,width:"10%" ,render : render_QueryResult2},
		    	{data: "code"			,visible : false},
		    	{data: "am_seq_array"	,width:"15%"},
		    	{data: "pm_seq_array" 	,width:"15%"},
		    	{data: "wiban_gijun" 	,width:"15%"
		    	    ,render:function(oObj) {
    	    			return '<select class="comboBoxType" id="typeGb">' + '<option value="P">퍼센트</option>' + '<option value="M">분</option>' + '</select> ';
    	        	}
    	        },
		    	{data: "wiban_min_value" 	,width:"15%"},
		    	{data: "wiban_max_value" 	,width:"15%"}
		     ]
		});		
		datatableEdit({
			dataTable : popupManager.mainGrid,
			//eventTarget : 'tbody td',
			columnDefs : [
				 	{targets : 3	,maxlength:10}
				, 	{targets : 4	,maxlength:10}
				//,	{targets : 5	,maxlength:10}
				,	{targets : 6	,maxlength:10}
				,	{targets : 7	,maxlength:10}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					$(popupManager.mainGrid.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					popupManager.mainGrid.cell(index.row, 0).data('Y');
				}
			}
		});		

	    return popupManager;
	}());

	$(document).on('click', '#btnSave', function () {
		popupManager.btnSave();
	});
	// Handle change event for status selection control
	//$('#popupGrid').on('change', '.comboBoxType', function(){
	    
	 //   var row = $('#popupGrid').DataTable().row($(this).closest('tr')).index();
	 //   console.log(row);
	    
	    //$(rownode).find('.comboBoxType').val(item.wiban_gijun)
	 //   popupManager.mainGrid.cell(row, 5).data($(this).val()).draw(false);	
	//});
	popupManager.btnView();
});




/*
 * dynamic 공통 호출
 */
function dynamicAjaxCall(tableInfo,filterType,filterText,tableName,height,callback) {

	commonVo.filterType = filterType;
	//console.log(param.route_nm);
	//commonVo.routeNm = param.route_nm;
	//commonVo.baseYm = param.baseYm;
	//commonVo.checkDay = param.checkDay;
	var commonVoStr = JSON.stringify (commonVo);
	
	
	$.ajax({
	       url : "/DynamicSqlFilter",
    	   "data" :   {commonVoStr : commonVoStr},
	       "dataSrc" : "",
	        global: true, // 추가
	       dataType : 'json',
	       timeout : 10000,
	       success : function(ret) {	
                $.each(ret.data, function (i, item) {
					//console.log(item);
                	var rownode = popupManager.mainGrid.row.add( item ).draw(false).node();
                	// use_yn을 combobox로 변환	
                	$(rownode).find('.comboBoxType').val(item.wiban_gijun)
                })			   
    	        //popupManager.mainGrid.rows.add( ret.data ).draw();
	    	    //popupManager.mainGrid.columns.adjust().draw(false);

	       },
	       error : function(request, status, error) {
	        alert(request.responseText);
	       }
	});	
}
