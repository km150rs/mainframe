var zprompt_value='';

(function($) {
	  $.fn.outerHTML = function() {
	    return $(this).clone().wrap('<div></div>').parent().html();
	  };
	})(jQuery);

/*
function render_QueryResult(data,type,row,meta){
	var iData = data;
	var style = 'padding-left:5px';
	
//	console.log(data);
	//console.log(meta.settings.aoColumns[meta.col]);
    if (data == null || data == undefined )
    	return;
	if (meta.settings.aoColumns[meta.col].className == 'dt-body-left') {
		iData = $.fn.dataTable.render.number(',').display(data);
		style = 'padding-left:5px';
	} 
	if (meta.settings.aoColumns[meta.col].className == 'dt-body-right') 
	{
		if ("RATE,RT,rate,rt".includes(meta.settings.aoColumns[meta.col].data)) {
			iData = $.fn.dataTable.render.number(',','.',6).display(data);
		} else {
			iData = $.fn.dataTable.render.number(',').display(data);
		}
		style = 'padding-right:5px';
	}

	if(typeof row.DAEBI != "undefined"){
		if (row.DAEBI.indexOf("9650;") > 0) {
			var api = new $.fn.dataTable.Api(meta.settings);
			$(api.cell({row: meta.row, column: meta.col}).node()).css('color', 'red');
		} else if (row.DAEBI.indexOf("9661;") > 0) {
			var api = new $.fn.dataTable.Api(meta.settings);
			$(api.cell({row: meta.row, column: meta.col}).node()).css('color', 'aqua');
		} 
	}
	return iData;
	//return '<p style="' + style + '"> ' + iData + '</p>';
}

*/
function zprompt(msg,len,title,okproc) {
   var size=len *12;
   $.Zebra_Dialog(msg,{
       'title':    title,
       'message':  msg+"<br><input type=text onchange='zprompt_value=this.value' value='' size="+len+">",
       'width':    size,
      // 'position': ['center','top+50'],
       'buttons':  ['OK','Cancel'],
       'onClose':  function(caption) {
                      if (caption=="OK")
                         okproc(zprompt_value);
                   }
   });
}

function render_ymd(data,type,row,meta){
    if (data == null || data == "0")
    	return "-";
    var text = render_displayDate(data);
	return text;
};

