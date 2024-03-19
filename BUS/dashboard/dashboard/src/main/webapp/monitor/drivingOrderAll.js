/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var regex2 = /[*!\@]/;
 var commonVo =  new Object();

/*
 * grid에 국기/프로그레스바 추가시 
 * https://datatables.net/examples/basic_init/data_rendering.html 
 */


function render_view(data,type,row,meta){

	//ar iData = data.toString();
	//if (row.item_cd == '') {
	//	return '';
	//}
		
	//console.log(meta.settings.aoColumns[meta.col].className);
    if (data == null || data == undefined )
    	return;
	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 2 ) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}

	if (meta.col < 4  ) {
		$(api.cell(meta.row, meta.col).node()).css('border-right', '2px solid black');
	}	

	return data;
}

$( function() {
    var calMonthKo = new tui.DatePicker('#datepicker-day', {
        date: new Date(),
        language: 'ko',
        input: {
            element: '#baseYmd',
            format: 'yyyy-MM-dd'
        }
    });
    
/*   	$('#widget').css('height', calcDataTableHeight2()+200).split({
       orientation: 'vertical',
       limit: 100,
       position: '60%',
       percent: true,
       onDrag: function(event) {
		   ChatManager.viewTable.columns.adjust();
		   ChatManager.fileTable.columns.adjust();
      		
    	}
   	});*/
    
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    ChatManager.viewTable1 = null;
	    ChatManager.viewTable2 = null;
	    ChatManager.viewTable3 = null;
	    ChatManager.viewTable4 = null;
	    ChatManager.viewTable5 = null;
	    ChatManager.viewTable6 = null;
	    ChatManager.offTable = null;
	    ChatManager.otherSPTable = null;

		
	    ChatManager.setParamVo = function setParamVo(bValidCheck,filterType,bIncludeHeader) {
			commonVo.filterType = filterType;

			var baseYmd = $('#baseYmd').val();
			var clickDay = parseInt(baseYmd.substr(8,2));
			var checkDay = 'd' + (clickDay);
			
			commonVo.checkDay = checkDay;
			commonVo.baseYmd = baseYmd;
			commonVo.baseYm = baseYmd.substr(0,7);
			return JSON.stringify (commonVo);
		}

		var height= $('.empCard0_1').height();
	    var option ={
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: false,
	         "bAutoWidth": false,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_view}
		        ],
		    columns : [
    	    	 {data: "SEQ1"			}
    	    	,{data: "AM_NM"			}
    	    	,{data: "CAR_REGNO"		}
    	    	,{data: "PM_NM"			}
    	    	,{data: "SEQ2"			}
/*    	    	 {data: "SEQ1"			,width:"20%"}
    	    	,{data: "AM_NM"			,width:"20%"}
    	    	,{data: "CAR_REGNO"		,width:"20%"}
    	    	,{data: "PM_NM"			,width:"20%"}
    	    	,{data: "SEQ2"			,width:"20%"}*/
	 	    ]
		}

	    ChatManager.viewTable1 = $("#viewTable1").DataTable(option);	
	    ChatManager.viewTable2 = $("#viewTable2").DataTable(option);	
	    ChatManager.viewTable3 = $("#viewTable3").DataTable(option);	
	    ChatManager.viewTable4 = $("#viewTable4").DataTable(option);	
	    ChatManager.viewTable5 = $("#viewTable5").DataTable(option);	
	    ChatManager.viewTable6 = $("#viewTable6").DataTable(option);	

	    ChatManager.offTable = $("#offTable").DataTable({
		    "language": {
		        "emptyTable": "-",
                "processing" : "loading..."
           	},    		
		    "scrollY": 300,
		     scrollCollapse: true,
	        scrollX: true,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : [0]}
		    	 ,{"className": "dt-left", "targets"  : [1]}
		        ],
		    columns : [
    	    	 {data: "ROUTE_NM"		,width:"1%"}
    	    	,{data: "NAME"			,width:"40%"}
	 	    ]
		});	
	    ChatManager.otherSPTable = $("#otherSPTable").DataTable({
		    "language": {
		        "emptyTable": "-",
                "processing" : "loading..."
           	},    		
		    "scrollY": 300,
		     scrollCollapse: true,
	        scrollX: true,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : [0]}
		    	 ,{"className": "dt-left", "targets"  : [1]}
		        ],
		    columns : [
    	    	 {data: "ROUTE_NM"		,width:"1%"}
    	    	,{data: "NAME"			,width:"40%"}
	 	    ]
		});	
	      
		ChatManager.btnView = function () {
			var commonVoStr = ChatManager.setParamVo(true,'',false);
			if (commonVoStr == null) return;
			console.log(commonVoStr);
			$.ajax({
		       url : "/BUS_viewDailyArrangeOrderAll",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   console.log(result);
			    	   ChatManager.viewTable1.clear().draw();
					   ChatManager.viewTable1.rows.add( result["data_5-1번"]).draw(false);
			    	   ChatManager.viewTable2.clear().draw();
					   ChatManager.viewTable2.rows.add( result["data_5번"]).draw(false);
			    	   ChatManager.viewTable3.clear().draw();
					   ChatManager.viewTable3.rows.add( result["data_20번"]).draw(false);
			    	   ChatManager.viewTable4.clear().draw();
					   ChatManager.viewTable4.rows.add( result["data_21번"]).draw(false);
			    	   ChatManager.viewTable5.clear().draw();
					   ChatManager.viewTable5.rows.add( result["data_27번"]).draw(false);
			    	   ChatManager.viewTable6.clear().draw();
					   ChatManager.viewTable6.rows.add( result["data_38번"]).draw(false);
					   
					   $('#title1').html('5-1번<br>' + result["head_5-1번"]);
					   $('#title2').html('5번<br>' + result["head_5번"]);
					   $('#title3').html('20번<br>' + result["head_20번"]);
					   $('#title4').html('21번<br>' + result["head_21번"]);
					   $('#title5').html('27번<br>' + result["head_27번"]);
					   $('#title6').html('38번<br>' + result["head_38번"]);

			    	   ChatManager.offTable.clear().draw();
					   ChatManager.offTable.rows.add( result["offList"]).draw(false);

			    	   ChatManager.otherSPTable.clear().draw();
					   ChatManager.otherSPTable.rows.add( result["otherSPList"]).draw(false);
					   
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}	    
		
		$('.panelContainer').css('background-color',localStorage.getItem('backgroundColor'));
		$('.panelContainer').css('color',localStorage.getItem('color'));

				
	    return ChatManager;
	}());


	$(document).on('click', '#btnSelect', function () {
		ChatManager.btnView();
	});



	calMonthKo.on('change', () => {
		var baseYmd = $('#baseYmd').val();
		$('#workDate').text('[ ' + wz_get_hangul_date(baseYmd) + ' ]');
		ChatManager.btnView();
	});

   	$('#select_background').change(function() {
      	var current = $('#select_background').val();
       	$('.panelContainer').css('background-color',current);
      	localStorage.setItem('backgroundColor',$('.panelContainer').css('background-color'));

	}); 
   	$('#select_color').change(function() {
      	var current = $('#select_color').val();
      	$('.panelContainer').css('color',current);
      	localStorage.setItem('color',$('.panelContainer').css('color'));
	}); 
	
	$('.slider').on('click', function(){
	    $("header").toggle(1000);
	    $("#select_background").toggle(1000);
	    $("#select_color").toggle(1000);
	    $(".tui-datepicker-input").toggle(1000);
	});
	 
});


