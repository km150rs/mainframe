
var param = {};
var popupManager = null;
 var commonVo =  new Object();

let columnMap_popup = new Map([
	 ['no'              ,'no']
	,['age_gb'     	 	,'연령대']
	,['tot_cnt'         ,'사고건수']
	,['tot_amt'        	,'사고금액']
	,['work_date'      	,'운행일자']
	,['emp_nm'        	,'운전자']
	,['dup_cnt'        	,'중복건수']
]);


function render_QueryResult(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0){		
		$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'yellow');
		return data;
	}	
    var colNm = meta.settings.aoColumns[meta.col].mData;
    	
	var expNumCol = /(_AMT|_CNT)/;
	if( expNumCol.test(colNm)){
		data = $.fn.dataTable.render.number(',').display(data);
	}
	
	return data;
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    var temp ;
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}


$( function() {
    
	popupManager = (function () {
	    function popupManager() {
	    } 	
		
		
		popupManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			//commonVo.targetTable = targetTable;
			//commonVo.filterType = getParam('filterType');
			//commonVo.filterText = filterText;
			return JSON.stringify (parent.commonVoPopup);
		}		

		popupManager.btnView = function () {
			var commonVoString = popupManager.setCommonVo('','','');
			console.log(commonVoString);
			

			var expNumCol = /(_amt|_cnt)/;
			
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilterMybatis",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async:false,
			       	dataType : 'json',
			       	timeout : 10000,
			       	success : function(ret) {
						   if (ret == undefined || ret.data == null) return;	
					   	//console.log(ret);
					   	if (ret.data.length == 0)	return;
					   	
					   	var i=0;
					   	for (var key in ret.data[0]) {
							var colEngNm = key.toLowerCase();
							var colNm = columnMap_popup.get(colEngNm);

							   //console.log(key + '=' + ret.data[0][key]);
			    	        columns[i++] = {
			    	            'title': colNm,
			    	            'data': key,
			    	            'className': expNumCol.test(colEngNm) ? 'dt-right' : 'dt-center',
			    	            'render' : render_QueryResult
			    	        }
							   
						}
			    	    var height= $('.empInfo0').height();
			    	    //console.log(height);
		    	        gfn_setGridData('#popupGrid',columns,ret.data,height,false);

/*						for (var i = 0; i < ret.data.length; i++) {
							var colNm = columnMap_popup.get(ret.header[i].COLUMN_NAME.toLowerCase());
							var colEngNm = ret.header[i].COLUMN_NAME.toLowerCase();
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': colEngNm,
			    	            'className': expNumCol.test(colEngNm) ? 'dt-right' : 'dt-center',
			    	            'render' : render_QueryResult
			    	        }
			    	    };
			    	    var height= $('.empInfo0').height();
			    	    //console.log(height);
		    	        gfn_setGridData('#popupGrid',columns,ret.data,height,false);
*/					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}


	    return popupManager;
	}());

	popupManager.btnView();
});

