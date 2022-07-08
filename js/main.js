$(function(){
    $('#next').click(function(){
        $('.card_B .item:first').addClass('on');
        $('.card_B').animate({marginLeft: 0},function(){
            $('.card_B .item:first').siblings().removeClass('on')
        });
    })
})

