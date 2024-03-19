/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '사번';
 var endString = '합계';
 
 let columnMap = new Map([
	 ['no'           ,'no']
	,['company_no'   ,'회사코드']
	,['emp_no'           ,'사번'          ] 
	,['emp_nm'           ,'사원명'        ] 
	,['birth_ymd'        ,'생년월일'      ] 
	,['enter_gb'         ,'입사구분'      ] 
	,['hobong'           ,'호봉'   ] 
	,['active_status'    ,'재직상태'      ] 
	,['job_type'         ,'직종'          ] 
	,['route_nm'         ,'노선'          ] 
	,['off_group'        ,'휴무조'        ] 
	,['work_group'       ,'노동조합'      ] 
	,['enter_date'       ,'입사일'        ] 
	,['exit_date'        ,'퇴사일'        ] 
	,['job_year'         ,'근속일'        ] 
	,['sp_gb'            ,'SP'            ] 
	,['car_regno'        ,'담당직무'      ] 
	,['dirver_regno'     ,'면허번호'      ] 
	,['call_sign'        ,'운전기사ID'    ] 
	,['memo'             ,'입사메모'      ] 
	,['exit_memo'        ,'퇴직사유'      ] 
	,['view_seq'         ,'표시순서'      ] 
	,['phone_no'         ,'핸드폰'        ] 
	,['email'            ,'E-mail'        ] 
	,['address'          ,'주소'          ] 
	,['last_chg_user'        ,'최종사용자']	 
	,['last_chg_date'        ,'최종수정일']	 
]);
 
function render_QueryResult(data,type,row,meta){
	var iData = data.toString();
    if (data == null || data == undefined )
    	return;

	var api = new $.fn.dataTable.Api(meta.settings);
	if (meta.col == 0) {
		$(api.cell(meta.row, meta.col).node()).css('background-color', 'silver');
	}
	return data;
} 
 
$( function() {
  	var fileTarget = $('.filebox .upload-hidden');

  	fileTarget.on('change', function(){  // 값이 변경되면
	    if(window.FileReader){  // modern browser
	      var filename = $(this)[0].files[0].name;
	    } 
	    else {  // old IE
	      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	    }
	    
	    // 추출한 파일명 삽입
	    $(this).siblings('.upload-name').val(filename);
	    gfn_ExportToTable(columnMap,'#exceltable','#excelfile',startString,endString);
	});
  	
	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
	    
	    ChatManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#exceltable').DataTable();
			var itemList  = table.rows().data().toArray();
			return JSON.stringify (itemList);
		}	    
		ChatManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			return JSON.stringify (commonVo);
		}
		/*
		 * 사원정보 저장
		 */
	    ChatManager.btnSave = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DRIVERINFO','','');
			var jsonString = ChatManager.setSaveParamVo();

			$.ajax({
			       url : "/BUS_insertInfo",
			       "data" :  {jsonDataStr : jsonString,commonVoStr : commonVoString}, 	       
			        global: false, // 추가
			       timeout : 10000,
			       success : function(ret) {	
			    	   swal(ret);
			    	   ChatManager.btnView();
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
		/*
		 * 사원정보 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_DRIVERINFO','TBL_DRIVERINFO','');
			//console.log(commonVoString);
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					  // console.log(ret);
						for (var i = 0; i < ret.header.length; i++) {
							var colNm = columnMap.get(ret.header[i].COLUMN_NAME.toLowerCase());
			    	        columns[i] = {
			    	            'title': colNm,
			    	            'data': ret.header[i].COLUMN_NAME.toLowerCase(),
			    	            'className': ret.header[i].TYPE_NAME, // DynamicHeaderMapper에서 
			    	            'render' : render_QueryResult
			    	        }
			    	    };
			    	    var height= $('.empInfo0_2_2').height();
		    	        gfn_setGridData('#exceltable',columns,ret.data,height,true);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,'error');
			       }
				});	
		}
        
	    return ChatManager;
	}());
	/*
	 * 조회
	 */
	$(document).on('click', '#btnInit', function () {
		$('.filebox .upload-hidden').val('');
		$(this).siblings('.upload-name').val('');
   		$('#exceltable').DataTable().clear().destroy();
   		$('#exceltable').empty();    
   	});
	$(document).on('click', '#btnView', function () {
		ChatManager.btnView();
	});

	$(document).on('click', '#btnSave', function () {
		ChatManager.btnSave();
	});	

	// 인사카드
	$('#exceltable').on('click','td', function() {
		var table = $('#exceltable').DataTable();
		var row = table.cell(this).index().row;
		var col = table.cell(this).index().column;

		var empNm = table.cell( row,3 ).data();
		console.log(empNm);
		fnMdiOpen('인사카드:['+empNm + ']','employeeCard','/monitor/popupEmployeeCard.html?emp_nm=' + empNm, 900,400); // 이게 더 크게	
		
	});

	ChatManager.btnView();
});
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
            my: 'left+'+700+', top+'+200,
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
 