// ajax 전송 전
	$(document).ajaxSend(function(event, request, settings) {
//		console.log(settings);
	//	console.log(settings.url);
		//console.log(settings.success.FunctionLocation);
		//	request.setRequestHeader('AJAX', 'true');
	});
	//AJAX 통신 시작 
	$( document ).ajaxStart(function() { 
		//마우스 커서를 로딩 중 커서로 변경 
		//http://malsup.com/jquery/block/#demos
		$.blockUI({ message: '실행중입니다.' 
				, css: { 
		            border: '2px solid #ebebeb', 
		            padding: '15px', 
		            backgroundColor: '#000', 
		            '-webkit-border-radius': '10px', 
		            '-moz-border-radius': '10px', 
		            opacity: .5, 
		            color: '#fff' 
				} 
		});
		
		$('html').css("cursor", "wait"); 
	}); 
	//AJAX 통신 종료
	$( document ).ajaxStop(function() { 
		//마우스 커서를 원래대로 돌린다 
		$('html').css("cursor", "auto"); 
		$.unblockUI();
	});
	
	$(document).ajaxError(function(event, request, settings) {
		console.log(settings);
		console.log(request);
		console.log(request.responseText);
		var jsonData = JSON.parse(request.responseText);
		swal('error : ' + jsonData.message);
		
		//window.location = "/loginError.html";
		$.unblockUI();
	});
	


	$.fn.dataTable.ext.errMode = function (settings, tn, msg) {
	    if (settings && settings.jqXHR && settings.jqXHR.status == 400) {
	        window.location = '/loginError2';
	        return;
	    }
	    alert(msg) // Alert for all other error types; default DataTables behavior
	  };
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
			
	function removeSpecialChar(str) {
		var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
	    return str.replace(regExp,'');
	}
	
	//콤마찍기
	function comma(str) {
	    str = String(str);
	    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	}

	/**
	 * 좌측문자열채우기
	 * @params
	 *  - str : 원 문자열
	 *  - padLen : 최대 채우고자 하는 길이
	 *  - padStr : 채우고자하는 문자(char)
	 */
	function lpad(str, padLen, padStr) {
	    if (padStr.length > padLen) {
	        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
	        return str;
	    }
	    str += ""; // 문자로
	    padStr += ""; // 문자로
	    while (str.length < padLen)
	        str = padStr + str;
	    str = str.length >= padLen ? str.substring(0, padLen) : str;
	    return str;
	}	
	/**
	 * 좌측문자열채우기
	 * @params
	 *  - padLen : 최대 채우고자 하는 길이
	 *  - padStr : 채우고자하는 문자(char)
	 */
	String.prototype.lpad = function(padLen, padStr) {
	    var str = this;
	    if (padStr.length > padLen) {
	        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
	        return str + "";
	    }
	    while (str.length < padLen)
	        str = padStr + str;
	    str = str.length >= padLen ? str.substring(0, padLen) : str;
	    return str;
	};	
	
	/**
	 * 우측문자열채우기
	 * @params
	 *  - str : 원 문자열
	 *  - padLen : 최대 채우고자 하는 길이
	 *  - padStr : 채우고자하는 문자(char)
	 */
	function rpad(str, padLen, padStr) {
	    if (padStr.length > padLen) {
	        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
	        return str + "";
	    }
	    str += ""; // 문자로
	    padStr += ""; // 문자로
	    while (str.length < padLen)
	        str += padStr;
	    str = str.length >= padLen ? str.substring(0, padLen) : str;
	    return str;
	}
	/**
	 * 우측문자열채우기
	 * @params
	 *  - padLen : 최대 채우고자 하는 길이
	 *  - padStr : 채우고자하는 문자(char)
	 */
	String.prototype.rpad = function(padLen, padStr) {
	    var str = this;
	    if (padStr.length > padLen) {
	        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
	        return str + "";
	    }
	    while (str.length < padLen)
	        str += padStr;
	    str = str.length >= padLen ? str.substring(0, padLen) : str;
	    return str;
	};	
	String.prototype.toComma = function() {
		var reg = /(^[+-]?\d+)(\d{3})/;
		var num = this;
		while(reg.test(num))
			num = num.replace(reg, '$1' + ',' + '$2');
		return num;
	};
	Number.prototype.toComma = function() {
		var reg = /(^[+-]?\d+)(\d{3})/;
		var num = this + '';
		while(reg.test(num))
			num = num.replace(reg, '$1' + ',' + '$2');
		return num;
	};	
	String.prototype.toHHMMSS = function () {
		var org = parseInt(this, 10);
	    var sec_num = org / 1000; // don't forget the second param 10진수
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60 );
	    var seconds = Math.floor((sec_num - (hours * 3600) - (minutes * 60)) );
	    
	    //console.log("sec_num:"+sec_num +" hours:" + hours+" minutes:" + minutes+" seconds:" + seconds);
	    
	    var ss = org - (((hours * 3600) + (minutes * 60) + seconds)  * 1000);
	
	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    if (ss < 10) {ss = "0"+seconds;}
	    if (ss < 100) {ss = "0"+ss;}
	    
	    return hours+':'+minutes+':'+seconds+'.'+ss;
	}
	String.prototype.toHHMMSS2 = function () {
		var org = parseInt(this, 10);
	    var sec_num = org / 1000; // don't forget the second param 10진수
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60 );
	    var seconds = Math.floor((sec_num - (hours * 3600) - (minutes * 60)) );
	    
	    //console.log("sec_num:"+sec_num +" hours:" + hours+" minutes:" + minutes+" seconds:" + seconds);
	    
	    var ss = org - (((hours * 3600) + (minutes * 60) + seconds)  * 1000);
	
	    if (hours == 0)
	    	hours = "";
	    else if (hours   < 10) 
	    	hours   = "0"+hours + ":";
	    else hours   = hours + ":";

	    if (minutes == 0)
	    	minutes = "";
	    else if (minutes   < 10) 
	    	minutes   = "0"+minutes + ":";
	    else minutes   = minutes + ":";

	    if (seconds == 0)
	    	seconds = ""+ ".";
	    else if (seconds   < 10) 
	    	seconds   = "0"+seconds + ".";
	    else seconds   = seconds + ".";

	    if (ss < 10) {ss = "0"+seconds;}
	    if (ss < 100) {ss = "0"+ss;}
	    
	    return hours + minutes + seconds + ss;
	}
	
	var StringBuffer = function() {
	    this.buffer = new Array();
	};
	StringBuffer.prototype.append = function(str) {
	    this.buffer[this.buffer.length] = str;
	};
	StringBuffer.prototype.toString = function() {
	    return this.buffer.join("");
	};
	
	function to_time_format(time_str)
	{
	    var hours = time_str.substring(0,2);
	    var minutes = time_str.substring(2,4);
	    var seconds = time_str.substring(4,6);
	    var ss = "";
	    if (time_str.length > 6) {
	    	ss = time_str.substring(6,8) + "0";
	        return hours + ":" + minutes + ":" + seconds + "." +  ss;
	    } else {
	        return hours + ":" + minutes + ":" + seconds + ".000";
	    }
	}
	
	function deleteSvc_id(table,server_ip,log_id,svc_id,log_time) {
		var today = comm_getToday();
		
		$.confirm({
				title : '확인',
				content : svc_id + ' 서비스실행LOG를 삭제하시겠습니까?',
				 boxWidth: '20%',
				 useBootstrap: false,
				buttons: {
			        confirm: function () {
			    		$.ajax({
			  			  url: '/DeleteSvc',
			  			  "data" : {
			  		        	proc_ymd : today
			  		        ,	server_ip : server_ip
			  		        ,	log_id : log_id
			  		        ,	svc_id : svc_id
			  		        ,	log_time : log_time
			  		        	},
			  			  "dataSrc" : "",
			  		      success: function(data) {
			  		    	table.ajax.reload(null,false);
			  		  		console.log("delete end");
			  			  }
			  			});
			        },
			        cancel: function () {
			        },
			    }
		});
	
	};
	
	function updateSvc_id(table,server_ip,log_id,svc_id,log_time) {
		var today = comm_getToday();
		var result = false;
		
		$.confirm({
				title : '확인',
				content : svc_id + ' 서비스실행LOG를 강제 종료 하시겠습니까?',
				 boxWidth: '20%',
				 useBootstrap: false,
				buttons: {
			        confirm: function () {
			    		$.ajax({
			  			  url: '/UpdateSvc',
			  			  "data" : {
			  		        	proc_ymd : today
			  		        ,	server_ip : server_ip
			  		        ,	log_id : log_id
			  		        ,	svc_id : svc_id
			  		        ,	log_time : log_time
			  		        	},
			  			  "dataSrc" : "",
			  		      success: function(data) {
			  		    	table.ajax.reload(null,false);
			  		  		console.log("update end");
			  			  }
			  			});
			    		result = true;
			        },
			        cancel: function () {
			        	result = false;
			        },
			    }
		});
		return result;
	};
	function render_diskMaxRate(data,type,row,meta){
		if (data == null) return;
		if (meta.col == 3) data += '%';
		if (row.urate > 85) 
			 return '<p class="txtRed">' + data  + '</p>';
		else return '<p class="txtBlack">' + data +  '</p>';
	};
	
	function render_covertServerName(data,type,row,meta){
		if (data == null) return;
		if (data.indexOf(".102") > 0) 
			 return 'OMS-01';
		else if (data.indexOf(".103") > 0) 
			 return 'OMS-02';
		else if (data.indexOf(".152") > 0) 
			 return 'FTP-01';
		else if (data.indexOf(".242") > 0) 
			 return 'ETC-01';
		else return data;
	};
	function render_displayTime(data,type,row,meta){
		if (data == null) return;
		if (data == '-') return '-';
		return data.substring(0,2) + ":" + data.substring(2,4) + ":" + data.substring(4,6) ;; 
	};
	function render_displayDate(date){
		var data = date.toString();
		if (data == null) return;
		return data.substring(0,4) + "-" + data.substring(4,6) + "-" + data.substring(6,8) ; 
	};	
	
	function render_covertSvc_id(data,type,row,meta){
		if (data == null) return;
		
		var svc_id ='';
		if (data.indexOf('KFT') >= 0 || data.indexOf('GFT') >= 0) {
			svc_id = data.substring(2);
		} else {
			svc_id = data;
		}
		if (type == 'display') {
			svc_id = '<span title="' + row.form_nm + '">' + svc_id + '</span>';
		} 
		return svc_id;
	};
	
	
	function pad(n, width) {
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
	function padA(n, width,char) {
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(char) + n;
		}	
	function comm_getToday(){
		var now = new Date();
		//getMonth = 월을 나타내는 정숫값. 0은 1월, 11은 12월임.
	    var today = now.getFullYear() + pad(now.getMonth()+1,2) + pad(now.getDate(),2);
	    //console.log(today);
	    return today;
	}
	
	function comm_getToday2(){
		var now = new Date();
		//getMonth = 월을 나타내는 정숫값. 0은 1월, 11은 12월임.
	    var today = now.getFullYear() + "-" + pad(now.getMonth()+1,2) +  "-" +  pad(now.getDate(),2);
	    //console.log(today);
	    return today;
	}
	
	function comm_getCurrentTime(){
		var now = new Date();
		var currentTime= pad(now.getHours(),2)+ ':' + pad(now.getMinutes(),2) + ':' + pad(now.getSeconds(),2);
	
	    return currentTime;
	}
	function print(msg){
		console.log(comm_getCurrentTime() + '=>' + msg);
	}
	function comm_getCurrentTimeOrg(){
		var now = new Date();
		var currentTime= pad(now.getHours(),2)+ pad(now.getMinutes(),2) + pad(now.getSeconds(),2);
	
	    return currentTime;
	}
	
	// Disable search and ordering by default
	$.extend( $.fn.dataTable.defaults, {
	    lengthChange: false, // 표시 건수기능 숨기기
		searching: false, // 검색 기능 숨기기
	    info: false,	// 정보 표시 숨기기
		paging: false,	// 페이징 기능 숨기기
		bServerSide: false,
	    processing: true,
	    bAutoWidth: false,
	    ordering: false,
	    order: []
	    //'dom': 'Rlfrtip',
	    //'colReorder': {
	    //    'allowReorder': false
	    //}
	} );
	
	/*
	 *   var element= document.querySelector(".ZebraDialog.myframe2");
	 *   makeElementDraggable(element);
	 */
	function makeElementDraggable(draggable_element, trigger_element) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

		//console.log(draggable_element);
		if(trigger_element ){
			initDrag(trigger_element)

			trigger_element.style.cursor = "grab";
		}
		else if (document.getElementById(draggable_element.id + "-header")) {
			// if present, the header is where you move the DIV from:
			initDrag(document.getElementById(draggable_element.id + "-header"))
			document.getElementById(draggable_element.id + "-header").style.cursor = "grab";
		}
		else if (draggable_element.querySelector(".ZebraDialog_Title")) {
			// if it's a Zebra Dialog, init from the Title
			initDrag(draggable_element.querySelector(".ZebraDialog_Title"))
			draggable_element.querySelector(".ZebraDialog_Title").style.cursor = "grab";
		} else {
			// otherwise, move the DIV from anywhere inside the DIV:
			initDrag(draggable_element)
		}

		// Save original position
		draggable_element.dataset.beforeMovableTop = getComputedStyle(draggable_element).top;
		draggable_element.dataset.beforeMovableLeft = getComputedStyle(draggable_element).left;
		draggable_element.classList.add("isDraggable");

		

		function initDrag(e) {
			e.onmousedown = dragMouseDown;
		}

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}
	
		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			draggable_element.style.top = (draggable_element.offsetTop - pos2) + "px";
			draggable_element.style.left = (draggable_element.offsetLeft - pos1) + "px";
		}
	
		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	function popupNotice(msg,closeDelayTime) {
		var curr_time = comm_getCurrentTime();
		//console.log('text:' + text);
		new jBox('Notice', {
			  content: msg,
			  title: curr_time,
			  attributes: {x: 'right',y: 'bottom'},
			  autoClose: closeDelayTime,
			  audio : {open:'/resources/static/node_modules/jbox/assets/audio/boop3'},
			  volume: 10000, 
			  animation: 'tada',
			  color: 'blue'
			});	
	}
	
	function uploadCaptureScreen () {
		// iframe처리
	    // iframe2image(inner, function (err, img) {
        // If there is an error, log it
        // if (err) { return console.error(err); }
        // Otherwise, add the image to dom
        // image.src = img.src;

		html2canvas(document.body).then(function(canvas) {
		  var imgBase64 = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
		  const decodImg = atob(imgBase64.split(',')[1]);
		  let array = [];
		  for (let i = 0; i < decodImg .length; i++) {
			  array.push(decodImg .charCodeAt(i));
		  }
		  const file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
		  const fileName = 'mtr_img_' + comm_getCurrentTimeOrg() + '.jpg';
		  let formData = new FormData();
		  
		  formData.append('file', file, fileName);	    	
		  $.ajax({
		  		    type: 'post',
		  		    url: '/upload',
		  		    global: false, // 추가
		  		    cache: false,
		  		    data: formData,
		  		    processData: false,
		  		    contentType: false,
		  		    success: function (data) {
		  		      print('Uploaded !!');
		  		    }
		  });
	  });		
	}
	
