/*
 * 난독화 site
 * https://obfuscator.io/
 */
 var commonVo =  new Object();
 var startString = '차량번호';
 var endString = '합계';
 
 let columnMap = new Map([
	 ['no'              ,'no']
	,['company_no'      ,'회사코드']
	,['car_no'           ,'차량번호']
	,['car_subno'        ,'보조코드']
	,['car_regno'        ,'차량등록번호']	
	,['route_seq'        ,'노선번호']
	,['route_nm'         ,'노선명']
	,['car_kind'         ,'버스종류']
	,['mgt_pos'          ,'관리업소']
	,['car_type'         ,'용도']
	,['reg_date'         ,'적용일']
	,['car_test_date'     ,'정기검사일']
	,['car_check_date'    ,'정기점검일']
	,['car_envtest_date'  ,'환경검사일']
	,['car_status'       ,'사용상태']
	,['bno'             ,'BNO']
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
			var commonVoString = ChatManager.setCommonVo('TBL_CARINFO','TBL_CARINFO','');
			var jsonString = ChatManager.setSaveParamVo();
			//console.log(jsonString);
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
			    	   swal(request.responseText,"error");
			       }
				});	
		}
		/*
		 * 사원정보 조회
		 */
	    ChatManager.btnView = function () {
			var commonVoString = ChatManager.setCommonVo('TBL_CARINFO','TBL_CARINFO','');
			var columns = [];
			$.ajax({
			       url : "/DynamicSqlFilter",
			       "data" :  {commonVoStr : commonVoString}, 	       
			       "dataSrc" : "",
			        global: false, // 추가
			        async:false,
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
					   //console.log(ret);
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
			    	    //console.log(height);
		    	        gfn_setGridData('#exceltable',columns,ret.data,height,true);
					
			       },
			       error : function(request, status, error) {
			    	   swal(request.responseText,"error");
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


	ChatManager.btnView();
});
