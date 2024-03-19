
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

function receiveMessageFromParent(e) {
	console.log(e.data);
	/*
	 * 초기 진입시
	 */
	if (e.data == param.row) {
		return;
	}
	param.row = e.data;
	popupManager.btnDrawChart(param.row);
	
}	
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
    window.addEventListener("message", receiveMessageFromParent, false);
    
	popupManager = (function () {
	    function popupManager() {
	    } 	
		
		
		popupManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			//commonVo.targetTable = targetTable;
			//commonVo.filterType = getParam('filterType');
			//commonVo.filterText = filterText;
			return JSON.stringify (parent.commonVoPopup);
		}		
		param.row =  getParam('row');
		
	    popupManager.btnDrawChart= function (row) {
			//var row = param.row;
			console.log(row);
			console.log(parent.newData.data[row]);
			
			const  maxDataArray = parent.newData.data[row].MAXLIST.split('/').map(Number);
			const  pointDataArray = parent.newData.data[row].POINTLIST.split('/').map(Number);
			const  titleDataArray = parent.newData.data[row].CODELIST.split('/');

			var  totalPoint = parent.newData.data[row].TOT_POINT;
				
			var empTitle = 	parent.newData.data[row].EMP_NM + '<p style="color:red;float:right"> (' + totalPoint +  '점)</p>';
			var subTitle = 	'<p style="color:blue;"> (' + parent.$('#from').val() + ' ~ '+ parent.$('#to').val() + ')</p>';
			drawChart(empTitle,subTitle,titleDataArray,maxDataArray,pointDataArray);			
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

	popupManager.btnDrawChart(param.row);
});



function drawChart(empTitle,subTitle,titleDataArray,maxDataArray,pointDataArray) {
	//console.log(charDataArray);
	
	Highcharts.chart('container', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: empTitle,
	        align: 'left'
	    },
	    subtitle: {
	        text: subTitle,
	        align: 'right'
	    },
	    xAxis: {
	        categories: titleDataArray,
	        crosshair: true,
	        accessibility: {
	            description: 'Countries'
	        }
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: '점수'
	        }
	    },
	    tooltip: {
	        valueSuffix: ' (평가점수)'
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [
	        {
	            name: 'MAX배점',
	            data: maxDataArray
	        },
	        {
	            name: '취득점수',
	            data: pointDataArray
	        }
	    ]
	});

/*	
	Highcharts.chart('container', {
		chart: {
	        height: 200
     	},
     	title: {
			text: ''
		},
	    yAxis: {
	        title: {
	            text: '위험운전단계'
	        }
	    },
		exporting: {
	    	enabled: false
	  	},
	    xAxis: {
	        categories: charTitleDataArray
	    },
	
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	
	    plotOptions: {
	        series: {
				marker: {
	                enabled: false,
	                states: {
	                    hover: {
	                        enabled: false
	                    }
	                }
	            },
	            label: {
	                connectorAllowed: false
	            }
	        }
	    },
	
	    series: [{
	        name: '',
	        data: charDataArray,
	        showInLegend: false
	    }]
	
	});	*/
}