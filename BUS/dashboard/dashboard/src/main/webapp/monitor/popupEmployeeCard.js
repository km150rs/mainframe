
var param = {};
var popupManager = null;
 var commonVo =  new Object();


function render_check(data,type,row,meta){
    if (data == null)
    	return data;

	var api = new $.fn.dataTable.Api(meta.settings);
	$(api.cell(meta.row, meta.col).node()).css('background-color', '#d5ffff');
	
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
	    popupManager.mainGrid = null;
		param.empNm = decodeURIComponent(getParam("emp_nm"));
//		param.baseYm = getParam("baseYm");
//		param.checkDay = getParam("checkDay");
		//console.log(param.route_nm);
		//var aa =  decodeURI(decodeURIComponent(request.getParameter('routeNm')));
//		param.route_nm =  decodeURIComponent(request.getParameter('routeNm'));
//		console.log(param.route_nm);
//		console.log(param.baseYm);
//		console.log(param.checkDay);

 
		$(".inp-img").on('change', function(){
		    popupManager.readInputFile(this);
		});
		
		$(".btn-delete").click(function(event) {
		    popupManager.resetInputFile();
		});
	    popupManager.setSaveParamVo = function setSaveParamVo() {
			var table = $('#popupGrid').DataTable();
			var itemList = [];
			
	    	table.rows( function ( idx, aData, node2 ) {
			    // combobox 값을 cell 값으로 가져옴
    			var typeGb = $(node2).find('.comboBoxType').val()
				aData.wiban_gijun = typeGb;
				itemList [idx] = aData;
			});

			return JSON.stringify (itemList);
		}	    
		popupManager.setCommonVo = function setCommonVo(targetTable,filterType,filterText,bValidCheck) {
			commonVo.targetTable = targetTable;
			commonVo.filterType = filterType;
			commonVo.filterText = filterText;
			commonVo.empNm = param.empNm;
			return JSON.stringify (commonVo);
		}		
		/*
		 *  저장
		 */
	    popupManager.btnSave = function () {
			var commonVoString = popupManager.setCommonVo('TBM_ROUTE_COMMON_INFO','TBM_ROUTE_COMMON_INFO','',true);
			var jsonString = popupManager.setSaveParamVo();
			//console.log(commonVoString);
			console.log(jsonString);
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
			dynamicAjaxCall(null,'getEmployeeCard','','#popupGrid',200,function (result) {});	
		}
		popupManager.uploadImage = function() {
			var input = $('.inp-img');
			//console.log(input);
			let formData = new FormData($('#uploadForm')[0]);
			formData.append('images',input[0]);
			formData.append('empNm',param.empNm);
		
			$.ajax({
				type:'post'
				,enctype:'multipart/form-data'
				,url :'/upload_image'
				,data:formData
				,processData:false
				,contentType : false
				,success: function(data) {
					alert(
				        '등록완료'
				      )
	
				}
				, error : function(e) {
					alert('error');
				}
			});
		    popupManager.resetInputFile();

		}
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "language": {
		        "emptyTable": "no data"
	       	},    		
		    "scrollY": 570,
	        scrollCollapse: true,
	        scrollX: true,

/*		    select: {
	            style: 'single'
		    },
*/	//	    order : [[3,'asc']],
		//    ordering: true,
		    //autoWidth: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": [0,2,4,6,8,10]}	        
		        ,{"className": "dt-right", "targets": [1,3,5,7,9],render : render_check}	        
	    	],
      		 columns : [
		    	{data: "A0" 			,width:"10%", 
		    		render: function (data, type, row, meta) {
						if (meta.row == 0)
							return '<img src="/images/' + data + '" height="100" width="100">';
						else return data;
//                		return '<img src="/resources/static/images/Screenshot.png" height="50" width="50"/>';
              		}
                },
		    	{data: "A1" 			,width:"8%" },
		    	{data: "A1_VALUE"		,width:"10%"},
		    	{data: "A2" 			,width:"8%" },
		    	{data: "A2_VALUE"		,width:"10%"},
		    	{data: "A3" 			,width:"8%" },
		    	{data: "A3_VALUE"		,width:"10%"},
		    	{data: "A4" 			,width:"8%" },
		    	{data: "A4_VALUE"		,width:"10%"},
		    	{data: "A5" 			,width:"8%" },
		    	{data: "A5_VALUE"		,width:"10%"},
		     ]
		});		
