
var param = {};
var popupManager = null;
 var commonVo =  new Object();


function render_QueryResult2(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
    
    //var aa = row.id;
    //var strLink = 'ckg_hdn_cd,ckg_func_cd,cmps_cpst_ast_cls';
	if( meta.col == 0 ){
		if (data == 'a') {	
			data = '오전';
		} else {
			data = '오후';
		}
					
    	//$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'sky blue');		
    	//$(api.cell({row: meta.row, column: meta.col}).node()).css('color', '#EE82EE');
	}
	if (row.ampm == 'a') {	
		$(api.cell(meta.row, meta.col).node()).css('background-color', '#EF9A9A');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'black');		
	} else {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'skyblue');		
		$(api.cell(meta.row, meta.col).node()).css('color', 'black');		
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
		//param.route_nm = decodeURIComponent(getParam("routeNm"));
		param.baseYm = getParam("baseYm");
		param.checkDay = getParam("checkDay");
		//console.log(param.route_nm);
		//var aa =  decodeURI(decodeURIComponent(request.getParameter('routeNm')));
		param.route_nm =  decodeURIComponent(request.getParameter('routeNm'));
		console.log(param.route_nm);
		console.log(param.baseYm);
		console.log(param.checkDay);
		
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": 570,
	        //scrollCollapse: true,
	        //scrollX: true,
		   rowsGroup: [0],
/*		    select: {
	            style: 'single'
		    },
*/	//	    order : [[3,'asc']],
		//    ordering: true,
		    //autoWidth: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": "_all",render : render_QueryResult2}	        
	    	],
		    columns : [
		    	{data: "ampm" 		,width:"5%"},
		    	{data: "seq"		,width:"5%"},
		    	{data: "car_regno"	,width:"15%"},
		    	{data: "emp_nm" 	,width:"10%"},
		    	{data: "value" 		,width:"5%"},
		    	{data: "phone_no" 	,width:"20%"},
		    	{data: "email" 		,width:"30%"},
		    	{data: "emp_no" 	,width:"10%"}
		     ]
		});		
		

	    return popupManager;
	}());

	
            

	// 사전점검위반내역 상세 팝업 
	$('#popupGrid').on('click','td', function() {
		var table = $('#popupGrid').DataTable();
		var data = table.row(this).data();
		if (data == "undefined" || data == "") return;

		console.log(data);
		
//		if (data.id == 'ckg_func_cd') {
			var whereStr = " " + data.emp_nm + ":'" + data.route_nm + "'";
			window.parent.postMessage(whereStr, "*");   // '*' on any domain
			return;
//		}
	});
	    
//	dynamicAjaxCall(null,'TBL_DRIVERINFO_SP','','#popupGrid',200,function (result) {});
	dynamicAjaxCall(null,'dailyArrangeInfo','','#popupGrid',200,function (result) {});
});




/*
 * dynamic 공통 호출
 */
function dynamicAjaxCall(tableInfo,filterType,filterTexta,tableName,height,callback) {

	commonVo.filterType = filterType;
	console.log(param.route_nm);
	commonVo.routeNm = param.route_nm;
	commonVo.baseYm = param.baseYm;
	commonVo.checkDay = param.checkDay;
	var commonVoStr = JSON.stringify (commonVo);
	
	
	$.ajax({
	       url : "/DynamicSqlFilter",
    	   "data" :   {commonVoStr : commonVoStr},
	       "dataSrc" : "",
	        global: true, // 추가
	       dataType : 'json',
	       timeout : 10000,
	       success : function(ret) {	
    	        popupManager.mainGrid.rows.add( ret.data ).draw();
    			popupManager.mainGrid.rowsgroup.update();
	    	    //popupManager.mainGrid.columns.adjust().draw(false);

	       },
	       error : function(request, status, error) {
	        alert(request.responseText);
	       }
	});	
}