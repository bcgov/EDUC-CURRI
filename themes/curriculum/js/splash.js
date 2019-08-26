(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          }

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  };
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

Drupal.behaviors.splashPage = {
  attach: function (context, settings) {
    (function($) {

      var requestedSlide = 0;
      var currentSlide = 0;
      annimationLock = false;

      function fitSplashContent() {
        var splashHeight = $(window).height() - $('div#header').height() - parseInt($('#header').css('marginBottom')) - $('#main-menu').height() + 5;
        $('.slide-wrapper').css('height', splashHeight + 'px');
        var windowHeight = $(window).height();
        $('.slide-wrapper').first().css('height', $(window).height() + 'px');
        // console.log('Main content area resized to: ' + splashHeight + 'px');
      }

      // but fire on page resize :)
      $(window).smartresize(function() {
        fitSplashContent();
        window.setTimeout(focusSlide(currentSlide, false),333); // wait 333 and then focusSlide
      });

      function focusSlide(requestedSlide, withAnimation) {
        // check for funky values
        if (requestedSlide < 0) {
          requestedSlide = 0;
          currentSlide = 0;
          // assume we are at the start of the slide deck
          return false;
        }
        if (requestedSlide > $('.slide-wrapper').length - 1) {
          requestedSlide = $('.slide-wrapper').length - 1;
          currentSlide = $('.slide-wrapper').length - 1;
          // assume we are at the end of the slide deck
          return false;
        }
        // quick check if people are scrolling really fast through the slides
        if (annimationLock) { return false; }
        annimationLock = true;
        setTimeout(function(){ annimationLock = false; }, 666);

        var headerOffset = $('div#header').height() - parseInt($('#header').css('marginBottom')) + $('#main-menu').height();
        var scrollPosistion = $('.slide-wrapper').eq(requestedSlide).offset().top - headerOffset;
        $('#slideId-' + currentSlide).addClass('visited');
        $('.slide-nav-button').removeClass('active');
        if (withAnimation) {
          // $('.slide .copy').fadeOut('fast');
          $('.slide .copy').hide();
          $('.slide .copy h3').css('margin-bottom', '3px');
        }
        $('html, body').animate({ scrollTop: scrollPosistion + 'px' }, 'slow', 'easeOutQuart', function() {
          currentSlide = requestedSlide;
          $('#slideId-' + currentSlide).addClass('active');
          if (withAnimation) {
            $('.slide .copy h3').eq(requestedSlide).animate({ marginBottom: '21px' }, 'slow');
            $('.slide .copy').eq(requestedSlide).fadeIn('slow');
          }
        });
      }

      /**
       * Event handelers! :)
       */
      $(document).on('mousewheel', function(event) {
        event.preventDefault();
        if (event.deltaY >= 1) {
          // scrolling up
          focusSlide(currentSlide - 1, true);
        } else if (event.deltaY <= 1) {
          // scrolling down
          focusSlide(currentSlide + 1, true);
        }
         // console.log('mouse scroll event: ' + event.deltaY); // event.deltaX, // event.deltaFactor
       });
       $(document).keydown(function(e) {
         switch(e.which) {

          case 38: // up
          case 37: // left
            focusSlide(currentSlide - 1, true);
          break;

          case 39: // right
          case 40: // down
            focusSlide(currentSlide + 1, true);
          break;

          default: return; // exit this handler for other keys

        } // switch
        e.preventDefault(); // prevent the default action (scroll / move caret)
      });

      // make little buttons for nav, based on how many slides we have
      $(document).ready(function() {

        // init the sizing of the content - fire once on page load
        fitSplashContent();
        // try to prevent a nasty bug that sometimes doesn't resize the first slide correctly
        $('.slide-wrapper').first().css('height', $(window).height() + 'px');

        // we need to start with the page scrolled up all the way to the top
        $(window).scrollTop(0);
        $(window).on('beforeunload', function() {
          $('.slide .copy, .slide img').show();
          $(this).scrollTop(0);
        });

        // make a container for the little 'nav buttons'
        $('#page').append('<ol id="slide_nav" />');
        for (i=0; i <= $('.slide').length -1; i++) {
          if (i ===0) {
            $('#slide_nav').append('<li class="slide-nav-button active" id="slideId-' + i + '" />');
          } else {
            $('#slide_nav').append('<li class="slide-nav-button" id="slideId-' + i + '" />');
          }
        }

        $('.slide-nav-button').click(function() {
          var slideId = $(this).attr('id').match(/\d+/)[0];
          requestedSlide = slideId;
          focusSlide(requestedSlide, true);
        });

      }); // document ready()

      // do something fancy with the first slide on page load
      $(window).load(function() {
        $('.slide-wrapper.one .slide.one .slide-image').animate({opacity: 1}, 'fast');
        $('.slide-wrapper.one .slide.one .copy').animate({opacity: 1}, 'slow');
        $('.slide-wrapper.one .slide.one .copy h3').animate({marginTop: '-17px'}, 'slow');
      });

    })(jQuery); // alias function wrapper
  }
};
