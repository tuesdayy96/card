// 헤더 휠
$(function(){
    $(window).on('mousewheel',function(e){
        if(e.originalEvent.wheelDelta > 0){
            $('header').slideDown()
        } else{
            $('header').stop().slideUp()
        }   
    })
})

// 마우스 커버
$(function(){
  $(window).on('mousemove',function(e){
    e.preventDefault();
    var x = e.pageX-$(window).scrollLeft();
    var y = e.pageY-$(window).scrollTop();
    $('.cursorbox, .cursorbox2').css({left:x,top:y});
  })
  $('.cursorZ').on('mouseenter',function(){
      $('.cursorbox2').addClass('on');
  }).on('mouseleave',function(){
      $('.cursorbox2').removeClass('on');
  })
})



// 드래그 슬라이드
$(function() {
    var $slider = $(".slider"),
        diff = 0,
        curSlide = 0,
        numOfSlides = $(".slide").length-1,
        animating = false,
        animTime = 500;
    $('.digit').html(curSlide+1+' ');
    
    function manageControls() {
      $(".slider-control").removeClass("inactive");
      if (!curSlide) $(".slider-control.left").addClass("inactive");
      if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };
    
    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $(".slide").removeClass("active");
        $(".slide-"+curSlide).addClass("active");
        setTimeout(function() {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
      diff = 0;
      $('.digit').html(curSlide+1+' ');
      if(curSlide == 2 || curSlide == 5){
        $('.no_idx, .slide_title').css('color','rgb(0,0,0)')
      } else {
        $('.no_idx, .slide_title').css('color','rgb(255,255,245');
      }
    }
  
    function navigateLeft() {
      if (animating) return;
      if (curSlide > 0) curSlide--;
      changeSlides();
    }
  
    function navigateRight() {
      if (animating) return;
      if (curSlide < numOfSlides) curSlide++;
      changeSlides();
    }
  
    $(document).on("mousedown touchstart", ".slider", function(e) {
      if (animating) return;
      var startX = e.pageX || e.originalEvent.touches[0].pageX,
          winW = $(window).width();
      diff = 0;
      $(this).css('cursor','grabbing');
      
      $(document).on("mousemove touchmove", function(e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      });
    });
    
    $(document).on("mouseup touchend", function(e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slider-control", function() {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });
  });

  // 페이드
  $(function(){
    var fade = $('.fade');
    var fade_txt = document.querySelectorAll('.fade_txt');
    var fade_txt2 = document.querySelectorAll('.fade_txt2');
    var sec5 = document.querySelector('.sec5');
    var sec6 = document.querySelector('.sec6');
    $(window).on('scroll',function(){
      for(let i = 0;i<fade.length;i++){
        if($(window).scrollTop()>$('.fade').eq(i).offset().top-600){
          $('.fade').eq(i).addClass('on');
        } else {
          $('.fade').eq(i).removeClass('on');
        }
      }
      for(let i=0;i<fade_txt.length;i++){
        if($(window).scrollTop()>fade_txt[i].offsetTop+sec5.offsetTop-700){
          $('.fade_txt').eq(i).addClass('on');
        } else {
          $('.fade_txt').eq(i).removeClass('on');
        }
      }
      for(let i=0;i<fade_txt2.length;i++){
        if($(window).scrollTop()>$('.fade_txt2').eq(i).offset().top-700){
          $('.fade_txt2').eq(i).addClass('on');
        } else {
          $('.fade_txt2').eq(i).removeClass('on');
        }
      }
    })
  })