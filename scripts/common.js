'use strict';
$(document).ready(function() {
  $('body').mCustomScrollbar({
    theme: 'minimal-dark',
    scrollInertia: 200,
    callbacks: {
        whileScrolling:function(){
            if ((window.matchMedia('(min-width: 601px)').matches)) {
                if (this.mcs.top < -100) {
                    $('.page-header, .toast, .floating-toolbar, #log-in-form').addClass('collapse');
                    $('#log-in-form').removeClass('open');
                    $('#show-log-in').removeClass('clicked');
                    $('nav').removeClass('open');
                } else {
                    $('.page-header, .toast, .floating-toolbar, #log-in-form').removeClass('collapse');
                    $('nav').removeClass('open');
                }
            }
            if ((window.matchMedia('(min-width: 601px)').matches)) {
                if (this.mcs.top < -300) {
                    $('.scroll-up').fadeIn();
                } else {
                    $('.scroll-up').fadeOut();
                }
            } else {
                $('.scroll-up').hide();
            }
        }
    }
  });
  //--------------------------------------------------------------------------------------
  $('.select ul, .recipe-details-content').mCustomScrollbar({
    theme: 'minimal-dark',
    scrollInertia: 300
  });
  //--------------------------------------------------------------------------------------
  $('.scroll-up').click(function() {
    $('body').mCustomScrollbar(
        'scrollTo',
        'top',
        {scrollInertia: 800},
        {scrollEasing: 'easeOut'}
    );
    return false;
  });
  //--------------------------------------------------------------------------------------
  $('#show-log-in a').click(function(event) {
    $('#log-in-form').toggleClass('open');
    $('#show-log-in').toggleClass('clicked');
    event.stopPropagation();
  });
  //--------------------------------------------------------------------------------------
  $('.nav-icon').click(function(event) {
    $('nav').toggleClass('open');
    $('.nav-icon').toggleClass('clicked');
    event.stopPropagation();
  });
  //--------------------------------------------------------------------------------------
  if (localStorage.getItem('auth')) {
    $('#my-account').removeClass('hidden');
    $('.floating-toolbar').hide();
  }
  //--------------------------------------------------------------------------------------
  $('#exit').click(function() {
    window.localStorage.clear();
    $('#my-account').addClass('hidden');
    $('.floating-toolbar').show();
    $('#show-log-in').removeClass('clicked');
    $(location).attr('href', 'index.html');
    return false;
  });
  //--------------------------------------------------------------------------------------
  $(document).click(function(event) {
    if ($(event.target).closest('#log-in-form').length) {
      return;
    }
    $('nav.list').removeClass('open');
    $('.select ul').slideUp();
    $('.select').removeClass('open');
    $('#log-in-form').removeClass('open');
    $('#show-log-in').removeClass('clicked');
    event.stopPropagation();
  });
  //--------------------------------------------------------------------------------------
  function onResize() {
    $('#log-in-form').removeClass('open');
    $('#show-log-in').removeClass('clicked');
    $('nav').removeClass('open');
    if ((window.matchMedia('(max-width: 600px)').matches)) {
      $('.page-header, .toast, .floating-toolbar, #log-in-form').addClass('collapse');
    } else {
      $('.page-header, .toast, .floating-toolbar, #log-in-form').removeClass('collapse');
    }
    if ((window.matchMedia('(max-width: 1024px)').matches)) {
      $('nav').addClass('list');
    } else {
      $('nav').removeClass('list');
    }
  }
  $(window).resize(onResize);
  onResize();
});
