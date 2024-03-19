
var param = {};
var popupManager = null;
var columns = [];


function render_QueryResult2(data,type,row,meta){
	if (meta.col != 1)
		return data;

    if (data == null)
    	return data;
    
    
    var aa = row.id;
    var strLink = 'ckg_hdn_cd,ckg_func_cd,cmps_cpst_ast_cls';
	if( strLink.indexOf(aa) >= 0){
		var api = new $.fn.dataTable.Api(meta.settings);
    	$(api.cell({row: meta.row, column: meta.col}).node()).css('text-decoration', 'underline');		
    	$(api.cell({row: meta.row, column: meta.col}).node()).css('color', '#EE82EE');
	}
    
	return data;
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    //console.log(params);
    var k=0;
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if (k > 0 || temp[0] == 'header') {
			console.log(columns[k].id);
			columns[k].id = decodeURIComponent(temp[1]);
			k++;			
		} else {
	        columns[i] = {
				'id' : temp[0]
				,'value' : decodeURIComponent(temp[1])
			}
		}
    }
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
		getParam("data");

	
		//param.codeColumn = getParam("codeColumn").replace(/:/g, '=').replace(/%20/g, ' ').replace(/%27/g, '\'');
		  
		//console.log(param.codeColumn);
		
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": 570,
	        scrollCollapse: true,
	        scrollX: true,
	        "processing": true,
		    select: {
	            style: 'single'
		    },
		    //autoWidth: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": "_all"}	        
	    	],
		    columns : [
		    	{data: "id"},
		    	{data: "value",	'render' : render_QueryResult2 }
		     ],
		     data : columns		     
		});		
		

	    return popupManager;
	}());

	
	    
 	//   dynamicAjaxCall(null,param.tableName,param.codeColumn,'#popupGrid',true,'점검항목기본',200,function (result) {
	//		return;
	//	}) ;
});




/*
 * dynamic 공통 호출
 */
function dynamicAjaxCall(tableInfo,filterType,filterTexta,tableName,search,searchTitle,height,callback) {
	var columns = [];
	
	
	$.ajax({
	       url : "/DynamicSqlFilter",
	      "data" : {
	    	    server : param.server,
	    	  	filterType : filterType,
	    	  	filterText : filterTexta
	        	}, 	       
	       "dataSrc" : "",
	        global: true, // 추가
	       dataType : 'json',
	       timeout : 10000,
	       success : function(ret) {	
	    	    for (var i = 0; i < ret.header.length; i++) {
	    	    	var colName = ret.header[i].COLUMN_NAME.toLowerCase();
	    	    	//var value= eval('ret.data[0].' + colName);
	    	    	var value = ret.data[0][colNm]; 
	    	    	if ( tableInfo == null) {
		    	        columns[i] = {
			    	            'id': colName,
			    	            'name': '-',
			    	            'type': 'String',
			    	            'value' : value
			    	        }
	    	    		
	    	    	} else {
		    	        columns[i] = {
			    	            'id': colName,
			    	            'name': tableInfo.columnInfo[i].comments,
			    	            'type': tableInfo.columnInfo[i].type,
			    	            'value' : value
			    	        }
	    	    		
	    	    	}
	    	    };
    	        popupManager.mainGrid.rows.add( columns ).draw();
	    	    popupManager.mainGrid.columns.adjust().draw();
	       },
	       error : function(request, status, error) {
	        alert(request.responseText);
	       }
		});	
}

