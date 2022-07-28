$(function(){
    $(window).on('mousewheel',function(e){
        if(e.originalEvent.wheelDelta > 0){
            $('header').stop().slideDown()
        } else{
            $('header').stop().slideUp()
        }
            
    })
})