/* excel upload */
function gfn_ExportToTable(columnMap,targetGrid,excelFile,startString,endString) {  
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
     /*Checks whether the file is a valid excel file*/  
     //if (regex.test($("#excelfile").val().toLowerCase())) {  
     if (1) {  
         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
         if ($(excelFile).val().toLowerCase().indexOf(".xlsx") > 0) {  
             xlsxflag = true;  
         }  
         /*Checks whether the browser supports HTML5*/  
         if (typeof (FileReader) != "undefined") {  
             var reader = new FileReader();  
             reader.onload = function (e) {  
                 var data = e.target.result;  
                 /*Converts the excel data in to object*/  
                 if (xlsxflag) {  
                     var workbook = XLSX.read(data, { type: 'binary' });  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' });  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  
                     if (xlsxflag) {  
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y],{ header: ['A','B'] });  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: 1 });  
                         //var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y],{ header: ['A','B','C'] });  
                     }  
                     if (exceljson.length > 0 && cnt == 0) {  
                         gfn_BindTable(columnMap,targetGrid,exceljson,startString,endString);  
                         cnt++;  
                     }  
                 });  
                 //$('#exceltable').show();  
             }  
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                 reader.readAsArrayBuffer($(excelFile)[0].files[0]);  
             }  
             else {  
                 reader.readAsBinaryString($(excelFile)[0].files[0]);  
             }  
         }  
         else {  
             alert("Sorry! Your browser does not support HTML5!");  
         }  
     }  
     else {  
         alert("Please upload a valid Excel file!");  
     }  
 }  
 
