/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var lastBaseYm ;
function render_viewAll(data,type,row,meta){
	//var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
			$(api.cell(meta.row, meta.col).node()).css('background-color', 'yellow');
	}
	if (meta.col > 0) {
		if (data == 0)
			data = '-'
	}
	return data;
}

$( function() {

    var calKo = new tui.DatePicker('#datepicker-year', {
        date: new Date(),
        language: 'ko',
        type: 'year',
        input: {
            element: '#baseYear',
            format: 'yyyy'
        }
    });

  	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	

		ChatManager.setCommonVo = function setCommonVo(filterType,filterText) {
			commonVo.baseYear = $('#baseYear').val();
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 *  월별,노선별 등록현황 조회
		 */
	    ChatManager.btnViewAll = function (filterType,targetGrid,bAsync) {
			var commonVoString = ChatManager.setCommonVo(filterType,'');
			//console.log(commonVoString);
			var columns = [];
			var newData = [];
			$.ajax({
			       url : "/DynamicSqlFilterMybatis",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: true, // 추가
			        async: bAsync,
			       	dataType : 'json',
			       	timeout : 10000,
			       	success : function(ret) {	
						console.log(ret);
						if (ret.data == null)	return;
						
						columns[0] = {
			    	            'title': '구분',
			    	            'data': 'col_nm',
			    	            'className': 'dt-body-center'
			    	    }
						var monthArray = ret.data[0].COL_LIST.split(',');
						for (var j = 0; j < monthArray.length; j++) {
			    	        columns[j+1] = {
			    	            'title': monthArray[j],
			    	            'data':  'd'+(j+1),
			    	            'className': 'dt-body-center',
			    	            'render' : render_viewAll
			    	        }
						}
						
						for (var k = 0; k < ret.data.length; k++) {
							var initData = {};
							initData['col_nm'] = ret.data[k].COL_NM;
							//전체 일자 초기화
							for (var j = 0; j < monthArray.length; j++) {
								initData['d' + (j+1)] = ' ';
							}
							var bArray = ret.data[k].VALUE_LIST.split(',');
							
							for (var m = 0; m < bArray.length; m++) {
									initData['d' + (m+1)] = bArray[m];
				    	    };
				    	    newData.push(initData);
			    	    };						
			    	    //console.log(columns);
			    	    //console.log(newData);
			    	    var height= $('.empCard0').height() ;
		    	        fn_setGridDataAll(targetGrid,columns,newData,height);
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText);
			       }
				});	
		}
	              
	    return ChatManager;
	}());
	
	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
		ChatManager.btnInit();
   	});
	$(document).on('click', '#btnViewAll', function () {
		ChatManager.btnViewAll('select_uploadStatus_Punctuality_year','#punctualityYearGrid',false);
		ChatManager.btnViewAll('select_uploadStatus_iscDrivingRecord_year','#iscDrivingRecordYearGrid',false);
		ChatManager.btnViewAll('select_uploadStatus_dangerDriving_year','#dangerDrivingYearGrid',true);
	});
	
