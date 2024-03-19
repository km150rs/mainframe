$(function () {
  var CounterManager = (function () {
    function CounterManager() {
    } 

    CounterManager.joinInterval = null;

    CounterManager.init = function () {
        $.ajax({
          url     : '/MtrSvcGetCounter',
          headers : {
            "Content-Type": "application/json"
          },
          success : function () {
              clearInterval(CounterManager.joinInterval);
	      	  CounterManager.joinInterval = setInterval(function () {
	    		  CounterManager.init();
	            }, 5000);
          },
          error   : function (jqxhr) {
              clearInterval(CounterManager.joinInterval);
            console.log(jqxhr);
          },
          complete: function () {
          }
        })
    };


    CounterManager.updateText = function (message, append) {
    };

    return CounterManager;
  }());

  CounterManager.init();
});


$(function(){
    var data1 = 0,
        data2 = 0,
        data3 = 0,
        numberResult = $('.numberResult'),
        numberInput = $('.numberInput'),
        numberButton = $('.numberButton');

    
    //버튼 클릭시
    numberButton.click(function(e){
        e.preventDefault();

        data1 = Number(data3);
        data2 = Number(numberInput.val());
        data3 = Number(data1) + Number(data2);
    
         //animate옵션을 활용 사용자 속성을 만들고, 속성이 바뀌는 것을 작성
        $({data:data1}).animate({data:data3},{
            duration:500,  //시간
            progress:function(){ //바뀌는 상황마다 실행
                numberResult.text(Math.ceil(this.data));
            }
        });

        numberInput.val("");
        
    });

});
