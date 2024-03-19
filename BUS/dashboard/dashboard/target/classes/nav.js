var aa;
$( function() {
	$(document).on('click', '#btnEmployee', function () {
		 aa = window.open("/jsp/employeeInfo", "_blank");
    	aa.focus();
	});

	$(document).on('click', '#btnCarInfo', function () {
		 aa = window.open("/jsp/carInfo", "_blank");
    	aa.focus();
	});	

	$(document).on('click', '#btnDriverInfo', function () {
		 aa = window.open("/jsp/driverInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnRouteInfo', function () {
		 aa = window.open("/jsp/routeInfo", "_blank");
    	aa.focus();
	});	

	$(document).on('click', '#btnAttendance', function () {
		 aa = window.open("/jsp/attendance", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnVacationManagement', function () {
		 aa = window.open("/jsp/vacationManagement", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnHoliday', function () {
		 aa = window.open("/jsp/holidayInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnArrangeView', function () {
		 aa = window.open("/jsp/arrangeBusView", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnArrange', function () {
		 aa = window.open("/jsp/arrangeBus", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDrivingOrder', function () {
		 aa = window.open("/jsp/drivingOrder", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDanger', function () {
		 aa = window.open("/jsp/dangerDrivingInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnAccident', function () {
		 aa = window.open("/jsp/accidentInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnEmployeeCard', function () {
		 aa = window.open("/jsp/employeeCard", "_blank");
    	aa.focus();
	});		
	$(document).on('click', '#btnDangerView', function () {
		 aa = window.open("/jsp/dangerDrivingAnalyze", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnPunctuality', function () {
		 aa = window.open("/jsp/arrangePunctuality", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnPunctualityView', function () {
		 aa = window.open("/jsp/arrangePunctualityAnalyze", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnIscDriverInfo', function () {
		 aa = window.open("/jsp/iscDriverInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDrivingOrderAll', function () {
		 aa = window.open("/jsp/drivingOrderAll", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDrivingRecord', function () {
		 aa = window.open("/jsp/iscDrivingRecord", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnEmpWorkingLog', function () {
		 aa = window.open("/jsp/empWorkingLog", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnEmpWorkingTimeView', function () {
		 aa = window.open("/jsp/empWorkingTimeView", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnEmpWorkingKMView', function () {
		 aa = window.open("/jsp/empWorkingKMView", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnPublicComplaint', function () {
		 aa = window.open("/jsp/publicComplaint", "_blank");
    	aa.focus();
	});	

	$(document).ready(function(){
	    $('.dropdown1').hover(
		    function(){
		        $(this).children('.dropdown-menu1').slideDown('fast');
		    },
		    function () {
		        $(this).children('.dropdown-menu1').slideUp('fast');
    	});
	/*	
	    
		$(document).keypress(function (e) {
		  e.preventDefault()
		  if (e.which == 13) {         
		    	alert('test');
		  }
		});
		shortcut.add("F10", function() {
		    	    $("header").toggle(1000);
		});
	*/	
    
	});
	
	//https://abbo.tistory.com/397

	let count = 0;
	let uri = window.location.pathname;
	/*
	console.log(uri);
	if (uri != '/login2') {
		setInterval(() => {
			
				$.ajax({
				       url : "/proxy_check-session",
				       "dataSrc" : "",
				        //global: true, // 추가
				        cashe : false,
				        //async:false,
				       success : function(result) {	
						   //console.log(result);
						     count++;
				       },
				       error : function(request, status, error) {
					      //console.log(uri);
					      if(uri != '/login2') {
					        location.href = '/expired';
					      }
				       }
				});	
	
		}, 60000);
	}  
	*/
});
