$(function(){
  var scrollAnimationDuration = 500;

  var goForward = function(){
    var main = $('main')[0]
    var windowHeight = $(window).height();
    if (main.scrollTop >= (main.scrollHeight - windowHeight)) return;
    $(main).stop().animate({
      scrollTop: main.scrollTop + windowHeight,
    }, scrollAnimationDuration)
  }

  var goBackward = function(){
    var main = $('main')[0]
    var windowHeight = $(window).height();
    if (main.scrollTop <= 0) return;
    $(main).stop().animate({
      scrollTop: main.scrollTop - windowHeight,
    }, scrollAnimationDuration)
  }

  $(window).on('mousewheel', function(event){
    if (event.originalEvent.wheelDelta / 120 > 0){
      console.log('mousewheel up', event)
      goBackward()
    }else{
      console.log('mousewheel down', event)
      goForward();
    }
  })

})