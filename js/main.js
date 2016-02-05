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
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

  }

  function initLoad () {
    $(window).load(function() {
      $("#loader").delay(500).fadeOut();
      $("#mask").delay(1000).fadeOut("slow");
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

    $('.particles-bg').particleground({
      dotColor: '#EF2D56',
      particleRadius: 5
    });

  }

var escudo = '  DNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n' +
'  NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n' +
'  NNN                                    N                                    NNN\n' +
'  NNN                                  DNDDN  Z                               NNN\n' +
'  NNN                               NDNNN NDNNI                               NNN\n' +
'  NNN                              INN NZ   N,                                NNN\n' +
'  NNN                              IN~ NZ                                     NNN\n' +
'  NNN                              IN~ NZ                                     NNN\n' +
'  NNN                              ?N= NZ   NN+                               NNN\n' +
'  NNN                              ?NDMNO ZNN+                                NNN\n' +
'  NNN                                 NNNNNN                                  NNN\n' +
'  NNN                                   ID                                    NNN\n' +
'  NNN                                                                         NNN\n' +
'  NNM8DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD8888DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD88D8NNN\n' +
'  NNN88888888888D       ~8888888888888       $D88888888888D       8888888888D8NNN\n' +
'  NNN888888888888       ~88888888888D8       $8888888888888       888888888888NNN\n' +
'  NNN                                                                         DNN\n' +
'  NNN                                                                         NNN\n' +
'  NNN            ODNNNNN7                                            IDN      NNN\n' +
'  NNN    MNDNNND DN8  8NN                                          ONNDNN     NNN\n' +
'  NNN   NNNN, ~DDNN    77                I                      ,NDMNN  =O:   NNN\n' +
'  NNN   NNN     INN                     888                   =NNN INN        NNN\n' +
'  NNN   NNN     INN                   +88Z88$                 NNNN INN        NNN\n' +
'  NNN   INNN    INN                  88D,  D88                 :DN INN        NNN\n' +
'  NNN    ONND   INNND              OD88     Z8DD               ~NN INN        NNN\n' +
'  NNN     INN   IDN              ,D88    8    D88              ~NN INN        NNN\n' +
'  NNN      DDN  INN             7DDI   D8D88   :DDO            ~NN IDD        NNN\n' +
'  NNN       NN  INN            O88   :D88 D8D~   D8D           ~NN IO         NNN\n' +
'  NNN       NN  IN+          O88Z   8DD     888   I888         ~NN            NNN\n' +
'  NNN       DN              8D8 ,  8DD       8D8,   DD8        ~NN            NNN\n' +
'  NNN   DDNNNZ            $DD=   8DO    7D$   ,DDD   ,88O      ~NN      7O    NNN\n' +
'  NNN  ?N   NNNNDDNN     DD8   ~888    8D888    88D?   D88     ~NN     D8     NNN\n' +
'  NNN   ~NDN   ~O$     8D8?   888    888888888    DD8   +D88   ~NDDNNNNN      NNN\n' +
'  NNN                 8D8,   D8D    8D8888888DD    O8D:   888                 NNN\n' +
'  NNN               O88:   DD8,   $D888DD8DD888D$    D88,   88D,              NNN\n' +
'  NNN              888   +D88    8D8888   D88888D8,   8D8$   8D8,             NNN\n' +
'  NNN            DD8+   8D8,   DD8D            88D8D    8D8   :8D8            NNN\n' +
'  NNN           DDD   ,DD8    D888     8NN8N    888DD   ,$D8=   DD8,          NNN\n' +
'  NNN        ,888,   8DD    O8D88     88NN888    D8888O    888    D88         NNN\n' +
'  NNN        888   78DD    DD88D   D8888NN888    8888888    8D8O   888,       NNN\n' +
'  NNN     ,8D8~   D8D    8888888   88888NN888   888888888D    D8D,   888      NNN\n' +
'  NNN     88O   ~8DO   ,88888888   88888NN888   88888888D88,   I887   888=    NNN\n' +
'  NNN   DD8    DD8    8D88888888   88888NN888   8888888888DDO    D88    8DD,  NNN\n' +
'  NNN  88D   $D88    88888888888   88888NN888   88888888888888    O88D , 888, NNN\n' +
'  NNDDD8,   888    88D888888888D   8888NN8888    88888888888888D,   88D~   8D8DNN\n' +
'  NNN88   ?DD$   ,DD8888888888888   D888NN8888    D888888888888OD,   +DDZ   88NNN\n' +
'  NNN    D8D    D8888888888888888D   8D88D888D    D8888888888888888    D88    MNN\n' +
'  NND  O88O   ,88888888888888888888  8888DD8       88888888888888888    OD8O  DNN\n' +
'  NNN,8DD    88D888D88888888888888      8888       8888888888888888888    DD8=NNN\n' +
'  NNN8D7   :D88888888888888888888      D8888D     D8888888888888888888D    :88NNN\n' +
'  NNMD    888888888888888888888      88888888888888888888888888888888888D    DNNN\n' +
'  ,NND=,:DD888D8888888888888888    8888888888888888888888888888888888888DD  =MND \n' +
'   IMDNND8D888888888888888888888888888888888888888888888888888888888888888DNNNN? \n' +
'     DNNNNNNNNNNNNNNNNNNNNNNNNNNNNNND88888D8888NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN   \n' +
'       8NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN88888NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNO     \n' +
'                                   8NNNNN8DNNDNM                                 \n' +
'                                      NDNNNNNO                                   \n' +
'                                       DNNND                                     \n' +
'                                        DDDD                                     ';
  function initConsole(){
    console.log('%c' + escudo, 'color: #319c63;');
  }

  function init () {
    initNavbar();
    initLoad();
    initContactForm();
    initGeneral();
    initConsole();
  }

  init();

})(jQuery);
