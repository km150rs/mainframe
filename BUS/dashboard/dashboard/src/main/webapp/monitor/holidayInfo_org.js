'use strict';
var editor ;
var holidayInfoTable;
 var commonVo =  new Object();

function render_result(data,type,row,meta){
    if (data == null)
    	return;
	
    var api = new $.fn.dataTable.Api(meta.settings);
    
    if (data == 'fail times') {
    	data = 'FAILED';
    	$(api.cell({row: meta.row, column: meta.col}).node()).css('color', 'red');
    }
    else 
    	$(api.cell({row: meta.row, column: meta.col}).node()).css('color', 'blue');
  
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


$(document).ready(function(){
	$.datepicker.setDefaults( $.datepicker.regional["ko"]);
	//$( "#datepicker" ).datepicker();
	   
 var dateFormat = "yy-mm-dd",
      from = $( "#from" )
        .datepicker({
          defaultDate: "-1w",
      changeMonth: false,
      changeYear: true,
          numberOfMonths: 1
        });

 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }	   
	$( "#from" ).datepicker("option", "dateFormat", "yy");

	
	
	editor = new $.fn.dataTable.Editor({
	  table: '#holidayInfoTable',
	  title: '휴일 등록',
	  idSrc: 'id',
	  i18n: {
      	create: {
            title:  "휴일 등록",
            submit: "확인"
        },
      	edit: {
            title:  "휴일 변경",
            submit: "확인"
        },
      	remove: {
            title:  "휴일 삭제",
            submit: "확인"
        }
      },
	  fields: [
	    
	    { label: 'work_date', name: 'work_date' ,
		    	type:      'datetime',
                def:       function () { return new Date(); },
                format:    'YYYY-MM-DD',
	    
	    },
	    { label: 'holiday_nm', name: 'holiday_nm'},
	    { label: 'holiday_yn', name: 'holiday_yn' 
                ,type:  "select",
                options: [
                    { label: "Y", value: "Y" }
                    ,{ label: "N", value: "N" }
                ]
	    },
	    { label: 'memo', name: 'memo', type:'textarea'
 			,attr: {
                        maxLength: 100
                     }        	
	    },
	    { label: 'last_chg_user', name: 'last_chg_user',type: "hidden" },
	    { label: 'last_chg_date', name: 'last_chg_date',type: "hidden" },
	    { label: 'key', name: 'key',type: "hidden" },
	  ],
	} );
	editor.on('open', function (e, mode, action) {
		if (action == 'create') {
			//btnSelectEmpNmList('');
			//editor.show( 'Holiday_type' );			
		}
		if (action == 'edit') {
			var modifier = editor.modifier();
			if ( modifier ) {
		        var data = holidayInfoTable.row( modifier ).data();
				//btnSelectEmpNmList(data.emp_nm);
			}  
			//editor.hide( 'Holiday_type' );
		} else {
			//editor.enable( ['emp_nm', 'Holiday_type'] );
		//	editor.show( 'Holiday_type' );			
		}
	});

	editor.on('preSubmit', function (e, data, action) {
		var modifier = editor.modifier();
		if ( modifier ) {
	        var currData = holidayInfoTable.row( modifier ).data();
			console.log(modifier);
			if (action == 'remove') {
				saveData(currData,'D');
			} else if (action == 'edit') {
				//var org_emp_nm = currData.emp_info;
				//currData.emp_nm 	= org_emp_nm.split('/')[0];
				//currData.route_nm 	= org_emp_nm.split('/')[1];
				//currData.sp_gb 		= org_emp_nm.split('/')[2];
				//currData.car_regno 	= org_emp_nm.split('/')[3];
			} 
		} else if (action == 'create') {
				console.log(data);
				
				//var org_emp_nm = data.data[0].emp_info;
				//data.data[0].emp_nm 	= org_emp_nm.split('/')[0];
				//data.data[0].route_nm 	= org_emp_nm.split('/')[1];
				//data.data[0].sp_gb 		= org_emp_nm.split('/')[2];
				//data.data[0].car_regno 	= org_emp_nm.split('/')[3];
				return saveData(data.data[0],'C');
	    }
	});
	editor.on('preEdit', function (e, id, value) {
//		console.log(e.target.s.editdata);
//		console.log(value);
	});

    // 신규
	editor.on('create', function (e, json, data) {
//		saveData(data,'C');
	});
    // 변경
	editor.on('edit', function (e, json, data) {
		console.log(data);
		saveData(data,'U');
	});
    // 삭제
	editor.on('remove', function (e, json, data) {
	});
	holidayInfoTable = $("#holidayInfoTable").DataTable({
		    "scrollY": 650,
	        scrollCollapse: true,
	        dom: 'lBfrtip',
	        scrollX: true,
		    "columnDefs": [
		        //{"className": "dt-left", "targets": [6]},
		        //{"className": "dt-center", "targets": [1,2,3,4,5,7,8,9,10,11]},
		        //{"className": "txtReadOnly", "targets": [2,3]}
	    		],
	    		searching : true,
	            oLanguage: {
	                "sSearch": "search :"
	            },
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	        columns : [
				 {
			        data: null,
			        defaultContent: '',
			        className: 'select-checkbox',
			        orderable: false,
			        width:'4%'
			      },
    	    	{data: "work_date"		,width:'5%'    },
    	        {data: "holiday_nm"		,width:'15%'	,editField: "holiday_nm"},
    	    	{data: "holiday_yn"		,width:'5%'	,editField: "holiday_yn"},
    	        {data: "memo"			,width:'40%'	},
    	        {data: "last_chg_user" 	,width:'8%'		},
    	        {data: "last_chg_date" 	,width:'8%'		},
    	        {data: "key" 	,visible : false		},
    	        {data: "id" 	,visible : false		}
		     ],
	        buttons: [
	            { extend: 'create', editor: editor ,title :'test'},
	            { extend: 'edit',   editor: editor },
	            { extend: 'remove', editor: editor }
	        ],
        	        initComplete: function() {
	        	$('.buttons-pdf').hide();
	        }		        
	});
	$("div.toolbar").html( 
			'<input class="pjy_btn" type="button" id="btnNew" value="행추가"> -' );
	
/*	$('#holidayInfoTable tbody').on('click','td', function() {
		var row = holidayInfoTable.cell(this).index().row;
		var col = holidayInfoTable.cell(this).index().column;
		var rowData = holidayInfoTable.cell( row,col ).data();

		editor.edit(row, {
		  title: '휴일정보 변경 '+rowData.id,
		  buttons: '확인'
		} );
	});
*/	
	//btnQuery();
	//btnQueryChangeLog();
});	

