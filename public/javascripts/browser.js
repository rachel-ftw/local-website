var ScrollAnimator = {

  initialize: function(){
    this.scrollAnimationDuration = 500;
    this.currentSection = 1;
    this.numberOfSections = $('main > section').length;
    this.movingSections = false;
    this.lastMoveWasDown = false;
    $(window).on('mousewheel', (event) => {
      (event.originalEvent.wheelDelta / 120 > 0) ? this.goBackward() : this.goForward();
    })

    $('.discover-more a').on('click', event => {
      event.preventDefault();
      this.moveToSection(2);
    })
  },

  moveToSection: function(sectionIndex){
    if (sectionIndex < 1) sectionIndex = 1;
    if (sectionIndex > this.numberOfSections) sectionIndex = this.numberOfSections;
    if (this.currentSection === sectionIndex) return;
    var movingDown = this.currentSection < sectionIndex;
    if (this.lastMoveWasDown === movingDown && this.movingSections) return;

    $('main')
      .stop(true, false)
      .trigger('animation-complete')

    this.movingSections = true;


    var current = $('main > section:nth-child('+this.currentSection+')')
    var destination = $('main > section:nth-child('+sectionIndex+')')

    this.lastMoveWasDown = movingDown
    this.lastTimeWeMovedSections = Date.now()
    this.currentSection = sectionIndex

    if (this.currentSection === 1){
      $('nav').removeClass('visible');
    }else{
      $('nav').addClass('visible');
    }

    var styles = {
      scrollTop: this.scrollTopForSection(sectionIndex)
    }

    current
      .removeClass('active-section')
      .addClass(movingDown ? 'leaving-section-down' : 'leaving-section-up')
    destination
      .addClass('active-section')
      .addClass(movingDown ? 'entering-section-down' : 'entering-section-up')

    var onAnimationComplete = () => {
      current.removeClass(movingDown ? 'leaving-section-down' : 'leaving-section-up')
      destination.removeClass(movingDown ? 'entering-section-down' : 'entering-section-up')
      this.movingSections = false;
    }

    $('main')
      .animate(styles, 1000, this.triggerAnimationComplete)
      .one('animation-complete', onAnimationComplete)
  },

  triggerAnimationComplete: function(){ 
    $('main').trigger('animation-complete'); 
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
})