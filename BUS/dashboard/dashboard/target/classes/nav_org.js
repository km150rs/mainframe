
$( function() {
	$(document).on('click', '#btnEmployee', function () {
		let aa = window.open("/employeeInfo", "_blank");
    	winaadow.focus();
	});

	$(document).on('click', '#btnCarInfo', function () {
		let aa = window.open("/carInfo", "_blank");
    	aa.focus();
	});	

	$(document).on('click', '#btnDriverInfo', function () {
		let aa = window.open("/driverInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnRouteInfo', function () {
		let aa = window.open("/routeInfo", "_blank");
    	aa.focus();
	});	

	$(document).on('click', '#btnAttendance', function () {
		let aa = window.open("/attendance", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnHoliday', function () {
		let aa = window.open("/holidayInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnArrangeView', function () {
		let aa = window.open("/arrangeBusView", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnArrange', function () {
		let aa = window.open("/arrangeBus", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDanger', function () {
		let aa = window.open("/dangerDrivingInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDanger', function () {
		let aa = window.open("/dangerDrivingInfo", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnDangerView', function () {
		let aa = window.open("/dangerDrivingAnalyze", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnPunctuality', function () {
		let aa = window.open("/arrangePunctuality", "_blank");
    	aa.focus();
	});	
	$(document).on('click', '#btnPunctualityView', function () {
		let aa = window.open("/arrangePunctualityAnalyze", "_blank");
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
});

});