/*
 * 조회
 */
$(document).on('click', '#btnQuery', function () {
	btnQuery();	  
});

$(document).on('click', '#btnAPI', function () {
	commonVo.workDate 		= $('#from').val();
	var commonVoString = JSON.stringify (commonVo);

	console.log(commonVoString);

	    $.ajax({
	        url : '/holidayInfoAPI',
	       "data" :  {commonVoStr : commonVoString}, 	       
	        error: function(xhr, status, error){
	            alert(error);
	        },
	        success : function(data){
	            console.log(data);
	        }
	 
	 
	    });
});


/*
 * 조회
 */
function btnQuery() {
	commonVo.workDate 		= $('#from').val();
	commonVo.filterType		= 'selectHolidayInfo';
	var commonVoString = JSON.stringify (commonVo);

	console.log(commonVoString);

	$.ajax({
	       url : "/DynamicSqlFilterNoHeader",
	       "data" :  {commonVoStr : commonVoString}, 	       
	        global: false, // 추가
	       timeout : 10000,
	       dataType : 'json',
	       success : function(ret) {	
	    	   console.log(ret);
	    	   if (ret == '[]') return;
	    	   holidayInfoTable.clear();
	    	   holidayInfoTable.rows.add( ret).draw( );
	    	  //. swal(ret);
	    	   //tab_1_show();
	       },
	       error : function(request, status, error) {
	    	   swal(request.responseText,"error");
	       }
	});		

}

/*
 * 업무시스템 수정/신규 처리
 */
function saveData(data,crudType) {
	var sendVo =  new Object();
	var url;

	if (crudType == 'D') {
		url = "/DeleteHolidayInfo";		
	} else if (crudType == 'U') {
		url = "/UpdateHolidayInfo";
	} else {
	    if (data.work_date == '' || data.holiday_nm == '' || data.holiday_yn == '' ) {
	    	alert('error : 필수입력항목 누락');
	    	return false;
	    }
		url = "/InsertHolidayInfo";
	}
	
	sendVo.workDate 	= data.work_date;
	sendVo.holidayNm   	= data.holiday_nm;
	sendVo.holidayYn 	= data.holiday_yn;
	sendVo.memo 		= data.memo;
	sendVo.id 			= data.id;
	sendVo.key 			= data.key;
	
	var jsonString = JSON.stringify (sendVo);
	console.log(jsonString);
	
	var result = false;	
	$.ajax({
		  url: url,
		  "data" : {strData : jsonString},
		  async : false,
	      success: function(data) {
	    	   swal("정상처리되었습니다.["+crudType+"]");
	    	   result=true;
	      },
	      error : function(request, status, error) {
			  console.log(request);
			  console.log(status);
			  console.log(error);
    	   swal("처리오류 : (key중복)" + request + '/' + status + '/' +error);
	    	result=false;
	      }			
	});
 	return result;
}
