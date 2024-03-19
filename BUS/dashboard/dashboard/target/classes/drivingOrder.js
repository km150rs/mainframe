/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var regex2 = /[*!\@]/;
 var commonVo =  new Object();
 var routeGroup;
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
	if (row.SEQ == 1) {
		$(api.cell(meta.row, meta.col).node()).css('border-top', '2px solid black');
	}
	
	if (meta.col == 0 || meta.col == 1 || meta.col == 2 || meta.col == 5) {
		$(api.cell(meta.row, meta.col).node()).css('border-right', '2px solid black');
	}	

	return data;
}

function render_file(data,type,row,meta){
    if (data == null || data == undefined )
    	return;
	var api = new $.fn.dataTable.Api(meta.settings);

	data = '<i class="fa fa-file-excel-o"/><a href="/attach/' + commonVo.baseYmd + '/' + row.name + '">down</a>'

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
	    ChatManager.viewTable = null;
	    ChatManager.fileTable = null;
	    ChatManager.$group = $('#group');


		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryGroup = function () {
			var jsonString = ChatManager.setParamVo(false,'',true);
			$.ajax({
			       url : "/BUS_getRouteNmInfo",
			      "data" : {strData : jsonString},
			       "dataSrc" : "",
			        global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
			    	   //console.log(ret.data);
			    	   var size = ret.data.length;
			    	   var option = $("<option></option>");
			    	   ChatManager.$group.empty();
			    	   ChatManager.$group.append(option);
			    	   
			    	    for (var i = 0; i < size; i++) {
			    	    	var option = $("<option>"+ret.data[i].route_nm+"</option>");
			    	    	ChatManager.$group.append(option);
			    	    };
			    	  // console.log($(ChatManager.$group).text());
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		
	    ChatManager.setParamVo = function setParamVo(bValidCheck,filterType,bIncludeHeader) {
			commonVo.filterType = filterType;

			var baseYmd = $('#baseYmd').val();
			var clickDay = parseInt(baseYmd.substr(8,2));
			var checkDay = 'd' + (clickDay);
			
			commonVo.checkDay = checkDay;
			commonVo.baseYm = baseYmd.substr(0,7);
			return JSON.stringify (commonVo);
		}


	    /*
	    *  승무지시서 템플릿등록
	    */	    
	    ChatManager.btnExcelTemplete = function () {
			fnMdiOpen('승무지시서 템플릿등록','templete','/monitor/popupOrderTempleteInfo.html' , 875,400); // 이게 더 크게	
	    }

		var height= $('.empCard0').height();
	    ChatManager.viewTable = $("#viewTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     scrollCollapse: true,
	        scrollX: true,
   		   rowsGroup: [0],
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : "_all"}
		        ,{ targets: "_all" , render: render_view}
		        ],
		    columns : [
    	    	 {data: "ROUTE_NM"		,width:"10%"}
    	    	,{data: "SEQ"			,width:"2%"}
    	    	,{data: "CAR_REGNO"		,width:"15%"}
    	    	,{data: "EMPNM_AM"		,width:"3%"}
    	    	,{data: "SPGB_AM"		,width:"1%"}
    	    	,{data: "PHONE_AM"		,width:"5%"}
    	    	,{data: "EMPNM_PM"		,width:"3%"}
    	    	,{data: "SPGB_PM"		,width:"1%"}
    	    	,{data: "PHONE_AM"		,width:"5%"}
	 	    ]
		});	

		
	    ChatManager.fileTable = $("#fileTable").DataTable({
		    "language": {
		        "emptyTable": "No data",
                "processing" : "loading..."
           	},    		
		    "scrollY": height,
		     //scrollCollapse: true,
	        scrollX: true,
	                "colReorder": true,
		    //ordering: false,
		    "columnDefs": [
		    	 {"className": "dt-center", "targets"  : [1,2,3]}
		    	,{"className": "dt-left", "targets"  : [0]}
		        ],
		    columns : [
    	    	 {data: "name"		,width:"50%"}
    	    	,{data: "size"		,width:"10%"}
    	    	,{data: "date"		,width:"30%"}
                ,{
                    data: null,
                    className: "dt-center editor-edit",
                    defaultContent: '<i class="fa fa-file-excel-o"/>',
                    orderable: false,
                    width:'10%',
                    render: render_file 
                }
	 	    ]
		});	
	      
		ChatManager.btnView = function () {
			var commonVoStr = ChatManager.setParamVo(true,'select_getDrivingOrder',false);
			if (commonVoStr == null) return;
			console.log(commonVoStr);
			$.ajax({
		       url : "/DynamicSqlFilterMybatis",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   //console.log(result);
			    	   ChatManager.viewTable.clear().draw();
	
				    	    for (var i = 0; i < result.data.length; i++) {
								result.data[i].SPGB_AM = '';
								result.data[i].SPGB_PM = '';
								
								if (result.data[i].EMPNM == '-') {
					    	   		result.data[i].EMPNM_AM= '-';
					    	   		result.data[i].EMPNM_PM= '-';
								} else {
									if (result.data[i].EMPNM.includes(',')) {
							    	   result.data[i].EMPNM_AM= result.data[i].EMPNM.split(',')[0];
						    	   		result.data[i].EMPNM_PM= result.data[i].EMPNM.split(',')[1];
						    	   	}
								}
								if (result.data[i].SPGB == '-') {
					    	   		result.data[i].SPGB_AM= '-';
					    	   		result.data[i].SPGB_PM= '-';
								} else {
									if (result.data[i].SPGB.includes(',')) {
						    	   		result.data[i].SPGB_AM= result.data[i].SPGB.split(',')[0];
						    	   		result.data[i].SPGB_PM= result.data[i].SPGB.split(',')[1];
						    	   	}
								}
								if (result.data[i].PHONE == '-') {
					    	   		result.data[i].PHONE_AM= '-';
					    	   		result.data[i].PHONE_PM= '-';
								} else {
									if (result.data[i].PHONE.includes(',')) {
							    	   result.data[i].PHONE_AM= result.data[i].PHONE.split(',')[0];
							    	   result.data[i].PHONE_PM= result.data[i].PHONE.split(',')[1];
							    	 }
								}
				    	    };
	
					   ChatManager.viewTable.rows.add( result.data).draw(false);
					   ChatManager.viewTable.rowsgroup.update();
					   
					   ChatManager.btnViewExcelFile();
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}	    
		

		/*승무지시서 생성 */
		ChatManager.btnExcelMake = function () {
			commonVo.baseYmd = $('#baseYmd').val();
			commonVo.routeNm = '';
			var commonVoStr = ChatManager.setParamVo(true,'',false);
			if (commonVoStr == null) return;
			//console.log(commonVoStr);
			$.ajax({
		       url : "/excel_makeDrivingOrder",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			      // dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   swal('승무지시서 생성이 완료되었습니다.');
					   ChatManager.btnViewExcelFile();
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}

		/*승무지시서 파일 조회 */
		ChatManager.btnViewExcelFile = function () {
			commonVo.baseYmd = $('#baseYmd').val();
			commonVo.routeNm = '';
			var commonVoStr = ChatManager.setParamVo(true,'',false);
			if (commonVoStr == null) return;
			//console.log(commonVoStr);
			$.ajax({
		       url : "/viewFileList",
	    	   "data" :   {commonVoStr : commonVoStr},
			       "dataSrc" : "",
			        global: true, // 추가
			        async : false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(result) {	
					   //console.log(result);
				 	   ChatManager.fileTable.clear().draw();
					   ChatManager.fileTable.rows.add( result).draw(false);
			       },
			       error : function(request, status, error) {
			        	alert(request.responseText);
			       }
			});	
		}
				
	    return ChatManager;
	}());


	$(document).on('click', '#btnExcelTemplete', function () {
		ChatManager.btnExcelTemplete();
	});
		
	$(document).on('click', '#btnSelect', function () {
		ChatManager.btnView();
	});

	$(document).on('click', '#btnExcelMake', function () {
		if (ChatManager.viewTable.row().count() == 0) {
			swal('조회된 데이타가 없습니다. 조회 후 생성가능합니다.')
			return;
		}
		ChatManager.btnExcelMake();
	});

	calMonthKo.on('change', () => {
		ChatManager.btnView();
	});
	
	$('#fileGrid').on('click', 'td.editor-edit', function (e) {
		commonVo.curr_row = ChatManager.viewGrid.cell(this).index().row;
		ChatManager.btnExcelDownload();
	} );


	 ChatManager.btnQueryGroup();
	 
});



function calcDataTableHeight2 () {
	  return ($(window).height() * 55 / 100) ;
};

function fnMdiOpen (title,uniqueKey,url, w_width,w_height) {
	var iframName = "iframe_" + uniqueKey;

	var child = document.getElementById("iframe_" + uniqueKey);
	if (child != null) return;
	
	
	var text = '<iframe class="resized" id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';
	//var text = '<iframe id="' + iframName + '" width="' + String(w_width) + 'px" height="' + String(w_height) + 'px" scrolling="no" src="'+ url +'" frameborder="0" allow="autoplay; encrypted-media" style="overflow:hidden" allowfullscreen> </iframe>';

	//var $objWindow = $('<div class="window">'+text+'</div>');
	var $objWindow = $('<div class="window resizer ugly">'+text+'</div>');
    var intRandom = Math.floor((Math.random() * 12) + 1);
    
    $($objWindow).appendTo('body');
    //var height = $(iframName).contents().height();
    //var width = $(iframName).contents().width();
    $objWindow.itemCd=uniqueKey;
    $objWindow.window({
    	embeddedContent: true, 
        title: title,
        width: w_width +5,
        height: w_height + 27,
        position: {
            my: 'left+'+700+', top+'+400,
            at: 'left top',
            of: window
        },
        modal:true,
        maximizable: true,
       // minimizable: true,
        disablescroll : {
            handleScrollbar: false
        },
        close: function(event, ui) {
        	$(this).remove();
        },
        open: function (event, ui) {
            $(this).css('overflow', 'hidden'); //this line does the actual hiding
          },          
        //icon: '../src/jquery-lwd/themes/windows2000/images/default.png'
        icon: '/resources/static/js/jquery-lwd/themes/material/images/icons/'+intRandom+'.png'
    });
}