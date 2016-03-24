'use strict';
$(document).ready(function() {
  var slideTimer = 0,
    slideNum = 0,
    slideCount = $('.slide').length,
    spanDot = '';

  $('<a href="#" class="slideNav prev">' + '</a>').appendTo('.slider');
  $('<a href="#" class="slideNav next">' + '</a>').appendTo('.slider');

  $('.slide').each(function(index) {
    spanDot += '<li>' + '<div class="dot">' + '</div>' + '<span>' + index + '</span>' + '</li>';
  });
  $('<ul class="dots-list">' + spanDot + '</ul>').appendTo('.slider');

  function slideFunc(nextSlide) {
    clearTimeout(slideTimer);
    $('.slide').eq(slideNum).fadeOut(200);

    if (nextSlide === 'next') {
      if (slideNum === (slideCount - 1)) {
        slideNum = 0;
      } else {
        slideNum++;
      }
    } else if (nextSlide === 'prev') {
      if (slideNum === 0) {
        slideNum = slideCount - 1;
      } else {
        slideNum -= 1;
      }
    } else {
      slideNum = nextSlide;
    }

    $('.dot').removeClass('dotActive');
    $('.slideActive').removeClass('slideActive');
    $('.slide').eq(slideNum).fadeIn(600).addClass('slideActive');
    $('.dot').eq(slideNum).addClass('dotActive');

    slideTimer = setTimeout(function() {
      slideFunc('next');
    },
    4000);
  }

  $('.next').click(function() {
    slideFunc('next');
  });

  $('.prev').click(function() {
    slideFunc('prev');
  });

  $('.dot').click(function() {
    var isActive = $(this).is('.dotActive');
    if (!isActive) {
      var index = parseFloat( $(this).siblings().text() );
      slideFunc(index);
    }
  });

  slideFunc(0);
  $('.dot:first').addClass('dotActive');
});
