(function($){

  'use strict';

  function initNavbar () {
    if (!$('section:first').is('.parallax, #home, .splash')) {
      $('#topnav').addClass('scroll');
      $('body').addClass('top-padding');
    }

    if ($('section:first').is('#home') && $('#home').hasClass('bordered')) {
      $('#topnav').addClass('top-space');
    }

    $(window).scroll(function() {
      
      if($('section:first').is('.parallax, #home, .splash')){
        if ($(window).scrollTop() >= 200 ) {
          $('#topnav').addClass('scroll');
          $('.navigation-menu').addClass('center');
        } else{
          $('#topnav').removeClass('scroll');
          $('.navigation-menu').removeClass('center');
        }
      }

    }).trigger('scroll');

    $('.navbar-toggle').on('click', function(event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
      $('.cart, .search').removeClass('open');
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

  }

  function initCarousels () {
    $('.owl-carousel').each(function(index, el) {
      var dataOptions = $(this).data('options') || {};

      var options = {
        items: dataOptions.items || 4,
        loop: dataOptions.loop || true,
        dots: dataOptions.dots || false,
        margin: dataOptions.margin || 10,
        autoplay: dataOptions.autoplay || false,
        responsiveClass: true,
        responsive:{
          0:{
            items: dataOptions.xsItems || 1,
            margin: 25
          },
          768:{
            items: dataOptions.smItems || 2,
          },
          992:{
            items:dataOptions.mdItems || 3,
          },
          1200: {
            items: dataOptions.items || 4
          }
        }
      };

      if (options.autoplay) {
        options.autoplayTimeout = dataOptions.autoplayTimeout || 2000;
        options.autoplayHoverPause = true;
      }


      $(el).owlCarousel(options);
    });
  }

  function initLoad () {
    $(window).load(function() {

      $("#loader").delay(500).fadeOut();
      $("#mask").delay(1000).fadeOut("slow");

      var $grid = $('#works').isotope({
        masonry: {
         columnWidth: 0
        },
        itemSelector: '.work-item'
      });

      $grid.on('layoutComplete', function(event) {
        $(window).trigger('resize');
        fixScroll();
      });

    });
  }

  function initContactForm() {

    var requiredInputs = $('#contact-form').find('input[data-required="true"], textarea[data-required="true"]').toArray();

    var isValidForm = function() {
      var toReturn;

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          toReturn = false;
        } else{
          toReturn = true;
        }
      });

      return toReturn;
    };

    $('#contact-form').on('submit', function(event) {

      event.preventDefault();

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          $(element).parent('.form-group').addClass('has-error');
        } else{
          $(element).parent('.form-group').removeClass('has-error');
        }
      });

      if (isValidForm()) {
        $.ajax({
          url: $(this).attr('action'),
          type: 'POST',
          data: $(this).serialize(),
        })
        .done(function() {
          $('button.send').addClass('clicked');
          $('button.send p').text('Sent!');
        })
        .fail(function() {
          var message = $('#contact-form').data('error-text') || 'There was an error. Try again later.';
          var errorTemplate = '<div role="alert" class="alert alert-danger alert-outline">'+ message +'</div>';
          $('#contact-form .alert').fadeOut(300);
          $(errorTemplate).insertBefore($('#contact-form button'));
        });    
      }

    });

    $('#contact-form input, #contact-form textarea').on('keyup', function(event) {
      event.preventDefault();
      if ($(this).val()) {
        $(this).parent('.form-group').removeClass('has-error');
      }
    });
  }

  function fixScroll() {
    $('#sscr').css('height', 0);
    $('#sscr').css('height', document.documentElement.scrollHeight + 'px');
  }

  function initGeneral () {

    $("a[href='#top']").on('click', function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });

    $('a[data-scroll="true"]').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

    if ($('#navigation').data('onepage')) {
      $('body').scrollspy({
        target: '#navigation'
      });
    }

    $('.bg-img, .thumb-placeholder').each(function(index, el) {
      var image = $(el).attr('src');
      $(el).parent().css('background-image', 'url(' + image + ')');
      $(el).remove();
    });

    $('.alert').on('closed.bs.alert', function () {
      fixScroll();
    });

    $('body').on('click', '.alert', function() {
      $(this).on('closed.bs.alert', function() {
        fixScroll();
      });
    });

    var parallaxZIndex = -100;

    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("MSIE ") != -1 || navigator.userAgent.match(/Trident.*rv\:11\./) !== null){
      parallaxZIndex = 11;
      $('section.parallax').css('z-index', 20);
    }

    $('.parallax-bg').parallax({
      speed: 0.5,
      zIndex: parallaxZIndex
    });

    $('#login-tabs a:first').tab('show');

    $('#login-content .tab-pane:first').addClass('fade in');

    $('#login-tabs li a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    $('a[data-toggle=tab]').on('click', function(event) {
      $(window).trigger('resize');      
    }).on('shown.bs.tab', function(e) {
      var container = $($(this).attr('href'));

      if (container.find('.progress-bar').length) {
        container.find('.progress-bar').each(function(index, el) {
          $(el).css('width', $(this).data('progress') + '%');
          $(el).parents('.skill').find('.skill-perc').css('right', 100 - $(el).data('progress') + '%');
        });
      }

    });

    $('.particles-bg').particleground({
      dotColor: '#EF2D56',
      particleRadius: 5
    });

    $('.boxes [data-bg-color]').each(function(index, el) {
      $(el).css('background-color', $(el).data('bg-color'));  
    });

    $('.progress-bar').appear(function() {
      $(this).css('width', $(this).data('progress') + '%');
      $(this).parents('.skill').find('.skill-perc').css('right', 100 - $(this).data('progress') + '%');
    });

    $('[data-animated=true]').addClass('invisible');

    $('[data-animated=true]').appear(function(){
      var el = $(this);
      if (el.data('delay')) {
        setTimeout(function(){
          el.removeClass('invisible').addClass('fade-in-top');
        }, parseInt(el.data('delay')));
      } else{
        $(this).removeClass('invisible').addClass('fade-in-top');
      }
    }, {accX: 0, accY: 0});

    $('.client-image').hover(function() {
      $(this).removeClass('fade-in-top');
    }, function() {
      //
    });
  }

  function init () {
    initNavbar();
    initCarousels();
    initLoad();
    initContactForm();
    initGeneral();
  }

  init();

})(jQuery);
