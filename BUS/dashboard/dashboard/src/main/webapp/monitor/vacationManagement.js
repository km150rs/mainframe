'use strict';
var editor ;
var vacationTable;
var offTypeList = [];
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
/*	$.datepicker.setDefaults( $.datepicker.regional["ko"]);
	//$( "#datepicker" ).datepicker();
	   
 var dateFormat = "yy-mm-dd",
      from = $( "#from" )
        .datepicker({
          defaultDate: "-1w",
      changeMonth: true,
      changeYear: true,
          numberOfMonths: 1
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "",
      changeMonth: true,
      changeYear: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
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
	$( "#from" ).datepicker("option", "dateFormat", "yy-mm-dd");
	$( "#to" ).datepicker("option", "dateFormat", "yy-mm-dd");

	$( "#from" ).val(comm_getToday2());
	$( "#to" ).val(comm_getToday2());*/
	
	
	var now = new Date();
	var yearStart = new Date(now.setMonth(now.getMonth() - now.getMonth()));	// 한달 전
	
    var calMonthKo = new tui.DatePicker('#datepicker-month-from', {
        date: yearStart,
        language: 'ko',
		type:'month',
        input: {
            element: '#from',
            format: 'yyyy-MM'
        }
    });
   	var calMonthKo = new tui.DatePicker('#datepicker-month-to', {
        date: new Date(),
        language: 'ko',
		type:'month',
        input: {
            element: '#to',
            format: 'yyyy-MM'
        }
    });
    
	btnQueryCommonCode();
    console.log($('#comboAttendanceType').text());
	editor = new $.fn.dataTable.Editor({
	  table: '#vacationTable',
	  title: '휴가 등록',
	  idSrc: 'id',
	  formOptions: {
            main: { submitOnReturn: false }
		},
	  i18n: {
      	create: {
            title:  "휴가 등록",
            submit: "확인"
        },
      	edit: {
            title:  "휴가 변경",
            submit: "확인"
        },
      	remove: {
            title:  "휴가 삭제",
            submit: "확인"
        }
      },
	  fields: [
	    
	    { label: '이름', name: 'emp_nm' },
	    //{ label: '사원정보', name: 'emp_info' ,type:  "select",options: [], attr:{ disabled:true }},
	    { label: '사원정보', name: 'emp_info' ,attr:{ disabled:true }},
	    { label: '휴가구분', name: 'attendance_type' 
                ,type:  "select",
                options:	offTypeList
                
/*                [
                    { label: "휴가", value: "휴가" }
                    ,{ label: "병가", value: "병가" }
                    ,{ label: "기타", value: "기타" }
                ]*/
	    },
	    { label: '시작일', name: 'start_date', 
		    	type:      'datetime',
                def:       function () { return new Date(); },
                format:    'YYYY-MM-DD',
	    },
	    { label: '종료일', name: 'end_date', 
		    	type:      'datetime',
                def:       function () { return new Date(); },
                format:    'YYYY-MM-DD',
	    },
	    { label: 'memo', name: 'memo', type:'textarea'
	    	//,placeholder: ''
	    	//,multiEditable: true
        	//,multiple: true
 			,attr: {
                        maxLength: 100
                     }        	
	    },
	    { label: 'route_nm', name: 'route_nm',type: "hidden" },
	    { label: 'sp_gb', name: 'sp_gb' ,type: "hidden"},
	    { label: 'car_regno', name: 'car_regno',type: "hidden" },
	    { label: 'last_chg_user', name: 'last_chg_user',type: "hidden" },
	    { label: 'last_chg_date', name: 'last_chg_date',type: "hidden" },
	    { label: 'key', name: 'key',type: "hidden" },
	  ],
	} );
	editor.on('open', function (e, mode, action) {
		if (action == 'create') {
			//btnSelectEmpNmList('');
			editor.show( 'emp_nm' );
			editor.show( 'emp_info' );
			editor.show( 'start_date' );
			editor.show( 'end_date' );
		}
		if (action == 'edit') {
			var modifier = editor.modifier();
			if ( modifier ) {
		        var data = vacationTable.row( modifier ).data();
				btnSelectEmpNmList(data.emp_nm);
			}  
			editor.hide( 'emp_nm' );
			editor.hide( 'emp_info' );
			editor.hide( 'start_date' );
			editor.hide( 'end_date' );
		} else {
			//editor.enable( ['emp_nm', 'attendance_type'] );
		//	editor.show( 'attendance_type' );			
		}
	});

	editor.on('preSubmit', function (e, data, action) {
		var modifier = editor.modifier();
		if ( modifier ) {
	        var currData = vacationTable.row( modifier ).data();
			console.log(modifier);
			if (action == 'remove') {
				saveData(currData,'D');
			} else if (action == 'edit') {
				var org_emp_nm = currData.emp_info;
				currData.emp_nm 	= org_emp_nm.split('/')[0];
				currData.route_nm 	= org_emp_nm.split('/')[1];
				currData.sp_gb 		= org_emp_nm.split('/')[2];
				currData.car_regno 	= org_emp_nm.split('/')[3];
			} 
		} else if (action == 'create') {
				var emp_nm = editor.field(`emp_nm`).val();
				if (emp_nm == '')
					return false; 
				var org_emp_nm = data.data[0].emp_info;
				data.data[0].emp_nm 	= org_emp_nm.split('/')[0];
				data.data[0].route_nm 	= org_emp_nm.split('/')[1];
				data.data[0].sp_gb 		= org_emp_nm.split('/')[2];
				data.data[0].car_regno 	= org_emp_nm.split('/')[3];
				return saveData(data.data[0],'C');
	    }
	});
	editor.on('preEdit', function (e, id, value) {
//		console.log(e.target.s.editdata);
		console.log(value);
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

	editor.field('emp_nm').input().on('blur', function (e) {
		console.log('test');
		var emp_nm = editor.field(`emp_nm`).val();
		if (emp_nm != '') 
			btnSelectEmpNmList(emp_nm);
	
	});
	
/*
	editor.dependent(`emp_nm`, function(val, data, callback) {
	        console.log('dependent:' + val );
	        // reset the value to the original value
			if (val != '')
				btnSelectEmpNmList(val);
	        //editor.field(`emp_info`).val('aaa');
	        // and do what you want
	});	
	
*//*	editor.field('emp_info').input().on('change', function (e) {
		var info = editor.field(`emp_info`).val();
		console.log(info);
		if (info != null) {
			var emp_nm 	= info.split('/')[0];
	        editor.field(`emp_nm`).val(emp_nm);
	    }
		
	});
*/	
/*	editor.dependent(`emp_info`, function(val, data, callback) {
	        console.log('emp_info:' + val );
			var emp_nm 	= val.split('/')[0];
	        // reset the value to the original value
	        editor.field(`emp_nm`).val(emp_nm);
	        // and do what you want
	});	
*/		
	var height= $('.empInfo0_2_2').height();
//console.log(height);
	vacationTable = $("#vacationTable").DataTable({
		    "scrollY": height,
	        scrollCollapse: true,
	        dom: 'lBfrtip',
	        scrollX: true,
		    "columnDefs": [
		        {"className": "dt-center", "targets": [1,2,3,4,5,6,7,8,9,10,11]},
		        {"className": "txtReadOnly", "targets": [2,3]}
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
    	        {data: "start_date" 	,width:'5%'    },
    	        {data: "end_date" 		,width:'5%'	},
    	        {data: "emp_nm"			,width:'5%'	,editField: "emp_nm"},
    	    	{data: "attendance_type"	,width:'5%'	,editField: "attendance_type"},
    	        {data: "memo"			,width:'35%'	},
    	        {data: "delete_yn"		,width:'4%'	},
    	        {data: "route_nm"		,width:'4%'	},
    	        {data: "sp_gb"			,width:'4%'	},
    	        {data: "car_regno"		,width:'8%'	},
    	    	{data: "reg_date"		,width:'5%'   ,defaultContent:comm_getToday2() },
    	        {data: "last_chg_user" 	,width:'6%'		},
    	        {data: "last_chg_date" 	,width:'10%'		},
    	        {data: "key" 	,visible : false		},
    	        {data: "id" 	,visible : false		},
    	        {data: "emp_info" 	,visible : false		}
		     ],
	        buttons: [
	            { extend: 'create', editor: editor ,title :'test'
	            	,formButtons: [
                    	'등록',
                    	{ text: '취소', action: function () { this.close(); } }
                	]
                },
	            { extend: 'edit',   editor: editor 
	            	,formButtons: [
                    	'변경',
                    	{ text: '취소', action: function () { this.close(); } }
                	]
	            },
	            { extend: 'remove', editor: editor 
	            	,formButtons: [
                    	'삭제',
                    	{ text: '취소', action: function () { this.close(); } }
                	]
	            }
	        ],
        	        initComplete: function() {
	        	$('.buttons-pdf').hide();
	        }		        
	});
	$("div.toolbar").html( 
			'<input class="pjy_btn" type="button" id="btnNew" value="행추가"> -' );
	
/*	$('#vacationTable tbody').on('click','td', function() {
		var row = vacationTable.cell(this).index().row;
		var col = vacationTable.cell(this).index().column;
		var rowData = vacationTable.cell( row,col ).data();

		editor.edit(row, {
		  title: '휴가정보 변경 '+rowData.id,
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

/*
 * 휴가종류 가져오기
 */
function btnQueryCommonCode () {
	commonVo.filterText = '휴가종류';
	commonVo.filterType = 'TBM_ROUTE_COMMON_INFO';
	var commonVoStr = JSON.stringify (commonVo);

	$.ajax({
	       url : "/DynamicSqlFilterNoHeader",
	      "data" :   {commonVoStr : commonVoStr},
	       "dataSrc" : "",
	        //global: false, // 추가
	       dataType : 'json',
	       async:false,
	       timeout : 10000,
	       success : function(ret) {	
	    	   //console.log(ret[0].am_seq_array);
	    	   setOptionValue('#comboAttendanceType',ret[0]['am_seq_array']);				   
	       },
	       error : function(request, status, error) {
	    	   swal(request.responseText);
	       }
		});	
}	
/*
 * 조회
 */
function btnSelectEmpNmList(emp_nm) {
	commonVo.regDate 		= comm_getToday2();
	commonVo.filterType		= 'selectEmpNmList';
	commonVo.empNm         = emp_nm;
	var commonVoString = JSON.stringify (commonVo);

	console.log(commonVoString);
	//var optionsA = [];
	$.ajax({
	       url : "/DynamicSqlFilterNoHeader",
	       "data" :  {commonVoStr : commonVoString}, 	       
	        //global: false, // 추가
	       timeout : 10000,
	       dataType : 'json',
	       success : function(ret) {	
	    	   console.log(ret);
	    	   if (ret == '[]') return;
				editor.field('emp_info').val(ret[0].emp_info);
/*				 var option = {};
	            option.label = ' ';
	            option.value = ' ';
	            optionsA.push(option);
		        $.each(ret, function(i, e) {
		            option = {};
		            option.label = e.emp_info;
		            option.value = e.emp_info;
		            optionsA.push(option);
		        });
        		editor.field('emp_info').update(optionsA);
*/
	       },
	       error : function(request, status, error) {
	    	   swal(request.responseText,"error");
	       }
	});		

}


/*
 * 조회
 */
function btnQuery() {
	commonVo.fromDate 		= $('#from').val();
	commonVo.toDate 		= $('#to').val();
	commonVo.attendanceType = $('#comboAttendanceType').val(); 	
	commonVo.empNm 			= $('#edtEmpNm').val();
	commonVo.regDate 		= comm_getToday2();
	commonVo.filterType		= 'selectAttendanceInfo';
	var commonVoString = JSON.stringify (commonVo);

	console.log(commonVoString);

	$.ajax({
	       url : "/DynamicSqlFilterNoHeader",
	       "data" :  {commonVoStr : commonVoString}, 	       
	        //global: false, // 추가
	       timeout : 10000,
	       dataType : 'json',
	       success : function(ret) {	
	    	   //console.log(ret);
	    	   if (ret == '[]') return;
	    	   vacationTable.clear();
	    	   vacationTable.rows.add( ret).draw( );
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
		sendVo.regDate 	= data.reg_date;
		url = "/DeleteAttendanceInfo";		
	} else if (crudType == 'U') {
	    if (data.start_date >  data.end_date ) {
	    	alert('error : 기간 오류');
	    	return false;
	    }
		sendVo.regDate 	= data.reg_date;
		url = "/UpdateAttendanceInfo";
	} else {
	    if (data.emp_nm == '' || data.attandance_type == '' || data.start_date == ''  || data.end_date == '' ) {
	    	//alert('error : 필수입력항목 누락');
	    	return false;
	    }
	    if (data.start_date >  data.end_date ) {
	    	alert('error : 기간 오류');
	    	return false;
	    }
		sendVo.regDate 	= comm_getToday2();
		url = "/InsertAttendanceInfo";
	}
	data.delete_yn = 'N';
	sendVo.empNm 		= data.emp_nm;
	sendVo.attendanceType = data.attendance_type;
	sendVo.startDate 	= data.start_date;
	sendVo.endDate 		= data.end_date;
	sendVo.memo 		= data.memo;
	sendVo.deleteYn     = data.delete_yn;
	sendVo.id 			= data.id;
	sendVo.key 			= data.key;
	sendVo.routeNm      = data.route_nm;
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

function setOptionValue (comboName, optionList) {
		var comboNm = $(comboName);
	   	comboNm.empty();

	    var params = optionList.split(",");
	    var result = '<option value="all">' + '-휴가구분-' + '</option>';
	    for (var i = 0; i < params.length; i++) {
			result += '<option value="'+ params[i] +'">' + params[i] + '</option>';
			var combo = new Object();
			combo.label = params[i];
			combo.value = params[i];
			offTypeList.push(combo);
	    }
	   	comboNm.append(result);
}			
