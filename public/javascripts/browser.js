var ScrollAnimator = {

  initialize: function(){
    this.scrollAnimationDuration = 500;
    this.currentSection = 1;
    this.numberOfSections = $('main > section').length;
    this.lastTimeWeMovedSections = 0;
    this.lastDirectionWeMoved = 0; // 0 == up and 1 == down
    $('main').on('mousewheel', (event) => {
      (event.originalEvent.wheelDelta / 120 > 0) ? this.goBackward() : this.goForward();
    })

    $('.discover-more a').on('click', event => {
      event.preventDefault();
      this.moveToSection(2);
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
    $('main > section:nth-child('+sectionIndex+')')
      .prev()
        .removeClass('entering-section')
        .addClass('leaving-section')
      .end()
      .removeClass('leaving-section')
      .addClass('entering-section')
      .siblings().removeClass('entering-section')
    $('main').stop().animate({
      scrollTop: this.scrollTopForSection(sectionIndex)
    }, 1000)
    
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

}

$(function(){
  ScrollAnimator.initialize()

  $('.open-contact-modal').on('click', function(event){
    event.preventDefault();
    $('.contact-modal').addClass('modal-open')
  })
  $('.close-contact-modal').on('click', function(event){
    event.preventDefault();
    $('.contact-modal').removeClass('modal-open')
  })
})