/*    $('#punctualityYearGrid').on('mouseover', 'td', function() {
        
		var table = $('#punctualityYearGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var baseYm = table.column( col ).header().textContent;
		
		if (baseYm == lastBaseYm)	return;
		lastBaseYm = baseYm;
		commonVo.baseYm = $('#baseYear').val() + '-' + baseYm;
		$('#edt_punctualityBaseYm').text(commonVo.baseYm);
		ChatManager.btnViewAll('select_uploadStatus_Punctuality_month','#punctualityMonthGrid');
        
    }).on('mouseout', 'td', function() {
        // hide popup for cell
    });*/
	
	// 배차정시성 년간 grid 클릭시 
	$('#punctualityYearGrid').on('click','td', function() {
   		$('#punctualityMonthGrid').DataTable().clear()
   		$('#punctualityMonthGrid').empty();

		
		var table = $('#punctualityYearGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var baseYm = table.column( col ).header().textContent;
		lastBaseYm = baseYm;
		
		commonVo.baseYm = $('#baseYear').val() + '-' + baseYm;
		$('#edt_punctualityBaseYm').text(commonVo.baseYm + '월 ');
		ChatManager.btnViewAll('select_uploadStatus_Punctuality_month','#punctualityMonthGrid',true);
	});


	// 배차정시성 년간 grid 클릭시 
	$('#iscDrivingRecordYearGrid').on('click','td', function() {
   		$('#iscDrivingRecordMonthGrid').DataTable().clear()
   		$('#iscDrivingRecordMonthGrid').empty();

		
		var table = $('#iscDrivingRecordYearGrid').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var baseYm = table.column( col ).header().textContent;
		lastBaseYm = baseYm;
		
		commonVo.baseYm = $('#baseYear').val() + '-' + baseYm;
		$('#edt_iscDrivingRecordBaseYm').text(commonVo.baseYm + '월 ');
		ChatManager.btnViewAll('select_uploadStatus_iscDrivingRecord_month','#iscDrivingRecordMonthGrid',true);
	});

	calKo.on('change', () => {
		ChatManager.btnViewAll('select_uploadStatus_Punctuality_year','#punctualityYearGrid',false);
		ChatManager.btnViewAll('select_uploadStatus_iscDrivingRecord_year','#iscDrivingRecordYearGrid',false);
		ChatManager.btnViewAll('select_uploadStatus_dangerDriving_year','#dangerDrivingYearGrid',true);
	});
	
	ChatManager.btnViewAll('select_uploadStatus_Punctuality_year','#punctualityYearGrid',false);
	ChatManager.btnViewAll('select_uploadStatus_iscDrivingRecord_year','#iscDrivingRecordYearGrid',false);
	ChatManager.btnViewAll('select_uploadStatus_dangerDriving_year','#dangerDrivingYearGrid',true);
	
});		

function fn_setGridDataAll(targetGrid,gridColumns, gridData,height) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	    scrollCollapse: true,
	    "scrollY": height,
	    scrollX : true,
	    //ordering : true,
	    "columnDefs": [
	        {"className": "dt-center", "targets": "_all"}
	       ,{
	        	'targets': "_all",
	        	'render' : render_viewAll
	        }
   		],
		/*select: {
				style: 'multi',
				selector: 'td:first-child'
			},*/   		
		columns: gridColumns,
        //"searching": true,
	    data: gridData,
/*	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
*/	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    },
	       "initComplete" : (targetGrid == '#dangerDrivingYearGrid') ? fn_sum_footer : null
	});
	//resultTable.row(0).remove().draw(false);
	resultTable.columns.adjust().draw();  
}  

/*
 * 금액 합계 footer 
 */
function fn_sum_footer (settings, json) {
	
	var api = this.api();
	var footer = $(this).append('<tfoot id="pjyFoot"><tr></tr></tfoot>');
	var exp2 = /(d)/;
	//var exp1 = /(company_no|base_year|company_nm|last_chg_user|last_chg_date)/;

    let intVal = function (i) {
        return typeof i === 'string'
            ? i.replace(/[\$,]/g, '') * 1
            : typeof i === 'number'
            ? i
            : 0;
    };

	//var i=0;
	var numFormat = $.fn.dataTable.render.number(',').display;
	 
	//console.log(settings.aoColumns);
	for (var i=0;i < settings.aoColumns.length; i++) {
		var data=settings.aoColumns[i];
		if (data.visible == false)	continue;
		//console.log(data.data);
		var key = data.data;
		//if (exp1.test(key)) {
		//	continue;
		//}
		if (exp2.test(key)) {
	        total = api.column(i).data().reduce((a, b) => intVal(a) + intVal(b), 0);
	        
			  //console.log(key + ' = ' + value);
	        //console.log(total);
			$(footer).append('<th style="background:lavender; text-align: right">' + numFormat(total) + '</th>');
		} else {
			$(footer).append('<th style="background:lavender; text-align: right">-</th>');
		}				
	} 
}		