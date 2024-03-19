
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
	if ( row.use_yn == 'N') {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'gray');
	}
	if (meta.col <= 3){		
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
			
	    	popupManager.mainGrid.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
			    
    			var typeGb = $(node2).find('.comboBoxType').val()
				aData.use_yn = typeGb;
				itemList [idx] = aData;
			});

			
			//var itemList  = popupManager.mainGrid.rows().data().toArray();
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
			var commonVoString = popupManager.setCommonVo('TBM_COMMON_CODE_INFO','TBM_COMMON_CODE_INFO','인사평가');
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
			var commonVoString = popupManager.setCommonVo('','TBM_COMMON_CODE_INFO_point','');
			
			$.ajax({
			       url : "/DynamicSqlFilter",
		    	   "data" :   {commonVoStr : commonVoString},
			       "dataSrc" : "",
			        global: true, // 추가
			        //async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   console.log(result);
		                $.each(result.data, function (i, item) {
		                	var rownode = popupManager.mainGrid.row.add( item ).draw(false).node();
		                	// use_yn을 combobox로 변환	
		                	$(rownode).find('.comboBoxType').val(item.use_yn)
		                })
					   
		    	        //popupManager.mainGrid.rows.add( ret.data ).draw();
			    	    //popupManager.mainGrid.columns.adjust().draw(false);
			       },
			       error : function(request, status, error) {
			        alert(request.responseText);
			       }
			});	

		}
		popupManager.btnNew = function () {
			var copyRow = popupManager.mainGrid.row(0).data();
			var vo = Object.assign({}, copyRow);
			vo['bit'] = 'C';
			vo['code_gb'] = '인사평가배점';
			vo['code_id'] = '';
			vo['code_nm'] = '';
			vo['memo'] = '';
			vo['code_value'] = '';
			vo['code_min'] = 0;
			vo['code_max'] = 0;
			vo['use_yn'] = 'Y';
			
		  	var rownode = popupManager.mainGrid.row.add( vo ).draw(false).node();
		  	
		  //	$(rownode).find('td').css('background-color', '#446d02');
		  	$(rownode).find('.comboBoxType').val('Y');
		  				
			//popupManager.mainGrid.row.add(vo).draw();
		}		
		var height = $('.empCard0').height();
		
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    
	       	dom: 'lBfrti',		
		    "scrollY": 700,
		    //dom: 'lBfrti',
	        //scrollCollapse: true,
	        //scrollX: true,

/*		    select: {
	            style: 'single'
		    },
*/	//	    order : [[3,'asc']],
		//    ordering: true,
		    //autoWidth: true,
		    "searching": false,
		    "columnDefs": [
		        {"className": "dt-center", "targets": "_all"}	        
		        ,{render : render_QueryResult2, "targets": "_all"}	        
	    	],
		    columns : [
		    	{data: "bit" 				,visible : false},
		    	{data: "code_gb" 			,visible : false},
		    	{data: "code_id" 			},
		    	{data: "code_nm" 			},
		    	{data: "memo" 				},
		    	{data: "code_min" 			},
		    	{data: "code_value" 		},
		    	{data: "code_max" 			},
    	    	{data: "use_yn"			
    	    		,render:function(oObj) {
    	    			return '<select class="comboBoxType" id="typeGb">' + '<option value="Y">Y</option>' + '<option value="N">N</option>' + '</select> ';
    	        	}
    	    	},	
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
				 	{targets : 2	,maxlength:2}
				,	{targets : 3	,maxlength:20}
				, 	{targets : 4	,maxlength:20}
				,	{targets : 5	,maxlength:3}
				,	{targets : 6	,maxlength:3}
				,	{targets : 7	,maxlength:3}
				
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					popupManager.mainGrid.cell(index.row, 0).data('Y');
					//fn_sum_footer();
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

/*
 * 금액 합계 footer 사용안함
 */
function fn_sum_footer (result) {
	
	document.getElementById("popupGrid").deleteTFoot();

	// Find a <table> element with id="myTable":
	var table = document.getElementById("popupGrid");
	
	// Create an empty <tfoot> element and add it to the table:
	var footer = table.createTFoot();
	
	// Create an empty <tr> element and add it to the first position of <tfoot>:
	var row = footer.insertRow(0);     
	
	// Insert a new cell (<td>) at the first position of the "new" <tr> element:
	
    let intVal = function (i) {
        return typeof i === 'string'
            ? i.replace(/[\$,]/g, '') * 1
            : typeof i === 'number'
            ? i
            : 0;
    };

	var api = $('#popupGrid').dataTable().api();
	var colCount = popupManager.mainGrid.columns().count();

	console.log(colCount);
	for (var i=2; i < colCount; i++) {
		var cell = row.insertCell(-1);
		if ( i== 7) {
	        var total = api.column(i).data().reduce((a, b) => intVal(a) + intVal(b), 0);
			cell.innerHTML = '<b style="font-size:16px;background:lavender; text-align: center">' + total + '%</b>'
		} else {
			cell.innerHTML = '-';
		}
	}
	

		
	// Add some bold text in the new cell:
	//cell.innerHTML = "<b>This is a table footer</b>";
}	