/*		
		datatableEdit({
			dataTable : popupManager.mainGrid,
			//eventTarget : 'tbody td',
			columnDefs : [
				 	{targets : 3	,maxlength:10}
				, 	{targets : 4	,maxlength:10}
				//,	{targets : 5	,maxlength:10}
				,	{targets : 6	,maxlength:10}
				,	{targets : 7	,maxlength:10}
			]
			,onEdited : function(prev, changed, index, cell) {
				if (prev != changed) {
					$(popupManager.mainGrid.cell({row: index.row, column: index.column}).node()).css('color', 'red');
					popupManager.mainGrid.cell(index.row, 0).data('Y');
				}
			}
		});		*/

		// 등록 이미지 등록 미리보기
		popupManager.readInputFile = function (input) {
		    if(input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function (e) {
		            //$('#preview').html("<img src="+ e.target.result +">");
		            
					Swal.fire({
					  title: '사진등록',
					  text: '위 사진을 등록하시겠습니까?',
					  imageUrl: e.target.result,
					  imageWidth: 100,
					  imageHeight: 100,
					  imageAlt: 'Custom image',
						showCancelButton: true,
		  				confirmButtonText: '등록',		
		  					  showLoaderOnConfirm: true, // 데이터 결과를 받을때까지, 버튼에다가 로딩바를 표현
						  preConfirm: (login) => { // 확인 버튼 누르면 실행되는 콜백함수
								popupManager.uploadImage();
						  },
						  
						  // 실행되는 동안 배경 누를때 모달창 안닫히도록 설정
						  // isLoading() 즉, 로딩이 진행되는 동안 false를 리턴하게 해서 ousideClick을 안되게 하고, 로딩 상태가 아니면 ousideClick을 허용한다.
						  allowOutsideClick: () => !Swal.isLoading() 
					})
           		    //popupManager.resetInputFile();
		        }
		        reader.readAsDataURL(input.files[0]);
		    }
		}
		
		// 등록 이미지 삭제 ( input file reset )
		popupManager.resetInputFile =  function () {
			var $input = $(".inp-img");
		    var agent = navigator.userAgent.toLowerCase();
		    if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
		        // ie 일때
		        $input.replaceWith($input.clone(true));
		        //$preview.empty();
		    } else {
		        //other
		        $input.val("");
		        //$preview.empty();
		    }       
		}

	    return popupManager;
	}());

	$(document).on('click', '#btnSave', function () {
		popupManager.btnSave();
	});
	// Handle change event for status selection control
	//$('#popupGrid').on('change', '.comboBoxType', function(){
	    
	 //   var row = $('#popupGrid').DataTable().row($(this).closest('tr')).index();
	 //   console.log(row);
	    
	    //$(rownode).find('.comboBoxType').val(item.wiban_gijun)
	 //   popupManager.mainGrid.cell(row, 5).data($(this).val()).draw(false);	
	//});
	
	

	// 업로드 수행
    $('#uploadBtn').on('click', function() {
		var input = $('.inp-img');
		console.log(input);
		let formData = new FormData($('#uploadForm')[0]);
		formData.append('images',input[0]);
		formData.append('empNm',param.empNm);

		$.ajax({
			type:'post'
			,enctype:'multipart/form-data'
			,url :'/upload_image'
			,data:formData
			,processData:false
			,contentType : false
			,success: function(data) {
				alert('ok');

			}
			, error : function(e) {
				alert('error');
			}
		});
	});	
	popupManager.btnView();
});




/*
 * dynamic 공통 호출
 */
function dynamicAjaxCall(tableInfo,filterType,filterText,tableName,height,callback) {

	commonVo.filterType = filterType;
	//console.log(param.route_nm);
	//commonVo.routeNm = '';
	commonVo.empNm = param.empNm;
	commonVo.filterText = '';
	var commonVoStr = JSON.stringify (commonVo);
	
	console.log(commonVoStr);
	popupManager.mainGrid.clear();
	
	$.ajax({
	       url : "/DynamicSqlFilterMybatis",
    	   "data" :   {commonVoStr : commonVoStr},
	       "dataSrc" : "",
	        global: true, // 추가
	       dataType : 'json',
	       timeout : 10000,
	       success : function(ret) {	
/*                $.each(ret.data, function (i, item) {
                	var rownode = popupManager.mainGrid.row.add( item ).draw(false).node();
                	// use_yn을 combobox로 변환	
                	$(rownode).find('.comboBoxType').val(item.wiban_gijun)
                })			   
*/
    	        popupManager.mainGrid.rows.add( ret.data ).draw();
	    	    popupManager.mainGrid.columns.adjust().draw(false);

				$(popupManager.mainGrid.cell(5,2).node()).attr('colspan', 7);
				for (var i=3; i<=8;i++) {
					$(popupManager.mainGrid.cell(5,i).node()).css('display', 'none');
				}
				
				$(popupManager.mainGrid.cell(0,0).node()).attr('rowspan', 6);
				for (var j=1; j<=5;j++) {
					$(popupManager.mainGrid.cell(j,0).node()).css('display', 'none');
				}

	
				var day = popupManager.mainGrid.cell(2,4).data();
				
				popupManager.mainGrid.cell(2,4).data(cal_year(day)).draw();
	       },
	       error : function(request, status, error) {
	        alert(request.responseText);
	       }
	});	
}

function cal_year(day)
{
    var cYear = parseInt(day / 365);
    var cMonth = parseInt((day % 365)/30);

	return  cYear + '년 ' + cMonth + '개월' ;
}
