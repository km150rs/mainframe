
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
	if (meta.col == 0){		
		$(api.cell({row: meta.row, column: meta.col}).node()).css('background-color', 'silver');
		return data;
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
	    popupManager.mainGrid = null;
		
	    popupManager.setSaveParamVo = function setSaveParamVo() {
			var itemList = [];

			for (var i=0; i< 3; i++) {

				popupManager.mainGrid.column(i+2).data().each( function (value,index) {
					if (value.trim() != '') {
						var vo =  new Object();
						if (i ==0 )
							vo.code_gb = '민원대분류';
						else if (i == 1)
							vo.code_gb = '민원중분류';
						else if (i == 2)
							vo.code_gb = '민원소분류';
							
						vo.code_id = value;
						vo.code_nm = '';
						vo.memo = '';
						vo.code_value = 0;
						vo.code_min = 0;
						vo.code_max = 0;
						vo.use_yn = 'Y';
						itemList.push( vo );
					}
				});

			}
			//console.log(itemList);
			return JSON.stringify (itemList);
		}	    
		
		
		popupManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}		
		/*
		 *  저장
		 */
	    popupManager.btnSave = function () {
			var commonVoString = popupManager.setCommonVo('TBM_COMMON_CODE_INFO','TBM_COMMON_CODE_INFO_complaints','민원');
			var jsonString = popupManager.setSaveParamVo();
			//console.log(commonVoString);
			//console.log(jsonString);
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
			var commonVoString = popupManager.setCommonVo('','TBM_COMMON_CODE_INFO_complaints','');
			
			$.ajax({
			       url : "/DynamicSqlFilter",
		    	   "data" :   {commonVoStr : commonVoString},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
		    	        popupManager.mainGrid.rows.add( ret.data ).draw();
			    	    popupManager.mainGrid.columns.adjust().draw(false);
			       },
			       error : function(request, status, error) {
			        alert(request.responseText);
			       }
			});	

		}
		popupManager.btnNew = function () {
			var copyRow = popupManager.mainGrid.row(0).data();
			var vo = Object.assign({}, copyRow);
			vo['no'] = popupManager.mainGrid.rows().count()+1;
			vo['bit'] = 'C';
			vo['code_type1'] = '';
			vo['code_type2'] = '';
			vo['code_type3'] = '';
	    
			popupManager.mainGrid.row.add(vo).draw();
		}		
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    
	       	dom: 'lBfrti',		
		    "scrollY": 570,
		    dom: 'lBfrti',
	        //scrollCollapse: true,
	        //scrollX: true,

/*		    select: {
	            style: 'single'
		    },
*/	//	    order : [[3,'asc']],
		//    ordering: true,
		    //autoWidth: true,
		    "searching": true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": "_all"}	        
		        ,{render : render_QueryResult2, "targets": "_all"}	        
	    	],
		    columns : [
		    	{data: "no" 			},
		    	{data: "bit" 			,visible : false},
		    	{data: "code_type1" 			},
		    	{data: "code_type2" 			},
		    	{data: "code_type3" 			}
		     ],
	        buttons: [
	            {
	                text: 'NEW',
	                action: function ( e, dt, node, config ) {
	                    popupManager.btnNew();
	                }
	            },
	            {
	                text: '저장',
	                action: function ( e, dt, node, config ) {
	                    popupManager.btnSave();
	                }
	            }
	        ]	    
		     
		});		
		datatableEdit({
			dataTable : popupManager.mainGrid,
			//eventTarget : 'tbody td',
			columnDefs : [
				 	{targets : 2	,maxlength:20}
				, 	{targets : 3	,maxlength:20}
				,	{targets : 4	,maxlength:20}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					popupManager.mainGrid.cell(index.row, 1).data('Y');
				}
			}
		});		

	    return popupManager;
	}());

	$(document).on('click', '#btnSave', function () {
		popupManager.btnSave();
	});
	popupManager.btnView();
});