function gfn_BindTable(columnMap,targetGrid,jsondata,startString,endString) {/*Function used to convert the JSON array to Html Table*/  
    var gridColumns = [];
    var gridData = [];
	var start = false;
    var columns = gfn_BindTableHeader(jsondata); /*Gets all the column headings of Excel*/  
    var k=0;
	var regex = / /gi;
	
    for (var i = 0; i < jsondata.length; i++) {  
		if (start == false && jsondata[i][columns[0]] != startString) {
			 start = false;
		 	continue;
		} else {
			 start = true;
		}
		if (jsondata[i][columns[0]].replace(regex, '') == endString)	 break;
        var row$ = $('<tr/>');  
        var gridRowData = {};
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
			var cellValue = jsondata[i][columns[colIndex]];
            if (typeof cellValue == "undefined" || cellValue == null)  
                 cellValue = " ";  
			//cellValue = cellValue.replace(regex, "");
            if (k == 0) { 
				cellValue = cellValue.replace("E-MAIL","EMAIL");
				var jhonKeys = [...columnMap.entries()]
        			.filter(({ 1: v }) => v === cellValue)
        			.map(([k]) => k)
        			;
	        	//console.log(cellValue + "--" + jhonKeys);
				gridColumns[colIndex] = {
					'title': cellValue,
				    'data': jhonKeys,
				    'render' : render_QueryResult
				}
			} else {
				gridRowData[gridColumns[colIndex].data] = cellValue;		
				//console.log(gridRowData);		
				//console.log(cellValue);		
			}

            //row$.append($('<td/>').html(cellValue));  
  		}  
		if (k > 0) {
	  		//console.log(gridColumns);
	  		//console.log(gridRowData);
	  		gridData.push(gridRowData);
	  	}
        //$(tableid).append(row$);  
  		k++;
    }
    gfn_setGridData(targetGrid,gridColumns,gridData);

}  

