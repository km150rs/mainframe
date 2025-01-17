/*
 * 난독화 site
 * https://obfuscator.io/
 */

$( function() {
	var isInIFrame = (window.location != window.parent.location);
	if(isInIFrame == true) {
		top.window.close();  
	} else {
	}

	var ChatManager = (function () {
	    function ChatManager() {
	    } 	
		ChatManager.$comboCompanyNm = $('#companyNo');
		/*
		 * 노선정보 가져오기
		 */
	    ChatManager.btnQueryRouteNm = function () {
			var jsonString = '';
			$.ajax({
			       url : "/proxy_getCompanyInfo",
			      "data" : {strData : jsonString},
			       "dataSrc" : "",
			        //global: false, // 추가
			       dataType : 'json',
			       timeout : 10000,
			       success : function(ret) {	
			    	   //console.log(ret.data);
			    	   var size = ret.data.length;
			    	   var option = $("<option>--회사선택--</option>");
			    	   ChatManager.$comboCompanyNm.empty();
			    	   //ChatManager.$comboCompanyNm.append(option);
			    	   
			    	    for (var i = 0; i < size; i++) {
			    	    	var option = $("<option value='" + ret.data[i].company_no + "' class='txtRed2'>"+ret.data[i].company_nm+"</option>");
			    	    	ChatManager.$comboCompanyNm.append(option);
			    	    };
			       },
			       error : function(request, status, error) {
			    	   alert(request.responseText);
			       }
				});	
		}

	    return ChatManager;
	}());

	ChatManager.btnQueryRouteNm();
});
