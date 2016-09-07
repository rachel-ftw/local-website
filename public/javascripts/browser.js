var ScrollAnimator = {

  initialize: function(){
    this.scrollAnimationDuration = 500;
    this.currentSection = 1;
    this.numberOfSections = $('main > section').length;
    this.lastTimeWeMovedSections = 0;
    this.lastDirectionWeMoved = 0; // 0 == up and 1 == down
    $(window).on('mousewheel', (event) => {
      (event.originalEvent.wheelDelta / 120 > 0) ? this.goBackward() : this.goForward();
    })
  },

  moveToSection: function(sectionIndex){
    var directionWedMove = this.currentSection < sectionIndex ? 1 : 0;
    if (this.lastDirectionWeMoved === directionWedMove && Date.now() - this.lastTimeWeMovedSections < 700){
      return;
    }
    if (sectionIndex < 0) sectionIndex = 0;
    if (sectionIndex > this.numberOfSections) sectionIndex = this.numberOfSections;
    if (this.currentSection === sectionIndex) return;
    this.lastDirectionWeMoved = directionWedMove
    this.lastTimeWeMovedSections = Date.now()
    this.currentSection = sectionIndex
    $('main').stop().animate({
      scrollTop: this.scrollTopForSection(sectionIndex)
    })
    
    if (this.currentSection === 1){
      $('nav').removeClass('visible');
    }else{
      $('nav').addClass('visible');
    }
  },

  scrollTopForSection: function(n){
    return $(window).height() * (n-1)
  },

  goForward: function(){
    this.moveToSection(this.currentSection+1)
  },

  goBackward: function(){
    this.moveToSection(this.currentSection-1)
  },

  // //why is nav bar background white?!?
  // showNav: function(){
  //   // if current section === 1, set view to none
  //   //if current section > 1, make it visible, with a 500 ms 'turning up opacity'
  //   $(document).on('scroll', function (e) {
  //       $('.navbar').css('opacity', ($(document).scrollTop() / 500));
  //   });
  // }
}

$(function(){
  ScrollAnimator.initialize()
})