'use strict';

var popupManager = null;
var commonVo =  new Object();

function render_result(data,type,row,meta){
    if (data == null)
    	return;
	
    var api = new $.fn.dataTable.Api(meta.settings);
    
    if (row.bit == 'Y') {
    	$(api.cell({row: meta.row, column: meta.col}).node()).css('color', 'red');
    } else {
		$(api.cell({row: meta.row, column: meta.col}).node()).css('color', 'black');
	}
	
	if (meta.col == 6) {
		data = '<i class="fa fa-file-download"/><a href="/attach/templete/' + row.orgnm + '">down</a>'		
	}
    return data;
};
function render_action(data,type,row,meta){
    if (data == null)
    	return;
	
    if (data == 'cti_d') {
    	data = 'DELETE';
    } else if (data=='cti_u'){
    	data = 'UPDATE';
    } else if (data == 'cti_i') {
    	data = 'INSERT';
    }
    	
     return data;
};



$( function() {
    
	popupManager = (function () {
	    function popupManager() {
	    } 	
	    popupManager.mainGrid = null;


		var routeGroup = $('#group', window.parent.document).html();
		//var routeGroup = $((opener.document).find('#group').map(function() {
		//	return $(this).val();
		//}).get());
		//console.log(routeGroup);

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
		popupManager.uploadImage = function() {
			var row =commonVo.curr_row;
			
			var targetFile = popupManager.mainGrid.cell(row,8).data();

			if (targetFile == '') {
				swal('선택된 excel 파일이 없습니다.');
				return;
			}
						
			var rownode = popupManager.mainGrid.rows(row).nodes();
		    // combobox 값을 cell 값으로 가져옴
		
		    var fileId = $(rownode).find('#fileIdCombobox').val()
			
			if (fileId == '') {
				swal('노선을 선택하세요');
				return;
			}
			commonVo.fileId = fileId;
			commonVo.fileGb = 'templete';
			
			var commonVoString = popupManager.setCommonVo('','','','');
			console.log(commonVoString);

			let formData = new FormData($('#uploadForm')[0]);
			formData.append('images',targetFile);
			formData.append('commonVoStr',commonVoString);
		
			$.ajax({
				type:'post'
				,enctype:'multipart/form-data'
				,url :'/upload_file'
				,data:formData
				,processData:false
				,contentType : false
				,success: function(data) {
					popupManager.mainGrid.cell(row,4).data('upload 완료').draw(false);
					popupManager.mainGrid.cell(row,9).data('N').draw(false);
					//popupManager.mainGrid.rows().invalidate().draw( false );
				}
				, error : function(e) {
					alert('error');
				}
			});
		    popupManager.resetInputFile();
		}
		//var height= $('.empGrid').height();
		popupManager.mainGrid = $("#popupGrid").DataTable({
		    "scrollY": 300,
	        scrollCollapse: true,
	        "dom": '<"toolbar">Bfrt',
	        scrollX: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": "_all"}
		        ,{"render": render_result, "targets": "_all"}
	    		],
	    	//'order' : [[2,'asc'],[6,'asc']],
	    	//ordering: true,
		    select : true,
	        select: {
	            style: 'os',
	            items: 'cell'
	        },	       // 'select': {
	       //     'style':    'multi'
	        //}, 		    
	        columns : [
    	        {data: "file_gb"		,width:'4%'    	        },
    	        {data: "file_id" 	,width:'4%'		
    	    		,render:function(oObj) {
    	    			return '<select class="comboBoxType" id="fileIdCombobox">' + routeGroup + '</select> ';
    	        	}    	        
    	        },
    	        {data: "orgnm" 	,width:'22%'	},
    	        {data: "last_chg_user" 		,width:'4%'	},
    	        {data: "last_chg_date"		,width:'14%'	},
/*                {
                    data: null,
                    className: "dt-center editor-edit",
                    defaultContent: '<i class="fa fa-file-excel-o"/>',
                    orderable: false,
                    width:'3%'
                },
*/                {
                    data: null,
                    className: "dt-center editor-upload",
                    defaultContent: '<i class="fa fa-upload"/>',
                    orderable: false,
                    width:'4%'
                },
                {
                    data: null,
                    className: "dt-center editor-download",
                    defaultContent: '<i class="fa fa-download"/>',
                    orderable: false,
                    width:'5%'
                },
                {
                    data: null,
                    className: "dt-center editor-delete",
                    defaultContent: '<i class="fa fa-trash"/>',
                    orderable: false,
                    width:'5%'
                },    	        
    	    	{data: "excelfile"		,visible:false	},
    	    	{data: "bit"		,visible:false	}
		     ],
		     buttons: [
		            {
		                extend:    'pdfHtml5',
		                text:      '<i class="fa fa-file-pdf-o"></i>',
		                titleAttr: 'PDF'
		            }		        ],
	        initComplete: function() {
	        	$('.buttons-pdf').hide();
	        }		        
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
			var row = commonVo.curr_row;
			var data = popupManager.mainGrid.row(row).data();			
			console.log(input.files[0].name);
			popupManager.mainGrid.cell(row,2).data(input.files[0].name);
			popupManager.mainGrid.cell(row,8).data(input.files[0]);
			
/*		    if(input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function (e) {
						popupManager.uploadImage();
		        }
		        reader.readAsDataURL(input.files[0]);
		    }*/
		}	


		
		// 등록 이미지 삭제 ( input file reset )
		popupManager.resetInputFile =  function () {
			var $input = $("#input-file");
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

/*	$("div.toolbar").html('<input class="pjy_btn_query" type="button" id="btnQuery" value="조회">' + 
			'<input class="pjy_btn_query" type="button" id="btnNew" value="행추가">' );
*/	
	$("#input-file").on('change', function(){
	    popupManager.readInputFile(this);
		popupManager.uploadImage();
	});

/*	$('#popupGrid').on('click', 'td.editor-edit', function (e) {
		commonVo.curr_row = popupManager.mainGrid.cell(this).index().row;
	
		var input = document.querySelector('input');
		input.click();
	} );
*/
	// upload
	$('#popupGrid').on('click', 'td.editor-upload', function (e) {
		commonVo.curr_row = popupManager.mainGrid.cell(this).index().row;

			var rownode = popupManager.mainGrid.rows(commonVo.curr_row).nodes();
		    // combobox 값을 cell 값으로 가져옴
		
		    var fileId = $(rownode).find('#fileIdCombobox').val()
			
			if (fileId == '') {
				swal('노선을 선택하세요');
				return;
			}

		
		var input = document.querySelector('input');
		input.click();
	} );

	// Delete a record
	$('#popupGrid').on('click', 'td.editor-delete', function (e) {

		
			commonVo.curr_row = popupManager.mainGrid.cell(this).index().row;
			var row = commonVo.curr_row;
			var rownode = popupManager.mainGrid.rows(row).nodes();
		    // combobox 값을 cell 값으로 가져옴
			commonVo.fileGb = 'templete';
		
		    var fileId = $(rownode).find('#fileIdCombobox').val()
			commonVo.fileId = fileId;
			
			if (fileId == '') {
				swal('지정된 파일명이 비어있습니다.');
				return;
			}

		$.confirm({
			title : '확인',
			content : '서버에있는 해당 파일을 삭세하시겠습니까?',
			boxWidth: '20%',
			useBootstrap: false,
			buttons: {
		        confirm: function () {
						var commonVoString = popupManager.setCommonVo('','','','');
						console.log(commonVoString);
			
						let formData = new FormData($('#uploadForm')[0]);
						formData.append('commonVoStr',commonVoString);
				
						$.ajax({
							type:'post'
							,url :'/delete_file'
							,enctype:'multipart/form-data'
							,processData:false
							,contentType : false
							,data:formData
							,success: function(data) {
								swal('해당파일이 삭제되었습니다.');
								popupManager.mainGrid.rows(row).remove().draw();
							}
							, error : function(e) {
								alert('error');
							}
						});		
		        },
		        cancel: function () {
					return;
		        },
		    }
		});		
		

			
	} );

	/*
	 * 조회
	 */
	$(document).on('click', '#btnQuery', function () {
		btnQuery();	  
	});
	/* 
	 * 행추가
	 */
	$(document).on('click', '#btnNew', function () {
		btnCreateRow();
	
	});
	

	btnQuery();	
});


/*
 * 행 추가
 */
function btnCreateRow() {
    var result =  new Object();
  	result.file_gb = 'templete';
  	result.file_id = '';
  	result.orgnm = '';
  	result.last_chg_user = '';
  	result.last_chg_date = '';	    
  	result.excelfile = '';
  	result.bit ='Y';
  	
  	var rownode = popupManager.mainGrid.row.add( result ).draw(false).node();
  	
  	//$(rownode).find('td').css('background-color', '#446d02');
  	//$(rownode).find('.comboBoxType').val('Y');	
}

/*
 * 조회
 */
function btnQuery() {
	var commonVoString = popupManager.setCommonVo('','TBL_FILE_INFO','','');
	console.log(commonVoString);

	$.ajax({
	       url : "/DynamicSqlFilterNoHeader",
	      "data" :   {commonVoStr : commonVoString},
	       "dataSrc" : "",
	       // global: false, // 추가
	       dataType : 'json',
	       timeout : 10000,
	       success : function(result) {	
	    	   	popupManager.mainGrid.clear();
                $.each(result, function (i, item) {
					//console.log(item)
                	var rownode = popupManager.mainGrid.row.add( item ).draw(false).node();
                	// use_yn을 combobox로 변환	
                	$(rownode).find('#fileIdCombobox').val(item.file_id);
                })
	       },
	       error : function(request, status, error) {
	        alert(request.responseText);
	       }
		});	
}