function gfn_setGridData(targetGrid,gridColumns, gridData) {/*Function used to get all column names from JSON and bind the html table header*/  
    //console.log(columns);
    //console.log(gridData);
   	$(targetGrid).DataTable().clear().destroy();
   	$(targetGrid).empty();

	var resultTable = $(targetGrid).DataTable({
		destroy : true,
	   // scrollCollapse: true,
	    "scrollY": 700,
	    scrollX : true,
		columns: gridColumns,
		//autoWidth: true,
        "searching": true,
	    data: gridData,
	    	    select: {
	            	style: 'os',
	            	items: 'row'
	        	},
	    language: {
    	    searchPlaceholder: "Search records",
        	search: "",
	    }
	});
	resultTable.columns.adjust().draw();  
}  

 function gfn_BindTableHeader(jsondata) {/*Function used to get all column names from JSON and bind the html table header*/  
     var columnSet = [];  

     var headerTr$ = $('<tr/>');  
     for (var i = 0; i < jsondata.length; i++) {  
         var rowHash = jsondata[i];  
         for (var key in rowHash) {  
             if (rowHash.hasOwnProperty(key)) {  
                 if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
                    columnSet.push(key);  
                     //headerTr$.append($('<th/>').html(key));
                               
                 }  
             }  
         }  
     }  
     
     //$(tableid).append(headerTr$);  
     return columnSet;  
 }  	
 